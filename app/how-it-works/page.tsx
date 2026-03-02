"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.nextscenes.org";

const ROLE_CARDS = [
  {
    title: "Story Owner (Main Writer)",
    body:
      "Creates the storyline, sets direction and tone, and protects continuity. The story owner writes canon scenes or selects the next canon from proposals, and keeps the book coherent.",
    points: [
      "Creates the storyline",
      "Sets direction and tone",
      "Writes canon or selects canon",
      "Opens and closes proposal rounds",
      "Protects story integrity",
    ],
  },
  {
    title: "Writers and Contributors",
    body:
      "Help the story grow by proposing scenes, discussing options, and offering feedback without rewriting the official book directly.",
    points: [
      "Propose scenes",
      "Discuss and comment",
      "Vote or review where enabled",
      "Do not directly change canon",
    ],
  },
  {
    title: "Readers",
    body:
      "Follow the story, watch how decisions are made, and participate through comments. Some storylines may allow reader proposals.",
    points: [
      "Read and follow stories",
      "Comment and discuss",
      "See decisions and notes",
      "May propose in some modes",
    ],
  },
  {
    title: "Admins and Moderators",
    body:
      "Protect the community by enforcing rules, handling abuse, and intervening when needed to keep the platform safe and fair.",
    points: [
      "Enforce safety and values",
      "Support healthy communities",
      "Intervene when necessary",
      "Maintain platform rules",
    ],
  },
];

const LIFECYCLE_CARDS = [
  {
    title: "1. Create a Storyline",
    body: "Start a book by choosing a forum, setting a title, and publishing the opening canon scene (or the opening setup).",
  },
  {
    title: "2. Write Solo or Open Proposals",
    body: "Continue alone or invite contributions. The story owner decides when collaboration is useful.",
  },
  {
    title: "3. Proposal Round",
    body: "Contributors submit scene proposals. Discussion happens in public view, and voting may be enabled depending on the mode.",
  },
  {
    title: "4. Decision Note",
    body: "One scene becomes the next canon (selected or written by the story owner). A short Decision Note explains why.",
  },
  {
    title: "5. Repeat and Grow",
    body: "Canon expands step by step. Proposals open when needed. The process stays deliberate, readable, and accountable.",
  },
];

const CANON_CARDS = [
  {
    title: "Canon Scenes",
    body: "The official book. Canon is what readers come to trust.",
    points: ["Official story", "Not editable by contributors", "Forms the book"],
  },
  {
    title: "Proposal Scenes",
    body:
      "Suggestions that help the writer choose wisely and stay accountable. Proposals are preserved for learning and transparency.",
    points: [
      "Ideas and alternatives",
      "Not part of the book unless approved",
      "Preserved for learning and transparency",
    ],
  },
];

const MODE_CARDS = [
  {
    title: "Solo Writing",
    body: "One writer writes the full story. Readers can follow and comment.",
  },
  {
    title: "Collaborative Writing",
    body:
      "One writer leads. Contributors can propose scenes from anywhere in the world. The writer decides what becomes canon.",
  },
  {
    title: "Group Writing (Open)",
    body:
      "A community writes together inside a shared structure and clear rules.",
  },
  {
    title: "Group Writing (Closed)",
    body:
      "A private invited group writes together, useful for classrooms, clubs, and private circles.",
  },
];

const SIMPLE_PATH = [
  {
    title: "🌐 1. Visit the Public Site",
    body:
      "Explore NextScenes on the public website. When you are ready to write, click “Enter the App.”",
  },
  {
    title: "👤 2. Create Your Account",
    body:
      "Sign up with your name, email, and password. Your personal writing space is created.",
  },
  {
    title: "📚 3. Create Your Story in Story Hub",
    body:
      "Go to Story Hub and click “Create Storyline.” Add a title, description, and choose a writing mode.",
  },
  {
    title: "✍️ 4. Develop Your Story in WriterStudio",
    body:
      "Open your storyline, go to WriterStudio, write your scenes, and save your work.",
  },
  {
    title: "🌍 5. Collaborate from Anywhere",
    body:
      "Contributors can participate from any city or country, as long as they have internet access.",
  },
  {
    title: "💾 6. Your Work Stays Saved",
    body:
      "Return anytime to continue. Your stories remain safely stored in your account.",
  },
];

function ImgBlock({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div style={{ margin: "14px 0 18px" }}>
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={900}
        priority={priority}
        style={{
          width: "100%",
          height: "auto",
          borderRadius: 10,
          display: "block",
        }}
      />
    </div>
  );
}

