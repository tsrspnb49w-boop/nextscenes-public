import Image from "next/image";
import Link from "next/link";
import { HOME_FEATURES } from "@/app/lib/homeFeatures";
import { FEATURED_STORIES, type FeaturedStory } from "@/app/lib/featuredStories";
import FeaturedStoriesShelf from "@/components/FeaturedStoriesShelf";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.nextscenes.org";

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
};

type PublicHomepageData = {
  featuredStories: FeaturedStory[];
  weeklyMystery: NormalizedWeeklyMystery;
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
        featuredStories: FEATURED_STORIES,
        weeklyMystery: FALLBACK_WEEKLY_MYSTERY,
      };
    }

    const data = (await res.json()) as PublicHomepageResponse;
    const stories = Array.isArray(data?.featuredStories)
      ? data.featuredStories
      : [];

    return {
      featuredStories: stories.length ? stories : FEATURED_STORIES,
      weeklyMystery: normalizeWeeklyMystery(data?.weeklyMystery),
    };
  } catch {
    return {
      featuredStories: FEATURED_STORIES,
      weeklyMystery: FALLBACK_WEEKLY_MYSTERY,
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

function BookOfMonthCard() {
  return (
    <section className="ns-home-book-month-strip" aria-label="Book of the month">
      <div className="ns-home-container">
        <article className="ns-home-book-month-card">
          <div className="ns-home-book-month-copy">
            <div className="ns-home-section-kicker">Book of the Month</div>
            <h2>Half of a Yellow Sun</h2>
            <p className="ns-home-book-month-author">By Chimamanda Ngozi Adichie</p>
            <p className="ns-home-book-month-desc">
              A sweeping, intimate novel of love, war, class, and fracture.
            </p>
          </div>
          <div className="ns-home-book-month-cover" aria-hidden="true">
            <Image
              src="/images/home/half-yellow-sun.jpg"
              alt=""
              width={150}
              height={230}
              className="ns-home-book-month-cover-img"
              unoptimized
            />
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

  return (
    <div className="ns-page ns-public-home">
      <section className="ns-home-hero-v2">
        <div className="ns-home-hero-backdrop" aria-hidden="true" />
        <div className="ns-home-hero-shade" aria-hidden="true" />

        <div className="ns-home-container ns-home-hero-grid">
          <div className="ns-home-hero-copy-v2">
            <div className="ns-home-eyebrow">Read. Follow. Create. Grow.</div>

            <h1>Enter stories that are already alive, while they are still becoming books.</h1>

            <p className="ns-home-hero-lede">
              NextScenes is a literary home where you can read stories, write your own,
              invite others to contribute with care, follow stories in creation, and
              discover books that began their journey here.
            </p>

            <div className="ns-home-hero-actions">
              <HomeButton href={bookOfTheWeek.href}>Read Stories →</HomeButton>
              <HomeButton href={APP_URL} tone="secondary">
                Start Writing
              </HomeButton>
            </div>

            <div className="ns-home-featured-book-card">
              <div className="ns-home-section-kicker">NextScenes today</div>
              <h2>Stories in development. Books taking shape.</h2>
              <p>
                Follow selected works while they are being shaped, discover published titles
                connected to NextScenes, and enter a calm literary space built around author
                control, reader curiosity, and thoughtful collaboration.
              </p>
              <div className="ns-home-featured-book-actions">
                <span>In-development and published works are clearly marked</span>
                <Link href={APP_URL}>Enter NextScenes →</Link>
              </div>
            </div>
          </div>

          <aside className="ns-home-shelf-panel" aria-label="Featured shelf">
            <div className="ns-home-shelf-inner">
              <div className="ns-home-shelf-head">
                <div>
                  <div className="ns-home-section-kicker">Featured Shelf</div>
                  <h2>Books and stories</h2>
                </div>
                <span>Simple public view</span>
              </div>

              <FeaturedStoriesShelf
                stories={featuredStories}
                authorLabel="By"
                progressLabel="In Development"
                storyCtaLabel="Open story"
                publicationCtaLabel="View publication"
                publicationAmazonCtaLabel="View on Amazon"
              />
            </div>
          </aside>
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
            text="Create, polish, collaborate, approve proposals, and manage your story from a private writing workspace."
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
                Listen to a short guide on how to explore the site, read stories,
                enter the app, and begin participating as a reader or writer.
              </p>
            </div>

            <audio controls preload="none" className="ns-home-audio-player">
              <source src="/audio/how-it-works-en.mp3" type="audio/mpeg" />
            </audio>
          </div>
        </div>
      </section>

      <BookOfMonthCard />

      <section className="ns-home-development">
        <div className="ns-home-container ns-home-development-grid">
          <div className="ns-home-development-copy">
            <div className="ns-home-section-kicker">From draft to destination</div>
            <h2>Readers see the story. Writers keep control of the journey.</h2>
            <p>
              NextScenes keeps the public reading experience calm and clear. Visitors can
              discover selected stories, see which works are still growing, and recognize
              books that have already moved into publication.
            </p>

            <div className="ns-home-check-list">
              <span>Stories presented with covers, titles, and clear actions</span>
              <span>Published books separated from works still in progress</span>
              <span>Readers welcomed without technical clutter</span>
              <span>Author control, trust, and rights kept visible</span>
            </div>
          </div>

          <div className="ns-home-workshop-card">
            <div className="ns-home-workshop-visual" aria-hidden="true" />
            <div className="ns-home-workshop-content">
              <h3>A calm reading room in front. A serious creative workshop behind it.</h3>
              <p>
                The public side is for discovery, reading, and trust. The writer side is
                where authors shape scenes, review contributions, and protect the direction
                of their work.
              </p>
              <div className="ns-home-mini-checks">
                <span>Visitors meet stories without confusion.</span>
                <span>Authors keep the tools and decisions where they belong.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ns-home-feels">
        <div className="ns-home-container ns-home-feels-grid">
          <div>
            <div className="ns-home-section-kicker">How NextScenes feels</div>
            <h2>A reading room in front. A serious workshop behind it.</h2>
          </div>

          <div className="ns-home-feels-cards">
            <article>
              <BookIcon />
              <h3>Readers enter easily</h3>
              <p>They read, follow, rate, and return without learning platform mechanics first.</p>
            </article>
            <article>
              <PenIcon />
              <h3>Writers work deeply</h3>
              <p>The advanced tools remain available, but only where they are useful.</p>
            </article>
            <article>
              <GlobeIcon />
              <h3>The public sees clarity</h3>
              <p>In progress, completed, and published works are presented with dignity.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="ns-home-mystery-feature" aria-label="Mystery250 weekly puzzle">
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
