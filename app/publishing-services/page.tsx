import PublishingServicesV1 from "@/components/PublishingServicesV1";
import { buildMetadata } from "@/app/seo";
export const metadata=buildMetadata({title:"Publishing Services | NextScenes",description:"Editorial preparation, book design and publication assistance for completed manuscripts.",path:"/publishing-services",locale:"en",languages:{en:"/publishing-services",fr:"/fr/services-edition"}});
export default function Page(){return <PublishingServicesV1 lang="en"/>;}
