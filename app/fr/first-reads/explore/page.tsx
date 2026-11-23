import FirstReadsExploreCollection from "@/components/FirstReadsExploreCollection";
import { buildMetadata } from "@/app/seo";

export const metadata = buildMetadata({
  title: "Explorer First Reads | NextScenes",
  description: "Découvrez First Reads : des premiers chapitres et feuilletons autorisés de livres achevés, avec un guide pas à pas pour les auteurs.",
  path: "/fr/first-reads/explore",
  locale: "fr",
  languages: { en: "/first-reads/explore", fr: "/fr/first-reads/explore" },
});

export default function ExplorerFirstReadsPage() {
  return <FirstReadsExploreCollection language="fr" />;
}
