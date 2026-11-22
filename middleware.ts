import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { allowRateLimit } from "@/lib/auth-rate-limit";

function clientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;
  const hostname = req.headers.get("host") || "";

  // 1. Custom Subdomain Rewrite Logic
  const mainDomain = process.env.NEXT_PUBLIC_APP_URL 
    ? new URL(process.env.NEXT_PUBLIC_APP_URL).host 
    : "localhost:3000";

  // Check if it's a subdomain/custom domain
  if (
    hostname &&
    hostname !== mainDomain &&
    !hostname.includes("localhost") &&
    !hostname.match(/^[0-9.]+(:[0-9]+)?$/)
  ) {
    let slug = hostname;
    if (hostname.endsWith(`.${mainDomain}`)) {
      slug = hostname.replace(`.${mainDomain}`, "");
    }
    
    // Ngăn chặn rewrite tài nguyên hệ thống
    if (!pathname.startsWith("/_next") && !pathname.startsWith("/api") && !pathname.match(/\.(.*)$/)) {
      url.pathname = `/w/${slug}${pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  if (pathname.startsWith("/api/auth")) {
    const ip = clientIp(req);
    const isRegister =
      pathname === "/api/auth/register" ||
      pathname.startsWith("/api/auth/register/");
    const windowMs = isRegister ? 15 * 60 * 1000 : 60 * 1000;
    const max = isRegister ? 10 : 45;
    const key = `${ip}:${isRegister ? "register" : "auth"}`;
    const rl = allowRateLimit(key, max, windowMs);
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Quá nhiều yêu cầu. Thử lại sau." },
        {
          status: 429,
          headers: { "Retry-After": String(rl.retryAfterSec) },
        }
      );
    }
    return NextResponse.next();
  }

  const secret =
    process.env.NEXTAUTH_SECRET ||
    process.env.AUTH_SECRET ||
    process.env.JWT_SECRET ||
    "winglove-default-nextauth-secret-key-2026";

  if (pathname.startsWith("/dashboard")) {
    let token = null;
    try {
      token = await getToken({ req, secret });
    } catch {
      token = null;
    }
    if (!token) {
      const loginUrl = new URL("/login", req.nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", `${pathname}${req.nextUrl.search}`);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    let token = null;
    try {
      token = await getToken({ req, secret });
    } catch {
      token = null;
    }
    if (!token) {
      const loginUrl = new URL("/login", req.nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", `${pathname}${req.nextUrl.search}`);
      return NextResponse.redirect(loginUrl);
    }
    if (token.role !== "ADMIN" && token.role !== "STAFF") {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
    }
    if (pathname.startsWith("/admin/users")) {
      const perms = (token.permissions as string[]) || [];
      if (token.role !== "ADMIN" && !perms.includes("MANAGE_USERS")) {
        return NextResponse.redirect(new URL("/admin", req.nextUrl.origin));
      }
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
