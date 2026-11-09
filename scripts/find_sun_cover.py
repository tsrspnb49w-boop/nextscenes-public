#!/usr/bin/env python3
"""Fetch only a verified, higher-resolution cover for Kola King's paperback."""
from __future__ import annotations

import html
import io
import re
import sys
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
]
IMAGE_CANDIDATES = [
    f"https://images-na.ssl-images-amazon.com/images/P/{ASIN}.01._SL1500_.jpg",
    f"https://images-na.ssl-images-amazon.com/images/P/{ASIN}.01._SY1200_.jpg",
    f"https://m.media-amazon.com/images/P/{ASIN}.01._SY1200_.jpg",
    f"https://images-na.ssl-images-amazon.com/images/P/{ASIN}.01.L.jpg",
]

def fetch(url):
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers=HEADERS), timeout=7) as response:
            data = response.read(6_000_000)
            print("FETCH", response.status, len(data), response.headers.get("Content-Type"), url[:120])
            return data
    except Exception as exc:
        print("UNAVAILABLE", type(exc).__name__, str(exc)[:100], url[:120])
        return b""

def add(url, first=False):
    if not url.startswith("https://") or "amazon" not in url:
        return
    if url not in IMAGE_CANDIDATES:
        if first:
            IMAGE_CANDIDATES.insert(0, url)
        else:
            IMAGE_CANDIDATES.append(url)

url_pattern = re.compile(
    r"https?://(?:m\.media-amazon\.com|images-na\.ssl-images-amazon\.com)/images/[IWP]/[A-Za-z0-9_.%+-]+"
)
for page in PAGES:
    raw = fetch(page)
    if not raw:
        continue
    doc = html.unescape(raw.decode("utf-8", "ignore")).replace("\\/", "/")
    position = doc.find('id="landingImage"')
    if position >= 0:
        snippet = doc[max(0, position - 1000):position + 6500]
        hero_urls = url_pattern.findall(snippet)
        print("LANDING_IMAGE_URLS", hero_urls[:8])
        for url in reversed(hero_urls[:8]):
            base = re.sub(r"\._[^/.]+_\.(jpg|jpeg|png|webp)$", r".\1", url, flags=re.I)
            add(url, first=True)
            add(base, first=True)
    urls = url_pattern.findall(doc)
    print("HTML_IMAGES", len(urls))
    for url in urls[:150]:
        add(url)
        add(re.sub(r"\._[^/.]+_\.(jpg|jpeg|png|webp)$", r".\1", url, flags=re.I))

reference = Image.open(TARGET).convert("RGB").resize((96, 144), Image.Resampling.LANCZOS)
verified = []
for url in IMAGE_CANDIDATES[:90]:
    data = fetch(url)
    if len(data) < 12_000:
        continue
    try:
        cover = Image.open(io.BytesIO(data)).convert("RGB")
        if cover.width < 600 or cover.height < 850:
            continue
        if abs(cover.width / cover.height - 2 / 3) > 0.07:
            continue
        tiny = cover.resize((96, 144), Image.Resampling.LANCZOS)
        diff = ImageChops.difference(tiny, reference)
        distance = sum(ImageStat.Stat(diff).mean) / 3
        print("COVER_CANDIDATE", cover.size, round(distance, 1), url[:120])
        if distance < 30:
            verified.append((distance, cover, url))
    except Exception as exc:
        print("INVALID_IMAGE", type(exc).__name__)

if not verified:
    print("NO VERIFIED HIGH-RES COVER FOUND. Original site asset retained.")
    sys.exit(1)

distance, cover, source = min(verified, key=lambda entry: entry[0])
cover.save(TARGET, format="WEBP", quality=88, method=6)
print("VERIFIED_COVER_REPLACED", cover.size, round(distance, 1), source)
