import Image from "next/image";
import Link from "next/link";
import { HOME_FEATURES } from "@/app/lib/homeFeatures";
import { FEATURED_STORIES_FR, type FeaturedStory } from "@/app/lib/featuredStories";
import FeaturedStoriesShelf from "@/components/FeaturedStoriesShelf";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.nextscenes.org";

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
        featuredStories: FEATURED_STORIES_FR,
        weeklyMystery: FALLBACK_WEEKLY_MYSTERY,
      };
    }

    const data = (await res.json()) as PublicHomepageResponse;
    const stories = Array.isArray(data?.featuredStories)
      ? data.featuredStories
      : [];

    return {
      featuredStories: stories.length ? stories : FEATURED_STORIES_FR,
      weeklyMystery: normalizeWeeklyMystery(data?.weeklyMystery),
    };
  } catch {
    return {
      featuredStories: FEATURED_STORIES_FR,
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
    <section className="ns-home-book-month-strip" aria-label="Livre du mois">
      <div className="ns-home-container">
        <article className="ns-home-book-month-card">
          <div className="ns-home-book-month-copy">
            <div className="ns-home-section-kicker">Livre du mois</div>
            <h2>Half of a Yellow Sun</h2>
            <p className="ns-home-book-month-author">Par Chimamanda Ngozi Adichie</p>
            <p className="ns-home-book-month-desc">
              Un roman ample et intime sur l’amour, la guerre, la classe sociale et la fracture.
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
  const homeFeatures = HOME_FEATURES.fr;
  const bookOfTheWeek = homeFeatures.bookOfTheWeek;
  const homepageData = await getPublicHomepageData("fr");
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
            <div className="ns-home-eyebrow">Lire. Suivre. Créer. Grandir.</div>

            <h1>Entrez dans des histoires déjà vivantes, pendant qu’elles deviennent des livres.</h1>

            <p className="ns-home-hero-lede">
              NextScenes est une maison littéraire où vous pouvez lire des histoires,
              écrire les vôtres, inviter d’autres à contribuer avec soin, suivre des
              récits en création et découvrir des livres qui ont commencé leur voyage ici.
            </p>

            <div className="ns-home-hero-actions">
              <HomeButton href={bookOfTheWeek.href}>Lire les histoires →</HomeButton>
              <HomeButton href={APP_URL} tone="secondary">
                Commencer à écrire
              </HomeButton>
            </div>

            <div className="ns-home-featured-book-card">
              <div className="ns-home-section-kicker">NextScenes aujourd’hui</div>
              <h2>Des histoires en développement. Des livres qui prennent forme.</h2>
              <p>
                Suivez des œuvres choisies pendant leur création, découvrez des livres publiés
                liés à NextScenes et entrez dans un espace littéraire calme fondé sur le contrôle
                de l’auteur, la curiosité des lecteurs et une collaboration réfléchie.
              </p>
              <div className="ns-home-featured-book-actions">
                <span>Œuvres en développement et publiées clairement indiquées</span>
                <Link href={APP_URL}>Entrer dans NextScenes →</Link>
              </div>
            </div>
          </div>

          <aside className="ns-home-shelf-panel" aria-label="Sélection d’histoires">
            <div className="ns-home-shelf-inner">
              <div className="ns-home-shelf-head">
                <div>
                  <div className="ns-home-section-kicker">Sélection</div>
                  <h2>Livres et histoires</h2>
                </div>
                <span>Vue publique simple</span>
              </div>

              <FeaturedStoriesShelf
                stories={featuredStories}
                authorLabel="Par"
                progressLabel="En développement"
                storyCtaLabel="Ouvrir l’histoire"
                publicationCtaLabel="Voir la publication"
                publicationAmazonCtaLabel="Voir sur Amazon"
              />
            </div>
          </aside>
        </div>
      </section>

      <section className="ns-home-doorways" aria-label="Principales entrées">
        <div className="ns-home-container ns-home-doorway-grid">
          <DoorwayCard
            title="Lire des histoires"
            text="Ouvrez des scènes choisies, suivez des histoires en cours et profitez d’une lecture calme, sans encombrement technique."
            href={bookOfTheWeek.href}
            cta="Parcourir les histoires"
            imageSrc="/images/home/story-entry.png"
            imageAlt="Une entrée calme pour découvrir des histoires"
            icon="📖"
          />

          <DoorwayCard
            title="Écrire avec intention"
            text="Créez, améliorez, collaborez, approuvez les propositions et gérez votre histoire depuis un espace d’écriture privé."
            href={APP_URL}
            cta="Commencer à écrire"
            imageSrc="/images/home/writer-studio.png"
            imageAlt="Un espace d’écriture concentré pour les auteurs"
            icon="✍️"
          />

          <DoorwayCard
            title="Essayer Mystery250"
            text="Résolvez de courts mystères qui aiguisent la curiosité tout en gardant l’expérience propre, intelligente et accueillante."
            href={weeklyMysteryAppHref}
            cta="Résoudre une énigme"
            imageSrc={weeklyMystery.imageSrc}
            imageAlt={weeklyMystery.imageAlt}
            icon="🧩"
          />
        </div>
      </section>

      <section className="ns-home-audio-strip" aria-label="Guide audio">
        <div className="ns-home-container">
          <div className="ns-home-audio-strip-card">
            <div>
              <div className="ns-home-section-kicker">Commencer</div>
              <h2>Comment utiliser NextScenes</h2>
              <p>
                Écoutez un court guide pour comprendre comment explorer le site,
                lire les histoires, entrer dans l’application et participer comme lecteur ou auteur.
              </p>
            </div>

            <audio controls preload="none" className="ns-home-audio-player">
              <source src="/audio/how-it-works-fr.mp3" type="audio/mpeg" />
            </audio>
          </div>
        </div>
      </section>

      <BookOfMonthCard />

      <section className="ns-home-development">
        <div className="ns-home-container ns-home-development-grid">
          <div className="ns-home-development-copy">
            <div className="ns-home-section-kicker">Histoires en création</div>
            <h2>Une vue publique qui ressemble à des livres, pas à une machine de backend.</h2>
            <p>
              Les lecteurs doivent voir des couvertures, des titres, des teasers et des actions
              de lecture simples. Le langage plus profond du Canon, des propositions et des journaux
              de décision doit rester dans l’espace de travail de l’auteur.
            </p>

            <div className="ns-home-check-list">
              <span>Lecture publique simple</span>
              <span>Histoires clairement marquées comme en cours ou publiées</span>
              <span>Outils d’écriture gardés dans l’espace de travail</span>
              <span>Confiance, droits et contrôle de l’auteur rendus visibles</span>
            </div>
          </div>

          <div className="ns-home-workshop-card">
            <div className="ns-home-workshop-visual" aria-hidden="true" />
            <div className="ns-home-workshop-content">
              <h3>Une salle de lecture d’abord. Un atelier d’écriture derrière.</h3>
              <p>
                Les lecteurs rencontrent d’abord les histoires. Les auteurs gardent les outils plus
                profonds, le flux des propositions et les contrôles de collaboration là où ils sont
                réellement utiles. Le côté public reste calme. Le côté travail reste sérieux.
              </p>
              <div className="ns-home-mini-checks">
                <span>L’entrée publique reste claire et accueillante.</span>
                <span>L’espace auteur garde la profondeur et les décisions.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ns-home-feels">
        <div className="ns-home-container ns-home-feels-grid">
          <div>
            <div className="ns-home-section-kicker">Ce que NextScenes doit faire ressentir</div>
            <h2>Une salle de lecture devant. Un atelier sérieux derrière.</h2>
          </div>

          <div className="ns-home-feels-cards">
            <article>
              <BookIcon />
              <h3>Les lecteurs entrent facilement</h3>
              <p>Ils lisent, suivent, évaluent et reviennent sans apprendre d’abord la mécanique de la plateforme.</p>
            </article>
            <article>
              <PenIcon />
              <h3>Les auteurs travaillent en profondeur</h3>
              <p>Les outils avancés restent disponibles, mais seulement là où ils sont utiles.</p>
            </article>
            <article>
              <GlobeIcon />
              <h3>Le public voit clairement</h3>
              <p>Les œuvres en cours, terminées et publiées sont présentées avec dignité.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="ns-home-mystery-feature" aria-label="Énigme hebdomadaire Mystery250">
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
            <div className="ns-home-section-kicker">Énigme de la semaine</div>
            <h2>Mystery250 : mystères courts, esprit affûté.</h2>
            <p>
              <strong>Cette semaine :</strong> {weeklyMystery.title}
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
