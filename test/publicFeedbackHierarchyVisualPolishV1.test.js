"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const root=path.join(__dirname,"..");
const css=fs.readFileSync(path.join(root,"components/PublicCommunityThreadsV1.module.css"),"utf8");
const ui=fs.readFileSync(path.join(root,"components/PublicCommunityThreadsV1.tsx"),"utf8");
const tree=fs.readFileSync(path.join(root,"components/publicFeedbackReplyTreeV2.js"),"utf8");

test("original posts remain visually distinct from their replies",()=>{
  assert.match(css,/\.entry\{[^}]*border-left:4px solid #88b99c/);
  assert.match(css,/\.entryTop\{[^}]*justify-content:flex-start/);
  assert.match(css,/\.entryMeta\{[^}]*font-weight:700/);
  assert.match(css,/\.reply\{[^}]*border-left:3px solid #b6dac3/);
});
test("nested children have connecting lines, compact gaps and bounded indentation",()=>{
  assert.match(css,/\.replyList\{[^}]*display:grid;gap:9px/);
  assert.match(css,/\.childReplies\{[^}]*display:grid;gap:8px/);
  assert.match(css,/\.compactChildReplies\{[^}]*display:grid;gap:7px/);
  assert.ok(css.includes(".childReplies>.replyBranch::before"));
  assert.ok(css.includes(".compactChildReplies>.replyBranch::before"));
  assert.match(css,/@media\(max-width:600px\)\{[\s\S]*?\.replyList\{padding-left:10px/);
});
test("visual polish retains the existing reply-target and ownership logic",()=>{
  assert.ok(ui.includes("buildFeedbackReplyTree(item).map(reply=>renderReplyBranch(item,reply,1))"));
  assert.ok(ui.includes("canInteract&&!owned.has(node.id)&&root.storyId&&"));
  assert.ok(ui.includes("renderReplyEditor(root,node.id)"));
  assert.ok(ui.includes('body:JSON.stringify({storyId,parentId,replyToId,text:text.trim()})'));
  assert.ok(tree.includes("replyToId"));
});
test("no new distracting navigation or explanatory text appears in the discussion",()=>{
  assert.ok(!ui.includes("{t.open}"));
  assert.ok(!ui.includes("{t.discuss}"));
  assert.ok(!ui.includes("Sign in with a writer account to comment or reply."));
});
