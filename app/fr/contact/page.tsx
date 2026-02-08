// app/fr/contact/page.tsx
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

export default function FrContactPage() {
  return (
    <div className="ns-page">
      <section style={{ padding: "10px 0 8px" }}>
        <h1 className="ns-h1">Contact</h1>
        <p className="ns-subtitle" style={{ maxWidth: 980 }}>
          NextScenes est une plateforme culturelle et éducative sérieuse. Nous
          accueillons des messages réfléchis de la part des écoles, institutions,
          partenaires, communautés et personnes qui souhaitent nous comprendre
          ou travailler avec nous.
        </p>

        <div className="ns-hero-cta">
          <a
            className="ns-btn ns-btn-primary"
            href="mailto:contact@nextscenes.org"
          >
            contact@nextscenes.org
          </a>
          <Link className="ns-btn ns-btn-ghost" href="/fr/about">
            À propos de NextScenes
          </Link>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">Qui devrait nous contacter ?</h2>

        <div className="ns-grid-3">
          <Card title="Écoles et institutions">
            Si vous représentez une école, une université, un ministère, une ONG,
            une fondation ou une institution culturelle et souhaitez explorer
            l’usage de NextScenes pour des programmes éducatifs ou culturels.
          </Card>

          <Card title="Partenaires et organisations">
            Si vous êtes intéressé par un partenariat, un sponsoring, ou une
            collaboration durable sur des projets culturels, éducatifs ou
            communautaires.
          </Card>

          <Card title="Auteurs et communautés">
            Si vous voulez construire une communauté sérieuse, un club d’écriture,
            ou un projet créatif de long terme sur NextScenes.
          </Card>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">À propos de quoi pouvez-vous nous écrire ?</h2>

        <div className="ns-grid-3">
          <Card title="Partenariats et programmes">
            Coopération institutionnelle, programmes éducatifs, projets culturels
            et initiatives de long terme.
          </Card>

          <Card title="Utiliser NextScenes dans l’éducation">
            Classes, clubs, programmes jeunesse, ateliers et environnements
            d’apprentissage structurés.
          </Card>

          <Card title="Questions générales">
            Questions sur le fonctionnement de la plateforme, sa philosophie ou
            sa gouvernance.
          </Card>
        </div>

        <div className="ns-grid-3" style={{ marginTop: 14 }}>
          <Card title="Sécurité et modération">
            Si vous avez des préoccupations concernant du contenu, des
            comportements, ou la sécurité de la communauté sur la plateforme.
          </Card>

          <Card title="Médias et communication">
            Journalistes, chercheurs et observateurs culturels peuvent nous
            contacter pour des informations et du contexte.
          </Card>

          <Card title="Autres demandes sérieuses">
            Si vous n’êtes pas sûr de la catégorie, écrivez quand même. Nous
            orienterons votre demande avec responsabilité.
          </Card>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">Comment nous traitons les messages</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          Les messages envoyés à NextScenes sont lus par des humains. Nous ne
          promettons pas des réponses instantanées, mais nous promettons une
          attention sérieuse. NextScenes se construit lentement et avec soin, et
          nous traitons la communication de la même manière.
        </p>

        <div className="ns-card">
          <p className="ns-p" style={{ marginBottom: 0 }}>
            Écrivez clairement, avec respect, et avec du contexte. Si votre
            message concerne une école, une institution ou un programme, indiquez
            le nom de l’organisation et votre rôle.
          </p>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">Pages liées</h2>
        <div className="ns-section-cta">
          <Link className="ns-btn ns-btn-ghost" href="/fr/partners">
            Partenariats & Institutions
          </Link>
          <Link className="ns-btn ns-btn-ghost" href="/fr/safety">
            Sécurité & Valeurs
          </Link>
          <Link className="ns-btn ns-btn-ghost" href="/fr/clubs">
            Clubs & Communautés
          </Link>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">En une phrase</h2>
        <div className="ns-card">
          <p className="ns-p" style={{ marginBottom: 0 }}>
            NextScenes est ouvert aux échanges sérieux avec les personnes et les
            institutions qui se soucient de la culture, de l’éducation et d’une
            créativité porteuse de sens.
          </p>
        </div>
      </section>
    </div>
  );
}
