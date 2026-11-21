const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const collection = read("components/FirstReadsExploreCollection.tsx");
const homepage = read("components/PublicHomepageV2.tsx");
const nav = read("components/SiteNav.tsx");
const enPage = read("app/first-reads/explore/page.tsx");
const frPage = read("app/fr/first-reads/explore/page.tsx");
const sitemap = read("app/sitemap.ts");

test("First Reads has one localized public destination and correct SEO metadata", () => {
  assert.match(enPage, /FirstReadsExploreCollection language="en"/);
  assert.match(frPage, /FirstReadsExploreCollection language="fr"/);
  assert.ok(enPage.includes('title: "Explore First Reads | NextScenes"'));
  assert.ok(frPage.includes('title: "Explorer First Reads | NextScenes"'));
  assert.ok(nav.includes('["/first-reads/explore", "/fr/first-reads/explore"]'));
  assert.ok(sitemap.includes('path: "/first-reads/explore"'));
  assert.ok(sitemap.includes('path: "/fr/first-reads/explore"'));
  assert.ok(read("app/first-reads/page.tsx").includes('redirect("/first-reads/explore")'));
  assert.ok(read("app/fr/first-reads/page.tsx").includes('redirect("/fr/first-reads/explore")'));
});

test("public First Reads never sends readers or authors to staging or unavailable intake", () => {
  assert.ok(collection.includes('NEXT_PUBLIC_APP_URL'));
  assert.ok(collection.includes('href={appEntry}'));
  assert.ok(collection.includes('href={collection}'));
  assert.ok(collection.includes('View First Reads Collection'));
  assert.ok(collection.includes('Voir la collection First Reads'));
  assert.equal(collection.includes('Explore published books'), false);
  assert.ok(collection.includes('href={register}'));
  assert.ok(collection.includes('href={login}'));
  assert.equal(collection.includes('https://staging.nextscenes.org'), false);
  assert.equal(collection.includes('my-projects?firstReads=1'), false);
  assert.equal(collection.includes('Staging pilot:'), false);
  assert.equal(collection.includes('NextScenes Staging'), false);
});

test("publication and full manuscript remain author-gated", () => {
  assert.ok(collection.includes("The full manuscript remains private."));
  assert.ok(collection.includes("Cover artwork and About the Author require author approval"));
  assert.ok(collection.includes("not yet available in the production application"));
  assert.ok(collection.includes('data-first-reads-empty-collection="true"'));
  assert.equal(collection.includes("Queen Amina"), false);
  assert.equal(collection.includes("6b015cd165e47e1c7a8b31f5"), false);
  assert.ok(collection.includes('id="how-first-reads-works"'));
});

test("First Reads has a bilingual homepage entry and does not alter published book status", () => {
  assert.ok(homepage.includes("Explore First Reads"));
  assert.ok(homepage.includes('"/first-reads/explore"'));
  assert.ok(homepage.includes('"/fr/first-reads/explore"'));
  assert.ok(homepage.includes("Published in English · Available on Amazon"));
  assert.equal(homepage.includes("Prepared for publication at NextScenes"), false);
  assert.equal(homepage.includes("Staging pilot"), false);
});

test("First Reads books have their own unpublished placeholder collection", () => {
  const firstReadsBooks = read("components/FirstReadsBookCollection.tsx");
  const english = read("app/first-reads/books/page.tsx");
  const french = read("app/fr/first-reads/books/page.tsx");
  const css = read("components/FirstReadsBookCollection.module.css");
  assert.ok(english.includes('language="en"'));
  assert.ok(french.includes('language="fr"'));
  assert.ok(english.includes("noIndex: true"));
  assert.ok(french.includes("noIndex: true"));
  assert.ok(firstReadsBooks.includes('data-first-reads-placeholder="true"'));
  assert.ok(firstReadsBooks.includes("distincte de notre catalogue de livres déjà publiés"));
  assert.ok(firstReadsBooks.includes("separate from our catalogue of previously published books"));
  assert.ok(firstReadsBooks.includes("Preview card only."));
  assert.equal(firstReadsBooks.includes("/books\""), false);
  assert.equal(firstReadsBooks.includes("Queen Amina"), false);
  assert.equal(firstReadsBooks.includes("Kola King"), false);
  assert.ok(css.includes(".placeholderCard"));
  assert.ok(nav.includes('["/first-reads/books", "/fr/first-reads/books"]'));
});
