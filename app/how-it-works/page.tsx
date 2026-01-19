import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <div className="ns-page">
      <h1 className="ns-h1">How NextScenes Works</h1>

      <p className="ns-p">
        NextScenes is a platform for building stories step by step in a structured
        and responsible way. Unlike ordinary writing platforms where anyone can
        change anything at any time, NextScenes uses a governed process: stories
        have leaders, contributions follow rules, decisions are recorded, and the
        story grows deliberately, not randomly.
      </p>

      <h2 className="ns-h2">The Main Roles</h2>

      <h3 className="ns-h3">The Story Owner / Main Writer</h3>
      <ul className="ns-list">
        <li>Creates the storyline</li>
        <li>Sets the direction and tone of the story</li>
        <li>Writes canon scenes or approves them from proposals</li>
        <li>Decides when to open and close proposal rounds</li>
        <li>Is responsible for the coherence and integrity of the story</li>
      </ul>

      <h3 className="ns-h3">Writers and Contributors</h3>
      <ul className="ns-list">
        <li>Can propose scenes</li>
        <li>Can comment and discuss</li>
        <li>Can vote and give feedback (where allowed)</li>
        <li>Do not directly change the official story</li>
      </ul>

      <h3 className="ns-h3">Readers</h3>
      <ul className="ns-list">
        <li>Can read the story</li>
        <li>Can comment and follow the process</li>
        <li>Can observe how decisions are made</li>
        <li>In some stories, may also propose scenes</li>
      </ul>

      <h3 className="ns-h3">Administrators and Moderators</h3>
      <ul className="ns-list">
        <li>Maintain platform rules</li>
        <li>Enforce safety and values</li>
        <li>Protect communities and users</li>
        <li>Intervene when necessary</li>
      </ul>

      <h2 className="ns-h2">The Story Lifecycle</h2>

      <h3 className="ns-h3">1. Create a Storyline</h3>
      <p className="ns-p">
        A writer creates a storyline, chooses a title and forum, and writes the
        first canon scene (or sets the opening). This establishes the foundation
        of the book.
      </p>

      <h3 className="ns-h3">2. Write Canon or Open Proposals</h3>
      <p className="ns-p">
        At any point, the main writer can continue writing alone (solo mode) or
        open a proposal round to invite contributions.
      </p>

      <h3 className="ns-h3">3. Proposal Round</h3>
      <p className="ns-p">
        When a proposal round is open, contributors submit proposed scenes, the
        community discusses them, and in some modes, voting is enabled. The main
        writer reviews all proposals.
      </p>

      <h3 className="ns-h3">4. Decision</h3>
      <p className="ns-p">
        The main writer chooses one proposal (or writes their own), approves it as
        the next canon scene, and writes a Decision Note explaining the choice.
        This preserves transparency, learning, and accountability.
      </p>

      <h3 className="ns-h3">5. The Story Continues</h3>
      <p className="ns-p">
        The cycle repeats. Canon grows. Proposals are opened when needed. The
        story evolves in a controlled, visible way.
      </p>

      <h2 className="ns-h2">Canon vs Proposals</h2>

      <h3 className="ns-h3">Canon Scenes</h3>
      <ul className="ns-list">
        <li>Are the official story</li>
        <li>Cannot be changed by contributors</li>
        <li>Form the actual book</li>
      </ul>

      <h3 className="ns-h3">Proposal Scenes</h3>
      <ul className="ns-list">
        <li>Are suggestions</li>
        <li>Are not part of the story unless approved</li>
        <li>Exist to help the writer make better decisions</li>
      </ul>

      <h2 className="ns-h2">The Different Writing Modes</h2>

      <ul className="ns-list">
        <li>
          <strong>Solo Writing:</strong> One writer writes the entire story.
          Readers can follow and comment.
        </li>
        <li>
          <strong>Collaborative Writing:</strong> One writer leads, the community
          proposes scenes, the writer decides what becomes canon.
        </li>
        <li>
          <strong>Group Writing (Open):</strong> A community writes together in a
          shared structure.
        </li>
        <li>
          <strong>Group Writing (Closed):</strong> A private invited group writes
          together, used for classrooms, clubs, or private circles.
        </li>
      </ul>

      <h2 className="ns-h2">Comments, Feedback, and Activity</h2>

      <p className="ns-p">
        Every story and scene can have comments. Comments are for discussion, not
        for changing the story. Moderation rules apply. NextScenes also shows
        recent activity and trending stories to help communities stay alive and
        help readers discover active work.
      </p>

      <h2 className="ns-h2">Decision History and Transparency</h2>

      <p className="ns-p">
        NextScenes preserves what was proposed, what was chosen, and why it was
        chosen. This creates a learning environment, a visible creative process,
        and a historical record of how stories were built.
      </p>

      <h2 className="ns-h2">Why This Structure Matters</h2>

      <p className="ns-p">
        This structure exists to protect story coherence, prevent chaos, teach
        disciplined creativity, and preserve authorship while welcoming
        collaboration.
      </p>

      <div className="ns-callout">
        <p className="ns-p">
          In one sentence: NextScenes turns storytelling from a chaotic crowd
          activity into a guided, transparent, and meaningful creative process.
        </p>
      </div>

      <div className="ns-actions">
        <Link href="/about" className="ns-btn-secondary">
          About NextScenes
        </Link>
        <a href="https://app.nextscenes.org" className="ns-btn-primary">
          Enter the App
        </a>
      </div>
    </div>
  );
}
