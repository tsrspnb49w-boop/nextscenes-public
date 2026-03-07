"use client";

import { useState } from "react";
import Link from "next/link";
import type { MysteryPuzzle } from "@/data/mystery250/types";
import { selectAnotherPuzzle } from "@/lib/mystery250/selectPuzzle";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.nextscenes.org";

type Lang = "en" | "fr";

type TryMysteryProps = {
  lang?: Lang;
  initialPuzzle: MysteryPuzzle | null;
  puzzles: MysteryPuzzle[];
};

export default function TryMystery({
  lang = "en",
  initialPuzzle,
  puzzles,
}: TryMysteryProps) {
  const [currentPuzzle, setCurrentPuzzle] = useState<MysteryPuzzle | null>(
    initialPuzzle
  );
  const [showSolution, setShowSolution] = useState(false);

  const ui =
    lang === "fr"
      ? {
          title: "Essayez un mystère",
          featureLabel: "Mystère du jour",
          reveal: "Voir le raisonnement",
          hide: "Masquer le raisonnement",
          tryAnother: "Essayer un autre mystère",
          clues: "Indices",
          caseQuestion: "Question du cas",
          culpritQuestion: "Qui est le coupable ?",
          solutionTitle: "Raisonnement",
          noPuzzle: "Aucun mystère n’est disponible pour le moment.",
          cta: "Découvrir d'autres mystères dans l’App",
        }
      : {
          title: "Try a Mystery",
          featureLabel: "Mystery of the Day",
          reveal: "Reveal the reasoning",
          hide: "Hide the reasoning",
          tryAnother: "Try Another Mystery",
          clues: "Clues",
          caseQuestion: "Case Question",
          culpritQuestion: "Who is the culprit?",
          solutionTitle: "Reasoning",
          noPuzzle: "No mystery is available right now.",
          cta: "Explore more mysteries inside the App",
        };

  function handleTryAnother() {
    const nextPuzzle = selectAnotherPuzzle(puzzles, currentPuzzle?.id);

    if (!nextPuzzle) return;

    setCurrentPuzzle(nextPuzzle);
    setShowSolution(false);
  }

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

      {!showSolution ? (
        <div className="ns-hero-cta ns-m250-try-actions">
          <button
            type="button"
            className="ns-btn ns-btn-primary"
            onClick={() => setShowSolution(true)}
          >
            {ui.reveal}
          </button>

          {puzzles.length > 1 ? (
            <button
              type="button"
              className="ns-btn ns-btn-secondary"
              onClick={handleTryAnother}
            >
              {ui.tryAnother}
            </button>
          ) : null}
        </div>
      ) : (
        <div className="ns-m250-try-solution-wrap">
          <div className="ns-callout ns-m250-try-solution">
            <p className="ns-p">
              <strong>{ui.solutionTitle}</strong>
            </p>
            <p className="ns-p">{currentPuzzle.explanation}</p>
            <p className="ns-p">
              <strong>{currentPuzzle.answer}</strong>
            </p>
          </div>

          <div className="ns-hero-cta ns-m250-try-actions">
            <button
              type="button"
              className="ns-btn ns-btn-secondary"
              onClick={() => setShowSolution(false)}
            >
              {ui.hide}
            </button>

            {puzzles.length > 1 ? (
              <button
                type="button"
                className="ns-btn ns-btn-secondary"
                onClick={handleTryAnother}
              >
                {ui.tryAnother}
              </button>
            ) : null}

            <Link href={APP_URL} className="ns-btn ns-btn-primary">
              {ui.cta}
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
