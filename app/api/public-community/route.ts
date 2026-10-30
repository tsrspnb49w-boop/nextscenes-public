import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const revalidate = 0;
// Server-to-server public-only read proxy. Never expose /api/feedback/live.
const CURSOR = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z_[a-f0-9]{24}$/;
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
  if(!/^https:\/\//i.test(origin)) return fail();
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
      development:data.development.slice(0,3), nextBefore:safeNext
    },{headers:{"Cache-Control":"no-store"}});
  } catch {return fail();}
}
