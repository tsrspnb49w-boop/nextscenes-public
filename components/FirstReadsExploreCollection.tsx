import Link from "next/link";
import type { CSSProperties } from "react";

// One bilingual First Reads destination for readers and prospective authors.
// All manuscripts, artwork and exact-version approvals remain within the
// authenticated app, never within the public website.
const STAGING_APP = "https://staging.nextscenes.org";

export default function FirstReadsExploreCollection({ language }: { language: "en" | "fr" }) {
  const fr = language === "fr";
  const home = fr ? "/fr" : "/";
  const help = fr ? "/fr/help#first-reads" : "/help#first-reads";
  const projectHub = STAGING_APP + "/my-projects?firstReads=1";
  const register = STAGING_APP + "/register?intent=writer&firstReads=1&lang=" + language;
  const login = STAGING_APP + "/login?firstReads=1&lang=" + language;
  const t = fr ? {
    eyebrow: "NEXTSCENES · FIRST READS",
    heading: "Explorer First Reads",
    intro: "Découvrez des livres achevés grâce à leurs premiers chapitres et à des extraits choisis, publiés avec l'accord de leurs auteurs.",
    projectHub: "Accéder au Centre de projets",
    home: "Retour à l'accueil",
    shelf: "Livres à découvrir",
    emptyTitle: "De nouvelles lectures arrivent",
    empty: "Aucun livre First Reads n'a encore été approuvé pour la lecture publique.",
    authorTitle: "Votre manuscrit est déjà terminé ?",
    authorIntro: "Présentez votre livre aux lecteurs de NextScenes, tout en conservant vos droits.",
    steps: [
      ["1", "Préparer le livre", "Créez votre compte et complétez Book Setup."],
      ["2", "Relire votre livre", "Vérifiez la couverture, les pages et les extraits dans « Review Your Book »."],
      ["3", "Autoriser chaque diffusion", "Seul le contenu expressément approuvé pourra être publié."],
    ],
    rights: "Participation volontaire et non rémunérée. Aucun vote, aucune proposition de scène. Votre manuscrit reste votre propriété.",
    create: "Créer un compte auteur",
    signin: "J'ai déjà un compte",
    help: "Comment fonctionne First Reads ?",
    status: "Version d'essai : l'envoi de manuscrits et la publication restent désactivés.",
  } : {
    eyebrow: "NEXTSCENES · FIRST READS",
    heading: "Explore First Reads",
    intro: "Discover completed books through opening chapters and selected reading installments, shared with their authors' approval.",
    projectHub: "Go to Project Hub",
    home: "Back to homepage",
    shelf: "Books to discover",
    emptyTitle: "New reading adventures are coming",
    empty: "No First Reads book has been approved for public reading yet.",
    authorTitle: "Already completed your manuscript?",
    authorIntro: "Introduce your book to NextScenes readers while keeping ownership of your work.",
    steps: [
      ["1", "Prepare your book", "Create your account and complete Book Setup."],
      ["2", "Review Your Book", "Check the cover, reading pages and selected material."],
      ["3", "Approve each release", "Only the exact reading material you authorize may become public."],
    ],
    rights: "Participation is voluntary and unpaid. No voting or scene proposals. The manuscript remains yours.",
    create: "Create a writer account",
    signin: "I already have an account",
    help: "How does First Reads work?",
    status: "Staging pilot: manuscript submissions and publication remain disabled.",
  };

  const linkButton: CSSProperties = {
    display: "inline-flex", justifyContent: "center", alignItems: "center",
    textAlign: "center", minHeight: 46, padding: "10px 17px",
    borderRadius: 12, fontSize: 14, fontWeight: 800, textDecoration: "none",
    boxSizing: "border-box",
  };
  const textLink: CSSProperties = {
    color: "#0a6044", fontWeight: 750, textDecoration: "underline",
    textUnderlineOffset: 3, fontSize: 14,
  };

  return (
    <main data-first-reads-explore-v2="single-public-destination"
      style={{width:"100%",maxWidth:1040,margin:"clamp(18px,3vw,34px) auto 62px",
        padding:"0 16px",boxSizing:"border-box"}}>
      <section style={{background:"#fff",border:"1px solid #c9dfd0",borderRadius:22,
        boxShadow:"0 15px 42px rgba(17,66,45,.07)",
        padding:"clamp(20px,4vw,40px)"}}>
        <div style={{fontSize:11,color:"#137048",fontWeight:900,letterSpacing:".12em"}}>
          {t.eyebrow}
        </div>
        <h1 style={{font:"600 clamp(29px,3.9vw,40px)/1.15 Georgia,serif",
          color:"#0c4736",margin:"12px 0 10px"}}>{t.heading}</h1>
        <p style={{fontSize:16,color:"#445e51",lineHeight:1.55,margin:"0 0 20px",
          maxWidth:750}}>{t.intro}</p>
        <nav aria-label={fr ? "Navigation First Reads" : "First Reads navigation"}
          style={{display:"flex",alignItems:"center",flexWrap:"wrap",gap:11}}>
          <a data-first-reads-go-project-hub="true" href={projectHub}
            style={{...linkButton,color:"#fff",background:"#0b6246"}}>{t.projectHub}</a>
          <Link href={home} style={{...linkButton,color:"#0a6044",
            background:"#fff",border:"1px solid #b5d4c1"}}>{t.home}</Link>
        </nav>
        <p role="status" style={{margin:"19px 0 0",background:"#edf5ed",
          borderRadius:10,padding:"10px 12px",fontSize:13,
          lineHeight:1.55,color:"#285641"}}>{t.status}</p>

        <section aria-labelledby="first-reads-shelf" style={{marginTop:29}}>
          <h2 id="first-reads-shelf" style={{font:"600 24px/1.25 Georgia,serif",
            color:"#0c4b37",margin:"0 0 13px"}}>{t.shelf}</h2>
          {/* No approval-backed public API yet. Never use private draft data. */}
          <div data-first-reads-empty-collection="true" style={{
            border:"1px dashed #b7d5c0",background:"#f3f9f4",
            borderRadius:15,padding:"25px clamp(12px,3vw,24px)",
            textAlign:"center"}}>
            <strong style={{display:"block",color:"#0a4937",font:"600 20px Georgia,serif",
              marginBottom:8}}>{t.emptyTitle}</strong>
            <p style={{color:"#4b6758",margin:0,lineHeight:1.55}}>{t.empty}</p>
          </div>
        </section>

        <section aria-labelledby="first-reads-author" style={{
          borderTop:"1px solid #dce8df",paddingTop:23,marginTop:26}}>
          <h2 id="first-reads-author" style={{font:"600 clamp(22px,3vw,26px)/1.25 Georgia,serif",
            color:"#0c4b37",margin:"0 0 7px"}}>{t.authorTitle}</h2>
          <p style={{fontSize:15,lineHeight:1.5,color:"#445e51",
            margin:"0 0 17px"}}>{t.authorIntro}</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,215px),1fr))",
            gap:10}}>
            {t.steps.map(([number,title,description])=>(
              <div key={number} style={{border:"1px solid #d5e7db",
                borderRadius:12,padding:"13px 14px",background:"#fbfdfb"}}>
                <span aria-hidden="true" style={{color:"#116647",fontSize:12,
                  fontWeight:900}}>{number}</span>
                <strong style={{display:"block",margin:"4px 0 5px",
                  color:"#113e2f"}}>{title}</strong>
                <p style={{fontSize:13,lineHeight:1.5,color:"#52685b",
                  margin:0}}>{description}</p>
              </div>
            ))}
          </div>
          <p style={{fontSize:13,lineHeight:1.55,color:"#456152",margin:"15px 0"}}>
            {t.rights}
          </p>
          <div style={{display:"flex",gap:"12px 20px",alignItems:"center",
            flexWrap:"wrap",marginTop:10}}>
            <a href={register} style={textLink}>{t.create}</a>
            <a href={login} style={textLink}>{t.signin}</a>
            <Link href={help} style={textLink}>{t.help}</Link>
          </div>
        </section>
      </section>
    </main>
  );
}
