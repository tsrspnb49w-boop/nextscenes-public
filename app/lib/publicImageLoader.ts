"use client";
import manifest from "./publicImageManifest.json";
import type { ImageLoaderProps } from "next/image";

const sources = new Set(manifest.sources);
// Only committed local assets have generated variants. Remote images and
// other original assets are served directly; never proxy or decode them
// in the live Next.js process.
export default function publicImageLoader({src,width}: ImageLoaderProps): string {
  if (!sources.has(src)) return src;
  const size = manifest.widths.find(w => w >= width) ?? manifest.widths[manifest.widths.length-1];
  const encoded = src.split("/").map(encodeURIComponent).join("/");
  return "/_media/" + size + encoded + ".webp";
}
