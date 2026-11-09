const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const read = (name) => fs.readFileSync(path.join(__dirname, "..", name), "utf8");
const books = read("app/lib/seoPublishedBooks.ts");
const profile = read("components/SeoPublishedBookPages.tsx");
const enPage = read("app/books/[slug]/page.tsx");
const frPage = read("app/fr/books/[slug]/page.tsx");
const sitemap = read("app/sitemap.ts");
const coverPath = path.join(__dirname, "..", "public/images/covers/featured-flat/a-place-in-the-sun-sharp.webp");

test("Kola King has distinct EN and FR book presentations for an English-language paperback", () => {
  assert.match(books, /id: "a-place-in-the-sun-en"/);
  assert.match(books, /id: "a-place-in-the-sun-fr"/);
  assert.match(books, /href: "\/books\/a-place-in-the-sun"/);
  assert.match(books, /href: "\/fr\/books\/a-place-in-the-sun"/);
  assert.equal((books.match(/author: "Kola King"/g) || []).length, 2);
  assert.equal((books.match(/bookLanguage: "en"/g) || []).length, 2);
  assert.equal((books.match(/isbn: "9798140593759"/g) || []).length, 2);
  assert.match(books, /restitution du prix de la fiancée/);
  assert.doesNotMatch(books, /Verity Publishers|9781928348320/);
});

test("the approved front artwork is packaged locally, not a missing or remote image", () => {
  assert.ok(fs.existsSync(coverPath), "The cover must be packaged with the site");
  const cover = fs.readFileSync(coverPath);
  assert.ok(cover.length > 100_000, "Use the full-resolution cover, not a compressed preview");
  assert.equal(cover.toString("ascii", 0, 4), "RIFF");
  assert.equal(cover.toString("ascii", 8, 12), "WEBP");
  assert.match(books, /\/images\/covers\/featured-flat\/a-place-in-the-sun-sharp\.webp/);
});

test("both catalogues use the recorded author and correct actual book language", () => {
  assert.match(profile, /book\.author/);
  assert.match(profile, /book\.bookLanguage \|\| book\.language/);
  assert.match(profile, /book\.overview\.map/);
  assert.match(profile, /book\.isbn/);
  assert.match(profile, /Kola King/);
  assert.match(profile, /Lire cette présentation en anglais/);
  assert.match(profile, /Read this presentation in French/);
});

test("SEO title, sitemap and static pages include the client's book without a false author attribution", () => {
  assert.match(enPage, /book\.author/);
  assert.match(frPage, /book\.author/);
  assert.doesNotMatch(enPage, /by Goddy Oguzie/);
  assert.doesNotMatch(frPage, /de Goddy Oguzie/);
  assert.match(enPage, /generateStaticParams/);
  assert.match(frPage, /generateStaticParams/);
  assert.match(sitemap, /publicPublishedBooks\.en/);
  assert.match(sitemap, /publicPublishedBooks\.fr/);
  assert.equal((books.match(/https:\/\/www\.amazon\.com\/dp\/B0HQY8VBGM/g) || []).length, 2);
  assert.doesNotMatch(books, /https:\/\/www\.amazon\.com\/s\?k=9798140593759/);
});

test("A Place in the Sun uses a Didie-style literary book page while preserving existing titles", () => {
  const dedicated = read("components/APlaceInTheSunBookPage.tsx");
  const homepage = read("components/PublicHomepageV2.tsx");
  const css = read("components/PublicHomepageV2.module.css");
  assert.match(profile, /import APlaceInTheSunBookPage/);
  assert.match(profile, /book\.id\.startsWith\("a-place-in-the-sun"\)/);
  assert.match(profile, /<APlaceInTheSunBookPage book=\{book\}/);
  assert.match(dedicated, /DidieBookPage\.module\.css/);
  assert.match(dedicated, /book\.amazonSearchUrl/);
  assert.match(dedicated, /book\.overview \|\| \[\]/);
  assert.match(dedicated, /book\.authorBio/);
  assert.match(dedicated, /Amazon KDP/);
  assert.match(dedicated, /fr: \{/);
  assert.match(dedicated, /en: \{/);
  assert.doesNotMatch(dedicated, /édition française disponible/i);
  assert.match(homepage, /guestFeature/);
  assert.match(homepage, /\/fr\/books\/a-place-in-the-sun/);
  assert.match(homepage, /\/books\/a-place-in-the-sun/);
  assert.match(css, /\.guestFeature/);
  assert.match(homepage, /didieFeature/);
});

test("the Didie and Kola King homepage feature cards share the same size and cover angle", () => {
  const homepage = read("components/PublicHomepageV2.tsx");
  const css = read("components/PublicHomepageV2.module.css");
  assert.match(homepage, /className=\{\x60\$\{styles.didieFeature\} \$\{styles.guestFeature\}\x60\}/);
  assert.match(homepage, /className=\{styles.didieArt\}/);
  assert.match(homepage, /className=\{styles.didieCover\}/);
  assert.match(homepage, /className=\{styles.didieDetails\}/);
  assert.match(homepage, /\$\{styles.didieAction\}/);
  assert.match(css, /\.didieCover\s*\{/);
  assert.match(css, /transform:rotate\(-1\.4deg\)/);
  assert.match(css, /\.guestFeature\s*\{/);
  assert.doesNotMatch(css, /\.guestCover\s*\{/);
});

test("sharp cover retains the artwork approved by the author", async () => {
  const sharp = require("sharp");
  const { data, info } = await sharp(coverPath)
    .greyscale()
    .resize(9, 8, { kernel: "lanczos3" })
    .raw()
    .toBuffer({ resolveWithObject: true });
  assert.equal(info.channels, 1);
  let fingerprint = 0n;
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      fingerprint = (fingerprint << 1n)
        | (data[y * 9 + x] > data[y * 9 + x + 1] ? 1n : 0n);
    }
  }
  let distance = fingerprint ^ 0x899c8e880969434bn;
  let changedBits = 0;
  while (distance) {
    changedBits += Number(distance & 1n);
    distance >>= 1n;
  }
  assert.ok(changedBits <= 16,
    "The cover differs too much from the author's approved original; changed bits: " + changedBits);
});
