import type { ReactNode } from "react";
import { buildMetadata } from "@/app/seo";

export const metadata = buildMetadata({
  title: "Contact NextScenes | Writers, Readers, Schools and Partners",
  description:
    "Contact NextScenes about clean stories, children’s books, collaborative writing, schools, clubs, partnerships, safety, or platform support.",
  path: "/contact",
  languages: {
    en: "/contact",
    fr: "/fr/contact",
  },
});

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
