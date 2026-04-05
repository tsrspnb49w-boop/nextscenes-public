"use client";

import Image from "next/image";
import Link from "next/link";
import { FeaturedStory } from "@/app/lib/featuredStories";

export default function FeaturedStoriesShelf({
  stories,
  authorLabel = "By",
}: {
  stories: FeaturedStory[];
  authorLabel?: string;
}) {
  return (
    <div className="ns-featured-grid" aria-label="Featured stories">
      {stories.map((story) => (
        <Link key={story.id} href={story.href} className="ns-book-card">
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

            {story.badge ? (
              <div className={`ns-book-badge is-${story.badgeTone}`}>
                {story.badge}
              </div>
            ) : null}
          </div>

          <div className="ns-book-meta">
            <div className="ns-book-title">{story.title}</div>
            <div className="ns-book-author">
              {authorLabel} {story.author}
            </div>
            <div className="ns-book-hook">{story.hook}</div>
            <div className="ns-book-cta">{story.cta} →</div>
          </div>
        </Link>
      ))}
    </div>
  );
}