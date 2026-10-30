"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const root=path.resolve(__dirname,"..");
const api=fs.readFileSync(path.join(root,"app/api/public-community/route.ts"),"utf8");
const ui=fs.readFileSync(path.join(root,"components/PublicCommunityThreadsV1.tsx"),"utf8");
const css=fs.readFileSync(path.join(root,"components/PublicCommunityThreadsV1.module.css"),"utf8");
test("public read proxy does not expose private or direct feedback writes",()=>{
 assert.ok(api.includes('"/api/public-community/v1"'));
 assert.ok(!api.includes('origin + "/api/feedback/live"'));
 assert.ok(!api.includes("export async function POST("));
 assert.ok(api.includes('raw.length?10:3'));
 assert.ok(api.includes('CURSOR.test(raw[0])'));
});
test("UI pages older threads in batches without discarding loaded pages",()=>{
 assert.ok(ui.includes("loadOlder=useCallback"));
 assert.ok(ui.includes("encodeURIComponent(nextBefore)"));
 assert.ok(ui.includes("...prev,...older.filter"));
 assert.ok(ui.includes("pagingActive.current=true"));
 assert.ok(ui.includes('void refresh({resetPaging:true})'));
 assert.ok(ui.includes('Charger des discussions précédentes'));
 assert.ok(ui.includes('Load older discussions'));
});
test("scroll region is keyboard-operable and respects reduced motion",()=>{
 assert.ok(ui.includes('role="region"'));
 assert.ok(ui.includes("tabIndex={0}"));
 assert.ok(css.includes("overflow-y:auto"));
 assert.ok(css.includes("prefers-reduced-motion:reduce"));
});

test("live feedback client offers authenticated public root comment and inline replies",()=>{
 assert.ok(ui.includes('memberStatus==="member"'));
 assert.ok(ui.includes('apiBase+"/api/public-community/v1/member"'));
 assert.ok(ui.includes('apiBase+"/api/public-community/v1/feedback"'));
 assert.ok(ui.includes('apiBase+"/api/csrf"'));
 assert.ok(ui.includes('credentials:"include"'));
 assert.ok(ui.includes('"X-CSRF-Token":token'));
 assert.ok(ui.includes('Post comment'));
 assert.ok(ui.includes('Post reply'));
 assert.ok(ui.includes('Publier le commentaire'));
 assert.ok(ui.includes('Publier la réponse'));
 assert.ok(ui.includes('parentId,text:text.trim()'));
 assert.ok(ui.includes('data.storylines.filter('));
 assert.ok(ui.includes('storylines.map(story=>'));
});
test("the public site's own Next API route never accepts feedback writes",()=>{
 assert.ok(!api.includes("export async function POST"));
 assert.ok(api.includes('storylines:Array.isArray(data.storylines)'));
 assert.ok(api.includes('"/api/public-community/v1"'));
});

test("public feedback writes fail closed on staging/production API mismatch",()=>{
 assert.ok(ui.includes('function trustedFeedbackApi(base:string)'));
 assert.ok(ui.includes('page==="nextscenes-public-staging.onrender.com"'));
 assert.ok(ui.includes('target==="nextscenes-staging-backend.onrender.com"'));
 assert.ok(ui.includes('page==="nextscenes.org"||page==="www.nextscenes.org"'));
 assert.ok(ui.includes('target==="api.nextscenes.org"'));
 assert.ok(ui.includes('if(!trustedFeedbackApi(apiBase))'));
 assert.ok(!ui.includes("localStorage.getItem"));
});

test("public read proxy chooses an exact API by server-owned Render identity, not by request headers",()=>{
 const match=api.match(/function trustedFeedbackOrigin\(\)\{[\s\S]*?\n\}/);
 assert.ok(match,"Trusted origin function must exist");
 const vm=require("node:vm");
 const probe=env=>vm.runInNewContext(match[0]+"; trustedFeedbackOrigin()",{process:{env}});
 assert.equal(probe({RENDER_SERVICE_ID:"srv-dbi96qjbc2fs73af0i80"}),"https://nextscenes-staging-backend.onrender.com");
 assert.equal(probe({RENDER_SERVICE_NAME:"nextscenes-public-staging"}),"https://nextscenes-staging-backend.onrender.com");
 assert.equal(probe({RENDER_SERVICE_ID:"srv-d62fm2onputs73b2dr7g"}),"https://api.nextscenes.org");
 assert.equal(probe({RENDER_SERVICE_NAME:"nextscenes-public"}),"https://api.nextscenes.org");
 assert.equal(probe({RENDER_SERVICE_NAME:"unknown",RENDER_SERVICE_ID:"unknown"}),"");
 assert.equal(probe({}),"");
 assert.ok(api.includes('if(!origin){'));
 assert.ok(!api.includes('permittedUpstream(request.nextUrl.hostname'));
 assert.ok(!api.includes('origin + "/api/feedback/live"'));
});
test("Live Feedback has an actual bounded scrolling viewport even with a short preview",()=>{
 assert.ok(css.includes("height:min(440px,55vh)"));
 assert.ok(css.includes("scrollbar-gutter:stable"));
 assert.ok(css.includes("overflow-y:auto"));
 assert.ok(ui.includes('aria-label={isFR?"Liste défilante des discussions publiques":"Scrollable public discussion list"}'));
});

test("member composer uses the staging login and API on staging and keeps production API unchanged",()=>{
 assert.ok(ui.includes('window.location.hostname==="nextscenes-public-staging.onrender.com"'));
 assert.ok(ui.includes('isStagingPublic?"https://nextscenes-staging-backend.onrender.com":configuredApiBase'));
 assert.ok(ui.includes('isStagingPublic?"https://nextscenes-staging-frontend.onrender.com/login":appUrl+"/login"'));
 assert.ok(ui.includes('window.addEventListener("focus",recheck)'));
 assert.ok(ui.includes('window.addEventListener("visibilitychange",recheck)'));
 assert.ok(ui.includes('window.removeEventListener("focus",recheck)'));
 assert.ok(ui.includes('if(active)setMemberStatus(result.ok?"member":result.status===401?"guest":"unavailable")'));
 assert.ok(ui.includes('memberStatus==="member"&&item.storyId&&<button'));
 assert.ok(ui.includes('memberStatus==="member"&&replyTo===item.id&&item.storyId&&'));
 assert.ok(ui.includes('credentials:"include"'));
});