export default function HowItWorksPage() {
  const pathname = usePathname();
  const isFR = pathname?.startsWith("/fr");

  const aboutHref = isFR ? "/fr/about" : "/about";
  const contactHref = isFR ? "/fr/contact" : "/contact";

  return (
    <div className="ns-page ns-compact">
      <h1 className="ns-h1">How NextScenes Works</h1>

      {/* HERO IMAGE */}
      <ImgBlock
        src="/images/hero-writing-desk.webp"
        alt="A calm writing desk for NextScenes"
        priority
      />

      <p className="ns-p">
        NextScenes builds stories step by step with leadership, rules, and
        recorded decisions. The goal is simple: no chaos, no silent rewrites, no
        hidden manipulation. Just a visible creative process that respects
        authorship and welcomes meaningful collaboration.
      </p>

      <div className="ns-callout">
        <p className="ns-p" style={{ marginBottom: 0 }}>
          Quick orientation: <strong>Story Hub creates stories.</strong>{" "}
          <strong>WriterStudio develops stories.</strong>
        </p>
      </div>

      <h2 className="ns-h2">Public Site vs App Site</h2>
      <div className="ns-grid-3">
        <div className="ns-card">
          <h3 className="ns-h3">Public Site</h3>
          <p className="ns-p">
            The public site is for learning and exploring. It explains what
            NextScenes is and how it works.
          </p>
          <ul className="ns-list">
            <li>Explore and understand</li>
            <li>Read about writing modes</li>
            <li>Find help and contact</li>
          </ul>
        </div>

        <div className="ns-card">
          <h3 className="ns-h3">App Site</h3>
          <p className="ns-p">
            The app site is where writing begins. This is your personal writing
            space.
          </p>
          <ul className="ns-list">
            <li>Create storylines in Story Hub</li>
            <li>Develop your story in WriterStudio</li>
            <li>Write alone or collaborate</li>
          </ul>
        </div>

        <div className="ns-card">
          <h3 className="ns-h3">Start here</h3>
          <p className="ns-p">
            If you want to write now, enter the app. If you need guidance first,
            continue reading this page.
          </p>
          <div className="ns-actions" style={{ justifyContent: "flex-start" }}>
            <Link href={APP_URL} className="ns-btn ns-btn-primary">
              Enter the App
            </Link>
          </div>
        </div>
      </div>

      <h2 className="ns-h2">The Two Main Places</h2>
      <div className="ns-grid-3">
        <div className="ns-card">
          <h3 className="ns-h3">Story Hub</h3>

          {/* STORY HUB IMAGE */}
          <ImgBlock
            src="/images/story-hub.webp"
            alt="Story Hub: create a storyline and choose a writing mode"
          />

          <p className="ns-p">
            <strong>Create your story.</strong> Story Hub is where stories are
            born. Create a storyline, set the title and description, and choose
            a writing mode.
          </p>
          <p className="ns-p" style={{ marginBottom: 0 }}>
            <strong>Story Hub creates.</strong>
          </p>
        </div>

        <div className="ns-card">
          <h3 className="ns-h3">WriterStudio</h3>

          {/* WRITER STUDIO IMAGE */}
          <ImgBlock
            src="/images/writer-studio.webp"
            alt="WriterStudio: writing and developing scenes"
          />

          <p className="ns-p">
            <strong>Develop your story.</strong> WriterStudio is where your work
            grows. Write scenes, build momentum, and shape your book over time.
          </p>
          <p className="ns-p" style={{ marginBottom: 0 }}>
            <strong>WriterStudio develops.</strong>
          </p>
        </div>

        <div className="ns-card">
          <h3 className="ns-h3">What you can write</h3>
          <p className="ns-p">
            You can write novels, textbooks, movie scripts, music, and community
            projects. NextScenes supports serious writing in a structured way.
          </p>

          {/* GLOBAL COLLAB IMAGE */}
          <ImgBlock
            src="/images/global-collaboration.webp"
            alt="Global collaboration: contributors anywhere in the world"
          />

          <p className="ns-p" style={{ marginBottom: 0 }}>
            Contributors can join from anywhere in the world with internet
            access.
          </p>
        </div>
      </div>

      <h2 className="ns-h2">The Simple Path</h2>
      <div className="ns-grid-3">
        {SIMPLE_PATH.map((c) => (
          <div key={c.title} className="ns-card">
            <h3 className="ns-h3">{c.title}</h3>
            <p className="ns-p">{c.body}</p>
          </div>
        ))}
      </div>

      <h2 className="ns-h2">The Main Roles</h2>
      <div className="ns-grid-3">
        {ROLE_CARDS.map((c) => (
          <div key={c.title} className="ns-card">
            <h3 className="ns-h3">{c.title}</h3>
            <p className="ns-p">{c.body}</p>
            {Array.isArray(c.points) && c.points.length > 0 ? (
              <ul className="ns-list">
                {c.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>

      <h2 className="ns-h2">The Story Lifecycle</h2>
      <div className="ns-grid-3">
        {LIFECYCLE_CARDS.map((c) => (
          <div key={c.title} className="ns-card">
            <h3 className="ns-h3">{c.title}</h3>
            <p className="ns-p">{c.body}</p>
          </div>
        ))}
      </div>

      <h2 className="ns-h2">Canon vs Proposals</h2>
      <div className="ns-grid-3">
        {CANON_CARDS.map((c) => (
          <div key={c.title} className="ns-card">
            <h3 className="ns-h3">{c.title}</h3>
            <p className="ns-p">{c.body}</p>
            {Array.isArray(c.points) && c.points.length > 0 ? (
              <ul className="ns-list">
                {c.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>

      <h2 className="ns-h2">Writing Modes</h2>

      {/* WRITING MODES IMAGE */}
      <ImgBlock
        src="/images/writing-modes-global.webp"
        alt="NextScenes writing modes: solo, collaborative, group limited access, group restricted access"
      />

      <div className="ns-grid-3">
        {MODE_CARDS.map((c) => (
          <div key={c.title} className="ns-card">
            <h3 className="ns-h3">{c.title}</h3>
            <p className="ns-p">{c.body}</p>
          </div>
        ))}
      </div>

      <h2 className="ns-h2">Comments and Activity</h2>
      <div className="ns-grid-3">
        <div className="ns-card">
          <h3 className="ns-h3">Discussion, Not Rewrite</h3>
          <p className="ns-p">
            Comments exist to discuss scenes, ask questions, and offer feedback.
            They do not rewrite canon. Moderation rules apply so debate stays
            human.
          </p>
        </div>
        <div className="ns-card">
          <h3 className="ns-h3">Discovery That Keeps Communities Alive</h3>
          <p className="ns-p">
            Recent activity and trending storylines help readers find living work
            and help writers gather attention where it matters.
          </p>
        </div>
        <div className="ns-card">
          <h3 className="ns-h3">Decision History</h3>
          <p className="ns-p">
            NextScenes preserves what was proposed, what became canon, and the
            Decision Note explaining why. That record protects fairness,
            learning, and trust.
          </p>
        </div>
      </div>

      <h2 className="ns-h2">Why the Structure Matters</h2>
      <div className="ns-grid-3">
        <div className="ns-card">
          <h3 className="ns-h3">Coherence and continuity</h3>
          <p className="ns-p">
            A story is not a comment thread. Structure protects continuity and
            keeps the book readable from beginning to end.
          </p>
        </div>
        <div className="ns-card">
          <h3 className="ns-h3">Fairness and accountability</h3>
          <p className="ns-p">
            When decisions are visible, collaboration stays honest. People can
            learn from the record instead of arguing in circles.
          </p>
        </div>
        <div className="ns-card">
          <h3 className="ns-h3">Safety and discipline</h3>
          <p className="ns-p">
            Clear rules reduce sabotage, reward craft, and help communities stay
            respectful even when opinions differ.
          </p>
        </div>
      </div>

      <h2 className="ns-h2">Need Help?</h2>
      <div className="ns-grid-3">
        <div className="ns-card">
          <h3 className="ns-h3">Contact NextScenes</h3>
          <p className="ns-p">
            If you have questions, need guidance, or want to report an issue,
            contact us anytime.
          </p>
          <ul className="ns-list">
            <li>Use the Contact page on the public site</li>
            <li>Explain what you tried and what you expected</li>
            <li>We will respond as soon as possible</li>
          </ul>
        </div>
      </div>

      <div className="ns-actions">
        <Link href={aboutHref} className="ns-btn ns-btn-secondary">
          About NextScenes
        </Link>

        <Link href={contactHref} className="ns-btn ns-btn-secondary">
          Contact NextScenes
        </Link>

        <Link href={APP_URL} className="ns-btn ns-btn-primary">
          Enter the App
        </Link>
      </div>
    </div>
  );
}