import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NewWeddingWizard } from "@/components/dashboard/NewWeddingWizard";

export default async function NewWeddingPage({
  searchParams,
}: {
  searchParams?: { template?: string };
}) {
  const session = await auth();
  if (!session?.user?.id) {
    const callback = searchParams?.template
      ? `/dashboard/weddings/new?template=${searchParams.template}`
      : "/dashboard/weddings/new";
    redirect(`/login?callbackUrl=${encodeURIComponent(callback)}`);
  }

  const templates = await prisma.template.findMany({
    orderBy: [{ price: "asc" }, { name: "asc" }],
  });
  const templatesForClient = JSON.parse(JSON.stringify(templates));

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Tạo Thiệp Cưới Mới</h1>
      <p className="text-gray-500 mb-8">
        Chọn mẫu thiệp, nhập thông tin và xem trước thiệp cưới thực tế của bạn.
      </p>
      <NewWeddingWizard
        templates={templatesForClient}
        initialTemplateSlug={searchParams?.template}
      />
    </div>
  );
}
