import PublishingServicesV1 from "@/components/PublishingServicesV1";
import { buildMetadata } from "@/app/seo";
export const metadata=buildMetadata({title:"Services d’édition | NextScenes",description:"Préparation éditoriale, conception du livre et accompagnement à la publication de manuscrits achevés.",path:"/fr/services-edition",locale:"fr",languages:{en:"/publishing-services",fr:"/fr/services-edition"}});
export default function Page(){return <PublishingServicesV1 lang="fr"/>;}
