// Build: featured-stories-config-v10
// Purpose: Homepage featured shelf fallback data.
// Note: API-managed homepage items override this file when /api/public-homepage responds successfully.
// Principle: fallback content must still be truthful, polished, and publication-aware.

export type FeaturedStory = {
  id: string;
  title: string;
  author: string;
  hook: string;
  cta: string;
  href: string;
  cover: string;
  badge: string;
  badgeTone:
    | "featured"
    | "new"
    | "now-reading"
    | "live"
    | "published-amazon"
    | "preview";
  developmentStatus?:
    | "inDevelopment"
    | "activeOnNextScenes"
    | "showcaseOnly"
    | "previewOnNextScenes"
    | "completedOnNextScenes"
    | string;
  developmentLabel?: string;
  publicationStatus?:
    | "notPublished"
    | "comingSoon"
    | "publishedAmazon"
    | "publishedElsewhere"
    | string;
  publicationLabel?: string;
  publicationUrl?: string;
  publicationCta?: string;
  progressLabel?: string;
};

export const FEATURED_STORIES: FeaturedStory[] = [
  {
    id: "didie",
    title: "Didie",
    author: "Buri Blessings",
    hook: "A powerful African novel in development, shaped by love, loss, tradition, justice, memory, and the long road back to the truth.",
    cta: "Open story",
    href: "https://app.nextscenes.org/reader-view?storyId=69c8ed091023337bec53061c",
    cover: "/images/covers/didie-cover.jpg",
    badge: "In Development",
    badgeTone: "featured",
    developmentStatus: "inDevelopment",
    developmentLabel: "In Development",
    publicationStatus: "notPublished",
    publicationLabel: "Not Yet Published",
    progressLabel: "In Development",
  },
  {
    id: "jar-lingo-and-evel-broda-en",
    title: "The Tale of King Jar Lingo and Evel Broda",
    author: "Eze Dike",
    hook: "A mythic tale of jealousy, kingship, prophecy, courage, and the struggle between darkness and light.",
    cta: "Open story",
    href: "https://app.nextscenes.org/reader-view?storyId=69fe3f788ce98a5bc35ba16e",
    cover: "/images/covers/king-jar-lingo-evel-broda-cover.jpg",
    badge: "In Development",
    badgeTone: "new",
    developmentStatus: "inDevelopment",
    developmentLabel: "In Development",
    publicationStatus: "notPublished",
    publicationLabel: "Not Yet Published",
    progressLabel: "In Development",
  },
  {
    id: "ugo-and-the-butterfly-woman-en",
    title: "Ugo and the Butterfly Woman",
    author: "Goddy Oguzie",
    hook: "A published children’s book about kindness, courage, respect for elders, and the quiet wisdom that grows inside a child’s heart.",
    cta: "Read preview",
    href: "https://app.nextscenes.org/reader-view?storyId=69fff8dd7e622bb7e06332f6",
    cover: "/images/books/public_site_assets_ugo-and-the-butterfly-woman-cover.png",
    badge: "Published on Amazon",
    badgeTone: "published-amazon",
    developmentStatus: "showcaseOnly",
    developmentLabel: "Preview on NextScenes",
    publicationStatus: "publishedAmazon",
    publicationLabel: "Published on Amazon",
    publicationUrl: "https://www.amazon.com/s?k=ugo+and+the+butterfly+woman+book",
    publicationCta: "View on Amazon",
    progressLabel: "Published on Amazon",
  },
  {
    id: "ugo-and-her-pet-dog-en",
    title: "Ugo and Her Pet Dog",
    author: "Goddy Oguzie",
    hook: "A published children’s book about loyal friendship, kindness, courage, and learning that a true friend may speak without words.",
    cta: "Read preview",
    href: "https://app.nextscenes.org/reader-view",
    cover: "/images/books/public_site_assets_ugo-and-her-pet-dog-cover.png",
    badge: "Published on Amazon",
    badgeTone: "published-amazon",
    developmentStatus: "showcaseOnly",
    developmentLabel: "Preview on NextScenes",
    publicationStatus: "publishedAmazon",
    publicationLabel: "Published on Amazon",
    publicationUrl: "https://www.amazon.com/s?k=ugo+and+her+pet+dog+book",
    publicationCta: "View on Amazon",
    progressLabel: "Published on Amazon",
  },
  {
    id: "ugo-et-la-femme-papillon-fr",
    title: "Ugo et la Femme-Papillon",
    author: "Goddy Oguzie",
    hook: "Une adaptation française publiée, pleine de douceur, de courage, de respect des anciens et de sagesse pour les jeunes lecteurs.",
    cta: "Lire l’aperçu",
    href: "https://app.nextscenes.org/reader-view",
    cover: "/images/books/public_site_assets_ugo-et-la-femme-papillon-cover.png",
    badge: "Published on Amazon",
    badgeTone: "published-amazon",
    developmentStatus: "showcaseOnly",
    developmentLabel: "Preview on NextScenes",
    publicationStatus: "publishedAmazon",
    publicationLabel: "Published on Amazon",
    publicationUrl: "https://www.amazon.com/s?k=ugo+et+la+femme-papillon+book",
    publicationCta: "View on Amazon",
    progressLabel: "Published on Amazon",
  },
  {
    id: "reflections-of-the-wayfarer-en",
    title: "Reflections of the Wayfarer",
    author: "The Wayfarer",
    hook: "Quiet meditations for restless times and minds still searching for truth.",
    cta: "Open story",
    href: "https://app.nextscenes.org/reader-view?storyId=69e7cbf72c138808c2765520",
    cover: "/images/covers/cover-reflections-of-the-wayfarer-en.jpg",
    badge: "Active on NextScenes",
    badgeTone: "now-reading",
    developmentStatus: "activeOnNextScenes",
    developmentLabel: "Active on NextScenes",
    publicationStatus: "notPublished",
    publicationLabel: "Not Yet Published",
    progressLabel: "Active on NextScenes",
  },
];

