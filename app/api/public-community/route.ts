import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const revalidate = 0;
// Server-to-server public-only read proxy. Never expose /api/feedback/live.
const CURSOR = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z_[a-f0-9]{24}$/;
// The Render service identity is server-owned, unlike proxy/Host headers.
// A reverse proxy may supply localhost as request.nextUrl.hostname.
function trustedFeedbackOrigin(){
  const serviceId=String(process.env.RENDER_SERVICE_ID||"");
  const serviceName=String(process.env.RENDER_SERVICE_NAME||"");
  if(serviceId==="srv-dbi96qjbc2fs73af0i80"||serviceName==="nextscenes-public-staging")
    return process.env.NEXTSCENES_STAGING_SAMESITE_AUTH==="true"
      ? "https://api.staging.nextscenes.org"
      : "https://nextscenes-staging-backend.onrender.com";
  if(serviceId==="srv-d62fm2onputs73b2dr7g"||serviceName==="nextscenes-public")
    return "https://api.nextscenes.org";
  return "";
}
export async function GET(request: NextRequest) {
  // Public reads only. Never use private, Beta or General Discussions.
  const origin=trustedFeedbackOrigin();
  const fail = () => NextResponse.json(
    { ok:false, threads:[], development:[], nextBefore:"" },
    { status:503, headers:{"Cache-Control":"no-store"} }
  );
  const raw = request.nextUrl.searchParams.getAll("before");
  if (raw.length > 1 || (raw.length === 1 && !CURSOR.test(raw[0]))) {
    return NextResponse.json({ok:false,threads:[],development:[],nextBefore:""},{
      status:400,headers:{"Cache-Control":"no-store"}
    });
  }
  if(!origin){console.error("Public community proxy: unknown Render service identity");return fail();}
  try {
    const upstream = await fetch(origin + "/api/public-community/v1" +
      (raw.length ? "?before="+encodeURIComponent(raw[0]) : ""), {
      cache:"no-store",
      headers:{"Accept":"application/json"},
      signal:AbortSignal.timeout(8000),
    });
    if(!upstream.ok){console.error("Public community proxy: backend HTTP",upstream.status);return fail();}
    const data = await upstream.json();
    if(data?.ok !== true || !Array.isArray(data.threads) || !Array.isArray(data.development)){console.error("Public community proxy: invalid public feed response");return fail();}
    const safeNext = typeof data.nextBefore === "string" && CURSOR.test(data.nextBefore) ? data.nextBefore : "";
    return NextResponse.json({
      ok:true, threads:data.threads.slice(0,raw.length?10:3),
      development:data.development.slice(0,3),
      storylines:Array.isArray(data.storylines)?data.storylines.slice(0,300):[],
      nextBefore:safeNext
    },{headers:{"Cache-Control":"no-store"}});
  } catch(e) {console.error("Public community proxy: upstream request failed",e instanceof Error?e.name:"unknown");return fail();}
}
