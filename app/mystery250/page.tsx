import Link from "next/link";
import TryMystery from "../../components/TryMystery";
import { mysteryPuzzlesEn } from "@/data/mystery250/en";
import { getActivePuzzles } from "@/lib/mystery250/getActivePuzzles";
import { buildMetadata } from "@/app/seo";

export const metadata = buildMetadata({
  title: "Mystery250 | Weekly Mystery Stories and Reading Puzzles",
  description:
    "Read and solve Mystery250 on NextScenes: short weekly mystery stories and clean reading puzzles designed to sharpen attention, reasoning, and imagination.",
  path: "/mystery250",
  image: "/images/mystery250/Mystery250_Library_Break_In_1600x900.png",
  languages: {
    en: "/mystery250",
    fr: "/fr/mystery250",
  },
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.nextscenes.org";

const DEFAULT_WEEKLY_MYSTERY_ID = "m250-007";

const FEATURED_MYSTERY_ID = String(
  process.env.NEXT_PUBLIC_MYSTERY250_FEATURED_ID || DEFAULT_WEEKLY_MYSTERY_ID
).trim();

function slugifyPuzzleRef(value: string) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function matchesFeaturedPuzzle(puzzle: { id?: string; slug?: string; title?: string }, ref: string) {
  const raw = String(ref || "").trim();
  if (!raw) return false;

  const knownRefs: Record<string, string> = {
    "the-vanishing-necklace": "m250-001",
    "vanishing-necklace": "m250-001",
    "the-midnight-visitor": "m250-002",
    "midnight-visitor": "m250-002",
    "the-silent-clock": "m250-003",
    "silent-clock": "m250-003",
    "the-one-way-footprints": "m250-006",
    "one-way-footprints": "m250-006",
    "the-library-break-in": "m250-007",
    "library-break-in": "m250-007",
  };

  const refSlug = slugifyPuzzleRef(raw);
  const knownId = knownRefs[refSlug] || "";

  return [puzzle.id, puzzle.slug, puzzle.title]
    .filter(Boolean)
    .some((value) => {
      const text = String(value || "").trim();
      return text === raw || text === knownId || slugifyPuzzleRef(text) === refSlug;
    });
}

function selectFeaturedPuzzle(puzzles: typeof mysteryPuzzlesEn) {
  const forcedPuzzle = puzzles.find((puzzle) =>
    matchesFeaturedPuzzle(puzzle, FEATURED_MYSTERY_ID)
  );
  return (
    forcedPuzzle ||
    puzzles.find((puzzle) => matchesFeaturedPuzzle(puzzle, DEFAULT_WEEKLY_MYSTERY_ID)) ||
    puzzles[0] ||
    null
  );
}

type MysteryCardItem = {
  icon: string;
  title: string;
  label: string;
  description: string;
};

function MysteryCard({
  item,
  compact = false,
}: {
  item: MysteryCardItem;
  compact?: boolean;
}) {
  return (
    <article className={`ns-m250-card${compact ? " is-compact" : ""}`}>
      <div className="ns-m250-card-top">
        <div className="ns-m250-card-icon" aria-hidden="true">
          <span>{item.icon}</span>
        </div>

        <h3 className="ns-m250-card-title">{item.title}</h3>

        <p className="ns-m250-card-text">{item.description}</p>
      </div>

      <div className="ns-m250-card-bottom">
        <span className="ns-m250-card-tag">{item.label}</span>
      </div>
    </article>
  );
}

function SectionShell({
  title,
  intro,
  id,
  children,
  alt = false,
}: {
  title: string;
  intro: string;
  id?: string;
  children: React.ReactNode;
  alt?: boolean;
}) {
  return (
    <section
      id={id}
      className={`ns-section ns-m250-panel${alt ? " is-alt" : ""}`}
    >
      <h2 className="ns-h2 ns-m250-section-title">{title}</h2>
      <p className="ns-p ns-m250-section-intro">{intro}</p>
      {children}
    </section>
  );
}

export default function Mystery250Page() {
  const puzzles = getActivePuzzles(mysteryPuzzlesEn);
  const initialPuzzle = selectFeaturedPuzzle(puzzles);

  const levels: MysteryCardItem[] = [
    {
      icon: "🔎",
      title: "Easy Mysteries",
      label: "Ages 8+",
      description: "Short, friendly puzzles that teach attention and logic.",
    },
    {
      icon: "🧩",
      title: "Medium Mysteries",
      label: "Teens & adults",
      description: "A little twistier. Perfect for learners and clubs.",
    },
    {
      icon: "🧠",
      title: "Hard Mysteries",
      label: "Thinkers",
      description: "Tougher riddles for serious reasoning and patience.",
    },
    {
      icon: "♟",
      title: "Expert Mysteries",
      label: "Mental wrestling",
      description: "For the brave. The kind that makes you smile later.",
    },
  ];

  const activities: MysteryCardItem[] = [
    {
      icon: "🏠",
      title: "Family Night Packs",
      label: "Together time",
      description: "A clean, fun way to bond across generations.",
    },
    {
      icon: "🏫",
      title: "Classroom Sets",
      label: "Schools",
      description: "Puzzle sets designed for learning, discussion, and fairness.",
    },
    {
      icon: "🌙",
      title: "Club Challenges",
      label: "Clubs",
      description: "Monthly themes, shared leaderboards, and group pride.",
    },
    {
      icon: "🏆",
      title: "Regional Competitions",
      label: "Coming online",
      description: "Friendly competitions that reward discipline, not noise.",
    },
  ];

  return (
    <div className="ns-page ns-m250-page">
      <section className="ns-m250-hero">
        <div className="ns-m250-hero-copy">
          <div className="ns-m250-eyebrow">A calm place for sharp minds</div>

          <h1 className="ns-h1 ns-m250-hero-title">Mystery250</h1>

          <p className="ns-subtitle ns-m250-hero-subtitle">
            Short mysteries that train attention, logic, and patience. From
            young learners to retirees, everyone can take something home.
          </p>

          <div className="ns-hero-cta">
            <Link href="/how-it-works" className="ns-btn ns-btn-ghost">
              How NextScenes works
            </Link>

            <Link href={APP_URL} className="ns-btn ns-btn-primary">
              Enter the App
            </Link>
          </div>

          <div className="ns-trust-strip ns-m250-trust-strip">
            <span>For kids, teens, adults</span>
            <span>Designed for schools & clubs</span>
            <span>Values-led puzzles</span>
            <span>Solace without boredom</span>
          </div>
        </div>

        <div className="ns-m250-hero-visual" aria-hidden="true">
          <img
            src="/images/mystery250-hero.webp"
            alt=""
            className="ns-m250-hero-image"
          />
        </div>
      </section>

      <SectionShell
        title="Levels of Mystery"
        intro="Mystery250 is not only entertainment. It is a training ground for calm thinking. The world is noisy. This is where the mind learns to stand straight."
      >
        <div className="ns-m250-grid ns-m250-grid-levels">
          {levels.map((item) => (
            <MysteryCard key={item.title} item={item} compact />
          ))}
        </div>
      </SectionShell>

      <TryMystery
        lang="en"
        initialPuzzle={initialPuzzle}
        puzzles={puzzles}
      />

      <SectionShell
        id="competitions"
        alt
        title="Clubs, activities, and competitions"
        intro="Mystery250 will grow into organized activities: school sets, club nights, themed challenges, and regional competitions. The aim is not hype. The aim is culture: people thinking together, fairly, with joy."
      >
        <div className="ns-m250-grid">
          {activities.map((item) => (
            <MysteryCard key={item.title} item={item} />
          ))}
        </div>
      </SectionShell>

      <section className="ns-section ns-section-cta ns-m250-promise">
        <h2 className="ns-h2">A small promise</h2>

        <p className="ns-p ns-m250-promise-text">
          If you feel tired of loud spaces, Mystery250 is for you. It is a place
          of solace that still makes you grow.
        </p>

        <div className="ns-hero-cta" style={{ justifyContent: "center" }}>
          <Link href={APP_URL} className="ns-btn ns-btn-primary">
            Explore inside the App
          </Link>

          <Link href="/contact" className="ns-btn ns-btn-ghost">
            Bring Mystery250 to a school or club
          </Link>
        </div>
      </section>
    </div>
  );
}
