import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { hasPermission } from "@/lib/permissions";
import { z } from "zod";

const UpdateUserSchema = z.object({
  userId: z.string().min(1),
  role: z.enum(["USER", "STAFF", "ADMIN"]),
  permissions: z.array(z.string()).default([]),
});

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user || !hasPermission(session.user, "MANAGE_USERS")) {
      return NextResponse.json({ error: "Không có quyền truy cập" }, { status: 403 });
    }

    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        phone: true,
        role: true,
        permissions: true,
        createdAt: true,
        _count: {
          select: {
            weddings: true,
            contactRequests: true,
          },
        },
      },
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error("[API Admin Users GET] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await auth();
    if (!session?.user || !hasPermission(session.user, "MANAGE_USERS")) {
      return NextResponse.json({ error: "Không có quyền quản lý tài khoản" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = UpdateUserSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ" },
        { status: 400 }
      );
    }

    const { userId, role, permissions } = parsed.data;

    // Không cho phép tự hạ quyền của chính mình nếu là Admin duy nhất
    if (userId === session.user.id && role !== "ADMIN") {
      const adminCount = await prisma.user.count({ where: { role: "ADMIN" } });
      if (adminCount <= 1) {
        return NextResponse.json(
          { error: "Hệ thống cần ít nhất một Quản trị viên (ADMIN)" },
          { status: 400 }
        );
      }
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        role: role as unknown as Role,
        permissions,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        permissions: true,
      },
    });

    return NextResponse.json({ success: true, user: updated });
  } catch (error) {
    console.error("[API Admin Users PATCH] Error:", error);
    return NextResponse.json({ error: "Lỗi cập nhật người dùng" }, { status: 500 });
  }
}
