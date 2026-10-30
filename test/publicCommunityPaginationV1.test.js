"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const root=path.resolve(__dirname,"..");
const api=fs.readFileSync(path.join(root,"app/api/public-community/route.ts"),"utf8");
const ui=fs.readFileSync(path.join(root,"components/PublicCommunityThreadsV1.tsx"),"utf8");
const css=fs.readFileSync(path.join(root,"components/PublicCommunityThreadsV1.module.css"),"utf8");
test("public read proxy does not expose private or direct feedback writes",()=>{
 assert.ok(api.includes('"/api/public-community/v1"'));
 assert.ok(!api.includes("/api/feedback/live"));
 assert.ok(!api.includes("export async function POST("));
 assert.ok(api.includes('raw.length?10:3'));
 assert.ok(api.includes('CURSOR.test(raw[0])'));
});
test("UI pages older threads in batches without discarding loaded pages",()=>{
 assert.ok(ui.includes("loadOlder=useCallback"));
 assert.ok(ui.includes("encodeURIComponent(nextBefore)"));
 assert.ok(ui.includes("...prev,...older.filter"));
 assert.ok(ui.includes("pagingActive.current=true"));
 assert.ok(ui.includes('void refresh({resetPaging:true})'));
 assert.ok(ui.includes('Charger des discussions précédentes'));
 assert.ok(ui.includes('Load older discussions'));
});
test("scroll region is keyboard-operable and respects reduced motion",()=>{
 assert.ok(ui.includes('role="region"'));
 assert.ok(ui.includes("tabIndex={0}"));
 assert.ok(css.includes("overflow-y:auto"));
 assert.ok(css.includes("prefers-reduced-motion:reduce"));
});
