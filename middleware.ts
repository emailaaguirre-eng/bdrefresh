import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const APEX_HOST = "banddservicing.com";
const WWW_HOST = "www.banddservicing.com";

/**
 * Canonicalize production host to apex HTTPS and map legacy /contact → /start-project.
 * Aligns with BDCC monitoring (prefer apex from domain website_url).
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase() ?? "";
  const { pathname, search } = request.nextUrl;

  const isProductionHost = host === APEX_HOST || host === WWW_HOST;

  if (isProductionHost && host === WWW_HOST) {
    const destination = new URL(`https://${APEX_HOST}${pathname}${search}`);
    return NextResponse.redirect(destination, 301);
  }

  if (pathname === "/contact" || pathname === "/contact/") {
    const destination = request.nextUrl.clone();
    destination.pathname = "/start-project";
    return NextResponse.redirect(destination, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Skip Next internals and static assets.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
