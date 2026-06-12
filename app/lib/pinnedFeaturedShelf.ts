type FeaturedStoryLike = Record<string, any>;

const STORYLINES_COVERS: Record<string, string> = {
  "The Tale of King Jar Lingo and Evel Broda":
    "https://grkvsllcpotylcvbecuj.supabase.co/storage/v1/object/public/story-covers/69a553cf65ebedc2820c44b0/2026-05-29T20-47-55-413Z-5194e0ad-b84d-4963-9b96-abeced7e98ce-jar-lingo.jpg",

  "Le Conte du roi Jar Lingo et d’Evel Broda":
    "https://grkvsllcpotylcvbecuj.supabase.co/storage/v1/object/public/story-covers/69a553cf65ebedc2820c44b0/2026-05-29T20-46-51-366Z-e673dd4c-a587-43a8-b408-558183238f32-le-conte.jpg",

  "Reflections of the Wayfarer":
    "https://grkvsllcpotylcvbecuj.supabase.co/storage/v1/object/public/story-covers/69623c5a3f3a3c7b988420a6/2026-05-29T19-38-03-359Z-cbb5729c-6b93-4743-b4c3-51fa54064f87-reflections-of-the-wayfarer-en.jpg",

  "Réflexions du Voyageur":
    "https://grkvsllcpotylcvbecuj.supabase.co/storage/v1/object/public/story-covers/6951ab640bd943c9ce7f3836/2026-05-29T19-28-36-605Z-b5e7a636-8a30-43c8-a074-9f457e2e4e7b-cover-reflexions-du-voyageur-fr.jpg",

  "Ugo and Her Pet Dog":
    "https://grkvsllcpotylcvbecuj.supabase.co/storage/v1/object/public/story-covers/694974e710f8758007d665e6/2026-05-29T17-05-23-126Z-619db0d3-539a-4de9-ad48-7b8971159581-cover_ugo-and-her-pet-dog.png",

  "Ugo et la Femme Papillon":
    "https://grkvsllcpotylcvbecuj.supabase.co/storage/v1/object/public/story-covers/69ca5c274e09c9116874ea46/2026-05-29T16-56-04-735Z-22cfb73a-fb2c-4785-81e6-0f8cf58ffeb2-french_cover_with_author.png",

  "Ugo and the Butterfly Woman":
    "https://grkvsllcpotylcvbecuj.supabase.co/storage/v1/object/public/story-covers/69ca5c274e09c9116874ea46/2026-05-29T16-39-27-602Z-1fa846b9-8e89-4ed8-8c56-cbfca2d4097b-ugo-and-the-butterfly-woman.png",

  "Didie":
    "https://grkvsllcpotylcvbecuj.supabase.co/storage/v1/object/public/story-covers/69ca5c274e09c9116874ea46/2026-05-29T16-35-04-549Z-c7089fe9-5cf3-4e57-9f4e-c41350db432e-didie-cover.jpg",
};

const PINNED_TITLES: Record<"en" | "fr", string[]> = {
  en: [
    "The Tale of King Jar Lingo and Evel Broda",
    "Ugo and the Butterfly Woman",
    "Reflections of the Wayfarer",
    "Ugo and Her Pet Dog",
  ],
  fr: [
    "Le Conte du roi Jar Lingo et d’Evel Broda",
    "Ugo et la Femme Papillon",
    "Réflexions du Voyageur",
    "Ugo and Her Pet Dog",
  ],
};

