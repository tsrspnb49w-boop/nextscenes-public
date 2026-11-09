import { buildMetadata } from "@/app/seo";
import { SeoPublishedBooksIndex } from "@/components/SeoPublishedBookPages";

export const metadata = buildMetadata({
  title: "Published Books | African Fiction, Reflections and Children's Stories | NextScenes",
  description: "Explore published works by Goddy Oguzie and Kola King, including A Place in the Sun, The Story of Didie, children's stories and thoughtful fiction.",
  path: "/books",
  languages: { en: "/books", fr: "/fr/books" },
});

export default function PublishedBooksPage() {
  return <SeoPublishedBooksIndex locale="en" />;
}
