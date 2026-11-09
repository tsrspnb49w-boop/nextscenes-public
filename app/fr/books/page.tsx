import { buildMetadata } from "@/app/seo";
import { SeoPublishedBooksIndex } from "@/components/SeoPublishedBookPages";

export const metadata = buildMetadata({
  title: "Livres publiés | Romans, réflexions et livres jeunesse | NextScenes",
  description: "Découvrez les livres de Goddy Oguzie et Kola King, notamment A Place in the Sun, The Story of Didie, des histoires jeunesse et des romans.",
  path: "/fr/books",
  locale: "fr",
  languages: { en: "/books", fr: "/fr/books" },
});

export default function PublishedBooksFrenchPage() {
  return <SeoPublishedBooksIndex locale="fr" />;
}
