"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://app.nextscenes.org";

export default function SiteNav() {
  const pathname = usePathname();
  const isFR = pathname?.startsWith("/fr");

  const base = isFR ? "/fr" : "";

  const LINKS = [
    { href: "/about", en: "About", fr: "À propos" },
    { href: "/how-it-works", en: "How It Works", fr: "Comment ça marche" },
    { href: "/mystery250", en: "Mystery250", fr: "Mystery250" },
    { href: "/safety", en: "Safety", fr: "Sécurité" },
    { href: "/clubs", en: "Clubs", fr: "Clubs" },
    { href: "/partners", en: "Partners", fr: "Partenaires" },
    { href: "/contact", en: "Contact", fr: "Contact" },
  ];

  return (
    <header className="ns-nav">
      <div className="ns-nav-inner">
        <Link href={isFR ? "/fr" : "/"} className="ns-brand">
          <span className="ns-brand-badge">NS</span>
          <span className="ns-brand-text">NextScenes</span>
        </Link>

        <nav className="ns-links">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={`${base}${l.href}`}
              className="ns-navlink"
            >
              {isFR ? l.fr : l.en}
            </Link>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Language Toggle */}
          <div className="ns-lang">
            <Link
              className={`ns-lang-link ${!isFR ? "is-active" : ""}`}
              href="/"
            >
              EN
            </Link>
            <span className="ns-lang-sep">/</span>
            <Link
              className={`ns-lang-link ${isFR ? "is-active" : ""}`}
              href="/fr"
            >
              FR
            </Link>
          </div>

          <a className="ns-btn ns-btn-ghost" href={APP_URL}>
            {isFR ? "Entrer dans l’App" : "Enter the App"}
          </a>
        </div>
      </div>
    </header>
  );
}
