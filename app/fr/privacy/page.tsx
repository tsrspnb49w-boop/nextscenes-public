// app/fr/privacy/page.tsx
// Build: 2026-02-beta-privacy-fr-v1

export const metadata = {
  title: "Politique de confidentialité | NextScenes",
  description: "Politique de confidentialité bêta de la plateforme NextScenes.",
};

export default function PrivacyFrPage() {
  return (
    <main className="ns-page">
      <h1 className="ns-h1">Politique de Confidentialité</h1>

      <p className="ns-subtitle">Programme Bêta NextScenes</p>

      <section className="ns-section ns-paper" style={{ marginTop: 18 }}>
        <p className="ns-p">
          <strong>Dernière mise à jour :</strong> Février 2026
        </p>

        <h2 className="ns-h2">1. Présentation</h2>
        <p className="ns-p">
          NextScenes respecte la vie privée de ses utilisateurs. Pendant la phase
          bêta, nous collectons uniquement les informations nécessaires au
          fonctionnement.
        </p>

        <h2 className="ns-h2">2. Données collectées</h2>
        <p className="ns-p">
          Nous pouvons collecter l’adresse e-mail, le nom d’utilisateur, le rôle
          du compte, le contenu publié (histoires, scènes, retours), ainsi que des
          journaux techniques liés à la stabilité. Nous ne vendons aucune donnée.
        </p>

        <h2 className="ns-h2">3. Utilisation des données</h2>
        <p className="ns-p">
          Les données sont utilisées pour faire fonctionner la plateforme, gérer
          les modes d’écriture et la gouvernance, répondre aux retours bêta,
          améliorer la stabilité et surveiller la sécurité.
        </p>

        <h2 className="ns-h2">4. Visibilité du contenu</h2>
        <p className="ns-p">
          Le contenu peut être visible par les participants et lecteurs selon les
          paramètres de l’histoire. Les administrateurs peuvent consulter le
          contenu pour modération et sécurité. La plateforme n’est pas un espace
          de stockage privé.
        </p>

        <h2 className="ns-h2">5. Stockage</h2>
        <p className="ns-p">
          Les données sont stockées via des services d’hébergement standards.
          Comme tout système bêta, une perte de données reste possible. Conservez
          des sauvegardes personnelles.
        </p>

        <h2 className="ns-h2">6. Cookies et sessions</h2>
        <p className="ns-p">
          NextScenes utilise des cookies de session pour maintenir la connexion et
          sécuriser l’authentification. Aucun suivi publicitaire n’est utilisé.
        </p>

        <h2 className="ns-h2">7. Suppression</h2>
        <p className="ns-p">
          Vous pouvez demander la suppression de votre compte via l’email support
          bêta indiqué dans votre invitation. Certaines décisions de canon
          collaboratives peuvent rester pour préserver l’intégrité des histoires.
        </p>

        <h2 className="ns-h2">8. Sécurité</h2>
        <p className="ns-p">
          Nous prenons des mesures raisonnables, mais aucun système ne garantit
          une sécurité absolue.
        </p>

        <h2 className="ns-h2">9. Modifications</h2>
        <p className="ns-p">
          Cette politique peut évoluer pendant la bêta. La date de mise à jour
          sera modifiée en conséquence.
        </p>

        <h2 className="ns-h2">10. Contact</h2>
        <p className="ns-p">
          Pour toute question, utilisez l’email support bêta indiqué dans votre
          invitation.
        </p>
      </section>
    </main>
  );
}
