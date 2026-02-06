import Link from "next/link";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.nextscenes.org";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/mystery250", label: "Mystery250" },
  { href: "/safety", label: "Safety" },
  { href: "/clubs", label: "Clubs" },
  { href: "/partners", label: "Partners" },
  { href: "/contact", label: "Contact" },
];

export default function SiteNav() {
  return (
    <header className="ns-nav">
      <div className="ns-nav-inner">
        <Link href="/" className="ns-brand">
          <span className="ns-brand-badge">NS</span>
          <span className="ns-brand-text">NextScenes</span>
        </Link>

        <nav className="ns-links">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="ns-navlink">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ns-nav-cta">
          <a className="ns-btn ns-btn-ghost" href={APP_URL}>
            Enter the App
          </a>
        </div>
      </div>
    </header>
  );
}
