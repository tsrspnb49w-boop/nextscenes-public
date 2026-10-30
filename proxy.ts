import {NextRequest,NextResponse} from "next/server";

// The staging application and API now share a first-party cookie domain family.
// Old onrender pages are still read-only because their browser origin is separate.
// Redirect only this exact staging service's old host. Never redirect production.
const OLD_HOST="nextscenes-public-staging.onrender.com";
const CANONICAL_ORIGIN="https://public-staging.nextscenes.org";
const STAGING_SERVICE_ID="srv-dbi96qjbc2fs73af0i80";

export function proxy(request:NextRequest){
  const serviceId=String(process.env.RENDER_SERVICE_ID||"");
  const serviceName=String(process.env.RENDER_SERVICE_NAME||"");
  if(serviceId!==STAGING_SERVICE_ID && serviceName!=="nextscenes-public-staging")
    return NextResponse.next();
  const incoming=[request.headers.get("host"),request.headers.get("x-forwarded-host")]
    .map(h=>String(h||"").trim().toLowerCase().replace(/:\d+$/,""));
  if(!incoming.includes(OLD_HOST))return NextResponse.next();
  const dest=new URL(request.nextUrl.pathname+request.nextUrl.search,CANONICAL_ORIGIN);
  // Staging redirect remains reversible and does not alter the user's cookies.
  return NextResponse.redirect(dest,307);
}

export const config={matcher:["/((?!_next/static|_next/image|favicon.ico).*)"]};
