// app/fr/about/page.tsx
import Link from "next/link";
import type { ReactNode } from "react";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.nextscenes.org";

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

function PillLink({
  href,
  children,
  variant = "ghost",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
}) {
  const cls =
    variant === "primary" ? "ns-btn ns-btn-primary" : "ns-btn ns-btn-ghost";

  if (external) {
    return (
      <a className={cls} href={href}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export default function FrAboutPage() {
  return (
    <div className="ns-page">
      <section style={{ padding: "10px 0 8px" }}>
        <h1 className="ns-h1">À propos de NextScenes</h1>
        <p className="ns-subtitle" style={{ maxWidth: 900 }}>
          NextScenes est un atelier d’écriture collaborative et un projet
          culturel destiné à celles et ceux qui veulent créer ensemble des
          histoires longues et sérieuses, lentement et avec intention, avec des
          rôles clairs, des décisions visibles, et une responsabilité assumée
          pour ce qui devient le canon.
        </p>

        <div className="ns-hero-cta">
          <PillLink href="/fr/how-it-works" variant="primary">
            Comment ça marche
          </PillLink>
          <PillLink href={APP_URL} external>
            Entrer dans l’App
          </PillLink>
        </div>

        <div className="ns-trust-strip" style={{ marginTop: 10 }}>
          <span>Pas un réseau social</span>
          <span>Pas une ferme à contenu</span>
          <span>Pas un jeu d’écriture</span>
          <span>La structure avant le chaos</span>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">Qu’est-ce que NextScenes ?</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          NextScenes est un espace de travail pour l’art du récit. Une histoire
          est menée par un auteur, la communauté propose des scènes et apporte
          des retours, les décisions sont prises consciemment, et le livre grandit
          pas à pas jusqu’à devenir une œuvre cohérente. Rien ne devient canon
          par accident.
        </p>

        <div className="ns-grid-3">
          <Card title="Un auteur mène l’histoire">
            Un auteur donne la direction, le ton, les standards et la continuité.
            Il reste responsable de la cohérence, de l’équité et de la forme
            finale du livre.
          </Card>

          <Card title="Une communauté propose des scènes">
            Lecteurs et contributeurs soumettent des propositions, discutent les
            options et affinent les idées. Ils nourrissent la progression sans
            confisquer l’autorité d’auteur.
          </Card>

          <Card title="L’histoire avance par décisions">
            Chaque scène acceptée est choisie volontairement et enregistrée de
            manière claire. NextScenes conserve ce qui a été proposé, ce qui est
            devenu canon, et pourquoi.
          </Card>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">Pourquoi NextScenes existe</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          Beaucoup d’espaces d’écriture collaborative finissent dans les mêmes
          travers : le chaos au lieu de la structure, le bruit au lieu de la
          direction, la popularité au lieu du jugement, la vitesse au lieu de la
          profondeur. NextScenes existe pour prouver un autre modèle, où la
          collaboration ne détruit pas l’autorité d’auteur, et où la communauté
          n’efface pas la responsabilité.
        </p>

        <div className="ns-grid-3">
          <Card title="La patience pour raconter">
            Les histoires se construisent par étapes, avec mémoire et continuité,
            sans être précipitées en fragments.
          </Card>

          <Card title="La discipline pour imaginer">
            Les rôles sont clairs, les choix sont délibérés, et le métier est
            respecté. Les bonnes histoires grandissent mal dans le désordre.
          </Card>

          <Card title="Du sens dans la créativité numérique">
            La plateforme valorise la profondeur, la cohérence et la
            responsabilité culturelle plutôt que des métriques vides et du bruit
            performatif.
          </Card>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">Le flux de travail central</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          Au cœur de NextScenes se trouve un flux simple qui protège l’autorité
          d’auteur tout en accueillant une collaboration réelle.
        </p>

        <div className="ns-card" style={{ padding: 18 }}>
          <ol className="ns-list" style={{ paddingLeft: 18, margin: 0 }}>
            <li>Un auteur crée une storyline et fixe la direction.</li>
            <li>L’auteur ouvre un round de propositions pour la scène suivante.</li>
            <li>Lecteurs et contributeurs proposent des scènes et en discutent.</li>
            <li>
              L’auteur choisit la prochaine scène canon (ou l’écrit directement).
            </li>
            <li>
              L’histoire continue pas à pas, avec un registre clair des décisions.
            </li>
          </ol>
          <p className="ns-p" style={{ marginTop: 12, marginBottom: 0 }}>
            Chaque scène acceptée est une décision, pas un accident.
          </p>
        </div>

        <div className="ns-section-cta">
          <Link className="ns-btn ns-btn-primary" href="/fr/how-it-works">
            Voir le processus complet
          </Link>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">Pour qui est NextScenes</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          NextScenes s’adresse à celles et ceux qui veulent une création
          structurée, avec des rôles clairs, des standards clairs, et un
          environnement communautaire plus sûr.
        </p>

        <div className="ns-grid-3">
          <Card title="Auteurs">
            Pour les auteurs qui veulent construire des histoires sérieuses,
            garder la continuité, et accueillir une collaboration réfléchie selon
            leurs propres règles.
          </Card>
          <Card title="Lecteurs et contributeurs">
            Pour les lecteurs qui souhaitent participer au processus créatif avec
            respect, et apprendre comment une histoire se construit, pas seulement
            consommer le résultat final.
          </Card>
          <Card title="Écoles et institutions">
            Pour les classes, clubs, programmes jeunesse, bibliothèques, et
            institutions culturelles qui veulent des outils créatifs porteurs de
            sens, avec structure et responsabilité.
          </Card>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">Différentes façons d’écrire</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          NextScenes propose plusieurs modèles d’écriture, tous fondés sur la
          structure, des rôles clairs, la responsabilité et le respect de
          l’histoire.
        </p>

        <div className="ns-grid-3">
          <Card title="Écriture solo">
            Un auteur construit l’histoire pendant que les lecteurs suivent et
            commentent.
          </Card>
          <Card title="Écriture collaborative">
            Un auteur mène. Les autres proposent et discutent. L’auteur décide
            de ce qui devient canon.
          </Card>
          <Card title="Écriture en groupe (Ouvert / Fermé)">
            Des communautés écrivent dans une structure partagée, soit
            publiquement, soit dans un cercle privé sur invitation.
          </Card>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">Une plateforme avec des valeurs</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          NextScenes repose sur un principe simple :{" "}
          <b>Imagination avec conscience</b>. Les histoires façonnent la culture.
          La culture façonne les personnes. Donc, une plateforme de narration
          porte une responsabilité pour ce qu’elle récompense, normalise et
          diffuse.
        </p>

        <div className="ns-grid-3">
          <Card title="Cadre éthique">
            Une base de valeurs claire guide ce que la plateforme soutient et ce
            qu’elle refuse de normaliser.
          </Card>
          <Card title="Règles de communauté">
            La santé communautaire compte. La sécurité n’est pas optionnelle. Le
            respect n’est pas une « demande de fonctionnalité ».
          </Card>
          <Card title="Standards institutionnels">
            NextScenes est pensée pour être digne de confiance auprès des écoles,
            partenaires et communautés qui tiennent à la dignité, l’équité et la
            responsabilité.
          </Card>
        </div>

        <div className="ns-section-cta">
          <Link className="ns-btn ns-btn-ghost" href="/fr/safety">
            Lire Sécurité et valeurs
          </Link>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">Vision à long terme</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          NextScenes veut devenir une plateforme créative digne de confiance, un
          partenaire des écoles et institutions culturelles, un lieu pour la
          narration collaborative sérieuse, et une archive vivante qui conserve
          l’histoire de la fabrication des récits, pas seulement le résultat final.
        </p>

        <div className="ns-card">
          <h3 className="ns-h3">En une phrase</h3>
          <p className="ns-p" style={{ marginBottom: 0 }}>
            NextScenes est l’endroit où les histoires ne sont pas seulement
            écrites ensemble, mais construites ensemble, avec soin, conscience et
            responsabilité.
          </p>
        </div>

        <div className="ns-section-cta">
          <PillLink href="/fr/partners" variant="primary">
            Partenariats et institutions
          </PillLink>
          <PillLink href="/fr/contact">Contact</PillLink>
        </div>
      </section>
    </div>
  );
}
