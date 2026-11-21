import FirstReadsBookCollection from "@/components/FirstReadsBookCollection";
import { buildMetadata } from "@/app/seo";

export const metadata = buildMetadata({
  title: "First Reads Collection | NextScenes",
  description: "A separate collection for forthcoming author-approved readings from completed manuscripts.",
  path: "/first-reads/books",
  languages: { en: "/first-reads/books", fr: "/fr/first-reads/books" },
  noIndex: true, // Placeholder collection: enable indexing after approved books are present.
});

export default function FirstReadsBooks() {
  return <FirstReadsBookCollection language="en" />;
}
