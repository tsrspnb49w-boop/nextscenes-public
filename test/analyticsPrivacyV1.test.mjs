import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {ID,KEY,isProduction,readChoice,saveChoice,stop,syncAnalytics} from "../lib/analyticsConsentV1.mjs";
function browser(host="www.nextscenes.org",protocol="https:"){
 const store=new Map(),scripts=[];
 return {location:{hostname:host,protocol,origin:protocol+"//"+host},
 localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)},
 document:{cookie:"",referrer:"https://www.google.com/search?q=private",createElement:()=>({}),head:{appendChild:s=>scripts.push(s)}},scripts};
}
test("no load without affirmative consent; decline never loads",()=>{const w=browser();assert.equal(syncAnalytics(w,"/"),false);assert.equal(w.scripts.length,0);saveChoice(w,"no");assert.equal(syncAnalytics(w,"/"),false);assert.equal(w.scripts.length,0);});
test("only exact HTTPS production hosts allowed",()=>{for(const host of ["localhost","staging.nextscenes.org","public-staging.nextscenes.org","nextscenes-public-staging.onrender.com","nextscenes.org.example.com","app.nextscenes.org"]){const w=browser(host);saveChoice(w,"yes");assert.equal(isProduction(w),false);assert.equal(syncAnalytics(w,"/"),false);assert.equal(w.scripts.length,0);}assert.equal(isProduction(browser("nextscenes.org")),true);assert.equal(isProduction(browser("www.nextscenes.org","http:")),false);});
test("consent precedes config, advertising denied, one tag, sanitized page events",()=>{const w=browser();saveChoice(w,"yes");assert.equal(syncAnalytics(w,"/books/sample"),true);syncAnalytics(w,"/books/sample");syncAnalytics(w,"/contact?private=1");assert.equal(w.scripts.length,1);const calls=w.dataLayer.map(x=>Array.from(x));assert.equal(calls[0][0],"consent");assert.equal(calls[0][2].analytics_storage,"denied");assert.equal(calls[1][2].analytics_storage,"granted");assert.equal(calls[1][2].ad_storage,"denied");assert.equal(calls[1][2].ad_user_data,"denied");assert.equal(calls[1][2].ad_personalization,"denied");const config=calls.find(x=>x[0]==="config")[2];assert.equal(config.allow_google_signals,false);assert.equal(config.allow_ad_personalization_signals,false);assert.equal(config.send_page_view,false);const events=calls.filter(x=>x[0]==="event");assert.equal(events.length,2);assert.equal(events[0][2].page_referrer,"https://www.google.com/");assert.equal(events[1][2].page_location,"https://www.nextscenes.org/other");});
test("withdrawal stops later events; expired or inaccessible storage fails closed",()=>{const w=browser();saveChoice(w,"yes");syncAnalytics(w,"/");saveChoice(w,"no");stop(w);const count=w.dataLayer.length;assert.equal(syncAnalytics(w,"/books"),false);assert.equal(w["ga-disable-"+ID],true);assert.equal(w.dataLayer.length,count);w.localStorage.setItem(KEY,JSON.stringify({choice:"yes",at:0}));assert.equal(readChoice(w),null);const x=browser();x.localStorage.getItem=()=>{throw Error("blocked")};assert.equal(syncAnalytics(x,"/"),false);assert.equal(x.scripts.length,0);});
test("root uses consent-gated footer loader; bilingual policy present",()=>{const layout=readFileSync("app/layout.tsx","utf8");assert.match(layout,/<SiteFooter/);assert.match(readFileSync("components/SiteFooter.tsx","utf8"),/<AnalyticsPrivacyV1\s*\/>/);assert.doesNotMatch(layout,/googletagmanager|gtag\(/);for(const file of ["app/privacy/page.tsx","app/fr/privacy/page.tsx"]){assert.match(readFileSync(file,"utf8"),/Google Analytics/);}});
test("failed preference write cannot re-enable tracking in this page",()=>{const w=browser();saveChoice(w,"yes");syncAnalytics(w,"/");w.localStorage.setItem=()=>{throw Error("blocked")};assert.equal(saveChoice(w,"no"),false);assert.equal(syncAnalytics(w,"/books"),false);assert.equal(w["ga-disable-"+ID],true);});
test("cookie notice uses non-modal overlay and retains equal consent controls",()=>{const ui=readFileSync("components/AnalyticsPrivacyV1.tsx","utf8");assert.match(ui,/createPortal\(/);assert.match(ui,/position:"fixed"/);assert.match(ui,/choose\("yes"\)/);assert.match(ui,/choose\("no"\)/);assert.match(ui,/Privacy preferences/);assert.doesNotMatch(ui,/aria-modal|showModal/);});

test("only known public campaign labels are explicitly configured after consent",()=>{
 for(const source of ["facebook","instagram","tiktok"]){
  const w=browser();w.location.search="?utm_source="+source+"&utm_medium=social&utm_campaign=book_spotlight&email=private@example.com&token=secret&utm_content=private";
  assert.equal(syncAnalytics(w,"/books/didie"),false);assert.equal(w.scripts.length,0);assert.equal(w.dataLayer,undefined);
  saveChoice(w,"yes");syncAnalytics(w,"/books/didie");syncAnalytics(w,"/books");
  const calls=w.dataLayer.map(x=>Array.from(x)),configs=calls.filter(x=>x[0]==="config");
  assert.equal(configs.length,1);assert.equal(configs[0][2].campaign_source,source);assert.equal(configs[0][2].campaign_medium,"social");assert.equal(configs[0][2].campaign_name,"book_spotlight");assert.equal(configs[0][2].page_location,"https://www.nextscenes.org/books/didie");
  assert.doesNotMatch(JSON.stringify(calls),/private@example|secret|utm_content|utm_source=/);
 }
});
test("reject unknown, duplicated and personal campaign labels; staging sends nothing",()=>{
 for(const q of ["?utm_source=private%40example.com&utm_medium=social","?utm_source=facebook&utm_source=tiktok&utm_medium=social","?utm_source=facebook&utm_medium=unknown","?utm_source=facebook&utm_medium=social&utm_campaign=private%40example.com"]){
  const w=browser();w.location.search=q;saveChoice(w,"yes");syncAnalytics(w,"/");
  const config=w.dataLayer.map(x=>Array.from(x)).find(x=>x[0]==="config")[2];
  assert.equal(config.campaign_name,undefined);assert.doesNotMatch(JSON.stringify(w.dataLayer),/private@example|unknown/);
  if(!q.includes("utm_campaign="))assert.equal(config.campaign_source,undefined);
 }
 for(const host of ["public-staging.nextscenes.org","nextscenes-public-staging.onrender.com"]){
  const w=browser(host);w.location.search="?utm_source=facebook&utm_medium=social&utm_campaign=book_spotlight";saveChoice(w,"yes");assert.equal(syncAnalytics(w,"/"),false);assert.equal(w.dataLayer,undefined);assert.equal(w.scripts.length,0);
 }
});

test("public navigation does not probe sessions; bilingual app destination is unchanged",()=>{const nav=readFileSync("components/SiteNav.tsx","utf8");assert.doesNotMatch(nav,/\/api\/auth\/me|checkAuth|authHint|isLikelyAuthedPayload/);assert.match(nav,/Entrer dans l’App/);assert.match(nav,/Enter the App/);assert.ok(nav.includes('const appCtaHref = `${APP_URL}/?lang=${isFR ? "fr" : "en"}`;'));assert.match(nav,/href=\{appCtaHref\}/);});


test("public More menu links directly to the existing bilingual Reader View",()=>{
  const nav=readFileSync("components/SiteNav.tsx","utf8");
  assert.ok(nav.includes('{ href: "/reader-view", appRoute: true, en: "Reader View", fr: "Espace de lecture" }'));
  assert.ok(nav.includes('if (link.appRoute) return `${APP_URL}${link.href}?lang=${isFR ? "fr" : "en"}`;'));
  assert.match(nav,/MORE\.map\(\(l\) => \{\s*const href = localizedHref\(l\)/);
  assert.doesNotMatch(nav,/\/api\/auth\/me/);
});
