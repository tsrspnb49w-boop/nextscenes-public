"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const APP_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://app.nextscenes.org").replace(/\/+$/, "");

/* ===============================
   Path helpers
   =============================== */

function normalizePath(pathname: string) {
  if (!pathname) return "/";

  let p = pathname.startsWith("/") ? pathname : `/${pathname}`;

  // Remove query/hash if a browser URL ever reaches this helper.
  p = p.split("?")[0].split("#")[0];

  // Remove trailing slash, except for root.
  if (p.length > 1) p = p.replace(/\/+$/, "");

  return p || "/";
}

const ROUTE_PAIRS: Array<[string, string]> = [
  ["/", "/fr"],

  ["/about", "/fr/about"],
  ["/clubs", "/fr/clubs"],
  ["/contact", "/fr/contact"],
  ["/enter", "/fr/enter"],
  ["/faq", "/fr/faq"],
  ["/how-it-works", "/fr/how-it-works"],
  ["/mystery250", "/fr/mystery250"],
  ["/partners", "/fr/partners"],
  ["/privacy", "/fr/privacy"],
  ["/safety", "/fr/safety"],
  ["/terms", "/fr/terms"],
  ["/ai-principles", "/fr/principes-ia"],

  ["/writers", "/fr/auteurs"],
  ["/writer-rights", "/fr/droits-des-auteurs"],
  ["/contributor-policy", "/fr/politique-contributeurs"],
  ["/illustration-upload-policy", "/fr/politique-illustrations-televersements"],
  ["/publication-benefit-sharing", "/fr/publication-partage-benefices"],
  ["/plain-language-terms", "/fr/conditions-simples"],

  ["/founding-writers-pilot", "/fr/pilote-auteurs-fondateurs"],
  ["/pilote-auteurs-fondateurs", "/fr/pilote-auteurs-fondateurs"],
];

const EN_TO_FR_PATH: Record<string, string> = Object.fromEntries(ROUTE_PAIRS);
const FR_TO_EN_PATH: Record<string, string> = Object.fromEntries(
  ROUTE_PAIRS.map(([en, fr]) => [fr, en])
);

// Support the older duplicate French pilot route if anyone lands on it.
FR_TO_EN_PATH["/fr/founding-writers-pilot"] = "/founding-writers-pilot";

function stripFrPrefix(pathname: string) {
  const p = normalizePath(pathname);
  if (p === "/fr") return "/";
  return p.startsWith("/fr/") ? p.slice(3) || "/" : p;
}

function addFrPrefix(pathname: string) {
  const p = normalizePath(pathname);
  if (p === "/") return "/fr";
  return p.startsWith("/fr") ? p : `/fr${p}`;
}

function mapKnownPath(pathname: string, map: Record<string, string>) {
  const p = normalizePath(pathname);

  // Exact match first.
  if (map[p]) return map[p];

  // Then preserve nested paths, choosing the longest matching route first.
  const entries = Object.entries(map).sort((a, b) => b[0].length - a[0].length);

  for (const [from, to] of entries) {
    if (from === "/" || from === "/fr") continue;
    if (p.startsWith(`${from}/`)) return `${to}${p.slice(from.length)}`;
  }

  return "";
}

function toEnglishPath(pathname: string) {
  const p = normalizePath(pathname);
  const mapped = mapKnownPath(p, FR_TO_EN_PATH);
  if (mapped) return mapped;
  return stripFrPrefix(p);
}

function toFrenchPath(pathname: string) {
  const p = normalizePath(pathname);
  const mapped = mapKnownPath(p, EN_TO_FR_PATH);
  if (mapped) return mapped;
  return addFrPrefix(p);
}

/* ===============================
   Component
   =============================== */

type AuthHint = "unknown" | "authed" | "guest";

function isLikelyAuthedPayload(data: any) {
  if (!data || typeof data !== "object") return false;
  if (data.ok === true) return true;

  if (data.user && typeof data.user === "object") {
    if (data.user._id || data.user.id || data.user.email || data.user.username) return true;
  }

  if (data.me && typeof data.me === "object") {
    if (data.me._id || data.me.id || data.me.email || data.me.username) return true;
  }

  return false;
}

