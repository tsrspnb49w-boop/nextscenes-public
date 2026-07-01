import type { ReactNode } from "react";
import { buildMetadata } from "@/app/seo";

export const metadata = buildMetadata({
  title: "Contact NextScenes | Auteurs, lecteurs, écoles et partenaires",
  description:
    "Contactez NextScenes au sujet des histoires propres, livres jeunesse, écriture collaborative, écoles, clubs, partenariats, sécurité ou assistance plateforme.",
  path: "/fr/contact",
  locale: "fr",
  languages: {
    en: "/contact",
    fr: "/fr/contact",
  },
});

export default function ContactFrenchLayout({ children }: { children: ReactNode }) {
  return children;
}
