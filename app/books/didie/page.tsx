import DidieBookPage from "@/components/DidieBookPage";
import { buildMetadata } from "@/app/seo";

export const metadata = buildMetadata({
  title: "The Story of Didie by Goddy Oguzie | Historical Novel | NextScenes",
  description: "Discover The Story of Didie, Goddy Oguzie's historical novel of love, tradition, injustice and destiny across generations. English edition on Amazon.",
  path: "/books/didie",
  image: "/images/books/didie/approved-front.webp",
  languages: { en: "/books/didie", fr: "/fr/books/didie" },
});

export default function DidieEnglishPage() {
  return <DidieBookPage language="en" />;
}
