import FirstReadsBookCollection from "@/components/FirstReadsBookCollection";
import { buildMetadata } from "@/app/seo";

export const metadata = buildMetadata({
  title: "First Reads Collection | NextScenes",
  description: "Explore approved First Reads selections, starting with Queen Amina: Soldier on Horseback by Kola King. Chapter One available.",
  path: "/first-reads/books",
  languages: { en: "/first-reads/books", fr: "/fr/first-reads/books" },
});

export default function FirstReadsBooks() {
  return <FirstReadsBookCollection language="en" />;
}
