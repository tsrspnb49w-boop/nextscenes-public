import Link from "next/link";

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="ns-card">
      <h3 className="ns-h3">{title}</h3>
      <div className="ns-p" style={{ marginBottom: 0 }}>
        {children}
      </div>
    </div>
  );
}

export default function ClubsPage() {
  return (
    <div className="ns-page">
      <section style={{ padding: "10px 0 8px" }}>
        <h1 className="ns-h1">Clubs and Communities</h1>
        <p className="ns-subtitle" style={{ maxWidth: 980 }}>
          NextScenes is not only for individuals. It is built to support schools,
          classrooms, writing clubs, cultural associations, youth programs,
          creative communities, and private writing circles. These organized
          groups are called <b>Clubs</b> on NextScenes.
        </p>

        <div className="ns-hero-cta">
          <Link className="ns-btn ns-btn-primary" href="/partners">
            For schools and institutions
          </Link>
          <Link className="ns-btn ns-btn-ghost" href="/safety">
            Safety and values
          </Link>
        </div>

        <div className="ns-trust-strip" style={{ marginTop: 10 }}>
          <span>Structured groups</span>
          <span>Clear leadership</span>
          <span>Long-term projects</span>
          <span>Education-ready</span>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">What is a Club?</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          A Club is a structured creative space with leadership, rules, and
          purpose. It is designed for group storytelling and long-term creative
          programs, not temporary noise.
        </p>

        <div className="ns-grid-3">
          <Card title="For schools and classrooms">
            Clubs can support writing programs, literature learning, and
            project-based storytelling with oversight and structure.
          </Card>
          <Card title="For communities and associations">
            Cultural groups and writing communities can host multiple story
            projects under one organized umbrella.
          </Card>
          <Card title="For private circles">
            Closed clubs support invited groups who want a private, focused
            creative environment.
          </Card>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">Why Clubs exist</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          Clubs exist to organize group writing projects, teach storytelling,
          train collaboration and responsibility, run long-term creative
          programs, and host multiple story projects under one community. Clubs
          turn NextScenes from a website into a creative institution.
        </p>

        <div className="ns-grid-3">
          <Card title="Organize serious projects">
            Clubs provide structure so group storytelling can be sustained over
            time, without chaos.
          </Card>
          <Card title="Teach and train craft">
            Clubs support learning, feedback, discipline, and gradual
            improvement.
          </Card>
          <Card title="Build community">
            Clubs are designed as stable creative communities where members grow
            together.
          </Card>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">The role of the Club Leader</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          Every Club has one or more Leaders (teachers, facilitators, or
          coordinators). Leaders create the space, guide objectives, and protect
          the culture of the Club.
        </p>

        <div className="ns-card">
          <ul className="ns-list" style={{ margin: 0 }}>
            <li>Creates and manages the Club space</li>
            <li>Invites or approves members</li>
            <li>Sets internal rules and objectives</li>
            <li>Assigns or approves story projects</li>
            <li>Ensures discipline, respect, and safety</li>
            <li>Represents the Club to the platform</li>
          </ul>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">Types of Clubs</h2>

        <div className="ns-grid-3">
          <Card title="Open Clubs">
            Anyone may request to join or participate. Suitable for public
            communities and open creative circles. Still governed by platform
            rules and Club rules.
          </Card>

          <Card title="Closed Clubs">
            Membership is by invitation or approval only. Suitable for schools
            and classrooms, private writing groups, youth programs, and
            professional or private circles.
          </Card>

          <Card title="Stable by design">
            Clubs are meant to be long-term communities. Not temporary chat
            groups. Not a revolving door.
          </Card>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">How Clubs use stories</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          A Club may run one or many story projects, assign different main writers
          to different stories, and use stories as writing exercises, group
          projects, learning tools, or long-term creative works. Every story
          still follows the NextScenes story governance model.
        </p>

        <div className="ns-grid-3">
          <Card title="Multiple projects">
            One Club can host many storylines with different goals and different
            teams.
          </Card>
          <Card title="Clear roles">
            Club Leaders, Main Writers, Contributors, and Readers can change per
            story and per project.
          </Card>
          <Card title="Governed storytelling">
            Canon vs proposals remains intact, so group creativity stays
            coherent.
          </Card>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">Educational use</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          NextScenes Clubs are designed to support classroom writing programs,
          literature and language learning, creative writing workshops,
          project-based learning, and ethical discussion through storytelling.
        </p>

        <div className="ns-grid-3">
          <Card title="Guided direction">
            Teachers and facilitators can guide story direction while still
            allowing student creativity.
          </Card>
          <Card title="Decision Notes as teaching tools">
            Leaders can use Decision Notes to explain judgment, craft, and
            responsibility in writing.
          </Card>
          <Card title="Evaluation and growth">
            Participation can be reviewed meaningfully, not by noise or
            popularity.
          </Card>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">Safety and oversight in Clubs</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          Clubs must follow the global Safety and Values Charter and may add
          additional internal rules. Club Leaders are expected to act as first
          line moderators, maintain discipline and respect, and protect young or
          vulnerable members. Platform moderation remains available when
          necessary.
        </p>

        <div className="ns-section-cta">
          <Link className="ns-btn ns-btn-primary" href="/safety">
            Read the Safety Charter
          </Link>
          <Link className="ns-btn ns-btn-ghost" href="/contact">
            Talk to us
          </Link>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">In one sentence</h2>
        <div className="ns-card">
          <p className="ns-p" style={{ marginBottom: 0 }}>
            NextScenes Clubs turn storytelling into an organized, educational,
            and community driven cultural activity.
          </p>
        </div>
      </section>
    </div>
  );
}