export const FEATURED_STORIES_FR: FeaturedStory[] = [
  {
    id: "didie",
    title: "Didie",
    author: "Buri Blessings",
    hook: "Un grand roman africain en développement, porté par l’amour, la perte, la tradition, la justice, la mémoire et le retour vers la vérité.",
    cta: "Ouvrir l’histoire",
    href: "https://app.nextscenes.org/reader-view?storyId=69c8ed091023337bec53061c",
    cover: "/images/covers/didie-cover.jpg",
    badge: "En développement",
    badgeTone: "featured",
    developmentStatus: "inDevelopment",
    developmentLabel: "En développement",
    publicationStatus: "notPublished",
    publicationLabel: "Pas encore publié",
    progressLabel: "En développement",
  },
  {
    id: "jar-lingo-and-evel-broda-en",
    title: "The Tale of King Jar Lingo and Evel Broda",
    author: "Eze Dike",
    hook: "Un récit mythique de jalousie, de royauté, de prophétie, de courage et de lutte entre l’ombre et la lumière.",
    cta: "Ouvrir l’histoire",
    href: "https://app.nextscenes.org/reader-view?storyId=69fe3f788ce98a5bc35ba16e",
    cover: "/images/covers/king-jar-lingo-evel-broda-cover.jpg",
    badge: "En développement",
    badgeTone: "new",
    developmentStatus: "inDevelopment",
    developmentLabel: "En développement",
    publicationStatus: "notPublished",
    publicationLabel: "Pas encore publié",
    progressLabel: "En développement",
  },
  {
    id: "ugo-and-the-butterfly-woman-en",
    title: "Ugo and the Butterfly Woman",
    author: "Goddy Oguzie",
    hook: "Un livre pour enfants publié, sur la bonté, le courage, le respect des anciens et la sagesse qui grandit dans le cœur d’un enfant.",
    cta: "Lire l’aperçu",
    href: "https://app.nextscenes.org/reader-view?storyId=69fff8dd7e622bb7e06332f6",
    cover: "/images/books/public_site_assets_ugo-and-the-butterfly-woman-cover.png",
    badge: "Publié sur Amazon",
    badgeTone: "published-amazon",
    developmentStatus: "showcaseOnly",
    developmentLabel: "Aperçu sur NextScenes",
    publicationStatus: "publishedAmazon",
    publicationLabel: "Publié sur Amazon",
    publicationUrl: "https://www.amazon.com/s?k=ugo+and+the+butterfly+woman+book",
    publicationCta: "Voir sur Amazon",
    progressLabel: "Publié sur Amazon",
  },
  {
    id: "ugo-and-her-pet-dog-en",
    title: "Ugo and Her Pet Dog",
    author: "Goddy Oguzie",
    hook: "Un livre pour enfants publié, sur l’amitié fidèle, la bonté, le courage et les amis qui parlent parfois sans mots.",
    cta: "Lire l’aperçu",
    href: "https://app.nextscenes.org/reader-view",
    cover: "/images/books/public_site_assets_ugo-and-her-pet-dog-cover.png",
    badge: "Publié sur Amazon",
    badgeTone: "published-amazon",
    developmentStatus: "showcaseOnly",
    developmentLabel: "Aperçu sur NextScenes",
    publicationStatus: "publishedAmazon",
    publicationLabel: "Publié sur Amazon",
    publicationUrl: "https://www.amazon.com/s?k=ugo+and+her+pet+dog+book",
    publicationCta: "Voir sur Amazon",
    progressLabel: "Publié sur Amazon",
  },
  {
    id: "ugo-et-la-femme-papillon-fr",
    title: "Ugo et la Femme-Papillon",
    author: "Goddy Oguzie",
    hook: "Une adaptation française publiée, pleine de douceur, de courage, de respect des anciens et de sagesse pour les jeunes lecteurs.",
    cta: "Lire l’aperçu",
    href: "https://app.nextscenes.org/reader-view",
    cover: "/images/books/public_site_assets_ugo-et-la-femme-papillon-cover.png",
    badge: "Publié sur Amazon",
    badgeTone: "published-amazon",
    developmentStatus: "showcaseOnly",
    developmentLabel: "Aperçu sur NextScenes",
    publicationStatus: "publishedAmazon",
    publicationLabel: "Publié sur Amazon",
    publicationUrl: "https://www.amazon.com/s?k=ugo+et+la+femme-papillon+book",
    publicationCta: "Voir sur Amazon",
    progressLabel: "Publié sur Amazon",
  },
  {
    id: "reflexions-du-voyageur-fr",
    title: "Réflexions du Voyageur",
    author: "Le Voyageur",
    hook: "Des méditations paisibles pour les temps agités et les esprits qui cherchent encore la vérité.",
    cta: "Ouvrir l’histoire",
    href: "https://app.nextscenes.org/reader-view?storyId=69e7cbf72c138808c2765520",
    cover: "/images/covers/cover-reflexions-du-voyageur-fr.jpg",
    badge: "Actif sur NextScenes",
    badgeTone: "now-reading",
    developmentStatus: "activeOnNextScenes",
    developmentLabel: "Actif sur NextScenes",
    publicationStatus: "notPublished",
    publicationLabel: "Pas encore publié",
    progressLabel: "Actif sur NextScenes",
  },
];

