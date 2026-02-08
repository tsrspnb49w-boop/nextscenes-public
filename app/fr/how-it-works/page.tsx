import Link from "next/link";

const ROLE_CARDS = [
  {
    title: "Propriétaire de l’histoire (Auteur principal)",
    body:
      "Crée la storyline, fixe la direction et le ton, et protège la continuité. Le propriétaire écrit les scènes canon ou choisit le prochain canon parmi les propositions, et maintient la cohérence du livre.",
    points: [
      "Crée la storyline",
      "Fixe la direction et le ton",
      "Écrit le canon ou choisit le canon",
      "Ouvre et ferme les rounds de propositions",
      "Protège l’intégrité de l’histoire",
    ],
  },
  {
    title: "Auteurs et contributeurs",
    body:
      "Aident l’histoire à grandir en proposant des scènes, en discutant des options et en donnant des retours, sans réécrire directement le livre officiel.",
    points: [
      "Proposer des scènes",
      "Discuter et commenter",
      "Voter ou examiner si activé",
      "Ne pas modifier directement le canon",
    ],
  },
  {
    title: "Lecteurs",
    body:
      "Suivent l’histoire, voient comment les décisions sont prises et participent via les commentaires. Certaines storylines peuvent autoriser des propositions de lecteurs.",
    points: [
      "Lire et suivre les histoires",
      "Commenter et discuter",
      "Voir les décisions et notes",
      "Peut proposer dans certains modes",
    ],
  },
  {
    title: "Admins et modérateurs",
    body:
      "Protègent la communauté en appliquant les règles, en gérant les abus et en intervenant si nécessaire pour garder la plateforme sûre et juste.",
    points: [
      "Appliquer la sécurité et les valeurs",
      "Soutenir des communautés saines",
      "Intervenir quand nécessaire",
      "Maintenir les règles de la plateforme",
    ],
  },
];

const LIFECYCLE_CARDS = [
  {
    title: "1. Créer une storyline",
    body: "Démarrez un livre en choisissant un forum, en définissant un titre et en publiant la scène canon d’ouverture (ou la mise en place d’ouverture).",
  },
  {
    title: "2. Écrire en solo ou ouvrir les propositions",
    body: "Continuez seul ou invitez des contributions. Le propriétaire de l’histoire décide quand la collaboration est utile.",
  },
  {
    title: "3. Round de propositions",
    body: "Les contributeurs soumettent des propositions de scènes. La discussion se fait en vue publique, et le vote peut être activé selon le mode.",
  },
  {
    title: "4. Note de décision",
    body: "Une scène devient le prochain canon (choisie ou écrite par le propriétaire). Une courte Note de décision explique pourquoi.",
  },
  {
    title: "5. Répéter et faire grandir",
    body: "Le canon s’étend étape par étape. Les propositions s’ouvrent quand nécessaire. Le processus reste délibéré, lisible et responsable.",
  },
];

const CANON_CARDS = [
  {
    title: "Scènes canon",
    body: "Le livre officiel. Le canon est ce à quoi les lecteurs font confiance.",
    points: ["Histoire officielle", "Non modifiable par les contributeurs", "Constitue le livre"],
  },
  {
    title: "Scènes proposées",
    body:
      "Des suggestions qui aident l’auteur à choisir avec sagesse et à rester responsable. Les propositions sont conservées pour l’apprentissage et la transparence.",
    points: [
      "Idées et alternatives",
      "Ne fait pas partie du livre sauf approbation",
      "Conservées pour l’apprentissage et la transparence",
    ],
  },
];

