"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const root=path.resolve(__dirname,"..");
const api=fs.readFileSync(path.join(root,"app/api/public-community/route.ts"),"utf8");
const ui=fs.readFileSync(path.join(root,"components/PublicCommunityThreadsV1.tsx"),"utf8");
const css=fs.readFileSync(path.join(root,"components/PublicCommunityThreadsV1.module.css"),"utf8");
const developing=fs.readFileSync(path.join(root,"components/DevelopingStoriesV1.tsx"),"utf8");
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
 assert.ok(ui.includes('memberStatus==="writer"'));
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
 assert.ok(ui.includes('window.addEventListener("focus",recheck)'));
 assert.ok(ui.includes('document.addEventListener("visibilitychange",recheck)'));
 assert.ok(ui.includes('document.removeEventListener("visibilitychange",recheck)'));
 assert.ok(ui.includes('window.removeEventListener("focus",recheck)'));
 assert.ok(ui.includes('identity?.canWrite===true?"writer":"reader"'));
 assert.ok(ui.includes('item.storyId&&<button'));
 assert.ok(ui.includes('memberStatus==="reader"&&<p'));
 assert.ok(!ui.includes('memberStatus!=="writer"&&replyTo===item.id&&item.storyId&&'));
 assert.ok(ui.includes('memberStatus==="writer"&&replyTo===item.id&&item.storyId&&'));
 assert.ok(ui.includes('credentials:"include"'));
});

test("public feedback uses the existing shared replies endpoint for clicked comments and emoji",()=>{
 assert.ok(ui.includes('const activateReply=(root:Thread,mention="")=>'));
 assert.ok(ui.includes('onClick={()=>activateReply(item)}'));
 assert.ok(ui.includes('onClick={()=>activateReply(item,"@"+reply.author+" ")}'));
 assert.ok(ui.includes('const quickEmojis=["👍","❤️","😊","👏"]'));
 assert.ok(ui.includes('void postPublic(emoji,root.storyId,root.id)'));
 assert.ok(ui.includes('onClick={()=>addEmoji(item,emoji)}'));
 assert.ok(ui.includes('memberStatus==="reader"&&<p'));
 assert.ok(!ui.includes('memberStatus!=="writer"&&replyTo===item.id&&item.storyId&&'));
 assert.ok(ui.includes('memberStatus==="writer"&&replyTo===item.id&&item.storyId&&'));
 assert.ok(ui.includes('apiBase+"/api/public-community/v1/feedback"'));
 assert.ok(css.includes(".commentTrigger"));
 assert.ok(css.includes(".replyCommentTrigger"));
 assert.ok(css.includes(".emojiActions"));
});
test("both developing stories have Explore links that respect private reading permissions",()=>{
 assert.ok(developing.includes('return directoryAppUrl+"/storylines"+(term?"?q="+encodeURIComponent(term):"");'));
 assert.ok(developing.includes('key==="windows"?"52":key==="sin"?"S.I.N.":""'));
 assert.ok(developing.includes('https://nextscenes-staging-frontend.onrender.com'));
 assert.ok(developing.includes('item?.public && /^\\/reader-view'));
 assert.ok(!developing.includes(': <p className={styles.availability}'));
});

test("only verified writers see public feedback posting controls",()=>{
 assert.ok(ui.includes('useState<"checking"|"writer"|"reader"|"guest"|"unavailable">'));
 assert.ok(ui.includes('identity?.canWrite===true?"writer":"reader"'));
 assert.ok(ui.includes('memberStatus==="writer"?<button'));
 assert.ok(ui.includes('memberStatus==="writer"&&item.storyId&&<button'));
 assert.ok(ui.includes('memberStatus==="writer"&&item.storyId&&<div'));
 assert.ok(ui.includes('memberStatus==="writer"&&replyTo===item.id&&item.storyId&&'));
 assert.ok(ui.includes('if(memberStatus==="writer")activateReply(root,emoji)'));
 assert.ok(!ui.includes('memberStatus!=="writer"&&replyTo===item.id&&item.storyId&&'));
 assert.ok(ui.includes('You cannot reply to your own post.'));
 assert.ok(ui.includes('Writer access is required to participate.'));
});

test("Live Feedback and developing-story cards contain no redundant instructional paragraphs",()=>{
 for(const copy of [
   "Sign in with a writer account to comment or reply.",
   "Visitors can read. Sign in as a writer to participate.",
   "Read-only access. Only authorised writers can post and reply.",
   "Direct replies are unavailable in this session.",
   "To reply, open the story and sign in if required."
 ])assert.ok(!ui.includes(copy),copy);
 assert.ok(!developing.includes("Public preview unavailable. Explore in the app."));
 assert.ok(!developing.includes("Aperçu public non disponible. Explorer dans l’application."));
 assert.ok(ui.includes('identity?.canWrite===true?"writer":"reader"'));
 assert.ok(ui.includes('memberStatus==="writer"&&replyTo===item.id&&item.storyId&&'));
});
