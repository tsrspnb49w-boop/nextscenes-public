import HelpOnDemand from "@/components/HelpOnDemand";
import { buildMetadata } from "@/app/seo";
export const metadata = buildMetadata({
  title: "Aide | NextScenes", description: "Aide NextScenes : comptes, écriture, collaboration et discussions.",
  path: "/fr/help", locale: "fr", languages: {en: "/help", fr: "/fr/help"},
});
export default function HelpPageFr(){return <HelpOnDemand language="fr"/>;}
