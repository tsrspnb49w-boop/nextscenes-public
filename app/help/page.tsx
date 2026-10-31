import HelpOnDemand from "@/components/HelpOnDemand";
import { buildMetadata } from "@/app/seo";
export const metadata = buildMetadata({
  title: "Help | NextScenes", description: "NextScenes help for accounts, writing, collaboration, and community discussions.",
  path: "/help", languages: {en: "/help", fr: "/fr/help"},
});
export default function HelpPage(){return <HelpOnDemand language="en"/>;}
