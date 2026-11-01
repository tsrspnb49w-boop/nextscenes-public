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

export const publicPublishedBooks: Record<PublicBookLocale, PublicBook[]> = {
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
      cover: "/images/covers/ugo-her-pet-dog-flat-2d.webp",
      summary: "A children's story celebrating loyalty, friendship, kindness and the bond between a girl and her dog.",
      themes: "Loyalty, friendship, courage and kindness",
      amazonSearchUrl: "https://www.amazon.com/s?k=ugo+and+her+pet+dog+book",
      author: "Goddy Oguzie",
    },
    {
      id: "ugo-awa-en",
      title: "Ugo and Her Friend, Awa",
      language: "en",
      href: "/books/ugo-and-her-friend-awa",
      alternateHref: "/fr/books/ugo-et-son-amie-awa",
      cover: "/images/covers/featured-flat/ugo-and-her-friend-awa.webp",
      summary: "A children's story about Ugo and her friend Awa, celebrating friendship, kindness and understanding.",
      themes: "Friendship, kindness and understanding",
      amazonSearchUrl: "https://www.amazon.com/s?k=ugo+and+her+friend+awa",
      author: "Goddy Oguzie",
    },
    {
      id: "tarllus-en",
      title: "The Trials of Tarllus",
      language: "en",
      href: "/books/the-trials-of-tarllus",
      alternateHref: "/fr/books/les-epreuves-de-tarllus",
      cover: "/images/covers/featured-flat/trials-of-tarllus-en.webp",
      summary: "A novel exploring the trials, moral choices and consequences that shape Tarllus's journey.",
      themes: "Moral choices, responsibility and human character",
      amazonSearchUrl: "https://www.amazon.com/s?k=the+trials+of+tarllus+goddy+oguzie",
      author: "Goddy Oguzie",
    },
    {
      id: "wayfarer-en",
      title: "Reflections of the Wayfarer",
      language: "en",
      href: "/books/reflections-of-the-wayfarer",
      alternateHref: "/fr/books/reflexions-dun-voyageur",
      cover: "/images/covers/featured-flat/reflections-wayfarer.webp",
      summary: "Thoughtful reflections on life's choices, human values, character and the search for meaning.",
      themes: "Life, character, choices and reflection",
      amazonSearchUrl: "https://www.amazon.com/s?k=reflections+of+the+wayfarer+goddy+oguzie",
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
    {
      id: "ugo-awa-fr",
      title: "Ugo et son amie Awa",
      language: "fr",
      href: "/fr/books/ugo-et-son-amie-awa",
      alternateHref: "/books/ugo-and-her-friend-awa",
      cover: "/images/covers/ugo-et-son-amie-awa-fr-cover.jpg",
      summary: "Une histoire pour enfants autour d’Ugo et de son amie Awa, célébrant l’amitié, la bonté et la compréhension.",
      themes: "Amitié, bonté et compréhension",
      amazonSearchUrl: "https://www.amazon.com/s?k=ugo+et+son+amie+awa",
      author: "Goddy Oguzie",
    },
    {
      id: "tarllus-fr",
      title: "Les Épreuves de Tarllus",
      language: "fr",
      href: "/fr/books/les-epreuves-de-tarllus",
      alternateHref: "/books/the-trials-of-tarllus",
      cover: "/images/covers/featured-flat/trials-of-tarllus-fr.webp",
      summary: "Un roman sur les épreuves, les choix moraux et les conséquences qui façonnent le parcours de Tarllus.",
      themes: "Choix moraux, responsabilité et caractère humain",
      amazonSearchUrl: "https://www.amazon.com/s?k=les+epreuves+de+tarllus+goddy+oguzie",
      author: "Goddy Oguzie",
    },
    {
      id: "wayfarer-fr",
      title: "Réflexions d’un Voyageur",
      language: "fr",
      href: "/fr/books/reflexions-dun-voyageur",
      alternateHref: "/books/reflections-of-the-wayfarer",
      cover: "/images/covers/featured-flat/reflexions-voyageur.webp",
      summary: "Des réflexions sur les choix de la vie, les valeurs humaines, le caractère et la quête de sens.",
      themes: "Vie, caractère, choix et réflexion",
      amazonSearchUrl: "https://www.amazon.com/s?k=reflexions+d+un+voyageur+goddy+oguzie",
      author: "Goddy Oguzie",
    },
  ],
};

export function getPublicBook(locale: PublicBookLocale, id: string): PublicBook {
  const book = publicPublishedBooks[locale].find((entry) => entry.id === id);
  if (!book) throw new Error("Unknown public book record: " + id);
  return book;
}
