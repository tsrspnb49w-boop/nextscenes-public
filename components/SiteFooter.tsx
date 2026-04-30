"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const APP_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://app.nextscenes.org").replace(/\/+$/, "");

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
  const writersHref = isFR ? "/fr/auteurs" : "/writers";
  const writerRightsHref = isFR ? "/fr/droits-des-auteurs" : "/writer-rights";
  const contributorPolicyHref = isFR ? "/fr/politique-contributeurs" : "/contributor-policy";
  const benefitSharingHref = isFR ? "/fr/publication-partage-benefices" : "/publication-benefit-sharing";
  const plainTermsHref = isFR ? "/fr/conditions-simples" : "/plain-language-terms";

  return (
    <footer className="ns-footer" role="contentinfo">
      <div className="ns-footer-inner">
        <div className="ns-footer-brandblock">
          <div className="ns-footer-brand">NextScenes®</div>
          <div className="ns-footer-tagline">
            {isFR
              ? "L’imagination avec conscience."
              : "Imagination with conscience."}
          </div>
          <div className="ns-footer-description">
            {isFR
              ? "Plateforme collaborative de narration pour écrivains, écoles et communautés créatives."
              : "Collaborative storytelling platform for writers, schools, and creative communities."}
          </div>
        </div>

        <nav
          className="ns-footer-navgroup"
          aria-label={isFR ? "Explorer NextScenes" : "Explore NextScenes"}
        >
          <div className="ns-footer-heading">
            {isFR ? "Explorer" : "Explore"}
          </div>
          <div className="ns-footer-links ns-footer-links-stack">
            <a href={`${APP_URL}/storylines`} className="ns-footer-link">
              {isFR ? "Histoires" : "Storylines"}
            </a>
            <Link href={writersHref} className="ns-footer-link">
              {isFR ? "Pour les auteurs" : "For Writers"}
            </Link>
            <Link href={`${base}/faq`} className="ns-footer-link">
              FAQ
            </Link>
            <Link href={`${base}/mystery250`} className="ns-footer-link">
              Mystery250
            </Link>
          </div>
        </nav>

        <nav
          className="ns-footer-navgroup"
          aria-label={isFR ? "Plateforme et politique" : "Platform and policy"}
        >
          <div className="ns-footer-heading">
            {isFR ? "Plateforme" : "Platform"}
          </div>
          <div className="ns-footer-links ns-footer-links-stack">
            <Link href={`${base}/terms`} className="ns-footer-link">
              {isFR ? "Conditions d’utilisation" : "Terms of Service"}
            </Link>
            <Link href={`${base}/privacy`} className="ns-footer-link">
              {isFR ? "Politique de confidentialité" : "Privacy Policy"}
            </Link>
            <Link href={writerRightsHref} className="ns-footer-link">
              {isFR ? "Droits des auteurs" : "Writer Rights"}
            </Link>
            <Link href={contributorPolicyHref} className="ns-footer-link">
              {isFR ? "Politique des contributeurs" : "Contributor Policy"}
            </Link>
            <Link href={benefitSharingHref} className="ns-footer-link">
              {isFR ? "Publication et partage" : "Benefit Sharing"}
            </Link>
            <Link href={plainTermsHref} className="ns-footer-link">
              {isFR ? "Conditions simples" : "Plain-Language Terms"}
            </Link>
            <Link href={`${base}/contact`} className="ns-footer-link">
              {isFR ? "Contact" : "Contact"}
            </Link>
          </div>
        </nav>

        <div
          className="ns-footer-navgroup"
          aria-label={
            isFR
              ? "Communauté et réseaux sociaux"
              : "Community and social links"
          }
        >
          <div className="ns-footer-heading">
            {isFR ? "Communauté" : "Community"}
          </div>
          <div className="ns-footer-links ns-footer-links-stack">
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
          </div>
        </div>
      </div>

      <div className="ns-footer-bottom">
        <div className="ns-footer-bottom-inner">
          © {new Date().getFullYear()} NextScenes. {" "}
          {isFR ? "Tous droits réservés." : "All rights reserved."}
        </div>
      </div>

      <style jsx global>{`
        .ns-footer {
          margin-top: 40px;
          padding: 36px 0 0;
          border-top: 1px solid rgba(20, 138, 74, 0.12);
          background:
            linear-gradient(
              180deg,
              rgba(31, 182, 106, 0.03),
              rgba(255, 255, 255, 0)
            ),
            #f8fafc;
        }

        .ns-footer-inner {
          width: min(1100px, calc(100% - 32px));
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.35fr 0.8fr 0.8fr 0.8fr;
          gap: 28px;
          align-items: start;
          padding: 0 4px 24px;
        }

        .ns-footer-brandblock {
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-width: 42ch;
        }

        .ns-footer-brand {
          font-size: 1rem;
          font-weight: 900;
          letter-spacing: -0.02em;
          color: rgba(15, 36, 24, 0.96);
        }

        .ns-footer-tagline {
          font-size: 0.96rem;
          font-weight: 800;
          color: rgba(15, 36, 24, 0.85);
        }

        .ns-footer-description {
          font-size: 0.9rem;
          line-height: 1.6;
          font-weight: 400;
          color: rgba(15, 36, 24, 0.62);
        }

        .ns-footer-navgroup {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .ns-footer-heading {
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: rgba(15, 36, 24, 0.7);
        }

        .ns-footer-links {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 14px;
          align-items: center;
        }

        .ns-footer-links-stack {
          display: grid;
          gap: 8px;
          align-items: start;
        }

        .ns-footer-link {
          text-decoration: none;
          font-size: 0.92rem;
          font-weight: 700;
          letter-spacing: 0.01em;
          color: rgba(15, 36, 24, 0.82);
          transition: color 140ms ease, opacity 140ms ease;
        }

        .ns-footer-link:hover {
          color: rgba(20, 138, 74, 1);
          opacity: 1;
          text-decoration: none;
        }

        .ns-footer-bottom {
          border-top: 1px solid rgba(20, 138, 74, 0.08);
          padding: 16px 0 20px;
        }

        .ns-footer-bottom-inner {
          width: min(1100px, calc(100% - 32px));
          margin: 0 auto;
          padding: 0 4px;
          text-align: center;
          font-size: 0.84rem;
          line-height: 1.5;
          color: rgba(15, 36, 24, 0.56);
        }

        @media (max-width: 980px) {
          .ns-footer-inner {
            grid-template-columns: 1fr 1fr;
            gap: 24px;
          }
        }

        @media (max-width: 720px) {
          .ns-footer {
            margin-top: 28px;
            padding-top: 22px;
          }

          .ns-footer-inner {
            grid-template-columns: 1fr;
            gap: 20px;
            padding-bottom: 20px;
          }

          .ns-footer-links {
            gap: 10px 12px;
          }
        }
      `}</style>
    </footer>
  );
}
