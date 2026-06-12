import Image from "next/image";
import Link from "next/link";
import { HOME_FEATURES } from "@/app/lib/homeFeatures";
import {
  FEATURED_STORIES,
  type FeaturedStory,
} from "@/app/lib/featuredStories";
import FeaturedStoriesShelf from "@/components/FeaturedStoriesShelf";

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
  return uniqueStoriesByFamilyForLanguage(stories, "en").slice(0, HOMEPAGE_FEATURED_WORKS_LIMIT);
}

const FALLBACK_WEEKLY_MYSTERY: NormalizedWeeklyMystery = {
  ref: "the-one-way-footprints",
  title: "The One-Way Footprints",
  teaser:
    "Fresh snow. One trail to a locked barn. No trail away. No one inside. Can you solve it before the reveal?",
  imageSrc: "/images/mystery250/the-one-way-footprints.png",
  imageAlt:
    "A farmer studying one trail of footprints leading to a locked barn after fresh snow",
  cta: "Try this week's puzzle",
  href: "",
};

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
  return String(value || "")
    .trim()
    .replace(/\/+$/, "");
}

function getPublicHomepageApiBase() {
  return (
    cleanApiBase(process.env.NEXT_PUBLIC_NEXTSCENES_API_BASE) ||
    cleanApiBase(process.env.NEXT_PUBLIC_API_BASE) ||
    "https://api.nextscenes.org"
  );
}

function normalizeWeeklyMystery(
  raw?: WeeklyMystery | null,
): NormalizedWeeklyMystery {
  if (!raw) return FALLBACK_WEEKLY_MYSTERY;

  return {
    ref: raw.ref || raw.mysteryId || FALLBACK_WEEKLY_MYSTERY.ref,
    title: raw.title || FALLBACK_WEEKLY_MYSTERY.title,
    teaser: raw.teaser || FALLBACK_WEEKLY_MYSTERY.teaser,
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
    wisdomText:
      raw.wisdomText ||
      fallback.wisdomText ||
      "Reading widens the mind, sharpens judgment, and lets us borrow wisdom from lives beyond our own.",
    cta: raw.cta || fallback.cta,
    href: raw.href || fallback.href || "",
    cover: raw.cover || fallback.cover || "",
    imageAlt: raw.imageAlt || fallback.imageAlt || "",
    isVisible: raw.isVisible,
  };
}

