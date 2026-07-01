import "./globals.css";
import type { ReactNode } from "react";
import Script from "next/script";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import { DEFAULT_SEO_DESCRIPTION, DEFAULT_SEO_TITLE, buildMetadata } from "@/app/seo";

export const metadata = buildMetadata({
  title: DEFAULT_SEO_TITLE,
  description: DEFAULT_SEO_DESCRIPTION,
  path: "/",
  languages: {
    en: "/",
    fr: "/fr",
  },
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FE8MNKJ82Y"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FE8MNKJ82Y');
          `}
        </Script>
      </head>

      <body>
        <div className="ns-shell">
          <SiteNav />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
