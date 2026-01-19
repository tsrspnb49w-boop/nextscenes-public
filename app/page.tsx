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

export default function HomePage() {
  return (
    <div className="ns-page">
      <section className="ns-hero">
        <div className="ns-hero-inner">
          <div className="ns-hero-copy">
            <h1 className="ns-h1">NextScenes</h1>
            <p className="ns-subtitle">
              A safe, values-led place where stories are written with conscience,
              refined by community, and enjoyed across generations.
            </p>

            <div className="ns-hero-cta">
              <PillButton href="/how-it-works">How it works</PillButton>
              <PillButton href="https://app.nextscenes.org" variant="ghost">
                Enter the App
              </PillButton>
            </div>

            <div className="ns-trust-strip">
              <span>Guided feedback</span>
              <span>Clubs and community</span>
              <span>Mystery250 puzzles</span>
              <span>Safety and values</span>
            </div>
          </div>

          <div className="ns-hero-card">
            <div className="ns-card">
              <h2 className="ns-h2">What you can do here</h2>
              <ul className="ns-list">
                <li>Read stories by writers from around the world.</li>
                <li>Write your own scenes and grow through feedback.</li>
                <li>Join clubs for kids, teens, adults, and institutions.</li>
                <li>Sharpen your mind with Mystery250.</li>
              </ul>
              <div className="ns-card-actions">
                <Link className="ns-link" href="/mystery250">
                  Explore Mystery250
                </Link>
                <Link className="ns-link" href="/safety">
                  Safety and values
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">How NextScenes works</h2>
        <div className="ns-grid-3">
          <div className="ns-card">
            <h3 className="ns-h3">Join</h3>
            <p className="ns-p">
              Create an account, choose your path, and enter a community that
              takes storytelling seriously.
            </p>
          </div>
          <div className="ns-card">
            <h3 className="ns-h3">Write and read</h3>
            <p className="ns-p">
              Readers enjoy. Writers build scenes. Communities discuss. Stories
              grow one good decision at a time.
            </p>
          </div>
          <div className="ns-card">
            <h3 className="ns-h3">Improve with feedback</h3>
            <p className="ns-p">
              Feedback is guided and practical. We raise craft, protect dignity,
              and keep the platform wholesome.
            </p>
          </div>
        </div>

        <div className="ns-section-cta">
          <Link className="ns-btn ns-btn-primary" href="/how-it-works">
            See the full process
          </Link>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">Mystery250</h2>
        <p className="ns-p">
          Short mysteries that train attention, logic, and patience. From easy
          puzzles for young minds to expert riddles for adults who enjoy a good
          mental wrestling match.
        </p>

        <div className="ns-section-cta">
          <Link className="ns-btn ns-btn-ghost" href="/mystery250">
            Learn more
          </Link>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">For schools, clubs, and partners</h2>
        <p className="ns-p">
          NextScenes is built for individuals, but designed to serve communities:
          classrooms, libraries, literacy programs, and cultural institutions.
        </p>
        <div className="ns-section-cta">
          <Link className="ns-btn ns-btn-primary" href="/partners">
            Partnership and institutions
          </Link>
          <Link className="ns-btn ns-btn-ghost" href="/contact">
            Contact
          </Link>
        </div>
      </section>
    </div>
  );
}