async function getPublicHomepageData(
  language: "en" | "fr",
): Promise<PublicHomepageData> {
  const apiBase = getPublicHomepageApiBase();

  try {
    const res = await fetch(
      `${apiBase}/api/public-homepage?language=${encodeURIComponent(language)}`,
      {
        next: { revalidate: 60 },
      },
    );

    if (!res.ok) {
      return {
        featuredStories: FEATURED_STORIES,
        weeklyMystery: FALLBACK_WEEKLY_MYSTERY,
        featuredReading: HOME_FEATURES.en.featuredReading,
      };
    }

    const data = (await res.json()) as PublicHomepageResponse;
    const stories = Array.isArray(data?.featuredStories)
      ? data.featuredStories
      : [];

    return {
      featuredStories: stories.length ? stories : FEATURED_STORIES,
      weeklyMystery: normalizeWeeklyMystery(data?.weeklyMystery),
      featuredReading: normalizeFeaturedReading(
        data?.featuredReading,
        HOME_FEATURES.en.featuredReading,
      ),
    };
  } catch {
    return {
      featuredStories: FEATURED_STORIES,
      weeklyMystery: FALLBACK_WEEKLY_MYSTERY,
      featuredReading: HOME_FEATURES.en.featuredReading,
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
      className={
        tone === "primary"
          ? "ns-home-btn ns-home-btn-primary"
          : "ns-home-btn ns-home-btn-secondary"
      }
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
    <section
      className="ns-home-featured-reading-strip"
      aria-label={reading.label}
    >
      <div className="ns-home-container">
        <article className="ns-home-featured-reading-card">
          {reading.cover ? (
            <div className="ns-home-featured-reading-cover-wrap">
              <img
                src={reading.cover}
                alt={
                  reading.imageAlt || `${reading.title} by ${reading.author}`
                }
                className="ns-home-featured-reading-cover"
              />
            </div>
          ) : (
            <div className="ns-home-featured-reading-mark" aria-hidden="true">
              Monthly Reading
            </div>
          )}

          <div className="ns-home-featured-reading-copy">
            <div className="ns-home-section-kicker">{reading.label}</div>
            <h2>{reading.title}</h2>
            <p className="ns-home-featured-reading-author">
              By {reading.author}
            </p>
            <p className="ns-home-featured-reading-desc">
              {reading.description}
            </p>
            {reading.wisdomText ? (
              <>
                <div
                  className="ns-home-featured-reading-divider"
                  aria-hidden="true"
                />
                <p className="ns-home-featured-reading-wisdom">
                  {reading.wisdomText}
                </p>
              </>
            ) : null}
            {reading.href ? (
              <Link
                href={reading.href}
                className="ns-home-featured-reading-link"
              >
                {reading.cta || "Explore the recommendation"} →
              </Link>
            ) : null}
          </div>
        </article>
      </div>
    </section>
  );
}

export default async function HomePage() {
  const homeFeatures = HOME_FEATURES.en;
  const bookOfTheWeek = homeFeatures.bookOfTheWeek;
  const homepageData = await getPublicHomepageData("en");
  const weeklyMystery = homepageData.weeklyMystery;
  const weeklyMysteryAppHref = getWeeklyMysteryAppHref(weeklyMystery);
  const featuredStories = homepageData.featuredStories;
  const homepageFeaturedStories = buildHomepageFeaturedWorks(featuredStories);
  const featuredReading = homepageData.featuredReading;

  return (
    <div className="ns-page ns-public-home">
      <section className="ns-home-hero-v2">
        <div className="ns-home-hero-backdrop" aria-hidden="true" />
        <div className="ns-home-hero-shade" aria-hidden="true" />

        <div className="ns-home-container ns-home-hero-grid">
          <div className="ns-home-hero-copy-v2">
            <div className="ns-home-eyebrow">
              Read. Create. Publish. Discover.
            </div>

            <h1>Create your story. Discover books shaped on NextScenes.</h1>

            <p className="ns-home-hero-lede">
              Read selected stories in progress, begin your own creative
              journey, and discover published books that grew from imagination,
              discipline, and careful storytelling.
            </p>

            <div className="ns-home-free-access-strip" role="note">
              <strong>Free to join. Free to read. Free to participate.</strong>{" "}
              <span>No hidden fees for core NextScenes participation.</span>
            </div>

            <div className="ns-home-hero-actions">
              <HomeButton href={bookOfTheWeek.href}>Read Stories →</HomeButton>
              <HomeButton href={APP_URL} tone="secondary">
                Start Writing
              </HomeButton>
            </div>
          </div>

          <aside
            className="ns-home-hero-journey-card"
            aria-label="NextScenes creative journey"
          >
            <div className="ns-home-hero-journey-kicker">
              The NextScenes path
            </div>
            <h2>From first scene to finished work.</h2>
            <p>
              Start with an idea, shape it scene by scene, invite thoughtful
              reading, and give strong work a road toward publication. Joining
              and taking part in the core story experience are free.
            </p>

            <div className="ns-home-hero-journey-steps">
              <span>Write</span>
              <span>Polish</span>
              <span>Share</span>
              <span>Publish</span>
            </div>
          </aside>
        </div>
      </section>
      <section
        className="ns-home-featured-works-row"
        aria-label="Featured works"
      >
        <div className="ns-home-container">
          <div className="ns-home-featured-works-head">
            <div>
              <div className="ns-home-section-kicker">Featured Works</div>
              <h2>Books and stories</h2>
            </div>
            <p>
              Browse works in progress and published books connected to the
              NextScenes journey.
            </p>
          </div>

          <FeaturedStoriesShelf
            stories={homepageFeaturedStories}
            authorLabel="By"
            progressLabel="In Development"
            storyCtaLabel="Open story"
            publicationCtaLabel="View publication"
            publicationAmazonCtaLabel="View on Amazon"
          />
        </div>
      </section>

      <section className="ns-home-doorways" aria-label="Main entry paths">
        <div className="ns-home-container ns-home-doorway-grid">
          <DoorwayCard
            title="Read stories"
            text="Open selected scenes, follow stories in progress, and enjoy a calm reading experience without technical clutter."
            href={bookOfTheWeek.href}
            cta="Browse stories"
            imageSrc="/images/home/story-entry.png"
            imageAlt="A calm reading entrance for story discovery"
            icon="📖"
          />

          <DoorwayCard
            title="Write with purpose"
            text="Create, polish, collaborate with care, and manage your story from a private writing workspace. Core participation is free."
            href={APP_URL}
            cta="Start writing"
            imageSrc="/images/home/writer-studio.png"
            imageAlt="A focused writing workspace for authors"
            icon="✍️"
          />

          <DoorwayCard
            title="Try Mystery250"
            text="Solve short mysteries that sharpen curiosity while keeping the experience clean, intelligent, and friendly."
            href={weeklyMysteryAppHref}
            cta="Solve a mystery"
            imageSrc={weeklyMystery.imageSrc}
            imageAlt={weeklyMystery.imageAlt}
            icon="🧩"
          />
        </div>
      </section>

      <section className="ns-home-audio-strip" aria-label="Audio guide">
        <div className="ns-home-container">
          <div className="ns-home-audio-strip-card">
            <div>
              <div className="ns-home-section-kicker">Start Here</div>
              <h2>How NextScenes Works</h2>
              <p>
                Listen to a short guide on how to explore the site, read
                stories, enter the app, and begin participating as a reader or
                writer. Registration and core participation are free.
              </p>
            </div>

            <audio controls preload="none" className="ns-home-audio-player">
              <source src="/audio/how-it-works-en.mp3" type="audio/mpeg" />
            </audio>
          </div>
        </div>
      </section>

      <FeaturedReadingCard reading={featuredReading} />

      <section className="ns-home-development">
        <div className="ns-home-container ns-home-development-grid">
          <div className="ns-home-development-copy">
            <div className="ns-home-section-kicker">
              From draft to destination
            </div>
            <h2>Readers see the story. Writers keep control of the journey.</h2>
            <p>
              NextScenes keeps the public reading experience calm and clear.
              Visitors can discover selected stories, see which works are still
              growing, and recognize books that have already moved into
              publication.
            </p>

            <div className="ns-home-check-list">
              <span>
                Stories presented with covers, titles, and clear actions
              </span>
              <span>
                Published books separated from works still in progress
              </span>
              <span>Readers welcomed without technical clutter</span>
              <span>Author control, trust, and rights kept visible</span>
            </div>
          </div>

          <div className="ns-home-workshop-card">
            <div className="ns-home-workshop-visual" aria-hidden="true" />
            <div className="ns-home-workshop-content">
              <h3>
                A calm reading room in front. A serious creative workshop behind
                it.
              </h3>
              <p>
                The public side is for discovery, reading, and trust. The writer
                side is where authors shape scenes, review contributions, and
                protect the direction of their work.
              </p>
              <div className="ns-home-mini-checks">
                <span>Visitors meet stories without confusion.</span>
                <span>
                  Authors keep the tools and decisions where they belong.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ns-home-feels">
        <div className="ns-home-container ns-home-feels-grid">
          <div>
            <div className="ns-home-section-kicker">
              What NextScenes protects
            </div>
            <h2>
              A literary space built for clarity, fairness, and careful growth.
            </h2>
          </div>

          <div className="ns-home-feels-cards">
            <article>
              <BookIcon />
              <h3>Calm reading</h3>
              <p>
                Readers can enter a story without noise, confusion, or
                unnecessary technical weight.
              </p>
            </article>
            <article>
              <PenIcon />
              <h3>Author control</h3>
              <p>
                Writers remain in charge of their stories, their direction, and
                the work they approve.
              </p>
            </article>
            <article>
              <GlobeIcon />
              <h3>Honest presentation</h3>
              <p>
                Works in development and books already published are shown
                clearly, each in its proper place.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        className="ns-home-mystery-feature"
        aria-label="Mystery250 weekly puzzle"
      >
        <div className="ns-home-container ns-home-mystery-card">
          <figure>
            <Image
              src={weeklyMystery.imageSrc}
              alt={weeklyMystery.imageAlt}
              width={720}
              height={405}
              className="ns-home-mystery-image"
              unoptimized
            />
            <Link href={weeklyMysteryAppHref}>{weeklyMystery.cta}</Link>
          </figure>

          <div>
            <div className="ns-home-section-kicker">Puzzle of the Week</div>
            <h2>Mystery250: Short mysteries. Sharp thinking.</h2>
            <p>
              <strong>This week:</strong> {weeklyMystery.title}
            </p>
            <p>{weeklyMystery.teaser}</p>
          </div>
        </div>
      </section>
    </div>
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
