// Public-only, read-only bridge to the canonical NextScenes editorial spotlight.
// Unpublished/default placeholder records must never replace the approved homepage.
export type EditorialSpotlight = {
  writer?: { name?: string; teaser?: string; teaserFr?: string };
  book?: { title?: string; titleFr?: string; teaser?: string; teaserFr?: string };
  daily?: { quote?: string; quoteFr?: string; author?: string };
};

type SpotlightResponse = {
  ok?: boolean;
  spotlight?: EditorialSpotlight & { updatedBy?: { id?: string } };
};

const clean = (value: unknown, length = 600) =>
  typeof value === "string" ? value.trim().slice(0, length) : "";

export async function getPublishedEditorialSpotlight(): Promise<EditorialSpotlight | null> {
  const apiBase = String(
    process.env.NEXT_PUBLIC_NEXTSCENES_API_BASE ||
    process.env.NEXT_PUBLIC_API_BASE ||
    "https://api.nextscenes.org"
  ).trim().replace(/\\/+$/, "");
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
    const dailyQuote = clean(doc?.daily?.quote, 600);
    return {
      writer: writerName && clean(doc?.writer?.teaser) ? {
        name: writerName, teaser: clean(doc?.writer?.teaser),
        teaserFr: clean(doc?.writer?.teaserFr),
      } : undefined,
      book: bookTitle && !/placeholder/i.test(bookTitle) && clean(doc?.book?.teaser) ? {
        title: bookTitle, titleFr: clean(doc?.book?.titleFr, 140),
        teaser: clean(doc?.book?.teaser), teaserFr: clean(doc?.book?.teaserFr),
      } : undefined,
      daily: dailyQuote ? {
        quote: dailyQuote, quoteFr: clean(doc?.daily?.quoteFr),
        author: clean(doc?.daily?.author, 120),
      } : undefined,
    };
  } catch {
    return null;
  }
}
