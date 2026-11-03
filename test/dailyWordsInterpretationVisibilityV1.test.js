"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const page = fs.readFileSync(path.join(__dirname, "../components/PublicHomepageV2.tsx"), "utf8");

test("public Daily Words interpretation starts visible but stays collapsible", () => {
  assert.match(page, /spotlight\?\.daily\?\.reflectionFr\s*:\s*spotlight\?\.daily\?\.reflection/);
  assert.match(page, /<details className=\{styles\.spotlightDetails\} open>/);
  assert.match(page, /A thought to consider/);
  assert.match(page, /Une pensée à approfondir/);
  assert.match(page, /spotlight\.daily\.dateLabelFr \|\| spotlight\.daily\.dateLabel/);
});
