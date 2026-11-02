"use strict";
const test=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const css=fs.readFileSync(path.join(__dirname,"../components/PublicCommunityThreadsV1.module.css"),"utf8");
const ui=fs.readFileSync(path.join(__dirname,"../components/PublicCommunityThreadsV1.tsx"),"utf8");
test("Live Feedback keeps existing reply, emoji and nested thread behaviour",()=>{
 assert.match(ui,/const quickEmojis=\["👍","❤️","😊","👏"\]/);
 assert.match(ui,/className=\{styles\.emojiActions\}/);
 assert.match(ui,/renderReplyEditor\(item,item\.id\)/);
 assert.match(ui,/buildFeedbackReplyTree/);
});
test("Scrollable discussion window can be pulled at the corner to resize both width and height",()=>{
 assert.match(css,/\.feed\{[^\n]*resize:both;overflow:auto;/);
 assert.match(css,/max-width:min\(1800px,calc\(100vw - 32px\)\)/);
 assert.match(css,/max-height:min\(94vh,1400px\)/);
 assert.match(css,/@media\(max-width:600px\)/);
 assert.match(css,/resize:none;overflow-y:auto/);
 assert.match(ui,/Drag the lower-right corner to expand this window/);
 assert.match(ui,/Agrandissez la fenêtre en tirant son coin inférieur droit/);
});
test("Public community API, posting rules and writer ownership remain unchanged",()=>{
 assert.match(ui,/owned\.has\(replyToId\|\|parentId\)/);
 assert.match(ui,/writer access is required to participate\./i);
 assert.match(ui,/postPublic\(emoji,root\.storyId,root\.id\)/);
});
