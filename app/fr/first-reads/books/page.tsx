import FirstReadsBookCollection from "@/components/FirstReadsBookCollection";
import { buildMetadata } from "@/app/seo";

export const metadata = buildMetadata({
  title: "Collection First Reads | NextScenes",
  description: "Une collection de lectures First Reads autorisées, avec Queen Amina de Kola King. Premier chapitre disponible en anglais.",
  path: "/fr/first-reads/books",
  locale: "fr",
  languages: { en: "/first-reads/books", fr: "/fr/first-reads/books" },
});

export default function LivresFirstReads() {
  return <FirstReadsBookCollection language="fr" />;
}
