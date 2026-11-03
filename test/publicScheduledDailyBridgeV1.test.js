"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const bridge=fs.readFileSync(path.join(__dirname,"../app/lib/publicEditorialSpotlight.ts"),"utf8");
const homepage=fs.readFileSync(path.join(__dirname,"../components/PublicHomepageV2.tsx"),"utf8");
test("approved Calendar Daily Words may display without a prior manual Spotlight save",()=>{
 assert.match(bridge,/const manuallyPublished = Boolean\(clean\(doc\?\.updatedBy\?\.id, 100\)\)/);
 assert.match(bridge,/const scheduledDaily = Boolean\(/);
 assert.match(bridge,/clean\(doc\?\.daily\?\.quoteFr\)/);
 assert.match(bridge,/clean\(doc\?\.daily\?\.dateLabelFr\)/);
 assert.match(bridge,/\["original", "quotation"\]\.includes/);
 assert.match(bridge,/!data\?\.ok \|\| \(!manuallyPublished && !scheduledDaily\)/);
 assert.match(bridge,/writer: manuallyPublished &&/);
 assert.match(bridge,/book: manuallyPublished &&/);
 assert.match(homepage,/<details className=\{styles\.spotlightDetails\} open>/);
 assert.match(homepage,/spotlight\.daily\.dateLabelFr \|\| spotlight\.daily\.dateLabel/);
});
