import FirstReadsExploreCollection from "@/components/FirstReadsExploreCollection";
import { buildMetadata } from "@/app/seo";

export const metadata = buildMetadata({
  title: "Explore First Reads | NextScenes",
  description: "Discover First Reads: forthcoming author-approved selections from completed books, with authors retaining their rights.",
  path: "/first-reads/explore",
  languages: { en: "/first-reads/explore", fr: "/fr/first-reads/explore" },
});

export default function ExploreFirstReadsPage() {
  return <FirstReadsExploreCollection language="en" />;
}
