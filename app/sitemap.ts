import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/seo";

const routes = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/fr", priority: 1.0, changeFrequency: "weekly" },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" },
  { path: "/fr/about", priority: 0.9, changeFrequency: "monthly" },
  { path: "/how-it-works", priority: 0.9, changeFrequency: "monthly" },
  { path: "/fr/how-it-works", priority: 0.9, changeFrequency: "monthly" },
  { path: "/writers", priority: 0.85, changeFrequency: "monthly" },
  { path: "/fr/auteurs", priority: 0.85, changeFrequency: "monthly" },
  { path: "/clubs", priority: 0.8, changeFrequency: "monthly" },
  { path: "/fr/clubs", priority: 0.8, changeFrequency: "monthly" },
  { path: "/safety", priority: 0.85, changeFrequency: "monthly" },
  { path: "/fr/safety", priority: 0.85, changeFrequency: "monthly" },
  { path: "/partners", priority: 0.75, changeFrequency: "monthly" },
  { path: "/fr/partners", priority: 0.75, changeFrequency: "monthly" },
  { path: "/mystery250", priority: 0.8, changeFrequency: "weekly" },
  { path: "/fr/mystery250", priority: 0.8, changeFrequency: "weekly" },
  { path: "/ai-principles", priority: 0.65, changeFrequency: "monthly" },
  { path: "/fr/principes-ia", priority: 0.65, changeFrequency: "monthly" },
  { path: "/founding-writers-pilot", priority: 0.65, changeFrequency: "monthly" },
  { path: "/fr/pilote-auteurs-fondateurs", priority: 0.65, changeFrequency: "monthly" },
  { path: "/publication-benefit-sharing", priority: 0.55, changeFrequency: "yearly" },
  { path: "/fr/publication-partage-benefices", priority: 0.55, changeFrequency: "yearly" },
  { path: "/writer-rights", priority: 0.55, changeFrequency: "yearly" },
  { path: "/fr/droits-des-auteurs", priority: 0.55, changeFrequency: "yearly" },
  { path: "/contributor-policy", priority: 0.55, changeFrequency: "yearly" },
  { path: "/fr/politique-contributeurs", priority: 0.55, changeFrequency: "yearly" },
  { path: "/illustration-upload-policy", priority: 0.55, changeFrequency: "yearly" },
  { path: "/fr/politique-illustrations-televersements", priority: 0.55, changeFrequency: "yearly" },
  { path: "/plain-language-terms", priority: 0.55, changeFrequency: "yearly" },
  { path: "/fr/conditions-simples", priority: 0.55, changeFrequency: "yearly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/fr/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.55, changeFrequency: "monthly" },
  { path: "/fr/contact", priority: 0.55, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.35, changeFrequency: "yearly" },
  { path: "/fr/privacy", priority: 0.35, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.35, changeFrequency: "yearly" },
  { path: "/fr/terms", priority: 0.35, changeFrequency: "yearly" },
  { path: "/data-deletion", priority: 0.3, changeFrequency: "yearly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
