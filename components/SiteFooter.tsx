"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const APP_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://app.nextscenes.org").replace(/\/+$/, "");

const SOCIAL = {
  facebook: "https://www.facebook.com/nextscenes",
  youtube: "https://www.youtube.com/@NextScenesOfficial",
  instagram: "https://www.instagram.com/nextscenes/",
  x: "",
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
  const foundingWritersHref = isFR
    ? "/fr/pilote-auteurs-fondateurs"
    : "/founding-writers-pilot";
  const writerRightsHref = isFR ? "/fr/droits-des-auteurs" : "/writer-rights";
  const contributorPolicyHref = isFR ? "/fr/politique-contributeurs" : "/contributor-policy";
  const illustrationPolicyHref = isFR
    ? "/fr/politique-illustrations-televersements"
    : "/illustration-upload-policy";
  const benefitSharingHref = isFR ? "/fr/publication-partage-benefices" : "/publication-benefit-sharing";
  const plainTermsHref = isFR ? "/fr/conditions-simples" : "/plain-language-terms";
  const aiPrinciplesHref = isFR ? "/fr/principes-ia" : "/ai-principles";

  return (
    <footer className="ns-footer" role="contentinfo">
      <div className="ns-footer-inner">
        <div className="ns-footer-brandblock">
          <Link href={isFR ? "/fr" : "/"} className="ns-footer-brandline" aria-label="NextScenes home">
            <img src="/nextscenes-n-logo.png" alt="" className="ns-footer-nmark" />
            <span className="ns-footer-wordmark">NextScenes®</span>
          </Link>

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
            <Link href={foundingWritersHref} className="ns-footer-link">
              {isFR ? "Pilote auteurs fondateurs" : "Founding Writers Pilot"}
            </Link>
            <a href={`${APP_URL}/storylines`} className="ns-footer-link">
              {isFR ? "Livres en création" : "Books in progress"}
            </a>
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
            <Link href={illustrationPolicyHref} className="ns-footer-link">
              {isFR ? "Illustrations et téléversements" : "Illustration Upload Policy"}
            </Link>
            <Link href={benefitSharingHref} className="ns-footer-link">
              {isFR ? "Publication et partage" : "Benefit Sharing"}
            </Link>
            <Link href={plainTermsHref} className="ns-footer-link">
              {isFR ? "Conditions simples" : "Plain-Language Terms"}
            </Link>
            <Link href={aiPrinciplesHref} className="ns-footer-link">
              {isFR ? "Principes IA" : "AI Principles"}
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
            <a
              className="ns-footer-link"
              href={SOCIAL.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="NextScenes on Facebook"
            >
              Facebook
            </a>

            <a
              className="ns-footer-link"
              href={SOCIAL.youtube}
              target="_blank"
              rel="noreferrer"
              aria-label="NextScenes on YouTube"
            >
              YouTube
            </a>

            <a
              className="ns-footer-link"
              href={SOCIAL.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="NextScenes on Instagram"
            >
              Instagram
            </a>

            {SOCIAL.x ? (
              <a
                className="ns-footer-link"
                href={SOCIAL.x}
                target="_blank"
                rel="noreferrer"
                aria-label="NextScenes on X"
              >
                X
              </a>
            ) : (
              <span className="ns-footer-link ns-footer-link-disabled" aria-label="X link pending">
                X
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="ns-footer-bottom">
        <div className="ns-footer-bottom-inner">
          © {new Date().getFullYear()} NextScenes.{" "}
          {isFR ? "Tous droits réservés." : "All rights reserved."}
        </div>
      </div>

        {/* NEXTSCENES_LEGAL_NOTICE_START */}
        <section className="gincoLegalNotice" aria-label="Legal business information">
          <p><strong>NextScenes is owned and operated by GINCO GROUP SARL.</strong></p>
          <p>Registered office: Quartier HAMDALLAYE ACI 2000, Immeuble PACIFIC, Bamako, Mali.</p>
          <p>Contact: <a href="mailto:support@nextscenes.org">support@nextscenes.org</a></p>
        </section>
        {/* NEXTSCENES_LEGAL_NOTICE_END */}

</footer>
  );
}
