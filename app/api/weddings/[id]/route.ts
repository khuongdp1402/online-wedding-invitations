import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { deleteStoredObject } from "@/lib/file-storage";
import { prisma } from "@/lib/prisma";
import { resolveTemplatePrice } from "@/lib/template-pricing";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const wedding = await prisma.wedding.findFirst({
      where: { id: params.id, userId: session.user.id },
      include: {
        template: true,
        _count: { select: { wishes: true, guests: true } },
      },
    });

    if (!wedding) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ wedding });
  } catch (error) {
    console.error("Error fetching wedding:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify ownership
    const existing = await prisma.wedding.findFirst({
      where: { id: params.id, userId: session.user.id },
    });
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const body = await request.json();

    // If changing slug, check uniqueness
    if (body.slug && body.slug !== existing.slug) {
      const slugExists = await prisma.wedding.findUnique({
        where: { slug: body.slug },
      });
      if (slugExists) {
        return NextResponse.json(
          { error: "Slug đã được sử dụng" },
          { status: 409 }
        );
      }
    }

    // Đổi mẫu: khi còn DRAFT, cho đổi tự do sang mọi mẫu để dùng thử — giá
    // chỉ tính lúc bấm Xuất bản. Khi đã PUBLISHED, đổi mẫu là đổi sản phẩm
    // đã mua nên phải tính lại tiền: mẫu mới rẻ hơn/bằng thì đổi ngay (không
    // hoàn phần chênh); mẫu mới đắt hơn thì KHÔNG đổi trong request này —
    // trả 402 để client điều hướng sang thanh toán phần chênh lệch
    // (`POST /api/payment/create` sẽ tạo Payment loại TEMPLATE_CHANGE, và
    // việc đổi `templateId` thực sự chỉ xảy ra khi thanh toán đó COMPLETED —
    // xem `lib/payment-completion.ts`).
    if (body.templateId && body.templateId !== existing.templateId) {
      const targetTemplate = await prisma.template.findUnique({
        where: { id: body.templateId },
        select: { id: true, price: true, salePrice: true, saleStartsAt: true, saleEndsAt: true },
      });
      if (!targetTemplate) {
        return NextResponse.json({ error: "Template không tồn tại" }, { status: 400 });
      }
      if (existing.status === "PUBLISHED") {
        const { effectivePrice } = resolveTemplatePrice(targetTemplate);
        const alreadyPaid = existing.purchasePrice ?? 0;
        if (effectivePrice > alreadyPaid) {
          return NextResponse.json(
            {
              error: "Mẫu thiệp này đắt hơn — cần thanh toán phần chênh lệch trước khi đổi",
              requiresPayment: true,
              amount: effectivePrice - alreadyPaid,
              targetTemplateId: targetTemplate.id,
            },
            { status: 402 }
          );
        }
        // Đổi sang mẫu rẻ hơn hoặc bằng: cho đổi ngay, không hoàn tiền, giữ
        // nguyên purchasePrice đã trả.
      }
    }

    // Chỉ nhận sectionOrder đúng định dạng: string[] (cũ) hoặc
    // {key, visible}[] (mới). Không chặn khối vượt gói ở đây — người dùng vẫn
    // được lưu ý định, còn `visibleSectionKeys` sẽ lọc lúc render.
    if (body.sectionOrder !== undefined && body.sectionOrder !== null) {
      const valid =
        Array.isArray(body.sectionOrder) &&
        body.sectionOrder.every(
          (item: unknown) =>
            typeof item === "string" ||
            (typeof item === "object" &&
              item !== null &&
              typeof (item as { key?: unknown }).key === "string")
        );
      if (!valid) {
        return NextResponse.json(
          { error: "sectionOrder không hợp lệ" },
          { status: 400 }
        );
      }
    }

    const wedding = await prisma.wedding.update({
      where: { id: params.id },
      data: {
        ...(body.slug !== undefined && { slug: body.slug }),
        ...(body.groomName !== undefined && { groomName: body.groomName }),
        ...(body.brideName !== undefined && { brideName: body.brideName }),
        ...(body.groomParents !== undefined && {
          groomParents: body.groomParents,
        }),
        ...(body.brideParents !== undefined && {
          brideParents: body.brideParents,
        }),
        ...(body.groomCeremony !== undefined && {
          groomCeremony: body.groomCeremony,
        }),
        ...(body.brideCeremony !== undefined && {
          brideCeremony: body.brideCeremony,
        }),
        ...(body.quote !== undefined && { quote: body.quote }),
        ...(body.gallery !== undefined && { gallery: body.gallery }),
        ...(body.gifting !== undefined && { gifting: body.gifting }),
        ...(body.primaryColor !== undefined && {
          primaryColor: body.primaryColor,
        }),
        ...(body.accentColor !== undefined && {
          accentColor: body.accentColor,
        }),
        ...(body.backgroundColor !== undefined && {
          backgroundColor: body.backgroundColor,
        }),
        ...(body.textColor !== undefined && { textColor: body.textColor }),
        ...(body.fontFamily !== undefined && { fontFamily: body.fontFamily }),
        ...(body.typography !== undefined && { typography: body.typography }),
        ...(body.sectionOrder !== undefined && {
          sectionOrder: body.sectionOrder,
        }),
        ...(body.backgroundMusic !== undefined && {
          backgroundMusic: body.backgroundMusic,
        }),
        ...(body.metaTitle !== undefined && { metaTitle: body.metaTitle }),
        ...(body.metaDescription !== undefined && {
          metaDescription: body.metaDescription,
        }),
        ...(body.ogImage !== undefined && { ogImage: body.ogImage }),
        ...(body.templateId !== undefined && { templateId: body.templateId }),
        // `status` KHÔNG nhận từ client: chỉ luồng thanh toán
        // (lib/payment-complete.ts, webhook admin) mới được đổi trạng thái,
        // nếu không người dùng có thể tự publish mà không trả tiền.
      },
      include: { template: true },
    });

    return NextResponse.json({ wedding });
  } catch (error) {
    console.error("Error updating wedding:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existing = await prisma.wedding.findFirst({
      where: { id: params.id, userId: session.user.id },
    });
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const files = await prisma.fileManagement.findMany({
      where: { weddingId: params.id },
      select: { storageKey: true },
    });
    await prisma.wedding.delete({ where: { id: params.id } });
    await Promise.all(files.map((f) => deleteStoredObject(f.storageKey)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting wedding:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
