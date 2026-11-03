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

// Display the recognizable official platform marks with their native brand colours.
// The same accessible SVG assets are shared by the EN/FR homepage and footer.
export default function SocialPlatformIcon({ platform, style, ...props }: Props) {
  const instagram = platform === "instagram";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"
      width="32" height="32" aria-hidden="true" focusable="false"
      style={{
        ...(instagram ? {
          background: "linear-gradient(36deg, #FEDA75 0%, #FA7E1E 23%, #D62976 51%, #962FBF 77%, #4F5BD5 100%)",
          borderRadius: "8px",
        } : {}),
        ...style,
      }}
      {...props}>
      {platform === "facebook" ? (
        <>
          <circle cx="16" cy="16" r="15.5" fill="#1877F2" />
          <path fill="#FFFFFF" d="M18.71 31V18.12h4.03l.61-5.02h-4.64V9.91c0-1.46.41-2.45 2.5-2.45h2.49V2.99a34 34 0 0 0-3.67-.19c-3.7 0-6.22 2.26-6.22 6.43v3.87H9.63v5.02h4.18V31z"/>
        </>
      ) : instagram ? (
        <>
          <rect x="7.4" y="7.4" width="17.2" height="17.2" rx="5.2"
            fill="none" stroke="#FFFFFF" strokeWidth="2.6"/>
          <circle cx="16" cy="16" r="4.1" fill="none"
            stroke="#FFFFFF" strokeWidth="2.6"/>
          <circle cx="21.4" cy="10.7" r="1.65" fill="#FFFFFF"/>
        </>
      ) : (
        <>
          <rect x="1" y="6" width="30" height="20" rx="6" fill="#FF0033"/>
          <path d="m13 11 10 5-10 5z" fill="#FFFFFF"/>
        </>
      )}
    </svg>
  );
}
