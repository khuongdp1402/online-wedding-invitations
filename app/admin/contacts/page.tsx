import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { hasPermission } from "@/lib/permissions";
import { AdminContactList } from "../AdminContactList";

export default async function AdminContactsPage() {
  const session = await auth();
  if (!session?.user || !hasPermission(session.user, "MANAGE_CONTACTS")) {
    redirect("/admin");
  }

  const contacts = await prisma.contactRequest.findMany({
    take: 100,
    orderBy: { createdAt: "desc" },
    include: {
      wedding: { select: { slug: true, groomName: true, brideName: true } },
    },
  });

  const contactsForClient = contacts.map((c) => ({
    id: c.id,
    name: c.name,
    phone: c.phone,
    message: c.message,
    status: c.status,
    context: c.context,
    wedding: c.wedding,
    createdAt: c.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <AdminContactList contacts={contactsForClient} />
    </div>
  );
}
