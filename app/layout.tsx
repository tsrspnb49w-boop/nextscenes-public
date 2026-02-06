import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "NextScenes",
  description: "A calm, serious platform for building stories together.",
};

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.nextscenes.org";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="ns-shell">
          <header className="ns-topbar">
            <div className="ns-topbar-inner">
              <Link href="/" className="ns-brand">
                NextScenes®
              </Link>

              <nav className="ns-nav">
                <Link href="/about">About</Link>
                <Link href="/how-it-works">How it works</Link>
                <Link href="/safety">Safety</Link>
                <Link href="/clubs">Clubs</Link>
                <Link href="/partners">Partners</Link>
                <Link href="/mystery250">Mystery250</Link>
                <Link href="/contact">Contact</Link>

                <a href={APP_URL}>Enter App</a>
              </nav>
            </div>
          </header>

          <main>{children}</main>

          <footer className="ns-footer">
            <div className="ns-footer-inner">
              <div>
                © {new Date().getFullYear()} NextScenes. A cultural and
                educational storytelling platform.
              </div>
              <div>Imagination with conscience.</div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
