// NEXTSCENES_NEW_BRAND_IDENTITY_VERSION: 20260816
// NEXTSCENES_BOOK_FIRST_FAVICON_VERSION: 20260702172733
// NEXTSCENES_HIGH_CONTRAST_FAVICON_VERSION: 20260702171734
// NEXTSCENES_LIGHT_FAVICON_VERSION: 20260702170230
// NEXTSCENES_FAVICON_CACHE_VERSION: 20260702164323
import "./globals.css";
import type { ReactNode } from "react";
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
