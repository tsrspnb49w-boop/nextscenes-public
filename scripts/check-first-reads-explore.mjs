import assert from "node:assert/strict";
import fs from "node:fs";
const read = (file) => fs.readFileSync(new URL("../" + file, import.meta.url), "utf8");
const homepage = read("components/PublicHomepageV2.tsx");
const explore = read("components/FirstReadsExploreCollection.tsx");
const english = read("app/first-reads/page.tsx");
const french = read("app/fr/first-reads/page.tsx");
const enExplore = read("app/first-reads/explore/page.tsx");
const frExplore = read("app/fr/first-reads/explore/page.tsx");
const firstReadsCard = homepage.split('aria-label={language === "fr" ? "Découvrir First Reads"')[1].split('</aside>')[0];
assert(firstReadsCard.includes('href={language === "fr" ? "/fr/first-reads/explore" : "/first-reads/explore"}'), "Homepage First Reads card must open Explore");
assert(!firstReadsCard.includes("https://staging.nextscenes.org/my-projects"), "Homepage should not bypass Explore to Project Hub");
assert(english.includes('redirect("/first-reads/explore")'), "Old English entry must redirect");
assert(french.includes('redirect("/fr/first-reads/explore")'), "Old French entry must redirect");
assert(enExplore.includes('FirstReadsExploreCollection language="en"'), "Explore EN page must use consolidated component");
assert(frExplore.includes('FirstReadsExploreCollection language="fr"'), "Explore FR page must use consolidated component");
for (const marker of [
  "data-first-reads-explore-v2",
  "data-first-reads-empty-collection",
  "data-first-reads-go-project-hub",
  "Go to Project Hub",
  "Back to homepage",
  "Review Your Book",
  "my-projects?firstReads=1",
  "/register?intent=writer&firstReads=1",
  "/login?firstReads=1",
  "publication remain disabled",
]) assert(explore.includes(marker), "Missing Explore content or safeguard: " + marker);
assert(!explore.includes("api/first-reads/mine"), "Private book intake must not be queried by public collection");
console.log("First Reads homepage, bilingual Explore, redirects and privacy safeguards verified.");
