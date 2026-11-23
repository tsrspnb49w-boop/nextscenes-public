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

test("public First Reads routes to the approved app rather than staging or private manuscripts", () => {
  assert.ok(collection.includes('NEXT_PUBLIC_APP_URL'));
  assert.ok(collection.includes('href={appEntry}'));
  assert.ok(collection.includes('href={collection}'));
  assert.ok(collection.includes('View First Reads Collection'));
  assert.ok(collection.includes('Voir la collection First Reads'));
  assert.equal(collection.includes('Explore published books'), false);
  assert.ok(collection.includes('href={register}'));
  assert.ok(collection.includes('href={login}'));
  assert.equal(collection.includes('https://staging.nextscenes.org'), false);
  assert.ok(collection.includes('/my-projects?firstReads=1&lang='));
  assert.equal(collection.includes('Staging pilot:'), false);
  assert.equal(collection.includes('NextScenes Staging'), false);
});

test("publication and full manuscript remain author-gated", () => {
  assert.ok(collection.includes("The full manuscript remains private."));
  assert.ok(collection.includes("Covers, About the Author and every release require approval."));
  assert.ok(collection.includes("First Reads welcomes completed manuscripts."));
  assert.ok(collection.includes("approve every public release."));
  assert.ok(collection.includes("Release one serial at a time"));
  assert.ok(collection.includes("latest five authorized serials"));
  assert.ok(collection.includes("Breadcrumbs"));
  assert.ok(collection.includes("aucun manuscrit automatiquement"));
  assert.ok(collection.includes('data-first-reads-featured-book="queen-amina"'));
  assert.ok(collection.includes("queenAminaPublicReadingUrl"));
  assert.ok(collection.includes("The full manuscript remains private."));
  assert.ok(collection.includes('id="how-first-reads-works"'));
});

test("First Reads author guide is concise, bilingual, and uses approved serial lengths", () => {
  assert.equal(Array.from({ length: 6 }, (_, i) => collection.split('["' + (i + 1) + '",').length - 1).reduce((sum, n) => sum + n, 0), 12);
  assert.ok(collection.includes("Normally 2–3 per chapter, around 1,200 words (preferably 1,000–1,500)"));
  assert.ok(collection.includes("normalement 2 à 3 épisodes par chapitre, autour de 1 200 mots"));
  assert.ok(collection.includes("latest five authorized serials"));
  assert.ok(collection.includes("readerNote:"));
  assert.equal(collection.includes("one fifth of the next chapter"), false);
  assert.equal(collection.includes("un cinquième du chapitre suivant"), false);
});

test("First Reads has a bilingual homepage entry and does not alter published book status", () => {
  assert.ok(homepage.includes("Explore First Reads"));
  assert.ok(homepage.includes('"/first-reads/explore"'));
  assert.ok(homepage.includes('"/fr/first-reads/explore"'));
  assert.ok(homepage.includes("Published in English · Available on Amazon"));
  assert.equal(homepage.includes("Prepared for publication at NextScenes"), false);
  assert.equal(homepage.includes("Staging pilot"), false);
});

test("First Reads collection features only approved Queen Amina Chapter One, not private manuscripts", () => {
  const firstReadsBooks = read("components/FirstReadsBookCollection.tsx");
  const english = read("app/first-reads/books/page.tsx");
  const french = read("app/fr/first-reads/books/page.tsx");
  const css = read("components/FirstReadsBookCollection.module.css");
  assert.ok(english.includes('language="en"'));
  assert.ok(french.includes('language="fr"'));
  assert.equal(english.includes("noIndex: true"), false);
  assert.equal(french.includes("noIndex: true"), false);
  assert.ok(firstReadsBooks.includes('data-first-reads-approved-book="queen-amina"'));
  assert.ok(firstReadsBooks.includes("QUEEN_AMINA_FIRST_READS"));
  assert.ok(firstReadsBooks.includes("distincte du catalogue des éditions commerciales de NextScenes"));
  assert.ok(firstReadsBooks.includes("separate from the NextScenes catalogue of commercially available editions"));
  assert.ok(firstReadsBooks.includes("Only Chapter One has been approved for public reading."));
  assert.equal(firstReadsBooks.includes('href="/books"'), false);
  assert.ok(firstReadsBooks.includes("queenAminaPublicReadingUrl"));
  assert.ok(css.includes(".realCover"));
  const approved = read("app/lib/firstReadsApprovedBooks.ts");
  assert.ok(approved.includes('id: "6b031e6fa85e87384e4e27a5"'));
  assert.ok(approved.includes("Queen Amina: Soldier on Horseback"));
  assert.ok(approved.includes('author: "Kola King"'));
  assert.ok(approved.includes('&openBook=1'));
  assert.equal(approved.includes('/my-projects'), false);
  assert.equal(firstReadsBooks.includes('data-first-reads-placeholder="true"'), false);
  assert.ok(sitemap.includes('path: "/first-reads/books"'));
  assert.ok(nav.includes('["/first-reads/books", "/fr/first-reads/books"]'));
});
