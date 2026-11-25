// Public catalog metadata for the independently authorized First Reads editions.
// Environment selection is server-owned. Never send staging readers to production.
export const QUEEN_AMINA_FIRST_READS = {
  id: "6b031e6fa85e87384e4e27a5",
  title: "Queen Amina: Soldier on Horseback",
  author: "Kola King",
  available: "Chapter One",
  cover: "/images/first-reads/queen-amina-front.jpg",
} as const;
const STAGING_PUBLIC_ID = "6b015cd165e47e1c7a8b31f5";
function isStagingPublicSite(): boolean {
  return process.env.RENDER_SERVICE_ID === "srv-dbi96qjbc2fs73af0i80" ||
    process.env.RENDER_SERVICE_NAME === "nextscenes-public-staging";
}
export function queenAminaPublicStoryId(): string {
  return isStagingPublicSite() ? STAGING_PUBLIC_ID : QUEEN_AMINA_FIRST_READS.id;
}
export function queenAminaPublicReadingUrl(appBase = process.env.NEXT_PUBLIC_APP_URL || "https://app.nextscenes.org"): string {
  const origin = isStagingPublicSite() ? "https://staging.nextscenes.org" : appBase;
  return origin.replace(/\/+$/, "") +
    "/reader-view?storyId=" + encodeURIComponent(queenAminaPublicStoryId()) + "&openBook=1";
}
