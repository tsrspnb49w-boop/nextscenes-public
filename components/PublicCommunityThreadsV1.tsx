"use client";
import {useCallback,useEffect,useMemo,useState} from "react";
import styles from "./PublicCommunityThreadsV1.module.css";

type Reply={id:string;author:string;text:string;createdAt:string;parentId:string;source?:string};
type Thread={
 id:string;storyTitle:string;author:string;text:string;createdAt:string;href:string;
 source?:string;forum?:string;replies:Reply[];replyCount:number;
};
type Payload={ok?:boolean;threads?:Thread[]};
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
export default function PublicCommunityThreadsV1({language,appUrl}:{language:"en"|"fr";appUrl:string}){
 const isFR=language==="fr";
 const [threads,setThreads]=useState<Thread[]>([]);
 const [connected,setConnected]=useState(false);
 const [loading,setLoading]=useState(true);
 const [updated,setUpdated]=useState("");
 const [selected,setSelected]=useState("all");
 const [search,setSearch]=useState("");
 const [sort,setSort]=useState<"newest"|"oldest">("newest");
 const [visible,setVisible]=useState(10);
 const [expanded,setExpanded]=useState<Record<string,boolean>>({});
 const refresh=useCallback(async()=>{
   try {
     const response=await fetch("/api/public-community",{cache:"no-store"});
     const data:Payload=await response.json();
     if(response.ok && data.ok && Array.isArray(data.threads)){
       setThreads(data.threads.filter(t=>t&&t.id&&t.storyTitle&&t.text)
         .slice(0,40));
       setConnected(true);
       setUpdated(new Date().toISOString());
     }else{setThreads([]);setConnected(false)}
   }catch{setThreads([]);setConnected(false)}
   finally{setLoading(false)}
 },[]);
 useEffect(()=>{
   void refresh();
   const tick=window.setInterval(()=>{void refresh()},15000);
   return()=>window.clearInterval(tick);
 },[refresh]);
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
 const visibleItems=filtered.slice(0,visible);
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
  more:isFR?"Afficher davantage":"Load more",
  showing:isFR?"Affichage":"Showing",
  of:isFR?"sur":"of",
  updated:isFR?"Actualisé":"Updated",
  signIn:isFR?"Pour répondre, ouvrez l'histoire et connectez-vous si nécessaire.":"To reply, open the story and sign in if required.",
 };
 return <section className={styles.livePanel} aria-label={t.title}>
  <header className={styles.liveHead}>
   <div><h3>{t.title}</h3><p>{t.sub}</p></div>
   <div className={styles.liveActions}>
    {updated?<small aria-live="polite">{t.updated}: {formatDate(updated,language)}</small>:null}
    <button type="button" onClick={()=>{setLoading(true);void refresh()}}>{t.refresh}</button>
   </div>
  </header>
  <div className={styles.controls}>
   <label className={styles.field}><span>{isFR?"Histoire":"Storyline"}</span>
    <select value={selected} onChange={e=>{setSelected(e.target.value);setVisible(10)}}>
     <option value="all">{t.all}</option>
     {storyTitles.map(name=><option key={name} value={name}>{name}</option>)}
    </select>
   </label>
   <label className={styles.field}><span>{isFR?"Rechercher":"Search all"}</span>
    <input type="search" value={search} placeholder={t.search}
     onChange={e=>{setSearch(e.target.value);setVisible(10)}}/>
   </label>
   <label className={styles.field}><span>{isFR?"Ordre":"Sort"}</span>
    <select value={sort} onChange={e=>setSort(e.target.value as "newest"|"oldest")}>
     <option value="newest">{t.newest}</option><option value="oldest">{t.oldest}</option>
    </select>
   </label>
  </div>
  <div className={styles.count} aria-live="polite">
    {connected ? `${t.showing} ${Math.min(visibleItems.length,filtered.length)} ${t.of} ${filtered.length}` : loading ? (isFR?"Chargement…":"Loading…") : t.unavail}
  </div>
  <div className={styles.feed}>
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
     <p className={styles.comment}>{item.text}</p>
     {Array.isArray(item.replies)&&item.replies.length>0&&<>
      <button className={styles.replyToggle} type="button" aria-expanded={!!expanded[item.id]}
       onClick={()=>setExpanded(prev=>({...prev,[item.id]:!prev[item.id]}))}>
       {expanded[item.id]?t.hide:t.replies} ({item.replies.length})
      </button>
      {expanded[item.id]&&<div className={styles.replyList}>
       {item.replies.map(reply=><div className={styles.reply} key={reply.id}>
        <span className={styles.replyMeta}>{reply.author} · {formatDate(reply.createdAt,language)}</span>
        <p>{reply.text}</p>
       </div>)}
      </div>}
     </>}
     <div className={styles.entryActions}>
      <a href={safeStoryHref(appUrl,item)}>{t.open} →</a>
      <a href={safeStoryHref(appUrl,item)}>{t.discuss} →</a>
     </div>
   </article>)}
  </div>
  {visibleItems.length<filtered.length && <button className={styles.more} type="button"
   onClick={()=>setVisible(n=>Math.min(n+10,40))}>{t.more}</button>}
  <p className={styles.bottomNote}>{t.signIn}</p>
 </section>;
}
