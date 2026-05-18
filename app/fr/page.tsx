import Image from "next/image";
import Link from "next/link";
import { HOME_FEATURES } from "@/app/lib/homeFeatures";
import { FEATURED_STORIES, type FeaturedStory } from "@/app/lib/featuredStories";
import FeaturedStoriesShelf from "@/components/FeaturedStoriesShelf";


const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.nextscenes.org";

const WEEKLY_MYSTERY = {
  ref: "the-one-way-footprints",
  title: "Les empreintes à sens unique",
  teaser:
    "Neige fraîche. Une seule piste vers une grange verrouillée. Aucune trace de retour. Personne à l’intérieur. Saurez-vous résoudre l’énigme avant la révélation ?",
  imageSrc: "/images/mystery250/the-one-way-footprints.png",
  imageAlt:
    "Un fermier observe une seule piste d’empreintes menant à une grange verrouillée après une chute de neige",
};

function getWeeklyMysteryAppHref() {
  const params = new URLSearchParams({ mystery: WEEKLY_MYSTERY.ref });
  return `${APP_URL}/mystery250?${params.toString()}`;
}

type PublicHomepageResponse = {
  ok?: boolean;
  featuredStories?: FeaturedStory[];
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

async function getFeaturedStories(language: "en" | "fr") {
  const apiBase = getPublicHomepageApiBase();

  try {
    const res = await fetch(
      `${apiBase}/api/public-homepage?language=${encodeURIComponent(language)}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) return FEATURED_STORIES;

    const data = (await res.json()) as PublicHomepageResponse;
    const stories = Array.isArray(data?.featuredStories)
      ? data.featuredStories
      : [];

    return stories.length ? stories : FEATURED_STORIES;
  } catch {
    return FEATURED_STORIES;
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
  const homeFeatures = HOME_FEATURES.fr;
  const bookOfTheWeek = homeFeatures.bookOfTheWeek;
  const weeklyMysteryAppHref = getWeeklyMysteryAppHref();
  const featuredStories = await getFeaturedStories("fr");

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
              <PillButton href={APP_URL} variant="ghost">
                Commencer à écrire
              </PillButton>
            </div>

            <div className="ns-home-book-week">
              <div className="ns-home-book-week-label">Livre en avant</div>

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

        <FeaturedStoriesShelf stories={featuredStories} authorLabel="Par" />
      </section>

      <section className="ns-home-live" aria-label="Parcours communautaires de NextScenes">
        <div className="ns-home-live-grid">
          <article className="ns-home-live-card ns-home-info-card">
            <div className="ns-home-live-badge is-club">Club</div>
            <div className="ns-home-live-title">Une communauté qui construit avec sérieux</div>
            <div className="ns-home-live-desc">
              Auteurs, lecteurs et esprits attentifs se retrouvent pour parler
              des histoires, améliorer l’écriture et progresser avec discipline.
            </div>

            <details className="ns-home-reveal">
              <summary>Voir ce que propose le Club</summary>
              <p>
                Dans le Club, les membres peuvent suivre les nouvelles de la
                plateforme, prendre part à des discussions utiles, soutenir les
                histoires en cours de création et aider à bâtir une culture de
                lecture et d’écriture plus réfléchie.
              </p>
            </details>

            <Link href={homeFeatures.clubSpotlight.href} className="ns-home-live-link">
              Entrer dans le Club →
            </Link>
          </article>

          <article className="ns-home-live-card ns-home-info-card">
            <div className="ns-home-live-badge is-writers">Auteurs</div>
            <div className="ns-home-live-title">Pour les conteurs qui bâtissent avec soin</div>
            <div className="ns-home-live-desc">
              NextScenes offre aux auteurs un espace pour développer leurs
              histoires en public, inviter des contributions, protéger le canon
              et garder l’autorité sur leur œuvre.
            </div>

            <details className="ns-home-reveal">
              <summary>Voir comment les auteurs utilisent NextScenes</summary>
              <p>
                Les auteurs peuvent ouvrir leurs histoires à la collaboration,
                examiner les propositions, approuver ce qui devient canon et
                conserver la direction de leur récit. L’auteur reste le capitaine.
              </p>
            </details>

            <Link href="/fr/pilote-auteurs-fondateurs" className="ns-home-live-link">
              Découvrir le pilote des auteurs →
            </Link>
          </article>
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

      <section className="ns-mystery-section" aria-label="Énigme hebdomadaire Mystery250">
        <div className="ns-mystery-shell">
          <figure className="ns-mystery-image-card">
            <Image
              src={WEEKLY_MYSTERY.imageSrc}
              alt={WEEKLY_MYSTERY.imageAlt}
              width={720}
              height={405}
              className="ns-mystery-image"
            />

            <Link className="ns-mystery-image-button" href={weeklyMysteryAppHref}>
              Essayez l’énigme de la semaine
            </Link>
          </figure>

          <div className="ns-mystery-copy">
            <div className="ns-mystery-kicker">Énigme de la semaine</div>
            <h2 className="ns-h2">Mystery250 : mystères courts, esprit affûté.</h2>
            <p className="ns-p">
              <strong>Cette semaine :</strong> {WEEKLY_MYSTERY.title}
            </p>
            <p className="ns-p">{WEEKLY_MYSTERY.teaser}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
