"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const read = (p) => fs.readFileSync(path.join(__dirname, "..", p), "utf8");

test("editorial spotlight uses canonical published Home Spotlight API, not stale placeholders", () => {
  const bridge = read("app/lib/publicEditorialSpotlight.ts");
  assert.match(bridge, /\/api\/home\/spotlight/);
  assert.match(bridge, /updatedBy\?\.id/);
  assert.match(bridge, /!\/placeholder\/i\.test\(bookTitle\)/);
  assert.match(bridge, /next: \{ revalidate: 60 \}/);
});

test("existing public homepage English and French maintain defaults until editor publishes", () => {
  const comp = read("components/PublicHomepageV2.tsx");
  for (const name of ["Mariama Bâ", "So Long a Letter", "Une si longue lettre"])
    assert.ok(comp.includes(name));
  for (const marker of ["spotlight?.writer?.name", "spotlight?.book?.title", "spotlight?.daily?.quote"])
    assert.ok(comp.includes(marker));
  for (const file of ["app/page.tsx", "app/fr/page.tsx"]) {
    const src = read(file);
    assert.match(src, /await getPublishedEditorialSpotlight\(\)/);
    assert.match(src, /spotlight=\{spotlight\}/);
  }
});


test("published editorial bridge includes every saved content field, but rejects unsafe URLs", () => {
  const bridge = read("app/lib/publicEditorialSpotlight.ts");
  for (const field of [
    "monthLabel", "imageUrl", "fullText", "fullTextFr", "works",
    "author", "coverUrl", "coverUrlFr", "linkUrl", "dateLabel"
  ]) assert.ok(bridge.includes(field), "missing canonical editor field: " + field);
  assert.match(bridge, /safePublicUrl/);
  assert.match(bridge, /parsed\.protocol === "https:"/);
  assert.match(bridge, /!parsed\.username && !parsed\.password/);
  assert.match(bridge, /!clean\(doc\?\.updatedBy\?\.id, 100\)/);
});

test("writer and book cards expose full text and images, retaining 3-card bilingual homepage", () => {
  const comp = read("components/PublicHomepageV2.tsx");
  const styles = read("components/PublicHomepageV2.module.css");
  const image = read("components/EditorialSpotlightImage.tsx");
  for (const field of ["fullTextFr", "fullText", "imageUrl", "coverUrlFr", "coverUrl", "works", "linkUrl", "dateLabel"])
    assert.ok(comp.includes(field), "missing rendered field " + field);
  assert.match(comp, /Read full profile/);
  assert.match(comp, /Lire le portrait complet/);
  assert.match(comp, /Read more about this book/);
  assert.match(comp, /En savoir plus sur ce livre/);
  assert.equal((comp.match(/className=\{styles\.spotlightCard\}/g) || []).length, 3);
  assert.match(comp, /<details className=\{styles\.spotlightDetails\}>/);
  assert.match(styles, /max-height:270px/);
  assert.match(styles, /@media\(max-width:600px\)/);
  assert.match(image, /onError=\{\(\) => setFailed\(true\)\}/);
});


test("Daily Wisdom shows verified source and French translation credit with optional reflections",()=>{
 const bridge=read("app/lib/publicEditorialSpotlight.ts");
 const component=read("components/PublicHomepageV2.tsx");
 const css=read("components/PublicHomepageV2.module.css");
 for(const key of ["sourceTitle","sourceReference","sourceUrl","sourceType","translationCredit",
                   "reflection","reflectionFr","dateLabelFr"]){
  assert.ok(bridge.includes(key),"Missing bridge field "+key);
  if(key!=="sourceType")assert.ok(component.includes(key),"Missing public presentation field "+key);
 }
 assert.match(component,/Discover the work/);
 assert.match(component,/Découvrir l'œuvre/);
 assert.match(component,/A thought to consider/);
 assert.match(component,/Une pensée à approfondir/);
 assert.match(css,/white-space:pre-line/);
 assert.equal((component.match(/className=\{styles\.spotlightCard\}/g)||[]).length,3);
});
