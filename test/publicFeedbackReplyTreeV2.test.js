"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const {buildFeedbackReplyTree}=require("../components/publicFeedbackReplyTreeV2");
const root={
 id:"root",author:"eze_23_06",
 replies:[
  {id:"original",author:"eze_23_06",parentId:"root",text:"An older legacy reply",createdAt:"2026-10-30T18:34:00Z"},
  {id:"screen",author:"Screenplay Proof",parentId:"root",text:"Thank you",createdAt:"2026-10-30T17:30:00Z"},
  {id:"answer1",author:"eze_23_06",parentId:"root",replyToId:"screen",
   text:"@Screenplay Proof It's nice to have you here 😀",createdAt:"2026-10-31T06:15:00Z"},
  {id:"answer2",author:"eze_23_06",parentId:"root",replyToId:"screen",
   text:"This is supposed to be a reply",createdAt:"2026-10-31T06:17:00Z"},
  {id:"answer3",author:"Screenplay Proof",parentId:"root",replyToId:"answer1",
   text:"We are glad to meet",createdAt:"2026-10-31T06:19:00Z"},
 ]
};
test("Eze's exact two responses appear directly under Screenplay Proof, not as root siblings",()=>{
 const result=buildFeedbackReplyTree(root);
 assert.deepEqual(result.map(x=>x.id),["screen","original"]);
 assert.deepEqual(result[0].children.map(x=>x.id),["answer1","answer2"]);
 assert.equal(result[0].children[0].repliedTo,"Screenplay Proof");
 assert.equal(result[0].children[0].children[0].id,"answer3");
 assert.equal(result[0].children[0].children[0].repliedTo,"eze_23_06");
 assert.equal(result[1].repliedTo,"eze_23_06");
});
test("reloading persisted serialized replies restores the same hierarchy",()=>{
 const first=buildFeedbackReplyTree(root);
 const second=buildFeedbackReplyTree(JSON.parse(JSON.stringify(root)));
 assert.deepEqual(second,first);
});
test("invalid, absent, self-referential and cyclic addresses remain readable without inventing targets",()=>{
 const data={id:"root",author:"Original Writer",replies:[
  {id:"x",author:"X",replyToId:"unavailable",createdAt:"2026-01-01T10:00:00Z"},
  {id:"y",author:"Y",replyToId:"y",createdAt:"2026-01-01T10:00:01Z"},
  {id:"a",author:"A",replyToId:"b",createdAt:"2026-01-01T10:00:02Z"},
  {id:"b",author:"B",replyToId:"a",createdAt:"2026-01-01T10:00:03Z"},
 ]};
 const result=buildFeedbackReplyTree(data);
 assert.deepEqual(result.map(x=>x.id),["x","y","a","b"]);
 assert.ok(result.every(x=>x.repliedTo==="Original Writer"));
});
test("empty replies render as an empty discussion branch",()=>{
 assert.deepEqual(buildFeedbackReplyTree({id:"root",author:"A",replies:[]}),[]);
});
