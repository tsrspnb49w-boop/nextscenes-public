"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HOME_FEATURES } from "@/app/lib/homeFeatures";

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
        variant === "primary" ? "ns-btn ns-btn-primary" : "ns-btn ns-btn-ghost"
      }
    >
      {children}
    </Link>
  );
}

type Slide = {
  image: string;
  eyebrow: string;
  title: string;
  desc: string;
  ctaText?: string;
  ctaHref?: string;
};

type BandTile = {
  image: string;
  imageAlt: string;
  title: string;
  desc: string;
  href: string;
  cta: string;
};

type TodayCard = {
  badge: string;
  title: string;
  desc: string;
  meta: string;
  href: string;
  cta: string;
};

type FlowStep = {
  image: string;
  title: string;
  desc: string;
};

export default function HomePage() {
  const slides: Slide[] = useMemo(
    () => [
      {
        image:
          "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1600&q=70",
        eyebrow: "The story is already moving",
        title: "Continue where another writer stopped",
        desc: "Read what has already been written, then carry the story forward with care and structure.",
        ctaText: "Explore Stories",
        ctaHref: "https://app.nextscenes.org/storylines",
      },
      {
        image:
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=70",
        eyebrow: "Read something worth your time",
        title: "Stories that feel clean, deep, and human",
        desc: "Not noise. Not outrage. Real stories built with thought, so readers can trust what they enter.",
        ctaText: "Explore Stories",
        ctaHref: "https://app.nextscenes.org/storylines",
      },
      {
        image:
          "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1600&q=70",
        eyebrow: "Write with structure",
        title: "Build the next scene one clear decision at a time",
        desc: "Proposals, decisions, and canon stay visible, so collaboration remains honest and coherent.",
        ctaText: "Start Writing",
        ctaHref: "https://app.nextscenes.org",
      },
    ],
    []
  );

  const bandTiles: BandTile[] = useMemo(
    () => [
      {
        image: "/images/kids-corner.webp",
        imageAlt: "Children in a calm reading and storytelling setting",
        title: "Kids Corner",
        desc: "Simple stories and guided creativity for curious young minds.",
        href: "/clubs",
        cta: "Explore Kids",
      },
      {
        image: "/images/teens-writers.webp",
        imageAlt: "Teenagers writing together in a thoughtful library setting",
        title: "Teens and Young Writers",
        desc: "Build skill, learn structure, and grow confidence through guided practice.",
        href: "/how-it-works",
        cta: "Start Learning",
      },
      {
        image: "/images/adult-writers.webp",
        imageAlt: "Adult writers working seriously in a warm library environment",
        title: "Adults and Serious Writers",
        desc: "Write with continuity, discipline, and a community that respects authorship.",
        href: "https://app.nextscenes.org",
        cta: "Enter the Platform",
      },
      {
        image: "/images/schools-institutions.webp",
        imageAlt:
          "Multiracial classroom and library learning environment for schools and institutions",
        title: "Schools and Institutions",
        desc: "Structured storytelling for classrooms, libraries, literacy programs, and cultural groups.",
        href: "/partners",
        cta: "Partnerships",
      },
    ],
    []
  );

  const todayCards: TodayCard[] = useMemo(
    () => [
      {
        badge: HOME_FEATURES.storyOfTheWeek.label,
        title: HOME_FEATURES.storyOfTheWeek.title,
        desc: HOME_FEATURES.storyOfTheWeek.description,
        meta: HOME_FEATURES.storyOfTheWeek.meta,
        href: HOME_FEATURES.storyOfTheWeek.href,
        cta: HOME_FEATURES.storyOfTheWeek.cta,
      },
      {
        badge: HOME_FEATURES.puzzleOfTheWeek.label,
        title: HOME_FEATURES.puzzleOfTheWeek.title,
        desc: HOME_FEATURES.puzzleOfTheWeek.description,
        meta: HOME_FEATURES.puzzleOfTheWeek.meta,
        href: HOME_FEATURES.puzzleOfTheWeek.href,
        cta: HOME_FEATURES.puzzleOfTheWeek.cta,
      },
      {
        badge: HOME_FEATURES.clubSpotlight.label,
        title: HOME_FEATURES.clubSpotlight.title,
        desc: HOME_FEATURES.clubSpotlight.description,
        meta: HOME_FEATURES.clubSpotlight.meta,
        href: HOME_FEATURES.clubSpotlight.href,
        cta: HOME_FEATURES.clubSpotlight.cta,
      },
    ],
    []
  );

  const flowSteps: FlowStep[] = useMemo(
    () => [
      {
        image: "/images/story-hub.jpg",
        title: "Find a story",
        desc: "Browse storylines, open one, and step inside without confusion.",
      },
      {
        image: "/images/select-story.jpg",
        title: "Read or continue",
        desc: "Catch the thread, then continue where the last writer stopped.",
      },
      {
        image: "/images/writer-studio.jpg",
        title: "Build with structure",
        desc: "Write clearly, track decisions, and keep canon visible.",
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = slides.length;
  const active = slides[index];

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 5200);
    return () => window.clearInterval(t);
  }, [paused, total]);

  function prev() {
    setIndex((i) => (i - 1 + total) % total);
  }

  function next() {
    setIndex((i) => (i + 1) % total);
  }

  const flowRef = useRef<HTMLElement | null>(null);
  const [flowInView, setFlowInView] = useState(false);

  useEffect(() => {
    const el = flowRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((e) => e.isIntersecting);
        if (hit) {
          setFlowInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!zoomedImage) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomedImage(null);
    };

    window.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [zoomedImage]);

  return (
    <div className="ns-page">
      <section className="ns-hero">
        <div className="ns-hero-inner">
          <div className="ns-hero-copy">
            <div className="ns-hero-copy-inner">
              <h1 className="ns-h1 ns-hero-title">
                Enter a story. Continue it. Or start your own.
              </h1>

              <p className="ns-hero-lead">
                Stories are already unfolding on NextScenes.
              </p>

              <p className="ns-subtitle ns-hero-subtitle">
                Read what others have written, pick up where they stopped, or write
                the next scene in a place built for serious storytelling.
              </p>

              <div className="ns-hero-cta">
                <PillButton href="https://app.nextscenes.org/storylines">
                  Explore Stories
                </PillButton>
                <PillButton href="/how-it-works" variant="ghost">
                  How it works
                </PillButton>
              </div>

              <div className="ns-hero-note">
                No noise. No confusion. Just stories that move, and people who build
                them carefully.
              </div>

              <div className="ns-trust-strip">
                <span>Read what is already unfolding</span>
                <span>Continue a living story</span>
                <span>Write with structure</span>
                <span>Guided feedback and values</span>
              </div>

              <div className="ns-hero-mini">
                <div className="ns-card ns-hero-mini-card">
                  <h2 className="ns-h2">Start here</h2>
                  <ul className="ns-list">
                    <li>Read a story already in motion.</li>
                    <li>Continue where another writer stopped.</li>
                    <li>Write your own scene and shape what comes next.</li>
                    <li>Join a community that builds stories with care.</li>
                  </ul>
                  <div className="ns-card-actions">
                    <Link className="ns-link" href="https://app.nextscenes.org/storylines">
                      Explore Stories
                    </Link>
                    <Link className="ns-link" href="/mystery250">
                      Try Mystery250
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="ns-carousel"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            aria-label="NextScenes hero carousel"
          >
            <div
              className="ns-carousel-slide"
              style={{ backgroundImage: `url(${active.image})` }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${total}`}
            >
              <div className="ns-carousel-overlay" />
              <div className="ns-carousel-content">
                <div className="ns-carousel-eyebrow">{active.eyebrow}</div>
                <div className="ns-carousel-title">{active.title}</div>
                <div className="ns-carousel-desc">{active.desc}</div>

                <div className="ns-carousel-cta">
                  {active.ctaHref ? (
                    <Link className="ns-btn ns-btn-primary" href={active.ctaHref}>
                      {active.ctaText || "Learn more"}
                    </Link>
                  ) : null}
                  <Link className="ns-btn ns-btn-ghost" href="/how-it-works">
                    How it works
                  </Link>
                </div>
              </div>

              <button
                type="button"
                className="ns-carousel-arrow ns-carousel-arrow-left"
                onClick={prev}
                aria-label="Previous slide"
              >
                ‹
              </button>
              <button
                type="button"
                className="ns-carousel-arrow ns-carousel-arrow-right"
                onClick={next}
                aria-label="Next slide"
              >
                ›
              </button>

              <div className="ns-carousel-dots" role="tablist" aria-label="Slide selector">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={i === index ? "ns-dot ns-dot-active" : "ns-dot"}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === index ? "true" : "false"}
                  />
                ))}
              </div>
            </div>

            <div className="ns-carousel-hint">
              {paused ? "Paused" : "Auto-playing"} · Hover to pause
            </div>
          </div>
        </div>
      </section>

      <section className="ns-today" aria-label="Inside NextScenes">
        <div className="ns-today-head">
          <h2 className="ns-h2">Step inside</h2>
          <p className="ns-p ns-section-intro" style={{ maxWidth: 900, marginBottom: 0 }}>
            See what is happening right now.
          </p>
        </div>

        <div className="ns-today-grid">
          {todayCards.map((c, i) => {
            const isStory = i === 0;

            return (
              <Link
                key={c.badge}
                href={c.href}
                className={isStory ? "ns-today-card ns-today-card-featured" : "ns-today-card"}
              >
                <div className="ns-today-badge">{c.badge}</div>
                <div className="ns-today-title">{c.title}</div>
                <div className="ns-today-desc">{c.desc}</div>
                <div className="ns-today-meta">{c.meta}</div>

                <div className={isStory ? "ns-today-cta ns-today-cta-featured" : "ns-today-cta"}>
                  {c.cta} →
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="ns-band" aria-label="Explore NextScenes areas">
        <div className="ns-band-head">
          <h2 className="ns-h2">Choose your path</h2>
          <p className="ns-p" style={{ maxWidth: 820 }}>
            Start where you feel most at home.
          </p>
        </div>

        <div className="ns-band-grid">
          {bandTiles.map((t) => (
            <Link key={t.title} href={t.href} className="ns-band-tile">
              <div className="ns-band-image">
                <Image
                  src={t.image}
                  alt={t.imageAlt}
                  width={800}
                  height={520}
                  className="ns-band-img"
                  sizes="(max-width: 560px) 100vw, (max-width: 980px) 50vw, 25vw"
                  priority={t.title === "Kids Corner"}
                />
              </div>
              <div className="ns-band-title">{t.title}</div>
              <div className="ns-band-desc">{t.desc}</div>
              <div className="ns-band-cta">{t.cta} →</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="ns-section ns-section-process">
        <h2 className="ns-h2">How it works</h2>
        <div className="ns-grid-3">
          <div className="ns-card ns-process-card">
            <h3 className="ns-h3">Join</h3>
            <p className="ns-p">
              Create an account, choose your path, and step into a platform that
              takes storytelling seriously.
            </p>
          </div>
          <div className="ns-card ns-process-card">
            <h3 className="ns-h3">Read or continue</h3>
            <p className="ns-p">
              Browse stories, open one, and continue where the last writer stopped.
            </p>
          </div>
          <div className="ns-card ns-process-card">
            <h3 className="ns-h3">Improve with feedback</h3>
            <p className="ns-p">
              Build with guided feedback, visible decisions, and a culture that
              values craft and dignity.
            </p>
          </div>
        </div>

        <div className="ns-section-cta ns-process-cta">
          <Link className="ns-btn ns-btn-primary" href="https://app.nextscenes.org/storylines">
            Explore Stories
          </Link>
          <Link className="ns-btn ns-btn-ghost" href="/how-it-works">
            See the full process
          </Link>
        </div>
      </section>

      <section
        ref={(n) => {
          flowRef.current = n;
        }}
        className={flowInView ? "ns-flow ns-flow-in" : "ns-flow"}
        aria-label="How stories grow on NextScenes"
      >
        <div className="ns-flow-head">
          <h2 className="ns-h2">How stories grow on NextScenes</h2>
          <p className="ns-p ns-section-intro" style={{ maxWidth: 920, marginBottom: 0 }}>
            A simple path. No confusion.
          </p>
        </div>

        <div className="ns-flow-row">
          {flowSteps.map((s, i) => (
            <React.Fragment key={s.title}>
              <div className="ns-flow-item-wrap">
                <div className="ns-flow-step-badge">Step {i + 1}</div>
                <div className="ns-flow-card" style={{ transitionDelay: `${i * 140}ms` }}>
                  <div
                    className="ns-flow-shot"
                    style={{ backgroundImage: `url(${s.image})` }}
                    role="img"
                    aria-label={s.title}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!zoomedImage) setZoomedImage(s.image);
                    }}
                  />
                  <div className="ns-flow-title">{s.title}</div>
                  <div className="ns-flow-desc">{s.desc}</div>
                </div>
              </div>

              {i < flowSteps.length - 1 ? (
                <div className="ns-flow-arrow" aria-hidden="true">
                  <span className="ns-flow-arrow-line" />
                  <span className="ns-flow-arrow-glyph">→</span>
                </div>
              ) : null}
            </React.Fragment>
          ))}
        </div>

        <div className="ns-flow-cta">
          <Link className="ns-btn ns-btn-primary" href="https://app.nextscenes.org/storylines">
            Explore Stories
          </Link>
          <Link className="ns-btn ns-btn-ghost" href="/how-it-works">
            Learn the workflow
          </Link>
        </div>
      </section>

      <section className="ns-section ns-mystery-section">
        <div className="ns-mystery-inner">
          <div className="ns-mystery-copy">
            <div className="ns-mystery-kicker">For curious minds</div>
            <h2 className="ns-h2">Sharpen your mind</h2>
            <p className="ns-p">
              Short mysteries. Clear thinking. Immediate challenge.
            </p>

            <div className="ns-mystery-points">
              <span>All ages</span>
              <span>Weekly challenge rhythm</span>
              <span>Logic and reading discipline</span>
            </div>

            <div className="ns-section-cta ns-mystery-cta">
              <Link className="ns-btn ns-btn-primary" href="/mystery250">
                Try this week’s puzzle
              </Link>
              <Link className="ns-btn ns-btn-ghost" href="/mystery250">
                Explore Mystery250
              </Link>
            </div>
          </div>

          <div className="ns-mystery-panel" aria-hidden="true">
            <div className="ns-mystery-panel-card">
              <div className="ns-mystery-badge">Puzzle of the Week</div>
              <div className="ns-mystery-panel-title">Attention. Logic. Patience.</div>
              <div className="ns-mystery-panel-desc">
                A calm mental workout for readers, writers, students, and institutions.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ns-section ns-partners-section">
        <div className="ns-partners-shell">
          <div className="ns-partners-copy">
            <div className="ns-partners-kicker">Institutional use</div>
            <h2 className="ns-h2">For schools and partners</h2>
            <p className="ns-p">
              NextScenes supports classrooms, clubs, and institutions that take
              storytelling seriously.
            </p>
          </div>

          <div className="ns-section-cta ns-partners-cta">
            <Link className="ns-btn ns-btn-primary" href="/partners">
              Partnerships and institutions
            </Link>
            <Link className="ns-btn ns-btn-ghost" href="/contact">
              Contact
            </Link>
          </div>
        </div>
      </section>

      {zoomedImage ? (
        <div
          className="ns-lightbox"
          onClick={(e) => {
            e.stopPropagation();
            setZoomedImage(null);
          }}
          role="dialog"
          aria-modal="true"
        >
          <img
            className="ns-lightbox-img"
            src={zoomedImage}
            alt="Enlarged screenshot"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}

      <style jsx global>{`
        .ns-hero {
          padding: 10px 0 6px;
          position: relative;
        }

        .ns-hero::after {
          content: "";
          display: block;
          margin-top: 20px;
          height: 28px;
          border-radius: 18px;
          background: linear-gradient(
            180deg,
            rgba(15, 23, 42, 0) 0%,
            rgba(15, 23, 42, 0.03) 100%
          );
          pointer-events: none;
        }

        .ns-hero-inner {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 24px;
          align-items: start;
        }

        .ns-hero-copy-inner {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .ns-hero-title {
          margin-bottom: 0;
          max-width: 12ch;
        }

        .ns-hero-lead {
          margin: 0;
          font-size: clamp(1.18rem, 1rem + 0.6vw, 1.6rem);
          line-height: 1.2;
          font-weight: 900;
          letter-spacing: -0.02em;
          color: rgba(15, 36, 24, 0.96);
          max-width: 720px;
        }

        .ns-hero-subtitle {
          max-width: 780px;
          margin: 0;
        }

        .ns-hero-cta {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 2px;
        }

        .ns-hero-note {
          font-size: 13px;
          line-height: 1.45;
          font-weight: 800;
          color: rgba(15, 36, 24, 0.68);
          margin-top: -2px;
        }

        .ns-hero-mini {
          margin-top: 4px;
        }

        .ns-hero-mini-card {
          background: rgba(255, 255, 255, 0.84);
          border: 1px solid rgba(20, 138, 74, 0.12);
          box-shadow: 0 12px 28px rgba(15, 23, 42, 0.05);
        }

        .ns-card-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 10px;
        }

        .ns-carousel {
          width: 100%;
        }

        .ns-carousel-slide {
          position: relative;
          border-radius: var(--radius);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.22);
          box-shadow: 0 14px 30px rgba(0, 0, 0, 0.16);
          min-height: 420px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .ns-carousel-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              180deg,
              rgba(8, 35, 20, 0.10) 0%,
              rgba(8, 35, 20, 0.22) 42%,
              rgba(8, 35, 20, 0.52) 100%
            ),
            linear-gradient(
              90deg,
              rgba(8, 35, 20, 0.84) 0%,
              rgba(8, 35, 20, 0.56) 52%,
              rgba(8, 35, 20, 0.24) 100%
            );
        }

        .ns-carousel-content {
          position: absolute;
          bottom: 28px;
          left: 28px;
          z-index: 2;
          padding: 18px 20px 18px;
          max-width: 520px;
          color: rgba(255, 255, 255, 0.94);
          border-radius: 18px;
          background: rgba(8, 35, 20, 0.26);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.18);
          backdrop-filter: blur(4px);
        }

        .ns-carousel-eyebrow {
          display: inline-block;
          font-weight: 900;
          font-size: 12px;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          padding: 7px 10px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }

        .ns-carousel-title {
          margin-top: 10px;
          font-weight: 950;
          font-size: 26px;
          line-height: 1.18;
          letter-spacing: -0.2px;
          max-width: 13ch;
        }

        .ns-carousel-desc {
          margin-top: 10px;
          font-size: 14px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.86);
        }

        .ns-carousel-cta {
          margin-top: 14px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .ns-carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 3;
          width: 40px;
          height: 40px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.22);
          background: rgba(0, 0, 0, 0.18);
          color: #ffffff;
          font-size: 22px;
          font-weight: 900;
          cursor: pointer;
          display: grid;
          place-items: center;
          user-select: none;
        }

        .ns-carousel-arrow:hover {
          background: rgba(255, 255, 255, 0.12);
        }

        .ns-carousel-arrow-left {
          left: 12px;
        }

        .ns-carousel-arrow-right {
          right: 12px;
        }

        .ns-carousel-dots {
          position: absolute;
          left: 16px;
          right: 16px;
          bottom: 14px;
          z-index: 3;
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .ns-dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.35);
          background: rgba(255, 255, 255, 0.18);
          cursor: pointer;
        }

        .ns-dot:hover {
          background: rgba(255, 255, 255, 0.28);
        }

        .ns-dot-active {
          width: 22px;
          background: rgba(255, 255, 255, 0.82);
          border-color: rgba(255, 255, 255, 0.82);
        }

        .ns-carousel-hint {
          margin-top: 10px;
          font-size: 12px;
          color: rgba(15, 36, 24, 0.65);
          text-align: right;
        }

        .ns-band {
          margin-top: 28px;
          padding: 18px;
          border-radius: var(--radius);
          border: 1px solid rgba(20, 138, 74, 0.16);
          background: linear-gradient(
              180deg,
              rgba(31, 182, 106, 0.1),
              rgba(255, 255, 255, 0.78)
            ),
            rgba(255, 255, 255, 0.7);
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.06);
        }

        .ns-band-head {
          padding: 4px 4px 12px;
        }

        .ns-band-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
          margin-top: 8px;
        }

        .ns-band-tile {
          display: block;
          padding: 14px;
          border-radius: 16px;
          border: 1px solid rgba(20, 138, 74, 0.16);
          background: rgba(255, 255, 255, 0.86);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.04);
          text-decoration: none;
          transition: transform 140ms ease, border-color 140ms ease, background 140ms ease;
        }

        .ns-band-tile:hover {
          transform: translateY(-2px);
          border-color: rgba(20, 138, 74, 0.3);
          background: rgba(255, 255, 255, 0.94);
          text-decoration: none;
        }

        .ns-band-image {
          width: 100%;
          height: 160px;
          min-height: 160px;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 12px;
          border: 1px solid rgba(0, 0, 0, 0.06);
          background: rgba(255, 255, 255, 0.5);
          isolation: isolate;
        }

        .ns-band-img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .ns-band-title {
          margin-top: 2px;
          font-weight: 950;
          color: rgba(15, 36, 24, 0.94);
          letter-spacing: -0.2px;
        }

        .ns-band-desc {
          margin-top: 6px;
          font-size: 13px;
          line-height: 1.45;
          color: rgba(15, 36, 24, 0.74);
        }

        .ns-band-cta {
          margin-top: 10px;
          font-size: 13px;
          font-weight: 900;
          color: var(--accent2);
        }

        .ns-today {
          margin-top: 22px;
          padding: 16px;
          border-radius: var(--radius);
          border: 1px solid rgba(20, 138, 74, 0.14);
          background: rgba(255, 255, 255, 0.82);
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.05);
        }

        .ns-today-head {
          padding: 4px 4px 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .ns-section-intro {
          color: rgba(15, 36, 24, 0.76);
        }

        .ns-today-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          margin-top: 8px;
        }

        .ns-today-card {
          display: block;
          padding: 14px 14px 13px;
          border-radius: 16px;
          border: 1px solid rgba(20, 138, 74, 0.16);
          background: linear-gradient(
            180deg,
            rgba(31, 182, 106, 0.08),
            rgba(255, 255, 255, 0.92)
          );
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.04);
          text-decoration: none;
          transition: transform 140ms ease, border-color 140ms ease, background 140ms ease;
        }

        .ns-today-card:hover {
          transform: translateY(-2px);
          border-color: rgba(20, 138, 74, 0.3);
          background: linear-gradient(
            180deg,
            rgba(31, 182, 106, 0.1),
            rgba(255, 255, 255, 0.96)
          );
          text-decoration: none;
        }

        .ns-today-card-featured {
          border-color: rgba(20, 138, 74, 0.22);
          background: linear-gradient(
            180deg,
            rgba(31, 182, 106, 0.12),
            rgba(255, 255, 255, 0.97)
          );
          box-shadow: 0 12px 26px rgba(15, 36, 24, 0.06);
        }

        .ns-today-card-featured:hover {
          transform: translateY(-3px);
          border-color: rgba(20, 138, 74, 0.34);
          background: linear-gradient(
            180deg,
            rgba(31, 182, 106, 0.15),
            rgba(255, 255, 255, 0.99)
          );
          box-shadow: 0 16px 30px rgba(15, 36, 24, 0.08);
        }

        .ns-today-badge {
          display: inline-block;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(20, 138, 74, 0.2);
          background: rgba(20, 138, 74, 0.1);
          color: rgba(15, 36, 24, 0.86);
          font-size: 12px;
          font-weight: 900;
        }

        .ns-today-title {
          margin-top: 10px;
          font-weight: 950;
          color: rgba(15, 36, 24, 0.94);
          letter-spacing: -0.2px;
          line-height: 1.2;
        }

        .ns-today-desc {
          margin-top: 6px;
          font-size: 13px;
          line-height: 1.42;
          color: rgba(15, 36, 24, 0.74);
        }

        .ns-today-meta {
          margin-top: 8px;
          font-size: 12px;
          color: rgba(15, 36, 24, 0.6);
        }

        .ns-today-cta {
          margin-top: 10px;
          font-size: 13px;
          font-weight: 900;
          color: var(--accent2);
        }

        .ns-today-cta-featured {
          margin-top: 14px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          width: fit-content;
          padding: 10px 14px;
          border-radius: 999px;
          border: 1px solid rgba(20, 138, 74, 0.22);
          background: rgba(20, 138, 74, 0.1);
          color: rgba(15, 36, 24, 0.96);
          font-size: 14px;
          font-weight: 950;
          letter-spacing: -0.1px;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .ns-today-card-featured:hover .ns-today-cta-featured {
          background: rgba(20, 138, 74, 0.14);
          border-color: rgba(20, 138, 74, 0.3);
        }

        .ns-section-process {
          margin-top: 18px;
        }

        .ns-process-card {
          padding-bottom: 12px;
        }

        .ns-process-cta {
          margin-top: 10px;
          padding: 16px 18px;
          border-radius: 20px;
          border: 1px solid rgba(20, 138, 74, 0.14);
          background: rgba(255, 255, 255, 0.82);
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.04);
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .ns-flow {
          margin-top: 22px;
          padding: 18px;
          border-radius: var(--radius);
          border: 1px solid rgba(20, 138, 74, 0.14);
          background: linear-gradient(
              180deg,
              rgba(31, 182, 106, 0.06),
              rgba(255, 255, 255, 0.9)
            ),
            rgba(255, 255, 255, 0.86);
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.05);
        }

        .ns-flow-head {
          padding: 4px 4px 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .ns-flow-row {
          display: grid;
          grid-template-columns: 1fr auto 1fr auto 1fr;
          gap: 12px;
          align-items: start;
          margin-top: 10px;
        }

        .ns-flow-item-wrap {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .ns-flow-step-badge {
          display: inline-flex;
          align-self: flex-start;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(20, 138, 74, 0.1);
          border: 1px solid rgba(20, 138, 74, 0.16);
          font-size: 12px;
          font-weight: 900;
          color: rgba(15, 36, 24, 0.8);
          letter-spacing: 0.3px;
        }

        .ns-flow-card {
          border-radius: 16px;
          border: 1px solid rgba(20, 138, 74, 0.12);
          background: rgba(255, 255, 255, 0.94);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.04);
          padding: 12px;
          text-decoration: none;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 520ms ease, transform 520ms ease, border-color 160ms ease, box-shadow 160ms ease;
        }

        .ns-flow-card:hover {
          border-color: rgba(20, 138, 74, 0.22);
          box-shadow: 0 12px 22px rgba(0, 0, 0, 0.06);
        }

        .ns-flow-in .ns-flow-card {
          opacity: 1;
          transform: translateY(0);
        }

        .ns-flow-shot {
          width: 100%;
          height: 170px;
          border-radius: 12px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          border: 1px solid rgba(0, 0, 0, 0.06);
          cursor: zoom-in;
        }

        .ns-flow-title {
          margin-top: 10px;
          font-weight: 950;
          color: rgba(15, 36, 24, 0.94);
          letter-spacing: -0.2px;
        }

        .ns-flow-desc {
          margin-top: 6px;
          font-size: 13px;
          line-height: 1.45;
          color: rgba(15, 36, 24, 0.74);
        }

        .ns-flow-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          min-width: 28px;
          padding-top: 132px;
          font-size: 18px;
          font-weight: 950;
          color: rgba(15, 36, 24, 0.58);
          user-select: none;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 520ms ease, transform 520ms ease;
        }

        .ns-flow-arrow-line {
          display: block;
          width: 16px;
          height: 1px;
          background: rgba(15, 36, 24, 0.26);
        }

        .ns-flow-arrow-glyph {
          line-height: 1;
        }

        .ns-flow-in .ns-flow-arrow {
          opacity: 1;
          transform: translateY(0);
        }

        .ns-flow-cta {
          margin-top: 14px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          padding: 0 4px;
        }

        .ns-mystery-section {
          margin-top: 22px;
          padding: 18px;
          border-radius: var(--radius);
          border: 1px solid rgba(20, 138, 74, 0.14);
          background: linear-gradient(
              180deg,
              rgba(31, 182, 106, 0.07),
              rgba(255, 255, 255, 0.9)
            ),
            rgba(255, 255, 255, 0.86);
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.05);
        }

        .ns-mystery-inner {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 18px;
          align-items: stretch;
        }

        .ns-mystery-kicker,
        .ns-partners-kicker {
          display: inline-block;
          margin-bottom: 8px;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(20, 138, 74, 0.1);
          border: 1px solid rgba(20, 138, 74, 0.16);
          font-size: 12px;
          font-weight: 900;
          color: rgba(15, 36, 24, 0.82);
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }

        .ns-mystery-points {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 12px;
        }

        .ns-mystery-points span {
          display: inline-flex;
          align-items: center;
          padding: 7px 10px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(20, 138, 74, 0.14);
          font-size: 12px;
          font-weight: 800;
          color: rgba(15, 36, 24, 0.72);
        }

        .ns-mystery-cta {
          margin-top: 14px;
          justify-content: flex-start;
        }

        .ns-mystery-panel {
          display: flex;
          align-items: stretch;
        }

        .ns-mystery-panel-card {
          width: 100%;
          min-height: 100%;
          border-radius: 22px;
          padding: 22px;
          border: 1px solid rgba(20, 138, 74, 0.14);
          background:
            linear-gradient(
              180deg,
              rgba(8, 35, 20, 0.04),
              rgba(8, 35, 20, 0.12)
            ),
            linear-gradient(
              135deg,
              rgba(31, 182, 106, 0.14),
              rgba(255, 255, 255, 0.88)
            );
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .ns-mystery-badge {
          display: inline-block;
          align-self: flex-start;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(20, 138, 74, 0.16);
          font-size: 12px;
          font-weight: 900;
          color: rgba(15, 36, 24, 0.78);
        }

        .ns-mystery-panel-title {
          margin-top: 16px;
          font-size: clamp(1.3rem, 1.1rem + 0.6vw, 1.8rem);
          line-height: 1.12;
          font-weight: 950;
          letter-spacing: -0.02em;
          color: rgba(15, 36, 24, 0.94);
          max-width: 12ch;
        }

        .ns-mystery-panel-desc {
          margin-top: 10px;
          max-width: 34ch;
          font-size: 14px;
          line-height: 1.5;
          color: rgba(15, 36, 24, 0.72);
        }

        .ns-partners-section {
          margin-top: 22px;
        }

        .ns-partners-shell {
          border-radius: 24px;
          padding: 20px 22px;
          border: 1px solid rgba(20, 138, 74, 0.16);
          background:
            linear-gradient(
              180deg,
              rgba(31, 182, 106, 0.06),
              rgba(255, 255, 255, 0.9)
            ),
            rgba(255, 255, 255, 0.86);
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.05);
        }

        .ns-partners-copy .ns-p {
          max-width: 900px;
        }

        .ns-partners-cta {
          margin-top: 14px;
          padding: 14px 16px;
          border-radius: 18px;
          border: 1px solid rgba(20, 138, 74, 0.12);
          background: rgba(255, 255, 255, 0.82);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .ns-lightbox {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0, 0, 0, 0.82);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
          animation: nsFadeIn 160ms ease;
          cursor: zoom-out;
        }

        .ns-lightbox-img {
          max-width: 92vw;
          max-height: 92vh;
          border-radius: 12px;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
          animation: nsZoomIn 160ms ease;
          background: rgba(255, 255, 255, 0.02);
          cursor: default;
        }

        @keyframes nsFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes nsZoomIn {
          from {
            transform: scale(0.96);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @media (max-width: 980px) {
          .ns-hero-inner,
          .ns-mystery-inner {
            grid-template-columns: 1fr;
          }

          .ns-hero-copy-inner {
            gap: 12px;
          }

          .ns-carousel-slide {
            min-height: 360px;
          }

          .ns-carousel-content {
            max-width: 640px;
          }

          .ns-band-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .ns-today-grid {
            grid-template-columns: 1fr;
          }

          .ns-flow-row {
            grid-template-columns: 1fr;
          }

          .ns-flow-arrow {
            display: none;
          }

          .ns-flow-shot {
            height: 190px;
          }
        }

        @media (max-width: 560px) {
          .ns-band-grid {
            grid-template-columns: 1fr;
          }

          .ns-hero::after {
            height: 18px;
            margin-top: 14px;
          }

          .ns-hero-lead {
            font-size: 1.12rem;
          }

          .ns-band-image {
            height: 180px;
            min-height: 180px;
          }

          .ns-carousel-content {
            left: 16px;
            right: 16px;
            bottom: 20px;
            max-width: none;
            padding: 16px;
          }

          .ns-carousel-title {
            font-size: 23px;
          }

          .ns-mystery-panel-card,
          .ns-partners-shell {
            padding: 18px;
          }
        }
      `}</style>
    </div>
  );
}
