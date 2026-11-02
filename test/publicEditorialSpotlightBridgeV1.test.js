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
