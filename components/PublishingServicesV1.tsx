import Link from "next/link";

const content = {
  en: {
    kicker: "NextScenes Publishing Services",
    title: "From manuscript to published book",
    intro: "A finished manuscript deserves careful preparation. NextScenes works with authors to prepare books for publication while respecting the author’s voice, rights and final decisions.",
    cta: "Discuss your book",
    books: "Explore published books",
    servicesTitle: "How we can help",
    services: [
      ["Editorial preparation", "Manuscript review, proofreading and agreed editorial improvements."],
      ["Book design and formatting", "Preparation of the interior, cover and publication-ready files for the agreed formats."],
      ["Publication assistance", "Support with book descriptions, publication details, platform setup and submission to agreed distribution channels."],
      ["After publication", "Assistance with book listings, corrections and agreed publicity activities."]
    ],
    processTitle: "A straightforward publishing journey",
    steps: [
      ["Tell us about your book", "Send a brief enquiry describing the manuscript and the assistance you need."],
      ["Review and agreement", "We discuss the scope, rights, costs if applicable, formats and publication arrangements before work begins."],
      ["Prepare and approve", "The author reviews the final manuscript, cover and publication particulars."],
      ["Publish", "Submission takes place only after written authorization. Retail platforms make their own acceptance decisions."]
    ],
    rightsTitle: "Your work remains yours",
    rights: "An enquiry does not transfer copyright or authorize publication. Previously published works require confirmation of available publication rights. Collaborative works require the applicable contributor arrangements. Fees, royalties, distribution rights and any licence are agreed in writing for each project.",
    firstReadsTitle: "Not ready for commercial publication?",
    firstReads: "First Reads is a separate, optional pathway for sharing authorized extracts of a completed manuscript with readers.",
    firstReadsLink: "Explore First Reads",
    contactTitle: "Let us discuss your manuscript",
    contact: "Tell us your book title, genre, manuscript language, approximate length, whether it has been published before, and the assistance you need. Please do not send the manuscript or confidential rights documents with your initial enquiry.",
    contactHref: "/contact?topic=publishing#contact-form",
    booksHref: "/books",
    firstReadsHref: "/first-reads"
  },
  fr: {
    kicker: "Services d’édition NextScenes",
    title: "Du manuscrit au livre publié",
    intro: "Un manuscrit achevé mérite une préparation soignée. NextScenes accompagne les auteurs dans la préparation de leurs livres en respectant leur voix, leurs droits et leurs décisions finales.",
    cta: "Parlons de votre livre",
    books: "Découvrir les livres publiés",
    servicesTitle: "Comment nous pouvons vous accompagner",
    services: [
      ["Préparation éditoriale", "Relecture du manuscrit, correction et améliorations éditoriales convenues."],
      ["Conception et mise en page", "Préparation de l’intérieur du livre, de la couverture et des fichiers prêts à publier dans les formats convenus."],
      ["Accompagnement à la publication", "Aide à la rédaction du descriptif, aux informations bibliographiques, à la configuration et à la soumission auprès des canaux de diffusion convenus."],
      ["Après la publication", "Aide au suivi des fiches des livres, aux corrections et aux actions de promotion convenues."]
    ],
    processTitle: "Un parcours de publication simple",
    steps: [
      ["Présentez votre livre", "Envoyez une brève demande décrivant le manuscrit et l’accompagnement souhaité."],
      ["Examen et accord", "Nous définissons les prestations, les droits, les éventuels frais, les formats et les modalités de publication avant le début des travaux."],
      ["Préparation et validation", "L’auteur valide le manuscrit final, la couverture et les informations de publication."],
      ["Publication", "La soumission intervient uniquement après autorisation écrite. Les plateformes de vente décident elles-mêmes de l’acceptation."]
    ],
    rightsTitle: "Votre œuvre reste la vôtre",
    rights: "Une demande de renseignements ne vaut ni cession de droits d’auteur ni autorisation de publication. Pour une œuvre déjà publiée, la disponibilité des droits de publication doit être confirmée. Pour une œuvre collaborative, les accords applicables aux contributeurs sont nécessaires. Les frais, redevances, droits de diffusion et éventuelles licences sont convenus par écrit pour chaque projet.",
    firstReadsTitle: "Pas encore prêt pour une publication commerciale ?",
    firstReads: "Premières lectures est un parcours distinct et facultatif permettant de partager avec les lecteurs des extraits autorisés d’un manuscrit achevé.",
    firstReadsLink: "Découvrir Premières lectures",
    contactTitle: "Parlons de votre manuscrit",
    contact: "Indiquez le titre, le genre, la langue, la longueur approximative du manuscrit, s’il a déjà été publié et l’accompagnement souhaité. N’envoyez pas le manuscrit ni de documents confidentiels relatifs aux droits lors de votre première demande.",
    contactHref: "/fr/contact?topic=publishing#contact-form",
    booksHref: "/fr/books",
    firstReadsHref: "/fr/first-reads"
  }
};

export default function PublishingServicesV1({lang="en"}: {lang?: "en" | "fr"}) {
  const t=content[lang];
  return <main className="ns-page ns-writers-page">
    <section className="ns-writers-section">
      <div className="ns-writers-kicker">{t.kicker}</div>
      <h1 className="ns-h1">{t.title}</h1>
      <p className="ns-subtitle" style={{maxWidth:800}}>{t.intro}</p>
      <div className="ns-hero-cta">
        <Link className="ns-btn ns-btn-primary" href={t.contactHref}>{t.cta}</Link>
        <Link className="ns-btn ns-btn-ghost" href={t.booksHref}>{t.books}</Link>
      </div>
    </section>
    <section className="ns-writers-section">
      <h2 className="ns-h2">{t.servicesTitle}</h2>
      <div className="ns-writers-grid-4">
        {t.services.map(([title,body])=><article className="ns-writers-mode-card" key={title}><h3>{title}</h3><p>{body}</p></article>)}
      </div>
    </section>
    <section className="ns-writers-section">
      <h2 className="ns-h2">{t.processTitle}</h2>
      <div className="ns-writers-grid-4">
        {t.steps.map(([title,body],i)=><article className="ns-writers-mode-card" key={title}><div className="ns-writers-kicker">{String(i+1).padStart(2,"0")}</div><h3>{title}</h3><p>{body}</p></article>)}
      </div>
    </section>
    <section className="ns-writers-section ns-writers-two-col">
      <article className="ns-writers-panel"><h2>{t.rightsTitle}</h2><p>{t.rights}</p></article>
      <article className="ns-writers-panel is-warm"><h2>{t.firstReadsTitle}</h2><p>{t.firstReads}</p><Link className="ns-btn ns-btn-ghost" href={t.firstReadsHref}>{t.firstReadsLink}</Link></article>
    </section>
    <section className="ns-writers-section ns-writers-panel">
      <h2>{t.contactTitle}</h2><p>{t.contact}</p>
      <Link className="ns-btn ns-btn-primary" href={t.contactHref}>{t.cta}</Link>
    </section>
  </main>;
}
