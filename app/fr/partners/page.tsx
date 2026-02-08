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

export default function PartnersPage() {
  return (
    <div className="ns-page">
      <section style={{ padding: "10px 0 8px" }}>
        <h1 className="ns-h1">Partenariats et institutions</h1>
        <p className="ns-subtitle" style={{ maxWidth: 980 }}>
          NextScenes n’est pas seulement un site créatif. Il est conçu comme une
          plateforme culturelle et éducative capable de travailler avec des
          écoles, des universités, des ministères, des institutions culturelles,
          des ONG, des fondations et des programmes de développement.
        </p>

        <div className="ns-hero-cta">
          <Link className="ns-btn ns-btn-primary" href="/fr/contact">
            Parlez-nous
          </Link>
          <Link className="ns-btn ns-btn-ghost" href="/fr/safety">
            Sécurité et valeurs
          </Link>
        </div>

        <div className="ns-trust-strip" style={{ marginTop: 10 }}>
          <span>Prêt pour l’éducation</span>
          <span>Plateforme gouvernée</span>
          <span>Programmes à long terme</span>
          <span>Posture institutionnelle</span>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">NextScenes comme plateforme institutionnelle</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          NextScenes est conçu pour travailler avec des écoles et des
          universités, des ministères et autorités éducatives, des centres
          culturels et des bibliothèques, des ONG et des organisations de
          jeunesse, des fondations et des programmes de développement, ainsi que
          des institutions littéraires et artistiques. Sa structure, sa
          gouvernance et ses valeurs le rendent adapté à une collaboration
          institutionnelle sérieuse.
        </p>

        <div className="ns-grid-3">
          <Card title="Infrastructure culturelle">
            Une plateforme de long terme pour construire des projets créatifs
            portés par la communauté et riches de sens.
          </Card>
          <Card title="Outil éducatif">
            Adapté aux classes, aux programmes et aux environnements
            d’apprentissage structurés.
          </Card>
          <Card title="Environnement gouverné">
            Fondé sur des règles claires, des rôles définis et des engagements
            éthiques.
          </Card>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">Pourquoi les institutions s’associent à NextScenes</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          Les institutions s’associent à NextScenes pour promouvoir la culture
          de la lecture et de l’écriture, encourager une créativité disciplinée,
          enseigner la collaboration et la responsabilité, mener des programmes
          créatifs et éducatifs à long terme, soutenir l’expression des jeunes
          et des communautés, et créer des espaces culturels numériques
          structurés.
        </p>

        <div className="ns-grid-3">
          <Card title="Promouvoir l’alphabétisation et la culture">
            La lecture et l’écriture sont traitées comme des pratiques
            culturelles sérieuses, pas comme du contenu jetable.
          </Card>
          <Card title="Enseigner responsabilité et collaboration">
            La structure de la plateforme soutient un travail créatif éthique et
            discipliné.
          </Card>
          <Card title="Construire des programmes durables">
            Conçu pour des projets à long terme, pas pour des campagnes
            éphémères.
          </Card>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">Domaines de partenariat</h2>

        <div className="ns-grid-3">
          <Card title="Éducation">
            Programmes d’écriture scolaires et universitaires, soutien aux
            curricula, formation des enseignants et projets en classe.
          </Card>
          <Card title="Culture">
            Narration communautaire, projets patrimoniaux, initiatives culturelles
            thématiques et programmes littéraires.
          </Card>
          <Card title="Jeunesse et développement communautaire">
            Alphabétisation, expression, autonomisation, cohésion sociale et
            dialogue à travers les histoires.
          </Card>
        </div>

        <div className="ns-grid-3" style={{ marginTop: 14 }}>
          <Card title="Programmes publics">
            Initiatives nationales ou régionales de lecture et d’écriture et
            stratégies de développement culturel.
          </Card>
          <Card title="Ateliers et compétitions">
            Événements créatifs structurés et programmes d’apprentissage à long
            terme.
          </Card>
          <Card title="Patrimoine numérique">
            Préservation des traditions orales et écrites sous une forme moderne
            et traçable.
          </Card>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">Cas d’usage institutionnels</h2>

        <div className="ns-grid-3">
          <Card title="Écoles et universités">
            Projets d’écriture en classe, apprentissage de la littérature et des
            langues, apprentissage par projets, éthique et éducation civique à
            travers les histoires, et clubs créatifs.
          </Card>
          <Card title="Institutions culturelles">
            Narration communautaire, préservation des traditions, initiatives
            créatives nationales ou régionales, et programmes thématiques
            d’histoires.
          </Card>
          <Card title="ONG et programmes de développement">
            Autonomisation des jeunes, initiatives d’alphabétisation, cohésion
            sociale et construction communautaire par la narration.
          </Card>
        </div>

        <div className="ns-grid-3" style={{ marginTop: 14 }}>
          <Card title="Autorités publiques">
            Campagnes nationales de lecture et d’écriture, innovation éducative
            et initiatives d’éducation numérique.
          </Card>
          <Card title="Fondations">
            Investissements culturels et éducatifs de long terme avec un impact
            mesurable.
          </Card>
          <Card title="Réseaux et alliances">
            Programmes partagés entre écoles, régions ou communautés.
          </Card>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">Ce que NextScenes fournit</h2>

        <div className="ns-grid-3">
          <Card title="Une plateforme numérique structurée">
            Conçue pour un usage créatif et éducatif sérieux, pas pour le bruit
            social.
          </Card>
          <Card title="Un processus créatif gouverné">
            Rôles clairs, décisions traçables et historique créatif conservé.
          </Card>
          <Card title="Sécurité et modération">
            Un cadre guidé par des valeurs, adapté aux écoles et aux programmes
            jeunesse.
          </Card>
        </div>

        <div className="ns-grid-3" style={{ marginTop: 14 }}>
          <Card title="Documentation et traçabilité">
            Le travail créatif est conservé, vérifiable et éducatif.
          </Card>
          <Card title="Participation mesurable">
            L’activité et l’engagement peuvent être observés et évalués de façon
            utile.
          </Card>
          <Card title="Posture institutionnelle sérieuse">
            Conçu pour être un partenaire, pas un gadget.
          </Card>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">Ce que les partenaires apportent</h2>
        <div className="ns-card">
          <ul className="ns-list" style={{ margin: 0 }}>
            <li>Sponsoring ou financement de programmes</li>
            <li>Soutien institutionnel</li>
            <li>Intégration éducative</li>
            <li>Accès aux écoles, communautés ou réseaux</li>
            <li>Co-conception et gouvernance des programmes</li>
          </ul>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">Gouvernance et indépendance</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          NextScenes maintient sa charte éthique et culturelle, ne compromet pas
          la sécurité ou les valeurs pour des partenariats, accueille la
          coopération mais pas le contrôle, et fonctionne sur la base d’accords
          clairs et transparents.
        </p>

        <div className="ns-card">
          <p className="ns-p" style={{ marginBottom: 0 }}>
            Nous accueillons les partenaires. Nous ne sous-traitons pas notre
            conscience.
          </p>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">Vision à long terme</h2>
        <div className="ns-grid-3">
          <Card title="Partenaire de confiance">
            Un collaborateur culturel et éducatif fiable.
          </Card>
          <Card title="Infrastructure créative">
            Une fondation numérique de long terme pour la narration et
            l’apprentissage.
          </Card>
          <Card title="Archive vivante">
            Un foyer pour des œuvres sérieuses construites par la communauté.
          </Card>
        </div>
      </section>

      <section className="ns-section ns-section-cta">
        <h2 className="ns-h2">Une invitation sérieuse mais ouverte</h2>
        <p className="ns-p" style={{ maxWidth: 900 }}>
          NextScenes accueille les institutions qui croient en la culture et en
          l’éducation, en la discipline et en la responsabilité, et en l’idée
          que l’imagination peut construire la société.
        </p>

        <div className="ns-section-cta">
          <Link className="ns-btn ns-btn-primary" href="/fr/contact">
            Contactez-nous
          </Link>
          <Link className="ns-btn ns-btn-ghost" href="/fr/about">
            À propos de NextScenes
          </Link>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">En une phrase</h2>
        <div className="ns-card">
          <p className="ns-p" style={{ marginBottom: 0 }}>
            NextScenes est une plateforme culturelle et éducative conçue pour une
            collaboration institutionnelle de long terme, pas pour un bruit
            numérique à court terme.
          </p>
        </div>
      </section>
    </div>
  );
}
