"use client";

import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const APP_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://app.nextscenes.org").replace(/\/+$/, "");

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

  function isActive(href: string) {
    const full = `${base}${href}`;
    return pathname === full || pathname.startsWith(`${full}/`);
  }

  /* ===============================
     Dropdowns (reliable close)
     =============================== */

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

  useEffect(() => {
    closeAllMenus();
  }, [pathname, closeAllMenus]);

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

  /* ===============================
     Auth awareness (best-effort)
     =============================== */

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

  return (
    <header className="ns-topbar">
      <div className="ns-topbar-inner">
        <Link href={isFR ? "/fr" : "/"} className="ns-brand" aria-label="NextScenes home" onClick={closeAllMenus}>
          <img
            src="/assets/nextscenes-logo.png"
            alt="NextScenes"
            width={30}
            height={30}
            className="ns-brand-logo"
          />
          <span className="ns-brand-text">NextScenes</span>
        </Link>

        <nav className="ns-links" aria-label={isFR ? "Navigation principale" : "Main navigation"}>
          {PRIMARY.map((l) => (
            <Link
              key={l.href}
              href={`${base}${l.href}`}
              className={`ns-navlink ${isActive(l.href) ? "is-active" : ""}`}
              aria-current={isActive(l.href) ? "page" : undefined}
              onClick={closeAllMenus}
            >
              {isFR ? l.fr : l.en}
            </Link>
          ))}

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
                    onClick={closeAllMenus}
                  >
                    {isFR ? l.fr : l.en}
                  </Link>
                ))}
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
              <div id="ns-lang-menu" className="ns-lang-menu" role="menu" aria-label={isFR ? "Langue" : "Language"}>
                <Link
                  href={enHref}
                  className={`ns-lang-item ${!isFR ? "is-active" : ""}`}
                  role="menuitem"
                  onClick={closeAllMenus}
                >
                  <span className="flag" aria-hidden="true">
                    🇬🇧
                  </span>
                  <span>{isFR ? "Anglais" : "English"}</span>
                  <span style={{ marginLeft: "auto", opacity: !isFR ? 1 : 0 }}>{!isFR ? "✓" : ""}</span>
                </Link>

                <Link
                  href={frHref}
                  className={`ns-lang-item ${isFR ? "is-active" : ""}`}
                  role="menuitem"
                  onClick={closeAllMenus}
                >
                  <span className="flag" aria-hidden="true">
                    🇫🇷
                  </span>
                  <span>{isFR ? "Français" : "French"}</span>
                  <span style={{ marginLeft: "auto", opacity: isFR ? 1 : 0 }}>{isFR ? "✓" : ""}</span>
                </Link>
              </div>
            )}
          </div>

          <a href={appCtaHref} className="ns-btn ns-btn-ghost" aria-label={appCtaAria} onClick={closeAllMenus}>
            {appCtaText}
          </a>
        </div>
      </div>
    </header>
  );
}
