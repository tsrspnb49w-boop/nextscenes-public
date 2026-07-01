import type { Metadata } from "next";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nextscenes.org";
const rawAppUrl = process.env.NEXT_PUBLIC_APP_URL || "https://app.nextscenes.org";

export const SITE_URL = rawSiteUrl.replace(/\/+$/, "");
export const APP_URL = rawAppUrl.replace(/\/+$/, "");
export const SITE_NAME = "NextScenes";

export const DEFAULT_SEO_TITLE =
  "NextScenes | Clean Stories, African Books and Collaborative Writing";

export const DEFAULT_SEO_DESCRIPTION =
  "Read and write clean, values-based stories on NextScenes, a free platform for children’s books, African storytelling, family reading, Weekly Mystery puzzles, and serious collaborative writing.";

export const DEFAULT_OG_IMAGE = "/images/home/bookshelf-hero.webp";

export function absoluteUrl(path = "/") {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type BuildMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  locale?: "en" | "fr";
  image?: string;
  noIndex?: boolean;
  languages?: Record<string, string>;
};

export function buildMetadata({
  title,
  description,
  path = "/",
  locale = "en",
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
  languages,
}: BuildMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    applicationName: SITE_NAME,
    alternates: {
      canonical,
      ...(languages ? { languages } : {}),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      images: [
        {
          url: imageUrl,
          alt: `${SITE_NAME} public reading and writing platform`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}
