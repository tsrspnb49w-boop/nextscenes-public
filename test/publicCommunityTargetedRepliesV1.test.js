"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const source=fs.readFileSync(path.join(__dirname,"..","components","PublicCommunityThreadsV1.tsx"),"utf8");
test("nested response submits addressed child while retaining root parent",()=>{
 assert.ok(source.includes('activateReply(item,"@"+reply.author+" ",reply.id)'));
 assert.ok(source.includes('postPublic(replyText,item.storyId||"",item.id,replyTarget)'));
 assert.ok(source.includes('body:JSON.stringify({storyId,parentId,replyToId,text:text.trim()})'));
});
test("root response and emoji remain on original discussion",()=>{
 assert.ok(source.includes('postPublic(emoji,root.storyId,root.id)'));
 assert.ok(source.includes('activateReply(item)'));
});
test("editing replies and comments clears stale errors",()=>{
 assert.ok(source.includes('setReplyText(e.target.value);setPostError("");setPostSuccess("");'));
 assert.ok(source.includes('setCommentText(e.target.value);setPostError("");setPostSuccess("");'));
});
