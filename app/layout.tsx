// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import SiteNav from "../components/SiteNav";

export const metadata = {
  title: "NextScenes",
  description: "A calm, serious platform for building stories together.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="ns-shell">
          <SiteNav />

          <main>{children}</main>

          <footer className="ns-footer">
            <div className="ns-footer-inner">
              <div>
                © {new Date().getFullYear()} NextScenes. A cultural and educational
                storytelling platform.
              </div>
              <div>Imagination with conscience.</div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
