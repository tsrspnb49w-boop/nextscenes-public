"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SOCIAL = {
  facebook: "https://www.facebook.com/nextscenes",
  youtube: "https://www.youtube.com/@NextScenesOfficial",
  x: "",
  instagram: "",
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
        <div className="ns-footer-brandblock">
          <div className="ns-footer-brand">NextScenes®</div>
          <div className="ns-footer-tagline">
            {isFR ? "L’imagination avec conscience." : "Imagination with conscience."}
          </div>
          <div className="ns-footer-meta">
            © {new Date().getFullYear()} NextScenes.{" "}
            {isFR
              ? "Une plateforme culturelle et éducative de narration."
              : "A cultural and educational storytelling platform."}
          </div>
        </div>

        <nav
          className="ns-footer-navgroup"
          aria-label={isFR ? "Liens de bas de page" : "Footer links"}
        >
          <div className="ns-footer-heading">{isFR ? "Informations" : "Information"}</div>
          <div className="ns-footer-links">
            <Link href={`${base}/faq`} className="ns-footer-link">
              FAQ
            </Link>
            <Link href={`${base}/terms`} className="ns-footer-link">
              {isFR ? "Conditions d’utilisation" : "Terms of Service"}
            </Link>
            <Link href={`${base}/privacy`} className="ns-footer-link">
              {isFR ? "Politique de confidentialité" : "Privacy Policy"}
            </Link>
          </div>
        </nav>

        <div
          className="ns-footer-navgroup"
          aria-label={isFR ? "Liens sociaux" : "Social links"}
        >
          <div className="ns-footer-heading">{isFR ? "Communauté" : "Community"}</div>
          <div className="ns-footer-links">
            {SOCIAL.facebook && (
              <a
                className="ns-footer-link"
                href={SOCIAL.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="NextScenes on Facebook"
              >
                Facebook
              </a>
            )}

            {SOCIAL.x && (
              <a
                className="ns-footer-link"
                href={SOCIAL.x}
                target="_blank"
                rel="noreferrer"
                aria-label="NextScenes on X"
              >
                X
              </a>
            )}

            {SOCIAL.instagram && (
              <a
                className="ns-footer-link"
                href={SOCIAL.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="NextScenes on Instagram"
              >
                Instagram
              </a>
            )}

            {SOCIAL.youtube && (
              <a
                className="ns-footer-link"
                href={SOCIAL.youtube}
                target="_blank"
                rel="noreferrer"
                aria-label="NextScenes on YouTube"
              >
                YouTube
              </a>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .ns-footer {
          margin-top: 26px;
          padding: 22px 0 10px;
          border-top: 1px solid rgba(20, 138, 74, 0.12);
          background: linear-gradient(
              180deg,
              rgba(31, 182, 106, 0.03),
              rgba(255, 255, 255, 0)
            ),
            transparent;
        }

        .ns-footer-inner {
          width: min(1100px, calc(100% - 32px));
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.2fr 0.9fr 0.9fr;
          gap: 28px;
          align-items: start;
          padding: 0 4px;
        }

        .ns-footer-brandblock {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .ns-footer-brand {
          font-size: 1rem;
          font-weight: 900;
          letter-spacing: -0.02em;
          color: rgba(15, 36, 24, 0.96);
        }

        .ns-footer-tagline {
          font-size: 0.94rem;
          font-weight: 700;
          color: rgba(15, 36, 24, 0.7);
        }

        .ns-footer-meta {
          max-width: 42ch;
          font-size: 0.86rem;
          line-height: 1.5;
          color: rgba(15, 36, 24, 0.62);
        }

        .ns-footer-navgroup {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .ns-footer-heading {
          font-size: 0.82rem;
          font-weight: 900;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: rgba(15, 36, 24, 0.64);
        }

        .ns-footer-links {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 14px;
          align-items: center;
        }

        .ns-footer-link {
          text-decoration: none;
          font-size: 0.92rem;
          font-weight: 700;
          color: rgba(15, 36, 24, 0.8);
          transition: color 140ms ease, opacity 140ms ease;
        }

        .ns-footer-link:hover {
          color: rgba(20, 138, 74, 1);
          opacity: 1;
          text-decoration: none;
        }

        @media (max-width: 900px) {
          .ns-footer-inner {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .ns-footer-links {
            gap: 10px 12px;
          }
        }
      `}</style>
    </footer>
  );
}