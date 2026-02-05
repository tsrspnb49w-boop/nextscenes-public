import Link from "next/link";
import MediaGrid from "../../components/MediaGrid";

export default function Mystery250Page() {
  const items = [
    { title: "Easy Mysteries", href: "/mystery250#easy", label: "Ages 8+", description: "Short, friendly puzzles that teach attention and logic." },
    { title: "Medium Mysteries", href: "/mystery250#medium", label: "Teens & adults", description: "A little twistier. Perfect for learners and clubs." },
    { title: "Hard Mysteries", href: "/mystery250#hard", label: "Thinkers", description: "Tougher riddles for serious reasoning and patience." },
    { title: "Expert Mysteries", href: "/mystery250#expert", label: "Mental wrestling", description: "For the brave. The kind that makes you smile later." },
    { title: "Family Night Packs", href: "/mystery250#family", label: "Together time", description: "A clean, fun way to bond across generations." },
    { title: "Classroom Sets", href: "/mystery250#schools", label: "Schools", description: "Puzzle sets designed for learning, discussion, and fairness." },
    { title: "Club Challenges", href: "/mystery250#clubs", label: "Clubs", description: "Monthly themes, shared leaderboards, and group pride." },
    { title: "Regional Competitions", href: "/mystery250#competitions", label: "Coming online", description: "Friendly competitions that reward discipline, not noise." },
  ];

  return (
    <div className="ns-page">
      <h1 className="ns-h1">Mystery250</h1>
      <p className="ns-subtitle">
        A calm place for sharp minds. Short mysteries that train attention,
        logic, and patience. From young learners to retirees, everyone can take
        something home.
      </p>

      <div className="ns-hero-cta">
        <Link href="/how-it-works" className="ns-btn ns-btn-ghost">
          How NextScenes works
        </Link>
        <a
          href="https://app.nextscenes.org"
          className="ns-btn ns-btn-primary"
          target="_blank"
          rel="noreferrer"
        >
          Enter the App
        </a>
      </div>

      <div className="ns-trust-strip">
        <span>For kids, teens, adults</span>
        <span>Designed for schools & clubs</span>
        <span>Values-led puzzles</span>
        <span>Solace without boredom</span>
      </div>

      <section className="ns-section ns-paper">
        <h2 className="ns-h2">Featured paths</h2>
        <p className="ns-p">
          Mystery250 is not only entertainment. It is a training ground for
          calm thinking. The world is noisy; this is where the mind learns to
          stand straight.
        </p>

        <MediaGrid items={items} />
      </section>

      <section className="ns-section ns-section-alt" id="competitions">
        <h2 className="ns-h2">Clubs, activities, and competitions</h2>
        <p className="ns-p">
          Mystery250 will grow into organized activities: school sets, club
          nights, themed challenges, and regional competitions. The aim is not
          hype. The aim is culture: people thinking together, fairly, with joy.
        </p>

        <div className="ns-grid-3" style={{ marginTop: 16 }}>
          <div className="ns-card">
            <div className="ns-h3">Club Nights</div>
            <p className="ns-p">
              Weekly or monthly puzzle sessions for community groups, libraries,
              and writing clubs.
            </p>
          </div>
          <div className="ns-card">
            <div className="ns-h3">Schools</div>
            <p className="ns-p">
              Classroom sets that strengthen logic, reading, patience, and fair
              discussion.
            </p>
          </div>
          <div className="ns-card">
            <div className="ns-h3">Regional competitions</div>
            <p className="ns-p">
              Friendly, values-led contests where discipline wins, not noise.
            </p>
          </div>
        </div>
      </section>

      <section className="ns-section ns-section-cta">
        <h2 className="ns-h2">A small promise</h2>
        <p className="ns-p">
          If you feel tired of loud spaces, Mystery250 is for you. It is a place
          of solace that still makes you grow.
        </p>
        <div className="ns-hero-cta" style={{ justifyContent: "center" }}>
          <a
            href="https://app.nextscenes.org"
            className="ns-btn ns-btn-primary"
            target="_blank"
            rel="noreferrer"
          >
            Explore inside the App
          </a>
          <Link href="/contact" className="ns-btn ns-btn-ghost">
            Bring Mystery250 to a school or club
          </Link>
        </div>
      </section>
    </div>
  );
}
