import { buildMetadata } from "@/app/seo";
import { SeoPublishedBooksIndex } from "@/components/SeoPublishedBookPages";

export const metadata = buildMetadata({
  title: "Published Books | African Fiction, Reflections and Children's Stories | NextScenes",
  description: "Explore books by Goddy Oguzie: The Story of Didie, the Ugo children's stories, The Trials of Tarllus and Reflections of the Wayfarer.",
  path: "/books",
  languages: { en: "/books", fr: "/fr/books" },
});

export default function PublishedBooksPage() {
  return <SeoPublishedBooksIndex locale="en" />;
}
