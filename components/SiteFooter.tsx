// app/components/SiteFooter.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SOCIAL = {
  facebook: "https://www.facebook.com/",
  x: "https://x.com/",
  instagram: "https://www.instagram.com/",
  youtube: "https://www.youtube.com/",
};

function normalizePath(p: string) {
  if (!p) return "/";
  return p.startsWith("/") ? p : `/${p}`;
}

export default function SiteFooter() {
  const pathname = normalizePath(usePathname() || "/");
  const isFR = pathname === "/fr" || pathname.startsWith("/fr/");
  const base = isFR ? "/fr" : "";

  return (
    <footer className="ns-footer" role="contentinfo">
      <div className="ns-footer-inner">
        <div className="ns-footer-left">
          <div className="ns-footer-brand">NextScenes®</div>
          <div className="ns-footer-tagline">Imagination with conscience.</div>
          <div className="ns-footer-meta">
            © {new Date().getFullYear()} NextScenes. A cultural and educational
            storytelling platform.
          </div>
        </div>

        <nav
          className="ns-footer-links"
          aria-label={isFR ? "Liens de bas de page" : "Footer links"}
        >
          <Link href={`${base}/faq`} className="ns-footer-link">
            FAQ
          </Link>
          <Link href={`${base}/terms`} className="ns-footer-link">
            {isFR ? "Conditions d’utilisation" : "Terms of Service"}
          </Link>
          <Link href={`${base}/privacy`} className="ns-footer-link">
            {isFR ? "Politique de confidentialité" : "Privacy Policy"}
          </Link>
        </nav>

        <div
          className="ns-footer-social"
          aria-label={isFR ? "Liens sociaux" : "Social links"}
        >
          <a
            className="ns-footer-link"
            href={SOCIAL.facebook}
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
          <a
            className="ns-footer-link"
            href={SOCIAL.x}
            target="_blank"
            rel="noreferrer"
          >
            X
          </a>
          <a
            className="ns-footer-link"
            href={SOCIAL.instagram}
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <a
            className="ns-footer-link"
            href={SOCIAL.youtube}
            target="_blank"
            rel="noreferrer"
          >
            YouTube
          </a>
        </div>
      </div>
    </footer>
  );
}
