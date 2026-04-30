import Link from "next/link";

const APP_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://app.nextscenes.org").replace(/\/+$/, "");

export const metadata = {
  title: "For Writers | NextScenes",
  description:
    "Write with confidence on NextScenes. Learn how story ownership, Canon, proposals, contributor credit, and manuscript generation are handled.",
};

const confidencePoints = [
  "Your original story remains under your authority.",
  "Only approved scenes become part of the official Canon.",
  "Accepted contributions are recorded for transparency and credit.",
  "Canon scenes can be gathered into a clean manuscript when the story is ready.",
];

const writingModes = [
  {
    title: "Solo Mode",
    body: "The author writes alone. Readers may follow the work, but they do not contribute scenes. This is best for writers who want full creative control.",
  },
  {
    title: "Collaborative Mode",
    body: "The author may open the story to proposals and decide what becomes Canon. This invites creative input without surrendering authority.",
  },
  {
    title: "Group Open Mode",
    body: "A more open structure for writing clubs, classrooms, and creative communities working under the rules of the story.",
  },
  {
    title: "Group Closed Mode",
    body: "A controlled space where only selected participants may contribute. This is useful for trusted teams, private projects, and invited collaborators.",
  },
];

const manuscriptItems = [
  "Title page and story details",
  "Author name and story description",
  "Approved Canon scenes in order",
  "Chapter or scene headings",
  "Generation date",
  "Contributor record where applicable",
  "Appendix of accepted contributions",
];

