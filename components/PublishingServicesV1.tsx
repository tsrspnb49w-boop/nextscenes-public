import Link from "next/link";

const content = {
  en: {
    kicker: "NextScenes Publishing Services",
    title: "Your book. Your publishing journey.",
    intro: "Written a book? We can help you prepare it and publish it through Amazon and other suitable platforms. First-time authors are welcome.",
    cta: "Tell us about your book",
    help: "Publishing Services Help",
    servicesTitle: "How we can help",
    services: [
      ["Editing and proofreading", "Make your manuscript ready for readers."],
      ["Cover and book design", "Create a cover and professionally formatted pages."],
      ["Publication assistance", "Prepare files and guide you through your chosen publishing platform."]
    ],
    processTitle: "Three simple steps",
    steps: [
      ["Tell us about your book", "Send a short enquiry."],
      ["Agree on the services", "We discuss your needs, costs and timing."],
      ["Prepare and publish", "Review your book and approve it before submission."]
    ],
    rights: "Your work remains yours. An enquiry is not a commitment.",
    firstReads: "Not ready for commercial publication?",
    firstReadsLink: "Explore First Reads",
    contactHref: "/contact?topic=publishing#contact-form",
    helpHref: "/help#publishing-services",
    firstReadsHref: "/first-reads"
  },
  fr: {
    kicker: "Services d’édition NextScenes",
    title: "Votre livre. Votre parcours de publication.",
    intro: "Vous avez écrit un livre ? Nous vous aidons à le préparer et à le publier sur Amazon et d’autres plateformes adaptées. Les auteurs débutants sont les bienvenus.",
    cta: "Parlez-nous de votre livre",
    help: "Aide à la publication",
    servicesTitle: "Comment nous pouvons vous aider",
    services: [
      ["Révision et correction", "Préparez votre manuscrit pour vos lecteurs."],
      ["Couverture et mise en page", "Créez une couverture et une mise en page professionnelle."],
      ["Accompagnement à la publication", "Préparez vos fichiers et bénéficiez de notre aide sur la plateforme de votre choix."]
    ],
    processTitle: "Trois étapes simples",
    steps: [
      ["Présentez votre livre", "Envoyez-nous une courte demande."],
      ["Convenons des prestations", "Nous discutons de vos besoins, des coûts et des délais."],
      ["Préparez et publiez", "Relisez et approuvez votre livre avant sa soumission."]
    ],
    rights: "Votre œuvre reste la vôtre. Une demande ne vous engage pas.",
    firstReads: "Pas encore prêt pour une publication commerciale ?",
    firstReadsLink: "Découvrir Premières lectures",
    contactHref: "/fr/contact?topic=publishing#contact-form",
    helpHref: "/fr/help#publishing-services",
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
        <Link className="ns-btn ns-btn-ghost" href={t.helpHref}>{t.help}</Link>
      </div>
      <p className="ns-p" style={{marginTop:12}}>{t.rights}</p>
    </section>
    <section className="ns-writers-section">
      <h2 className="ns-h2">{t.servicesTitle}</h2>
      <div className="ns-grid-3">
        {t.services.map(([title,body])=><article className="ns-writers-mode-card" key={title}><h3>{title}</h3><p>{body}</p></article>)}
      </div>
    </section>
    <section className="ns-writers-section">
      <h2 className="ns-h2">{t.processTitle}</h2>
      <div className="ns-grid-3">
        {t.steps.map(([title,body],i)=><article className="ns-writers-mode-card" key={title}><div className="ns-writers-kicker">{String(i+1).padStart(2,"0")}</div><h3>{title}</h3><p>{body}</p></article>)}
      </div>
      <div className="ns-hero-cta" style={{marginTop:18}}>
        <Link className="ns-btn ns-btn-primary" href={t.contactHref}>{t.cta}</Link>
      </div>
    </section>
    <section className="ns-writers-section">
      <p className="ns-p">{t.firstReads} <Link href={t.firstReadsHref}>{t.firstReadsLink}</Link></p>
    </section>
  </main>;
}
