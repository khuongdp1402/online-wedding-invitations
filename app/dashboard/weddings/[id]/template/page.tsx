import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import { TemplateChanger } from "@/components/dashboard/TemplateChanger";

export default async function TemplatePage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const wedding = await prisma.wedding.findFirst({
    where: { id: params.id, userId: session.user.id },
    select: { id: true, templateId: true, groomName: true, brideName: true },
  });

  if (!wedding) notFound();

  const templates = await prisma.template.findMany({
    orderBy: [{ isPremium: "asc" }, { name: "asc" }],
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Đổi Mẫu Thiệp</h1>
      <p className="text-gray-500 mb-8">
        {wedding.groomName} & {wedding.brideName}
      </p>
      <TemplateChanger
        weddingId={wedding.id}
        currentTemplateId={wedding.templateId}
        templates={JSON.parse(JSON.stringify(templates))}
      />
    </div>
  );
}
