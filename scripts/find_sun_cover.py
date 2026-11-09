#!/usr/bin/env python3
"""Replace blurred Kola King cover with the verified Amazon product's own cover."""
import io
import re
import urllib.request
from PIL import Image, ImageChops, ImageStat

ASIN = "B0HQY8VBGM"
COVER_ID = "71KbcfnSe3L"
OUTPUT = "public/images/covers/featured-flat/a-place-in-the-sun.webp"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
}
def fetch(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=HEADERS), timeout=15) as response:
        if response.status != 200:
            raise ValueError("Unexpected response status from Amazon")
        return response.read(6_000_000)

# Confirm image is actually the primary cover on the specific Amazon listing.
html = fetch("https://www.amazon.com/dp/" + ASIN).decode("utf-8", "ignore")
position = html.find('id="landingImage"')
if position == -1 or COVER_ID not in html[position:position + 2800]:
    raise RuntimeError("The candidate is no longer Amazon's primary image for this ASIN")

url = "https://m.media-amazon.com/images/I/" + COVER_ID + "._SL1499_.jpg"
image = Image.open(io.BytesIO(fetch(url))).convert("RGB")
image.load()
if image.width < 900 or image.height < 1300:
    raise RuntimeError("Unexpected Amazon cover image dimensions")

# Low resolution original is only 120 px wide. A broad pixel tolerance accounts
# for its compression and thumbnail treatment. The Amazon landing-image check
# above is the primary verification of this exact book.
old = Image.open(OUTPUT).convert("RGB").resize((96, 144), Image.Resampling.LANCZOS)
new = image.resize((96, 144), Image.Resampling.LANCZOS)
distance = sum(ImageStat.Stat(ImageChops.difference(old, new)).mean) / 3
if distance >= 55:
    raise RuntimeError("Amazon's product image differs materially from the approved front cover")
image.save(OUTPUT, format="WEBP", quality=87, method=6)
print("Verified Amazon book cover:", ASIN, image.size, "comparison:", round(distance, 2))
