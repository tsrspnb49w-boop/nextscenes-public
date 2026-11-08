// Choose a public story by its exact displayed title and language.
// Never use a general "52" search or the first bilingual title match.
export type PublicStoryKey = "windows" | "sin" | "shadows";
export type PublicStoryOption = { id?: string; title?: string };
export type PublicDevelopment = {
  key?: string; public?: boolean; title?: string; href?: string;
};
const normalize = (value: string) => String(value || "")
  .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

export function isMatchingPublicStory(
  key: PublicStoryKey, language: "en" | "fr", title: string
): boolean {
  const text = normalize(title);
  if (key === "windows") {
    return language === "fr"
      ? /^(?:(?:les|the) )?52 fenetres$/.test(text)
      : /^(?:the )?52 windows$/.test(text);
  }
  if (key === "sin") {
    return /^world of (?:s i n|sin)(?: supernatural integration network)?$/.test(text);
  }
  return text === "shadows of the harbour";
}

export function publicStorySearchTitle(key: PublicStoryKey, language: "en" | "fr"): string {
  if (key === "windows") return language === "fr" ? "Les 52 Fenêtres" : "The 52 Windows";
  if (key === "sin") return "World of S.I.N.";
  return "Shadows of the Harbour";
}

export function resolvePublicStoryHref(
  key: PublicStoryKey,
  language: "en" | "fr",
  appUrl: string,
  options: PublicStoryOption[] = [],
  development: PublicDevelopment[] = [],
): string {
  const base = appUrl.replace(/\/+$/, "");
  const candidates = options.filter(row =>
    /^[a-f0-9]{24}$/i.test(String(row?.id || "")) &&
    isMatchingPublicStory(key, language, String(row?.title || "")));
  const uniqueIds = [...new Set(candidates.map(row => String(row.id)))];
  if (uniqueIds.length === 1) {
    return base + "/reader-view?storyId=" + encodeURIComponent(uniqueIds[0]);
  }
  // Public feed's "development" shortcut can select the first edition.
  // Use it only when its actual title matches the requested edition.
  if (uniqueIds.length === 0) {
    const match = development.find(row =>
      row?.public === true && row?.key === key &&
      isMatchingPublicStory(key, language, String(row?.title || "")) &&
      /^\/reader-view\?storyId=[a-f0-9]{24}$/i.test(String(row?.href || "")));
    if (match?.href) return base + match.href;
  }
  // The app honours ?q= as an initial Storylines filter. A precise-title
  // search is preferable to silently opening the other language's work.
  return base + "/storylines?q=" + encodeURIComponent(publicStorySearchTitle(key, language));
}
