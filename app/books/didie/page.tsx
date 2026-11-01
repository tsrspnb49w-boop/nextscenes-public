import DidieBookPage from "@/components/DidieBookPage";
import { absoluteUrl, buildMetadata } from "@/app/seo";

export const metadata = buildMetadata({
  title: "The Story of Didie by Goddy Oguzie | Historical Novel | NextScenes",
  description: "Discover The Story of Didie, Goddy Oguzie's historical novel of love, tradition, injustice and destiny across generations. English edition on Amazon.",
  path: "/books/didie",
  image: "/images/books/didie/approved-front.webp",
  languages: { en: "/books/didie", fr: "/fr/books/didie" },
});

// Schema.org identification only. Google's book purchase actions require
// separate provider onboarding and are not implied by this metadata.
const didieBookData = {
  "@context": "https://schema.org",
  "@type": "Book",
  "@id": absoluteUrl("/books/didie#book"),
  name: "The Story of Didie",
  url: absoluteUrl("/books/didie"),
  author: {
    "@type": "Person",
    name: "Goddy Oguzie",
  },
  image: absoluteUrl("/images/books/didie/approved-front.webp"),
  description:
    "A historical novel set in early twentieth-century Nigeria, exploring love, tradition, injustice, memory and destiny across generations.",
  genre: "Historical fiction",
  inLanguage: "en",
};

export default function DidieEnglishPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(didieBookData).replace(/</g, "\\u003c"),
        }}
      />
      <DidieBookPage language="en" />
    </>
  );
}
