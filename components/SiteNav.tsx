"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.nextscenes.org";

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

type AuthHint = "unknown" | "authed" | "guest";

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
     Auth awareness (best-effort)
     - If app cookies are shared across subdomains, this will detect login.
     - If not, it quietly falls back to "Enter the App".
     =============================== */

  const [authHint, setAuthHint] = useState<AuthHint>("unknown");

  useEffect(() => {
    let alive = true;
    const ctrl = new AbortController();

    async function check() {
      try {
        // Try a lightweight endpoint on the app that returns 200 when logged in.
        // If your app uses a different endpoint, adjust this string only.
        const res = await fetch(`${APP_URL}/api/profile`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
          signal: ctrl.signal,
          headers: { Accept: "application/json" },
        });

        if (!alive) return;

        if (res.ok) {
          setAuthHint("authed");
          return;
        }

        // 401/403 means "guest" (not logged in)
        if (res.status === 401 || res.status === 403) {
          setAuthHint("guest");
          return;
        }

        // Anything else: treat as guest (safe default)
        setAuthHint("guest");
      } catch {
        if (!alive) return;
        setAuthHint("guest");
      }
    }

    // Run once on mount, then settle.
    check();

    return () => {
      alive = false;
      ctrl.abort();
    };
  }, []);

  const appCtaText = useMemo(() => {
    // While unknown, keep the stable label to avoid UI jitter.
    if (authHint !== "authed") return isFR ? "Entrer dans l’App" : "Enter the App";
    return isFR ? "Continuer dans l’App" : "Continue in the App";
  }, [authHint, isFR]);

  const appCtaAria = useMemo(() => {
    if (authHint !== "authed") return isFR ? "Entrer dans l’application" : "Enter the application";
    return isFR ? "Continuer dans l’application" : "Continue in the application";
  }, [authHint, isFR]);

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
        <nav className="ns-links" aria-label={isFR ? "Navigation principale" : "Main navigation"}>
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

          {/* More dropdown */}
          <div className="ns-more" ref={moreWrapRef}>
            <button
              ref={moreButtonRef}
              type="button"
              className={`ns-navlink ns-more-trigger ${moreOpen ? "is-open" : ""}`}
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
          <div className="ns-lang" aria-label="Language">
            <Link
              href={enHref}
              className={`ns-lang-link ${!isFR ? "is-active" : ""}`}
              onClick={closeMore}
            >
              EN
            </Link>

            <span className="ns-lang-sep">/</span>

            <Link
              href={frHref}
              className={`ns-lang-link ${isFR ? "is-active" : ""}`}
              onClick={closeMore}
            >
              FR
            </Link>
          </div>

          {/* App entry (server-side redirect already working) */}
          <a
            href={isFR ? "/fr/enter" : "/enter"}
            className="ns-btn ns-btn-ghost"
            aria-label={appCtaAria}
            onClick={closeMore}
          >
            {appCtaText}
          </a>
        </div>
      </div>
    </header>
  );
}
