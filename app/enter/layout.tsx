import type { ReactNode } from "react";
import { buildMetadata } from "@/app/seo";

export const metadata = buildMetadata({
  title: "Enter NextScenes | Writing and Reading App",
  description: "Continue to the NextScenes writing and reading app.",
  path: "/enter",
  noIndex: true,
});

export default function EnterLayout({ children }: { children: ReactNode }) {
  return children;
}
