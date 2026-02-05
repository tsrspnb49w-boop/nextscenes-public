import Link from "next/link";
import type { ReactNode } from "react";

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="ns-card">
      <h3 className="ns-h3">{title}</h3>
      <div className="ns-p" style={{ marginBottom: 0 }}>
        {children}
      </div>
    </div>
  );
}

export default function PartnersPage() {
  return (
    <div className="ns-page">
      <section style={{ padding: "10px 0 8px" }}>
        <h1 className="ns-h1">Partnerships and Institutions</h1>
        <p className="ns-subtitle" style={{ maxWidth: 980 }}>
          NextScenes is not only a creative website. It is designed as a cultural
          and educational platform capable of working with schools, universities,
          ministries, cultural institutions, NGOs, foundations, and development
          programs.
        </p>

        <div className="ns-hero-cta">
          <Link className="ns-btn ns-btn-primary" href="/contact">
            Talk to us
          </Link>
          <Link className="ns-btn ns-btn-ghost" href="/safety">
            Safety and values
          </Link>
        </div>

        <div className="ns-trust-strip" style={{ marginTop: 10 }}>
          <span>Education-ready</span>
          <span>Governed platform</span>
          <span>Long-term programs</span>
          <span>Institutional posture</span>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">NextScenes as an institutional platform</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          NextScenes is designed to work with schools and universities,
          ministries and educational authorities, cultural centers and libraries,
          NGOs and youth organizations, foundations and development programs, and
          literary and artistic institutions. Its structure, governance, and
          values make it suitable for serious institutional collaboration.
        </p>

        <div className="ns-grid-3">
          <Card title="Cultural infrastructure">
            A long-term platform for building meaningful, community-driven
            creative projects.
          </Card>
          <Card title="Educational tool">
            Suitable for classrooms, programs, and structured learning
            environments.
          </Card>
          <Card title="Governed environment">
            Built on clear rules, roles, and ethical commitments.
          </Card>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">Why institutions partner with NextScenes</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          Institutions partner with NextScenes to promote reading and writing
          culture, encourage disciplined creativity, teach collaboration and
          responsibility, run long-term creative and educational programs,
          support youth and community expression, and create structured digital
          cultural spaces.
        </p>

        <div className="ns-grid-3">
          <Card title="Promote literacy and culture">
            Reading and writing are treated as serious cultural practices, not
            disposable content.
          </Card>
          <Card title="Teach responsibility and collaboration">
            The platform’s structure supports ethical and disciplined creative
            work.
          </Card>
          <Card title="Build sustainable programs">
            Designed for long-term projects, not short-term campaigns.
          </Card>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">Areas of partnership</h2>

        <div className="ns-grid-3">
          <Card title="Education">
            School and university writing programs, curricula support, teacher
            training, and classroom projects.
          </Card>
          <Card title="Culture">
            Community storytelling, heritage projects, thematic cultural
            initiatives, and literary programs.
          </Card>
          <Card title="Youth and community development">
            Literacy, expression, empowerment, social cohesion, and dialogue
            through stories.
          </Card>
        </div>

        <div className="ns-grid-3" style={{ marginTop: 14 }}>
          <Card title="Public programs">
            National or regional reading and writing initiatives and cultural
            development strategies.
          </Card>
          <Card title="Workshops and competitions">
            Structured creative events and long-term learning programs.
          </Card>
          <Card title="Digital heritage">
            Preservation of oral and written traditions in a modern, traceable
            form.
          </Card>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">Institutional use cases</h2>

        <div className="ns-grid-3">
          <Card title="Schools and universities">
            Classroom writing projects, literature and language learning,
            project-based learning, ethics and civic education through stories,
            and creative clubs.
          </Card>
          <Card title="Cultural institutions">
            Community storytelling, preservation of traditions, national or
            regional creative initiatives, and thematic story programs.
          </Card>
          <Card title="NGOs and development programs">
            Youth empowerment, literacy initiatives, social cohesion, and
            community-building through storytelling.
          </Card>
        </div>

        <div className="ns-grid-3" style={{ marginTop: 14 }}>
          <Card title="Public authorities">
            National reading and writing campaigns, educational innovation, and
            digital education initiatives.
          </Card>
          <Card title="Foundations">
            Long-term cultural and educational investments with measurable
            impact.
          </Card>
          <Card title="Networks and alliances">
            Shared programs across schools, regions, or communities.
          </Card>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">What NextScenes provides</h2>

        <div className="ns-grid-3">
          <Card title="A structured digital platform">
            Designed for serious creative and educational use, not social noise.
          </Card>
          <Card title="A governed creative process">
            Clear roles, traceable decisions, and preserved creative history.
          </Card>
          <Card title="Safety and moderation">
            A values-driven framework suitable for schools and youth programs.
          </Card>
        </div>

        <div className="ns-grid-3" style={{ marginTop: 14 }}>
          <Card title="Documentation and traceability">
            Creative work is preserved, auditable, and educational.
          </Card>
          <Card title="Measurable participation">
            Activity and engagement can be observed and evaluated meaningfully.
          </Card>
          <Card title="Serious institutional posture">
            Designed to be a partner, not a gimmick.
          </Card>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">What partners provide</h2>
        <div className="ns-card">
          <ul className="ns-list" style={{ margin: 0 }}>
            <li>Program sponsorship or funding</li>
            <li>Institutional endorsement</li>
            <li>Educational integration</li>
            <li>Access to schools, communities, or networks</li>
            <li>Joint program design and governance</li>
          </ul>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">Governance and independence</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          NextScenes maintains its ethical and cultural charter, does not
          compromise safety or values for partnerships, welcomes cooperation but
          not control, and operates on clear, transparent agreements.
        </p>

        <div className="ns-card">
          <p className="ns-p" style={{ marginBottom: 0 }}>
            We welcome partners. We do not outsource our conscience.
          </p>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">Long-term vision</h2>
        <div className="ns-grid-3">
          <Card title="Trusted partner">
            A reliable cultural and educational collaborator.
          </Card>
          <Card title="Creative infrastructure">
            A long-term digital foundation for storytelling and learning.
          </Card>
          <Card title="Living archive">
            A home for serious community-built works.
          </Card>
        </div>
      </section>

      <section className="ns-section ns-section-cta">
        <h2 className="ns-h2">A serious but open invitation</h2>
        <p className="ns-p" style={{ maxWidth: 900 }}>
          NextScenes welcomes institutions that believe in culture and education,
          in discipline and responsibility, and in the idea that imagination can
          build society.
        </p>

        <div className="ns-section-cta">
          <Link className="ns-btn ns-btn-primary" href="/contact">
            Contact us
          </Link>
          <Link className="ns-btn ns-btn-ghost" href="/about">
            About NextScenes
          </Link>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">In one sentence</h2>
        <div className="ns-card">
          <p className="ns-p" style={{ marginBottom: 0 }}>
            NextScenes is a cultural and educational platform built for long-term
            institutional collaboration, not short-term digital noise.
          </p>
        </div>
      </section>
    </div>
  );
}
