"use client";

import Image from "next/image";
import Link from "next/link";
import { FeaturedStory } from "@/app/lib/featuredStories";

type PublicationStatus =
  | "notPublished"
  | "comingSoon"
  | "publishedAmazon"
  | "publishedElsewhere";

type DevelopmentStatus =
  | "inDevelopment"
  | "activeOnNextScenes"
  | "showcaseOnly"
  | "previewOnNextScenes"
  | "completedOnNextScenes";

type FeaturedStoryWithStatus = FeaturedStory & {
  developmentStatus?: DevelopmentStatus | string;
  developmentLabel?: string;
  publicationStatus?: PublicationStatus | string;
  publicationLabel?: string;
  publicationUrl?: string;
  publicationCta?: string;
  progressLabel?: string;
};

function cleanText(value: unknown, fallback = "") {
  const s = typeof value === "string" ? value.trim() : "";
  return s || fallback;
}

function normalize(value: unknown) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, " ");
}

function isPublished(story: FeaturedStoryWithStatus) {
  const publicationStatus = normalize(story.publicationStatus);
  const publicationLabel = normalize(story.publicationLabel);
  const publicationCta = normalize(story.publicationCta);

  const explicitPublished =
    publicationStatus === "publishedamazon" ||
    publicationStatus === "published amazon" ||
    publicationStatus === "publishedelsewhere" ||
    publicationStatus === "published elsewhere" ||
    publicationStatus === "published";

  const labelPublished =
    publicationLabel.includes("published on amazon") ||
    publicationLabel === "published" ||
    publicationCta.includes("view on amazon");

  if (explicitPublished || labelPublished) return true;

  // A publication URL alone is not enough to mark a story as published.
  // The admin status or publication label must say so explicitly, otherwise
  // a story can remain safely marked as in development.
  return false;
}

function getStatusLabel(story: FeaturedStoryWithStatus, fallback: string) {
  if (isPublished(story)) return "Published";

  const raw = cleanText(
    story.progressLabel || story.developmentLabel,
    fallback,
  );
  const lower = raw.toLowerCase();

  if (lower.includes("new") || lower.includes("now reading")) {
    return fallback;
  }

  return raw;
}

export default function FeaturedStoriesShelf({
  stories,
  progressLabel = "In Development",
  storyCtaLabel = "Open story",
  publicationAmazonCtaLabel = "View on Amazon",
}: {
  stories: FeaturedStory[];
  authorLabel?: string;
  progressLabel?: string;
  storyCtaLabel?: string;
  publicationCtaLabel?: string;
  publicationAmazonCtaLabel?: string;
}) {
  const safeStories = Array.isArray(stories)
    ? (stories as FeaturedStoryWithStatus[])
    : [];

  return (
    <div className="ns-featured-grid" aria-label="Featured stories">
      {safeStories.map((story) => {
        const published = isPublished(story);
        const publicationUrl = cleanText(story.publicationUrl);
        const statusLabel = getStatusLabel(story, progressLabel);

        return (
          <article
            key={story.id}
            className={`ns-book-card ${published ? "is-published" : "is-development"}`}
          >
            <Link
              href={story.href}
              className="ns-book-cover-link"
              aria-label={`Open ${story.title} preview on NextScenes`}
            >
              <div className="ns-book-cover-wrap">
                <div className="ns-book-cover">
                  <Image
                    src={story.cover}
                    alt={`${story.title} cover`}
                    width={1200}
                    height={1600}
                    className="ns-book-cover-img"
                    sizes="(max-width: 640px) 72px, (max-width: 1100px) 84px, 72px"
                    priority={story.id === "didie"}
                    unoptimized
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              </div>
            </Link>

            <div className="ns-book-meta">
              <Link href={story.href} className="ns-book-title-link">
                <div className="ns-book-title">{story.title}</div>
              </Link>

              <div className="ns-book-hook">{story.hook}</div>

              <div
                className="ns-book-status-row"
                aria-label={`${story.title} status and action`}
              >
                <span
                  className={`ns-book-status-pill ${published ? "is-published" : "is-development"}`}
                >
                  {statusLabel}
                </span>

                {published ? (
                  publicationUrl ? (
                    <Link
                      href={publicationUrl}
                      className="ns-book-action-link ns-book-action-link-publication"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {publicationAmazonCtaLabel} →
                    </Link>
                  ) : null
                ) : (
                  <Link href={story.href} className="ns-book-action-link">
                    {storyCtaLabel} →
                  </Link>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
