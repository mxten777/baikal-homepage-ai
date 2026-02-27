import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── 관리자 경로 보호 ──
  if (
    pathname.startsWith("/admin/dashboard") ||
    pathname.startsWith("/admin/posts") ||
    pathname.startsWith("/admin/pages") ||
    pathname.startsWith("/admin/menus") ||
    pathname.startsWith("/admin/banners") ||
    pathname.startsWith("/admin/settings") ||
    pathname.startsWith("/admin/audit-logs")
  ) {
    const token = request.cookies.get("baikal-token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  // ── IP 제한 (향후 적용) ──
  // const allowedIPs = process.env.ADMIN_IP_WHITELIST?.split(",") || [];
  // if (pathname.startsWith("/admin") && allowedIPs.length > 0) {
  //   const clientIP = request.headers.get("x-forwarded-for") || "";
  //   if (!allowedIPs.includes(clientIP)) {
  //     return new NextResponse("Forbidden", { status: 403 });
  //   }
  // }

  // ── 보안 헤더 ──
  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
