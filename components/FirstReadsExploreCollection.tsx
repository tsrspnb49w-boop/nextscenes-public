import Image from "next/image";
import Link from "next/link";
import { QUEEN_AMINA_FIRST_READS, queenAminaPublicReadingUrl } from "@/app/lib/firstReadsApprovedBooks";
import type { CSSProperties } from "react";

// One bilingual First Reads destination for readers and prospective authors.
// All manuscripts, artwork and exact-version approvals remain within the
// authenticated app, never within the public website.
const APP_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://app.nextscenes.org").replace(/\/+$/, "");

export default function FirstReadsExploreCollection({ language }: { language: "en" | "fr" }) {
  const fr = language === "fr";
  const home = fr ? "/fr" : "/";
  const help = "#how-first-reads-works";
  // Launch-only entry: the app still checks the writer's authentication
  // and server-side ownership. Opening this link never publishes a book.
  const appEntry = APP_URL + "/my-projects?firstReads=1&lang=" + language;
  const register = APP_URL + "/register?intent=writer&lang=" + language;
  const login = APP_URL + "/login?lang=" + language;
  const collection = fr ? "/fr/first-reads/books" : "/first-reads/books";
  const readingUrl = queenAminaPublicReadingUrl(APP_URL);
  const t = fr ? {
    eyebrow: "NEXTSCENES · FIRST READS",
    heading: "Explorer First Reads",
    intro: "Découvrez des livres achevés grâce à leurs premiers chapitres et à des extraits choisis, publiés avec l'accord de leurs auteurs.",
    projectHub: "Entrer dans l’application",
    home: "Retour à l'accueil",
    shelf: "Livres à découvrir",
    bookStatus: "CHAPITRE 1 DISPONIBLE",
    bookSummary: "Par Kola King. Découvrez ce roman en anglais dans notre Édition Royale.",
    readBook: "Lire le livre",
    browseBooks: "Voir la collection First Reads",
    authorTitle: "Votre manuscrit est déjà terminé ?",
    authorIntro: "First Reads permet aux auteurs de livres achevés de partager des lectures choisies, tout en conservant leurs droits.",
    steps: [
      ["1", "Créer votre compte auteur", "Depuis Explorer First Reads, inscrivez-vous ou connectez-vous. Dans le Centre de projets, ouvrez First Reads et créez votre livre. Rien n'est publié à cette étape."],
      ["2", "Compléter Book Setup", "Renseignez le titre, la langue, le nom de plume figurant sur le livre, le résumé et la présentation. Enregistrez les informations avant de continuer."],
      ["3", "Importer le livre complet", "Dans l'Espace Livre existant, choisissez votre manuscrit Word (.docx) pour un nouveau livre vide. Vérifiez les chapitres détectés et le nombre de mots, confirmez puis enregistrez en privé."],
      ["4", "Relire le manuscrit", "Utilisez Chapters, Write et Full Manuscript Review pour vérifier tous les chapitres, la mise en forme et les sauts de page. Le manuscrit privé reste l'unique source de référence."],
      ["5", "Préparer les éléments du livre", "Vérifiez la couverture, la quatrième de couverture, la présentation de l'auteur et les pages liminaires. Leur enregistrement privé ne les rend pas publics ; leur diffusion exige une validation distincte."],
      ["6", "Prévisualiser le chapitre 1", "Dans Review, ouvrez Preview My Reading Selection. Lisez le premier chapitre entier, puis utilisez Confirm This Preview. Vérifiez le texte et les droits avant toute autorisation."],
      ["7", "Autoriser la première lecture", "Cliquez sur Authorize This Reading seulement après vérification. Le chapitre 1 devient public dans le Royal Reader, suivi de sa page d'évaluation puis d'une page de transition."],
      ["8", "Préparer et publier les épisodes", "Dans Authorize the Next Serial, cliquez sur Preview Next Serial. Prévoyez normalement deux ou trois épisodes par chapitre, d'environ 1 200 mots chacun (de préférence 1 000 à 1 500), en respectant les coupures naturelles. Vérifiez et autorisez un seul épisode à la fois."],
      ["9", "Partager et suivre les réactions", "Partagez uniquement le lien public autorisé. Chaque épisode possède sa page d'évaluation. Le chapitre 1 reste permanent ; seuls les cinq derniers épisodes sont visibles. Arrêtez la diffusion vers les deux tiers du manuscrit."],
    ],
    rights: "Participation volontaire et non rémunérée. Aucun vote ni proposition de scène. Le manuscrit complet reste privé. Le chapitre 1 demeure accessible après autorisation. Les feuilletons suivants peuvent ne pas suivre immédiatement la chronologie du chapitre 1 : la page de transition le précise. Partage public limité aux lectures autorisées. Couverture, présentation de l’auteur et chaque diffusion exigent son accord.",
    readerTitle: "Ce que voient les lecteurs",
    readerSteps: [
      "Le lecteur accède uniquement au livre public autorisé. Le manuscrit privé et les épisodes non diffusés restent invisibles.",
      "Il lit le chapitre 1, répond à son évaluation, puis découvre une page de transition qui précise que les épisodes suivants peuvent ne pas suivre immédiatement la chronologie du premier chapitre.",
      "Chaque nouvel épisode est suivi de sa propre évaluation. Après le cinquième, l'épisode le plus ancien quitte la fenêtre de lecture ; le chapitre 1 reste disponible.",
    ],
    create: "Créer un compte auteur",
    signin: "J'ai déjà un compte",
    help: "Comment fonctionne First Reads ?",
    status: "First Reads accueille les manuscrits achevés. Chaque auteur prépare son livre en privé et autorise explicitement chaque diffusion.",
    accountNote: "Votre compte NextScenes ne publie aucun manuscrit automatiquement. Vous choisissez les lectures que vous autorisez.",
  } : {
    eyebrow: "NEXTSCENES · FIRST READS",
    heading: "Explore First Reads",
    intro: "Discover completed books through opening chapters and selected reading installments, shared with their authors' approval.",
    projectHub: "Enter the App",
    home: "Back to homepage",
    shelf: "Books to discover",
    bookStatus: "CHAPTER ONE AVAILABLE",
    bookSummary: "By Kola King. Discover her story in the Royal Reader.",
    readBook: "Read the Book",
    browseBooks: "View First Reads Collection",
    authorTitle: "Already completed your manuscript?",
    authorIntro: "First Reads lets authors of completed books share selected readings while retaining ownership of their work.",
    steps: [
      ["1", "Create a writer account", "From Explore First Reads, register or sign in. Open First Reads in Project Hub and create your book. Starting a draft never publishes your manuscript."],
      ["2", "Complete Book Setup", "Enter the book title, language, printed author name, synopsis and teaser. Save the book details before continuing."],
      ["3", "Import the complete manuscript", "In the existing Book Workspace, choose a Word (.docx) manuscript for a new, empty book. Review detected chapters and word count, confirm the selection, then save it privately."],
      ["4", "Review the full manuscript", "Use Chapters, Write and Full Manuscript Review to check all chapters, formatting and page breaks. The private full manuscript remains the single source of truth."],
      ["5", "Prepare the book details", "Check the front and back covers, About the Author and front matter. Saving these privately does not publish them; each public update needs a separate confirmation."],
      ["6", "Preview Chapter One", "In Review, open Preview My Reading Selection. Read the entire first chapter and use Confirm This Preview. Verify the exact text and your publication rights before authorizing."],
      ["7", "Authorize the first public reading", "Choose Authorize This Reading only after checking the preview. Chapter One appears in the public Royal Reader, followed by an Evaluation Page and a transition page."],
      ["8", "Preview and authorize each serial", "In Authorize the Next Serial, select Preview Next Serial. Normally plan two or three substantial serials per source chapter, aiming for 1,200 words each (preferably 1,000–1,500) at natural narrative breaks. Review and authorize only one serial at a time."],
      ["9", "Share and follow reader feedback", "Share only the authorized public Reader link. Every serial has an Evaluation Page. Chapter One stays public; only the latest five serials remain visible. End serialization around two thirds of the manuscript."],
    ],
    rights: "Participation is voluntary and unpaid, with no voting or scene proposals. The full manuscript remains private. Chapter One stays accessible once authorized. Later serial installments may not immediately follow Chapter One in narrative order, as the buffer page explains. Public sharing opens authorized reading only. Covers, About the Author and every release require approval.",
    readerTitle: "What readers see",
    readerSteps: [
      "Readers open only the authorized public book. The private manuscript and unreleased serials remain inaccessible.",
      "They read Chapter One, reach its Evaluation Page, then see a transition explaining that later serials may not immediately follow Chapter One in narrative order.",
      "Every newly authorized serial has its own Evaluation Page. After five serials are visible, the oldest rotates out while Chapter One remains accessible.",
    ],
    create: "Create a writer account",
    signin: "I already have an account",
    help: "How First Reads works",
    status: "First Reads welcomes completed manuscripts. Authors prepare their books privately and approve every public release.",
    accountNote: "A NextScenes account does not publish your manuscript automatically. You choose exactly what readers may see.",
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
        <nav aria-label={fr ? "Fil d’Ariane" : "Breadcrumbs"} style={{display:"flex",gap:8,alignItems:"center",fontSize:13,marginBottom:14,color:"#5c7566"}}>
          <Link href={home} style={{color:"#0b6246"}}>{fr ? "Accueil" : "Home"}</Link><span aria-hidden="true">›</span>
          <span aria-current="page">First Reads</span>
        </nav>
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
          {/* Only an explicitly authorized public First Reads release may be featured. */}
          <div data-first-reads-featured-book="queen-amina" style={{
            display:"flex",alignItems:"center",flexWrap:"wrap",gap:"clamp(16px,3vw,26px)",
            border:"1px solid #b7d5c0",background:"#f3f9f4",
            borderRadius:15,padding:"clamp(16px,3vw,24px)"}}>
            <a href={readingUrl} aria-label={t.readBook} style={{display:"block",lineHeight:0}}>
              <Image src={QUEEN_AMINA_FIRST_READS.cover}
                alt="Queen Amina: Soldier on Horseback book cover"
                width={125} height={188} unoptimized
                style={{width:125,height:"auto",borderRadius:6,boxShadow:"4px 9px 20px rgba(17,66,45,.18)"}}/>
            </a>
            <div style={{flex:"1 1 230px",minWidth:0}}>
              <strong style={{fontSize:11,letterSpacing:".09em",color:"#146746"}}>{t.bookStatus}</strong>
              <h3 style={{font:"600 22px/1.25 Georgia,serif",color:"#0a4937",margin:"8px 0"}}>
                {QUEEN_AMINA_FIRST_READS.title}
              </h3>
              <p style={{fontSize:14,color:"#4b6758",lineHeight:1.55,margin:"0 0 15px"}}>{t.bookSummary}</p>
              <div style={{display:"flex",alignItems:"center",flexWrap:"wrap",gap:13}}>
                <a href={readingUrl} style={{...linkButton,color:"#fff",background:"#0b6246"}}>{t.readBook}</a>
                <Link href={collection} style={textLink}>{t.browseBooks}</Link>
              </div>
            </div>
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
          <h3 id="how-first-reads-works" style={{font:"600 clamp(20px,2.2vw,24px)/1.25 Georgia,serif",color:"#124936",margin:"10px 0 14px",scrollMarginTop:110}}>{t.help}</h3>
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
          <section aria-label={t.readerTitle}
            style={{marginTop:20,border:"1px solid #d5e7db",background:"#f7fbf8",borderRadius:13,padding:"16px 18px"}}>
            <h4 style={{font:"600 19px/1.3 Georgia,serif",color:"#124936",margin:"0 0 10px"}}>{t.readerTitle}</h4>
            <ol style={{margin:0,paddingLeft:21,color:"#476152",fontSize:14,lineHeight:1.65}}>
              {t.readerSteps.map((step,index)=><li key={index} style={{marginBottom:7}}>{step}</li>)}
            </ol>
          </section>
          <p style={{fontSize:13,lineHeight:1.55,color:"#456152",margin:"15px 0"}}>
            {t.rights}
          </p>
          <div style={{display:"flex",gap:"12px 20px",alignItems:"center",
            flexWrap:"wrap",marginTop:10}}>
            <a href={register} style={textLink}>{t.create}</a>
            <a href={login} style={textLink}>{t.signin}</a>
            <a href={help} style={textLink}>{fr ? "Voir les étapes" : "View the steps"}</a>
          </div>
          <p style={{fontSize:12,lineHeight:1.55,color:"#587061",margin:"13px 0 0"}}>{t.accountNote}</p>
        </section>
      </section>
    </main>
  );
}
