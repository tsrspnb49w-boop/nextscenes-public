// app/fr/mystery250/page.tsx
import Link from "next/link";

export default function FrMystery250Page() {
  return (
    <main className="ns-page">
      <h1 className="ns-h1">Mystery250</h1>
      <p className="ns-subtitle">
        250 mystères courts, propres et satisfaisants. Bientôt disponible.
      </p>

      <div style={{ marginTop: 16 }}>
        <Link className="ns-btn ns-btn-ghost" href="/fr/contact">
          Nous contacter
        </Link>
      </div>
    </main>
  );
}
