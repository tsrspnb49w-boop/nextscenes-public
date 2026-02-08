// app/fr/contact/page.tsx
import Link from "next/link";

export default function FrContactPage() {
  return (
    <main className="ns-page">
      <h1 className="ns-h1">Contact</h1>
      <p className="ns-subtitle">
        Vous pouvez nous écrire. Nous répondons avec sérieux, pas avec du bruit.
      </p>

      <section className="ns-section ns-paper" style={{ marginTop: 18 }}>
        <p className="ns-p">
          Email: <span className="ns-mono">support@nextscenes.org</span>
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
          <Link className="ns-btn ns-btn-primary" href="/fr/about">À propos</Link>
          <Link className="ns-btn ns-btn-ghost" href="/fr/safety">Sécurité</Link>
          <Link className="ns-btn ns-btn-ghost" href="/fr/partners">Partenaires</Link>
        </div>
      </section>
    </main>
  );
}
