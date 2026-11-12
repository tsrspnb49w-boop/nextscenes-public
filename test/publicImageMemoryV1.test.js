"use strict";
const test=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const manifest=require("../app/lib/publicImageManifest.json");
const root=path.resolve(__dirname,"..");
test("image manifest preserves original files and bounds prepared widths",()=>{
 assert.deepEqual(manifest.widths,[128,256,384,640,960,1200]);
 assert.equal(new Set(manifest.sources).size,manifest.sources.length);
 for(const src of manifest.sources) assert.ok(fs.existsSync(path.join(root,"public",src.slice(1))),src);
 for(const src of ["/images/books/didie/approved-front.webp","/images/covers/featured-flat/a-place-in-the-sun-sharp.webp","/images/covers/featured-flat/reflections-wayfarer.webp"])assert.ok(manifest.sources.includes(src));
});
test("production build generates variants and runtime optimizer is replaced",()=>{
 const config=fs.readFileSync(path.join(root,"next.config.ts"),"utf8");
 assert.match(config,/loader:\s*"custom"/);assert.match(config,/loaderFile:\s*"\.\/app\/lib\/publicImageLoader\.ts"/);
 const pkg=require("../package.json");assert.match(pkg.scripts.prebuild,/build-public-image-variants/);
 const loader=fs.readFileSync(path.join(root,"app/lib/publicImageLoader.ts"),"utf8");
 assert.match(loader,/if \(!sources\.has\(src\)\) return src/);
 assert.match(loader,/\/\_media\//);
});
