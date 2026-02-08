// app/components/SiteFooter.tsx
import Link from "next/link";

const SOCIAL = {
  facebook: "https://www.facebook.com/",
  x: "https://x.com/",
  instagram: "https://www.instagram.com/",
  youtube: "https://www.youtube.com/",
};

export default function SiteFooter() {
  return (
    <footer className="ns-footer" role="contentinfo">
      <div className="ns-footer-inner">
        <div className="ns-footer-left">
          <div className="ns-footer-brand">NextScenes®</div>
          <div className="ns-footer-tagline">Imagination with conscience.</div>
          <div className="ns-footer-meta">
            © {new Date().getFullYear()} NextScenes. A cultural and educational storytelling platform.
          </div>
        </div>

        <nav className="ns-footer-links" aria-label="Footer links">
          <Link href="/faq" className="ns-footer-link">
            FAQ
          </Link>
          <Link href="/blog" className="ns-footer-link">
            Blog
          </Link>
        </nav>

        <div className="ns-footer-social" aria-label="Social links">
          <a className="ns-footer-link" href={SOCIAL.facebook} target="_blank" rel="noreferrer">
            Facebook
          </a>
          <a className="ns-footer-link" href={SOCIAL.x} target="_blank" rel="noreferrer">
            X
          </a>
          <a className="ns-footer-link" href={SOCIAL.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a className="ns-footer-link" href={SOCIAL.youtube} target="_blank" rel="noreferrer">
            YouTube
          </a>
        </div>
      </div>
    </footer>
  );
}
