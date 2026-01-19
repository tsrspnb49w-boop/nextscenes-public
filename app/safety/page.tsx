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

export default function SafetyPage() {
  return (
    <div className="ns-page">
      <section style={{ padding: "10px 0 8px" }}>
        <h1 className="ns-h1">Safety and Values</h1>
        <p className="ns-subtitle" style={{ maxWidth: 920 }}>
          NextScenes is built on one foundational principle:{" "}
          <b>Imagination with conscience</b>. We believe stories shape minds, and
          minds shape society. Therefore, storytelling spaces must be governed
          with responsibility.
        </p>

        <div className="ns-hero-cta">
          <Link className="ns-btn ns-btn-primary" href="/how-it-works">
            How it works
          </Link>
          <a className="ns-btn ns-btn-ghost" href="https://app.nextscenes.org">
            Enter the App
          </a>
        </div>

        <div className="ns-trust-strip" style={{ marginTop: 10 }}>
          <span>Guided community</span>
          <span>Human dignity</span>
          <span>Order over noise</span>
          <span>Schools and partners welcome</span>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">Why safety matters here</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          NextScenes welcomes young writers, students, schools, families,
          communities, and serious authors. That means we cannot operate like an
          unregulated social platform. We exist to provide a safe creative
          environment, a respectful community, and a structured, moderated space
          with a culture of responsibility, not outrage.
        </p>

        <div className="ns-grid-3">
          <Card title="A safe creative environment">
            The platform is designed to support serious writing without exposing
            users to reckless content or abusive behavior.
          </Card>
          <Card title="A respectful community">
            People are not targets here. Disagreement is allowed. Disrespect is
            not.
          </Card>
          <Card title="A moderated structure">
            Rules exist to protect people, protect stories, and preserve a
            culture worth building in.
          </Card>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">Core values of NextScenes</h2>

        <div className="ns-grid-3">
          <Card title="Responsibility">
            Every user is responsible for what they write, what they propose,
            what they comment, and the tone they bring into the community.
            Freedom without responsibility is not creativity. It is chaos.
          </Card>

          <Card title="Respect for persons">
            No harassment. No humiliation. No personal attacks. No intimidation.
            No dehumanization. Disagreement is allowed. Disrespect is not.
          </Card>

          <Card title="Respect for the story">
            Stories are not trash cans for hate, obscenity, violence for its own
            sake, propaganda, or degradation. Serious themes are allowed.
            Irresponsible treatment of serious themes is not.
          </Card>
        </div>

        <div className="ns-grid-3" style={{ marginTop: 14 }}>
          <Card title="Truthfulness and integrity">
            No impersonation. No plagiarism. No stolen work. No deceptive
            identities. No manipulation of community processes. NextScenes is a
            craft space, not a trick space.
          </Card>

          <Card title="Order over noise">
            Discussion is welcome. Chaos is not. Debate is welcome. Mob behavior
            is not. The platform is designed to slow things down so that good
            decisions can be made.
          </Card>

          <Card title="Cultural responsibility">
            NextScenes does not pretend to be neutral about everything. We
            intentionally promote human dignity, responsibility, thoughtfulness,
            respect, and meaningful creativity.
          </Card>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">Protection of young users</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          NextScenes is designed to be usable by schools, youth programs, and
          educational clubs. Therefore, the following are not permitted:
        </p>

        <div className="ns-card">
          <ul className="ns-list" style={{ margin: 0 }}>
            <li>Explicit sexual content</li>
            <li>Pornographic material</li>
            <li>Exploitative content</li>
            <li>Glorification of cruelty or abuse</li>
          </ul>

          <p className="ns-p" style={{ marginTop: 12, marginBottom: 0 }}>
            Serious topics may be discussed, but only with maturity and
            responsibility.
          </p>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">Moderation philosophy</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          NextScenes uses human-centered moderation guided by clear rules, clear
          values, context (not algorithms alone), and judgment (not mob
          pressure). Moderation exists to protect people, protect the platform,
          protect the culture, and protect the stories.
        </p>

        <div className="ns-grid-3">
          <Card title="Clear rules">
            Standards are written and enforceable. This is not “anything goes.”
          </Card>
          <Card title="Context and judgment">
            We consider intent, pattern, and impact, not just keywords.
          </Card>
          <Card title="Protection of culture">
            We defend the kind of creative environment schools and families can
            trust.
          </Card>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">Roles and authority</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          NextScenes recognizes structured authority. Platform administrators set
          global rules. Group leaders and main writers govern their story spaces.
          Writers lead stories. Contributors propose, discuss, and advise.
        </p>

        <div className="ns-card">
          <p className="ns-p" style={{ marginBottom: 0 }}>
            This is not an anarchy. It is a constitutional creative system.
          </p>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">Zero-tolerance behaviors</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          The following behaviors are not tolerated on NextScenes:
        </p>

        <div className="ns-card">
          <ul className="ns-list" style={{ margin: 0 }}>
            <li>Harassment and bullying</li>
            <li>Hate speech</li>
            <li>Threats or intimidation</li>
            <li>Sexual exploitation</li>
            <li>Persistent disruption of communities</li>
            <li>Attempts to sabotage stories or groups</li>
            <li>Abuse of reporting or moderation systems</li>
          </ul>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">Reporting and intervention</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          Users can report harmful behavior, harmful content, or abuse of
          systems. The platform may remove content, suspend accounts, restrict
          participation, or permanently ban users in serious cases.
        </p>

        <div className="ns-section-cta">
          <Link className="ns-btn ns-btn-ghost" href="/contact">
            Contact
          </Link>
          <Link className="ns-btn ns-btn-primary" href="/partners">
            For schools and partners
          </Link>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">The spirit of the platform</h2>
        <div className="ns-card">
          <p className="ns-p" style={{ marginBottom: 10 }}>
            NextScenes is built for people who believe that not everything that
            can be written should be written.
          </p>
          <p className="ns-p" style={{ marginBottom: 0 }}>
            And not everything that can be imagined deserves applause.
          </p>
        </div>

        <div className="ns-card" style={{ marginTop: 14 }}>
          <h3 className="ns-h3">In one sentence</h3>
          <p className="ns-p" style={{ marginBottom: 0 }}>
            NextScenes is a protected creative space where freedom serves
            meaning, and imagination serves humanity.
          </p>
        </div>
      </section>
    </div>
  );
}
