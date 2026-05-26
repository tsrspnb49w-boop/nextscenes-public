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

function isPublished(story: FeaturedStoryWithStatus) {
  return (
    story.publicationStatus === "publishedAmazon" ||
    story.publicationStatus === "publishedElsewhere"
  );
}

function getProgressLabel(story: FeaturedStoryWithStatus, fallback: string) {
  if (isPublished(story)) {
    return cleanText(story.publicationLabel || story.progressLabel, fallback);
  }

  return cleanText(story.progressLabel || story.developmentLabel, fallback);
}

function getBadgeTone(story: FeaturedStoryWithStatus) {
  if (isPublished(story)) return "published-amazon";
  return cleanText(story.badgeTone, "featured");
}

export default function FeaturedStoriesShelf({
  stories,
  authorLabel = "By",
  progressLabel = "In Progress",
}: {
  stories: FeaturedStory[];
  authorLabel?: string;
  progressLabel?: string;
}) {
  const safeStories = Array.isArray(stories) ? (stories as FeaturedStoryWithStatus[]) : [];

  return (
    <div className="ns-featured-grid" aria-label="Featured stories">
      {safeStories.map((story) => {
        const cardProgressLabel = getProgressLabel(story, progressLabel);
        const publicationUrl = cleanText(story.publicationUrl);
        const publicationCta = cleanText(story.publicationCta, story.publicationLabel || "View publication");
        const badgeLabel = isPublished(story)
          ? cleanText(story.publicationLabel, story.badge || "Published")
          : cleanText(story.badge);
        const badgeTone = getBadgeTone(story);

        return (
          <article key={story.id} className="ns-book-card">
            <Link href={story.href} className="ns-book-cover-link" aria-label={`Open ${story.title} preview on NextScenes`}>
              <div className="ns-book-cover-wrap">
                <div className="ns-book-cover">
                  <Image
                    src={story.cover}
                    alt={`${story.title} cover`}
                    width={1200}
                    height={1600}
                    className="ns-book-cover-img"
                    sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw"
                    priority={story.id === "didie"}
                    unoptimized
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </div>

                {badgeLabel ? (
                  <div className={`ns-book-badge is-${badgeTone}`} data-badge-tone={badgeTone}>
                    {badgeLabel}
                  </div>
                ) : null}

                <div className="ns-book-progress-badge">{cardProgressLabel}</div>
              </div>
            </Link>

            <div className="ns-book-meta">
              <Link href={story.href} className="ns-book-title-link">
                <div className="ns-book-title">{story.title}</div>
              </Link>

              <div className="ns-book-author">
                {authorLabel} {story.author}
              </div>
              <div className="ns-book-hook">{story.hook}</div>

              <div className="ns-book-actions" aria-label={`${story.title} actions`}>
                <Link href={story.href} className="ns-book-cta">
                  {story.cta} →
                </Link>

                {publicationUrl ? (
                  <Link href={publicationUrl} className="ns-book-cta ns-book-cta-publication" target="_blank" rel="noopener noreferrer">
                    {publicationCta} →
                  </Link>
                ) : null}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
