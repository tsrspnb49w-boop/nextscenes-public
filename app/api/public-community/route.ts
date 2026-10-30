import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const revalidate = 0;
// Server-to-server public-only read proxy. Never expose /api/feedback/live.
const CURSOR = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z_[a-f0-9]{24}$/;
// Separate staging and production public-only reads. Unknown origins fail closed.
function permittedUpstream(siteHost:string,apiBase:string){
  try{
    const api=new URL(apiBase);
    if(api.protocol!=="https:"||api.pathname!=="/"||api.search||api.hash||api.username||api.password)return false;
    const host=siteHost.toLowerCase();
    if(host==="nextscenes-public-staging.onrender.com")
      return api.origin==="https://nextscenes-staging-backend.onrender.com";
    if(host==="nextscenes-review-public-discussion.onrender.com")
      return api.origin==="https://nextscenes-review-api-discussion.onrender.com";
    if(host==="nextscenes.org"||host==="www.nextscenes.org"||host==="nextscenes-public.onrender.com")
      return api.origin==="https://api.nextscenes.org";
    return false;
  }catch{return false;}
}
export async function GET(request: NextRequest) {
  const origin = String(process.env.NEXT_PUBLIC_NEXTSCENES_API_BASE || "").replace(/\/+$/, "");
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
  if(!permittedUpstream(request.nextUrl.hostname,origin)) return fail();
  try {
    const upstream = await fetch(origin + "/api/public-community/v1" +
      (raw.length ? "?before="+encodeURIComponent(raw[0]) : ""), {
      cache:"no-store",
      headers:{"Accept":"application/json"},
      signal:AbortSignal.timeout(8000),
    });
    if(!upstream.ok) return fail();
    const data = await upstream.json();
    if(data?.ok !== true || !Array.isArray(data.threads) || !Array.isArray(data.development)) return fail();
    const safeNext = typeof data.nextBefore === "string" && CURSOR.test(data.nextBefore) ? data.nextBefore : "";
    return NextResponse.json({
      ok:true, threads:data.threads.slice(0,raw.length?10:3),
      development:data.development.slice(0,3),
      storylines:Array.isArray(data.storylines)?data.storylines.slice(0,300):[],
      nextBefore:safeNext
    },{headers:{"Cache-Control":"no-store"}});
  } catch {return fail();}
}
