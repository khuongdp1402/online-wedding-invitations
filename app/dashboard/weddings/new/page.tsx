import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NewWeddingWizard } from "@/components/dashboard/NewWeddingWizard";
import { TEMPLATE_DEFS } from "@/prisma/template-defs.cjs";

const SLUG_ORDER = new Map<string, number>(
  (TEMPLATE_DEFS as Array<{ slug: string }>).map((t, idx) => [t.slug, idx])
);

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

  const rows = await prisma.template.findMany();
  const templates = rows.sort(
    (a, b) =>
      (SLUG_ORDER.get(a.slug) ?? 9999) - (SLUG_ORDER.get(b.slug) ?? 9999)
  );
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
