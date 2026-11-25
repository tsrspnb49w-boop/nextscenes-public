import Link from "next/link";
import styles from "./HelpOnDemand.module.css";

type Language = "en" | "fr";
type Question = { question: string; answer: string };
type Topic = { title: string; id?: string; questions: Question[] };
type Guide = { eyebrow: string; title: string; lead: string; app: string; privacy: string; topics: Topic[] };
const APP_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://app.nextscenes.org").replace(/\/+$/, "");
const guides: Record<Language, Guide> = {
  en: {
    eyebrow: "NEXTSCENES HELP", title: "Help, when you need it.",
    lead: "Find an answer and return to your story.", app: "Open NextScenes", privacy: "Privacy & policies",
    topics: [
      { title: "Getting Started", questions: [
        { question: "What happened to the application's old Home page?", answer: "The public website is now the common welcome page. Existing writers use Project Hub to continue books. Public Storylines remain open for reading." },
        { question: "Where are Writer of the Month, Book of the Month and Daily Words?", answer: "These editorial highlights now belong on the public homepage, alongside featured books and active stories. Quick Start instructions remain in Help." },
        { question: "How do I begin?", answer: "Open the public website. Choose Explore Stories to read, or Enter the App to reach Project Hub after signing in. From Project Hub choose Novel, Children's Book, Textbook or Screenplay as permitted." },
        { question: "Do I need to learn everything first?", answer: "No. Start a project, write a scene, then use the existing chapter and book review tools as needed. A guided introduction is optional." },
        { question: "What can I do?", answer: "Read stories, create your own book, discuss stories and collaborate on eligible projects." },
        { question: "Where do I start writing?", answer: "Open the application, then Project Hub. Choose your book type and continue in Book Workspace or Writer Studio." },
      ]},
      { title: "Accounts & Access", questions: [
        { question: "Do I need an invitation code?", answer: "No invitation code is needed for ordinary registration. Private group or project invitations use their existing invitation links." },
        { question: "How do I sign in?", answer: "Use the supported Google, Facebook or Apple options, or your email and password. Do not share your password." },
        { question: "What are Writer, Reader and Moderator roles?", answer: "Readers discover and follow stories. Writers create and manage books. Moderator is a specialised role subject to the existing rules and permissions." },
        { question: "What happens to optional email updates?", answer: "Newsletter updates are a separate, optional choice. They are not required to register." },
      ]},
      { title: "Writing & Publishing", questions: [
        { question: "What is Project Hub?", answer: "Your home for existing projects and new books." },
        { question: "Where are chapters and book pages?", answer: "Book Workspace holds Book Setup, chapters, Front Matter, Back Matter, and review. Writer Studio supports drafting and editing." },
        { question: "Can I publish immediately?", answer: "Book preparation and publication approval are separate stages. Approval is controlled and may be unavailable while features are under review." },
      ]},
      { title: "Publishing Services", id: "publishing-services", questions: [
        { question: "How do I begin?", answer: "Send a brief enquiry with your name, email and what you need. A book title, genre and manuscript status are helpful if known. You do not need to complete a long questionnaire or send your manuscript initially." },
        { question: "Can I ask for help if this is my first book?", answer: "Yes. We welcome first-time authors. We will guide you through the information needed at each stage. If you cannot legally contract independently, the appropriate parent or guardian arrangements must be confirmed before any agreement." },
        { question: "What happens after my enquiry?", answer: "We discuss your needs, arrange private manuscript submission if appropriate, assess the work and prepare a proposal describing the services, deliverables, fees and estimated timing. Essential terms are presented directly before any binding commitment." },
        { question: "What does NextScenes do?", answer: "We help authors prepare and publish their own books through suitable third-party platforms, including Amazon. We do not acquire publishing rights through this service. Platform acceptance, sales and release timing are not guaranteed." },
        { question: "What about copyright and permissions?", answer: "Your work remains yours. Tell us about previous publication, co-authors, third-party material or existing rights restrictions when requested. We will help clarify outstanding permissions. An enquiry does not transfer rights or authorize publication." },
        { question: "When will my book be published?", answer: "Only after the necessary rights and agreement checks and your explicit approval of the final edition and authorized action. First Reads is a separate optional pathway with its own approval requirements." },
        { question: "How much does it cost?", answer: "We agree any applicable costs, payment arrangements and delivery terms for your project before work begins. An initial enquiry does not commit you to paid work. Do not send confidential rights records, manuscripts or financial details with your first message." },
      ]},
      { title: "Collaboration", questions: [
        { question: "How does collaboration work?", answer: "Eligible project owners invite contributors, review proposals and decide what becomes part of the official story." },
        { question: "How do I join a private group?", answer: "Follow the invitation link from the owner. Ordinary registration does not require a code." },
      ]},
      { title: "Community & Support", questions: [
        { question: "Where can I discuss stories?", answer: "Open Community Discussions in the application. Public discussions can be read by guests; signed-in members can participate under the community rules." },
        { question: "Is it instant live chat?", answer: "Not yet. The existing discussion feed refreshes roughly every 15 seconds, so replies are near-real-time." },
        { question: "Where do I report a problem?", answer: "Use the existing Beta Feedback or Help & Support channels for product issues rather than story discussion threads." },
      ]},
    ],
  },
  fr: {
    eyebrow: "AIDE NEXTSCENES", title: "De l’aide, à votre demande.",
    lead: "Trouvez une réponse et reprenez votre histoire.", app: "Ouvrir NextScenes", privacy: "Confidentialité et politiques",
    topics: [
      { title: "Bien commencer", questions: [
        { question: "Où est passée l'ancienne page d'accueil de l'application ?", answer: "Le site public est le point d'entrée commun. Les auteurs retrouvent leurs livres dans le Centre de projets ; les histoires publiques restent consultables." },
        { question: "Où trouver les portraits, livres et mots du jour ?", answer: "Ces rubriques éditoriales se trouvent sur l'accueil public, avec les livres et les histoires à découvrir. Les étapes détaillées restent dans l'aide." },
        { question: "Comment commencer ?", answer: "Depuis le site public, explorez les histoires ou entrez dans l'application. Après connexion, choisissez dans le Centre de projets le type de livre autorisé." },
        { question: "Faut-il tout comprendre avant d'écrire ?", answer: "Non. Commencez un projet et une scène. Les outils de chapitre et de révision restent accessibles ensuite. L'initiation guidée est facultative." },
        { question: "Que puis-je faire ?", answer: "Lire, créer un livre, discuter des histoires et collaborer à des projets admissibles." },
        { question: "Où commencer à écrire ?", answer: "Entrez dans l’application et ouvrez le Centre de projets. Choisissez un type de livre, puis accédez à l’Espace Livre ou à Writer Studio." },
      ]},
      { title: "Comptes et accès", questions: [
        { question: "Faut-il un code d’invitation ?", answer: "Non, l’inscription ordinaire ne demande aucun code. Les invitations privées à un projet ou à un groupe passent par leurs liens existants." },
        { question: "Comment se connecter ?", answer: "Utilisez les options Google, Facebook ou Apple prises en charge, ou votre adresse e-mail et votre mot de passe. Ne partagez jamais votre mot de passe." },
        { question: "Quels sont les rôles Lecteur, Auteur et Moderator ?", answer: "Les lecteurs découvrent les histoires. Les auteurs créent et gèrent des livres. Moderator est un rôle spécialisé soumis aux autorisations existantes." },
        { question: "Les actualités par e-mail sont-elles obligatoires ?", answer: "Non. L’abonnement à la newsletter est facultatif et distinct de l’inscription." },
      ]},
      { title: "Écriture et publication", questions: [
        { question: "À quoi sert le Centre de projets ?", answer: "À retrouver vos projets et à commencer un nouveau livre." },
        { question: "Où sont les chapitres et les pages ?", answer: "L’Espace Livre contient la préparation, les chapitres, les pages liminaires et finales ainsi que la relecture. Writer Studio sert à rédiger et modifier." },
        { question: "Puis-je publier immédiatement ?", answer: "La préparation et la validation finale sont distinctes. L’approbation peut être indisponible pendant les vérifications." },
      ]},
      { title: "Services d’édition", id: "publishing-services", questions: [
        { question: "Comment commencer ?", answer: "Envoyez une courte demande avec votre nom, votre adresse e-mail et vos besoins. Le titre, le genre et l’état du manuscrit sont utiles si vous les connaissez. Aucun long questionnaire ni envoi de manuscrit n’est nécessaire au départ." },
        { question: "Puis-je demander de l’aide pour mon premier livre ?", answer: "Oui. Les auteurs débutants sont les bienvenus. Nous vous guiderons à chaque étape. Si vous ne pouvez pas contracter seul légalement, les dispositions appropriées avec un parent ou un représentant légal devront être confirmées avant tout accord." },
        { question: "Que se passe-t-il après ma demande ?", answer: "Nous discutons de vos besoins, organisons un envoi privé du manuscrit si nécessaire, évaluons le travail et préparons une proposition précisant les prestations, les livrables, les coûts et les délais estimatifs. Les conditions essentielles vous sont présentées directement avant tout engagement contractuel." },
        { question: "Quel est le rôle de NextScenes ?", answer: "Nous aidons les auteurs à préparer et à publier leurs propres livres sur des plateformes tierces adaptées, notamment Amazon. Ce service n’acquiert aucun droit d’édition. L’acceptation par les plateformes, les ventes et la date de diffusion ne sont pas garanties." },
        { question: "Qu’en est-il des droits d’auteur et des autorisations ?", answer: "Votre œuvre reste la vôtre. Signalez les publications antérieures, les coauteurs, les éléments de tiers et les restrictions de droits lorsque cela vous est demandé. Nous vous aiderons à clarifier les autorisations manquantes. Une demande ne cède aucun droit et n’autorise aucune publication." },
        { question: "Quand mon livre sera-t-il publié ?", answer: "Après les vérifications des droits et de l’accord nécessaires, et votre autorisation expresse de l’édition définitive et de l’action prévue. Premières lectures est un parcours distinct et facultatif, soumis à ses propres autorisations." },
        { question: "Combien cela coûte-t-il ?", answer: "Les éventuels coûts, modalités de paiement et délais sont convenus avant le début des prestations. Une première demande ne vous engage pas à payer. N’envoyez ni manuscrit, ni documents confidentiels relatifs aux droits, ni informations financières dans votre premier message." },
      ]},
      { title: "Collaboration", questions: [
        { question: "Comment collaborer ?", answer: "Les propriétaires de projets admissibles invitent des contributeurs, examinent les propositions et décident du contenu officiel." },
        { question: "Comment rejoindre un groupe privé ?", answer: "Suivez le lien d’invitation transmis par le propriétaire. L’inscription ordinaire ne nécessite aucun code." },
      ]},
      { title: "Communauté et assistance", questions: [
        { question: "Où discuter des histoires ?", answer: "Ouvrez Discussions de la communauté dans l’application. Les visiteurs peuvent lire les échanges publics ; les membres connectés peuvent participer selon les règles." },
        { question: "Est-ce un chat instantané ?", answer: "Pas encore. Le fil de discussion actuel s’actualise environ toutes les 15 secondes." },
        { question: "Où signaler un problème ?", answer: "Utilisez les canaux existants de retours bêta ou d’assistance pour les problèmes techniques." },
      ]},
    ],
  },
};


