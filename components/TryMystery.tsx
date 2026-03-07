"use client";

import { useState } from "react";
import Link from "next/link";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.nextscenes.org";

type Lang = "en" | "fr";

export default function TryMystery({ lang = "en" }: { lang?: Lang }) {
  const [showSolution, setShowSolution] = useState(false);

  const t =
    lang === "fr"
      ? {
          title: "Essayez un mystère",
          intro:
            "Une montre en argent disparaît à la gare de Banjala. Seules trois personnes se trouvaient près de la salle des bagages.",
          amadou:
            'Amadou dit : « Claire n’était pas près de la salle des bagages. »',
          claire:
            'Claire dit : « Jules est entré dans la salle des bagages avant la disparition de la montre. »',
          jules: 'Jules dit : « Amadou ment. »',
          rule:
            "Le superviseur sait qu’une seule déclaration est vraie, et que la personne qui dit la vérité n’est pas la voleuse.",
          question: "Qui a volé la montre ?",
          reveal: "Voir le raisonnement",
          p1: "Supposons que Jules dise la vérité. Alors Amadou ment, ce qui signifie que Claire était bien près de la salle des bagages.",
          p2: "Claire affirme alors que Jules est entré dans la salle avant la disparition. Mais si Jules est la seule personne honnête, Claire ment.",
          p3: "Jules n’est donc pas entré dans la salle au bon moment. Il ne reste alors qu’une seule personne avec accès possible.",
          p4: "Claire a volé la montre.",
          cta: "Découvrir d'autres mystères dans l’App",
        }
      : {
          title: "Try a Mystery",
          intro:
            "A silver watch disappears at the Banjala railway station. Only three people were near the luggage room.",
          amadou:
            'Amadou says: “Claire was nowhere near the luggage room.”',
          claire:
            'Claire says: “Jules entered the luggage room before the watch disappeared.”',
          jules: 'Jules says: “Amadou is lying.”',
          rule:
            "The supervisor knows that only one statement is true, and the truthful person is not the thief.",
          question: "Who stole the watch?",
          reveal: "Reveal the reasoning",
          p1: "Suppose Jules is telling the truth. Then Amadou is lying, which means Claire really was near the luggage room.",
          p2: "Claire says Jules entered the room before the theft. But if Jules is the only truthful one, Claire must be lying.",
          p3: "So Jules did not enter at the relevant moment. That leaves only one person with possible access.",
          p4: "Claire stole the watch.",
          cta: "Explore more mysteries inside the App",
        };

  return (
    <section className="ns-section ns-m250-panel ns-m250-try">
      <div className="ns-m250-try-head">
        <h2 className="ns-h2 ns-m250-section-title">{t.title}</h2>
        <p className="ns-p ns-m250-section-intro ns-m250-try-intro">
          {t.intro}
        </p>
      </div>

      <div className="ns-m250-try-case">
        <p className="ns-p ns-m250-try-line">{t.amadou}</p>
        <p className="ns-p ns-m250-try-line">{t.claire}</p>
        <p className="ns-p ns-m250-try-line">{t.jules}</p>

        <p className="ns-p ns-m250-try-rule">{t.rule}</p>

        <p className="ns-p ns-m250-try-question">
          <strong>{t.question}</strong>
        </p>
      </div>

      {!showSolution ? (
        <div className="ns-hero-cta ns-m250-try-actions">
          <button
            type="button"
            className="ns-btn ns-btn-primary"
            onClick={() => setShowSolution(true)}
          >
            {t.reveal}
          </button>
        </div>
      ) : (
        <div className="ns-m250-try-solution-wrap">
          <div className="ns-callout ns-m250-try-solution">
            <p className="ns-p">{t.p1}</p>
            <p className="ns-p">{t.p2}</p>
            <p className="ns-p">{t.p3}</p>
            <p className="ns-p">
              <strong>{t.p4}</strong>
            </p>
          </div>

          <div className="ns-hero-cta ns-m250-try-actions">
            <Link href={APP_URL} className="ns-btn ns-btn-primary">
              {t.cta}
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
