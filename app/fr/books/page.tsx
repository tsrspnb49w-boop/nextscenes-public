import { buildMetadata } from "@/app/seo";
import { SeoPublishedBooksIndex } from "@/components/SeoPublishedBookPages";

export const metadata = buildMetadata({
  title: "Livres publiés | Romans, réflexions et livres jeunesse | NextScenes",
  description: "Découvrez les livres de Goddy Oguzie : The Story of Didie, les histoires d’Ugo, Les Épreuves de Tarllus et Réflexions d’un Voyageur.",
  path: "/fr/books",
  locale: "fr",
  languages: { en: "/books", fr: "/fr/books" },
});

export default function PublishedBooksFrenchPage() {
  return <SeoPublishedBooksIndex locale="fr" />;
}
