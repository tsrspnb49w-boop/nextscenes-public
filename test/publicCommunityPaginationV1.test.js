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

test("public server proxy never mixes staging and production API origins",()=>{
 assert.ok(api.includes("function permittedUpstream(siteHost:string,apiBase:string)"));
 assert.ok(api.includes('host==="nextscenes-public-staging.onrender.com"'));
 assert.ok(api.includes('api.origin==="https://nextscenes-staging-backend.onrender.com"'));
 assert.ok(api.includes('api.origin==="https://api.nextscenes.org"'));
 assert.ok(api.includes('permittedUpstream(request.nextUrl.hostname,origin)'));
 assert.ok(!api.includes('if(!/^https:'));
});
