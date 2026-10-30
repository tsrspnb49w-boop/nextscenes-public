"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const code=fs.readFileSync("proxy.ts","utf8")
 .replace(/^import .*;\s*/m,"")
 .replace("export function proxy(request:NextRequest)","function proxy(request)")
 .replace("export const config=","const config=");
const env={RENDER_SERVICE_ID:"srv-dbi96qjbc2fs73af0i80",RENDER_SERVICE_NAME:"nextscenes-public-staging"};
function run({host="nextscenes-public-staging.onrender.com",forwarded="",path="/",query="",identity=env}={}){
 const context={URL,process:{env:identity},NextResponse:{
  next(){return {type:"next"};},
  redirect(url,status){return {type:"redirect",url:String(url),status};}
 }};
 const request={
  headers:{get(n){return n==="host"?host:n==="x-forwarded-host"?forwarded:null;}},
  nextUrl:{pathname:path,search:query}
 };
 return vm.runInNewContext(code+"\nproxy(request)",{...context,request});
}
test("old public staging hostname redirects to verified same-site domain",()=>{
 const result=run({path:"/fr",query:"?source=feedback"});
 assert.equal(result.type,"redirect");
 assert.equal(result.status,307);
 assert.equal(result.url,"https://public-staging.nextscenes.org/fr?source=feedback");
});
test("new custom hostname stays on same site",()=>{
 assert.equal(run({host:"public-staging.nextscenes.org"}).type,"next");
});
test("Render forwarded-host fallback resolves old host when internal host differs",()=>{
 assert.equal(run({host:"localhost:10000",forwarded:"nextscenes-public-staging.onrender.com"}).type,"redirect");
});
test("production service never redirects even with old-host header",()=>{
 assert.equal(run({identity:{RENDER_SERVICE_ID:"srv-production",RENDER_SERVICE_NAME:"nextscenes-public"}}).type,"next");
});
test("known redirects cannot target arbitrary hosts or protocols",()=>{
 const r=run({host:"nextscenes-public-staging.onrender.com",path:"/community",query:"?x=1"});
 assert.ok(r.url.startsWith("https://public-staging.nextscenes.org/"));
 assert.ok(!r.url.includes("onrender.com"));
 assert.ok(code.includes('matcher:["/((?!_next/static|_next/image|favicon.ico).*)"]'));
});
