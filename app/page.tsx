"use client";

import Image from "next/image";
import Link from "next/link";
import { HOME_FEATURES } from "@/app/lib/homeFeatures";
import { FEATURED_STORIES } from "@/app/lib/featuredStories";
import FeaturedStoriesShelf from "@/components/FeaturedStoriesShelf";

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

export default function HomePage() {
  const homeFeatures = HOME_FEATURES.en;

  return (
    <div className="ns-page">
      <section className="ns-home-hero">
        <div className="ns-home-hero-inner">
          <div className="ns-home-hero-copy">
            <h1 className="ns-home-hero-title">
              Enter a story that is already alive
            </h1>

            <p className="ns-home-hero-subtitle">
              Read what others have begun. Continue it. Or start your own.
            </p>

            <div className="ns-home-hero-cta">
              <PillButton href="https://app.nextscenes.org/storylines">
                Start Reading
              </PillButton>
              <PillButton href="https://app.nextscenes.org" variant="ghost">
                Start Writing
              </PillButton>
            </div>

            <div className="ns-home-book-week">
              <div className="ns-home-book-week-label">Book of the Week</div>

              <h2 className="ns-home-book-week-title">Didie</h2>

              <p className="ns-home-book-week-desc">
                A story shaped by memory, distance, grief, and the stubborn pull
                of home.
              </p>

              <Link
                href="https://app.nextscenes.org/reader-view?storyId=69c8ed091023337bec53061c"
                className="ns-home-book-week-link"
              >
                Open book →
              </Link>
            </div>
          </div>

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
            Your browser does not support the audio element.
          </audio>
        </div>
      </section>

      <section className="ns-home-featured">
        <div className="ns-home-featured-head">
          <h2 className="ns-h2">Featured stories</h2>
          <p className="ns-p ns-home-featured-intro">
            Step into stories already alive with voice, mystery, memory, and
            consequence.
          </p>
        </div>

        <FeaturedStoriesShelf stories={FEATURED_STORIES} authorLabel="By" />
      </section>

      <section className="ns-home-live">
        <div className="ns-home-live-grid">
          <Link
            href={homeFeatures.puzzleOfTheWeek.href}
            className="ns-home-live-card"
          >
            <div className="ns-home-live-badge is-puzzle">Puzzle</div>
            <div className="ns-home-live-title">
              {homeFeatures.puzzleOfTheWeek.title}
            </div>
            <div className="ns-home-live-desc">
              {homeFeatures.puzzleOfTheWeek.description}
            </div>
          </Link>

          <Link
            href={homeFeatures.clubSpotlight.href}
            className="ns-home-live-card"
          >
            <div className="ns-home-live-badge is-club">Club</div>
            <div className="ns-home-live-title">
              {homeFeatures.clubSpotlight.title}
            </div>
            <div className="ns-home-live-desc">
              {homeFeatures.clubSpotlight.description}
            </div>
          </Link>
        </div>
      </section>

      <section className="ns-home-month-pick">
        <div className="ns-home-month-pick-card">
          <div className="ns-home-month-pick-label">Book of the Month</div>

          <h2 className="ns-home-month-pick-title">Half of a Yellow Sun</h2>

          <div className="ns-home-month-pick-author">
            By Chimamanda Ngozi Adichie
          </div>

          <p className="ns-home-month-pick-desc">
            A sweeping, intimate novel of love, war, class, and fracture. A
            serious book with fire in its bones.
          </p>

          <p className="ns-home-month-pick-note">
            This monthly shelf brings one distinguished work into view — not to
            crowd the page, but to deepen its literary atmosphere.
          </p>
        </div>
      </section>

      <section className="ns-mystery-section">
        <div className="ns-mystery-shell">
          <div>
            <h2 className="ns-h2">Short mysteries. Sharp thinking.</h2>
            <p className="ns-p">One clear challenge at a time.</p>
          </div>

          <Link className="ns-btn ns-btn-primary" href="/mystery250">
            Try this week’s puzzle
          </Link>
        </div>
      </section>
    </div>
  );
}