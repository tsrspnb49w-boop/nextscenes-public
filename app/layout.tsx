import "./globals.css";
import type { Metadata } from "next";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "NextScenes | Literary Entertainment",
  description:
    "A safe, values-led platform where readers and writers build stories together through guided feedback, clubs, and community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="ns-shell">
          <SiteNav />
          <main className="ns-main">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
