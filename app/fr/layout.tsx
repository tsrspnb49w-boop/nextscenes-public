// app/fr/layout.tsx
import type { ReactNode } from "react";
import Link from "next/link";

export default function FrLayout({ children }: { children: ReactNode }) {
  return (
    <div className="ns-shell">
      <header className="ns-topbar">
        <div className="ns-topbar-inner">
          <Link href="/fr" className="ns-brand">
            NextScenes®
          </Link>

          <nav className="ns-nav">
            <Link href="/fr/about">À propos</Link>
            <Link href="/fr/how-it-works">Comment ça marche</Link>
            <Link href="/fr/safety">Sécurité</Link>
            <Link href="/fr/clubs">Clubs</Link>
            <Link href="/fr/partners">Partenaires</Link>
            <Link href="/fr/mystery250">Mystery250</Link>
          </nav>

          <div className="ns-lang">
            <Link className="ns-lang-link" href="/">
              EN
            </Link>
            <span className="ns-lang-sep">/</span>
            <Link className="ns-lang-link is-active" href="/fr">
              FR
            </Link>
          </div>
        </div>
      </header>

      {children}

      {/* If your EN layout has a footer component and you want it here too,
          we can add it after we confirm the routing works. */}
    </div>
  );
}
