"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { KEY, isProduction, readChoice, saveChoice, stop, syncAnalytics } from "../lib/analyticsConsentV1.mjs";

export default function AnalyticsPrivacyV1() {
  const path = usePathname() || "/";
  const fr = path === "/fr" || path.startsWith("/fr/");
  const [ready,setReady] = useState(false);
  const [choice,setChoice] = useState<"yes"|"no"|null>(null);
  const [settings,setSettings] = useState(false);
  const [error,setError] = useState(false);
  const [production,setProduction] = useState(false);
  useEffect(() => {
    const update = () => {
      const value = readChoice(window);
      setChoice(value);
      setProduction(isProduction(window));
      setReady(true);
      syncAnalytics(window,path);
    };
    const onStorage = (event: StorageEvent) => { if (event.key === KEY || event.key === null) update(); };
    update();
    const timer = window.setInterval(update,60000);
    window.addEventListener("storage",onStorage);
    window.addEventListener("pageshow",update);
    document.addEventListener("visibilitychange",update);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("storage",onStorage);
      window.removeEventListener("pageshow",update);
      document.removeEventListener("visibilitychange",update);
    };
  },[path]);

  function choose(value: "yes"|"no") {
    if (value === "no") stop(window);
    const saved = saveChoice(window,value);
    if (!saved) { stop(window); setError(true); setChoice(null); return; }
    setChoice(value); setError(false); setSettings(false);
    syncAnalytics(window,path);
  }

  if (!ready) return null;
  const open = settings || choice === null;
  return <>
    <button type="button" className="ns-footer-link" style={{background:"none",border:0,padding:0,textAlign:"left",cursor:"pointer",font:"inherit",color:"inherit"}} onClick={()=>setSettings(true)}>
      {fr ? "Préférences de confidentialité" : "Privacy preferences"}
    </button>
    {open && createPortal(
      <section aria-label={fr ? "Préférences de cookies" : "Cookie preferences"} style={{
        position:"fixed",bottom:"max(12px, env(safe-area-inset-bottom))",left:"max(12px, env(safe-area-inset-left))",
        width:"min(340px, calc(100% - 24px))",boxSizing:"border-box",maxHeight:"calc(100dvh - 32px)",overflowY:"auto",
        zIndex:1000,background:"#F5F0E4",color:"#173d32",border:"1px solid #C9D8CC",borderRadius:12,
        padding:14,boxShadow:"0 5px 24px rgba(15,60,45,.15)",fontSize:"0.85rem",lineHeight:1.45
      }}>
        <strong>{fr ? "Cookies" : "Cookies"}</strong>
        <p style={{margin:"6px 0 10px"}}>{fr
          ? "Avec votre accord, Google Analytics utilise des cookies facultatifs pour nous aider à comprendre la fréquentation du site. Votre accès reste inchangé."
          : "With your permission, Google Analytics uses optional cookies to help us understand visits to our site. Your access stays the same."}{" "}
          <a href={fr ? "/fr/privacy" : "/privacy"} style={{color:"#175b43",textDecoration:"underline"}}>{fr ? "En savoir plus" : "Learn more"}</a>
        </p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:8}}>
          <button type="button" className="ns-btn ns-btn-ghost" style={{width:"100%",minHeight:42,padding:"6px 8px",whiteSpace:"normal"}} onClick={()=>choose("yes")}>{fr ? "Accepter" : "Accept"}</button>
          <button type="button" className="ns-btn ns-btn-ghost" style={{width:"100%",minHeight:42,padding:"6px 8px",whiteSpace:"normal"}} onClick={()=>choose("no")}>{fr ? "Refuser" : "Decline"}</button>
        </div>
        {!production && <p style={{margin:"6px 0 0",fontSize:"0.72rem"}}>{fr ? "Mode test : aucune mesure envoyée." : "Test mode: no analytics sent."}</p>}
        {error && <p role="alert">{fr ? "Préférence non enregistrée. Les statistiques restent désactivées." : "Preference could not be saved. Analytics remain off."}</p>}
      </section>,document.body)}
  </>;
}
