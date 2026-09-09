import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { hasPermission } from "@/lib/permissions";
import { AdminUserList, type UserRow } from "./AdminUserList";

export default async function AdminUsersPage() {
  const session = await auth();
  if (!session?.user || !hasPermission(session.user, "MANAGE_USERS")) {
    redirect("/admin");
  }

  const dbUsers = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      permissions: true,
      createdAt: true,
      _count: {
        select: {
          weddings: true,
          contactRequests: true,
        },
      },
    },
  });

  const formattedUsers: UserRow[] = (dbUsers as unknown as UserRow[]).map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    permissions: u.permissions || [],
    createdAt: new Date(u.createdAt).toISOString(),
    _count: u._count || { weddings: 0, contactRequests: 0 },
  }));

  return (
    <div className="space-y-6">
      <AdminUserList
        initialUsers={formattedUsers}
        currentUserId={session.user.id}
      />
    </div>
  );
}
