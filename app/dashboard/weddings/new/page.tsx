import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NewWeddingWizard } from "@/components/dashboard/NewWeddingWizard";

export default async function NewWeddingPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const templates = await prisma.template.findMany({
    orderBy: [{ isPremium: "asc" }, { name: "asc" }],
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Tạo Thiệp Cưới Mới</h1>
      <p className="text-gray-500 mb-8">Chọn mẫu thiệp, nhập thông tin và xem trước thiệp cưới của bạn.</p>
      <NewWeddingWizard templates={templates} />
    </div>
  );
}
