"use strict";

// A presentation-only view of the existing Feedback model.
// parentId continues to identify the original discussion.
// replyToId identifies the particular response being answered.
// Historical messages without replyToId remain direct replies to the root.
function buildFeedbackReplyTree(thread) {
  const raw=Array.isArray(thread?.replies)?thread.replies:[];
  const ordered=[...raw].filter(row=>row&&typeof row.id==="string"&&row.id)
    .sort((a,b)=>{
      const aTime=Date.parse(a.createdAt||"")||0;
      const bTime=Date.parse(b.createdAt||"")||0;
      return aTime-bTime || String(a.id).localeCompare(String(b.id));
    });
  const byId=new Map();
  for(const reply of ordered){
    if(!byId.has(reply.id))byId.set(reply.id,{...reply,children:[],repliedTo:""});
  }
  // Corrupt/stale references and cycles must never hide legitimate feedback.
  function hasCycle(nodeId,targetId){
    const seen=new Set([nodeId]);
    let current=targetId;
    while(current&&byId.has(current)){
      if(seen.has(current))return true;
      seen.add(current);
      current=String(byId.get(current).replyToId||"");
    }
    return false;
  }
  const rootReplies=[];
  for(const reply of ordered){
    const node=byId.get(reply.id);
    if(!node||node.__placed)continue;
    Object.defineProperty(node,"__placed",{value:true,enumerable:false});
    const targetId=String(node.replyToId||"");
    const target=targetId&&byId.has(targetId)&&!hasCycle(node.id,targetId)
      ? byId.get(targetId):null;
    node.repliedTo=target?String(target.author||""):String(thread?.author||"");
    if(target)target.children.push(node);
    else rootReplies.push(node);
  }
  return rootReplies;
}
module.exports={buildFeedbackReplyTree};
