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
  const homeFeatures = HOME_FEATURES.fr;
  const bookOfTheWeek = homeFeatures.bookOfTheWeek;

  return (
    <div className="ns-page">
      <section className="ns-home-hero">
        <div className="ns-home-hero-inner">
          <div className="ns-home-hero-copy">
            <p className="ns-home-hero-intro">
              NextScenes est une plateforme d’écriture créative où vous pouvez
              lire des histoires, écrire les vôtres et inviter d’autres à y
              contribuer.
            </p>

            <h1 className="ns-home-hero-title">
              Entrez dans une histoire déjà vivante
            </h1>

            <div className="ns-home-hero-cta">
              <PillButton href={bookOfTheWeek.href}>
                Commencer à lire
              </PillButton>
              <PillButton href="https://app.nextscenes.org" variant="ghost">
                Commencer à écrire
              </PillButton>
            </div>

            <div className="ns-home-book-week">
              <div className="ns-home-book-week-label">Livre de la semaine</div>

              <h2 className="ns-home-book-week-title">Didie</h2>

              <p className="ns-home-book-week-desc">
                Une histoire façonnée par la mémoire, la distance, le deuil et
                l’appel obstiné du foyer.
              </p>

              <Link href={bookOfTheWeek.href} className="ns-home-book-week-link">
                Ouvrir le livre →
              </Link>
            </div>
          </div>

          <div className="ns-home-hero-image-wrap">
            <div className="ns-home-hero-image-frame">
              <Image
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1600&q=70"
                alt="Étagère de livres"
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
          <div className="ns-home-audio-kicker">Commencer</div>

          <h2 className="ns-home-audio-title">
            Comment utiliser NextScenes
          </h2>

          <p className="ns-home-audio-desc">
            Écoutez un court guide pour comprendre comment explorer le site,
            lire les histoires, entrer dans l’application et participer comme
            lecteur ou auteur.
          </p>

          <audio controls preload="none" className="ns-home-audio-player">
            <source src="/audio/how-it-works-fr.mp3" type="audio/mpeg" />
          </audio>
        </div>
      </section>

      <section className="ns-home-featured">
        <div className="ns-home-featured-head">
          <h2 className="ns-h2">Histoires à découvrir</h2>
          <p className="ns-p ns-home-featured-intro">
            Entrez dans des récits déjà vivants, portés par la mémoire, le
            mystère et leurs conséquences.
          </p>
        </div>

        <FeaturedStoriesShelf stories={FEATURED_STORIES} authorLabel="Par" />
      </section>

      <section className="ns-home-live">
        <div className="ns-home-live-grid">
          <Link
            href={homeFeatures.puzzleOfTheWeek.href}
            className="ns-home-live-card"
          >
            <div className="ns-home-live-badge is-puzzle">Énigme</div>
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
          <div className="ns-home-month-pick-label">Livre du mois</div>

          <h2 className="ns-home-month-pick-title">Half of a Yellow Sun</h2>

          <div className="ns-home-month-pick-author">
            Par Chimamanda Ngozi Adichie
          </div>

          <p className="ns-home-month-pick-desc">
            Un roman ample et intime sur l’amour, la guerre, les classes
            sociales et les fractures humaines.
          </p>
        </div>
      </section>

      <section className="ns-mystery-section">
        <div className="ns-mystery-shell">
          <div>
            <h2 className="ns-h2">Mystères courts. Esprit affûté.</h2>
            <p className="ns-p">Un défi clair à la fois.</p>
          </div>

          <Link className="ns-btn ns-btn-primary" href="/mystery250">
            Essayez l’énigme de la semaine
          </Link>
        </div>
      </section>
    </div>
  );
}