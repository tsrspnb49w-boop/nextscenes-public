// Public-only, read-only bridge to the canonical NextScenes editorial spotlight.
// Unpublished/default placeholder records must never replace the approved homepage.
export type EditorialSpotlight = {
  writer?: {
    name?: string; monthLabel?: string; imageUrl?: string;
    teaser?: string; teaserFr?: string; fullText?: string; fullTextFr?: string;
    works?: string[];
  };
  book?: {
    title?: string; titleFr?: string; author?: string;
    coverUrl?: string; coverUrlFr?: string; linkUrl?: string;
    teaser?: string; teaserFr?: string; fullText?: string; fullTextFr?: string;
  };
  daily?: {
    quote?: string; quoteFr?: string; author?: string; dateLabel?: string; dateLabelFr?: string;
    sourceTitle?: string; sourceReference?: string; sourceUrl?: string; sourceType?: string;
    translationCredit?: string; reflection?: string; reflectionFr?: string;
  };
};

type SpotlightResponse = {
  ok?: boolean;
  spotlight?: EditorialSpotlight & { updatedBy?: { id?: string } };
};

const clean = (value: unknown, length = 600) =>
  typeof value === "string" ? value.trim().slice(0, length) : "";

// The editor accepts both absolute URLs and application asset paths. Never
// forward javascript:, data:, or protocol-relative URLs to public links/images.
function safePublicUrl(value: unknown, target: "image" | "link" = "image"): string {
  const raw = clean(value, 1200);
  if (!raw) return "";
  if (raw.startsWith("/") && !raw.startsWith("//")) {
    const appBase = String(process.env.NEXT_PUBLIC_APP_URL || "https://app.nextscenes.org").replace(/\/+$/, "");
    // The existing Content Steward editor stores app-hosted assets as /assets/...
    if (target === "image" && raw.startsWith("/assets/")) return appBase + raw;
    if (target === "link" && raw.startsWith("/storylines")) return appBase + raw;
    return raw;
  }
  try {
    const parsed = new URL(raw);
    return parsed.protocol === "https:" && !parsed.username && !parsed.password ? parsed.href : "";
  } catch {
    return "";
  }
}

export async function getPublishedEditorialSpotlight(): Promise<EditorialSpotlight | null> {
  const apiBase = String(
    process.env.NEXT_PUBLIC_NEXTSCENES_API_BASE ||
    process.env.NEXT_PUBLIC_API_BASE ||
    "https://api.nextscenes.org"
  ).trim().replace(/[/]+$/, "");
  try {
    const response = await fetch(`${apiBase}/api/home/spotlight`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return null;
    const data = (await response.json()) as SpotlightResponse;
    const doc = data?.spotlight;
    // The API creates a legacy placeholder on first read. Only publish records
    // that have actually been saved through the authenticated editorial editor.
    if (!data?.ok || !clean(doc?.updatedBy?.id, 100)) return null;
    const writerName = clean(doc?.writer?.name, 120);
    const bookTitle = clean(doc?.book?.title, 140);
    const dailyQuote = clean(doc?.daily?.quote, 850);
    return {
      writer: writerName && clean(doc?.writer?.teaser) ? {
        name: writerName,
        monthLabel: clean(doc?.writer?.monthLabel, 60),
        imageUrl: safePublicUrl(doc?.writer?.imageUrl),
        teaser: clean(doc?.writer?.teaser),
        teaserFr: clean(doc?.writer?.teaserFr),
        fullText: clean(doc?.writer?.fullText, 6000),
        fullTextFr: clean(doc?.writer?.fullTextFr, 6000),
        works: Array.isArray(doc?.writer?.works)
          ? doc.writer.works.map((item) => clean(item, 200)).filter(Boolean).slice(0, 12)
          : [],
      } : undefined,
      book: bookTitle && !/placeholder/i.test(bookTitle) && clean(doc?.book?.teaser) ? {
        title: bookTitle,
        titleFr: clean(doc?.book?.titleFr, 140),
        author: clean(doc?.book?.author, 120),
        coverUrl: safePublicUrl(doc?.book?.coverUrl),
        coverUrlFr: safePublicUrl(doc?.book?.coverUrlFr),
        linkUrl: safePublicUrl(doc?.book?.linkUrl, "link"),
        teaser: clean(doc?.book?.teaser),
        teaserFr: clean(doc?.book?.teaserFr),
        fullText: clean(doc?.book?.fullText, 6000),
        fullTextFr: clean(doc?.book?.fullTextFr, 6000),
      } : undefined,
      daily: dailyQuote ? {
        quote: dailyQuote,
        quoteFr: clean(doc?.daily?.quoteFr),
        author: clean(doc?.daily?.author, 120),
        dateLabel: clean(doc?.daily?.dateLabel, 60),
        dateLabelFr: clean(doc?.daily?.dateLabelFr, 60),
        sourceTitle: clean(doc?.daily?.sourceTitle, 200),
        sourceReference: clean(doc?.daily?.sourceReference, 200),
        sourceUrl: safePublicUrl(doc?.daily?.sourceUrl, "link"),
        sourceType: clean(doc?.daily?.sourceType, 30),
        translationCredit: clean(doc?.daily?.translationCredit, 120),
        reflection: clean(doc?.daily?.reflection, 500),
        reflectionFr: clean(doc?.daily?.reflectionFr, 500),
      } : undefined,
    };
  } catch {
    return null;
  }
}
