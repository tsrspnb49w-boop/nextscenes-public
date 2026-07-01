import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/enter", "/fr/enter"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
