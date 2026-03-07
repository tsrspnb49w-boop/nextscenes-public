import Link from "next/link";
import TryMystery from "../../../components/TryMystery";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.nextscenes.org";

type MysteryCardItem = {
  icon: string;
  title: string;
  label: string;
  description: string;
};

function MysteryCard({
  item,
  compact = false,
}: {
  item: MysteryCardItem;
  compact?: boolean;
}) {
  return (
    <article className={`ns-m250-card${compact ? " is-compact" : ""}`}>
      <div className="ns-m250-card-top">
        <div className="ns-m250-card-icon" aria-hidden="true">
          <span>{item.icon}</span>
        </div>

        <h3 className="ns-m250-card-title">{item.title}</h3>

        <p className="ns-m250-card-text">{item.description}</p>
      </div>

      <div className="ns-m250-card-bottom">
        <span className="ns-m250-card-tag">{item.label}</span>
      </div>
    </article>
  );
}

function SectionShell({
  title,
  intro,
  id,
  children,
  alt = false,
}: {
  title: string;
  intro: string;
  id?: string;
  children: React.ReactNode;
  alt?: boolean;
}) {
  return (
    <section
      id={id}
      className={`ns-section ns-m250-panel${alt ? " is-alt" : ""}`}
    >
      <h2 className="ns-h2 ns-m250-section-title">{title}</h2>
      <p className="ns-p ns-m250-section-intro">{intro}</p>
      {children}
    </section>
  );
}

export default function FrMystery250Page() {
  const levels: MysteryCardItem[] = [
    {
      icon: "🔎",
      title: "Mystères faciles",
      label: "8 ans et +",
      description:
        "Des énigmes courtes et accessibles qui développent l’attention et la logique.",
    },
    {
      icon: "🧩",
      title: "Mystères intermédiaires",
      label: "Ados & adultes",
      description:
        "Un peu plus subtils. Parfaits pour les apprenants et les clubs.",
    },
    {
      icon: "🧠",
      title: "Mystères difficiles",
      label: "Esprits réfléchis",
      description:
        "Des énigmes plus exigeantes pour ceux qui aiment raisonner avec patience.",
    },
    {
      icon: "♟",
      title: "Mystères experts",
      label: "Défi mental",
      description:
        "Pour les courageux. Le genre d’énigmes qui fait sourire plus tard.",
    },
  ];

  const activities: MysteryCardItem[] = [
    {
      icon: "🏠",
      title: "Soirées en famille",
      label: "Temps partagé",
      description:
        "Une manière saine et agréable de créer du lien entre générations.",
    },
    {
      icon: "🏫",
      title: "Kits pour la classe",
      label: "Écoles",
      description:
        "Des ensembles conçus pour l’apprentissage, la discussion et l’équité.",
    },
    {
      icon: "🌙",
      title: "Défis pour clubs",
      label: "Clubs",
      description:
        "Thèmes mensuels, classements partagés et esprit collectif.",
    },
    {
      icon: "🏆",
      title: "Compétitions régionales",
      label: "Bientôt en ligne",
      description:
        "Des compétitions amicales qui récompensent la discipline, pas le bruit.",
    },
  ];

  return (
    <div className="ns-page ns-m250-page">
      <section className="ns-m250-hero">
        <div className="ns-m250-hero-copy">
          <div className="ns-m250-eyebrow">
            Un espace calme pour les esprits vifs
          </div>

          <h1 className="ns-h1 ns-m250-hero-title">Mystery250</h1>

          <p className="ns-subtitle ns-m250-hero-subtitle">
            Des mystères courts qui entraînent l’attention, la logique et la
            patience. Des jeunes élèves aux retraités, chacun peut en retirer
            quelque chose.
          </p>

          <div className="ns-hero-cta">
            <Link href="/fr/how-it-works" className="ns-btn ns-btn-ghost">
              Comment fonctionne NextScenes
            </Link>

            <Link href={APP_URL} className="ns-btn ns-btn-primary">
              Entrer dans l’App
            </Link>
          </div>

          <div className="ns-trust-strip ns-m250-trust-strip">
            <span>Pour enfants, ados, adultes</span>
            <span>Conçu pour écoles & clubs</span>
            <span>Énigmes guidées par des valeurs</span>
            <span>Calme sans ennui</span>
          </div>
        </div>

        <div className="ns-m250-hero-visual" aria-hidden="true">
          <img
            src="/images/mystery250-hero.webp"
            alt=""
            className="ns-m250-hero-image"
          />
        </div>
      </section>

      <SectionShell
        title="Niveaux de mystère"
        intro="Mystery250 n’est pas seulement un divertissement. C’est un terrain d’entraînement pour une pensée calme et structurée. Le monde est bruyant. Ici, l’esprit apprend à rester droit."
      >
        <div className="ns-m250-grid ns-m250-grid-levels">
          {levels.map((item) => (
            <MysteryCard key={item.title} item={item} compact />
          ))}
        </div>
      </SectionShell>

      <TryMystery lang="fr" />

      <SectionShell
        id="competitions"
        alt
        title="Clubs, activités et compétitions"
        intro="Mystery250 évoluera vers des activités organisées : kits scolaires, soirées de club, défis thématiques et compétitions régionales. L’objectif n’est pas le battage médiatique. L’objectif est la culture : réfléchir ensemble, avec équité et joie."
      >
        <div className="ns-m250-grid">
          {activities.map((item) => (
            <MysteryCard key={item.title} item={item} />
          ))}
        </div>
      </SectionShell>

      <section className="ns-section ns-section-cta ns-m250-promise">
        <h2 className="ns-h2">Une petite promesse</h2>

        <p className="ns-p ns-m250-promise-text">
          Si vous êtes fatigué des espaces bruyants, Mystery250 est pour vous.
          Un lieu de calme qui vous aide à grandir.
        </p>

        <div className="ns-hero-cta" style={{ justifyContent: "center" }}>
          <Link href={APP_URL} className="ns-btn ns-btn-primary">
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
