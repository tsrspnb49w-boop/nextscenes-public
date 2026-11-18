import Link from "next/link";
import styles from "./HelpOnDemand.module.css";

type Language = "en" | "fr";
type Question = { question: string; answer: string };
type Topic = { title: string; questions: Question[] };
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
      { title: "First Reads", questions: [
        { question: "Who can join First Reads?", answer: "Authors with completed manuscripts. A NextScenes writer account is required. First Reads is a separate Project Hub pathway for Solo work, without voting or scene proposals." },
        { question: "Do I have to upload the entire book?", answer: "No, not for the initial pilot. The author provides the complete first chapter and chosen recent reading parts. No unpublished pages may become public without approval." },
        { question: "What will readers see?", answer: "The full first chapter, a transition page, and up to five recent author-approved scenes. NextScenes can assist with a suitable book cover and Royal Edition background." },
        { question: "Will I receive payment or give up copyright?", answer: "No. First Reads serialization is voluntary and unpaid. The manuscript remains the author's intellectual property. The specific permission to display text and artwork must be agreed before release." },
        { question: "When does serialization end?", answer: "The author reviews the commercial publishing plan around the manuscript's midpoint. The proposed release ceiling is approximately two-thirds of the complete work, counting all material already released. Publication may stop earlier." },
        { question: "Can I later publish on Amazon KDP?", answer: "Yes, subject to the chosen publishing terms. Before enrolling in an exclusivity programme such as KDP Select, the author and NextScenes must review and if necessary withdraw public digital excerpts." },
        { question: "Is First Reads accepting manuscripts now?", answer: "Not yet. The staging pilot tests the author journey and privacy safeguards. A manuscript cannot be submitted or published through the current pilot." },
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
      { title: "First Reads", questions: [
        { question: "Qui peut participer à First Reads ?", answer: "Les auteurs de manuscrits achevés, avec un compte auteur NextScenes. C'est un parcours distinct dans le Centre de projets, sans vote ni propositions de scènes." },
        { question: "Dois-je téléverser tout mon manuscrit ?", answer: "Non, pas pour le pilote initial. L’auteur fournit le premier chapitre complet et les extraits récents choisis. Aucune partie non autorisée ne sera diffusée." },
        { question: "Que verront les lecteurs ?", answer: "Le premier chapitre entier, une page de transition et jusqu’à cinq scènes récentes approuvées. NextScenes peut aider à préparer la couverture et l’ambiance visuelle du Royal Edition." },
        { question: "First Reads est-il rémunéré ?", answer: "Non. La sérialisation est volontaire et non rémunérée. L’auteur conserve ses droits sur le manuscrit. L’autorisation précise concernant les textes et images doit être acceptée avant diffusion." },
        { question: "Quand la sérialisation s’arrête-t-elle ?", answer: "La stratégie de publication est réexaminée vers la moitié du manuscrit. Le plafond envisagé est d'environ deux tiers de l’œuvre complète, en comptant les contenus déjà publiés. L’auteur peut s’arrêter avant." },
        { question: "Puis-je ensuite publier sur Amazon KDP ?", answer: "Oui, sous réserve des conditions de publication choisies. Avant une inscription à KDP Select, les extraits numériques publics devront être examinés et retirés si nécessaire." },
        { question: "Les soumissions sont-elles ouvertes ?", answer: "Pas encore. Le pilote en staging vérifie le parcours des auteurs et la confidentialité ; aucun dépôt ou publication n'est activé." },
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
        {t.topics.map(topic => <details className={styles.topic} key={topic.title}
          id={topic.title === "First Reads" ? "first-reads" : undefined}
          open={topic.title === "First Reads" ? true : undefined}>
          <summary>{topic.title}</summary>
          <div className={styles.questions}>
            {topic.questions.map(item => <div className={styles.answer} key={item.question}>
              <h2>{item.question}</h2><p>{item.answer}</p>
            </div>)}
          </div>
        </details>)}
      </div>
    </div>
  </div>;
}
