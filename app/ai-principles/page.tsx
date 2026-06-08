import Link from "next/link";

export const metadata = {
  title: "NextScenes and Artificial Intelligence | NextScenes",
  description:
    "NextScenes uses artificial intelligence to support human creativity, while keeping author judgement and responsibility at the centre.",
};

export default function AiPrinciplesPage() {
  return (
    <div className="ns-page ns-compact">
      <section style={{ padding: "10px 0 8px" }}>
        <h1 className="ns-h1">NextScenes and Artificial Intelligence</h1>
        <p className="ns-subtitle" style={{ maxWidth: 920 }}>
          NextScenes believes that writing a book is a human journey. Artificial
          intelligence may support that journey, but the imagination, judgement,
          and final decision remain with the author.
        </p>

        <div className="ns-trust-strip" style={{ marginTop: 12 }}>
          <span>Human creativity first</span>
          <span>AI assistance second</span>
          <span>Author decision final</span>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">A human journey</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          NextScenes believes that writing a book is a human journey.
        </p>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          A story is not only a finished manuscript. It is the path of
          imagination, effort, doubt, revision, discovery, and judgement that
          carries the author from the first idea to the final work. On that
          journey, the author brings emotion, memory, conscience, culture,
          experience, and purpose. These human qualities remain central to the
          kind of storytelling NextScenes seeks to encourage.
        </p>
        <p className="ns-p" style={{ maxWidth: 980, marginBottom: 0 }}>
          Artificial intelligence can support that journey in useful and
          meaningful ways.
        </p>
      </section>

      <section className="ns-section">
        <div className="ns-card" style={{ padding: 22 }}>
          <h2 className="ns-h2">Our guiding principle</h2>
          <p
            className="ns-p"
            style={{
              maxWidth: 900,
              fontSize: "1.08rem",
              fontWeight: 800,
              marginBottom: 0,
            }}
          >
            Human creativity first. AI assistance second. Author decision final.
          </p>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">How AI may support writers</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          NextScenes may use AI to help writers improve grammar, clarity,
          structure, continuity, summaries, translations, age suitability,
          reader understanding, and content safety. AI may point out weak
          sentences, confusing passages, repeated ideas, possible
          contradictions, or language that does not meet the standards of the
          platform.
        </p>
        <p className="ns-p" style={{ maxWidth: 980, marginBottom: 0 }}>
          Within NextScenes, AI serves as an assistant to the writer.
        </p>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">The author remains responsible</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          AI does not own the story. It does not approve the story. It does not
          decide what becomes final. The writer remains responsible for the
          imagination, the message, the moral judgement, and the finished work.
        </p>
        <p className="ns-p" style={{ maxWidth: 980, marginBottom: 0 }}>
          NextScenes is designed to make the writing process visible,
          thoughtful, and rewarding. We want readers and users to accompany
          authors as stories grow, scene by scene, decision by decision, until a
          book finds its true shape.
        </p>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">In one sentence</h2>
        <p
          className="ns-p"
          style={{ maxWidth: 980, fontWeight: 800, marginBottom: 0 }}
        >
          At NextScenes, books are written by human beings. AI facilitates the
          journey.
        </p>
      </section>

      <div className="ns-actions">
        <Link className="ns-btn ns-btn-primary" href="/writers">
          For Writers
        </Link>
        <Link className="ns-btn ns-btn-ghost" href="/about">
          About NextScenes
        </Link>
      </div>
    </div>
  );
}
