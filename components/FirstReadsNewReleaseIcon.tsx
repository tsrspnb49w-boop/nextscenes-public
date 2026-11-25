"use client";
import {useEffect,useState} from "react";
import {isRecentFirstReadsRelease as recent,FIRST_READS_ICON_WINDOW,type FirstReadsRelease as Release} from "@/app/lib/firstReadsReleaseIndicatorV1";
const APP_ORIGINS=new Set(["https://app.nextscenes.org","https://staging.nextscenes.org","https://nextscenes-staging-frontend.onrender.com","https://nextscenes-frontend-web.onrender.com"]);
export default function FirstReadsNewReleaseIcon({storyId,href,language}:{storyId:string;href:string;language:"en"|"fr"}) {
  const [release,setRelease]=useState<Release|null>(null);
  const [read,setRead]=useState(false);
  const [ready,setReady]=useState(false);
  const [now,setNow]=useState(0);
  useEffect(()=>{
    let active=true;
    const load=async()=>{
      try {
        const r=await fetch("/api/first-reads-release-status?storyId="+encodeURIComponent(storyId),{cache:"no-store"});
        const j=await r.json();
        if(active)setRelease(previous=>{
          const next=r.ok&&j.ok?j.release:null;
          return previous?.serialNumber===next?.serialNumber&&previous?.authorizedAt===next?.authorizedAt?previous:next;
        });
      }catch{if(active)setRelease(null);}
      if(active)setNow(Date.now());
    };
    void load();
    const refresh=window.setInterval(load,60000);
    const tick=window.setInterval(()=>setNow(Date.now()),1000);
    window.addEventListener("pageshow",load);
    return()=>{active=false;clearInterval(refresh);clearInterval(tick);window.removeEventListener("pageshow",load);};
  },[storyId]);
  const number=release?.serialNumber;
  const authorizedAt=release?.authorizedAt;
  useEffect(()=>{
    setReady(false);setRead(false);
    if(!number||!authorizedAt||!recent({serialNumber:number,authorizedAt},Date.now()))return;
    let origin="";
    try{origin=new URL(href).origin;}catch{return;}
    if(!APP_ORIGINS.has(origin))return;
    const staging=location.hostname==="public-staging.nextscenes.org"||location.hostname==="nextscenes-public-staging.onrender.com";
    if(staging!== (origin==="https://staging.nextscenes.org"||origin==="https://nextscenes-staging-frontend.onrender.com"))return;
    let active=true;
    const frame=document.createElement("iframe");
    frame.hidden=true;frame.title="First Reads local read state";frame.referrerPolicy="no-referrer";
    frame.setAttribute("sandbox","allow-scripts allow-same-origin");
    const requestId=String(Date.now())+":"+Math.random().toString(36).slice(2);
    function check(){if(!recent({serialNumber:number!,authorizedAt:authorizedAt!},Date.now()))return;frame.contentWindow?.postMessage({type:"ns:firstReads:check:v1",requestId,storyId,serialNumber:number},origin);}
    function receive(e:MessageEvent){
      if(!active||e.origin!==origin||e.source!==frame.contentWindow||e.data?.type!=="ns:firstReads:result:v1"||e.data?.requestId!==requestId||typeof e.data.read!=="boolean")return;
      setRead(e.data.read);setReady(true);
    }
    function onVisible(){if(document.visibilityState==="visible")check();}
    window.addEventListener("message",receive);window.addEventListener("pageshow",check);window.addEventListener("focus",check);document.addEventListener("visibilitychange",onVisible);
    frame.addEventListener("load",check);frame.src=origin+"/first-reads-release-state.html";document.body.appendChild(frame);
    const timer=window.setTimeout(()=>{if(active)setReady(true);},2500);
    const poll=window.setInterval(check,10000);
    const expiry=window.setTimeout(()=>{clearInterval(poll);frame.remove();},Math.max(0,Date.parse(authorizedAt)+FIRST_READS_ICON_WINDOW-Date.now()));
    return()=>{active=false;clearTimeout(timer);clearTimeout(expiry);clearInterval(poll);window.removeEventListener("message",receive);window.removeEventListener("pageshow",check);window.removeEventListener("focus",check);document.removeEventListener("visibilitychange",onVisible);frame.remove();};
  },[storyId,href,number,authorizedAt]);
  if(!ready||read||!recent(release,now))return null;
  const label=language==="fr"?"Nouvel épisode à lire":"New serial available";
  return <a href={href} aria-label={label} style={{position:"absolute",top:7,right:7,zIndex:2,display:"inline-flex",alignItems:"center",justifyContent:"center",width:44,height:44,borderRadius:"50%",background:"#fff2c6",border:"1px solid #bd8e29",boxShadow:"0 0 10px rgba(190,139,31,.35)",textDecoration:"none"}}><svg aria-hidden="true" viewBox="0 0 40 40" width="32" height="32" fill="none" stroke="#94650c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 16Q13 11 6 13v16q8-1 14 4 6-5 14-4V13q-7-2-14 3v17"/><path d="m32 2 1.6 5.4L39 9l-5.4 1.6L32 16l-1.6-5.4L25 9l5.4-1.6Z" fill="#d6a13a" stroke="none"/></svg></a>;
}
