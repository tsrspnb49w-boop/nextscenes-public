import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const revalidate = 0;
// Same environment selection as the established public community proxy.
function origin() {
  const id=String(process.env.RENDER_SERVICE_ID||""), name=String(process.env.RENDER_SERVICE_NAME||"");
  if(id==="srv-dbi96qjbc2fs73af0i80" || name==="nextscenes-public-staging")
    return process.env.NEXTSCENES_STAGING_SAMESITE_AUTH==="true" ? "https://api-staging.nextscenes.org" : "https://nextscenes-staging-backend.onrender.com";
  if(id==="srv-d62fm2onputs73b2dr7g" || name==="nextscenes-public") return "https://api.nextscenes.org";
  return "";
}
export async function GET(request: NextRequest) {
  const headers={"Cache-Control":"no-store"};
  const ids=request.nextUrl.searchParams.getAll("storyId");
  if(ids.length!==1||!/^[a-f0-9]{24}$/i.test(ids[0]))return NextResponse.json({ok:false},{status:400,headers});
  const base=origin();
  if(!base)return NextResponse.json({ok:false},{status:503,headers});
  try {
    const r=await fetch(base+"/api/stories/"+encodeURIComponent(ids[0])+"/first-reads-release-status",
      {cache:"no-store",headers:{Accept:"application/json"},signal:AbortSignal.timeout(6000)});
    if(!r.ok)return NextResponse.json({ok:false},{status:r.status===404?404:503,headers});
    const j=await r.json();
    if(j?.ok!==true)return NextResponse.json({ok:false},{status:503,headers});
    const release=j.release;
    if(!release)return NextResponse.json({ok:true,release:null},{headers});
    const stamp=Date.parse(release.authorizedAt||"");
    if(!Number.isSafeInteger(release.serialNumber)||release.serialNumber<1||!Number.isFinite(stamp))
      return NextResponse.json({ok:false},{status:503,headers});
    return NextResponse.json({ok:true,release:{serialNumber:release.serialNumber,authorizedAt:new Date(stamp).toISOString()}},{headers});
  }catch{return NextResponse.json({ok:false},{status:503,headers});}
}
