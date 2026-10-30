import test from "node:test";
import assert from "node:assert/strict";
import {cookieSafety,corsSafety,runPreflight} from "../scripts/publicFeedbackStagingPreflight.mjs";
const cookie="ns.csrf=hidden; Path=/; HttpOnly; Secure; SameSite=None";
test("accepts only secure host-only staging CSRF cookie attributes",()=>{
  assert.equal(cookieSafety(cookie).ok,true);
  for(const bad of [
    "ns.csrf=hidden; Path=/; Domain=.nextscenes.org; HttpOnly; Secure; SameSite=None",
    "ns.csrf=hidden; Path=/; Domain=.onrender.com; HttpOnly; Secure; SameSite=None",
    "ns.csrf=hidden; Path=/; HttpOnly; SameSite=None",
    "ns.csrf=hidden; Path=/; Secure; SameSite=None",
    "ns.csrf=hidden; Path=/; HttpOnly; Secure; SameSite=Lax",
    ""
  ])assert.equal(cookieSafety(bad).ok,false,bad.split(";").slice(1).join(";"));
});
test("preflight requires exact allowed origin and credentials",()=>{
 const headers=new Headers({
  "access-control-allow-origin":"https://nextscenes-public-staging.onrender.com",
  "access-control-allow-credentials":"true",
 });
 assert.equal(corsSafety(headers).ok,true);
 headers.set("access-control-allow-origin","*");
 assert.equal(corsSafety(headers).ok,false);
 headers.set("access-control-allow-origin","https://nextscenes.org");
 assert.equal(corsSafety(headers).ok,false);
 headers.set("access-control-allow-origin","https://nextscenes-public-staging.onrender.com");
 headers.delete("access-control-allow-credentials");
 assert.equal(corsSafety(headers).ok,false);
});
test("read-only preflight checks precisely GET and OPTIONS and never POSTs",async()=>{
 const calls=[];
 const fetcher=async(url,init={})=>{
   calls.push({url,method:init.method||"GET"});
   const headers=new Headers({
    "access-control-allow-origin":"https://nextscenes-public-staging.onrender.com",
    "access-control-allow-credentials":"true",
    "access-control-allow-methods":"GET,POST,OPTIONS",
    "access-control-allow-headers":"Content-Type,X-CSRF-Token",
    "set-cookie":cookie,
   });
   const code=url.endsWith("/v1/member")?401:200;
   return {ok:code===200,status:code,headers,json:async()=>({ok:true,threads:[]})};
 };
 const result=await runPreflight(fetcher);
 assert.equal(result.length,4);
 assert.deepEqual(calls.map(x=>x.method),["GET","GET","GET","OPTIONS"]);
 assert.ok(calls.every(x=>x.url.includes("staging")&&!x.url.includes("api.nextscenes.org")));
 assert.ok(result.every(x=>x.ok),JSON.stringify(result));
});
