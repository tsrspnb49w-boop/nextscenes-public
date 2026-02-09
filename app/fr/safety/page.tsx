import Link from "next/link";
import type { ReactNode } from "react";

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="ns-card">
      <h3 className="ns-h3">{title}</h3>
      <div className="ns-p" style={{ marginBottom: 0 }}>
        {children}
      </div>
    </div>
  );
}

export default function SafetyPage() {
  return (
    <div className="ns-page">
      <section style={{ padding: "10px 0 8px" }}>
        <h1 className="ns-h1">Sécurité et valeurs</h1>
        <p className="ns-subtitle" style={{ maxWidth: 920 }}>
          NextScenes repose sur un principe fondamental :{" "}
          <b>L’imagination avec conscience</b>. Nous croyons que les histoires
          façonnent les esprits, et que les esprits façonnent la société. Donc,
          les espaces de narration doivent être gouvernés avec responsabilité.
        </p>

        <div className="ns-hero-cta">
          <Link className="ns-btn ns-btn-primary" href="/fr/how-it-works">
            Comment ça marche
          </Link>

          <Link
            className="ns-btn ns-btn-ghost"
            href="https://app.nextscenes.org"
          >
            Entrer dans l’application
          </Link>
        </div>

        <div className="ns-trust-strip" style={{ marginTop: 10 }}>
          <span>Communauté encadrée</span>
          <span>Dignité humaine</span>
          <span>L’ordre avant le bruit</span>
          <span>Écoles et partenaires bienvenus</span>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">Pourquoi la sécurité compte ici</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          NextScenes accueille de jeunes écrivains, des élèves, des écoles, des
          familles, des communautés et des auteurs sérieux. Cela signifie que
          nous ne pouvons pas fonctionner comme une plateforme sociale sans
          règles. Nous existons pour offrir un environnement créatif sûr, une
          communauté respectueuse, et un espace structuré et modéré, avec une
          culture de responsabilité, pas d’indignation.
        </p>

        <div className="ns-grid-3">
          <Card title="Un environnement créatif sûr">
            La plateforme est conçue pour soutenir une écriture sérieuse sans
            exposer les utilisateurs à des contenus imprudents ou à des
            comportements abusifs.
          </Card>
          <Card title="Une communauté respectueuse">
            Ici, les personnes ne sont pas des cibles. Le désaccord est permis.
            L’irrespect ne l’est pas.
          </Card>
          <Card title="Une structure modérée">
            Les règles existent pour protéger les personnes, protéger les
            histoires et préserver une culture qui mérite d’être construite.
          </Card>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">Valeurs fondamentales de NextScenes</h2>

        <div className="ns-grid-3">
          <Card title="Responsabilité">
            Chaque utilisateur est responsable de ce qu’il écrit, de ce qu’il
            propose, de ce qu’il commente, et du ton qu’il apporte à la
            communauté. La liberté sans responsabilité n’est pas de la
            créativité. C’est du chaos.
          </Card>

          <Card title="Respect des personnes">
            Aucun harcèlement. Aucune humiliation. Aucune attaque personnelle.
            Aucune intimidation. Aucune déshumanisation. Le désaccord est
            permis. L’irrespect ne l’est pas.
          </Card>

          <Card title="Respect de l’histoire">
            Les histoires ne sont pas des poubelles pour la haine, l’obscénité,
            la violence pour elle-même, la propagande ou la dégradation. Les
            thèmes sérieux sont permis. Un traitement irresponsable de thèmes
            sérieux ne l’est pas.
          </Card>
        </div>

        <div className="ns-grid-3" style={{ marginTop: 14 }}>
          <Card title="Véracité et intégrité">
            Aucune usurpation d’identité. Aucun plagiat. Aucun travail volé.
            Aucune identité trompeuse. Aucune manipulation des processus
            communautaires. NextScenes est un espace d’artisanat, pas un espace
            de ruse.
          </Card>

          <Card title="L’ordre avant le bruit">
            La discussion est bienvenue. Le chaos ne l’est pas. Le débat est
            bienvenu. Le comportement de foule ne l’est pas. La plateforme est
            conçue pour ralentir les choses afin que de bonnes décisions puissent
            être prises.
          </Card>

          <Card title="Responsabilité culturelle">
            NextScenes ne prétend pas être neutre sur tout. Nous promouvons
            intentionnellement la dignité humaine, la responsabilité, la
            réflexion, le respect et une créativité pleine de sens.
          </Card>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">Protection des jeunes utilisateurs</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          NextScenes est conçu pour être utilisable par des écoles, des
          programmes jeunesse et des clubs éducatifs. Par conséquent, ce qui
          suit n’est pas autorisé :
        </p>

        <div className="ns-card">
          <ul className="ns-list" style={{ margin: 0 }}>
            <li>Contenu sexuel explicite</li>
            <li>Matériel pornographique</li>
            <li>Contenu exploitant</li>
            <li>Glorification de la cruauté ou de l’abus</li>
          </ul>

          <p className="ns-p" style={{ marginTop: 12, marginBottom: 0 }}>
            Les sujets sérieux peuvent être abordés, mais seulement avec maturité
            et responsabilité.
          </p>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">Philosophie de modération</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          NextScenes utilise une modération centrée sur l’humain, guidée par des
          règles claires, des valeurs claires, le contexte (pas seulement des
          algorithmes) et le jugement (pas la pression de la foule). La
          modération existe pour protéger les personnes, protéger la plateforme,
          protéger la culture et protéger les histoires.
        </p>

        <div className="ns-grid-3">
          <Card title="Règles claires">
            Les standards sont écrits et applicables. Ce n’est pas « tout est
            permis ».
          </Card>
          <Card title="Contexte et jugement">
            Nous considérons l’intention, le schéma et l’impact, pas seulement
            des mots-clés.
          </Card>
          <Card title="Protection de la culture">
            Nous défendons le type d’environnement créatif auquel les écoles et
            les familles peuvent faire confiance.
          </Card>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">Rôles et autorité</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          NextScenes reconnaît une autorité structurée. Les administrateurs de
          la plateforme fixent les règles globales. Les leaders de groupe et les
          auteurs principaux gouvernent leurs espaces d’histoire. Les écrivains
          dirigent les histoires. Les contributeurs proposent, discutent et
          conseillent.
        </p>

        <div className="ns-card">
          <p className="ns-p" style={{ marginBottom: 0 }}>
            Ce n’est pas une anarchie. C’est un système créatif constitutionnel.
          </p>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">Comportements de tolérance zéro</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          Les comportements suivants ne sont pas tolérés sur NextScenes :
        </p>

        <div className="ns-card">
          <ul className="ns-list" style={{ margin: 0 }}>
            <li>Harcèlement et intimidation</li>
            <li>Discours haineux</li>
            <li>Menaces ou intimidation</li>
            <li>Exploitation sexuelle</li>
            <li>Perturbation persistante des communautés</li>
            <li>Tentatives de sabotage des histoires ou des groupes</li>
            <li>Abus des systèmes de signalement ou de modération</li>
          </ul>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">Signalement et intervention</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          Les utilisateurs peuvent signaler un comportement nuisible, un contenu
          nuisible ou un abus des systèmes. La plateforme peut retirer du
          contenu, suspendre des comptes, restreindre la participation ou bannir
          définitivement des utilisateurs dans les cas graves.
        </p>

        <div className="ns-section-cta">
          <Link className="ns-btn ns-btn-ghost" href="/fr/contact">
            Contact
          </Link>
          <Link className="ns-btn ns-btn-primary" href="/fr/partners">
            Pour les écoles et partenaires
          </Link>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">L’esprit de la plateforme</h2>
        <div className="ns-card">
          <p className="ns-p" style={{ marginBottom: 10 }}>
            NextScenes est construit pour les personnes qui croient que tout ce
            qui peut être écrit ne devrait pas forcément être écrit.
          </p>
          <p className="ns-p" style={{ marginBottom: 0 }}>
            Et tout ce qui peut être imaginé ne mérite pas forcément des
            applaudissements.
          </p>
        </div>

        <div className="ns-card" style={{ marginTop: 14 }}>
          <h3 className="ns-h3">En une phrase</h3>
          <p className="ns-p" style={{ marginBottom: 0 }}>
            NextScenes est un espace créatif protégé où la liberté sert le sens,
            et l’imagination sert l’humanité.
          </p>
        </div>
      </section>
    </div>
  );
}
