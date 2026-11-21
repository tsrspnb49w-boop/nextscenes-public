import Link from "next/link";
import type { CSSProperties } from "react";

// One bilingual First Reads destination for readers and prospective authors.
// All manuscripts, artwork and exact-version approvals remain within the
// authenticated app, never within the public website.
const APP_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://app.nextscenes.org").replace(/\/+$/, "");

export default function FirstReadsExploreCollection({ language }: { language: "en" | "fr" }) {
  const fr = language === "fr";
  const home = fr ? "/fr" : "/";
  const help = "#how-first-reads-works";
  // The production app does not yet expose the staging-only First Reads
  // manuscript intake. This is a general app entry, never an intake promise.
  const appEntry = APP_URL + "/?lang=" + language;
  const register = APP_URL + "/register?intent=writer&lang=" + language;
  const login = APP_URL + "/login?lang=" + language;
  const books = fr ? "/fr/books" : "/books";
  const t = fr ? {
    eyebrow: "NEXTSCENES · FIRST READS",
    heading: "Explorer First Reads",
    intro: "Découvrez des livres achevés grâce à leurs premiers chapitres et à des extraits choisis, publiés avec l'accord de leurs auteurs.",
    projectHub: "Entrer dans l’application",
    home: "Retour à l'accueil",
    shelf: "Livres à découvrir",
    emptyTitle: "De nouvelles lectures arrivent",
    empty: "Les premières sélections de lecture approuvées par leurs auteurs seront présentées ici dès leur ouverture au public.",
    browseBooks: "Découvrir les livres publiés",
    authorTitle: "Votre manuscrit est déjà terminé ?",
    authorIntro: "First Reads permettra aux auteurs de livres achevés de partager des lectures choisies, tout en conservant leurs droits.",
    steps: [
      ["1", "Préparer le livre", "Créez votre compte et complétez Book Setup."],
      ["2", "Relire votre livre", "Vérifiez le texte, la couverture et les lectures proposées."],
      ["3", "Autoriser chaque diffusion", "Seul le contenu expressément approuvé pourra être publié."],
    ],
    rights: "Participation volontaire et non rémunérée. Aucun vote ni proposition de scène. Le manuscrit complet reste privé. Couverture et présentation de l’auteur exigent son accord avant publication.",
    create: "Créer un compte auteur",
    signin: "J'ai déjà un compte",
    help: "Comment fonctionne First Reads ?",
    status: "Le parcours First Reads est en préparation. L’envoi de manuscrits et la diffusion ne sont pas encore ouverts dans l’application publique.",
    accountNote: "Un compte NextScenes donne accès à l’application, mais n’inscrit pas encore votre livre à First Reads.",
  } : {
    eyebrow: "NEXTSCENES · FIRST READS",
    heading: "Explore First Reads",
    intro: "Discover completed books through opening chapters and selected reading installments, shared with their authors' approval.",
    projectHub: "Enter the App",
    home: "Back to homepage",
    shelf: "Books to discover",
    emptyTitle: "New reading adventures are coming",
    empty: "The first author-approved reading selections will appear here when First Reads opens to readers.",
    browseBooks: "Explore published books",
    authorTitle: "Already completed your manuscript?",
    authorIntro: "First Reads will let authors of completed books share selected readings while retaining ownership of their work.",
    steps: [
      ["1", "Prepare your book", "Create your account and complete Book Setup."],
      ["2", "Review Your Book", "Check the text, cover artwork and proposed reading selections."],
      ["3", "Approve each release", "Only the exact reading material you authorize may become public."],
    ],
    rights: "Participation is voluntary and unpaid. No voting or scene proposals. The full manuscript remains private. Cover artwork and About the Author require author approval before public use.",
    create: "Create a writer account",
    signin: "I already have an account",
    help: "How does First Reads work?",
    status: "First Reads is being prepared. Manuscript submissions and public releases are not yet available in the production application.",
    accountNote: "A NextScenes account provides general access to the app; it does not yet submit your book to First Reads.",
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
          <a data-first-reads-enter-app="true" href={appEntry}
            style={{...linkButton,color:"#fff",background:"#0b6246"}}>{t.projectHub}</a>
          <Link href={home} style={{...linkButton,color:"#0a6044",
            background:"#fff",border:"1px solid #b5d4c1"}}>{t.home}</Link>
        </nav>
        <section aria-labelledby="first-reads-shelf" style={{marginTop:29}}>
          <h2 id="first-reads-shelf" style={{font:"600 24px/1.25 Georgia,serif",
            color:"#0c4b37",margin:"0 0 13px"}}>{t.shelf}</h2>
          {/* Never render staging manuscript drafts or guessed book records here.
              Approved books require a separate vetted public catalog integration. */}
          <div data-first-reads-empty-collection="true" style={{
            border:"1px dashed #b7d5c0",background:"#f3f9f4",
            borderRadius:15,padding:"25px clamp(12px,3vw,24px)",
            textAlign:"center"}}>
            <strong style={{display:"block",color:"#0a4937",font:"600 20px Georgia,serif",
              marginBottom:8}}>{t.emptyTitle}</strong>
            <p style={{color:"#4b6758",margin:"0 0 13px",lineHeight:1.55}}>{t.empty}</p>
            <Link href={books} style={textLink}>{t.browseBooks}</Link>
          </div>
        </section>

        <section aria-labelledby="first-reads-author" style={{
          borderTop:"1px solid #dce8df",paddingTop:23,marginTop:26}}>
          <h2 id="first-reads-author" style={{font:"600 clamp(22px,3vw,26px)/1.25 Georgia,serif",
            color:"#0c4b37",margin:"0 0 7px"}}>{t.authorTitle}</h2>
          <p style={{fontSize:15,lineHeight:1.5,color:"#445e51",
            margin:"0 0 17px"}}>{t.authorIntro}</p>
          <p role="status" style={{margin:"0 0 17px",background:"#f1f7f2",
            border:"1px solid #d6e9db",borderRadius:10,padding:"11px 13px",
            color:"#315b45",fontSize:13,lineHeight:1.5}}>{t.status}</p>
          <div id="how-first-reads-works" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,215px),1fr))",
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
            <a href={help} style={textLink}>{t.help}</a>
          </div>
          <p style={{fontSize:12,lineHeight:1.55,color:"#587061",margin:"13px 0 0"}}>{t.accountNote}</p>
        </section>
      </section>
    </main>
  );
}