const installCopy = {
  en: {
    eyebrow: "NEXTSCENES ON YOUR PHONE",
    title: "Install NextScenes in a few taps",
    lead: "Put NextScenes on your Home Screen for convenient reading and writing. No app store is needed.",
    open: "Open NextScenes to install",
    iphone: "iPhone or iPad",
    android: "Android phone",
    iosSteps: [
      "Open app.nextscenes.org in Safari.",
      "Tap Share (or Page Menu, then Share) and choose Add to Home Screen.",
      "Keep Open as Web App enabled, then tap Add."
    ],
    androidSteps: [
      "Open app.nextscenes.org in Chrome.",
      "Tap the three-dot menu (⋮), then Install app or Add to Home screen.",
      "Confirm Install or Add. Open NextScenes from your phone."
    ],
    note: "Important: use the application address, not the public website. Installing a staging or test address creates a separate test app.",
  },
  fr: {
    eyebrow: "NEXTSCENES SUR VOTRE TÉLÉPHONE",
    title: "Installez NextScenes en quelques gestes",
    lead: "Retrouvez NextScenes sur votre écran d’accueil pour lire et écrire facilement. Aucun magasin d’applications n’est nécessaire.",
    open: "Ouvrir NextScenes pour l’installer",
    iphone: "iPhone ou iPad",
    android: "Téléphone Android",
    iosSteps: [
      "Ouvrez app.nextscenes.org dans Safari.",
      "Touchez Partager (ou Menu de la page, puis Partager), puis Sur l’écran d’accueil.",
      "Laissez Ouvrir comme app activé, puis touchez Ajouter."
    ],
    androidSteps: [
      "Ouvrez app.nextscenes.org dans Chrome.",
      "Touchez le menu à trois points (⋮), puis Installer l’application ou Ajouter à l’écran d’accueil.",
      "Confirmez Installer ou Ajouter. Ouvrez NextScenes depuis votre téléphone."
    ],
    note: "Important : utilisez l’adresse de l’application et non le site public. Une installation depuis une adresse de test crée une application de test distincte.",
  },
} as const;

