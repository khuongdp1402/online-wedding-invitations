import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { AdminTemplateList } from "./AdminTemplateList";

export default async function AdminTemplatesPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const templates = await prisma.template.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      slug: true,
      thumbnail: true,
      category: true,
      price: true,
      salePrice: true,
      saleStartsAt: true,
      saleEndsAt: true,
    },
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Giá mẫu thiệp</h1>
      <p className="text-gray-600 mb-8">
        Đặt giá xuất bản và khuyến mãi theo thời gian cho từng mẫu — thay đổi có hiệu lực ngay, không cần deploy lại.
      </p>
      <AdminTemplateList templates={JSON.parse(JSON.stringify(templates))} />
    </div>
  );
}
