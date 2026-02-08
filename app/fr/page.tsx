"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

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
  icon: string;
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

export default function FrHomePage() {
  const slides: Slide[] = useMemo(
    () => [
      {
        image:
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=70",
        eyebrow: "Des histoires qui méritent d’être terminées",
        title: "Lire quelque chose de clair, profond et humain",
        desc: "Pas du bruit. Pas d’outrage. Des histoires construites avec soin, pour que le lecteur puisse faire confiance à ce qu’il ouvre.",
        ctaText: "À propos de NextScenes",
        ctaHref: "/fr/about",
      },
      {
        image:
          "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1600&q=70",
        eyebrow: "Écrire avec structure",
        title: "Construire scène après scène, avec rigueur",
        desc: "Propositions, décisions et canon restent visibles, pour une collaboration honnête, cohérente et responsable.",
        ctaText: "Comment ça marche",
        ctaHref: "/fr/how-it-works",
      },
      {
        image:
          "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1600&q=70",
        eyebrow: "Pour les esprits curieux",
        title: "Mystery250 entraîne l’attention et la patience",
        desc: "De courtes énigmes pour enfants, ados et adultes qui aiment réfléchir clairement.",
        ctaText: "Explorer Mystery250",
        ctaHref: "/fr/mystery250",
      },
    ],
    []
  );

  const bandTiles: BandTile[] = useMemo(
    () => [
      {
        icon: "🧒🏽",
        title: "Coin des enfants",
        desc: "Des mystères doux et une narration guidée qui garde la curiosité propre et lumineuse.",
        href: "/fr/clubs",
        cta: "Découvrir les clubs enfants",
      },
      {
        icon: "🧑🏽‍🎓",
        title: "Ados et jeunes auteurs",
        desc: "Développer le style, gagner en confiance, apprendre la discipline grâce à un retour guidé.",
        href: "/fr/how-it-works",
        cta: "Voir le processus",
      },
      {
        icon: "✍🏽",
        title: "Adultes et écrivains sérieux",
        desc: "Écrire des histoires longues avec continuité, responsabilité et une communauté qui respecte l’auteur.",
        href: "https://app.nextscenes.org",
        cta: "Entrer dans l’App",
      },
      {
        icon: "🏫",
        title: "Écoles et institutions",
        desc: "Un outil créatif structuré pour les classes, bibliothèques, programmes de lecture et groupes culturels.",
        href: "/fr/partners",
        cta: "Partenariats",
      },
    ],
    []
  );

  const todayCards: TodayCard[] = useMemo(
    () => [
      {
        badge: "Histoire de la semaine",
        title: "Une porte vers une intrigue vivante",
        desc: "Une histoire mise en avant qui montre comment NextScenes fait grandir un livre avec clarté et responsabilité.",
        meta: "Mis à jour chaque semaine · Lecture propre",
        href: "/fr/about",
        cta: "Voir comment une histoire grandit",
      },
      {
        badge: "Énigme de la semaine",
        title: "Mystery250 à l’honneur",
        desc: "Une énigme courte pour exercer l’attention, la logique et la patience. Essayez-la, puis explorez la suite.",
        meta: "Nouveau chaque semaine · Tous âges",
        href: "/fr/mystery250",
        cta: "Essayer l’énigme de la semaine",
      },
      {
        badge: "Club à l’honneur",
        title: "Une communauté qui vaut le détour",
        desc: "Enfants, ados, adultes et institutions. Les clubs forment les habitudes et renforcent le métier.",
        meta: "Clubs pour tous les niveaux",
        href: "/fr/clubs",
        cta: "Découvrir les clubs",
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

  return (
    <div className="ns-page">
      {/* HERO */}
      <section className="ns-hero">
        <div className="ns-hero-inner">
          <div className="ns-hero-copy">
            <h1 className="ns-h1">NextScenes</h1>
            <p className="ns-subtitle">
              Un espace sûr, guidé par des valeurs, où les histoires s’écrivent
              avec conscience, se raffinent en communauté, et se lisent à travers
              les générations.
            </p>

            <div className="ns-hero-cta">
              <PillButton href="/fr/how-it-works">Comment ça marche</PillButton>
              <PillButton href="https://app.nextscenes.org" variant="ghost">
                Entrer dans l’App
              </PillButton>
            </div>

            <div className="ns-trust-strip">
              <span>Retour guidé</span>
              <span>Clubs et communauté</span>
              <span>Énigmes Mystery250</span>
              <span>Sécurité et valeurs</span>
            </div>

            <div className="ns-hero-mini">
              <div className="ns-card">
                <h2 className="ns-h2">Ce que vous pouvez faire ici</h2>
                <ul className="ns-list">
                  <li>Lire des histoires d’auteurs du monde entier.</li>
                  <li>Écrire vos scènes et grandir grâce au retour.</li>
                  <li>Rejoindre des clubs pour enfants, ados, adultes et institutions.</li>
                  <li>Aiguiser l’esprit avec Mystery250.</li>
                </ul>
                <div className="ns-card-actions">
                  <Link className="ns-link" href="/fr/mystery250">
                    Explorer Mystery250
                  </Link>
                  <Link className="ns-link" href="/fr/safety">
                    Sécurité et valeurs
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div
            className="ns-carousel"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            aria-label="Carrousel de la section héro"
          >
            <div
              className="ns-carousel-slide"
              style={{ backgroundImage: `url(${active.image})` }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} sur ${total}`}
            >
              <div className="ns-carousel-overlay" />
              <div className="ns-carousel-content">
                <div className="ns-carousel-eyebrow">{active.eyebrow}</div>
                <div className="ns-carousel-title">{active.title}</div>
                <div className="ns-carousel-desc">{active.desc}</div>

                <div className="ns-carousel-cta">
                  {active.ctaHref ? (
                    <Link className="ns-btn ns-btn-primary" href={active.ctaHref}>
                      {active.ctaText || "En savoir plus"}
                    </Link>
                  ) : null}
                  <Link className="ns-btn ns-btn-ghost" href="https://app.nextscenes.org">
                    Entrer dans l’App
                  </Link>
                </div>
              </div>

              <button
                type="button"
                className="ns-carousel-arrow ns-carousel-arrow-left"
                onClick={prev}
                aria-label="Diapositive précédente"
              >
                ‹
              </button>
              <button
                type="button"
                className="ns-carousel-arrow ns-carousel-arrow-right"
                onClick={next}
                aria-label="Diapositive suivante"
              >
                ›
              </button>

              <div className="ns-carousel-dots" role="tablist" aria-label="Sélecteur de diapositives">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={i === index ? "ns-dot ns-dot-active" : "ns-dot"}
                    onClick={() => setIndex(i)}
                    aria-label={`Aller à la diapositive ${i + 1}`}
                    aria-current={i === index ? "true" : "false"}
                  />
                ))}
              </div>
            </div>

            <div className="ns-carousel-hint">
              {paused ? "En pause" : "Lecture automatique"} · Survoler pour mettre en pause
            </div>
          </div>
        </div>
      </section>

      {/* LIVELY BAND */}
      <section className="ns-band" aria-label="Explorer les espaces NextScenes">
        <div className="ns-band-head">
          <h2 className="ns-h2">Choisissez votre chemin</h2>
          <p className="ns-p" style={{ maxWidth: 820 }}>
            NextScenes accueille différents âges et différents objectifs.
            Choisissez une porte, et vous trouverez quelque chose de solide à l’intérieur.
          </p>
        </div>

        <div className="ns-band-grid">
          {bandTiles.map((t) => (
            <Link key={t.title} href={t.href} className="ns-band-tile">
              <div className="ns-band-icon" aria-hidden="true">
                {t.icon}
              </div>
              <div className="ns-band-title">{t.title}</div>
              <div className="ns-band-desc">{t.desc}</div>
              <div className="ns-band-cta">{t.cta} →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* WHAT'S HAPPENING TODAY */}
      <section className="ns-today" aria-label="Ce qui se passe aujourd’hui">
        <div className="ns-today-head">
          <h2 className="ns-h2">Ce qui se passe aujourd’hui</h2>
          <p className="ns-p" style={{ maxWidth: 900, marginBottom: 0 }}>
            Une petite fenêtre sur ce qui vit sur NextScenes. C’est ici qu’un visiteur
            comprend que la plateforme a un rythme, une vraie présence.
          </p>
        </div>

        <div className="ns-today-grid">
          {todayCards.map((c) => (
            <Link key={c.badge} href={c.href} className="ns-today-card">
              <div className="ns-today-badge">{c.badge}</div>
              <div className="ns-today-title">{c.title}</div>
              <div className="ns-today-desc">{c.desc}</div>
              <div className="ns-today-meta">{c.meta}</div>
              <div className="ns-today-cta">{c.cta} →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* REST OF PAGE */}
      <section className="ns-section">
        <h2 className="ns-h2">Comment fonctionne NextScenes</h2>
        <div className="ns-grid-3">
          <div className="ns-card">
            <h3 className="ns-h3">Rejoindre</h3>
            <p className="ns-p">
              Créez un compte, choisissez votre voie, et entrez dans une communauté
              qui prend la narration au sérieux.
            </p>
          </div>
          <div className="ns-card">
            <h3 className="ns-h3">Écrire et lire</h3>
            <p className="ns-p">
              Les lecteurs lisent. Les auteurs construisent des scènes. Les communautés discutent.
              Les histoires grandissent, une bonne décision à la fois.
            </p>
          </div>
          <div className="ns-card">
            <h3 className="ns-h3">Progresser avec le retour</h3>
            <p className="ns-p">
              Le retour est guidé et pratique. On élève le métier, on protège la dignité,
              et on garde la plateforme saine.
            </p>
          </div>
        </div>

        <div className="ns-section-cta">
          <Link className="ns-btn ns-btn-primary" href="/fr/how-it-works">
            Voir le processus complet
          </Link>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">Mystery250</h2>
        <p className="ns-p">
          Des mystères courts qui entraînent l’attention, la logique et la patience.
          Des énigmes simples pour les jeunes esprits, jusqu’aux défis pour adultes
          qui aiment une vraie lutte intellectuelle.
        </p>

        <div className="ns-section-cta">
          <Link className="ns-btn ns-btn-ghost" href="/fr/mystery250">
            En savoir plus
          </Link>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">Pour les écoles, clubs et partenaires</h2>
        <p className="ns-p">
          NextScenes est conçu pour les individus, mais pensé pour servir les communautés :
          classes, bibliothèques, programmes de lecture et institutions culturelles.
        </p>
        <div className="ns-section-cta">
          <Link className="ns-btn ns-btn-primary" href="/fr/partners">
            Partenariats et institutions
          </Link>
          <Link className="ns-btn ns-btn-ghost" href="/fr/contact">
            Contact
          </Link>
        </div>
      </section>

      {/* CSS kept local to avoid destabilizing globals.css */}
      <style jsx global>{`
        .ns-hero {
          padding: 8px 0 2px;
        }
        .ns-hero-inner {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 18px;
          align-items: start;
        }
        .ns-hero-mini {
          margin-top: 14px;
        }
        .ns-card-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 10px;
        }

        /* CAROUSEL */
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
          background: linear-gradient(
            90deg,
            rgba(8, 35, 20, 0.82) 0%,
            rgba(8, 35, 20, 0.52) 52%,
            rgba(8, 35, 20, 0.28) 100%
          );
        }

        .ns-carousel-content {
          position: relative;
          z-index: 2;
          padding: 18px 18px 16px;
          max-width: 520px;
          color: rgba(255, 255, 255, 0.94);
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
          font-size: 24px;
          line-height: 1.15;
          letter-spacing: -0.2px;
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

        /* LIVELY BAND */
        .ns-band {
          margin-top: 18px;
          padding: 16px;
          border-radius: var(--radius);
          border: 1px solid rgba(20, 138, 74, 0.16);
          background: linear-gradient(
              180deg,
              rgba(31, 182, 106, 0.10),
              rgba(255, 255, 255, 0.78)
            ),
            rgba(255, 255, 255, 0.7);
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.06);
        }

        .ns-band-head {
          padding: 4px 4px 10px;
        }

        .ns-band-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
          margin-top: 6px;
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
          border-color: rgba(20, 138, 74, 0.30);
          background: rgba(255, 255, 255, 0.94);
          text-decoration: none;
        }

        .ns-band-icon {
          width: 44px;
          height: 44px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          background: rgba(20, 138, 74, 0.10);
          border: 1px solid rgba(20, 138, 74, 0.16);
          font-size: 20px;
        }

        .ns-band-title {
          margin-top: 10px;
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

        /* WHAT'S HAPPENING TODAY */
        .ns-today {
          margin-top: 18px;
          padding: 16px;
          border-radius: var(--radius);
          border: 1px solid rgba(20, 138, 74, 0.14);
          background: rgba(255, 255, 255, 0.82);
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.05);
        }

        .ns-today-head {
          padding: 4px 4px 10px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .ns-today-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          margin-top: 8px;
        }

        .ns-today-card {
          display: block;
          padding: 14px;
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
          border-color: rgba(20, 138, 74, 0.30);
          background: linear-gradient(
              180deg,
              rgba(31, 182, 106, 0.10),
              rgba(255, 255, 255, 0.96)
            );
          text-decoration: none;
        }

        .ns-today-badge {
          display: inline-block;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(20, 138, 74, 0.20);
          background: rgba(20, 138, 74, 0.10);
          color: rgba(15, 36, 24, 0.86);
          font-size: 12px;
          font-weight: 900;
        }

        .ns-today-title {
          margin-top: 10px;
          font-weight: 950;
          color: rgba(15, 36, 24, 0.94);
          letter-spacing: -0.2px;
        }

        .ns-today-desc {
          margin-top: 6px;
          font-size: 13px;
          line-height: 1.45;
          color: rgba(15, 36, 24, 0.74);
        }

        .ns-today-meta {
          margin-top: 10px;
          font-size: 12px;
          color: rgba(15, 36, 24, 0.60);
        }

        .ns-today-cta {
          margin-top: 10px;
          font-size: 13px;
          font-weight: 900;
          color: var(--accent2);
        }

        @media (max-width: 980px) {
          .ns-hero-inner {
            grid-template-columns: 1fr;
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
        }

        @media (max-width: 560px) {
          .ns-band-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
