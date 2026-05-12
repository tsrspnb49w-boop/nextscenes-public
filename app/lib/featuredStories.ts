// Build: featured-stories-config-v8
// Purpose: Homepage featured shelf, fully config-driven
// Note: Keep featured public story links and covers aligned with current app storylines.

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
  },
  {
    id: "jar-lingo-et-evel-broda-fr",
    title: "Le Conte du roi Jar Lingo et d’Evel Broda",
    author: "Eze Dike",
    hook: "Un conte de jalousie, de royauté, de prophétie et de lumière.",
    cta: "Lire",
    href: "https://app.nextscenes.org/reader-view?storyId=6a01ac35f783507dfbc969e4",
    cover:
      "https://grkvsllcpotylcvbecuj.supabase.co/storage/v1/object/public/story-covers/69a553cf65ebedc2820c44b0/2026-05-11T10-15-02-512Z-183bbb22-e054-40bb-95da-f380a9ea235d-le-conte-du.png",
    badge: "Live",
    badgeTone: "live",
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
  },
];