const FALLBACK_TEXT: Record<string, { author: string; hook: string; status: string; cta: string; href: string }> = {
  "The Tale of King Jar Lingo and Evel Broda": {
    author: "Eze Dike",
    hook: "A mythic tale of jealousy, kingship, prophecy, courage, and the struggle between darkness and light.",
    status: "inDevelopment",
    cta: "Open story",
    href: "/storylines",
  },
  "Le Conte du roi Jar Lingo et d’Evel Broda": {
    author: "Eze Dike",
    hook: "Un récit mythique de jalousie, de royauté, de prophétie, de courage et de lutte entre l’ombre et la lumière.",
    status: "inDevelopment",
    cta: "Ouvrir l’histoire",
    href: "/fr",
  },
  "Reflections of the Wayfarer": {
    author: "Eze Dike",
    hook: "Quiet meditations for restless times and minds still searching for truth.",
    status: "inDevelopment",
    cta: "Open story",
    href: "/storylines",
  },
  "Réflexions du Voyageur": {
    author: "Davies",
    hook: "Des méditations calmes pour les temps agités et les esprits encore en quête de vérité.",
    status: "inDevelopment",
    cta: "Ouvrir l’histoire",
    href: "/fr",
  },
  "Ugo and the Butterfly Woman": {
    author: "Goddy Oguzie",
    hook: "A published children’s book about wonder, kindness, courage, respect for elders, and the quiet wisdom found in unexpected encounters.",
    status: "publishedAmazon",
    cta: "View on Amazon",
    href: "https://www.amazon.com/s?k=ugo+and+the+butterfly+woman+book&crid=3HM66YL97GD5W&sprefix=%2Caps%2C235&ref=nb_sb_ss_recent_2_0_recent",
  },
  "Ugo et la Femme Papillon": {
    author: "Goddy Oguzie",
    hook: "Une adaptation française publiée, pleine de douceur, de courage, de respect des anciens et de sagesse pour les jeunes lecteurs.",
    status: "publishedAmazon",
    cta: "Voir sur Amazon",
    href: "https://www.amazon.com/s?k=ugo+et+la+femme+papillon",
  },
  "Ugo and Her Pet Dog": {
    author: "Goddy Oguzie",
    hook: "A published children’s book about loyal friendship, kindness, courage, and learning that a true friend may speak without words.",
    status: "publishedAmazon",
    cta: "View on Amazon",
    href: "https://www.amazon.com/s?k=ugo+and+her+pet+dog+book",
  },
};

function normalizeTitle(value: unknown) {
  return String(value || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[’']/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function getTitle(story: FeaturedStoryLike) {
  return String(story?.title || story?.name || story?.displayTitle || "").trim();
}

function findStoryByTitle(stories: FeaturedStoryLike[], title: string) {
  const wanted = normalizeTitle(title);

  return (
    stories.find((story) => normalizeTitle(getTitle(story)) === wanted) ||
    stories.find((story) => {
      const current = normalizeTitle(getTitle(story));
      return current.includes(wanted) || wanted.includes(current);
    })
  );
}

function completePinnedStory(story: FeaturedStoryLike | undefined, title: string): any {
  const fallback = FALLBACK_TEXT[title] || {
    author: "NextScenes",
    hook: "A featured work on NextScenes, shown with its official cover and clear reading path.",
    status: "inDevelopment",
    cta: "Open story",
    href: "/storylines",
  };

  const cover =
    STORYLINES_COVERS[title] ||
    story?.cover ||
    story?.coverImageUrl ||
    story?.coverUrl ||
    story?.imageUrl ||
    "";

  const status =
    story?.publicationStatus ||
    story?.status ||
    fallback.status ||
    "inDevelopment";

  return {
    ...(story || {}),
    id:
      story?.id ||
      `pinned-${normalizeTitle(title).replace(/[^a-z0-9]+/g, "-")}`,
    title: story?.title || title,
    author: story?.author || story?.authorName || fallback.author,
    hook: story?.hook || story?.description || fallback.hook,
    description: story?.description || story?.hook || fallback.hook,
    cta: story?.cta || fallback.cta,
    href: story?.href || story?.url || fallback.href,
    status,
    publicationStatus: story?.publicationStatus || status,
    cover,
    coverUrl: cover,
    coverImageUrl: cover,
    imageUrl: cover,
  };
}

export function buildPinnedHomepageFeaturedStories(
  stories: FeaturedStoryLike[] = [],
  locale: "en" | "fr" = "en"
): any[] {
  return PINNED_TITLES[locale].map((title) =>
    completePinnedStory(findStoryByTitle(stories, title), title)
  );
}
