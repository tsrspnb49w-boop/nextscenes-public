import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/app/seo";
import { publicPublishedBooks } from "@/app/lib/seoPublishedBooks";
import { SeoPublishedBookProfile } from "@/components/SeoPublishedBookPages";

type Props = { params: Promise<{ slug: string }> };

function findBook(slug: string) {
  return publicPublishedBooks.en.find((item) => item.href === "/books/" + slug);
}

export function generateStaticParams() {
  return publicPublishedBooks.en.map((book) => ({ slug: book.href.split("/").pop()! }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = findBook(slug);
  if (!book) return { title: "Book not found | NextScenes", robots: { index: false } };
  return buildMetadata({
    title: book.title + " by Goddy Oguzie | Published Book | NextScenes",
    description: book.summary + " Discover the English edition by Goddy Oguzie.",
    path: book.href,
    image: book.cover,
    languages: { en: book.href, fr: book.alternateHref },
  });
}

export default async function PublishedBookDetailPage({ params }: Props) {
  const { slug } = await params;
  const book = findBook(slug);
  if (!book) notFound();
  return <SeoPublishedBookProfile book={book} />;
}