export default function WritersPage() {
  return (
    <div className="ns-page ns-writers-page">
      <section className="ns-writers-hero">
        <div className="ns-writers-hero-copy">
          <div className="ns-writers-kicker">For Writers</div>
          <h1 className="ns-writers-title">
            Write with confidence. Collaborate without losing control.
          </h1>
          <p className="ns-writers-lead">
            NextScenes is built for writers who take stories seriously. Here, a
            story is not thrown into the crowd and left to chance. It is shaped,
            protected, guided, and preserved.
          </p>
          <p className="ns-writers-lead">
            You may write alone, invite others to contribute, open a story to
            proposals, or keep the writing space controlled. But one principle
            remains clear: the author’s story must remain under the author’s
            authority.
          </p>

          <div className="ns-writers-actions">
            <a href={`${APP_URL}/storylines`} className="ns-btn ns-btn-primary">
              Start Writing
            </a>
            <Link href="/how-it-works" className="ns-btn ns-btn-ghost">
              See How It Works
            </Link>
          </div>
        </div>

        <div className="ns-writers-hero-card" aria-label="Writer confidence summary">
          <div className="ns-writers-card-label">Writer Confidence</div>
          <ul className="ns-writers-checklist">
            {confidencePoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ns-writers-section ns-writers-two-col">
        <div className="ns-writers-panel">
          <h2>Your story remains yours</h2>
          <p>
            When you create an original story on NextScenes, you do not surrender
            ownership of your work simply by using the platform. Your storyline,
            characters, world, and original scenes remain your creative property,
            subject to the platform terms and any specific agreement you choose
            to enter into.
          </p>
          <p>
            NextScenes is not designed to take stories away from writers. It is
            designed to help writers develop, organize, protect, and complete
            them.
          </p>
        </div>

        <div className="ns-writers-panel is-warm">
          <h2>Canon protects the story</h2>
          <p>
            On NextScenes, the Canon is the official version of the story. Only
            approved scenes become Canon. These approved scenes form the accepted
            story path and become the source material for manuscript generation.
          </p>
          <p>
            A proposal is only a suggestion until it is approved. Once approved,
            it becomes part of the Canon and is recorded as an accepted
            contribution.
          </p>
        </div>
      </section>

      <section className="ns-writers-section">
        <div className="ns-writers-section-head">
          <div className="ns-writers-kicker">Control by design</div>
          <h2>Writing modes give the author control</h2>
          <p>
            Different stories need different levels of openness. NextScenes gives
            writers a structure that matches the purpose of the story, not the
            noise of the crowd.
          </p>
        </div>

        <div className="ns-writers-grid-4">
          {writingModes.map((mode) => (
            <article className="ns-writers-mode-card" key={mode.title}>
              <h3>{mode.title}</h3>
              <p>{mode.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ns-writers-section ns-writers-two-col">
        <div className="ns-writers-panel is-deep">
          <h2>Proposals allow collaboration without chaos</h2>
          <p>
            Contributors may suggest what should happen next, but the author or
            authorized story controller decides whether the proposal fits the
            story. The author may approve one proposal, reject one proposal,
            reject all proposals, or continue writing directly in Canon mode.
          </p>
          <p>
            A proposal is an invitation, not an invasion. The crowd may bring a
            torch, but the author still holds the map.
          </p>
        </div>

        <div className="ns-writers-panel">
          <h2>Contributor credit is recorded</h2>
          <p>
            If a contributor submits a proposal and that proposal is accepted
            into Canon, the contribution should be recorded. This protects both
            the original author and the contributor.
          </p>
          <p>
            A contribution record may include contributor name, accepted scene,
            date of acceptance, accepted word count, decision history, and where
            applicable, percentage of the final Canon.
          </p>
        </div>
      </section>

      <section className="ns-writers-section ns-writers-manuscript">
        <div className="ns-writers-manuscript-copy">
          <div className="ns-writers-kicker">From scenes to manuscript</div>
          <h2>Generate Manuscript</h2>
          <p>
            NextScenes is not only a place to post scenes. It is designed to help
            stories become complete works. The Generate Manuscript feature is
            intended to gather approved Canon scenes into a clean manuscript
            format.
          </p>
          <p>
            The manuscript should be generated from approved Canon material only.
            Rejected proposals, pending proposals, private notes, and unrelated
            comments should not appear in the final manuscript unless the author
            chooses a special export option.
          </p>
        </div>

        <div className="ns-writers-manuscript-card">
          <h3>A clean manuscript may include</h3>
          <ul className="ns-writers-checklist compact">
            {manuscriptItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="ns-writers-format-row">
            <span>DOCX</span>
            <span>PDF</span>
            <span>Markdown</span>
          </div>
        </div>
      </section>

      <section className="ns-writers-section ns-writers-two-col">
        <div className="ns-writers-panel">
          <h2>Future benefit sharing</h2>
          <p>
            Some stories may remain creative exercises. Some may become books,
            serials, anthologies, audio stories, films, educational materials, or
            other commercial works. Where a collaborative story leads to
            publication or commercial benefit, the guiding principle is simple:
            accepted contributions should be recognized fairly.
          </p>
          <p>
            As a default principle, contribution may be measured by accepted
            Canon word count unless another written agreement applies. Special
            projects may require special written terms before collaboration
            begins.
          </p>
        </div>

        <div className="ns-writers-panel is-warm">
          <h2>Decision Logs create transparency</h2>
          <p>
            Good collaboration requires memory. Decision records can show who
            submitted a proposal, when it was submitted, whether it was approved
            or rejected, who made the decision, and whether it became Canon.
          </p>
          <p>
            Fairness should not be left to memory. It should be built into the
            system.
          </p>
        </div>
      </section>

      <section className="ns-writers-section ns-writers-plain">
        <div>
          <h2>Originality, responsibility, and legal review</h2>
          <p>
            Every writer and contributor should submit only work they have the
            right to use. Copied material, stolen scenes, copyrighted passages,
            or content taken from another source without proper rights should not
            be submitted.
          </p>
          <p>
            NextScenes can provide platform rules, contribution records, and
            clear participation terms. But when a story moves toward commercial
            publication, especially where several contributors are involved,
            legal review may be necessary for publication contracts, revenue
            sharing, adaptations, copyright transfer, contributor payment, or
            ownership disputes.
          </p>
          <p>
            This does not mean writers need lawyers before they begin writing.
            It means serious commercial steps should be handled properly. A good
            fence is not an insult to friendship; it is what keeps friendship
            from becoming a court case.
          </p>
        </div>
      </section>

      <section className="ns-writers-promise">
        <div className="ns-writers-kicker">The NextScenes promise</div>
        <h2>Bring your story here. You will not be swallowed by the crowd.</h2>
        <p>
          You decide what becomes Canon. Every accepted contribution is
          remembered. When the work is ready, NextScenes helps you gather it into
          a manuscript.
        </p>
        <p>
          This is writing with structure. This is collaboration with conscience.
          This is imagination with responsibility.
        </p>
        <div className="ns-writers-actions centered">
          <a href={`${APP_URL}/storylines`} className="ns-btn ns-btn-primary">
            Enter the App
          </a>
          <Link href="/fr/auteurs" className="ns-btn ns-btn-ghost">
            Lire en français
          </Link>
        </div>
      </section>
    </div>
  );
}
