// Build: featured-stories-config-v6
// Purpose: Homepage featured shelf, fully config-driven
// Note: using local Didie cover as placeholder for all books for now

export type FeaturedStory = {
  id: string;
  title: string;
  author: string;
  hook: string;
  cta: string;
  href: string;
  cover: string;
  badge: string;
  badgeTone: "featured" | "new" | "now-reading" | "live";
};

const PLACEHOLDER_COVER = "/images/covers/didie-cover.jpg";

export const FEATURED_STORIES: FeaturedStory[] = [
  {
    id: "didie",
    title: "Didie",
    author: "Buri Blessings",
    hook: "A boy, a village, and a destiny shaped by love, loss, and memory.",
    cta: "Open story",
    href: "https://app.nextscenes.org/reader-view?storyId=69c8ed091023337bec53061c",
    cover: PLACEHOLDER_COVER,
    badge: "Featured",
    badgeTone: "featured",
  },
  {
    id: "jar-lingo-and-evel-broda",
    title: "Jar Lingo And Evel Broda",
    author: "Eze Dike",
    hook: "A mythic struggle of jealousy, kingship, prophecy, and light.",
    cta: "Open story",
    href: "https://app.nextscenes.org/reader-view?storyId=69c902f81023337bec53080e",
    cover: "/images/covers/king-jar-lingo-evel-broda-cover.jpg",
    badge: "New",
    badgeTone: "new",
  },
  {
    id: "reflections-of-the-wayfarer",
    title: "Reflections of The Wayfarer",
    author: "The Wayfarer",
    hook: "Quiet meditations for restless times and minds still searching for truth.",
    cta: "Open story",
    href: "https://app.nextscenes.org/reader-view?storyId=6999926ee47ac5ae3b58dca4",
    cover: "/images/covers/cover-reflections-of-the-wayfarer-en.jpg",
    badge: "Now Reading",
    badgeTone: "now-reading",
  },
  {
  id: "story-of-the-week",
  title: "Réflexions du Voyageur",
  author: "Davies",
  hook: "Des méditations pour ceux qui cherchent encore le sens dans le silence.",
  cta: "Lire",
  href: "https://app.nextscenes.org/reader-view?storyId=69ce4f164e09c9116875119e",
  cover: "/images/covers/cover-reflexions-du-voyageur-fr.jpg",
  badge: "Live",
  badgeTone: "live",
},
];