"use client";
import { useEffect, useState, type ReactNode } from "react";
import {
  resolvePublicStoryHref, type PublicStoryKey, type PublicStoryOption,
  type PublicDevelopment,
} from "@/app/lib/publicStoryDestinations";

function currentAppBase(appUrl: string) {
  if (typeof window === "undefined") return appUrl;
  const host = window.location.hostname.toLowerCase();
  if (host === "public-staging.nextscenes.org") return "https://staging.nextscenes.org";
  if (host === "nextscenes-public-staging.onrender.com")
    return "https://nextscenes-staging-frontend.onrender.com";
  return appUrl;
}

export default function ResolvedPublicStoryLink({
  storyKey, language, appUrl, className, ariaLabel, children,
}: {
  storyKey: PublicStoryKey; language: "en" | "fr"; appUrl: string;
  className?: string; ariaLabel?: string; children: ReactNode;
}) {
  const [destination, setDestination] = useState(
    resolvePublicStoryHref(storyKey, language, appUrl)
  );
  useEffect(() => {
    let active = true;
    const base = currentAppBase(appUrl);
    setDestination(resolvePublicStoryHref(storyKey, language, base));
    const load = async () => {
      try {
        const response = await fetch("/api/public-community", { cache: "no-store" });
        const data = await response.json();
        if (active && response.ok && data?.ok === true) {
          setDestination(resolvePublicStoryHref(
            storyKey, language, base,
            Array.isArray(data.storylines) ? data.storylines as PublicStoryOption[] : [],
            Array.isArray(data.development) ? data.development as PublicDevelopment[] : []
          ));
        }
      } catch {
        // Keep the specific-title Storylines fallback, never a wrong edition.
      }
    };
    void load();
    return () => { active = false; };
  }, [storyKey, language, appUrl]);
  return <a href={destination} className={className} aria-label={ariaLabel}>{children}</a>;
}
