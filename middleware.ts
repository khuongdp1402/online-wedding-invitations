import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { allowRateLimit } from "@/lib/auth-rate-limit";
// Chỉ import resolver nhẹ (Edge-safe), KHÔNG import lib/auth.ts (kéo theo prisma).
import { envSecret, MISSING_SECRET_MESSAGE } from "@/lib/auth-secret";
import { assetRedirectUrl } from "@/lib/asset-base-url";

/** Có cookie phiên NextAuth (kể cả dạng chia nhỏ `.0`, `.1`) hay không. */
function hasSessionCookie(req: NextRequest): boolean {
  return req.cookies
    .getAll()
    .some(
      (c) =>
        /^(__Secure-)?(authjs|next-auth)\.session-token(\.\d+)?$/.test(c.name) &&
        !!c.value
    );
}

function clientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function middleware(req: NextRequest) {
  // 0. Asset template (ảnh theme, nhạc, font...) → MinIO khi có ASSETS_BASE_URL.
  //    Đọc env lúc runtime (Edge sandbox của `next start`/standalone copy
  //    process.env thật). Không đặt env → phục vụ file public/ như cũ.
  //    307 (tạm thời) để gỡ env là rollback ngay, trình duyệt không cache vĩnh viễn.
  const assetUrl = assetRedirectUrl(req.nextUrl.pathname, req.nextUrl.search);
  if (assetUrl) {
    const res = NextResponse.redirect(assetUrl, 307);
    res.headers.set("Cache-Control", "public, max-age=3600");
    return res;
  }

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

  const isProtected =
    pathname.startsWith("/dashboard") || pathname.startsWith("/admin");
  if (!isProtected) return NextResponse.next();

  // Không còn secret mặc định cứng (ai biết secret đó đều giả mạo được JWT admin).
  const secret = envSecret();

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      // Production thiếu secret: từ chối thay vì dùng secret ai cũng biết.
      console.error(MISSING_SECRET_MESSAGE);
      return new NextResponse(
        "Hệ thống chưa cấu hình NEXTAUTH_SECRET. Vui lòng liên hệ quản trị viên.",
        { status: 503 }
      );
    }
    // Dev thiếu secret: server tự sinh secret ngẫu nhiên riêng (lib/auth-secret.ts)
    // mà Edge không đọc được → chỉ kiểm tra có cookie phiên; layout/API
    // (auth() + canAccessAdmin / hasPermission) vẫn xác thực và phân quyền thật.
    if (!hasSessionCookie(req)) {
      const loginUrl = new URL("/login", req.nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", `${pathname}${req.nextUrl.search}`);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

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
    // Middleware chỉ là lớp lọc sớm dựa trên role trong JWT (đã ký bằng secret);
    // app/admin/layout.tsx và các API admin vẫn kiểm tra lại quyền từ session.
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
