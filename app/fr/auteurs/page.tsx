import Link from "next/link";

const APP_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://app.nextscenes.org").replace(/\/+$/, "");

export const metadata = {
  title: "Pour les auteurs | NextScenes",
  description:
    "Écrivez avec confiance sur NextScenes. Découvrez comment la propriété, le Canon, les propositions, le crédit des contributeurs et la génération de manuscrit sont encadrés.",
};

const confidencePoints = [
  "Votre histoire originale reste sous votre autorité.",
  "Seules les scènes approuvées deviennent partie du Canon officiel.",
  "Les contributions acceptées sont enregistrées pour la transparence et le crédit.",
  "Les scènes du Canon peuvent être rassemblées dans un manuscrit propre lorsque l’œuvre est prête.",
];

const writingModes = [
  {
    title: "Mode Solo",
    body: "L’auteur écrit seul. Les lecteurs peuvent suivre l’œuvre, mais ils ne contribuent pas aux scènes. Ce mode convient aux auteurs qui veulent garder un contrôle créatif complet.",
  },
  {
    title: "Mode Collaboratif",
    body: "L’auteur peut ouvrir l’histoire aux propositions et choisir ce qui devient Canon. Ce mode permet de recevoir des idées sans perdre son autorité.",
  },
  {
    title: "Mode Groupe Ouvert",
    body: "Une structure plus ouverte pour les clubs d’écriture, les classes et les communautés créatives travaillant selon les règles de l’histoire.",
  },
  {
    title: "Mode Groupe Fermé",
    body: "Un espace contrôlé où seuls des participants sélectionnés peuvent contribuer. Ce mode convient aux équipes de confiance, aux projets privés et aux collaborateurs invités.",
  },
];

const manuscriptItems = [
  "Page de titre et détails de l’histoire",
  "Nom de l’auteur et description de l’histoire",
  "Scènes approuvées du Canon dans le bon ordre",
  "Titres de chapitres ou de scènes",
  "Date de génération",
  "Registre des contributeurs le cas échéant",
  "Annexe des contributions acceptées",
];

