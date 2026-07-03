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
    <div className="ns-page ns-public-home">
      <section className="ns-home-hero-v2">
        <div className="ns-home-hero-backdrop" aria-hidden="true" />
        <div className="ns-home-hero-shade" aria-hidden="true" />

        <div className="ns-home-container ns-home-hero-grid">
          <div className="ns-home-hero-copy-v2">
            <div className="ns-home-eyebrow">Lire. Créer. Publier. Découvrir.</div>

            <h1>Créez votre histoire. Découvrez des livres façonnés sur NextScenes.</h1>

            <p className="ns-home-hero-lede">
              Lisez des histoires choisies en cours de création, commencez votre propre parcours créatif,
              et découvrez des livres publiés nés de l’imagination, de la discipline et d’un travail patient.
            </p>

            <div className="ns-home-free-access-strip" role="note">
              <strong>Inscription gratuite. Lecture gratuite. Participation gratuite.</strong>
              <span>Aucun frais caché pour la participation de base sur NextScenes.</span>
            </div>

            <div className="ns-home-hero-actions">
              <HomeButton href={bookOfTheWeek.href}>Lire les histoires →</HomeButton>
              <HomeButton href={APP_URL} tone="secondary">
                Commencer à écrire
              </HomeButton>
            </div>
          </div>

          <aside className="ns-home-hero-journey-card" aria-label="Parcours créatif NextScenes">
            <div className="ns-home-hero-journey-kicker">Le parcours NextScenes</div>
            <h2>De la première scène à l’œuvre accomplie.</h2>
            <p>
              Commencez par une idée, façonnez-la scène après scène, invitez une lecture attentive,
              et donnez aux œuvres solides une route vers la publication. L’inscription et la participation de base sont gratuites.
            </p>

            <div className="ns-home-hero-journey-steps">
              <span>Écrire</span>
              <span>Polir</span>
              <span>Partager</span>
              <span>Publier</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="ns-home-featured-works-row" aria-label="Œuvres en vedette">
        <div className="ns-home-container">
          <div className="ns-home-featured-works-head">
            <div>
              <div className="ns-home-section-kicker">Œuvres en vedette</div>
              <h2>Livres et histoires</h2>
            </div>
            <p>
              Parcourez les œuvres en cours et les livres publiés liés au parcours NextScenes.
            </p>
          </div>

          <FeaturedStoriesShelf
            stories={homepageFeaturedStories}
            authorLabel="Par"
            progressLabel="En développement"
            storyCtaLabel="Ouvrir l’histoire"
            publicationCtaLabel="Voir la publication"
            publicationAmazonCtaLabel="Voir sur Amazon"
          />
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
            text="Créez, améliorez, collaborez avec soin et gérez votre histoire depuis un espace d’écriture privé. La participation de base est gratuite."
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
                L’inscription et la participation de base sont gratuites.
              </p>
            </div>

            <audio controls preload="none" className="ns-home-audio-player">
              <source src="/audio/how-it-works-fr.mp3" type="audio/mpeg" />
            </audio>
          </div>
        </div>
      </section>

      <FeaturedReadingCard reading={featuredReading} />

      <section className="ns-home-development">
        <div className="ns-home-container ns-home-development-grid">
          <div className="ns-home-development-copy">
            <div className="ns-home-section-kicker">Du brouillon à la destination</div>
            <h2>Les lecteurs découvrent l’histoire. Les auteurs gardent la maîtrise du voyage.</h2>
            <p>
              NextScenes garde l’expérience publique calme et claire. Les visiteurs peuvent
              découvrir des histoires choisies, voir quelles œuvres sont encore en création,
              et reconnaître les livres déjà passés à la publication.
            </p>

            <div className="ns-home-check-list">
              <span>Histoires présentées avec couvertures, titres et actions claires</span>
              <span>Livres publiés séparés des œuvres encore en cours</span>
              <span>Lecteurs accueillis sans encombrement technique</span>
              <span>Contrôle de l’auteur, confiance et droits rendus visibles</span>
            </div>
          </div>

          <div className="ns-home-workshop-card">
            <div className="ns-home-workshop-visual" aria-hidden="true" />
            <div className="ns-home-workshop-content">
              <h3>Une salle de lecture calme devant. Un vrai atelier créatif derrière.</h3>
              <p>
                Le côté public sert à découvrir, lire et faire confiance. Le côté auteur
                permet de façonner les scènes, examiner les contributions et protéger la
                direction de l’œuvre.
              </p>
              <div className="ns-home-mini-checks">
                <span>Les visiteurs rencontrent les histoires sans confusion.</span>
                <span>Les auteurs gardent les outils et décisions au bon endroit.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ns-home-feels">
        <div className="ns-home-container ns-home-feels-grid">
          <div>
            <div className="ns-home-section-kicker">Ce que NextScenes protège</div>
            <h2>Un espace littéraire fondé sur la clarté, l’équité et une croissance attentive.</h2>
          </div>

          <div className="ns-home-feels-cards">
            <article>
              <BookIcon />
              <h3>Lecture calme</h3>
              <p>Les lecteurs peuvent entrer dans une histoire sans bruit, confusion ni poids technique inutile.</p>
            </article>
            <article>
              <PenIcon />
              <h3>Contrôle de l’auteur</h3>
              <p>Les auteurs restent maîtres de leurs histoires, de leur direction et des textes qu’ils approuvent.</p>
            </article>
            <article>
              <GlobeIcon />
              <h3>Présentation honnête</h3>
              <p>Les œuvres en création et les livres déjà publiés sont indiqués clairement, chacun à sa juste place.</p>
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
            <p className="ns-home-mystery-teaser">{weeklyMystery.teaser}</p>
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
