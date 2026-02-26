"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://app.nextscenes.org";

/* ===============================
   Path helpers
   =============================== */

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

/* ===============================
   Component
   =============================== */

export default function SiteNav() {
  const pathname = usePathname() || "/";

  const isFR = pathname === "/fr" || pathname.startsWith("/fr/");
  const base = isFR ? "/fr" : "";

  const enHref = stripFrPrefix(pathname);
  const frHref = addFrPrefix(pathname);

  /* ===============================
     Links
     =============================== */

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

  function isActive(href: string) {
    const full = `${base}${href}`;
    return pathname === full || pathname.startsWith(`${full}/`);
  }

  /* ===============================
     More dropdown state
     =============================== */

  const [moreOpen, setMoreOpen] = useState(false);

  const moreWrapRef = useRef<HTMLDivElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);

  function closeMore() {
    setMoreOpen(false);
  }

  function toggleMore() {
    setMoreOpen((v) => !v);
  }

  /* ===============================
     Close on route change
     =============================== */

  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  /* ===============================
     Close on Escape
     =============================== */

  useEffect(() => {
    if (!moreOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return;

      e.preventDefault();

      setMoreOpen(false);

      requestAnimationFrame(() => {
        moreButtonRef.current?.focus();
      });
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [moreOpen]);

  /* ===============================
     Close on outside click
     =============================== */

  useEffect(() => {
    if (!moreOpen) return;

    function onPointerDown(e: PointerEvent) {
      const wrap = moreWrapRef.current;
      if (!wrap) return;

      if (!wrap.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }

    window.addEventListener("pointerdown", onPointerDown);

    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [moreOpen]);

  /* ===============================
     Render
     =============================== */

  return (
    <header className="ns-topbar">
      <div className="ns-topbar-inner">

        {/* Brand */}

        <Link
          href={isFR ? "/fr" : "/"}
          className="ns-brand"
          aria-label="NextScenes home"
          onClick={closeMore}
        >
          <img
            src="/assets/nextscenes-logo.png"
            alt="NextScenes"
            width={30}
            height={30}
            className="ns-brand-logo"
          />

          <span className="ns-brand-text">NextScenes</span>
        </Link>


        {/* Primary nav */}

        <nav
          className="ns-links"
          aria-label={isFR ? "Navigation principale" : "Main navigation"}
        >
          {PRIMARY.map((l) => (
            <Link
              key={l.href}
              href={`${base}${l.href}`}
              className={`ns-navlink ${
                isActive(l.href) ? "is-active" : ""
              }`}
              aria-current={isActive(l.href) ? "page" : undefined}
              onClick={closeMore}
            >
              {isFR ? l.fr : l.en}
            </Link>
          ))}


          {/* More dropdown */}

          <div className="ns-more" ref={moreWrapRef}>

            <button
              ref={moreButtonRef}
              type="button"
              className={`ns-navlink ns-more-trigger ${
                moreOpen ? "is-open" : ""
              }`}
              aria-haspopup="menu"
              aria-expanded={moreOpen}
              aria-controls="ns-more-menu"
              onClick={toggleMore}
            >
              {isFR ? "Plus" : "More"}
            </button>


            {moreOpen && (
              <div
                id="ns-more-menu"
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


        {/* Right side */}

        <div className="ns-topbar-right">

          {/* Language */}

          <div className="ns-lang">

            <Link
              href={enHref}
              className={`ns-lang-link ${
                !isFR ? "is-active" : ""
              }`}
              onClick={closeMore}
            >
              EN
            </Link>

            <span className="ns-lang-sep">/</span>

            <Link
              href={frHref}
              className={`ns-lang-link ${
                isFR ? "is-active" : ""
              }`}
              onClick={closeMore}
            >
              FR
            </Link>

          </div>


          {/* App entry */}

          <a
            href={isFR ? "/fr/enter" : "/enter"}
            className="ns-btn ns-btn-ghost"
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
