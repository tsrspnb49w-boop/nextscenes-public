import Link from "next/link";

// A separate discovery shelf, not the author registration/intake guide.
// First Reads has no publication API yet. Never show a private draft or
// borrow unapproved Storyline content to fill an empty collection.
export default function FirstReadsExploreCollection({ language }: { language:"en"|"fr" }) {
  const fr = language === "fr";
  const t = fr ? {
    eyebrow:"NEXTSCENES · COLLECTION",
    heading:"Explorer First Reads",
    intro:"Découvrez les livres que leurs auteurs ont expressément autorisé NextScenes à présenter aux lecteurs.",
    emptyTitle:"De nouvelles histoires arrivent",
    empty:"Aucun livre First Reads n'a encore été approuvé pour la lecture publique. Seules les éditions autorisées seront affichées ici.",
    explain:"Les brouillons privés et les chapitres non autorisés ne sont jamais présentés dans cette collection.",
    author:"Vous avez déjà achevé votre manuscrit ?",
    authorLink:"Présenter mon livre",
    home:"Retour à l'accueil"
  } : {
    eyebrow:"NEXTSCENES · READING COLLECTION",
    heading:"Explore First Reads",
    intro:"Discover books their authors have expressly approved for readers on NextScenes.",
    emptyTitle:"New stories are on their way",
    empty:"No First Reads book has been approved for public reading yet. Only authorized reading editions will appear in this collection.",
    explain:"Private book drafts and unreleased chapters never appear in this collection.",
    author:"Already completed your manuscript?",
    authorLink:"Introduce my book",
    home:"Back to homepage"
  };
  return <section data-first-reads-explore-v1="no-public-release"
    style={{maxWidth:940,margin:"35px auto 65px",padding:"0 18px"}}>
    <div style={{background:"#fff",border:"1px solid #c4ddce",borderRadius:20,
      padding:"clamp(22px,4vw,42px)",boxShadow:"0 16px 42px rgba(18,61,43,.07)"}}>
      <p style={{color:"#15724a",fontWeight:900,letterSpacing:".14em",
        fontSize:11,margin:"0 0 10px"}}>{t.eyebrow}</p>
      <h1 style={{font:"600 clamp(28px,4vw,40px)/1.14 Georgia,serif",
        color:"#0d4635",margin:"0 0 10px"}}>{t.heading}</h1>
      <p style={{maxWidth:710,lineHeight:1.6,color:"#476254",
        fontSize:16,margin:"0 0 30px"}}>{t.intro}</p>
      <div role="status" style={{border:"1px dashed #b8d4c2",borderRadius:14,
        background:"#f3f9f4",padding:"clamp(20px,4vw,35px)",textAlign:"center"}}>
        <div aria-hidden="true" style={{fontSize:34,color:"#0d694a"}}>◇</div>
        <h2 style={{font:"600 24px/1.25 Georgia,serif",margin:"8px 0 10px",color:"#0d4b36"}}>
          {t.emptyTitle}
        </h2>
        <p style={{color:"#466153",margin:"0 auto",lineHeight:1.6,maxWidth:520}}>
          {t.empty}
        </p>
      </div>
      <p style={{fontSize:13,color:"#547061",margin:"15px 0 29px"}}>{t.explain}</p>
      <div style={{display:"flex",justifyContent:"space-between",gap:14,flexWrap:"wrap",
        alignItems:"center"}}>
        <div>
          <strong style={{color:"#0a4b35",display:"block",marginBottom:6}}>{t.author}</strong>
          <Link href={fr?"/fr/first-reads":"/first-reads"}
            style={{color:"#0b6348",fontWeight:750,textDecoration:"underline"}}>
            {t.authorLink}
          </Link>
        </div>
        <Link href={fr?"/fr":"/"}
          style={{color:"#0b6348",fontWeight:750,textDecoration:"underline"}}>
          {t.home}
        </Link>
      </div>
    </div>
  </section>;
}
