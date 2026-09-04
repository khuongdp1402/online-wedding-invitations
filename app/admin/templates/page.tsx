import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { AdminTemplateList } from "./AdminTemplateList";
import { templates as registryTemplates } from "@/lib/template-registry";

export default async function AdminTemplatesPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const dbTemplates = await prisma.template.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: { weddings: true },
      },
    },
  });

  const registeredSlugs = Object.keys(registryTemplates);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Quản lý &amp; Khởi tạo Mẫu Thiệp</h1>
        <p className="text-gray-600">
          Kiểm tra trạng thái mapping mã nguồn Component, cập nhật thông tin/giá bán, khuyến mãi và đồng bộ kho mẫu trực tiếp vào cơ sở dữ liệu.
        </p>
      </div>
      <AdminTemplateList
        templates={JSON.parse(JSON.stringify(dbTemplates))}
        registeredSlugs={registeredSlugs}
      />
    </div>
  );
}
