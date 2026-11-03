import type { SVGProps } from "react";

// One canonical destination list for public homepage cards and the site footer.
// These reuse the URLs already present in NextScenes; validate account ownership before release.
export const SOCIAL_CHANNELS = [
  {
    id: "facebook",
    name: "Facebook",
    url: "https://www.facebook.com/nextscenes",
    en: "Public discussions",
    fr: "Discussions publiques",
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://www.instagram.com/nextscenes/",
    en: "Posts and comments",
    fr: "Publications et commentaires",
  },
  {
    id: "youtube",
    name: "YouTube",
    url: "https://www.youtube.com/@NextScenesOfficial",
    en: "Videos and comments",
    fr: "Vidéos et commentaires",
  },
] as const;

export type SocialPlatform = (typeof SOCIAL_CHANNELS)[number]["id"];
type Props = Omit<SVGProps<SVGSVGElement>, "children"> & {
  platform: SocialPlatform;
};

export default function SocialPlatformIcon({ platform, ...props }: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      width="20" height="20" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" focusable="false" {...props}>
      {platform === "facebook" ? (
        <path fill="currentColor" stroke="none"
          d="M14.1 21v-7.7h2.6l.4-3h-3V8.4c0-.87.24-1.46 1.5-1.46h1.6V4.25C16.9 4.1 15.94 4 14.83 4c-2.33 0-3.93 1.42-3.93 4.02v2.28H8.3v3h2.6V21h3.2Z"/>
      ) : platform === "instagram" ? (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4.1" />
          <circle cx="17.6" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </>
      ) : (
        <>
          <rect x="2" y="5.1" width="20" height="13.8" rx="4.4" />
          <path d="m10 9 5.4 3-5.4 3V9Z" fill="currentColor" stroke="none" />
        </>
      )}
    </svg>
  );
}
