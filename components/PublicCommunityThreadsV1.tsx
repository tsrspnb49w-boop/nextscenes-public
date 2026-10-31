"use client";
import {useCallback,useEffect,useMemo,useRef,useState} from "react";
import styles from "./PublicCommunityThreadsV1.module.css";

type Reply={id:string;author:string;text:string;createdAt:string;parentId:string;source?:string};
type Thread={
 id:string;storyId?:string;storyTitle:string;author:string;text:string;createdAt:string;href:string;
 source?:string;forum?:string;replies:Reply[];replyCount:number;
};
type PublicStoryOption={id:string;title:string};
type Payload={ok?:boolean;threads?:Thread[];storylines?:PublicStoryOption[];nextBefore?:string};
const formatDate=(stamp:string,lang:"en"|"fr")=>{
 const ms=Date.parse(stamp||"");
 return Number.isFinite(ms) ? new Date(ms).toLocaleString(lang==="fr"?"fr-FR":"en-GB",{
  day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"
 }) : "";
};
function safeStoryHref(appUrl:string,t:Thread){
 const path=String(t.href||"");
 return /^\/reader-view\?storyId=[a-zA-Z0-9-]{12,64}$/.test(path)
   ? appUrl+path : appUrl+"/storylines";
}
// Fail closed if a staging page was accidentally configured to post to production.
function trustedFeedbackApi(base:string){
  if(typeof window==="undefined")return false;
  try{
    const api=new URL(base);
    if(api.protocol!=="https:"||api.username||api.password||api.pathname!=="/"||api.search||api.hash)return false;
    const page=window.location.hostname.toLowerCase();
    const target=api.hostname.toLowerCase();
    if(page==="nextscenes-public-staging.onrender.com")return target==="nextscenes-staging-backend.onrender.com";
    if(page==="public-staging.nextscenes.org")return target==="api-staging.nextscenes.org";
    if(page==="nextscenes.org"||page==="www.nextscenes.org")return target==="api.nextscenes.org";
    if(page==="localhost"||page==="127.0.0.1")return target==="localhost"||target==="127.0.0.1";
    return false;
  }catch{return false;}
}
export default function PublicCommunityThreadsV1({language,appUrl}:{language:"en"|"fr";appUrl:string}){
 const isFR=language==="fr";
 const [threads,setThreads]=useState<Thread[]>([]);
 const [storylines,setStorylines]=useState<PublicStoryOption[]>([]);
 const [commentStory,setCommentStory]=useState("");
 const [commentText,setCommentText]=useState("");
 const [replyTo,setReplyTo]=useState("");
 const [replyTarget,setReplyTarget]=useState("");
 const [replyText,setReplyText]=useState("");
 const quickEmojis=["👍","❤️","😊","👏"];
 const [posting,setPosting]=useState(false);
 const [postError,setPostError]=useState("");
 const [postSuccess,setPostSuccess]=useState("");
 const [memberStatus,setMemberStatus]=useState<"checking"|"writer"|"reader"|"guest"|"unavailable">("checking");
 const configuredApiBase=String(process.env.NEXT_PUBLIC_NEXTSCENES_API_BASE||process.env.NEXT_PUBLIC_API_BASE||"").trim().replace(/\/+$/,"");
 const pageHost=typeof window!=="undefined"?window.location.hostname.toLowerCase():"";
 const isStagingPublic=pageHost==="nextscenes-public-staging.onrender.com";
 const isSameSiteStagingPublic=pageHost==="public-staging.nextscenes.org";
 // Existing Render staging URLs remain unchanged until custom DNS is verified.
 const apiBase=isSameSiteStagingPublic?"https://api-staging.nextscenes.org":
   isStagingPublic?"https://nextscenes-staging-backend.onrender.com":configuredApiBase;
 const activeAppUrl=isSameSiteStagingPublic?"https://staging.nextscenes.org":
   isStagingPublic?"https://nextscenes-staging-frontend.onrender.com":appUrl;
 const [connected,setConnected]=useState(false);
 const [loading,setLoading]=useState(true);
 const [updated,setUpdated]=useState("");
 const [selected,setSelected]=useState("all");
 const [search,setSearch]=useState("");
 const [sort,setSort]=useState<"newest"|"oldest">("newest");
 const [nextBefore,setNextBefore]=useState("");
 const [loadingOlder,setLoadingOlder]=useState(false);
 const [olderError,setOlderError]=useState(false);
 const pagingActive=useRef(false);
 const requestVersion=useRef(0);
 const [expanded,setExpanded]=useState<Record<string,boolean>>({});
 const refresh=useCallback(async({resetPaging=false}:{resetPaging?:boolean}={})=>{
   if(resetPaging) pagingActive.current=false;
   const version=++requestVersion.current;
   try {
     const response=await fetch("/api/public-community",{cache:"no-store"});
     const data:Payload=await response.json();
     if(version!==requestVersion.current) return;
     if(response.ok && data.ok && Array.isArray(data.threads)){
       setThreads(data.threads.filter(t=>t&&t.id&&t.storyTitle&&t.text).slice(0,3));
       const options=Array.isArray(data.storylines)?data.storylines.filter(
         option=>option&&/^[a-f0-9]{24}$/i.test(option.id)&&typeof option.title==="string"&&option.title.trim()
       ):[];
       setStorylines(options);
       setCommentStory(previous=>options.some(option=>option.id===previous)?previous:(options[0]?.id||""));
       setNextBefore(typeof data.nextBefore==="string"?data.nextBefore:"");
       setConnected(true);
       setUpdated(new Date().toISOString());
     }else{setThreads([]);setStorylines([]);setNextBefore("");setConnected(false)}
   }catch{
     if(version===requestVersion.current){setThreads([]);setStorylines([]);setNextBefore("");setConnected(false)}
   }finally{if(version===requestVersion.current)setLoading(false)}
 },[]);
 const loadOlder=useCallback(async()=>{
   if(!nextBefore||loadingOlder) return;
   pagingActive.current=true;
   const version=++requestVersion.current;
   setLoadingOlder(true);setOlderError(false);
   try{
     const response=await fetch("/api/public-community?before="+encodeURIComponent(nextBefore),{cache:"no-store"});
     const data:Payload=await response.json();
     if(version!==requestVersion.current) return;
     if(!response.ok||!data.ok||!Array.isArray(data.threads)) throw new Error("Discussion page unavailable");
     const older=data.threads.filter(t=>t&&t.id&&t.storyTitle&&t.text);
     setThreads(prev=>{
       const seen=new Set(prev.map(t=>t.id));
       return [...prev,...older.filter(t=>!seen.has(t.id))];
     });
     setNextBefore(typeof data.nextBefore==="string"?data.nextBefore:"");
   }catch{if(version===requestVersion.current)setOlderError(true)}
   finally{if(version===requestVersion.current)setLoadingOlder(false)}
 },[nextBefore,loadingOlder]);
 useEffect(()=>{
   void refresh();
   const tick=window.setInterval(()=>{if(!pagingActive.current)void refresh()},15000);
   return()=>{window.clearInterval(tick);requestVersion.current++};
 },[refresh]);
 useEffect(()=>{
   let active=true;
   const probe=async()=>{
     if(!trustedFeedbackApi(apiBase)){if(active)setMemberStatus("unavailable");return;}
     try{
       const result=await fetch(apiBase+"/api/public-community/v1/member",{
         cache:"no-store",credentials:"include",headers:{Accept:"application/json"}
       });
       if(result.ok){
          const identity=await result.json();
          if(active)setMemberStatus(identity?.canWrite===true?"writer":"reader");
        }else if(active)setMemberStatus(result.status===401?"guest":"unavailable");
     }catch{if(active)setMemberStatus("unavailable");}
   };
   void probe();
   const recheck=()=>{if(document.visibilityState==="visible")void probe();};
   window.addEventListener("focus",recheck);
   document.addEventListener("visibilitychange",recheck);
   return()=>{active=false;window.removeEventListener("focus",recheck);document.removeEventListener("visibilitychange",recheck);};
 },[apiBase]);
 const postPublic=async(text:string,storyId:string,parentId="",replyToId="")=>{
   if(memberStatus!=="writer"||posting||!storyId||!text.trim())return;
   setPosting(true);setPostError("");setPostSuccess("");
   try{
     if(!trustedFeedbackApi(apiBase))throw new Error("API unavailable");
     const csrfResponse=await fetch(apiBase+"/api/csrf",{
       cache:"no-store",credentials:"include",headers:{Accept:"application/json"}
     });
     if(!csrfResponse.ok)throw new Error("CSRF unavailable");
     const csrfData=await csrfResponse.json();
     const token=typeof csrfData?.token==="string"?csrfData.token:"";
     if(!/^[a-f0-9]{48}$/i.test(token))throw new Error("Invalid CSRF");
     const response=await fetch(apiBase+"/api/public-community/v1/feedback",{
       method:"POST",credentials:"include",cache:"no-store",
       headers:{"Content-Type":"application/json","Accept":"application/json","X-CSRF-Token":token},
       body:JSON.stringify({storyId,parentId,replyToId,text:text.trim()})
     });
     if(!response.ok){
       if(response.status===401)setMemberStatus("guest");
       if(response.status===403){
         const denial=await response.json().catch(()=>({}));
         const own=String(denial?.message||"").includes("own post");
         if(!own)setMemberStatus("reader");
         throw new Error(own?(isFR?"Vous ne pouvez pas répondre à votre propre message.":"You cannot reply to your own post."):(isFR?"Seuls les auteurs autorisés peuvent participer.":"Writer access is required to participate."));
       }
       throw new Error("Feedback rejected");
     }
     const result=await response.json();
     if(!result?.ok)throw new Error("Feedback not confirmed");
     setPostSuccess(isFR?"Message publié.":"Comment posted.");
     if(parentId&&result.comment){
       setThreads(prev=>prev.map(thread=>thread.id===parentId?{
         ...thread,replies:[...(thread.replies||[]),result.comment as Reply],
         replyCount:(thread.replyCount||0)+1
       }:thread));
       setReplyTo("");setReplyTarget("");setReplyText("");
     }else{
       setCommentText("");setSelected("all");
       setLoading(true);await refresh({resetPaging:true});
     }
   }catch(e){
     const message=e instanceof Error?e.message:"";
     setPostError(/own post|propre message|Writer access|auteurs autorisés/.test(message)?message:
       (isFR?"Publication impossible. Vérifiez votre session.":"Could not post. Check your writer sign-in session."));
   }finally{setPosting(false);}
 };
 const activateReply=(root:Thread,mention="",addressedReplyId="")=>{
   setReplyTo(root.id);
   setReplyTarget(addressedReplyId);
   setReplyText(mention);
   setPostError("");
   setPostSuccess("");
 };
 const addEmoji=(root:Thread,emoji:string)=>{
   if(memberStatus==="writer" && root.storyId && !posting){
     void postPublic(emoji,root.storyId,root.id);
     return;
   }
   if(memberStatus==="writer")activateReply(root,emoji);
 };
 const storyTitles=useMemo(()=>Array.from(new Set(threads.map(t=>t.storyTitle))).sort(),[threads]);
 const filtered=useMemo(()=>{
  const q=search.trim().toLocaleLowerCase();
  return threads.filter(t=>
    (selected==="all"||t.storyTitle===selected) &&
    (!q || [t.text,t.author,t.storyTitle,t.forum||"",...(t.replies||[]).map(r=>r.text)].join(" ").toLocaleLowerCase().includes(q))
  ).sort((a,b)=>sort==="newest"
    ? Date.parse(b.createdAt||"")-Date.parse(a.createdAt||"")
    : Date.parse(a.createdAt||"")-Date.parse(b.createdAt||""));
 },[threads,selected,search,sort]);
 const visibleItems=filtered;
 const t={
  title:isFR?"Retours en direct":"Live Feedback",
  sub:isFR?"Les échanges publics des histoires et les réponses de Writer Studio.":"Public storyline conversations and Reader Response from Writer Studio.",
  refresh:isFR?"Actualiser":"Refresh",
  all:isFR?"Toutes les histoires publiques":"All public storylines",
  search:isFR?"Rechercher des discussions et réponses…":"Search comments and replies…",
  newest:isFR?"Les plus récents":"Newest first",
  oldest:isFR?"Les plus anciens":"Oldest first",
  open:isFR?"Ouvrir":"Open",
  discuss:isFR?"Participer":"Discuss",
  replies:isFR?"Afficher les réponses":"Show replies",
  hide:isFR?"Masquer les réponses":"Hide replies",
  writer:isFR?"Writer Studio · Réponse des lecteurs":"Writer Studio · Reader Response",
  home:isFR?"Discussion des histoires":"Storyline discussion",
  noComments:isFR?"Aucune conversation publique visible pour le moment.":"No publicly visible conversations yet.",
  unavail:isFR?"Les échanges publics ne sont pas disponibles pour le moment.":"Public feedback is temporarily unavailable.",
  more:isFR?"Charger des discussions précédentes":"Load older discussions",
  loadingMore:isFR?"Chargement des discussions…":"Loading older discussions…",
  olderError:isFR?"Impossible de charger les discussions précédentes. Réessayez.":"Could not load older discussions. Try again.",
  showing:isFR?"Affichage":"Showing",
  of:isFR?"sur":"of",
  updated:isFR?"Actualisé":"Updated",
 };
 return <section className={styles.livePanel} aria-label={t.title}>
  <header className={styles.liveHead}>
   <div><h3>{t.title}</h3></div>
   <div className={styles.liveActions}>
    {updated?<small aria-live="polite">{t.updated}: {formatDate(updated,language)}</small>:null}
    <button type="button" onClick={()=>{setLoading(true);setOlderError(false);void refresh({resetPaging:true})}}>{t.refresh}</button>
   </div>
  </header>
  <div className={styles.controls}>
   <label className={styles.field}><span>{isFR?"Histoire":"Storyline"}</span>
    <select value={selected} onChange={e=>setSelected(e.target.value)}>
     <option value="all">{t.all}</option>
     {storyTitles.map(name=><option key={name} value={name}>{name}</option>)}
    </select>
   </label>
   <label className={styles.field}><span>{isFR?"Rechercher":"Search all"}</span>
    <input type="search" value={search} placeholder={t.search}
     onChange={e=>setSearch(e.target.value)}/>
   </label>
   <label className={styles.field}><span>{isFR?"Ordre":"Sort"}</span>
    <select value={sort} onChange={e=>setSort(e.target.value as "newest"|"oldest")}>
     <option value="newest">{t.newest}</option><option value="oldest">{t.oldest}</option>
    </select>
   </label>
  </div>
  <div className={styles.participation} aria-label={isFR?"Participer aux discussions":"Join public discussions"}>
   {memberStatus==="writer"&&<>
    <form className={styles.composer} onSubmit={e=>{e.preventDefault();void postPublic(commentText,commentStory)}}>
     <strong>{isFR?"Écrire un commentaire public":"Write a public comment"}</strong>
     <label className={styles.field}>
      <span>{isFR?"Choisissez une histoire publique":"Choose a public storyline"}</span>
      <select value={commentStory} onChange={e=>setCommentStory(e.target.value)}>
       {storylines.map(story=><option key={story.id} value={story.id}>{story.title}</option>)}
      </select>
     </label>
     <label className={styles.field}>
      <span>{isFR?"Votre commentaire":"Your comment"}</span>
      <textarea value={commentText} maxLength={2000} rows={3}
       onChange={e=>{setCommentText(e.target.value);setPostError("");setPostSuccess("");}}
       placeholder={isFR?"Écrivez votre commentaire…":"Write your comment…"} />
     </label>
     <button type="submit" disabled={posting||!commentText.trim()||!commentStory}>
      {posting?(isFR?"Publication…":"Posting…"):(isFR?"Publier le commentaire":"Post comment")}
     </button>
    </form>
   </>}



   {postError&&<p role="alert" className={styles.error}>{postError}</p>}
   {postSuccess&&<p role="status" className={styles.success}>{postSuccess}</p>}
  </div>
  <div className={styles.count} aria-live="polite">
    {connected ? `${t.showing} ${Math.min(visibleItems.length,filtered.length)} ${t.of} ${filtered.length}` : loading ? (isFR?"Chargement…":"Loading…") : t.unavail}
  </div>
  <div className={styles.feed} tabIndex={0} role="region" aria-label={isFR?"Liste défilante des discussions publiques":"Scrollable public discussion list"}>
   {!visibleItems.length && <p className={styles.empty}>
    {connected?t.noComments:loading?(isFR?"Chargement des échanges…":"Loading public conversations…"):t.unavail}
   </p>}
   {visibleItems.map(item=><article className={styles.entry} key={item.id}>
     <div className={styles.entryTop}>
      <span className={item.source==="WriterStudio"?styles.studioBadge:styles.homeBadge}>
       {item.source==="WriterStudio"?t.writer:t.home}
      </span>
      <span className={styles.entryMeta}>{item.author} · {formatDate(item.createdAt,language)}</span>
     </div>
     <p className={styles.storyLine}><strong>{item.storyTitle}</strong>{item.forum?` · ${item.forum}`:""}</p>
     {memberStatus==="writer"?<button type="button" className={styles.commentTrigger}
       aria-label={isFR?"Répondre au commentaire de "+item.author:"Reply to comment by "+item.author}
       onClick={()=>activateReply(item)}>{item.text}</button>
       :<p className={styles.comment}>{item.text}</p>}
     {Array.isArray(item.replies)&&item.replies.length>0&&<>
      <button className={styles.replyToggle} type="button" aria-expanded={!!expanded[item.id]}
       onClick={()=>setExpanded(prev=>({...prev,[item.id]:!prev[item.id]}))}>
       {expanded[item.id]?t.hide:t.replies} ({item.replies.length})
      </button>
      {expanded[item.id]&&<div className={styles.replyList}>
       {item.replies.map(reply=><div className={styles.reply} key={reply.id}>
        <span className={styles.replyMeta}>{reply.author} · {formatDate(reply.createdAt,language)}</span>
        {memberStatus==="writer"?<button type="button" className={styles.replyCommentTrigger}
          aria-label={isFR?"Répondre à "+reply.author:"Reply to "+reply.author}
          onClick={()=>activateReply(item,"@"+reply.author+" ",reply.id)}>{reply.text}</button>
          :<p>{reply.text}</p>}
       </div>)}
      </div>}
     </>}
     <div className={styles.entryActions}>
      <a href={safeStoryHref(activeAppUrl,item)}>{t.open} →</a>
      <a href={safeStoryHref(activeAppUrl,item).includes("?storyId=") ? `${safeStoryHref(activeAppUrl,item)}&tab=participate` : safeStoryHref(activeAppUrl,item)}>{t.discuss} →</a>
      {memberStatus==="writer"&&item.storyId&&<button type="button" className={styles.replyAction}
       onClick={()=>replyTo===item.id?(setReplyTo(""),setReplyTarget(""),setPostError("")):activateReply(item)}>
       {replyTo===item.id?(isFR?"Fermer":"Close"):(isFR?"Répondre":"Reply")}
      </button>}
      {memberStatus==="writer"&&item.storyId&&<div className={styles.emojiActions} role="group"
       aria-label={isFR?"Réactions rapides":"Quick emoji replies"}>
       {quickEmojis.map(emoji=><button type="button" key={emoji}
        onClick={()=>addEmoji(item,emoji)}
        disabled={posting}
        aria-label={(isFR?"Envoyer ":"Send ")+emoji}>{emoji}</button>)}
      </div>}
     </div>
     {memberStatus==="writer"&&replyTo===item.id&&item.storyId&&
      <form className={styles.composer} onSubmit={e=>{e.preventDefault();void postPublic(replyText,item.storyId||"",item.id,replyTarget)}}>
       <label className={styles.field}><span>{isFR?"Votre réponse":"Your reply"}</span>
        <textarea value={replyText} maxLength={2000} rows={3}
         onChange={e=>{setReplyText(e.target.value);setPostError("");setPostSuccess("");}}
         placeholder={isFR?"Écrivez votre réponse…":"Write your reply…"} />
       </label>
       <button type="submit" disabled={posting||!replyText.trim()}>
        {posting?(isFR?"Publication…":"Posting…"):(isFR?"Publier la réponse":"Post reply")}
       </button>
      </form>}
   </article>)}
  </div>
  {nextBefore&&<button className={styles.more} type="button" disabled={loadingOlder}
   onClick={()=>void loadOlder()}>{loadingOlder?t.loadingMore:t.more}</button>}
  {olderError&&<p role="alert" className={styles.bottomNote}>{t.olderError}</p>}

 </section>;
}
