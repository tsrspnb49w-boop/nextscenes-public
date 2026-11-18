import FirstReadsPublicEntry from "@/components/FirstReadsPublicEntry";

export const metadata = {
  title: "First Reads · Completed Manuscript Pathway | NextScenes Staging",
  description: "Learn about the NextScenes First Reads programme for completed manuscripts. A private, author-controlled staging pilot.",
  robots: { index: false, follow: false },
};

export default function FirstReadsPage() {
  return <FirstReadsPublicEntry language="en" />;
}
