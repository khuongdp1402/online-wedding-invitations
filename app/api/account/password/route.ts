import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const current =
      typeof body.currentPassword === "string" ? body.currentPassword : "";
    const nextPwd =
      typeof body.newPassword === "string" ? body.newPassword : "";

    if (!current || !nextPwd) {
      return NextResponse.json(
        { error: "Nhập mật khẩu hiện tại và mật khẩu mới" },
        { status: 400 }
      );
    }

    if (nextPwd.length < 6) {
      return NextResponse.json(
        { error: "Mật khẩu mới cần ít nhất 6 ký tự" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { password: true },
    });

    if (!user?.password) {
      return NextResponse.json(
        {
          error:
            "Tài khoản đăng nhập OAuth chưa có mật khẩu cục bộ. Liên hệ hỗ trợ nếu cần.",
        },
        { status: 400 }
      );
    }

    const ok = await bcrypt.compare(current, user.password);
    if (!ok) {
      return NextResponse.json(
        { error: "Mật khẩu hiện tại không đúng" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(nextPwd, 10);
    await prisma.user.update({
      where: { id: session.user.id },
      data: { password: hashed },
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Change password error:", e);
    return NextResponse.json(
      { error: "Không thể đổi mật khẩu" },
      { status: 500 }
    );
  }
}
