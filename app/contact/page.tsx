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

export default function ContactPage() {
  return (
    <div className="ns-page">
      <section style={{ padding: "10px 0 8px" }}>
        <h1 className="ns-h1">Contact</h1>
        <p className="ns-subtitle" style={{ maxWidth: 980 }}>
          NextScenes is a serious cultural and educational platform. We welcome
          thoughtful messages from schools, institutions, partners, communities,
          and individuals who want to understand or work with us.
        </p>

        <div className="ns-hero-cta">
          <a
            className="ns-btn ns-btn-primary"
            href="mailto:contact@nextscenes.org"
          >
            contact@nextscenes.org
          </a>
          <Link className="ns-btn ns-btn-ghost" href="/about">
            About NextScenes
          </Link>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">Who should contact us?</h2>

        <div className="ns-grid-3">
          <Card title="Schools and institutions">
            If you represent a school, university, ministry, NGO, foundation, or
            cultural institution and want to explore using NextScenes for
            educational or cultural programs.
          </Card>

          <Card title="Partners and organizations">
            If you are interested in partnership, sponsorship, or long-term
            collaboration on cultural, educational, or community projects.
          </Card>

          <Card title="Writers and communities">
            If you want to build a serious community, a writing club, or a
            long-term creative project on NextScenes.
          </Card>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">What can you contact us about?</h2>

        <div className="ns-grid-3">
          <Card title="Partnerships and programs">
            Institutional cooperation, educational programs, cultural projects,
            and long-term initiatives.
          </Card>

          <Card title="Using NextScenes in education">
            Classrooms, clubs, youth programs, workshops, and structured learning
            environments.
          </Card>

          <Card title="General questions">
            Questions about how the platform works, its philosophy, or its
            governance.
          </Card>
        </div>

        <div className="ns-grid-3" style={{ marginTop: 14 }}>
          <Card title="Safety and moderation concerns">
            If you have concerns about content, behavior, or community safety on
            the platform.
          </Card>

          <Card title="Media and communication">
            Journalists, researchers, and cultural observers can reach out for
            information and context.
          </Card>

          <Card title="Other serious inquiries">
            If you are not sure where your question fits, write anyway and we
            will route it responsibly.
          </Card>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">How we handle messages</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          Messages sent to NextScenes are read by humans. We do not promise
          instant replies, but we do promise thoughtful attention. NextScenes is
          built slowly and carefully, and we treat communication the same way.
        </p>

        <div className="ns-card">
          <p className="ns-p" style={{ marginBottom: 0 }}>
            Please write clearly, respectfully, and with context. If your
            message concerns a school, institution, or program, include the name
            of the organization and your role.
          </p>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">Related pages</h2>
        <div className="ns-section-cta">
          <Link className="ns-btn ns-btn-ghost" href="/partners">
            Partnerships & Institutions
          </Link>
          <Link className="ns-btn ns-btn-ghost" href="/safety">
            Safety & Values
          </Link>
          <Link className="ns-btn ns-btn-ghost" href="/clubs">
            Clubs & Communities
          </Link>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">In one sentence</h2>
        <div className="ns-card">
          <p className="ns-p" style={{ marginBottom: 0 }}>
            NextScenes is open to serious conversation with people and
            institutions who care about culture, education, and meaningful
            creativity.
          </p>
        </div>
      </section>
    </div>
  );
}
