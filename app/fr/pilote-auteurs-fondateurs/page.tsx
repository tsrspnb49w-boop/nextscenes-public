import Link from "next/link";

export const metadata = {
  title: "Pilote des auteurs fondateurs | NextScenes",
  description:
    "NextScenes invite des auteurs sérieux avec des histoires originales à faire vivre la plateforme.",
};

const APP_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://app.nextscenes.org").replace(/\/+$/, "");

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="ns-pilot-check-item">
      <span aria-hidden="true">✓</span>
      <strong>{children}</strong>
    </li>
  );
}

export default function FoundingWritersPilotPage() {
  return (
    <div className="ns-page ns-pilot-page">
      <section className="ns-pilot-hero">
        <div className="ns-pilot-kicker">Pilote des auteurs fondateurs</div>
        <h1>Donnez vie à une histoire originale sur NextScenes.</h1>
        <div className="ns-pilot-actions">
          <a className="ns-btn ns-btn-primary" href={`${APP_URL}/create-account?lang=fr`}>
            Créer un compte
          </a>
          <Link className="ns-btn ns-btn-ghost" href="/fr/contact">
            Manifester votre intérêt
          </Link>
        </div>
      </section>

      <section className="ns-pilot-grid" aria-label="Résumé du pilote">
        <article className="ns-pilot-card">
          <h2>À qui s’adresse ce pilote</h2>
          <p>
            Aux auteurs qui ont une histoire originale, de la discipline et la volonté de
            continuer au-delà de la première scène. Nous cherchons des histoires vivantes,
            pas du contenu précipité.
          </p>
        </article>

        <article className="ns-pilot-card">
          <h2>Engagement simple</h2>
          <p>
            Créer une storyline, publier une scène d’ouverture et continuer avec
            des mises à jour régulières pendant environ 8 à 12 semaines.
          </p>
        </article>

        <article className="ns-pilot-card">
          <h2>Ce que NextScenes peut offrir</h2>
          <p>
            Une mise en avant, une promotion sur les réseaux sociaux, une reconnaissance publique
            et de possibles opportunités de récompense à l’avenir.
          </p>
        </article>
      </section>

      <section className="ns-pilot-panel">
        <div>
          <div className="ns-pilot-kicker ns-pilot-kicker-light">
            Comment les histoires seront examinées
          </div>
          <h2>Clair, simple et équitable.</h2>
          <p>
            Après la période pilote, NextScenes examinera chaque storyline selon
            la régularité, l’intérêt des lecteurs, la qualité de l’histoire et les progrès réalisés
            pendant le pilote.
          </p>
          <p>
            Les storylines fortes ou prometteuses pourront continuer à recevoir de la promotion
            et être considérées pour de futures récompenses. Les storylines abandonnées sans
            communication pourront perdre leur priorité de promotion et leur éligibilité aux récompenses.
          </p>
        </div>
        <ul className="ns-pilot-check-list">
          <CheckItem>Régularité</CheckItem>
          <CheckItem>Intérêt des lecteurs</CheckItem>
          <CheckItem>Qualité de l’histoire</CheckItem>
          <CheckItem>Progrès</CheckItem>
        </ul>
      </section>

      <section className="ns-pilot-note">
        <h2>Note importante</h2>
        <p>
          Les auteurs conservent la propriété de leur œuvre originale. Les récompenses financières ne sont pas
          versées simplement parce qu’un auteur rejoint le pilote. Toute récompense possible dépendra des
          progrès, de l’engagement des lecteurs, de la qualité de l’histoire et des ressources disponibles.
        </p>
      </section>

      <style>{`
        .ns-pilot-page {
          padding: 22px 0 18px;
        }

        .ns-pilot-hero {
          border-radius: 22px;
          padding: clamp(22px, 3.2vw, 34px);
          background:
            linear-gradient(135deg, rgba(6, 46, 31, 0.94), rgba(15, 97, 55, 0.86)),
            url("https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=70");
          background-size: cover;
          background-position: center;
          color: #fffaf0;
          box-shadow: 0 16px 34px rgba(15, 36, 24, 0.18);
          border: 1px solid rgba(217, 181, 109, 0.24);
        }

        .ns-pilot-kicker {
          display: inline-flex;
          margin-bottom: 12px;
          padding: 6px 12px;
          border-radius: 999px;
          background: rgba(217, 181, 109, 0.13);
          border: 1px solid rgba(217, 181, 109, 0.48);
          color: #d9b56d !important;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          font-size: 0.76rem;
          font-weight: 900;
          letter-spacing: 0.09em;
          text-transform: uppercase;
        }

        .ns-pilot-kicker-light {
          background: rgba(217, 181, 109, 0.10);
          border-color: rgba(217, 181, 109, 0.30);
          color: rgba(128, 83, 21, 0.95) !important;
        }

        .ns-pilot-hero h1 {
          max-width: 760px;
          margin: 0;
          color: #fffaf0;
          font-family: Georgia, Garamond, "Times New Roman", serif;
          font-size: clamp(1.9rem, 3.25vw, 2.8rem);
          line-height: 1.1;
          letter-spacing: -0.035em;
          font-weight: 800;
        }

        .ns-pilot-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 20px;
        }

        .ns-pilot-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          margin-top: 18px;
        }

        .ns-pilot-card,
        .ns-pilot-panel,
        .ns-pilot-note {
          border: 1px solid rgba(20, 138, 74, 0.14);
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.92);
          box-shadow: 0 12px 28px rgba(15, 36, 24, 0.065);
        }

        .ns-pilot-card {
          padding: 18px;
        }

        .ns-pilot-card h2,
        .ns-pilot-panel h2,
        .ns-pilot-note h2 {
          margin: 0 0 8px;
          color: rgba(15, 36, 24, 0.95);
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          font-size: 1.12rem;
          line-height: 1.28;
          letter-spacing: -0.02em;
          font-weight: 850;
        }

        .ns-pilot-card p,
        .ns-pilot-panel p,
        .ns-pilot-note p {
          margin: 0;
          color: rgba(15, 36, 24, 0.68);
          font-size: 0.94rem;
          line-height: 1.62;
        }

        .ns-pilot-panel {
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          gap: 18px;
          align-items: center;
          margin-top: 18px;
          padding: clamp(18px, 2.5vw, 26px);
        }

        .ns-pilot-panel p + p {
          margin-top: 10px;
        }

        .ns-pilot-check-list {
          display: grid;
          gap: 9px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .ns-pilot-check-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 15px;
          background: rgba(236, 253, 245, 0.82);
          color: rgba(15, 81, 50, 0.94);
          font-size: 0.92rem;
        }

        .ns-pilot-check-item span {
          display: inline-grid;
          place-items: center;
          width: 21px;
          height: 21px;
          border-radius: 999px;
          background: rgba(20, 138, 74, 0.14);
          font-weight: 900;
        }

        .ns-pilot-note {
          margin-top: 18px;
          padding: 18px;
          background: rgba(255, 251, 235, 0.8);
          border-color: rgba(180, 83, 9, 0.18);
        }

        @media (max-width: 820px) {
          .ns-pilot-grid,
          .ns-pilot-panel {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
