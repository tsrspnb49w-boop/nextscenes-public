"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.nextscenes.org";

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

  const PRIMARY = useMemo(
    () => [
      { href: "/about", en: "About", fr: "À propos" },
      { href: "/how-it-works", en: "How it works", fr: "Comment ça marche" },
      { href: "/safety", en: "Safety", fr: "Sécurité" },
      { href: "/mystery250", en: "Mystery250", fr: "Mystery250" },
    ],
    []
  );

  const MORE = useMemo(
    () => [
      { href: "/clubs", en: "Clubs", fr: "Clubs" },
      { href: "/partners", en: "Partners", fr: "Partenaires" },
      { href: "/contact", en: "Contact", fr: "Contact" },
    ],
    []
  );

  const isActive = (href: string) => {
    const full = `${base}${href}`;
    return pathname === full || pathname.startsWith(`${full}/`);
  };

  const [moreOpen, setMoreOpen] = useState(false);
  const moreWrapRef = useRef<HTMLDivElement | null>(null);
  const moreButtonRef = useRef<HTMLButtonElement | null>(null);

  // Close on route change (navigation)
  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  // Close on Escape + outside click
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!moreOpen) return;
      if (e.key === "Escape") {
        e.preventDefault();
        setMoreOpen(false);
        // Return focus to the trigger (good manners)
        requestAnimationFrame(() => moreButtonRef.current?.focus());
      }
    }

    function onPointerDown(e: MouseEvent | PointerEvent) {
      if (!moreOpen) return;
      const wrap = moreWrapRef.current;
      if (!wrap) return;
      const target = e.target as Node | null;
      if (target && !wrap.contains(target)) setMoreOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [moreOpen]);

  function toggleMore() {
    setMoreOpen((v) => !v);
  }

  function closeMore() {
    setMoreOpen(false);
  }

  return (
    <header className="ns-topbar">
      <div className="ns-topbar-inner">
        <Link
          href={isFR ? "/fr" : "/"}
          className="ns-brand"
          aria-label="NextScenes home"
          onClick={closeMore}
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
              aria-current={isActive(l.href) ? "page" : undefined}
              onClick={closeMore}
            >
              {isFR ? l.fr : l.en}
            </Link>
          ))}

          <div className="ns-more" ref={moreWrapRef}>
            <button
              ref={moreButtonRef}
              type="button"
              className={`ns-navlink ns-more-trigger ${moreOpen ? "is-open" : ""}`}
              onClick={toggleMore}
              aria-haspopup="menu"
              aria-expanded={moreOpen}
              aria-label={isFR ? "Plus" : "More"}
            >
              {isFR ? "Plus" : "More"}
            </button>

            {moreOpen && (
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
                    onClick={closeMore}
                  >
                    {isFR ? l.fr : l.en}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="ns-topbar-right">
          <div className="ns-lang" aria-label="Language">
            <Link
              className={`ns-lang-link ${!isFR ? "is-active" : ""}`}
              href={enHref}
              onClick={closeMore}
            >
              EN
            </Link>
            <span className="ns-lang-sep">/</span>
            <Link
              className={`ns-lang-link ${isFR ? "is-active" : ""}`}
              href={frHref}
              onClick={closeMore}
            >
              FR
            </Link>
          </div>

          <a
            className="ns-btn ns-btn-ghost"
            href={APP_URL}
            rel="noopener noreferrer"
            onClick={closeMore}
          >
            {isFR ? "Entrer dans l’App" : "Enter the App"}
          </a>
        </div>
      </div>
    </header>
  );
}
