import type { ReactNode } from "react";
import { buildMetadata } from "@/app/seo";

export const metadata = buildMetadata({
  title: "Entrer dans NextScenes | Application de lecture et d’écriture",
  description: "Continuer vers l’application NextScenes de lecture et d’écriture.",
  path: "/fr/enter",
  locale: "fr",
  noIndex: true,
});

export default function EnterFrenchLayout({ children }: { children: ReactNode }) {
  return children;
}