export default function HelpOnDemand({language}: {language: Language}) {
  const t = guides[language];
  const install = installCopy[language];
  return <div className={styles.page}>
    <div className={styles.wrap}>
      <p className={styles.eyebrow}>{t.eyebrow}</p>
      <h1>{t.title}</h1>
      <p className={styles.lead}>{t.lead}</p>
      <div className={styles.links}>
        <a href={APP_URL} className={styles.primary}>{t.app} →</a>
        <Link href={language === "fr" ? "/fr/privacy" : "/privacy"}>{t.privacy} →</Link>
      </div>
      <section id="install" className={styles.install} aria-labelledby="ns-install-title">
        <p className={styles.eyebrow}>{install.eyebrow}</p>
        <h2 id="ns-install-title">{install.title}</h2>
        <p>{install.lead}</p>
        <div className={styles.installCards}>
          <article>
            <h3>{install.iphone}</h3>
            <ol>{install.iosSteps.map((step, i) => <li key={i}>{step}</li>)}</ol>
          </article>
          <article>
            <h3>{install.android}</h3>
            <ol>{install.androidSteps.map((step, i) => <li key={i}>{step}</li>)}</ol>
          </article>
        </div>
        <a className={styles.installButton} href={APP_URL + "/?install=1&lang=" + language}>{install.open} →</a>
        <p className={styles.installNote}>{install.note}</p>
      </section>
      <div className={styles.topics}>
        {t.topics.map(topic => <details className={styles.topic} key={topic.title}>
          <summary>{topic.title}</summary>
          <div className={styles.questions} id={topic.id}>
            {topic.id === "publishing-services" && <Link href={language === "fr" ? "/fr/contact?topic=publishing#contact-form" : "/contact?topic=publishing#contact-form"}>{language === "fr" ? "Parlez-nous de votre livre" : "Tell us about your book"} →</Link>}
            {topic.questions.map(item => <div className={styles.answer} key={item.question}>
              <h2>{item.question}</h2><p>{item.answer}</p>
            </div>)}
          </div>
        </details>)}
      </div>
    </div>
  </div>;
}
