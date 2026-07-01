import type { ReactNode } from "react";
import { buildMetadata } from "@/app/seo";

export const metadata = buildMetadata({
  title: "Comment fonctionne NextScenes | Écriture collaborative avec Canon clair",
  description:
    "Découvrez comment NextScenes soutient l’écriture collaborative propre avec auteurs principaux, lecteurs, contributeurs, scènes Canon, modération et décisions claires.",
  path: "/fr/how-it-works",
  locale: "fr",
  languages: {
    en: "/how-it-works",
    fr: "/fr/how-it-works",
  },
});

export default function HowItWorksFrenchLayout({ children }: { children: ReactNode }) {
  return children;
}
