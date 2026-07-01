import type { ReactNode } from "react";
import { buildMetadata } from "@/app/seo";

export const metadata = buildMetadata({
  title: "How NextScenes Works | Collaborative Writing with Clear Canon",
  description:
    "See how NextScenes supports clean collaborative writing with story owners, readers, contributors, Canon scenes, moderation, and clear story decisions.",
  path: "/how-it-works",
  languages: {
    en: "/how-it-works",
    fr: "/fr/how-it-works",
  },
});

export default function HowItWorksLayout({ children }: { children: ReactNode }) {
  return children;
}