export default function SiteNav() {
  const pathname = usePathname() || "/";
  const cleanPathname = normalizePath(pathname);

  const isFR = cleanPathname === "/fr" || cleanPathname.startsWith("/fr/");
  const base = isFR ? "/fr" : "";

  const enHref = toEnglishPath(cleanPathname);
  const frHref = toFrenchPath(cleanPathname);

  const PRIMARY = useMemo(
    () => [
      { href: "/about", frHref: "/about", en: "About", fr: "À propos" },
      { href: "/writers", frHref: "/auteurs", en: "For Writers", fr: "Pour les auteurs" },
      { href: "/how-it-works", frHref: "/how-it-works", en: "How it works", fr: "Comment ça marche" },
      { href: "/safety", frHref: "/safety", en: "Safety", fr: "Sécurité" },
      { href: "/mystery250", frHref: "/mystery250", en: "Mystery250", fr: "Mystery250" },
    ],
    []
  );

  const MORE = useMemo(
    () => [
      { href: "/clubs", frHref: "/clubs", en: "Clubs", fr: "Clubs" },
      { href: "/partners", frHref: "/partners", en: "Partners", fr: "Partenaires" },
      { href: "/ai-principles", frHref: "/principes-ia", en: "AI Principles", fr: "Principes IA" },
      { href: "/contact", frHref: "/contact", en: "Contact", fr: "Contact" },
    ],
    []
  );

  function localizedHref(link: { href: string; frHref?: string }) {
    if (!isFR) return link.href;
    return `${base}${link.frHref || link.href}`;
  }

  function isActive(href: string) {
    const h = normalizePath(href);
    return cleanPathname === h || cleanPathname.startsWith(`${h}/`);
  }

  const [moreOpen, setMoreOpen] = useState(false);
  const moreWrapRef = useRef<HTMLDivElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);

  const [langOpen, setLangOpen] = useState(false);
  const langWrapRef = useRef<HTMLDivElement>(null);
  const langButtonRef = useRef<HTMLButtonElement>(null);

  const closeAllMenus = useCallback(() => {
    setMoreOpen(false);
    setLangOpen(false);
  }, []);

  const toggleMore = useCallback(() => {
    setLangOpen(false);
    setMoreOpen((v) => !v);
  }, []);

  const toggleLang = useCallback(() => {
    setMoreOpen(false);
    setLangOpen((v) => !v);
  }, []);

  const goToLanguage = useCallback(
    (href: string) => {
      closeAllMenus();

      // A normal document navigation is deliberately used for the language switch.
      // This avoids stale client state and guarantees the correct App Router page loads.
      if (typeof window !== "undefined") {
        window.location.assign(href);
      }
    },
    [closeAllMenus]
  );

  useEffect(() => {
    closeAllMenus();
  }, [cleanPathname, closeAllMenus]);

  useEffect(() => {
    if (!moreOpen && !langOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      e.preventDefault();

      const wasMore = moreOpen;
      const wasLang = langOpen;

      closeAllMenus();

      requestAnimationFrame(() => {
        if (wasMore) moreButtonRef.current?.focus();
        else if (wasLang) langButtonRef.current?.focus();
      });
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [moreOpen, langOpen, closeAllMenus]);

  useEffect(() => {
    if (!moreOpen && !langOpen) return;

    function onOutside(e: Event) {
      const target = e.target as Node | null;
      if (!target) return;

      const inMore = !!moreWrapRef.current?.contains(target);
      const inLang = !!langWrapRef.current?.contains(target);

      if (!inMore && !inLang) closeAllMenus();
    }

    window.addEventListener("mousedown", onOutside, true);
    window.addEventListener("touchstart", onOutside, true);

    return () => {
      window.removeEventListener("mousedown", onOutside, true);
      window.removeEventListener("touchstart", onOutside, true);
    };
  }, [moreOpen, langOpen, closeAllMenus]);

  const [authHint, setAuthHint] = useState<AuthHint>("unknown");

  const checkAuth = useCallback(async () => {
    const ctrl = new AbortController();
    const t = window.setTimeout(() => ctrl.abort(), 2500);

    try {
      const res = await fetch(`${APP_URL}/api/auth/me`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
        signal: ctrl.signal,
        headers: { Accept: "application/json" },
      });

      if (res.status === 401 || res.status === 403) {
        setAuthHint("guest");
        return;
      }

      const ct = (res.headers.get("content-type") || "").toLowerCase();
      if (!ct.includes("application/json")) {
        setAuthHint("guest");
        return;
      }

      const data = await res.json().catch(() => null);
      setAuthHint(isLikelyAuthedPayload(data) ? "authed" : "guest");
    } catch {
      setAuthHint("guest");
    } finally {
      window.clearTimeout(t);
      ctrl.abort();
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    function onFocus() {
      checkAuth();
    }

    function onVis() {
      if (document.visibilityState === "visible") checkAuth();
    }

    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [checkAuth]);

  const appCtaText = useMemo(() => {
    if (authHint === "unknown") return isFR ? "Vérification…" : "Checking…";
    if (authHint !== "authed") return isFR ? "Entrer dans l’App" : "Enter the App";
    return isFR ? "Continuer dans l’App" : "Continue in the App";
  }, [authHint, isFR]);

  const appCtaAria = useMemo(() => {
    if (authHint === "unknown") return isFR ? "Vérification de session" : "Checking session";
    if (authHint !== "authed") return isFR ? "Entrer dans l’application" : "Enter the application";
    return isFR ? "Continuer dans l’application" : "Continue in the application";
  }, [authHint, isFR]);

  const appCtaHref = useMemo(() => {
    if (authHint === "authed") return `${APP_URL}/storylines`;
    return isFR ? "/fr/enter" : "/enter";
  }, [authHint, isFR]);

  const langLabel = isFR ? "Langue" : "Lang";
  const menuOpen = moreOpen || langOpen;

  return (
    <header className={`ns-topbar ${menuOpen ? "is-menu-open" : ""}`}>
      <div className="ns-topbar-inner">
        <Link
          href={isFR ? "/fr" : "/"}
          className="ns-brand"
          aria-label="NextScenes home"
          onClick={closeAllMenus}
        >
          <img src="/nextscenes-logo.png" alt="NextScenes" className="ns-brand-logo" />
        </Link>

        <nav className="ns-links" aria-label={isFR ? "Navigation principale" : "Main navigation"}>
          {PRIMARY.map((l) => {
            const href = localizedHref(l);

            return (
              <Link
                key={href}
                href={href}
                className={`ns-navlink ${isActive(href) ? "is-active" : ""}`}
                aria-current={isActive(href) ? "page" : undefined}
                onClick={closeAllMenus}
              >
                {isFR ? l.fr : l.en}
              </Link>
            );
          })}

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
                {MORE.map((l) => {
                  const href = localizedHref(l);

                  return (
                    <Link
                      key={href}
                      href={href}
                      className="ns-more-item"
                      role="menuitem"
                      onClick={closeAllMenus}
                    >
                      {isFR ? l.fr : l.en}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        <div className="ns-topbar-right">
          <div className="ns-langdrop" ref={langWrapRef}>
            <button
              ref={langButtonRef}
              type="button"
              className={`ns-lang-trigger ${langOpen ? "is-open" : ""}`}
              aria-haspopup="menu"
              aria-expanded={langOpen}
              aria-controls="ns-lang-menu"
              onClick={toggleLang}
            >
              {langLabel}
            </button>

            {langOpen && (
              <div
                id="ns-lang-menu"
                className="ns-lang-menu"
                role="menu"
                aria-label={isFR ? "Langue" : "Language"}
              >
                <button
                  type="button"
                  className={`ns-lang-item ${!isFR ? "is-active" : ""}`}
                  role="menuitem"
                  onClick={() => goToLanguage(enHref)}
                >
                  <span className="flag" aria-hidden="true">
                    🇬🇧
                  </span>
                  <span className="ns-lang-text">{isFR ? "Anglais" : "English"}</span>
                  <span className="ns-lang-check">{!isFR ? "✓" : ""}</span>
                </button>

                <button
                  type="button"
                  className={`ns-lang-item ${isFR ? "is-active" : ""}`}
                  role="menuitem"
                  onClick={() => goToLanguage(frHref)}
                >
                  <span className="flag" aria-hidden="true">
                    🇫🇷
                  </span>
                  <span className="ns-lang-text">{isFR ? "Français" : "French"}</span>
                  <span className="ns-lang-check">{isFR ? "✓" : ""}</span>
                </button>
              </div>
            )}
          </div>

          <a
            href={appCtaHref}
            className="ns-btn ns-btn-ghost"
            aria-label={appCtaAria}
            onClick={closeAllMenus}
          >
            {appCtaText}
          </a>
        </div>
      </div>
    </header>
  );
}
