import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Optimistic check only: no session cookie -> go to login. The API still verifies
// every request (and each portal re-checks /auth/me), so this is just for speed.
const PUBLIC_EXACT = ["/"]; // marketing landing page
const PUBLIC_PREFIX = ["/login"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublic = PUBLIC_EXACT.includes(pathname) || PUBLIC_PREFIX.some((p) => pathname.startsWith(p));
  if (!isPublic && !request.cookies.has("bp_session")) {
    const url = new URL("/login", request.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  // Skip API proxying, Next internals and static files.
  matcher: ["/((?!api|_next/static|_next/image|icon.svg|manifest.webmanifest|favicon.ico).*)"],
};
