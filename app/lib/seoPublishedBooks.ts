// Curated facts for public SEO pages. Do not infer ISBNs, prices, editions or reviews.
// This catalogue is intentionally limited to book titles with confirmed publication and cover assets.
export type PublicBookLocale = "en" | "fr";
export type PublicBook = {
  id: string;
  title: string;
  language: PublicBookLocale;
  href: string;
  alternateHref: string;
  cover: string;
  summary: string;
  themes: string;
  amazonSearchUrl: string;
  author: string;
};

export const publicChildrensBooks: Record<PublicBookLocale, PublicBook[]> = {
  en: [
    {
      id: "ugo-butterfly-en",
      title: "Ugo and the Butterfly Woman",
      language: "en",
      href: "/books/ugo-and-the-butterfly-woman",
      alternateHref: "/fr/books/ugo-et-la-femme-papillon",
      cover: "/images/covers/featured-flat/ugo-butterfly-woman.webp",
      summary: "A children's story about an unexpected encounter, curiosity, kindness, courage and respect for elders.",
      themes: "Wonder, kindness, courage and respect",
      amazonSearchUrl: "https://www.amazon.com/s?k=ugo+and+the+butterfly+woman+book",
      author: "Goddy Oguzie",
    },
    {
      id: "ugo-dog-en",
      title: "Ugo and Her Pet Dog",
      language: "en",
      href: "/books/ugo-and-her-pet-dog",
      alternateHref: "/fr/books/ugo-et-son-petit-chien",
      cover: "/images/covers/featured-flat/ugo-her-pet-dog.webp",
      summary: "A children's story celebrating loyalty, friendship, kindness and the bond between a girl and her dog.",
      themes: "Loyalty, friendship, courage and kindness",
      amazonSearchUrl: "https://www.amazon.com/s?k=ugo+and+her+pet+dog+book",
      author: "Goddy Oguzie",
    },
  ],
  fr: [
    {
      id: "ugo-butterfly-fr",
      title: "Ugo et la Femme-Papillon",
      language: "fr",
      href: "/fr/books/ugo-et-la-femme-papillon",
      alternateHref: "/books/ugo-and-the-butterfly-woman",
      cover: "/images/covers/featured-flat/ugo-femme-papillon.webp",
      summary: "Une histoire pour enfants sur une rencontre inattendue, la curiosité, la bonté, le courage et le respect des anciens.",
      themes: "Émerveillement, bonté, courage et respect",
      amazonSearchUrl: "https://www.amazon.com/s?k=ugo+et+la+femme-papillon+book",
      author: "Goddy Oguzie",
    },
    {
      id: "ugo-dog-fr",
      title: "Ugo et son petit chien",
      language: "fr",
      href: "/fr/books/ugo-et-son-petit-chien",
      alternateHref: "/books/ugo-and-her-pet-dog",
      cover: "/images/covers/featured-flat/ugo-et-son-petit-chien.webp",
      summary: "Un livre pour enfants sur la fidélité, la vraie amitié, la gentillesse et les liens entre une jeune fille et son chien.",
      themes: "Fidélité, amitié, courage et bonté",
      amazonSearchUrl: "https://www.amazon.com/s?k=ugo+et+son+petit+chien",
      author: "Goddy Oguzie",
    },
  ],
};

export function getPublicBook(locale: PublicBookLocale, id: string): PublicBook {
  const book = publicChildrensBooks[locale].find((entry) => entry.id === id);
  if (!book) throw new Error("Unknown public book record: " + id);
  return book;
}
