// Build: featured-stories-config-v9
// Purpose: Homepage featured shelf, config-driven fallback data.
// Note: API-managed homepage items override this file when /api/public-homepage responds successfully.

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
    hook: "A boy, a village, and a destiny shaped by love, loss, and memory.",
    cta: "Open story",
    href: "https://app.nextscenes.org/reader-view?storyId=69c8ed091023337bec53061c",
    cover: "/images/covers/didie-cover.jpg",
    badge: "Featured",
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
    hook: "A mythic struggle of jealousy, kingship, prophecy, and light.",
    cta: "Open story",
    href: "https://app.nextscenes.org/reader-view?storyId=69fe3f788ce98a5bc35ba16e",
    cover:
      "https://grkvsllcpotylcvbecuj.supabase.co/storage/v1/object/public/story-covers/69a553cf65ebedc2820c44b0/2026-05-11T12-33-33-861Z-de1843ce-b61e-4645-8e17-59fc85bb1310-lingo_eng.png",
    badge: "New",
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
    hook: "A gentle children’s story about kindness, courage, respect for elders, and the quiet wisdom that grows inside a child’s heart.",
    cta: "Read preview",
    href: "https://app.nextscenes.org/reader-view?storyId=69fff8dd7e622bb7e06332f6",
    cover: "/images/books/ugo-and-the-butterfly-woman-cover.png",
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
    id: "reflections-of-the-wayfarer-en",
    title: "Reflections of the Wayfarer",
    author: "The Wayfarer",
    hook: "Quiet meditations for restless times and minds still searching for truth.",
    cta: "Open story",
    href: "https://app.nextscenes.org/reader-view?storyId=69e7cbf72c138808c2765520",
    cover: "/images/default-covers/storyline-en.webp",
    badge: "Now Reading",
    badgeTone: "now-reading",
    developmentStatus: "activeOnNextScenes",
    developmentLabel: "Active on NextScenes",
    publicationStatus: "notPublished",
    publicationLabel: "Not Yet Published",
    progressLabel: "Active on NextScenes",
  },
];
