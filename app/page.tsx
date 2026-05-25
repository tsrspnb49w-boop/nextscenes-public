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

function PillButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
}) {
  return (
    <Link
      href={href}
      className={
        variant === "primary"
          ? "ns-btn ns-btn-primary"
          : "ns-btn ns-btn-ghost"
      }
    >
      {children}
    </Link>
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
    <div className="ns-page">
      <section className="ns-home-hero">
        <div className="ns-home-hero-inner">
          <div className="ns-home-hero-copy">

            {/* ✅ INTRO (clean, styled via CSS) */}
            <p className="ns-home-hero-intro">
              NextScenes is a creative writing platform where you can read stories,
              write your own, and invite others to contribute to them.
            </p>

            {/* ✅ TITLE (calmer, still strong) */}
            <h1 className="ns-home-hero-title">
              Enter a story that is already alive
            </h1>

            {/* CTA */}
            <div className="ns-home-hero-cta">
              <PillButton href={bookOfTheWeek.href}>Start Reading</PillButton>
              <PillButton href={APP_URL} variant="ghost">
                Start Writing
              </PillButton>
            </div>

            {/* BOOK OF THE WEEK */}
            <div className="ns-home-book-week">
              <div className="ns-home-book-week-label">Featured Book</div>

              <h2 className="ns-home-book-week-title">Didie</h2>

              <p className="ns-home-book-week-desc">
                A story shaped by memory, distance, grief, and the stubborn pull
                of home.
              </p>

              <div className="ns-home-book-status">
                In creation on NextScenes
              </div>

              <Link href={bookOfTheWeek.href} className="ns-home-book-week-link">
                Open book →
              </Link>
            </div>
          </div>

          {/* HERO IMAGE */}
          <div className="ns-home-hero-image-wrap">
            <div className="ns-home-hero-image-frame">
              <Image
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1600&q=70"
                alt="Bookshelf"
                fill
                priority
                sizes="(max-width: 980px) 100vw, 50vw"
                className="ns-home-hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* AUDIO GUIDE */}
      <section className="ns-home-audio-guide">
        <div className="ns-home-audio-card">
          <div className="ns-home-audio-kicker">Start Here</div>

          <h2 className="ns-home-audio-title">How NextScenes Works</h2>

          <p className="ns-home-audio-desc">
            Listen to a short guide on how to explore the site, read stories,
            enter the app, and begin participating as a reader or writer.
          </p>

          <audio controls preload="none" className="ns-home-audio-player">
            <source src="/audio/how-it-works-en.mp3" type="audio/mpeg" />
          </audio>
        </div>
      </section>

      {/* FEATURED */}
      <section className="ns-home-featured">
        <div className="ns-home-featured-head">
          <h2 className="ns-h2">Featured stories</h2>
          <p className="ns-p ns-home-featured-intro">
            Step into stories already alive with voice, mystery, memory, and
            consequence.
          </p>
          <p className="ns-home-featured-note">
            These stories are currently in creation on NextScenes. Readers can
            follow their development as new scenes, chapters, and contributions
            are added.
          </p>
        </div>

        <FeaturedStoriesShelf
          stories={featuredStories}
          authorLabel="By"
          progressLabel="In Progress"
        />
      </section>

      {/* COMMUNITY */}
      <section className="ns-home-live" aria-label="NextScenes community paths">
        <div className="ns-home-live-grid">
          <article className="ns-home-live-card ns-home-info-card">
            <div className="ns-home-live-badge is-club">Club</div>
            <div className="ns-home-live-title">A community that builds seriously</div>
            <div className="ns-home-live-desc">
              Writers, readers, and thoughtful minds gather here to discuss
              stories, improve craft, and grow with discipline.
            </div>

            <details className="ns-home-reveal">
              <summary>See what the Club offers</summary>
              <p>
                Inside the Club, members can follow platform updates, join
                meaningful discussions, support developing stories, and help
                shape a more thoughtful reading and writing culture.
              </p>
            </details>

            <Link href={homeFeatures.clubSpotlight.href} className="ns-home-live-link">
              Enter the Club →
            </Link>
          </article>

          <article className="ns-home-live-card ns-home-info-card">
            <div className="ns-home-live-badge is-writers">Writers</div>
            <div className="ns-home-live-title">For storytellers building with care</div>
            <div className="ns-home-live-desc">
              NextScenes gives writers room to develop stories in public,
              invite contributions, protect canon, and guide their work with
              authority.
            </div>

            <details className="ns-home-reveal">
              <summary>See how writers use NextScenes</summary>
              <p>
                Writers can open stories for collaboration, review proposals,
                approve what becomes canon, and keep control over the direction
                of their work. The author remains the captain.
              </p>
            </details>

            <Link href="/founding-writers-pilot" className="ns-home-live-link">
              Explore the Writers Pilot →
            </Link>
          </article>
        </div>
      </section>

      {/* MONTH PICK */}
      <section className="ns-home-month-pick">
        <div className="ns-home-month-pick-card">
          <div className="ns-home-month-pick-label">Book of the Month</div>

          <h2 className="ns-home-month-pick-title">Half of a Yellow Sun</h2>

          <div className="ns-home-month-pick-author">
            By Chimamanda Ngozi Adichie
          </div>

          <p className="ns-home-month-pick-desc">
            A sweeping, intimate novel of love, war, class, and fracture.
          </p>
        </div>
      </section>

      {/* MYSTERY250 */}
      <section className="ns-mystery-section" aria-label="Mystery250 weekly puzzle">
        <div className="ns-mystery-shell">
          <figure className="ns-mystery-image-card">
            <Image
              src={weeklyMystery.imageSrc}
              alt={weeklyMystery.imageAlt}
              width={720}
              height={405}
              className="ns-mystery-image"
              unoptimized
            />

            <Link className="ns-mystery-image-button" href={weeklyMysteryAppHref}>
              {weeklyMystery.cta}
            </Link>
          </figure>

          <div className="ns-mystery-copy">
            <div className="ns-mystery-kicker">Puzzle of the Week</div>
            <h2 className="ns-h2">Mystery250: Short mysteries. Sharp thinking.</h2>
            <p className="ns-p">
              <strong>This week:</strong> {weeklyMystery.title}
            </p>
            <p className="ns-p">{weeklyMystery.teaser}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
