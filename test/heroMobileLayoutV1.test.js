const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const markup = fs.readFileSync(path.join(root, "components/PublicHomepageV2.tsx"), "utf8");
const css = fs.readFileSync(path.join(root, "components/PublicHomepageV2.module.css"), "utf8");

test("hero support links wrap instead of forcing the mobile grid to grow", () => {
  assert.match(markup, /<div className=\{styles\.heroHelpLinks\}>/);
  assert.match(css, /\.heroHelpLinks\s*\{[^}]*display:\s*flex;[^}]*flex-wrap:\s*wrap;/);
  assert.match(css, /\.heroHelpLinks \.textLink\s*\{[^}]*white-space:\s*normal;/);
  assert.match(css, /\.heroCopy, \.artStage\s*\{[^}]*min-width:\s*0;/);
  assert.match(css, /@media \(max-width: 720px\)\s*\{\s*\.heroInner\s*\{\s*grid-template-columns:\s*minmax\(0, 1fr\);/);
});

test("curated three-cover art and page navigation remain intact", () => {
  assert.match(markup, /The Kingdom Beneath the Baobab/);
  assert.match(markup, /The Trials of Tarllus/);
  assert.match(markup, /Shadows of the Harbour/);
  assert.match(markup, /heroCovers\.map/);
  assert.match(markup, /className=\{\x60\$\{styles\.artCover\}/);
  assert.match(markup, /href=\{storiesHref\}/);
});

test("narrow-width cover arrangements fit inside the available hero width", () => {
  const widthAt = (viewportWidth) => viewportWidth - 36; // .wrap has 18px sides
  const rotatedHalfWidth = (w, h, degrees) => (
    w * Math.cos(degrees * Math.PI / 180) +
    h * Math.sin(degrees * Math.PI / 180)
  ) / 2;
  for (const viewport of [320, 350, 375, 390, 391, 430]) {
    const narrow = viewport <= 350;
    const small = viewport <= 390;
    const w = narrow ? 93 : small ? 106 : 120;
    const h = narrow ? 136 : small ? 150 : 170;
    const shift = narrow ? 62 : small ? 72 : 97;
    const degrees = narrow ? 8 : small ? 9 : 10;
    const edge = shift + rotatedHalfWidth(w, h, degrees);
    assert.ok(edge <= widthAt(viewport) / 2,
      "The side covers must fit at " + viewport + "px");
  }
  assert.match(css, /@media \(max-width: 390px\)/);
  assert.match(css, /@media \(max-width: 350px\)/);
});
