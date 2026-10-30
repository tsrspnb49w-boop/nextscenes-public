import Image from "next/image";
import Link from "next/link";
import { FEATURED_STORIES, FEATURED_STORIES_FR, type FeaturedStory } from "@/app/lib/featuredStories";
import PublicCommunityThreadsV1 from "./PublicCommunityThreadsV1";
import DevelopingStoriesV1 from "./DevelopingStoriesV1";
import styles from "./PublicHomepageV2.module.css";

type Language = "en" | "fr";
type Mystery = {
  ref: string;
  title: string;
  teaser: string;
  imageSrc: string;
  imageAlt: string;
  cta: string;
};
type Reading = {
  label: string;
  title: string;
  author: string;
  description: string;
  href?: string;
  cover?: string;
  imageAlt?: string;
  cta?: string;
};

type Props = {
  language: Language;
  stories: FeaturedStory[];
  mystery: Mystery;
  mysteryHref: string;
  reading: Reading;
  storiesHref: string;
};

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://app.nextscenes.org";
const copy = {
  en: {
    eyebrow: "READ · WRITE · DISCOVER",
    headline: "Read a story. Create your own.",
    lede: "Discover books, follow stories as they grow, or begin something entirely your own.",
    read: "Explore stories",
    write: "Start writing",
    confidence: "Free core participation · No tour required · Explore at your own pace",
    covers: "Stories in progress & published books",
    communityEyebrow: "COMMUNITY CONVERSATIONS",
    communityTitle: "Stories come alive in conversation.",
    communityLead: "Read real public comments, expand the replies and follow the conversation into the story. Private drafts and Beta Feedback never appear here.",
    joinCommunity: "Explore public storylines",
    discuss: "Open public story",
    motionEyebrow: "STORIES IN MOTION",
    motionTitle: "Follow stories as they grow.",
    motionLead: "Works currently being created on NextScenes. Covers appear only when approved and publicly available.",
    spotlightEyebrow: "HOME SPOTLIGHT",
    spotlightTitle: "Words and writers worth remembering.",
    authorMonth: "Writer Spotlight",
    bookMonth: "Book Spotlight",
    wordsTitle: "Daily Words",
    helpCta: "New here? Get help when you need it",
    booksEyebrow: "OPEN A STORY",
    booksTitle: "Discover something worth reading.",
    browse: "Browse all stories",
    published: "Published",
    inDevelopment: "In development",
    publicationLink: "View publication",
    openStory: "Open story",
    didieEyebrow: "FEATURED NOVEL · HISTORICAL FICTION",
    didieTitle: "The Story of Didie",
    didieLead: "Love beyond custom. A truth buried in silence. A destiny that still demands an answer.",
    didieEdition: "Published in English · Available on Amazon",
    didieCta: "Discover Didie",
    journeyKicker: "FOR WRITERS · MORE THAN A MANUSCRIPT",
    journeyTitle: "From your first words to a professionally formatted book.",
    journeyLine: "Write. Edit. Organise. Format. Prepare to publish.",
    journeyParagraph: "NextScenes brings the book-creation journey together in one workspace. Develop your story, refine your writing, organise your chapters, and transform your manuscript into a professionally formatted book interior designed for publication.",
    journeyClosing: "More than a writing platform. A place to bring your book to life.",
    stepsTitle: "YOUR BOOK · ONE CONNECTED WORKSPACE",
    steps: ["Write your story", "Edit and refine", "Organise chapters", "Format the book interior", "Prepare for publication"],
    stepsFoot: "A real book interior—not just a stack of draft pages.",
    curiosity: "A LITTLE CURIOSITY",
    curiosityTitle: "A reason to come back.",
    mysteryTitle: "FEATURED MYSTERY · MYSTERY250",
    tryMystery: "Try a mystery",
    readingTitle: "READING SPOTLIGHT",
    discoverReading: "Discover this book",
    discovery: "Explore more books",
    welcome: "Ready to explore? You're welcome already.",
    welcomeText: "You can enter the app directly. Guides are here only if you want them.",
    welcomeCTA: "Enter the Application",
    guideTitle: "Show the 20-second guide",
    guideText: "Discover stories in Reader View. Create a project in Project Hub. Write and organise scenes in Writer Studio. Learn more whenever you wish.",
  },
  fr: {
    eyebrow: "LIRE · ÉCRIRE · DÉCOUVRIR",
    headline: "Lisez une histoire. Créez la vôtre.",
    lede: "Découvrez des livres, suivez des récits qui prennent forme ou commencez votre propre aventure.",
    read: "Explorer les histoires",
    write: "Commencer à écrire",
    confidence: "Participation de base gratuite · Aucun parcours imposé · Explorez à votre rythme",
    covers: "Récits en cours et livres publiés",
    communityEyebrow: "DISCUSSIONS DE LA COMMUNAUTÉ",
    communityTitle: "Les histoires vivent dans les échanges.",
    communityLead: "Lisez les échanges publics, ouvrez les réponses et poursuivez la conversation dans le récit. Les brouillons privés et retours bêta restent protégés.",
    joinCommunity: "Explorer les histoires publiques",
    discuss: "Ouvrir ce récit public",
    motionEyebrow: "RÉCITS EN MOUVEMENT",
    motionTitle: "Suivez les récits en évolution.",
    motionLead: "Des œuvres en cours de création sur NextScenes. Seules les couvertures approuvées et publiques sont affichées.",
    spotlightEyebrow: "À LA UNE",
    spotlightTitle: "Des mots et des auteurs à redécouvrir.",
    authorMonth: "Portrait d'auteur",
    bookMonth: "Un livre à découvrir",
    wordsTitle: "Pensée du jour",
    helpCta: "Besoin d'aide ? Consultez nos guides",
    booksEyebrow: "OUVRIR UNE HISTOIRE",
    booksTitle: "Découvrez des histoires qui valent la lecture.",
    browse: "Explorer toutes les histoires",
    published: "Publié",
    inDevelopment: "En développement",
    publicationLink: "Voir la publication",
    openStory: "Ouvrir l’histoire",
    didieEyebrow: "ROMAN À LA UNE · FICTION HISTORIQUE",
    didieTitle: "The Story of Didie",
    didieLead: "Un amour au-delà des coutumes. Une vérité enfouie dans le silence. Un destin qui réclame encore une réponse.",
    didieEdition: "Roman disponible en anglais uniquement",
    didieCta: "Découvrir Didie",
    journeyKicker: "POUR LES AUTEURS · BIEN PLUS QU’UN MANUSCRIT",
    journeyTitle: "De vos premiers mots à un livre mis en page professionnellement.",
    journeyLine: "Écrivez. Révisez. Organisez. Mettez en page. Préparez la publication.",
    journeyParagraph: "NextScenes réunit les étapes de création d’un livre dans un même espace. Développez votre histoire, affinez votre texte, organisez vos chapitres et transformez votre manuscrit en un intérieur de livre mis en page professionnellement, conçu pour la publication.",
    journeyClosing: "Plus qu’une plateforme d’écriture. Un espace pour donner vie à votre livre.",
    stepsTitle: "VOTRE LIVRE · UN ESPACE UNIQUE",
    steps: ["Écrire votre histoire", "Réviser et affiner", "Organiser les chapitres", "Mettre en page l’intérieur du livre", "Préparer la publication"],
    stepsFoot: "Un véritable intérieur de livre, pas simplement des pages de brouillon.",
    curiosity: "UN PEU DE CURIOSITÉ",
    curiosityTitle: "Une raison de revenir.",
    mysteryTitle: "ÉNIGME À LA UNE · MYSTERY250",
    tryMystery: "Résoudre une énigme",
    readingTitle: "À LIRE",
    discoverReading: "Découvrir ce livre",
    discovery: "Découvrir d’autres livres",
    welcome: "Prêt à découvrir ? Vous êtes déjà le bienvenu.",
    welcomeText: "Entrez directement dans l’application. Les guides sont facultatifs.",
    welcomeCTA: "Accéder à l’application",
    guideTitle: "Afficher le guide en 20 secondes",
    guideText: "Découvrez les récits en mode lecture. Créez un projet dans le Centre de projets. Écrivez et organisez vos scènes dans Writer Studio. Des explications restent disponibles à tout moment.",
  },
} as const;

