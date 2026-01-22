import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "ion_admin_session";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // protect /admin (but allow /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = req.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
