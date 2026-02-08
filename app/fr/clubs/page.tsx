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

export default function ClubsPage() {
  return (
    <div className="ns-page">
      <section style={{ padding: "10px 0 8px" }}>
        <h1 className="ns-h1">Clubs et communautés</h1>
        <p className="ns-subtitle" style={{ maxWidth: 980 }}>
          NextScenes n’est pas seulement pour les individus. Il est conçu pour
          soutenir les écoles, les classes, les clubs d’écriture, les
          associations culturelles, les programmes jeunesse, les communautés
          créatives et les cercles privés d’écriture. Ces groupes organisés
          s’appellent des <b>Clubs</b> sur NextScenes.
        </p>

        <div className="ns-hero-cta">
          <Link className="ns-btn ns-btn-primary" href="/fr/partners">
            Pour les écoles et institutions
          </Link>
          <Link className="ns-btn ns-btn-ghost" href="/fr/safety">
            Sécurité et valeurs
          </Link>
        </div>

        <div className="ns-trust-strip" style={{ marginTop: 10 }}>
          <span>Groupes structurés</span>
          <span>Leadership clair</span>
          <span>Projets à long terme</span>
          <span>Prêt pour l’éducation</span>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">Qu’est-ce qu’un Club ?</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          Un Club est un espace créatif structuré, avec leadership, règles et
          objectif. Il est conçu pour la narration en groupe et les programmes
          créatifs de longue durée, pas pour un bruit passager.
        </p>

        <div className="ns-grid-3">
          <Card title="Pour les écoles et les classes">
            Les Clubs peuvent soutenir des programmes d’écriture, l’apprentissage
            de la littérature et des projets de narration, avec encadrement et
            structure.
          </Card>
          <Card title="Pour les communautés et associations">
            Les groupes culturels et les communautés d’écriture peuvent héberger
            plusieurs projets d’histoires sous une même organisation.
          </Card>
          <Card title="Pour les cercles privés">
            Les Clubs fermés soutiennent des groupes invités qui souhaitent un
            environnement créatif privé et concentré.
          </Card>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">Pourquoi les Clubs existent</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          Les Clubs existent pour organiser des projets d’écriture en groupe,
          enseigner la narration, former à la collaboration et à la
          responsabilité, mener des programmes créatifs à long terme, et
          héberger plusieurs projets d’histoires sous une même communauté. Les
          Clubs transforment NextScenes d’un simple site en une institution
          créative.
        </p>

        <div className="ns-grid-3">
          <Card title="Organiser des projets sérieux">
            Les Clubs apportent une structure pour que la narration en groupe
            tienne dans le temps, sans chaos.
          </Card>
          <Card title="Enseigner et former l’artisanat">
            Les Clubs soutiennent l’apprentissage, le retour, la discipline et
            l’amélioration progressive.
          </Card>
          <Card title="Construire une communauté">
            Les Clubs sont conçus comme des communautés créatives stables où les
            membres grandissent ensemble.
          </Card>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">Le rôle du leader de Club</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          Chaque Club a un ou plusieurs leaders (enseignants, animateurs ou
          coordinateurs). Les leaders créent l’espace, guident les objectifs et
          protègent la culture du Club.
        </p>

        <div className="ns-card">
          <ul className="ns-list" style={{ margin: 0 }}>
            <li>Crée et gère l’espace du Club</li>
            <li>Invite ou approuve les membres</li>
            <li>Fixe des règles et objectifs internes</li>
            <li>Attribue ou approuve les projets d’histoires</li>
            <li>Assure discipline, respect et sécurité</li>
            <li>Représente le Club auprès de la plateforme</li>
          </ul>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">Types de Clubs</h2>

        <div className="ns-grid-3">
          <Card title="Clubs ouverts">
            Tout le monde peut demander à rejoindre ou à participer. Adapté aux
            communautés publiques et aux cercles créatifs ouverts. Toujours
            gouverné par les règles de la plateforme et celles du Club.
          </Card>

          <Card title="Clubs fermés">
            L’adhésion se fait uniquement sur invitation ou approbation. Adapté
            aux écoles et aux classes, aux groupes privés d’écriture, aux
            programmes jeunesse, et aux cercles professionnels ou privés.
          </Card>

          <Card title="Stables par conception">
            Les Clubs sont faits pour durer. Pas des groupes de chat temporaires.
            Pas une porte tournante.
          </Card>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">Comment les Clubs utilisent les histoires</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          Un Club peut gérer un ou plusieurs projets d’histoires, attribuer des
          auteurs principaux différents selon les histoires, et utiliser les
          histoires comme exercices d’écriture, projets de groupe, outils
          d’apprentissage ou œuvres créatives à long terme. Chaque histoire suit
          toujours le modèle de gouvernance de NextScenes.
        </p>

        <div className="ns-grid-3">
          <Card title="Plusieurs projets">
            Un seul Club peut héberger plusieurs storylines avec des objectifs
            et des équipes différentes.
          </Card>
          <Card title="Rôles clairs">
            Les leaders de Club, auteurs principaux, contributeurs et lecteurs
            peuvent varier selon l’histoire et selon le projet.
          </Card>
          <Card title="Narration gouvernée">
            Canon et propositions restent distincts, pour que la créativité de
            groupe reste cohérente.
          </Card>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">Usage éducatif</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          Les Clubs NextScenes sont conçus pour soutenir des programmes d’écriture
          en classe, l’apprentissage de la littérature et des langues, des
          ateliers d’écriture créative, l’apprentissage par projets, et la
          discussion éthique à travers la narration.
        </p>

        <div className="ns-grid-3">
          <Card title="Direction guidée">
            Les enseignants et animateurs peuvent guider la direction de
            l’histoire tout en laissant place à la créativité des élèves.
          </Card>
          <Card title="Les notes de décision comme outils pédagogiques">
            Les leaders peuvent utiliser les notes de décision pour expliquer le
            jugement, l’artisanat et la responsabilité en écriture.
          </Card>
          <Card title="Évaluation et progression">
            La participation peut être évaluée de façon utile, pas par le bruit
            ou la popularité.
          </Card>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">Sécurité et encadrement dans les Clubs</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          Les Clubs doivent suivre la charte globale Sécurité et valeurs et
          peuvent ajouter des règles internes supplémentaires. Les leaders de
          Club sont censés agir comme modérateurs de première ligne, maintenir
          discipline et respect, et protéger les membres jeunes ou vulnérables.
          La modération de la plateforme reste disponible si nécessaire.
        </p>

        <div className="ns-section-cta">
          <Link className="ns-btn ns-btn-primary" href="/fr/safety">
            Lire la charte de sécurité
          </Link>
          <Link className="ns-btn ns-btn-ghost" href="/fr/contact">
            Parlez-nous
          </Link>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">En une phrase</h2>
        <div className="ns-card">
          <p className="ns-p" style={{ marginBottom: 0 }}>
            Les Clubs NextScenes transforment la narration en une activité
            culturelle organisée, éducative et portée par la communauté.
          </p>
        </div>
      </section>
    </div>
  );
}
