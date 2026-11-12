"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const base="http://localhost:3100";
(async()=>{
 const manifest=require("../app/lib/publicImageManifest.json");
 for(const src of manifest.sources) for(const width of manifest.widths){
  const file="public/_media/"+width+src+".webp";
  assert.ok(fs.statSync(file).size>0,file);
 }
 for(const route of ["/","/fr","/books","/fr/books","/books/didie","/books/a-place-in-the-sun","/fr/books/a-place-in-the-sun","/mystery250","/fr/mystery250"]){
  const res=await fetch(base+route);
  assert.equal(res.status,200,route);
  const html=await res.text();
  assert.ok(!html.includes("/_next/image?"),"runtime image URL on "+route);
  if(route.includes("books")||route==="/"||route==="/fr")assert.ok(html.includes("/_media/"),"no prepared variants on "+route);
 }
 const src="/images/covers/featured-flat/reflections-wayfarer.webp";
 for(const width of [128,640,1200]){
  const res=await fetch(base+"/_media/"+width+src+".webp");assert.equal(res.status,200);assert.match(res.headers.get("content-type"),/image\/webp/);
  assert.ok((await res.arrayBuffer()).byteLength>0);
 }
 for(const width of [640,3840]){
  const res=await fetch(base+"/_next/image?url="+encodeURIComponent(src)+"&w="+width+"&q=75");
  assert.ok([400,404].includes(res.status),"legacy optimizer still enabled: "+res.status);
 }
 console.log("Public routes, static images and disabled on-demand optimizer: PASS");
})().catch(e=>{console.error(e);process.exitCode=1;});
