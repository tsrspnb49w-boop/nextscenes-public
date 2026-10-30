"use client";
import {useEffect,useState} from "react";
import styles from "./PublicCommunityThreadsV1.module.css";

type Reply={id:string;author:string;text:string;createdAt:string;parentId:string};
type Thread={id:string;storyTitle:string;author:string;text:string;createdAt:string;href:string;replies:Reply[];replyCount:number};
type Payload={ok?:boolean;threads?:Thread[]};
const displayTime=(stamp:string,lang:string)=>{
  const ms=Date.parse(stamp || "");
  return Number.isFinite(ms) ? new Date(ms).toLocaleDateString(lang==="fr"?"fr-FR":"en-GB",{day:"numeric",month:"short",year:"numeric"}) : "";
};
export default function PublicCommunityThreadsV1({language,appUrl}:{language:"en"|"fr";appUrl:string}) {
  const [threads,setThreads]=useState<Thread[]>([]);
  const [connected,setConnected]=useState(false);
  useEffect(()=>{
    let active=true;
    const load=async()=>{
      try {
        const r=await fetch("/api/public-community",{cache:"no-store"});
        const data:Payload=await r.json();
        if(!active)return;
        if(r.ok && data.ok && Array.isArray(data.threads)){
          setThreads(data.threads.filter(t=>t && t.id && t.storyTitle && t.text).slice(0,3));
          setConnected(true);
        } else {setThreads([]);setConnected(false);}
      }catch{if(active){setThreads([]);setConnected(false);}}
    };
    void load();
    const t=window.setInterval(load,15000);
    return ()=>{active=false;window.clearInterval(t)};
  },[]);
  const safeLink=(t:Thread)=>{
    const path=String(t.href || "");
    return /^\/reader-view\?storyId=[a-zA-Z0-9-]{12,64}$/.test(path) ? appUrl+path : appUrl+"/storylines";
  };
  return <div className={styles.grid}>
    {Array.from({length:3},(_,index)=>{
      const thread=threads[index];
      return <article className={styles.thread} key={thread?.id || index}>
        <small className={styles.label}>{language==="fr"?"DISCUSSION PUBLIQUE":"PUBLIC CONVERSATION"} {String(index+1).padStart(2,"0")}</small>
        {thread ? <>
          <h3>{thread.storyTitle}</h3>
          <p className={styles.meta}>{thread.author} · {displayTime(thread.createdAt,language)}</p>
          <p className={styles.comment}>{thread.text}</p>
          {thread.replies.length > 0 ?
            <details className={styles.replies}>
              <summary>{language==="fr"?"Voir les réponses":"View replies"} ({thread.replies.length})</summary>
              {thread.replies.map(r=><div className={styles.reply} key={r.id}>
                <p className={styles.meta}>{r.author} · {displayTime(r.createdAt,language)}</p>
                <p>{r.text}</p>
              </div>)}
            </details> :
            <p className={styles.empty}>{language==="fr"?"Aucune réponse publique pour le moment.":"No public replies yet."}</p>}
          <a className={styles.link} href={safeLink(thread)}>{language==="fr"?"Ouvrir l'histoire et participer":"Open story and join discussion"} →</a>
        </> : <>
          <h3>{language==="fr"?"Échanges de lecteurs":"Reader conversations"}</h3>
          <p className={styles.empty}>{connected ? (language==="fr"?"Aucun autre échange public vérifié.":"No additional verified public thread.") : (language==="fr"?"Les conversations publiques ne sont pas encore disponibles.":"Public conversations are not yet available.")}</p>
          <a className={styles.link} href={appUrl+"/storylines"}>{language==="fr"?"Explorer les histoires":"Explore public stories"} →</a>
        </>}
      </article>;
    })}
  </div>;
}
