import FirstReadsExploreCollection from "@/components/FirstReadsExploreCollection";
import { buildMetadata } from "@/app/seo";

export const metadata = buildMetadata({
  title: "Explore First Reads | NextScenes",
  description: "Discover First Reads: author-approved opening chapters and serials from completed books, with a step-by-step guide for writers.",
  path: "/first-reads/explore",
  languages: { en: "/first-reads/explore", fr: "/fr/first-reads/explore" },
});

export default function ExploreFirstReadsPage() {
  return <FirstReadsExploreCollection language="en" />;
}
