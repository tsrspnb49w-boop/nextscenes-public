import Link from "next/link";
import type { ReactNode } from "react";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.nextscenes.org";

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

function PillLink({
  href,
  children,
  variant = "ghost",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
}) {
  const cls =
    variant === "primary" ? "ns-btn ns-btn-primary" : "ns-btn ns-btn-ghost";

  // Use Next.js Link for BOTH internal and absolute URLs (same tab, consistent).
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export default function AboutPage() {
  return (
    <div className="ns-page">
      <section style={{ padding: "10px 0 8px" }}>
        <h1 className="ns-h1">About NextScenes</h1>
        <p className="ns-subtitle" style={{ maxWidth: 900 }}>
          NextScenes is a collaborative storytelling workspace and cultural
          project for people who want to create serious, long-form stories
          together, slowly and deliberately, with clear roles, visible decisions,
          and responsibility for what becomes canon.
        </p>

        <div className="ns-hero-cta">
          <PillLink href="/how-it-works" variant="primary">
            How it works
          </PillLink>

          {/* Same-tab */}
          <PillLink href={APP_URL}>Enter the App</PillLink>
        </div>

        <div className="ns-trust-strip" style={{ marginTop: 10 }}>
          <span>Not a social network</span>
          <span>Not a content farm</span>
          <span>Not a writing game</span>
          <span>Structure over chaos</span>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">What is NextScenes?</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          NextScenes is a storycraft workspace. A story is led by a writer, the
          community contributes proposals and feedback, decisions are made
          consciously, and the story grows step by step into a coherent book.
          Nothing becomes canon by accident.
        </p>

        <div className="ns-grid-3">
          <Card title="A writer leads a story">
            One writer sets direction, tone, standards, and continuity. The
            writer remains responsible for coherence, fairness, and the final
            shape of the book.
          </Card>

          <Card title="A community contributes proposals">
            Readers and contributors propose scenes, discuss options, and sharpen
            ideas. They support the story’s growth without hijacking authorship.
          </Card>

          <Card title="The story grows by decisions">
            Each accepted scene is chosen deliberately and recorded clearly.
            NextScenes preserves what was proposed, what became canon, and why.
          </Card>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">Why NextScenes exists</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          Many collaborative writing spaces online fall into the same habits:
          chaos instead of structure, noise instead of direction, popularity
          instead of judgment, speed instead of depth. NextScenes exists to prove
          a different model, one where collaboration does not destroy authorship,
          and community does not erase responsibility.
        </p>

        <div className="ns-grid-3">
          <Card title="Patience to storytelling">
            Stories are built in steps, with memory and continuity, not rushed
            into fragments.
          </Card>

          <Card title="Discipline to imagination">
            Roles are clear, choices are deliberate, and the craft is respected.
            Good stories do not grow well in disorder.
          </Card>

          <Card title="Meaning to digital creativity">
            The platform values depth, coherence, and cultural responsibility
            over empty metrics and performative noise.
          </Card>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">The core workflow</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          At the heart of NextScenes is a simple workflow that protects
          authorship while welcoming real collaboration.
        </p>

        <div className="ns-card" style={{ padding: 18 }}>
          <ol className="ns-list" style={{ paddingLeft: 18, margin: 0 }}>
            <li>A writer creates a storyline and sets direction.</li>
            <li>The writer opens a proposal round for the next scene.</li>
            <li>Readers and contributors propose scenes and discuss them.</li>
            <li>The writer selects the next canon scene (or writes it directly).</li>
            <li>
              The story continues step by step, with a clear record of decisions.
            </li>
          </ol>
          <p className="ns-p" style={{ marginTop: 12, marginBottom: 0 }}>
            Every accepted scene is a decision, not an accident.
          </p>
        </div>

        <div className="ns-section-cta">
          <Link className="ns-btn ns-btn-primary" href="/how-it-works">
            See the full process
          </Link>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">Who NextScenes is for</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          NextScenes serves people who want structured creative work with clear
          roles, clear standards, and a safer community environment.
        </p>

        <div className="ns-grid-3">
          <Card title="Writers">
            For writers who want to build serious stories, keep continuity, and
            still welcome thoughtful collaboration on their terms.
          </Card>
          <Card title="Readers and contributors">
            For readers who want to participate in the creative process with
            respect, and to learn how stories are built, not just consume the
            final product.
          </Card>
          <Card title="Schools and institutions">
            For classrooms, clubs, youth programs, libraries, and cultural
            institutions that want meaningful creative tools with structure and
            accountability.
          </Card>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">Different ways to write</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          NextScenes supports multiple writing models, all built on structure,
          clear roles, accountability, and respect for the story.
        </p>

        <div className="ns-grid-3">
          <Card title="Solo Writing">
            One writer builds the story while readers follow and comment.
          </Card>
          <Card title="Collaborative Writing">
            One writer leads. Others propose and discuss. The writer decides what
            becomes canon.
          </Card>
          <Card title="Group Writing (Open / Closed)">
            Communities write inside a shared structure, either publicly or in
            an invited private circle.
          </Card>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">A platform with values</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          NextScenes is built on a simple principle:{" "}
          <b>Imagination with conscience</b>. Stories shape culture. Culture
          shapes people. Therefore, storytelling platforms carry responsibility
          for what they reward, normalize, and spread.
        </p>

        <div className="ns-grid-3">
          <Card title="Ethical framework">
            A clear values foundation guides what the platform supports and what
            it refuses to normalize.
          </Card>
          <Card title="Community rules">
            Community health matters. Safety is not optional. Respect is not a
            “feature request.”
          </Card>
          <Card title="Institutional standards">
            NextScenes is designed to be trusted by schools, partners, and
            communities that care about dignity, fairness, and responsibility.
          </Card>
        </div>

        <div className="ns-section-cta">
          <Link className="ns-btn ns-btn-ghost" href="/safety">
            Read Safety and Values
          </Link>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">Long-term vision</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          NextScenes aims to become a trusted creative platform, a partner to
          schools and cultural institutions, a home for serious collaborative
          storytelling, and a living archive that preserves the history of how
          stories were built, not only the final result.
        </p>

        <div className="ns-card">
          <h3 className="ns-h3">In one sentence</h3>
          <p className="ns-p" style={{ marginBottom: 0 }}>
            NextScenes is where stories are not only written together, but built
            together carefully, consciously, and with responsibility.
          </p>
        </div>

        <div className="ns-section-cta">
          <PillLink href="/partners" variant="primary">
            Partnerships and institutions
          </PillLink>
          <PillLink href="/contact">Contact</PillLink>
        </div>
      </section>
    </div>
  );
}
