// app/faq/page.tsx
import { buildMetadata } from "@/app/seo";

export const metadata = buildMetadata({
  title: "Frequently Asked Questions | Writing and Reading | NextScenes",
  description: "Find clear answers about writing, reading, collaboration, project privacy, and getting started with NextScenes.",
  path: "/faq",
  languages: { en: "/faq", fr: "/fr/faq" },
});

export default function FAQPage() {
  return (
    <main className="ns-page">
      <h1 className="ns-h1">Frequently Asked Questions</h1>

      <p className="ns-subtitle">
        Clear answers about reading, writing, collaboration and using NextScenes.
      </p>

      <section className="ns-section ns-paper" style={{ marginTop: 18 }}>
        <h2 className="ns-h2">What is NextScenes?</h2>
        <p className="ns-p">
          NextScenes is a workspace for writing, editing, organising and formatting books.
          Authors can work independently or collaborate according to clear roles and
          decisions, while readers can explore stories made publicly available.
        </p>

        <h2 className="ns-h2">Can I visit NextScenes now?</h2>
        <p className="ns-p">
          Yes. The public website is available to visitors. The writing application is
          in an early-access period, with ongoing improvements as writers test
          its features.
        </p>

        <h2 className="ns-h2">Who can write or contribute?</h2>
        <p className="ns-p">
          Writing, commenting and contributing require a registered account with writer
          permissions. Access to individual projects also depends on their
          visibility, membership and writing mode.
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

        <h2 className="ns-h2">Are my projects private?</h2>
        <p className="ns-p">
          Privacy depends on each project's visibility, membership and writing mode.
          Material shared in a public project may be visible to other readers.
          Keep independent copies of important manuscripts.
        </p>

        <h2 className="ns-h2">Should I keep backups of my writing?</h2>
        <p className="ns-p">
          Yes. Keep your own copies of important manuscripts, just as you would with
          work prepared in any other writing software.
        </p>

        <h2 className="ns-h2">How do I report issues?</h2>
        <p className="ns-p">
          Use the Contact page on the public website to report problems or
          ask for assistance.
        </p>

        <h2 className="ns-h2">What is Mystery250?</h2>
        <p className="ns-p">
          Mystery250 offers short mystery stories and reading puzzles that encourage
          observation, reasoning and imagination. Some activities are still
          being developed.
        </p>
      </section>
    </main>
  );
}
