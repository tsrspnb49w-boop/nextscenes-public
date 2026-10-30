"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const {resolvePublicAppUrl}=require("../app/lib/discussionReviewAppUrl.js");

const reviewApi="https://nextscenes-review-api-discussion.onrender.com";
const reviewApp="https://nextscenes-review-app-discussion.onrender.com";
const stageApi="https://nextscenes-staging-backend.onrender.com";
const stageApp="https://nextscenes-staging-frontend.onrender.com";
test("review public site requires isolated review login/application origin",()=>{
 assert.equal(resolvePublicAppUrl(reviewApp,reviewApi),reviewApp);
 for(const wrong of [undefined,"","https://app.nextscenes.org",stageApp,"https://attacker.example"])
   assert.throws(()=>resolvePublicAppUrl(wrong,reviewApi),/does not match/);
});
test("staging public site cannot fall back to a production login link",()=>{
 assert.equal(resolvePublicAppUrl(stageApp,stageApi),stageApp);
 assert.throws(()=>resolvePublicAppUrl(undefined,stageApi));
 assert.throws(()=>resolvePublicAppUrl("https://app.nextscenes.org",stageApi));
});
test("existing production default remains unchanged",()=>{
 assert.equal(resolvePublicAppUrl(undefined,"https://api.nextscenes.org"),"https://app.nextscenes.org");
 assert.equal(resolvePublicAppUrl("https://app.nextscenes.org","https://api.nextscenes.org"),"https://app.nextscenes.org");
});
test("both EN/FR public homepages use guarded app URL",()=>{
 for(const path of ["app/page.tsx","app/fr/page.tsx"]){
  const source=fs.readFileSync(path,"utf8");
  assert.ok(source.includes("resolvePublicAppUrl("),path);
  assert.ok(source.includes("NEXT_PUBLIC_NEXTSCENES_API_BASE"),path);
 }
});