export default function AuteursPage() {
  return (
    <div className="ns-page ns-writers-page">
      <section className="ns-writers-hero">
        <div className="ns-writers-hero-copy">
          <div className="ns-writers-kicker">Pour les auteurs</div>
          <h1 className="ns-writers-title">
            Écrivez avec confiance. Collaborez sans perdre le contrôle.
          </h1>
          <p className="ns-writers-lead">
            NextScenes est conçu pour les auteurs qui prennent les histoires au
            sérieux. Ici, une histoire n’est pas jetée dans la foule pour être
            abandonnée au hasard. Elle est construite, protégée, guidée et
            conservée.
          </p>
          <p className="ns-writers-lead">
            Vous pouvez écrire seul, inviter d’autres personnes à contribuer,
            ouvrir une histoire aux propositions, ou garder un espace d’écriture
            contrôlé. Mais un principe reste clair : l’histoire de l’auteur doit
            rester sous l’autorité de l’auteur.
          </p>

          <div className="ns-writers-actions">
            <a href={`${APP_URL}/storylines`} className="ns-btn ns-btn-primary">
              Commencer à écrire
            </a>
            <Link href="/fr/how-it-works" className="ns-btn ns-btn-ghost">
              Voir comment ça marche
            </Link>
          </div>
        </div>

        <div className="ns-writers-hero-card" aria-label="Résumé de confiance pour les auteurs">
          <div className="ns-writers-card-label">Confiance auteur</div>
          <ul className="ns-writers-checklist">
            {confidencePoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ns-writers-section ns-writers-two-col">
        <div className="ns-writers-panel">
          <h2>Votre histoire reste la vôtre</h2>
          <p>
            Lorsque vous créez une histoire originale sur NextScenes, vous ne
            cédez pas la propriété de votre œuvre simplement parce que vous
            utilisez la plateforme. Votre intrigue, vos personnages, votre univers
            et vos scènes originales restent votre propriété créative, sous
            réserve des conditions de la plateforme et de tout accord spécifique
            que vous choisissez de conclure.
          </p>
          <p>
            NextScenes n’est pas conçu pour retirer les histoires aux auteurs. Il
            est conçu pour les aider à les développer, les organiser, les protéger
            et les achever.
          </p>
        </div>

        <div className="ns-writers-panel is-warm">
          <h2>Le Canon protège l’histoire</h2>
          <p>
            Sur NextScenes, le Canon est la version officielle de l’histoire.
            Seules les scènes approuvées deviennent Canon. Ces scènes approuvées
            forment le chemin narratif accepté et deviennent la matière principale
            pour la génération du manuscrit.
          </p>
          <p>
            Une proposition n’est qu’une suggestion tant qu’elle n’est pas
            approuvée. Une fois approuvée, elle devient partie du Canon et elle
            est enregistrée comme contribution acceptée.
          </p>
        </div>
      </section>

      <section className="ns-writers-section">
        <div className="ns-writers-section-head">
          <div className="ns-writers-kicker">Le contrôle par la structure</div>
          <h2>Les modes d’écriture donnent le contrôle à l’auteur</h2>
          <p>
            Toutes les histoires n’ont pas besoin du même degré d’ouverture.
            NextScenes donne aux auteurs une structure qui correspond au but de
            l’histoire, et non au bruit de la foule.
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
          <h2>Les propositions permettent de collaborer sans chaos</h2>
          <p>
            Les contributeurs peuvent suggérer ce qui devrait arriver ensuite,
            mais l’auteur ou le responsable autorisé de l’histoire décide si la
            proposition convient au récit. L’auteur peut approuver une
            proposition, rejeter une proposition, rejeter toutes les propositions,
            ou continuer à écrire directement dans le Canon.
          </p>
          <p>
            Une proposition est une invitation, pas une invasion. La foule peut
            apporter une torche, mais l’auteur tient toujours la carte.
          </p>
        </div>

        <div className="ns-writers-panel">
          <h2>Le crédit des contributeurs est enregistré</h2>
          <p>
            Si un contributeur soumet une proposition et que cette proposition
            est acceptée dans le Canon, la contribution doit être enregistrée.
            Cela protège à la fois l’auteur original et le contributeur.
          </p>
          <p>
            Un registre de contribution peut inclure le nom du contributeur, la
            scène acceptée, la date d’acceptation, le nombre de mots acceptés,
            l’historique de décision et, le cas échéant, le pourcentage du Canon
            final.
          </p>
        </div>
      </section>

      <section className="ns-writers-section ns-writers-manuscript">
        <div className="ns-writers-manuscript-copy">
          <div className="ns-writers-kicker">Des scènes au manuscrit</div>
          <h2>Générer le manuscrit</h2>
          <p>
            NextScenes n’est pas seulement un espace pour publier des scènes. La
            plateforme est conçue pour aider les histoires à devenir des œuvres
            complètes. La fonction Générer le manuscrit est destinée à rassembler
            les scènes approuvées du Canon dans un format de manuscrit propre.
          </p>
          <p>
            Le manuscrit doit être généré uniquement à partir du contenu approuvé
            du Canon. Les propositions rejetées, les propositions en attente, les
            notes privées et les commentaires non liés ne doivent pas apparaître
            dans le manuscrit final, sauf si l’auteur choisit une option spéciale
            d’exportation.
          </p>
        </div>

        <div className="ns-writers-manuscript-card">
          <h3>Un manuscrit propre peut inclure</h3>
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
          <h2>Partage futur des bénéfices</h2>
          <p>
            Certaines histoires peuvent rester de simples exercices créatifs.
            D’autres peuvent devenir des livres, des séries, des anthologies, des
            récits audio, des films, des supports éducatifs ou d’autres œuvres
            commerciales. Lorsqu’une histoire collaborative mène à une publication
            ou à un bénéfice commercial, le principe directeur est simple : les
            contributions acceptées doivent être reconnues équitablement.
          </p>
          <p>
            Par défaut, la contribution peut être mesurée selon le nombre de mots
            acceptés dans le Canon, sauf si un autre accord écrit s’applique. Les
            projets particuliers peuvent nécessiter des conditions écrites avant
            le début de la collaboration.
          </p>
        </div>

        <div className="ns-writers-panel is-warm">
          <h2>Les journaux de décision assurent la transparence</h2>
          <p>
            Une bonne collaboration a besoin de mémoire. Les registres de décision
            peuvent montrer qui a soumis une proposition, quand elle a été
            soumise, si elle a été approuvée ou rejetée, qui a pris la décision,
            et si elle est devenue Canon.
          </p>
          <p>
            L’équité ne doit pas dépendre de la mémoire. Elle doit être intégrée
            au système.
          </p>
        </div>
      </section>

      <section className="ns-writers-section ns-writers-plain">
        <div>
          <h2>Originalité, responsabilité et révision juridique</h2>
          <p>
            Chaque auteur et contributeur doit soumettre uniquement du contenu
            qu’il a le droit d’utiliser. Le contenu copié, les scènes volées, les
            passages protégés par le droit d’auteur ou les contenus provenant
            d’une autre source sans droits appropriés ne doivent pas être soumis.
          </p>
          <p>
            NextScenes peut fournir des règles de plateforme, des registres de
            contribution et des conditions claires de participation. Mais
            lorsqu’une histoire se dirige vers une publication commerciale,
            surtout avec plusieurs contributeurs, une révision juridique peut
            être nécessaire pour les contrats de publication, le partage des
            revenus, les adaptations, le transfert de droits, les paiements aux
            contributeurs ou les litiges sur la propriété.
          </p>
          <p>
            Cela ne signifie pas que les auteurs ont besoin d’un avocat avant de
            commencer à écrire. Cela signifie que les étapes commerciales
            importantes doivent être traitées correctement. Une bonne clôture
            n’est pas une insulte à l’amitié ; elle empêche l’amitié de finir au
            tribunal.
          </p>
        </div>
      </section>

      <section className="ns-writers-promise">
        <div className="ns-writers-kicker">La promesse de NextScenes</div>
        <h2>Apportez votre histoire ici. Vous ne serez pas englouti par la foule.</h2>
        <p>
          Vous décidez ce qui devient Canon. Chaque contribution acceptée est
          mémorisée. Lorsque l’œuvre est prête, NextScenes vous aide à la
          rassembler en manuscrit.
        </p>
        <p>
          C’est une écriture avec structure. C’est une collaboration avec
          conscience. C’est l’imagination avec responsabilité.
        </p>
        <div className="ns-writers-actions centered">
          <a href={`${APP_URL}/storylines`} className="ns-btn ns-btn-primary">
            Entrer dans l’App
          </a>
          <Link href="/writers" className="ns-btn ns-btn-ghost">
            Read in English
          </Link>
        </div>
      </section>
    </div>
  );
}
