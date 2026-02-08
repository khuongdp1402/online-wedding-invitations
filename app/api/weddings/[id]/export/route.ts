import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import * as XLSX from "xlsx";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify ownership
    const wedding = await prisma.wedding.findFirst({
      where: { id: params.id, userId: session.user.id },
      select: {
        id: true,
        slug: true,
        groomName: true,
        brideName: true,
        plan: true,
      },
    });

    if (!wedding) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Check plan allows export (STANDARD and above)
    if (wedding.plan !== "STANDARD" && wedding.plan !== "PREMIUM") {
      return NextResponse.json(
        { error: "Export Excel chỉ khả dụng cho gói Tiêu Chuẩn trở lên" },
        { status: 403 }
      );
    }

    const guests = await prisma.guest.findMany({
      where: { weddingId: params.id },
      orderBy: [{ side: "asc" }, { group: "asc" }, { name: "asc" }],
    });

    // Build Excel data
    const rsvpLabels: Record<string, string> = {
      PENDING: "Chờ phản hồi",
      ACCEPTED: "Tham dự",
      DECLINED: "Từ chối",
    };

    const sideLabels: Record<string, string> = {
      GROOM: "Nhà trai",
      BRIDE: "Nhà gái",
    };

    const data = guests.map((g, idx) => ({
      STT: idx + 1,
      "Tên khách mời": g.name,
      "Xưng hô": g.salutation || "",
      "Bên": sideLabels[g.side] || g.side,
      "Nhóm": g.group || "",
      "Số điện thoại": g.phone || "",
      Email: g.email || "",
      "Trạng thái RSVP": rsvpLabels[g.rsvpStatus] || g.rsvpStatus,
      "Số khách đi kèm": g.numberOfGuests,
      "Ngày phản hồi": g.rsvpAt
        ? new Date(g.rsvpAt).toLocaleDateString("vi-VN")
        : "",
      "Link đã mở": g.linkOpened ? "Có" : "Chưa",
    }));

    // Summary row
    const totalGuests = guests.reduce((sum, g) => sum + g.numberOfGuests, 0);
    const accepted = guests.filter((g) => g.rsvpStatus === "ACCEPTED").length;
    const declined = guests.filter((g) => g.rsvpStatus === "DECLINED").length;
    const pending = guests.filter((g) => g.rsvpStatus === "PENDING").length;

    // Create workbook
    const wb = XLSX.utils.book_new();

    // Guests sheet
    const ws = XLSX.utils.json_to_sheet(data);

    // Set column widths
    ws["!cols"] = [
      { wch: 5 },  // STT
      { wch: 25 }, // Tên
      { wch: 10 }, // Xưng hô
      { wch: 12 }, // Bên
      { wch: 15 }, // Nhóm
      { wch: 15 }, // SĐT
      { wch: 25 }, // Email
      { wch: 15 }, // RSVP
      { wch: 12 }, // Số khách
      { wch: 15 }, // Ngày PH
      { wch: 10 }, // Link mở
    ];

    XLSX.utils.book_append_sheet(wb, ws, "Danh sách khách mời");

    // Summary sheet
    const summaryData = [
      { "Thông tin": "Thiệp cưới", "Giá trị": `${wedding.groomName} & ${wedding.brideName}` },
      { "Thông tin": "Slug", "Giá trị": wedding.slug },
      { "Thông tin": "", "Giá trị": "" },
      { "Thông tin": "Tổng khách mời", "Giá trị": guests.length },
      { "Thông tin": "Tổng số người (kể cả đi kèm)", "Giá trị": totalGuests },
      { "Thông tin": "Đã xác nhận tham dự", "Giá trị": accepted },
      { "Thông tin": "Từ chối", "Giá trị": declined },
      { "Thông tin": "Chưa phản hồi", "Giá trị": pending },
      { "Thông tin": "", "Giá trị": "" },
      { "Thông tin": "Nhà trai", "Giá trị": guests.filter((g) => g.side === "GROOM").length },
      { "Thông tin": "Nhà gái", "Giá trị": guests.filter((g) => g.side === "BRIDE").length },
      { "Thông tin": "", "Giá trị": "" },
      { "Thông tin": "Ngày xuất", "Giá trị": new Date().toLocaleDateString("vi-VN") },
    ];

    const summaryWs = XLSX.utils.json_to_sheet(summaryData);
    summaryWs["!cols"] = [{ wch: 30 }, { wch: 40 }];
    XLSX.utils.book_append_sheet(wb, summaryWs, "Thống kê");

    // Generate buffer
    const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

    const filename = `khachmoi-${wedding.slug}-${new Date().toISOString().slice(0, 10)}.xlsx`;

    return new NextResponse(buf, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Error exporting guests:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
