export type FirstReadsRelease={serialNumber:number;authorizedAt:string};
export const FIRST_READS_ICON_WINDOW=36*3600000;
export function isRecentFirstReadsRelease(r:FirstReadsRelease|null,now:number) {
  if(!r||!Number.isSafeInteger(r.serialNumber)||r.serialNumber<1)return false;
  const at=Date.parse(r.authorizedAt);
  return Number.isFinite(at)&&at<=now&&now<at+FIRST_READS_ICON_WINDOW;
}