function isPublished(story: FeaturedStory) {
  const status = String(story.publicationStatus || "").toLowerCase().replace(/[\s_-]/g, "");
  const label = String(story.publicationLabel || "").toLowerCase();
  return status === "publishedamazon" || status === "publishedelsewhere" ||
    label === "published" || label.includes("published on amazon");
}

function selectFeatured(stories: FeaturedStory[], language: Language): FeaturedStory[] {
  const available = (Array.isArray(stories) ? stories : []).filter(s => Boolean(s?.title && s?.cover && s?.href));
  const fallback = language === "fr" ? FEATURED_STORIES_FR : FEATURED_STORIES;
  const find = (pattern: RegExp) => available.find(s => pattern.test(s.title)) || fallback.find(s => pattern.test(s.title));
  const ugo = find(/ugo.*magic.*seed/i);
  const reflections = find(/reflections.*wayfarer|réflexions.*voyageur/i);
  const ugoCard: FeaturedStory = ugo || {
    id: "ugo-magic-seed-public-entry",
    title: "Ugo and the Magic Seed",
    author: "Trone",
    hook: language === "fr" ? "Une jeune fille découvre une graine mystérieuse." : "A magical seed, a young girl and a lesson in kindness.",
    cta: "Open story", href: appUrl + "/reader-view?storyId=6a2984a9e2727b95968cf87c",
    cover: "https://grkvsllcpotylcvbecuj.supabase.co/storage/v1/object/public/story-covers/69623c5a3f3a3c7b988420a6/2026-06-10T15-34-56-054Z-2f9be5e7-81ec-43a1-bb0a-38067a553e9b-site-cover.png",
    badge: "In development", badgeTone: "featured", publicationStatus: "notPublished",
  };
  const shadows: FeaturedStory = {
    id: "shadows-harbour-v1c-review",
    title: "Shadows of the Harbour",
    author: "Ugochukwu Ezeji",
    hook: language === "fr" ? "Une enquête sur un réseau de stupéfiants." : "A drugs bust investigation.",
    cta: "Find story", href: appUrl + "/storylines",
    cover: "/images/covers/v1c-approved/shadows-of-the-harbour.webp",
    badge: "On NextScenes", badgeTone: "featured", publicationStatus: "notPublished",
  };
  const reflectionsCard: FeaturedStory = {
    ...(reflections || {
      id: "reflections-wayfarer-public", title: "Reflections of the Wayfarer",
      author: "Goddy Oguzie", hook: "Reflections on choices, character and the lessons life teaches.",
      cta: "Open story", href: appUrl + "/storylines",
      cover: "/images/covers/featured-flat/reflections-wayfarer.webp",
      badge: "Published", badgeTone: "published-amazon",
    }),
    publicationStatus: "publishedAmazon",
    publicationUrl: undefined,
  };
  const didie: FeaturedStory = {
    id: "the-story-of-didie-published",
    title: "The Story of Didie",
    author: "Goddy Oguzie",
    hook: language === "fr" ? "Amour, tradition et justice au Nigeria du début du XXe siècle." : "Love, tradition and justice across generations in early twentieth-century Nigeria.",
    cta: "Discover Didie",
    href: language === "fr" ? "/fr/books/didie" : "/books/didie",
    cover: "/images/books/didie/approved-front.webp",
    badge: "Published", badgeTone: "published-amazon",
    publicationStatus: "publishedAmazon",
  };
  return [ugoCard, shadows, reflectionsCard, didie];
}


