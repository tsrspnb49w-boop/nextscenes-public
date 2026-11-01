// app/fr/faq/page.tsx
import { buildMetadata } from "@/app/seo";

export const metadata = buildMetadata({
  title: "Questions fréquentes | Lecture et écriture | NextScenes",
  description: "Des réponses sur la lecture, l’écriture, la collaboration, la confidentialité des projets et l’accès à NextScenes.",
  path: "/fr/faq",
  locale: "fr",
  languages: { en: "/faq", fr: "/fr/faq" },
});

export default function FAQFrPage() {
  return (
    <main className="ns-page">
      <h1 className="ns-h1">Questions fréquentes</h1>

      <p className="ns-subtitle">
        Des réponses sur la lecture, l’écriture, la collaboration et NextScenes.
      </p>

      <section className="ns-section ns-paper" style={{ marginTop: 18 }}>
        <h2 className="ns-h2">Qu’est-ce que NextScenes ?</h2>
        <p className="ns-p">
          NextScenes est un espace pour écrire, réviser, organiser et mettre en forme
          des livres. Les auteurs peuvent travailler seuls ou collaborer selon
          des rôles clairs, tandis que les lecteurs découvrent les récits publics.
        </p>

        <h2 className="ns-h2">Puis-je déjà visiter NextScenes ?</h2>
        <p className="ns-p">
          Oui. Le site public est accessible aux visiteurs. L’application d’écriture
          est en phase d’accès anticipé et continue de s’améliorer avec
          les retours des premiers auteurs.
        </p>

        <h2 className="ns-h2">Qui peut écrire ou contribuer ?</h2>
        <p className="ns-p">
          L’écriture, les commentaires et les contributions nécessitent un compte
          disposant des droits d’auteur. L’accès à chaque projet dépend
          également de sa visibilité, des membres autorisés et du mode d’écriture.
        </p>

        <h2 className="ns-h2">Que sont les modes d’écriture ?</h2>
        <p className="ns-p">
          Les modes d’écriture définissent l’autorité et la manière dont les
          décisions de canon sont prises dans une histoire. Modes disponibles :
        </p>
        <ul className="ns-p" style={{ marginLeft: 20 }}>
          <li>Solo</li>
          <li>Collaboratif</li>
          <li>Groupe (Ouvert)</li>
          <li>Groupe (Fermé)</li>
        </ul>
        <p className="ns-p">
          Chaque mode impose des règles de décision et de responsabilité.
        </p>

        <h2 className="ns-h2">Mes projets sont-ils privés ?</h2>
        <p className="ns-p">
          La confidentialité dépend de la visibilité du projet, de ses membres et
          du mode d’écriture. Un projet public peut être consulté par d’autres
          lecteurs. Conservez des copies de vos manuscrits importants.
        </p>

        <h2 className="ns-h2">Dois-je conserver des sauvegardes ?</h2>
        <p className="ns-p">
          Oui. Conservez vos propres copies de vos manuscrits importants,
          comme pour tout autre logiciel d’écriture.
        </p>

        <h2 className="ns-h2">Comment signaler un problème ?</h2>
        <p className="ns-p">
          Utilisez la page Contact du site public pour signaler un problème
          ou demander de l’aide.
        </p>

        <h2 className="ns-h2">Qu’est-ce que Mystery250 ?</h2>
        <p className="ns-p">
          Mystery250 propose de courtes histoires à énigmes et des jeux de lecture
          pour développer l’observation, le raisonnement et l’imagination.
          Certaines activités sont encore en préparation.
        </p>
      </section>
    </main>
  );
}
