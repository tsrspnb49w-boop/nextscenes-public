// Public catalog metadata for the specifically authorized First Reads edition.
// Never link to the owner's private First Reads workspace or claim additional serials.
export const QUEEN_AMINA_FIRST_READS = {
  id: "6b031e6fa85e87384e4e27a5",
  title: "Queen Amina: Soldier on Horseback",
  author: "Kola King",
  available: "Chapter One",
  cover: "/images/first-reads/queen-amina-cover-thumb.svg",
} as const;

export function queenAminaPublicReadingUrl(appBase = process.env.NEXT_PUBLIC_APP_URL || "https://app.nextscenes.org"): string {
  return appBase.replace(/\/+$/, "") +
    "/reader-view?storyId=" + encodeURIComponent(QUEEN_AMINA_FIRST_READS.id) + "&openBook=1";
}
