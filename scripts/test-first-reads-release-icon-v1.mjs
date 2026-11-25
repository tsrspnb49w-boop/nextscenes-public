import test from "node:test";
import assert from "node:assert/strict";
import {isRecentFirstReadsRelease,FIRST_READS_ICON_WINDOW} from "../app/lib/firstReadsReleaseIndicatorV1.ts";
const start=Date.parse("2026-11-25T08:49:02.000Z");
const one={serialNumber:1,authorizedAt:new Date(start).toISOString()};
test("display at authorization and for exactly 36 hours",()=>{
  assert.equal(isRecentFirstReadsRelease(one,start-1),false);
  assert.equal(isRecentFirstReadsRelease(one,start),true);
  assert.equal(isRecentFirstReadsRelease(one,start+FIRST_READS_ICON_WINDOW-1),true);
  assert.equal(isRecentFirstReadsRelease(one,start+FIRST_READS_ICON_WINDOW),false);
});
test("no release, invalid date, or chapter-one-only metadata cannot show the icon",()=>{
  for(const r of [null,{...one,serialNumber:0},{...one,authorizedAt:"invalid"}])assert.equal(isRecentFirstReadsRelease(r,start),false);
});

import {queenAminaPublicStoryId,queenAminaPublicReadingUrl} from "../app/lib/firstReadsApprovedBooks.ts";
test("staging points exclusively to the staging authorized edition; production remains unchanged",()=>{
  const id=process.env.RENDER_SERVICE_ID, name=process.env.RENDER_SERVICE_NAME;
  try {
    process.env.RENDER_SERVICE_ID="srv-dbi96qjbc2fs73af0i80";
    delete process.env.RENDER_SERVICE_NAME;
    assert.equal(queenAminaPublicStoryId(),"6b015cd165e47e1c7a8b31f5");
    assert.equal(queenAminaPublicReadingUrl("https://app.nextscenes.org"),"https://staging.nextscenes.org/reader-view?storyId=6b015cd165e47e1c7a8b31f5&openBook=1");
    process.env.RENDER_SERVICE_ID="srv-d62fm2onputs73b2dr7g";
    assert.equal(queenAminaPublicStoryId(),"6b031e6fa85e87384e4e27a5");
    assert.equal(queenAminaPublicReadingUrl("https://app.nextscenes.org"),"https://app.nextscenes.org/reader-view?storyId=6b031e6fa85e87384e4e27a5&openBook=1");
  } finally {
    if(id===undefined)delete process.env.RENDER_SERVICE_ID;else process.env.RENDER_SERVICE_ID=id;
    if(name===undefined)delete process.env.RENDER_SERVICE_NAME;else process.env.RENDER_SERVICE_NAME=name;
  }
});
