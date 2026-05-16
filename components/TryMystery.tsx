"use client";

import Link from "next/link";
import type { MysteryPuzzle } from "@/data/mystery250/types";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.nextscenes.org";

type Lang = "en" | "fr";

type TryMysteryProps = {
  lang?: Lang;
  initialPuzzle: MysteryPuzzle | null;
  puzzles?: MysteryPuzzle[];
};

function slugifyPuzzleRef(value: string) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getAppMysteryRef(puzzle: MysteryPuzzle | null) {
  const id = String(puzzle?.id || "").trim();
  const knownRefs: Record<string, string> = {
    "m250-001": "the-vanishing-necklace",
    "m250-002": "the-midnight-visitor",
    "m250-003": "the-silent-clock",
  };

  return knownRefs[id] || slugifyPuzzleRef(puzzle?.title || puzzle?.slug || puzzle?.id || "");
}

function getAppMysteryHref(puzzle: MysteryPuzzle | null) {
  const ref = getAppMysteryRef(puzzle);
  if (!ref) return `${APP_URL}/mystery250`;

  const params = new URLSearchParams({ mystery: ref });
  return `${APP_URL}/mystery250?${params.toString()}`;
}

export default function TryMystery({
  lang = "en",
  initialPuzzle,
}: TryMysteryProps) {
  const currentPuzzle = initialPuzzle;

  const ui =
    lang === "fr"
      ? {
          title: "Essayez un mystère",
          featureLabel: "Mystère de la semaine",
          solve: "Résoudre ce mystère",
          clues: "Indices",
          caseQuestion: "Question du cas",
          culpritQuestion: "Qui est le coupable ?",
          noPuzzle: "Aucun mystère n’est disponible pour le moment.",
        }
      : {
          title: "Try a Mystery",
          featureLabel: "Mystery of the Week",
          solve: "Solve this mystery",
          clues: "Clues",
          caseQuestion: "Case Question",
          culpritQuestion: "Who is the culprit?",
          noPuzzle: "No mystery is available right now.",
        };


  if (!currentPuzzle) {
    return (
      <section className="ns-section ns-m250-panel ns-m250-try">
        <div className="ns-m250-try-head">
          <h2 className="ns-h2 ns-m250-section-title">{ui.title}</h2>
          <p className="ns-p ns-m250-section-intro ns-m250-try-intro">
            {ui.noPuzzle}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="ns-section ns-m250-panel ns-m250-try">
      <div className="ns-m250-try-head">
        <h2 className="ns-h2 ns-m250-section-title">{ui.title}</h2>

        <div className="ns-m250-try-meta">
          <div className="ns-m250-try-kicker">{ui.featureLabel}</div>
          <h3 className="ns-h3 ns-m250-try-title">{currentPuzzle.title}</h3>
        </div>
      </div>

      <div className="ns-m250-try-case">
        <p className="ns-p ns-m250-try-line">{currentPuzzle.setup}</p>

        {Array.isArray(currentPuzzle.clues) && currentPuzzle.clues.length > 0 ? (
          <>
            <p className="ns-p ns-m250-try-rule">
              <strong>{ui.clues}</strong>
            </p>
            {currentPuzzle.clues.map((clue, index) => (
              <p
                key={`${currentPuzzle.id}-clue-${index}`}
                className="ns-p ns-m250-try-line"
              >
                {clue}
              </p>
            ))}
          </>
        ) : null}

        <p className="ns-p ns-m250-try-question">
          <strong>{ui.caseQuestion}:</strong> {ui.culpritQuestion}
        </p>
      </div>

      <div className="ns-hero-cta ns-m250-try-actions">
        <Link
          href={getAppMysteryHref(currentPuzzle)}
          className="ns-btn ns-btn-primary"
        >
          {ui.solve}
        </Link>
      </div>
    </section>
  );
}
