// app/fr/faq/page.tsx
// Build: 2026-02-beta-faq-fr-v1

export const metadata = {
  title: "FAQ | NextScenes",
  description: "Questions fréquentes sur le programme bêta NextScenes.",
};

export default function FAQFrPage() {
  return (
    <main className="ns-page">
      <h1 className="ns-h1">Questions fréquentes</h1>

      <p className="ns-subtitle">
        Réponses claires sur le programme bêta de NextScenes.
      </p>

      <section className="ns-section ns-paper" style={{ marginTop: 18 }}>
        <h2 className="ns-h2">Qu’est-ce que NextScenes ?</h2>
        <p className="ns-p">
          NextScenes est une plateforme d’écriture structurée où les histoires se
          construisent avec des modes d’écriture et des règles de gouvernance
          clairs. Elle est pensée pour une narration sérieuse, cohérente et
          collaborative.
        </p>

        <h2 className="ns-h2">Est-ce une version publique ?</h2>
        <p className="ns-p">
          Non. La plateforme est actuellement en phase bêta limitée. Les
          fonctionnalités peuvent évoluer, s’améliorer ou être retirées au fur et
          à mesure du développement.
        </p>

        <h2 className="ns-h2">Qui peut accéder à la bêta ?</h2>
        <p className="ns-p">
          L’accès est limité aux testeurs invités. L’inscription est contrôlée
          pendant cette période.
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

        <h2 className="ns-h2">Mon travail est-il privé ?</h2>
        <p className="ns-p">
          Cela dépend du mode d’écriture et des paramètres de l’histoire. Les
          testeurs bêta ne doivent pas considérer la plateforme comme un espace
          de stockage privé. Conservez des copies personnelles des contenus
          importants.
        </p>

        <h2 className="ns-h2">Puis-je perdre mon contenu ?</h2>
        <p className="ns-p">
          C’est peu probable, mais comme tout système bêta, une instabilité reste
          possible. Gardez des sauvegardes pour ce qui compte.
        </p>

        <h2 className="ns-h2">Comment signaler un problème ?</h2>
        <p className="ns-p">
          Utilisez la fonction Feedback dans l’application ou contactez l’email
          support bêta indiqué dans votre invitation.
        </p>

        <h2 className="ns-h2">Qu’est-ce que Mystery250 ?</h2>
        <p className="ns-p">
          Mystery250 est un défi narratif structuré dans NextScenes. Il encourage
          une écriture disciplinée avec des contraintes créatives. Les détails
          peuvent évoluer au fil de la bêta.
        </p>
      </section>
    </main>
  );
}
