// Optional, public-site-only GA4. Never load a third-party tag on staging.
export const ID = "G-FE8MNKJ82Y";
export const KEY = "ns.publicAnalyticsConsentV1";
const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
const DENIED = {analytics_storage:"denied",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"};
const controllers = new WeakMap();
const blocked = new WeakSet();
/** @param {any} w */
export function isProduction(w) {
  return w.location.protocol === "https:" && ["nextscenes.org","www.nextscenes.org"].includes(w.location.hostname);
}
/** @param {any} w */
export function readChoice(w) {
  try {
    const value = JSON.parse(w.localStorage.getItem(KEY) || "null");
    if (value && (value.choice === "yes" || value.choice === "no") &&
        Number.isFinite(value.at) && value.at <= Date.now() && Date.now()-value.at < MAX_AGE) return value.choice;
  } catch {}
  return null;
}
/** @param {any} w @param {"yes"|"no"} choice */
export function saveChoice(w,choice) {
  try {
    w.localStorage.setItem(KEY,JSON.stringify({choice,at:Date.now()}));
    const saved = readChoice(w) === choice;
    if (saved) blocked.delete(w); else blocked.add(w);
    return saved;
  } catch { blocked.add(w); return false; }
}
/** @param {any} w */
function clearAnalyticsCookies(w) {
  try {
    for (const cookie of w.document.cookie.split(";")) {
      const name = cookie.split("=")[0].trim();
      if (!/^_ga(?:_[A-Za-z0-9_]+)?$/.test(name)) continue;
      for (const domain of ["","; Domain="+w.location.hostname,"; Domain=nextscenes.org"])
        w.document.cookie = name+"=; Max-Age=0; Path=/"+domain+"; SameSite=Lax; Secure";
    }
  } catch {}
}
/** @param {any} w */
export function stop(w) {
  w["ga-disable-"+ID] = true;
  const state = controllers.get(w);
  if (state) state.last = null;
  if (isProduction(w)) clearAnalyticsCookies(w);
}
/** @param {any} w @param {string} path */
function safeLocation(w,path) {
  // Public routes only. No query, hash, manuscript IDs or arbitrary input.
  const p = /^(?:\/fr)?\/(?:books(?:\/[a-z0-9-]{1,100})?|publishing-services|services-edition|writers|auteurs|faq|help|contact|privacy|terms|mystery250|first-reads|premieres-lectures)?\/?$/.test(path) || path === "/fr" ? path : "/other";
  return w.location.origin + p;
}
/** @param {any} w */
function safeReferrer(w) {
  try { const u = new URL(w.document.referrer); return /^https?:$/.test(u.protocol) ? u.origin+"/" : ""; } catch { return ""; }
}
// Only fixed public marketing labels may leave the site. Never forward raw query strings.
const CAMPAIGN_SOURCES = new Set(["facebook","instagram","tiktok"]);
const CAMPAIGN_MEDIA = new Set(["social","organic_social"]);
const CAMPAIGN_NAMES = new Set(["book_spotlight","didie_global"]);
/** @param {any} w */
function safeCampaign(w) {
  try {
    const p = new URLSearchParams(w.location.search || "");
    const single = (/** @type {string} */ key) => p.getAll(key).length === 1 ? p.get(key) : null;
    const source = single("utm_source");
    const medium = single("utm_medium");
    const name = single("utm_campaign");
    if (!source || !medium || !CAMPAIGN_SOURCES.has(source) || !CAMPAIGN_MEDIA.has(medium)) return {};
    return {campaign_source:source,campaign_medium:medium,...(name && CAMPAIGN_NAMES.has(name) ? {campaign_name:name} : {})};
  } catch { return {}; }
}
/** @param {any} w @param {string} path */
export function syncAnalytics(w,path) {
  if (!isProduction(w) || blocked.has(w) || readChoice(w) !== "yes") { stop(w); return false; }
  let state = controllers.get(w);
  w["ga-disable-"+ID] = false;
  const location = safeLocation(w,path);
  if (!state) {
    w.dataLayer = w.dataLayer || [];
    w.gtag = function(){ w.dataLayer.push(arguments); };
    w.gtag("consent","default",DENIED);
    w.gtag("consent","update",{...DENIED,analytics_storage:"granted"});
    w.gtag("js",new Date());
    w.gtag("config",ID,{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,
      cookie_expires:15552000,cookie_update:false,page_location:location,page_referrer:safeReferrer(w),page_title:"NextScenes",...safeCampaign(w)});
    state={last:null};
    controllers.set(w,state);
    const script=w.document.createElement("script");
    script.async=true;
    script.referrerPolicy="no-referrer";
    script.src="https://www.googletagmanager.com/gtag/js?id="+ID;
    w.document.head.appendChild(script);
  }
  if (state.last !== location) {
    w.gtag("set",{page_location:location,page_referrer:safeReferrer(w),page_title:"NextScenes"});
    w.gtag("event","page_view",{send_to:ID,page_location:location,page_referrer:safeReferrer(w),page_title:"NextScenes"});
    state.last=location;
  }
  return true;
}
