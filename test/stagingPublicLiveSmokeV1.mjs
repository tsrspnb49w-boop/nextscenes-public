// Read-only staging smoke, no cookies, credentials, mutation or synthetic writes.
// Use curl for GitHub-hosted runners that cannot route native Node 20 undici fetch.
import assert from "node:assert/strict";
import {spawnSync} from "node:child_process";
import {mkdtempSync,readFileSync,rmSync} from "node:fs";
import {tmpdir} from "node:os";
import {join} from "node:path";
const api="https://api-staging.nextscenes.org/api/public-community/v1";
const website="https://public-staging.nextscenes.org/api/public-community";
const temp=mkdtempSync(join(tmpdir(),"ns-staging-smoke-"));
let sequence=0;
function get(url){
 const label=new URL(url).host;
 const headerPath=join(temp,`head-${++sequence}`);
 const ret=spawnSync("curl",[
  "--ipv4","--silent","--show-error","--location",
  "--connect-timeout","8","--max-time","24",
  "--dump-header",headerPath,"--write-out","\\nNS_STATUS:%{http_code}",
  "-H","Accept: application/json",url
 ],{encoding:"utf8",timeout:29000});
 if(ret.error||ret.status!==0){
  const reason=ret.stderr?.trim()||ret.error?.message||`exit ${ret.status}`;
  throw Error(`Staging ${label} is unreachable from GitHub runner: ${reason}`);
 }
 const marker=/\\nNS_STATUS:(\\d{3})\\s*$/m.exec(ret.stdout);
 if(!marker)throw Error(`Missing HTTP status from ${label}`);
 const headers=readFileSync(headerPath,"utf8");
 return {status:Number(marker[1]),body:ret.stdout.slice(0,marker.index),headers};
}
function publicFeed(raw,label){
 assert.equal(raw.status,200,`${label}: public read must return 200`);
 assert.match(raw.headers,/cache-control:\\s*no-store/i);
 const data=JSON.parse(raw.body);
 assert.equal(data.ok,true);
 for(const name of ["threads","development","storylines"])assert.ok(Array.isArray(data[name]),`${label} missing ${name}`);
 for(const thread of data.threads){
  assert.equal(typeof thread.id,"string");
  assert.ok(Array.isArray(thread.replies));
  for(const obj of [thread,...thread.replies])
   for(const key of ["authorId","email","ip","userAgent","session","password","accessToken","isArchived"])
    assert.equal(Object.hasOwn(obj,key),false,`${label}: private key ${key}`);
 }
 return data;
}
try {
 const feed=publicFeed(get(api),"Staging API");
 const page=publicFeed(get(website),"Staging public proxy");
 assert.ok(page.threads.length<=3);
 for(const t of page.threads)assert.ok(feed.threads.some(b=>b.id===t.id));
 const guest=get(api+"/member");
 assert.equal(guest.status,401,"Unauthenticated member lookup must reject");
 console.log("PASS read-only staging API/proxy/guest access smoke");
 console.log("Candidate browser/authenticated acceptance remains separate");
}finally{rmSync(temp,{recursive:true,force:true});}
