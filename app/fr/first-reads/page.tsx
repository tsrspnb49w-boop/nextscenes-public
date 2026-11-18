import FirstReadsPublicEntry from "@/components/FirstReadsPublicEntry";

export const metadata = {
  title: "Premières lectures · Manuscrits achevés | NextScenes Staging",
  description: "Découvrez First Reads, le parcours de NextScenes pour les auteurs de manuscrits achevés. Programme pilote en staging.",
  robots: { index: false, follow: false },
};

export default function FirstReadsPageFR() {
  return <FirstReadsPublicEntry language="fr" />;
}
