import PublicHomepageV2 from "@/components/PublicHomepageV2";
import Image from "next/image";
import Link from "next/link";
import { HOME_FEATURES } from "@/app/lib/homeFeatures";
import { FEATURED_STORIES_FR, type FeaturedStory } from "@/app/lib/featuredStories";
import FeaturedStoriesShelf from "@/components/FeaturedStoriesShelf";
import { buildMetadata } from "@/app/seo";

export const metadata = buildMetadata({
  title: "NextScenes | Histoires propres, livres africains et écriture collaborative",
  description:
    "Lisez et écrivez des histoires propres et porteuses de valeurs sur NextScenes, une plateforme gratuite pour les livres jeunesse, la lecture familiale, les récits africains et l’écriture collaborative.",
  path: "/fr",
  locale: "fr",
  languages: {
    en: "/",
    fr: "/fr",
  },
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.nextscenes.org";

const HOMEPAGE_FEATURED_WORKS_LIMIT = 8;

function getFeaturedStoryFamilyKey(story: FeaturedStory) {
  const rawKey = `${story.id || ""} ${story.title || ""} ${story.cover || ""}`.toLowerCase();

  if (rawKey.includes("butterfly-woman") || rawKey.includes("femme-papillon")) {
    return "ugo-butterfly-woman";
  }

  if (rawKey.includes("pet-dog") || rawKey.includes("petit-chien")) {
    return "ugo-pet-dog";
  }

  if (rawKey.includes("her-friend-awa") || rawKey.includes("friend, awa")) {
    return "ugo-friend-awa";
  }

  if (rawKey.includes("jar-lingo") || rawKey.includes("roi-jar-lingo") || rawKey.includes("conte-du-roi")) {
    return "jar-lingo-evel-broda";
  }

  if (rawKey.includes("reflections-of-the-wayfarer") || rawKey.includes("reflexions-du-voyageur")) {
    return "reflections-wayfarer";
  }

  return story.id || story.title;
}

function inferFeaturedStoryLanguage(story: FeaturedStory) {
  const item = story as FeaturedStory & { language?: string };
  const declared = String(item.language || "").trim().toLowerCase();
  if (declared === "fr" || declared === "en") return declared;

  const rawKey = `${story.id || ""} ${story.title || ""} ${story.hook || ""} ${story.cover || ""}`.toLowerCase();

  if (
    rawKey.includes("-fr") ||
    rawKey.includes("femme-papillon") ||
    rawKey.includes("petit-chien") ||
    rawKey.includes("petit chien") ||
    rawKey.includes("réflexions") ||
    rawKey.includes("reflexions") ||
    rawKey.includes("le conte du roi") ||
    rawKey.includes("un livre") ||
    rawKey.includes("un récit") ||
    rawKey.includes("en développement") ||
    rawKey.includes("publié") ||
    rawKey.includes("vérité")
  ) {
    return "fr";
  }

  return "en";
}

function chooseBetterFeaturedStory(
  current: FeaturedStory,
  candidate: FeaturedStory,
  language: "en" | "fr",
) {
  const currentMatches = inferFeaturedStoryLanguage(current) === language;
  const candidateMatches = inferFeaturedStoryLanguage(candidate) === language;

  if (candidateMatches && !currentMatches) return candidate;
  if (currentMatches && !candidateMatches) return current;

  const currentHasPublication = current.publicationStatus === "publishedAmazon" || Boolean(current.publicationUrl);
  const candidateHasPublication = candidate.publicationStatus === "publishedAmazon" || Boolean(candidate.publicationUrl);

  if (candidateHasPublication && !currentHasPublication) return candidate;
  return current;
}

function uniqueStoriesByFamilyForLanguage(
  stories: FeaturedStory[],
  language: "en" | "fr",
) {
  const familyOrder: string[] = [];
  const bestByFamily = new Map<string, FeaturedStory>();

  for (const story of stories) {
    if (!story?.id) continue;

    const familyKey = getFeaturedStoryFamilyKey(story);
    if (!bestByFamily.has(familyKey)) {
      familyOrder.push(familyKey);
      bestByFamily.set(familyKey, story);
      continue;
    }

    bestByFamily.set(
      familyKey,
      chooseBetterFeaturedStory(bestByFamily.get(familyKey) as FeaturedStory, story, language),
    );
  }

  return familyOrder
    .map((familyKey) => bestByFamily.get(familyKey))
    .filter(Boolean) as FeaturedStory[];
}

function buildHomepageFeaturedWorks(stories: FeaturedStory[]) {
  return uniqueStoriesByFamilyForLanguage(stories, "fr").slice(0, HOMEPAGE_FEATURED_WORKS_LIMIT);
}


const FALLBACK_WEEKLY_MYSTERY: NormalizedWeeklyMystery = {
  ref: "les-empreintes-a-sens-unique",
  title: "Les empreintes à sens unique",
  teaser:
    "Neige fraîche. Une seule piste vers une grange verrouillée. Aucune trace de retour. Personne à l’intérieur. Saurez-vous résoudre l’énigme avant la révélation ?",
  imageSrc: "/images/mystery250/the-one-way-footprints.png",
  imageAlt:
    "Un fermier observe une seule piste d’empreintes menant à une grange verrouillée après une chute de neige",
  cta: "Essayez l’énigme de la semaine",
  href: "",
};


const HOMEPAGE_WEEKLY_MYSTERY_TEASERS: Record<string, string> = {
  "library-break-in":
    "À l’aube, la bibliothécaire trouva le bureau fermé de l’intérieur. Un manuscrit rare avait disparu. Le propriétaire affirma qu’un voleur était entré par la fenêtre pendant la nuit, avait pris le manuscrit, puis s’était enfui par le même chemin. La pièce semblait en désordre. Une chaise avait été renversée. Des papiers étaient éparpillés sur le sol. Mais un détail montrait que le cambriolage avait été mis en scène.",
  "the-library-break-in":
    "À l’aube, la bibliothécaire trouva le bureau fermé de l’intérieur. Un manuscrit rare avait disparu. Le propriétaire affirma qu’un voleur était entré par la fenêtre pendant la nuit, avait pris le manuscrit, puis s’était enfui par le même chemin. La pièce semblait en désordre. Une chaise avait été renversée. Des papiers étaient éparpillés sur le sol. Mais un détail montrait que le cambriolage avait été mis en scène.",
  "la-bibliotheque-cambriolage":
    "À l’aube, la bibliothécaire trouva le bureau fermé de l’intérieur. Un manuscrit rare avait disparu. Le propriétaire affirma qu’un voleur était entré par la fenêtre pendant la nuit, avait pris le manuscrit, puis s’était enfui par le même chemin. La pièce semblait en désordre. Une chaise avait été renversée. Des papiers étaient éparpillés sur le sol. Mais un détail montrait que le cambriolage avait été mis en scène.",
};

function normalizeMysteryLookupKey(value?: string) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isLikelyIncompleteHomepageTeaser(value: string) {
  const teaser = String(value || "").trim();

  if (!teaser) return true;

  if (/[.!?…][)"'’”\]]*$/.test(teaser)) {
    return false;
  }

  return teaser.length >= 160;
}

function getSafeHomepageMysteryTeaser(
  rawTeaser: string | undefined,
  fallbackTeaser: string,
  ref: string,
  title: string,
) {
  const teaser = String(rawTeaser || "").trim();
  const refKey = normalizeMysteryLookupKey(ref);
  const titleKey = normalizeMysteryLookupKey(title);
  const knownTeaser =
    HOMEPAGE_WEEKLY_MYSTERY_TEASERS[refKey] ||
    HOMEPAGE_WEEKLY_MYSTERY_TEASERS[titleKey];

  if (!teaser) return knownTeaser || fallbackTeaser;

  if (isLikelyIncompleteHomepageTeaser(teaser)) {
    return knownTeaser || fallbackTeaser;
  }

  return teaser;
}

type WeeklyMystery = {
  id?: string;
  mysteryId?: string;
  ref?: string;
  title?: string;
  teaser?: string;
  cta?: string;
  imageSrc?: string;
  imageAlt?: string;
  href?: string;
};

type FeaturedReading = {
  label: string;
  title: string;
  author: string;
  description: string;
  wisdomText?: string;
  cta?: string;
  href?: string;
  cover?: string;
  imageAlt?: string;
  isVisible?: boolean;
};

type NormalizedWeeklyMystery = {
  ref: string;
  title: string;
  teaser: string;
  imageSrc: string;
  imageAlt: string;
  cta: string;
  href: string;
};

type PublicHomepageResponse = {
  ok?: boolean;
  featuredStories?: FeaturedStory[];
  weeklyMystery?: WeeklyMystery | null;
  featuredReading?: FeaturedReading | null;
};

type PublicHomepageData = {
  featuredStories: FeaturedStory[];
  weeklyMystery: NormalizedWeeklyMystery;
  featuredReading: FeaturedReading;
};

function cleanApiBase(value: string | undefined) {
  return String(value || "").trim().replace(/\/+$/, "");
}

function getPublicHomepageApiBase() {
  return (
    cleanApiBase(process.env.NEXT_PUBLIC_NEXTSCENES_API_BASE) ||
    cleanApiBase(process.env.NEXT_PUBLIC_API_BASE) ||
    "https://api.nextscenes.org"
  );
}

function normalizeWeeklyMystery(raw?: WeeklyMystery | null): NormalizedWeeklyMystery {
  if (!raw) return FALLBACK_WEEKLY_MYSTERY;

  return {
    ref: raw.ref || raw.mysteryId || FALLBACK_WEEKLY_MYSTERY.ref,
    title: raw.title || FALLBACK_WEEKLY_MYSTERY.title,
    teaser: getSafeHomepageMysteryTeaser(
      raw.teaser,
      FALLBACK_WEEKLY_MYSTERY.teaser,
      raw.ref || raw.mysteryId || FALLBACK_WEEKLY_MYSTERY.ref,
      raw.title || FALLBACK_WEEKLY_MYSTERY.title,
    ),
    imageSrc: raw.imageSrc || FALLBACK_WEEKLY_MYSTERY.imageSrc,
    imageAlt: raw.imageAlt || FALLBACK_WEEKLY_MYSTERY.imageAlt,
    cta: raw.cta || FALLBACK_WEEKLY_MYSTERY.cta,
    href: raw.href || "",
  };
}

function getWeeklyMysteryAppHref(weeklyMystery: NormalizedWeeklyMystery) {
  if (weeklyMystery.href) return weeklyMystery.href;

  const params = new URLSearchParams({ mystery: weeklyMystery.ref });
  return `${APP_URL}/mystery250?${params.toString()}`;
}

function normalizeFeaturedReading(
  raw: FeaturedReading | null | undefined,
  fallback: FeaturedReading,
): FeaturedReading {
  if (!raw || raw.isVisible === false) return fallback;

  return {
    label: raw.label || fallback.label,
    title: raw.title || fallback.title,
    author: raw.author || fallback.author,
    description: raw.description || fallback.description,
    wisdomText: raw.wisdomText || fallback.wisdomText || "La lecture élargit l’esprit, affine le jugement et nous permet d’emprunter la sagesse de vies au-delà de la nôtre.",
    cta: raw.cta || fallback.cta,
    href: raw.href || fallback.href || "",
    cover: raw.cover || fallback.cover || "",
    imageAlt: raw.imageAlt || fallback.imageAlt || "",
    isVisible: raw.isVisible,
  };
}

async function getPublicHomepageData(language: "en" | "fr"): Promise<PublicHomepageData> {
  const apiBase = getPublicHomepageApiBase();

  try {
    const res = await fetch(
      `${apiBase}/api/public-homepage?language=${encodeURIComponent(language)}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      return {
        featuredStories: FEATURED_STORIES_FR,
        weeklyMystery: FALLBACK_WEEKLY_MYSTERY,
        featuredReading: HOME_FEATURES.fr.featuredReading,
      };
    }

    const data = (await res.json()) as PublicHomepageResponse;
    const stories = Array.isArray(data?.featuredStories)
      ? data.featuredStories
      : [];

    return {
      featuredStories: stories.length ? stories : FEATURED_STORIES_FR,
      weeklyMystery: normalizeWeeklyMystery(data?.weeklyMystery),
      featuredReading: normalizeFeaturedReading(
        data?.featuredReading,
        HOME_FEATURES.fr.featuredReading,
      ),
    };
  } catch {
    return {
      featuredStories: FEATURED_STORIES_FR,
      weeklyMystery: FALLBACK_WEEKLY_MYSTERY,
      featuredReading: HOME_FEATURES.fr.featuredReading,
    };
  }
}

function HomeButton({
  href,
  children,
  tone = "primary",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "primary" | "secondary";
}) {
  return (
    <Link
      href={href}
      className={tone === "primary" ? "ns-home-btn ns-home-btn-primary" : "ns-home-btn ns-home-btn-secondary"}
    >
      {children}
    </Link>
  );
}

function DoorwayCard({
  title,
  text,
  href,
  cta,
  imageSrc,
  imageAlt,
  icon,
}: {
  title: string;
  text: string;
  href: string;
  cta: string;
  imageSrc: string;
  imageAlt: string;
  icon: string;
}) {
  return (
    <article className="ns-home-doorway-card">
      <div className="ns-home-doorway-image">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 760px) 100vw, 33vw"
          className="ns-home-doorway-img"
          unoptimized
        />
        <div className="ns-home-doorway-icon" aria-hidden="true">
          {icon}
        </div>
      </div>
      <div className="ns-home-doorway-body">
        <h3>{title}</h3>
        <p>{text}</p>
        <Link href={href} className="ns-home-text-link">
          {cta} →
        </Link>
      </div>
    </article>
  );
}

function FeaturedReadingCard({ reading }: { reading: FeaturedReading }) {
  return (
    <section className="ns-home-featured-reading-strip" aria-label={reading.label}>
      <div className="ns-home-container">
        <article className="ns-home-featured-reading-card">
          {reading.cover ? (
            <div className="ns-home-featured-reading-cover-wrap">
              <img
                src={reading.cover}
                alt={reading.imageAlt || `${reading.title} by ${reading.author}`}
                className="ns-home-featured-reading-cover"
              />
            </div>
          ) : (
            <div className="ns-home-featured-reading-mark" aria-hidden="true">
              Lecture du mois
            </div>
          )}

          <div className="ns-home-featured-reading-copy">
            <div className="ns-home-section-kicker">{reading.label}</div>
            <h2>{reading.title}</h2>
            <p className="ns-home-featured-reading-author">De {reading.author}</p>
            <p className="ns-home-featured-reading-desc">{reading.description}</p>
            {reading.wisdomText ? (
              <>
                <div className="ns-home-featured-reading-divider" aria-hidden="true" />
                <p className="ns-home-featured-reading-wisdom">{reading.wisdomText}</p>
              </>
            ) : null}
            {reading.href ? (
              <Link href={reading.href} className="ns-home-featured-reading-link">
                {reading.cta || "Découvrir la recommandation"} →
              </Link>
            ) : null}
          </div>
        </article>
      </div>
    </section>
  );
}


export default async function HomePage() {
  const homeFeatures = HOME_FEATURES.fr;
  const bookOfTheWeek = homeFeatures.bookOfTheWeek;
  const homepageData = await getPublicHomepageData("fr");
  const weeklyMystery = homepageData.weeklyMystery;
  const weeklyMysteryAppHref = getWeeklyMysteryAppHref(weeklyMystery);
  const featuredStories = homepageData.featuredStories;
  const homepageFeaturedStories = buildHomepageFeaturedWorks(featuredStories);
  const featuredReading = homepageData.featuredReading;

  return (
    <PublicHomepageV2
      language="fr"
      stories={homepageFeaturedStories}
      mystery={weeklyMystery}
      mysteryHref={weeklyMysteryAppHref}
      reading={featuredReading}
      storiesHref={bookOfTheWeek.href}
    />
  );
}

function BookIcon() {
  return <span aria-hidden="true">📖</span>;
}

function PenIcon() {
  return <span aria-hidden="true">✍️</span>;
}

function GlobeIcon() {
  return <span aria-hidden="true">🌍</span>;
}
