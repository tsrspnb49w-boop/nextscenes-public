import FirstReadsBookCollection from "@/components/FirstReadsBookCollection";
import { buildMetadata } from "@/app/seo";

export const metadata = buildMetadata({
  title: "Collection First Reads | NextScenes",
  description: "Une collection distincte pour les prochaines lectures approuvées de manuscrits achevés.",
  path: "/fr/first-reads/books",
  locale: "fr",
  languages: { en: "/first-reads/books", fr: "/fr/first-reads/books" },
  noIndex: true, // Collection de présentation sans livre encore approuvé.
});

export default function LivresFirstReads() {
  return <FirstReadsBookCollection language="fr" />;
}
