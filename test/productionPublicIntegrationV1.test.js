"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const ui=fs.readFileSync(path.join(root,"components/PublicCommunityThreadsV1.tsx"),"utf8");
const proxy=fs.readFileSync(path.join(root,"app/api/public-community/route.ts"),"utf8");
function clientApi(host,env={}){
 const start=ui.indexOf(" const configuredApiBase=");
 const end=ui.indexOf(" const activeAppUrl=",start);
 assert.ok(start>0 && end>start,"Client API selector must exist");
 const source=ui.slice(start,end);
 return vm.runInNewContext(source+"\napiBase;",{
   window:{location:{hostname:host}},
   process:{env:{...env}},
 });
}
test("production public homepage always uses its own first-party API, even without a public env variable",()=>{
 for(const host of ["nextscenes.org","www.nextscenes.org"]){
   assert.equal(clientApi(host),"https://api.nextscenes.org");
   assert.equal(clientApi(host,{NEXT_PUBLIC_API_BASE:"https://nextscenes-staging-backend.onrender.com"}),"https://api.nextscenes.org");
 }
});
test("staging and production website comment endpoints cannot silently cross",()=>{
 assert.equal(clientApi("public-staging.nextscenes.org"),"https://api-staging.nextscenes.org");
 assert.equal(clientApi("nextscenes-public-staging.onrender.com"),"https://nextscenes-staging-backend.onrender.com");
 assert.equal(clientApi("unrecognised.preview.example"),"");
});
test("public read proxy has production Render identity, no public write route, and no legacy private feedback feed",()=>{
 assert.ok(proxy.includes('serviceId==="srv-d62fm2onputs73b2dr7g"'));
 assert.ok(proxy.includes('"https://api.nextscenes.org"'));
 assert.ok(proxy.includes('"/api/public-community/v1"'));
 assert.ok(!proxy.includes('export async function POST('));
 assert.ok(!proxy.includes('origin + "/api/feedback/live"'));
});
test("comment and nested reply requests use shared API, CSRF, and server ownership",()=>{
 for(const marker of [
  'apiBase+"/api/public-community/v1/member"',
  'apiBase+"/api/public-community/v1/feedback"',
  'apiBase+"/api/csrf"',
  'credentials:"include"',
  'body:JSON.stringify({storyId,parentId,replyToId,text:text.trim()})',
  'canInteract=memberStatus==="writer"&&ownerScanKey===visibleIdsKey',
  'if(!canInteract||owned.has(root.id)||posting||!root.storyId)return;',
 ])assert.ok(ui.includes(marker),marker);
});
