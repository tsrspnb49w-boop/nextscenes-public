import Link from "next/link";

// Staging-only public doorway. Registration and identity verification are
// handled by the existing NextScenes app, never by this public website.
const STAGING_APP = "https://staging.nextscenes.org";
type Props = { language: "en" | "fr" };

export default function FirstReadsPublicEntry({ language }: Props) {
  const fr = language === "fr";
  const home = fr ? "/fr" : "/";
  const copy = fr ? {
    flag: "PROGRAMME EN PRÉPARATION · STAGING",
    kicker: "NEXTSCENES · FIRST READS",
    title: "Votre livre est terminé. Faites-le découvrir.",
    intro: "First Reads est un parcours destiné aux auteurs de manuscrits achevés qui souhaitent présenter des extraits choisis aux lecteurs NextScenes, tout en conservant leurs droits.",
    how: "Comment rejoindre First Reads",
    steps: [
      ["Créez votre compte auteur", "Inscrivez-vous à NextScenes en tant qu'auteur, puis confirmez votre adresse e-mail. Un compte existant peut être utilisé."],
      ["Accédez au Centre de projets", "Ouvrez First Reads depuis votre espace auteur. Le parcours reste distinct de l'écriture collaborative."],
      ["Préparez votre livre", "La version prévue permettra de présenter le premier chapitre entier et des parties récentes, avec une couverture et un fond Royal Edition adaptés."],
      ["Autorisez les extraits", "L'auteur vérifie et approuve chaque sélection avant toute diffusion. Aucune publication automatique."],
    ],
    new: "Créer un compte auteur",
    existing: "J'ai déjà un compte",
    opened: "Accéder à First Reads",
    rights: "Droits et rémunération",
    rightsBody: "L’auteur conserve ses droits sur le manuscrit. La sérialisation First Reads est volontaire et non rémunérée. Les autorisations de présentation des textes et des images seront recueillies séparément.",
    status: "Cette page présente un parcours de staging. Les soumissions de manuscrits ne sont pas encore ouvertes et les commandes de publication restent désactivées.",
    back: "Retour à l'accueil",
    note: "Vous quitterez le site public pour accéder à l'application NextScenes et utiliser son système de connexion habituel.",
  } : {
    flag: "PREPARING THE PROGRAMME · STAGING",
    kicker: "NEXTSCENES · FIRST READS",
    title: "Your book is written. Let readers discover it.",
    intro: "First Reads is a dedicated pathway for authors with completed manuscripts who want to introduce selected reading material to NextScenes readers while retaining ownership of their work.",
    how: "How to join First Reads",
    steps: [
      ["Create your writer account", "Register with NextScenes as a writer and verify your email address. If you already have an account, sign in instead."],
      ["Enter Project Hub", "Open First Reads from your author workspace. This is separate from collaborative writing."],
      ["Prepare your book", "The planned pathway will present the complete first chapter and selected recent parts, with an appropriate cover and Royal Edition background."],
      ["Authorize each release", "The author reviews and approves each reading selection before publication. Nothing goes live automatically."],
    ],
    new: "Create a Writer Account",
    existing: "I Already Have an Account",
    opened: "Open First Reads",
    rights: "Rights and payment",
    rightsBody: "Authors retain manuscript copyright. First Reads serialization is voluntary and unpaid. Permission to display text and artwork will be requested separately.",
    status: "This is a staging preview of the programme. Manuscript submissions are not open yet, and publication controls remain disabled.",
    back: "Back to homepage",
    note: "These links open the NextScenes application, where the existing account registration and login processes apply.",
  };
  const buttons: React.CSSProperties = {
    display:"inline-flex",alignItems:"center",justifyContent:"center",
    minHeight:48,padding:"12px 18px",borderRadius:12,fontWeight:760,
    textDecoration:"none",textAlign:"center",flex:"1 1 200px"
  };
  return (
    <main className="ns-page" style={{maxWidth:1040,margin:"0 auto",
      padding:"clamp(24px,5vw,54px) 18px 70px",color:"#17392b"}}>
      <div style={{border:"1px solid #c5dcd1",borderRadius:22,background:"#fff",
        padding:"clamp(20px,4vw,42px)",boxShadow:"0 16px 48px rgba(14,53,35,.07)"}}>
        <div style={{fontSize:11,letterSpacing:".13em",fontWeight:900,color:"#1a6c47"}}>{copy.kicker}</div>
        <h1 style={{font:"600 clamp(30px,5.5vw,52px)/1.15 Georgia,serif",
          color:"#0b4533",margin:"14px 0 13px",maxWidth:820}}>{copy.title}</h1>
        <p style={{fontSize:"clamp(16px,2.2vw,19px)",lineHeight:1.65,
          color:"#455e51",maxWidth:830,margin:"0 0 23px"}}>{copy.intro}</p>
        <div role="note" style={{background:"#edf5ef",borderLeft:"5px solid #166b4a",
          padding:"13px 16px",borderRadius:10,color:"#24563e",fontSize:13}}>
          <strong>{copy.flag}</strong> {copy.status}
        </div>
        <h2 style={{font:"600 clamp(23px,3.5vw,30px) Georgia,serif",
          color:"#0b4533",margin:"30px 0 15px"}}>{copy.how}</h2>
        <ol style={{margin:0,paddingLeft:24,display:"grid",gap:17}}>
          {copy.steps.map(([name,description])=><li key={name} style={{paddingLeft:7}}>
            <strong style={{fontSize:17,color:"#143e2f"}}>{name}</strong>
            <p style={{margin:"4px 0 0",color:"#50665a",lineHeight:1.6}}>{description}</p>
          </li>)}
        </ol>
        <div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:31}}>
          <a style={{...buttons,background:"#0d5c42",color:"#fff"}}
            href={STAGING_APP + "/register?lang=" + language + "&intent=writer&firstReads=1"}>
            {copy.new}
          </a>
          <a style={{...buttons,background:"#fff",color:"#0d5c42",border:"1px solid #b5d4c1"}}
            href={STAGING_APP + "/login?lang=" + language + "&firstReads=1"}>
            {copy.existing}
          </a>
          <a style={{...buttons,background:"#f4f8f4",color:"#0d5c42",border:"1px solid #b5d4c1"}}
            href={STAGING_APP + "/my-projects?firstReads=1"}>
            {copy.opened}
          </a>
        </div>
        <p style={{fontSize:12,color:"#536b5f",margin:"10px 0 0"}}>{copy.note}</p>
        <div style={{marginTop:28,borderTop:"1px solid #e0e9e1",paddingTop:20}}>
          <h2 style={{fontSize:19,color:"#0b4533",margin:"0 0 7px"}}>{copy.rights}</h2>
          <p style={{color:"#50665a",lineHeight:1.65,margin:0}}>{copy.rightsBody}</p>
        </div>
        <p style={{margin:"23px 0 0",fontSize:13}}>
          <Link href={home} style={{color:"#146745",fontWeight:750}}>{copy.back}</Link>
        </p>
      </div>
    </main>
  );
}