export default function PublicHomepageV2({language, stories, mystery, mysteryHref, reading, storiesHref}: Props) {
  const t = copy[language];
  const featured = selectFeatured(stories, language);
  const heroCovers = [
    { ...featured[0], title: "The Kingdom Beneath the Baobab", cover: "/images/covers/v1c-approved/kingdom-beneath-baobab.webp" },
    { ...featured[1], title: "The Trials of Tarllus", cover: language === "fr" ? "/images/covers/featured-flat/trials-of-tarllus-fr.webp" : "/images/covers/featured-flat/trials-of-tarllus-en.webp" },
    { ...featured[1], title: "Shadows of the Harbour", cover: "/images/covers/v1c-approved/shadows-of-the-harbour.webp" }
  ];
  return (
    <div className={styles.home}>
      <section className={styles.hero} aria-label={t.headline}>
        <div className={`${styles.wrap} ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}>{t.eyebrow}</div>
            <h1>{t.headline}</h1>
            <p className={styles.heroLede}>{t.lede}</p>
            <div className={styles.heroActions}>
              <Link className={`${styles.button} ${styles.gold}`} href={storiesHref}>{t.read} →</Link>
              <a className={`${styles.button} ${styles.outline}`} href={`${appUrl}/?lang=${language}`}>{t.write} →</a>
            </div>
            <p className={styles.confidence}>✓ {t.confidence}</p>
            <Link className={styles.textLink} href={language === "fr" ? "/fr/help" : "/help"}>{t.helpCta} →</Link>
          </div>
          <div className={styles.artStage} aria-label={t.covers}>
            {heroCovers.map((story, i) => (
              <Image key={story.id} src={story.cover} alt={`${story.title} cover`}
                width={300} height={440} unoptimized
                className={`${styles.artCover} ${i===0 ? styles.leftCover : i===1 ? styles.middleCover : styles.rightCover}`} />
            ))}
            <span className={styles.visualLabel}>{t.covers}</span>
          </div>
        </div>
      </section>

      <section className={styles.booksSection} id="books" aria-label={t.booksTitle}>
        <div className={styles.wrap}>
          <div className={styles.sectionHeading}>
            <div><div className={styles.eyebrow}>{t.booksEyebrow}</div><h2>{t.booksTitle}</h2></div>
            <Link className={styles.textLink} href={storiesHref}>{t.browse} →</Link>
          </div>
          <div className={styles.bookGrid}>
            {featured.map(story => {
              const published = isPublished(story);
              const link = published && story.publicationUrl ? story.publicationUrl : story.href;
              return (
                <article key={story.id} className={styles.bookCard}>
                  <Link href={story.href} className={styles.bookImageLink} aria-label={`${t.openStory}: ${story.title}`}>
                    <Image src={story.cover} alt={`${story.title} cover`} width={180} height={250} unoptimized className={styles.bookCover} />
                  </Link>
                  <h3>{story.title}</h3>
                  <p className={styles.bookDescription}>{story.hook}</p>
                  <div className={styles.bookBottom}>
                    <span className={`${styles.pill} ${published ? styles.pillPublished : ""}`}>{published ? t.published : t.inDevelopment}</span>
                    {published && story.publicationUrl ? (
                      <a className={styles.textLink} href={link} target="_blank" rel="noopener noreferrer">{t.publicationLink} →</a>
                    ) : (
                      <Link className={styles.textLink} href={link}>{t.openStory} →</Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
          <aside className={styles.didieFeature} aria-label={t.didieEyebrow}>
            <Link href={language === "fr" ? "/fr/books/didie" : "/books/didie"} className={styles.didieArt} aria-label={t.didieCta}>
              <Image src="/images/books/didie/approved-front.webp" alt="The Story of Didie book cover" width={112} height={168} unoptimized className={styles.didieCover} />
            </Link>
            <div className={styles.didieDetails}>
              <div className={styles.eyebrow}>{t.didieEyebrow}</div>
              <h3>{t.didieTitle}</h3>
              <p>{t.didieLead}</p>
              <span className={styles.didieEdition}>{t.didieEdition}</span>
            </div>
            <Link className={`${styles.button} ${styles.didieAction}`} href={language === "fr" ? "/fr/books/didie" : "/books/didie"}>
              {t.didieCta} →
            </Link>
          </aside>
        </div>
      </section>

      <section className={styles.community} id="community" aria-label={t.communityTitle}>
        <div className={styles.wrap}>
          <div className={styles.eyebrow}>{t.communityEyebrow}</div>
          <h2>{t.communityTitle}</h2>
          <p className={styles.communityLead}>{t.communityLead}</p>
          <PublicCommunityThreadsV1 language={language} appUrl={appUrl} />
          <Link className={styles.textLink} href={storiesHref}>{t.joinCommunity} →</Link>
        </div>
      </section>

      <section className={styles.motion} id="stories-in-motion" aria-label={t.motionTitle}>
        <div className={styles.wrap}>
          <div className={styles.eyebrow}>{t.motionEyebrow}</div>
          <h2>{t.motionTitle}</h2>
          <p>{t.motionLead}</p>
          <DevelopingStoriesV1 language={language} appUrl={appUrl} />
        </div>
      </section>

      <section className={styles.spotlight} id="spotlight">
        <div className={styles.wrap}>
          <div className={styles.eyebrow}>{t.spotlightEyebrow}</div>
          <h2>{t.spotlightTitle}</h2>
          <div className={styles.spotlightGrid}>
            <article className={styles.spotlightCard}>
              <div className={styles.eyebrow}>{t.authorMonth}</div>
              <h3>Mariama Bâ</h3>
              <p>{language === "fr" ? "Une voix sénégalaise qui explore la dignité, la famille et la place des femmes." : "A Senegalese writer whose work examines dignity, family and women's lives."}</p>
            </article>
            <article className={styles.spotlightCard}>
              <div className={styles.eyebrow}>{t.bookMonth}</div>
              <h3>{language === "fr" ? "Une si longue lettre" : "So Long a Letter"}</h3>
              <p>{language === "fr" ? "Un roman épistolaire sur l'amitié, le mariage et le choix." : "A novel told through a letter about friendship, marriage and choice."}</p>
            </article>
            <article className={styles.spotlightCard}>
              <div className={styles.eyebrow}>{t.wordsTitle}</div>
              <h3>{language === "fr" ? "Pensée à méditer" : "A thought worth keeping"}</h3>
              <p>{language === "fr" ? "La dignité se protège par la vérité, le courage et la justice." : "Dignity is protected through truth, courage and justice."}</p>
              <small>NextScenes</small>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.journey} id="for-writers" aria-label={t.journeyTitle}>
        <div className={`${styles.wrap} ${styles.journeyGrid}`}>
          <div className={styles.journeyCopy}>
            <div className={styles.eyebrow}>{t.journeyKicker}</div>
            <h2>{t.journeyTitle}</h2>
            <p className={styles.journeyLine}>{t.journeyLine}</p>
            <p>{t.journeyParagraph}</p>
            <strong>{t.journeyClosing}</strong>
          </div>
          <div className={styles.stepsCard}>
            <div className={styles.eyebrow}>{t.stepsTitle}</div>
            <ol>{t.steps.map((step,i) => <li key={step}><span>{String(i+1).padStart(2,"0")}</span><strong>{step}</strong></li>)}</ol>
            <p>{t.stepsFoot}</p>
          </div>
        </div>
      </section>

      <section className={styles.curiosity} id="discover" aria-label={t.curiosityTitle}>
        <div className={styles.wrap}>
          <div className={styles.eyebrow}>{t.curiosity}</div><h2>{t.curiosityTitle}</h2>
          <div className={styles.spotGrid}>
            <article className={`${styles.spot} ${styles.spotMystery}`}>
              <div className={styles.spotCopy}>
                <div className={styles.eyebrow}>{t.mysteryTitle}</div>
                <h3>{mystery.title}</h3>
                <p>{mystery.teaser}</p>
                <Link href={mysteryHref}>{t.tryMystery} →</Link>
              </div>
              <div className={styles.spotImage}>
                <Image src={mystery.imageSrc} alt={mystery.imageAlt || mystery.title} width={410} height={320} unoptimized />
              </div>
            </article>
            <article className={`${styles.spot} ${styles.spotReading}`}>
              <div className={styles.spotCopy}>
                <div className={styles.eyebrow}>{t.readingTitle}</div>
                <h3>{reading.title}</h3>
                <p>{reading.author} · {reading.description}</p>
                {reading.href ? <Link href={reading.href}>{reading.cta || t.discoverReading} →</Link> : <Link href={storiesHref}>{t.discovery} →</Link>}
              </div>
              <div className={styles.readingImage}>
                {reading.cover ? <Image src={reading.cover} alt={reading.imageAlt || reading.title} width={180} height={255} unoptimized /> : <span>{language === "fr" ? "Un livre à partager" : "A book worth sharing"}</span>}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.entry} id="start">
        <div className={styles.wrap}>
          <div className={styles.entryPanel}>
            <div>
              <h2>{t.welcome}</h2><p>{t.welcomeText}</p>
              <details><summary>{t.guideTitle}</summary><p>{t.guideText}</p></details>
            </div>
            <a className={`${styles.button} ${styles.green}`} href={appUrl}>{t.welcomeCTA} →</a>
          </div>
        </div>
      </section>
    </div>
  );
}
