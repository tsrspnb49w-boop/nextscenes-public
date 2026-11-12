"use strict";
const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");
const manifest = require("../app/lib/publicImageManifest.json");
const root = path.resolve(__dirname,"../public");
const output = path.join(root,"_media");
sharp.cache(false);
sharp.concurrency(1);
async function main() {
  await fs.rm(output,{recursive:true,force:true});
  let count=0, bytes=0;
  for (const src of manifest.sources) {
    if (!/^\/images\/[^?&#]+\.(?:png|jpe?g|webp|avif)$/i.test(src) || src.split("/").includes("..")) throw Error("Invalid manifest asset: "+src);
    const source = path.join(root,src.slice(1));
    // Sequential build-time decoding only; no runtime Sharp operations.
    for (const width of manifest.widths) {
      const target = path.join(output,String(width),src.slice(1)+".webp");
      await fs.mkdir(path.dirname(target),{recursive:true});
      const info = await sharp(source,{limitInputPixels:40_000_000})
        .rotate().resize({width,withoutEnlargement:true})
        .webp({quality:82,effort:4}).toFile(target);
      if (!info.size || info.width > width) throw Error("Invalid generated image: "+src);
      count++;bytes+=info.size;
    }
  }
  console.log("Prepared "+count+" static public image variants ("+Math.round(bytes/1024/1024*10)/10+" MiB).");
}
main().catch(e=>{console.error(e);process.exitCode=1;});
