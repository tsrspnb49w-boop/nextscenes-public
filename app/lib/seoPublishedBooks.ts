// Curated facts for public SEO pages. Do not infer ISBNs, prices, editions or reviews.
// This catalogue is intentionally limited to book titles with confirmed publication and cover assets.
export type PublicBookLocale = "en" | "fr";
export type PublicBook = {
  id: string;
  title: string;
  language: PublicBookLocale;
  bookLanguage?: PublicBookLocale;
  format?: string;
  pages?: number;
  isbn?: string;
  overview?: string[];
  authorBio?: string;
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
      id: "a-place-in-the-sun-en",
      title: "A Place in the Sun",
      language: "en",
      bookLanguage: "en",
      format: "Paperback · 6 × 9 in",
      pages: 288,
      isbn: "9798140593759",
      href: "/books/a-place-in-the-sun",
      alternateHref: "/fr/books/a-place-in-the-sun",
      cover: "/images/covers/featured-flat/a-place-in-the-sun.webp",
      summary: "In colonial-era Tekota, a fictional West African setting, Zakka and Matta's love is tested by marriage obligations, an unpaid bride price and the claims of Matta's estranged husband.",
      themes: "Love, tradition, friendship, loyalty and personal freedom",
      amazonSearchUrl: "https://www.amazon.com/dp/B0HQY8VBGM",
      author: "Kola King",
      authorBio: "Kola King is a writer and storyteller whose work explores African history, culture and the far-reaching impact of colonialism on the lives of ordinary people.",
      overview: [
        "Set in Tekota, in the fictional country of Songhaland, A Place in the Sun follows a love story shaped by the tensions between personal choice and customary obligation in colonial Africa.",
        "Zakka falls deeply in love with Matta, but their hopes for a future together encounter an unresolved marriage. Matta's family has yet to return the bride price to her estranged husband, Gora. Under the tradition that governs their community, she is still considered Gora's wife.",
        "As Gora seeks to reclaim Matta, the three are drawn into a difficult struggle over love, loyalty and the weight of tradition. A story of friendship, love and tragedy asks what it takes for people to find a place of their own."
      ],
    },
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
      id: "a-place-in-the-sun-fr",
      title: "A Place in the Sun",
      language: "fr",
      bookLanguage: "en",
      format: "Broché · 6 × 9 pouces",
      pages: 288,
      isbn: "9798140593759",
      href: "/fr/books/a-place-in-the-sun",
      alternateHref: "/books/a-place-in-the-sun",
      cover: "/images/covers/featured-flat/a-place-in-the-sun.webp",
      summary: "Dans la ville fictive de Tekota, en Afrique de l’Ouest à l’époque coloniale, l’amour de Zakka et Matta se heurte aux obligations du mariage, à la restitution du prix de la fiancée et aux revendications d’un époux dont Matta est séparée.",
      themes: "Amour, traditions, amitié, fidélité et liberté de choisir",
      amazonSearchUrl: "https://www.amazon.com/dp/B0HQY8VBGM",
      author: "Kola King",
      authorBio: "Kola King est un écrivain et conteur qui s’intéresse à l’histoire, aux cultures africaines et aux conséquences de la colonisation sur la vie des populations.",
      overview: [
        "Situé à Tekota, dans le pays imaginaire de Songhaland, A Place in the Sun raconte un amour mis à l’épreuve par les règles sociales et les obligations coutumières dans l’Afrique coloniale.",
        "Zakka aime profondément Matta, mais le chemin vers une vie commune reste entravé par un mariage non résolu. La famille de Matta n’a pas encore restitué le prix de la fiancée à Gora, son époux dont elle est séparée. Aux yeux de la tradition, elle demeure son épouse.",
        "Lorsque Gora cherche à la reconquérir, les personnages se retrouvent confrontés à des choix difficiles entre amour, loyauté et coutume. Ce roman explore aussi l’amitié, la tragédie et la recherche d’une place à soi."
      ],
    },
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
