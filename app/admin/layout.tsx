import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Toaster } from "@/components/ui/toaster";
import { canAccessAdmin } from "@/lib/permissions";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user || !canAccessAdmin(session.user)) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 font-sans">
      <Sidebar isAdmin={true} />
      <div className="lg:pl-72">
        <main className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <AdminHeader
            userRole={session.user.role}
            userName={session.user.name}
            userEmail={session.user.email}
          />
          {children}
        </main>
      </div>
      <Toaster />
    </div>
  );
}
