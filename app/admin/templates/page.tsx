import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { hasPermission } from "@/lib/permissions";
import { AdminTemplateList } from "./AdminTemplateList";
import { templates as registryTemplates } from "@/lib/template-registry";

export default async function AdminTemplatesPage() {
  const session = await auth();
  if (!session?.user || !hasPermission(session.user, "MANAGE_TEMPLATES")) {
    redirect("/admin");
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
    <div className="space-y-6">
      <AdminTemplateList
        templates={JSON.parse(JSON.stringify(dbTemplates))}
        registeredSlugs={registeredSlugs}
      />
    </div>
  );
}
