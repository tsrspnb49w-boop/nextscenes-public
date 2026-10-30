"use client";
import {useEffect,useState} from "react";
import styles from "./DevelopingStoriesV1.module.css";
type Development={key:string;public:boolean;title?:string;author?:string;coverUrl?:string;href?:string};
const definitions=[
 {key:"windows",title:"The 52 Windows",cover:""},
 {key:"sin",title:"World of S.I.N. (Supernatural Integration Network)",cover:""},
 {key:"ugo",title:"Ugo and the Magic Seed",cover:"https://grkvsllcpotylcvbecuj.supabase.co/storage/v1/object/public/story-covers/69623c5a3f3a3c7b988420a6/2026-06-10T15-34-56-054Z-2f9be5e7-81ec-43a1-bb0a-38067a553e9b-site-cover.png"},
] as const;
export default function DevelopingStoriesV1({language,appUrl}:{language:"en"|"fr";appUrl:string}) {
 const [live,setLive]=useState<Development[]>([]);
 useEffect(()=>{
   let active=true;
   const load=async()=>{
     try {
       const r=await fetch("/api/public-community",{cache:"no-store"});
       const j=await r.json();
       if(active) setLive(r.ok && j?.ok && Array.isArray(j.development) ? j.development : []);
     }catch {if(active)setLive([]);}
   };
   void load();const timer=window.setInterval(load,45000);
   return ()=>{active=false;window.clearInterval(timer)};
 },[]);
 const safeHref=(item:Development|undefined,key:string)=>{
   if(key==="ugo")return appUrl+"/reader-view?storyId=6a2984a9e2727b95968cf87c";
   return item?.public && /^\/reader-view\?storyId=[a-zA-Z0-9-]{12,64}$/.test(item.href||"") ? appUrl+item.href : "";
 };
 const safeCover=(url:string)=>{
   if(url.startsWith("/"))return url;
   try {const u=new URL(url);return u.protocol==="https:" ? url : "";}catch{return "";}
 };
 return <div className={styles.grid}>
   {definitions.map(item=>{
     const found=live.find(x=>x.key===item.key);
     // The owner's uploaded original artwork is authoritative, including French.
     // World of S.I.N. still has no approved artwork; never invent a cover.
     const cover=item.key==="sin" ? ""
       : item.key==="windows"
         ? (language==="fr"
           ? "/images/covers/v1c-approved/les-52-fenetres-fr.webp"
           : "/images/covers/v1c-approved/the-52-windows-en.webp")
         : safeCover(found?.coverUrl || item.cover);
     const title=item.key==="windows" && language==="fr" ? "Les 52 Fenêtres" : item.title;
     const link=safeHref(found,item.key);
     return <article className={styles.card} key={item.key}>
       <div className={styles.coverFrame}>
         {cover ?
           // eslint-disable-next-line @next/next/no-img-element
           <img alt={title+" approved cover"} src={cover} className={styles.cover}/> :
           <div className={styles.noCover} aria-label={language==="fr"?"Couverture non disponible":"Cover not available"}>
             <span>{language==="fr"?"Couverture non disponible":"No approved cover available"}</span>
           </div>}
       </div>
       <div className={styles.info}>
         <small className={styles.status}>{language==="fr"?"EN COURS DE CRÉATION":"IN DEVELOPMENT"}</small>
         <h3>{title}</h3>
         {found?.author && item.key!=="sin" ? <p className={styles.author}>{found.author}</p>:null}
         {link ? <a href={link} className={styles.link}>{language==="fr"?"Découvrir l’histoire":"Explore story"} →</a>
               : <p className={styles.availability}>{language==="fr"?"Aperçu public à venir":"Public preview not yet available"}</p>}
       </div>
     </article>;
   })}
 </div>;
}
