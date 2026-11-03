"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Editorial images come from the existing Content Steward fields. Avoid broken
// image icons when an old asset path or a third-party host is unavailable.
export default function EditorialSpotlightImage({
  src,
  alt,
  className,
  cover = false,
}: {
  src?: string;
  alt: string;
  className?: string;
  cover?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  if (!src || failed) return null;
  return (
    <Image
      src={src}
      alt={alt}
      width={cover ? 72 : 76}
      height={cover ? 106 : 96}
      sizes="(max-width: 600px) 72px, 76px"
      unoptimized
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
