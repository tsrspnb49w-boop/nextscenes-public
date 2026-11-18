import Link from "next/link";
import type { CSSProperties } from "react";

// Staging discovery page. The existing NextScenes application owns all
// registration and login flows. No manuscript collection happens here.
const STAGING_APP = "https://staging.nextscenes.org";

export default function FirstReadsPublicEntry({ language }: { language:"en"|"fr" }) {
  const fr = language === "fr";
  const help = fr ? "/fr/help#first-reads" : "/help#first-reads";
  const home = fr ? "/fr" : "/";
  const t = fr ? {
    kicker:"NEXTSCENES · FIRST READS",
    title:"Vous avez déjà terminé votre livre ?",
    lead:"Présentez votre manuscrit aux lecteurs grâce à des extraits choisis, sans renoncer à vos droits.",
    benefit1:"Un premier chapitre complet et des lectures récentes.",
    benefit2:"Une couverture professionnelle et un intérieur Royal Edition préparés avec notre aide.",
    benefit3:"Vous décidez ce qui est publié. Pas de votes, ni d’écriture collaborative.",
    pilot:"Parcours en cours d’essai : les dépôts et publications restent désactivés.",
    cta:"Explorer First Reads dans NextScenes",
    create:"Créer un compte auteur",
    signin:"Se connecter",
    note:"Vous utilisez votre compte NextScenes habituel. L'inscription est nécessaire pour participer.",
    learn:"Comment fonctionne First Reads ?",
    back:"Retour à l'accueil",
  } : {
    kicker:"NEXTSCENES · FIRST READS",
    title:"Already completed your book?",
    lead:"Introduce selected parts of your manuscript to readers while retaining your rights.",
    benefit1:"A complete first chapter and recent reading selections.",
    benefit2:"Professional cover and Royal Edition presentation support.",
    benefit3:"You approve what readers see. No voting or collaborative rewriting.",
    pilot:"Staging preview: manuscript submissions and publication remain disabled.",
    cta:"Explore First Reads in NextScenes",
    create:"Create a writer account",
    signin:"Sign in",
    note:"Use your existing NextScenes account. Registration is required to participate.",
    learn:"How does First Reads work?",
    back:"Back to homepage",
  };
  const linkStyle:CSSProperties={textDecoration:"none",color:"#126346",
    fontSize:14,fontWeight:750};
  return <main className="ns-page" style={{maxWidth:900,margin:"0 auto",
      padding:"clamp(20px,4vw,40px) 18px 55px"}}>
    <section style={{border:"1px solid #c8ddcf",borderRadius:19,
      background:"#fff",padding:"clamp(19px,3vw,33px)",
      boxShadow:"0 12px 38px rgba(11,62,43,.07)"}}>
      <div style={{fontSize:11,color:"#176442",fontWeight:900,
        letterSpacing:".12em"}}>{t.kicker}</div>
      <h1 style={{font:"600 clamp(27px,3.7vw,36px)/1.17 Georgia,serif",
        color:"#0b4835",margin:"11px 0 9px"}}>{t.title}</h1>
      <p style={{color:"#496052",fontSize:16,lineHeight:1.55,
        maxWidth:720,margin:"0 0 17px"}}>{t.lead}</p>
      <ul style={{color:"#294d39",lineHeight:1.6,
        margin:"0 0 18px",paddingLeft:22,fontSize:14}}>
        {[t.benefit1,t.benefit2,t.benefit3].map(x=><li key={x}>{x}</li>)}
      </ul>
      <p role="status" style={{background:"#edf5ed",color:"#24553d",
        padding:"11px 14px",borderRadius:10,fontSize:13,
        lineHeight:1.5,margin:"0 0 20px"}}>{t.pilot}</p>
      <a href={STAGING_APP+"/my-projects?firstReads=1"} style={{background:"#0b5c42",
        color:"#fff",padding:"14px 19px",borderRadius:12,
        fontSize:16,fontWeight:800,textDecoration:"none",display:"inline-flex",
        minHeight:48,alignItems:"center",justifyContent:"center",maxWidth:"100%",
        textAlign:"center"}}>{t.cta}</a>
      <div style={{display:"flex",gap:"10px 21px",flexWrap:"wrap",
        marginTop:18,alignItems:"center"}}>
        <a href={STAGING_APP+"/register?intent=writer&firstReads=1&lang="+language}
          style={linkStyle}>{t.create}</a>
        <a href={STAGING_APP+"/login?firstReads=1&lang="+language}
          style={linkStyle}>{t.signin}</a>
        <Link href={help} style={linkStyle}>{t.learn}</Link>
      </div>
      <p style={{color:"#65746a",margin:"12px 0 18px",
        fontSize:12}}>{t.note}</p>
      <Link href={home} style={{...linkStyle,fontSize:13}}>{t.back}</Link>
    </section>
  </main>;
}
