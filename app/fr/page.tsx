// app/fr/page.tsx
import Link from "next/link";

export default function FrHomePage() {
  return (
    <main className="ns-page">
      <h1 className="ns-h1">NextScenes</h1>

      <p className="ns-subtitle">
        Un lieu calme et sérieux pour écrire et lire des histoires cohérentes,
        respectueuses et dignes d’être finies.
      </p>

      <section className="ns-section ns-paper" style={{ marginTop: 18 }}>
        <h2 className="ns-h2">Commencer</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
          <Link className="ns-btn ns-btn-primary" href="/fr/about">À propos</Link>
          <Link className="ns-btn ns-btn-ghost" href="/fr/how-it-works">Comment ça marche</Link>
          <Link className="ns-btn ns-btn-ghost" href="/fr/safety">Sécurité</Link>
          <Link className="ns-btn ns-btn-ghost" href="/fr/clubs">Clubs</Link>
          <Link className="ns-btn ns-btn-ghost" href="/fr/partners">Partenaires</Link>
        </div>
      </section>
    </main>
  );
}
