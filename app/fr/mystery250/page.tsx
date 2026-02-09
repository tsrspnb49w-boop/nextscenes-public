// app/fr/mystery250/page.tsx
import Link from "next/link";
import MediaGrid from "../../../components/MediaGrid";

export default function FrMystery250Page() {
  const items = [
    {
      title: "Mystères faciles",
      href: "/fr/mystery250#easy",
      label: "8 ans et +",
      description:
        "Des énigmes courtes et accessibles qui développent l’attention et la logique.",
    },
    {
      title: "Mystères intermédiaires",
      href: "/fr/mystery250#medium",
      label: "Ados & adultes",
      description:
        "Un peu plus subtils. Parfaits pour les apprenants et les clubs.",
    },
    {
      title: "Mystères difficiles",
      href: "/fr/mystery250#hard",
      label: "Esprits réfléchis",
      description:
        "Des énigmes plus exigeantes pour ceux qui aiment raisonner avec patience.",
    },
    {
      title: "Mystères experts",
      href: "/fr/mystery250#expert",
      label: "Défi mental",
      description:
        "Pour les courageux. Le genre d’énigmes qui fait sourire plus tard.",
    },
    {
      title: "Soirées en famille",
      href: "/fr/mystery250#family",
      label: "Temps partagé",
      description:
        "Une manière saine et agréable de créer du lien entre générations.",
    },
    {
      title: "Kits pour la classe",
      href: "/fr/mystery250#schools",
      label: "Écoles",
      description:
        "Des ensembles conçus pour l’apprentissage, la discussion et l’équité.",
    },
    {
      title: "Défis pour clubs",
      href: "/fr/mystery250#clubs",
      label: "Clubs",
      description:
        "Thèmes mensuels, classements partagés et esprit collectif.",
    },
    {
      title: "Compétitions régionales",
      href: "/fr/mystery250#competitions",
      label: "Bientôt en ligne",
      description:
        "Des compétitions amicales qui récompensent la discipline, pas le bruit.",
    },
  ];

  return (
    <div className="ns-page">
      <h1 className="ns-h1">Mystery250</h1>
      <p className="ns-subtitle">
        Un espace calme pour les esprits vifs. Des mystères courts qui
        entraînent l’attention, la logique et la patience. Des jeunes élèves
        aux retraités, chacun peut en retirer quelque chose.
      </p>

      <div className="ns-hero-cta">
        <Link href="/fr/how-it-works" className="ns-btn ns-btn-ghost">
          Comment fonctionne NextScenes
        </Link>

        <Link
          href="https://app.nextscenes.org"
          className="ns-btn ns-btn-primary"
        >
          Entrer dans l’App
        </Link>
      </div>

      <div className="ns-trust-strip">
        <span>Pour enfants, ados, adultes</span>
        <span>Conçu pour écoles & clubs</span>
        <span>Énigmes guidées par des valeurs</span>
        <span>Calme sans ennui</span>
      </div>

      <section className="ns-section ns-paper">
        <h2 className="ns-h2">Parcours proposés</h2>
        <p className="ns-p">
          Mystery250 n’est pas seulement un divertissement. C’est un terrain
          d’entraînement pour une pensée calme et structurée. Le monde est
          bruyant. Ici, l’esprit apprend à rester droit.
        </p>

        <MediaGrid items={items} />
      </section>

      <section className="ns-section ns-section-alt" id="competitions">
        <h2 className="ns-h2">Clubs, activités et compétitions</h2>
        <p className="ns-p">
          Mystery250 évoluera vers des activités organisées : kits scolaires,
          soirées de club, défis thématiques et compétitions régionales.
          L’objectif n’est pas le battage médiatique. L’objectif est la culture :
          réfléchir ensemble, avec équité et joie.
        </p>

        <div className="ns-grid-3" style={{ marginTop: 16 }}>
          <div className="ns-card">
            <div className="ns-h3">Soirées de club</div>
            <p className="ns-p">
              Sessions hebdomadaires ou mensuelles pour groupes communautaires,
              bibliothèques et clubs d’écriture.
            </p>
          </div>
          <div className="ns-card">
            <div className="ns-h3">Écoles</div>
            <p className="ns-p">
              Ensembles pédagogiques qui renforcent la logique, la lecture, la
              patience et la discussion équitable.
            </p>
          </div>
          <div className="ns-card">
            <div className="ns-h3">Compétitions régionales</div>
            <p className="ns-p">
              Des concours amicaux guidés par des valeurs, où la discipline
              l’emporte sur le bruit.
            </p>
          </div>
        </div>
      </section>

      <section className="ns-section ns-section-cta">
        <h2 className="ns-h2">Une petite promesse</h2>
        <p className="ns-p">
          Si vous êtes fatigué des espaces bruyants, Mystery250 est pour vous.
          Un lieu de calme qui vous aide à grandir.
        </p>

        <div className="ns-hero-cta" style={{ justifyContent: "center" }}>
          <Link
            href="https://app.nextscenes.org"
            className="ns-btn ns-btn-primary"
          >
            Explorer dans l’App
          </Link>

          <Link href="/fr/contact" className="ns-btn ns-btn-ghost">
            Proposer Mystery250 à une école ou un club
          </Link>
        </div>
      </section>
    </div>
  );
}
