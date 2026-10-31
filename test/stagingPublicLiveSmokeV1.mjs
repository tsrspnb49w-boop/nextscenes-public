// Read-only smoke against LIVE STAGING, not the un-deployed release candidates.
// Never send cookies, tokens, mutation requests, or user content.
import assert from "node:assert/strict";

const api="https://api-staging.nextscenes.org/api/public-community/v1";
const publicUrl="https://public-staging.nextscenes.org/api/public-community";
async function getJson(url){
  const response=await fetch(url,{
    method:"GET",headers:{"Accept":"application/json"},
    signal:AbortSignal.timeout(15000),redirect:"follow",cache:"no-store",
  });
  assert.equal(response.status,200,`Expected public GET 200 from ${new URL(url).host}`);
  assert.match(response.headers.get("cache-control")||"",/no-store/i);
  const value=await response.json();
  assert.equal(value.ok,true);
  assert.ok(Array.isArray(value.threads));
  assert.ok(Array.isArray(value.development));
  assert.ok(Array.isArray(value.storylines));
  return value;
}
function assertPublicOnly(feed){
  for(const thread of feed.threads){
    assert.equal(typeof thread.id,"string");
    assert.equal(typeof thread.text,"string");
    assert.ok(Array.isArray(thread.replies));
    const messages=[thread,...thread.replies];
    for(const item of messages){
      for(const key of ["authorId","email","ip","userAgent","isArchived","session","password","accessToken"]){
        assert.equal(Object.hasOwn(item,key),false,`Unexpected private key: ${key}`);
      }
    }
  }
}
const backend=await getJson(api);
const website=await getJson(publicUrl);
assert.ok(website.threads.length<=3);
assertPublicOnly(backend);
assertPublicOnly(website);
for(const t of website.threads)assert.ok(backend.threads.some(b=>b.id===t.id));
const unauth=await fetch(api+"/member",{
  method:"GET",headers:{"Accept":"application/json"},
  signal:AbortSignal.timeout(15000),redirect:"follow",
});
assert.equal(unauth.status,401,"Unauthenticated member lookup must reject");
console.log("PASS: staging public API + website proxy + anonymous access restriction (read only)");
console.log("NOTE: this does NOT verify candidate deployment, authenticated posting, or browsers");