const MODE_CARDS = [
  { title: "Écriture en solo", body: "Un seul auteur écrit toute l’histoire. Les lecteurs peuvent suivre et commenter." },
  {
    title: "Écriture collaborative",
    body: "Un auteur dirige. La communauté propose des scènes. L’auteur décide ce qui devient canon.",
  },
  {
    title: "Écriture de groupe (ouverte)",
    body: "Une communauté écrit ensemble dans une structure partagée et des règles claires.",
  },
  {
    title: "Écriture de groupe (fermée)",
    body: "Un groupe privé sur invitation écrit ensemble, utile pour les classes, clubs et cercles privés.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="ns-page ns-compact">
      <h1 className="ns-h1">Comment NextScenes fonctionne</h1>

      <p className="ns-p">
        NextScenes construit les histoires étape par étape, avec leadership,
        règles et décisions enregistrées. L’objectif est simple : pas de chaos,
        pas de réécritures silencieuses, pas de manipulation cachée. Juste un
        processus créatif visible qui respecte l’auteur et accueille une
        collaboration pleine de sens.
      </p>

      <div className="ns-callout">
        <p className="ns-p" style={{ marginBottom: 0 }}>
          NextScenes transforme la narration d’une ruée de foule en un processus
          guidé, avec mémoire, responsabilité et artisanat.
        </p>
      </div>

      <h2 className="ns-h2">Les rôles principaux</h2>
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

      <h2 className="ns-h2">Le cycle de vie d’une histoire</h2>
      <div className="ns-grid-3">
        {LIFECYCLE_CARDS.map((c) => (
          <div key={c.title} className="ns-card">
            <h3 className="ns-h3">{c.title}</h3>
            <p className="ns-p">{c.body}</p>
          </div>
        ))}
      </div>

      <h2 className="ns-h2">Canon et propositions</h2>
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

      <h2 className="ns-h2">Modes d’écriture</h2>
      <div className="ns-grid-3">
        {MODE_CARDS.map((c) => (
          <div key={c.title} className="ns-card">
            <h3 className="ns-h3">{c.title}</h3>
            <p className="ns-p">{c.body}</p>
          </div>
        ))}
      </div>

      <h2 className="ns-h2">Commentaires et activité</h2>
      <div className="ns-grid-3">
        <div className="ns-card">
          <h3 className="ns-h3">Discussion, pas réécriture</h3>
          <p className="ns-p">
            Les commentaires servent à discuter des scènes, poser des questions
            et donner des retours. Ils ne réécrivent pas le canon. Les règles de
            modération s’appliquent pour que le débat reste humain.
          </p>
        </div>
        <div className="ns-card">
          <h3 className="ns-h3">Une découverte qui garde les communautés vivantes</h3>
          <p className="ns-p">
            L’activité récente et les storylines tendances aident les lecteurs à
            trouver des œuvres vivantes et aident les auteurs à attirer
            l’attention là où elle compte.
          </p>
        </div>
        <div className="ns-card">
          <h3 className="ns-h3">Historique des décisions</h3>
          <p className="ns-p">
            NextScenes conserve ce qui a été proposé, ce qui est devenu canon,
            et la Note de décision expliquant pourquoi. Cet historique protège
            l’équité, l’apprentissage et la confiance.
          </p>
        </div>
      </div>

      <h2 className="ns-h2">Pourquoi la structure compte</h2>
      <div className="ns-grid-3">
        <div className="ns-card">
          <h3 className="ns-h3">Cohérence et continuité</h3>
          <p className="ns-p">
            Une histoire n’est pas un fil de commentaires. La structure protège
            la continuité et garde le livre lisible du début à la fin.
          </p>
        </div>
        <div className="ns-card">
          <h3 className="ns-h3">Équité et responsabilité</h3>
          <p className="ns-p">
            Quand les décisions sont visibles, la collaboration reste honnête.
            Les gens peuvent apprendre du dossier au lieu de tourner en rond.
          </p>
        </div>
        <div className="ns-card">
          <h3 className="ns-h3">Sécurité et discipline</h3>
          <p className="ns-p">
            Des règles claires réduisent le sabotage, récompensent l’artisanat
            et aident les communautés à rester respectueuses même quand les avis
            diffèrent.
          </p>
        </div>
      </div>

      <div className="ns-actions">
        <Link href="/fr/about" className="ns-btn ns-btn-secondary">
          À propos de NextScenes
        </Link>
        <a
          href="https://app.nextscenes.org"
          className="ns-btn ns-btn-primary"
          target="_blank"
          rel="noreferrer"
        >
          Entrer dans l’application
        </a>
      </div>
    </div>
  );
}
