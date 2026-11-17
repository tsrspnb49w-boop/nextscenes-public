const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const homepage = fs.readFileSync(path.join(__dirname, "../components/PublicHomepageV2.tsx"), "utf8");

test("Start writing opens the registration journey rather than a returning-member login", () => {
  assert.ok(homepage.includes('href={`${appUrl}/register?lang=${language}&intent=writer`}'));
  assert.ok(homepage.includes('href={storiesHref}>{t.read}'));
  assert.ok(homepage.includes('headline: "Read a story. Create your own."'));
});

test("joining for free is distinct from buying published books", () => {
  assert.ok(homepage.includes("Explore and join for free · Published books may be sold by retailers"));
  assert.ok(homepage.includes("Explorez et inscrivez-vous gratuitement"));
});

test("A Place in the Sun is shown as published, not awaiting publication", () => {
  assert.ok(homepage.includes('"Published in English · Available on Amazon"'));
  assert.ok(homepage.includes('"Publié en anglais · Disponible sur Amazon"'));
  assert.equal(homepage.includes("Prepared for publication at NextScenes"), false);
  assert.equal(homepage.includes("Préparé pour publication avec NextScenes"), false);
});
