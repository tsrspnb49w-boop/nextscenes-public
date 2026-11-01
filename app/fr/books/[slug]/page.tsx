import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/app/seo";
import { publicPublishedBooks } from "@/app/lib/seoPublishedBooks";
import { SeoPublishedBookProfile } from "@/components/SeoPublishedBookPages";

type Props = { params: Promise<{ slug: string }> };

function findBook(slug: string) {
  return publicPublishedBooks.fr.find((item) => item.href === "/fr/books/" + slug);
}

export function generateStaticParams() {
  return publicPublishedBooks.fr.map((book) => ({ slug: book.href.split("/").pop()! }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = findBook(slug);
  if (!book) return { title: "Livre introuvable | NextScenes", robots: { index: false } };
  return buildMetadata({
    title: book.title + " de Goddy Oguzie | Livre publié | NextScenes",
    description: book.summary + " Découvrez l'édition française de Goddy Oguzie.",
    path: book.href,
    image: book.cover,
    locale: "fr",
    languages: { en: book.alternateHref, fr: book.href },
  });
}

export default async function PublishedBookDetailFrenchPage({ params }: Props) {
  const { slug } = await params;
  const book = findBook(slug);
  if (!book) notFound();
  return <SeoPublishedBookProfile book={book} />;
}
