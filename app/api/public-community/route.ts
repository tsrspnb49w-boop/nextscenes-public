import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const revalidate = 0;
// Server-to-server proxy only. Never connect the public UI to /api/feedback/live.
export async function GET() {
  const origin = String(process.env.NEXT_PUBLIC_NEXTSCENES_API_BASE || "").replace(/\/+$/, "");
  const fail = () => NextResponse.json(
    { ok:false, threads:[], development:[] },
    { status:503, headers:{"Cache-Control":"no-store"} }
  );
  if(!/^https:\/\//i.test(origin)) return fail();
  try {
    const upstream = await fetch(origin + "/api/public-community/v1", {
      cache:"no-store",
      headers:{"Accept":"application/json"},
      signal:AbortSignal.timeout(8000),
    });
    if(!upstream.ok) return fail();
    const data = await upstream.json();
    if(data?.ok !== true || !Array.isArray(data.threads) || !Array.isArray(data.development)) return fail();
    return NextResponse.json({
      ok:true, threads:data.threads.slice(0,3), development:data.development.slice(0,3)
    },{headers:{"Cache-Control":"no-store"}});
  } catch {return fail();}
}
