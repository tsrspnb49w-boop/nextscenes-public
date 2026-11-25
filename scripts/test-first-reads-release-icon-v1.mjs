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
