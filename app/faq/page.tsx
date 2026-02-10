// app/faq/page.tsx
// Build: 2026-02-beta-faq-v1

export const metadata = {
  title: "FAQ | NextScenes",
  description: "Frequently asked questions about the NextScenes beta program.",
};

export default function FAQPage() {
  return (
    <main className="ns-page">
      <h1 className="ns-h1">Frequently Asked Questions</h1>

      <p className="ns-subtitle">
        Clear answers about the NextScenes beta program.
      </p>

      <section className="ns-section ns-paper" style={{ marginTop: 18 }}>
        <h2 className="ns-h2">What is NextScenes?</h2>
        <p className="ns-p">
          NextScenes is a structured storytelling platform where stories are built using
          defined writing modes and governance rules. It is designed for serious,
          coherent, and collaborative storytelling.
        </p>

        <h2 className="ns-h2">Is this a public release?</h2>
        <p className="ns-p">
          No. The platform is currently operating in a limited beta phase.
          Features may change, improve, or be removed as the system evolves.
        </p>

        <h2 className="ns-h2">Who can access the beta?</h2>
        <p className="ns-p">
          Access is currently limited to invited testers. Registration is controlled
          and may be restricted during this phase.
        </p>

        <h2 className="ns-h2">What are writing modes?</h2>
        <p className="ns-p">
          Writing modes define how authority and canon decisions work inside a story.
          The available modes are:
        </p>
        <ul className="ns-p" style={{ marginLeft: 20 }}>
          <li>Solo</li>
          <li>Collaborative</li>
          <li>Group (Open)</li>
          <li>Group (Closed)</li>
        </ul>
        <p className="ns-p">
          Each mode establishes clear decision rules and responsibility structures.
        </p>

        <h2 className="ns-h2">Is my work private?</h2>
        <p className="ns-p">
          Privacy depends on the story’s configuration and writing mode.
          Beta testers should not treat the platform as a private storage system.
          Always keep personal backups of important work.
        </p>

        <h2 className="ns-h2">Can I lose my content?</h2>
        <p className="ns-p">
          While unlikely, beta systems may experience instability.
          Users are encouraged to maintain independent backups of important content.
        </p>

        <h2 className="ns-h2">How do I report issues?</h2>
        <p className="ns-p">
          Use the Beta Feedback feature inside the application or contact the
          beta support email provided in your invitation.
        </p>

        <h2 className="ns-h2">What is Mystery250?</h2>
        <p className="ns-p">
          Mystery250 is a structured narrative challenge hosted within NextScenes.
          It explores disciplined storytelling within defined creative constraints.
          Details may expand as the beta progresses.
        </p>
      </section>
    </main>
  );
}
