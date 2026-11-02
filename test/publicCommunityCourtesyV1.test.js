"use strict";
const test=require("node:test"),assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path");
const component=fs.readFileSync(path.join(__dirname,"../components/PublicCommunityThreadsV1.tsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"../components/PublicCommunityThreadsV1.module.css"),"utf8");

test("Public Live Feedback always shows Reply and four emoji controls without requiring login to render them",()=>{
 assert.doesNotMatch(component,/\{canInteract&&!owned\.has\(item\.id\)&&item\.storyId&&<div className=\{styles\.entryActions\}>/);
 assert.doesNotMatch(component,/\{canInteract&&!owned\.has\(node\.id\)&&root\.storyId&&/);
 assert.match(component,/const quickEmojis=\["👍","❤️","😊","👏"\]/);
 assert.match(component,/disabled=\{!canInteract\|\|owned\.has\(item\.id\)\|\|!item\.storyId\|\|posting\}/);
 assert.match(component,/disabled=\{!canInteract\|\|owned\.has\(node\.id\)\|\|!root\.storyId\|\|posting\}/);
 assert.match(component,/disabled=\{!canInteract\|\|owned\.has\(item\.id\)\|\|!item\.storyId\|\|posting\}/);
});
test("Actual posting still requires writer auth and forbids replying to own post",()=>{
 assert.match(component,/if\(!canInteract\|\|posting\|\|!storyId\|\|!text\.trim\(\)\|\|/);
 assert.match(component,/\(parentId&&owned\.has\(replyToId\|\|parentId\)\)/);
 assert.match(component,/const canInteract=memberStatus==="writer"&&ownerScanKey===visibleIdsKey/);
 assert.match(component,/trustedFeedbackApi\(apiBase\)/);
 assert.match(component,/credentials:"include"/);
});
test("Community Courtesy is bilingual, unobtrusive and always in Live Feedback",()=>{
 assert.match(component,/aria-label=\{isFR\?"Courtoisie communautaire":"Community Courtesy"\}/);
 assert.match(component,/We welcome freedom of expression and thoughtful disagreement/);
 assert.match(component,/Les propos injurieux, offensants, menaçants/);
 assert.match(css,/\.courtesy\s*\{/);
 assert.match(css,/\.courtesy strong/);
});
test("Preserve existing nested threads, emojis and draggable window",()=>{
 assert.match(component,/buildFeedbackReplyTree\(item\)/);
 assert.match(component,/onClick=\{\(\)=>addEmoji\(item,emoji\)\}/);
 assert.match(css,/resize:both;overflow:auto/);
 assert.match(css,/@media\(max-width:600px\)/);
});
