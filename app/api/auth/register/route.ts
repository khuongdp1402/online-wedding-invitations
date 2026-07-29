import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    const emailStr = typeof email === "string" ? email.trim().toLowerCase() : "";
    const passwordStr = typeof password === "string" ? password : "";
    const nameStr = typeof name === "string" ? name.trim() : "";

    if (!emailStr || !passwordStr) {
      return NextResponse.json(
        { error: "Vui lòng nhập email và mật khẩu" },
        { status: 400 }
      );
    }

    if (passwordStr.length < 6) {
      return NextResponse.json(
        { error: "Mật khẩu cần ít nhất 6 ký tự" },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({
      where: { email: emailStr },
    });
    if (existing) {
      return NextResponse.json(
        { error: "Email này đã được đăng ký" },
        { status: 409 }
      );
    }

    const hashed = await bcrypt.hash(passwordStr, 10);
    const user = await prisma.user.create({
      data: {
        email: emailStr,
        name: nameStr || emailStr.split("@")[0],
        password: hashed,
      },
    });

    return NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Lỗi đăng ký. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
