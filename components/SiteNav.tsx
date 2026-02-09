"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;


function normalizePath(p: string) {
  if (!p) return "/";
  return p.startsWith("/") ? p : `/${p}`;
}

function stripFrPrefix(pathname: string) {
  const p = normalizePath(pathname);
  if (p === "/fr") return "/";
  return p.startsWith("/fr/") ? p.slice(3) : p;
}

function addFrPrefix(pathname: string) {
  const p = normalizePath(pathname);
  if (p === "/") return "/fr";
  return p.startsWith("/fr") ? p : `/fr${p}`;
}

export default function SiteNav() {
  const pathname = usePathname() || "/";
  const isFR = pathname === "/fr" || pathname.startsWith("/fr/");
  const base = isFR ? "/fr" : "";

  const enHref = stripFrPrefix(pathname);
  const frHref = addFrPrefix(pathname);

  // Keep the top bar calm: show only core items.
  const PRIMARY = [
    { href: "/about", en: "About", fr: "À propos" },
    { href: "/how-it-works", en: "How it works", fr: "Comment ça marche" },
    { href: "/safety", en: "Safety", fr: "Sécurité" },
    { href: "/mystery250", en: "Mystery250", fr: "Mystery250" },
  ];

  // Secondary items live under “More/Plus”.
  const MORE = [
    { href: "/clubs", en: "Clubs", fr: "Clubs" },
    { href: "/partners", en: "Partners", fr: "Partenaires" },
    { href: "/contact", en: "Contact", fr: "Contact" },
  ];

  const isActive = (href: string) => {
    const full = `${base}${href}`;
    return pathname === full || pathname.startsWith(`${full}/`);
  };

  return (
    <header className="ns-topbar">
      <div className="ns-topbar-inner">
        <Link
          href={isFR ? "/fr" : "/"}
          className="ns-brand"
          aria-label="NextScenes home"
        >
          <img
            className="ns-brand-logo"
            src="/assets/nextscenes-logo.png"
            alt="NextScenes"
            width={30}
            height={30}
          />
          <span className="ns-brand-text">NextScenes</span>
        </Link>

        <nav
          className="ns-links"
          aria-label={isFR ? "Navigation principale" : "Main navigation"}
        >
          {PRIMARY.map((l) => (
            <Link
              key={l.href}
              href={`${base}${l.href}`}
              className={`ns-navlink ${isActive(l.href) ? "is-active" : ""}`}
            >
              {isFR ? l.fr : l.en}
            </Link>
          ))}

          <details className="ns-more">
            <summary className="ns-navlink">{isFR ? "Plus" : "More"}</summary>
            <div
              className="ns-more-menu"
              role="menu"
              aria-label={isFR ? "Plus de liens" : "More links"}
            >
              {MORE.map((l) => (
                <Link
                  key={l.href}
                  href={`${base}${l.href}`}
                  className="ns-more-item"
                  role="menuitem"
                >
                  {isFR ? l.fr : l.en}
                </Link>
              ))}
            </div>
          </details>
        </nav>

        <div className="ns-topbar-right">
          <div className="ns-lang" aria-label="Language">
            <Link
              className={`ns-lang-link ${!isFR ? "is-active" : ""}`}
              href={enHref}
            >
              EN
            </Link>
            <span className="ns-lang-sep">/</span>
            <Link
              className={`ns-lang-link ${isFR ? "is-active" : ""}`}
              href={frHref}
            >
              FR
            </Link>
          </div>

          {/* Same-tab, consistent behavior */}
          <Link className="ns-btn ns-btn-ghost" href={APP_URL}>
            {isFR ? "Entrer dans l’App" : "Enter the App"}
          </Link>
        </div>
      </div>
    </header>
  );
}
