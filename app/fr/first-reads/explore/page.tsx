import FirstReadsExploreCollection from "@/components/FirstReadsExploreCollection";
import { buildMetadata } from "@/app/seo";

export const metadata = buildMetadata({
  title: "Explorer First Reads | NextScenes",
  description: "Découvrez First Reads : des extraits de livres achevés, partagés avec l'accord de leurs auteurs, à paraître sur NextScenes.",
  path: "/fr/first-reads/explore",
  locale: "fr",
  languages: { en: "/first-reads/explore", fr: "/fr/first-reads/explore" },
});

export default function ExplorerFirstReadsPage() {
  return <FirstReadsExploreCollection language="fr" />;
}
