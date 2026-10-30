// Read-only staging preflight. Never posts feedback, reads private records, or logs credentials.
import {pathToFileURL} from "node:url";
const PUBLIC_ORIGIN="https://nextscenes-public-staging.onrender.com";
const API_ORIGIN="https://nextscenes-staging-backend.onrender.com";
const status=(ok,message)=>({ok:Boolean(ok),message});
export function cookieSafety(setCookie){
  const cookie=String(setCookie||"");
  if(!/(?:^|,|\s)ns\.csrf=/.test(cookie))return status(false,"CSRF cookie was not issued");
  if(/;\s*Domain\s*=\s*\.?nextscenes\.org(?:;|$)/i.test(cookie))
    return status(false,"Staging CSRF cookie uses production nextscenes.org domain");
  if(/;\s*Domain\s*=/i.test(cookie))
    return status(false,"Staging CSRF cookie must be host-only on onrender.com");
  if(!/;\s*HttpOnly(?:;|$)/i.test(cookie))return status(false,"CSRF cookie lacks HttpOnly");
  if(!/;\s*Secure(?:;|$)/i.test(cookie))return status(false,"CSRF cookie lacks Secure");
  if(!/;\s*SameSite\s*=\s*None(?:;|$)/i.test(cookie))
    return status(false,"Cross-origin staging CSRF cookie requires SameSite=None");
  return status(true,"Host-only secure HttpOnly CSRF cookie issued");
}
export function corsSafety(headers){
  const origin=headers.get("access-control-allow-origin");
  const credentials=headers.get("access-control-allow-credentials");
  return status(origin===PUBLIC_ORIGIN&&credentials==="true",
    origin===PUBLIC_ORIGIN&&credentials==="true"?
      "Exact public-staging origin and credentials permitted":
      "Staging CORS must allow only the expected public-staging origin with credentials");
}
async function request(url,init={}){
  return fetch(url,{...init,redirect:"error",signal:AbortSignal.timeout(12000)});
}
export async function runPreflight(fetcher=request){
  const results=[];
  async function check(title,fn){
    try{const r=await fn();results.push({title,...r});}
    catch{results.push({title,ok:false,message:"Request failed; check staging connectivity or TLS"});}
  }
  await check("Public staging read-only proxy",async()=>{
    const r=await fetcher(PUBLIC_ORIGIN+"/api/public-community");
    const d=await r.json();
    return status(r.ok&&d?.ok===true&&Array.isArray(d.threads),
      r.ok?"Public-only discussion response available":"Public community unavailable");
  });
  await check("Public API authentication requires sign-in",async()=>{
    const r=await fetcher(API_ORIGIN+"/api/public-community/v1/member",{
      headers:{Origin:PUBLIC_ORIGIN,Accept:"application/json"}
    });
    return status(r.status===401,
      r.status===401?"Unauthenticated request correctly rejected":
      "Expected HTTP 401 from staging member probe (requires review backend)");
  });
  await check("CSRF cookie origin and attributes",async()=>{
    const r=await fetcher(API_ORIGIN+"/api/csrf",{
      headers:{Origin:PUBLIC_ORIGIN,Accept:"application/json"}
    });
    if(!r.ok)return status(false,"CSRF bootstrap unavailable");
    const cookie=cookieSafety(r.headers.get("set-cookie"));
    const cors=corsSafety(r.headers);
    return status(cookie.ok&&cors.ok,cookie.message+"; "+cors.message);
  });
  await check("CORS preflight for comment POST",async()=>{
    const r=await fetcher(API_ORIGIN+"/api/public-community/v1/feedback",{
      method:"OPTIONS",
      headers:{Origin:PUBLIC_ORIGIN,
        "Access-Control-Request-Method":"POST",
        "Access-Control-Request-Headers":"content-type,x-csrf-token"}
    });
    const cors=corsSafety(r.headers);
    const allowedMethods=r.headers.get("access-control-allow-methods")||"";
    const allowedHeaders=r.headers.get("access-control-allow-headers")||"";
    const ok=r.ok&&cors.ok&&/\bPOST\b/i.test(allowedMethods)&&/x-csrf-token/i.test(allowedHeaders);
    return status(ok,ok?"Authenticated POST CORS preflight accepted":
      "Posting CORS preflight unavailable or missing CSRF header permission");
  });
  return results;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
  const checks=await runPreflight();
  for(const check of checks){
    process.stdout.write((check.ok?"PASS ":"FAIL ")+check.title+": "+check.message+"\n");
  }
  process.stdout.write("NOTE: No authenticated browser test was performed. Session cookie and third-party browser policies still need real-browser verification.\n");
  if(checks.some(c=>!c.ok))process.exitCode=1;
}
