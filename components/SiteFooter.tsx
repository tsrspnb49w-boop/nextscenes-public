import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="ns-footer">
      <div className="ns-footer-inner">
        <div>
          <div className="ns-footer-brand">NextScenes</div>
          <div className="ns-footer-muted">
            Literary Entertainment with conscience.
          </div>
        </div>

        <div className="ns-footer-links">
          <Link href="/safety">Safety</Link>
          <Link href="/how-it-works">How it works</Link>
          <Link href="/partners">Partners</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className="ns-footer-muted">
          © {new Date().getFullYear()} NextScenes
        </div>
      </div>
    </footer>
  );
}
