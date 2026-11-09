#!/usr/bin/env python3
"""Find the original high-resolution cover for the author-authorized paperback.

Staging-only maintenance helper: rejects unrelated titles and undersized images.
"""
from __future__ import annotations
import html
import io
import re
import sys
import urllib.error
import urllib.request
from PIL import Image, ImageChops, ImageStat

ASIN = "B0HQY8VBGM"
TARGET = "public/images/covers/featured-flat/a-place-in-the-sun.webp"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
}
PAGES = [
    f"https://www.amazon.com/dp/{ASIN}",
    f"https://www.amazon.com/gp/aw/d/{ASIN}",
    f"https://www.amazon.co.uk/dp/{ASIN}",
]
IMAGE_CANDIDATES = [
    f"https://images-na.ssl-images-amazon.com/images/P/{ASIN}.01.L.jpg",
    f"https://m.media-amazon.com/images/P/{ASIN}.01._SCLZZZZZZZ_.jpg",
    f"https://images-na.ssl-images-amazon.com/images/P/{ASIN}.01._SCLZZZZZZZ_.jpg",
]

def get(url):
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers=HEADERS), timeout=6) as r:
            content = r.read(6_000_000)
            print("FETCH", r.status, len(content), r.headers.get("Content-Type"), url[:140])
            return content
    except Exception as exc:
        print("UNAVAILABLE", type(exc).__name__, str(exc)[:140], url[:140])
        return b""

for page in PAGES:
    raw = get(page)
    if not raw:
        continue
    doc = html.unescape(raw.decode("utf-8", "ignore")).replace("\\/", "/")
    discovered = re.findall(r"https?://(?:m\\.media-amazon\\.com|images-na\\.ssl-images-amazon\\.com)/images/[IWP]/[A-Za-z0-9_.%+-]+", doc)
    for url in discovered[:50]:
        url = url.split("?")[0].rstrip(",")
        if url not in IMAGE_CANDIDATES:
            IMAGE_CANDIDATES.append(url)
        # Prefer the full-resolution asset without Amazon's size suffix.
        hi = re.sub(r'\._[^/.]+_\.(jpg|jpeg|png|webp)$', r'.\1', url, flags=re.I)
        if hi != url and hi not in IMAGE_CANDIDATES:
            IMAGE_CANDIDATES.append(hi)
    print("HTML_IMAGES", len(discovered))

old = Image.open(TARGET).convert("RGB").resize((96, 144), Image.Resampling.LANCZOS)
matches = []
for url in IMAGE_CANDIDATES[:20]:
    raw = get(url)
    if len(raw) < 12_000:
        continue
    try:
        im = Image.open(io.BytesIO(raw))
        im.load()
        im = im.convert("RGB")
        if im.width < 400 or im.height < 550:
            continue
        score = sum(ImageStat.Stat(ImageChops.difference(im.resize((96,144), Image.Resampling.LANCZOS), old)).mean)/3
        print("IMAGE", im.size, "comparison", round(score, 2), url[:125])
        if score < 43:
            matches.append((score, im, url))
    except Exception as exc:
        print("NOT_IMAGE", type(exc).__name__)

if not matches:
    print("NO VERIFIED HIGH-RES COVER FOUND; retaining old asset until supplied original can be uploaded.")
    sys.exit(1)

score, cover, url = min(matches, key=lambda x: x[0])
cover.save(TARGET, format="WEBP", quality=87, method=6)
print("COVER_REPLACED", cover.size, "source", url, "comparison", score)
