"use strict";
const test=require("node:test"), assert=require("node:assert/strict"),
  fs=require("node:fs"), path=require("node:path");
const src=(f)=>fs.readFileSync(path.join(__dirname,"..",f),"utf8");
const icons=src("components/SocialPlatformIcon.tsx");
const home=src("components/PublicHomepageV2.tsx");
const footer=src("components/SiteFooter.tsx");
const css=src("components/PublicHomepageV2.module.css");
test("Three official destination entries shared between homepage and footer",()=>{
  for(const label of ["Facebook","Instagram","YouTube"])assert.match(icons,new RegExp('name: "'+label+'"'));
  assert.match(home,/SOCIAL_CHANNELS\.map/);
  assert.match(footer,/SOCIAL_CHANNELS\.map/);
  assert.doesNotMatch(footer,/NextScenes on X|X link pending/);
});
test("Social cards and footer include accessible vector icons with safe external links",()=>{
  assert.match(icons,/aria-hidden="true"/);
  assert.match(home,/SocialPlatformIcon platform=\{channel\.id\}/);
  assert.match(footer,/SocialPlatformIcon platform=\{channel\.id\}/);
  assert.match(home,/rel="noopener noreferrer"/);
  assert.match(footer,/rel="noopener noreferrer"/);
  assert.match(css,/\.socialConversationIcon/);
});
