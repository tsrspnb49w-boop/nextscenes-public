"use client";
import { useEffect, useState } from "react";
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
    window.addEventListener("storage",onStorage);
    window.addEventListener("pageshow",update);
    document.addEventListener("visibilitychange",update);
    return () => {
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
  return <section aria-label={fr ? "Confidentialité et statistiques" : "Privacy and analytics"} style={{maxWidth:1100,margin:"0 auto",padding:"12px 16px",fontSize:"0.875rem",lineHeight:1.5}}>
    {open ? <div style={{border:"1px solid currentColor",borderRadius:8,padding:12}}>
      <strong>{fr ? "Statistiques facultatives" : "Optional analytics"}</strong>
      <p style={{margin:"6px 0"}}>{fr
        ? "Avec votre accord, Google Analytics mesure la fréquentation du site public. Refuser ne change pas votre accès. Vous pouvez modifier votre choix ici à tout moment."
        : "With your permission, Google Analytics measures visits to our public website. Declining does not affect access. Change your choice here at any time."}{" "}
        <a href={fr ? "/fr/privacy" : "/privacy"} style={{textDecoration:"underline"}}>{fr ? "Politique de confidentialité" : "Privacy Policy"}</a>
      </p>
      {!production && <p>{fr ? "Environnement de test : aucune donnée envoyée à Google." : "Test environment: no data sent to Google."}</p>}
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        <button type="button" className="ns-btn ns-btn-ghost" onClick={()=>choose("yes")}>{fr ? "Autoriser" : "Allow analytics"}</button>
        <button type="button" className="ns-btn ns-btn-ghost" onClick={()=>choose("no")}>{fr ? "Refuser" : "Decline analytics"}</button>
      </div>
      {error && <p role="alert">{fr ? "Préférence non enregistrée. Les statistiques restent désactivées." : "Preference could not be saved. Analytics remain off."}</p>}
    </div> : <button type="button" className="ns-btn ns-btn-ghost" onClick={()=>setSettings(true)}>
      {fr ? "Préférences de confidentialité" : "Privacy preferences"}{" · "}{choice === "yes" ? (fr ? "Statistiques autorisées" : "Analytics allowed") : (fr ? "Statistiques refusées" : "Analytics declined")}
    </button>}
  </section>;
}
