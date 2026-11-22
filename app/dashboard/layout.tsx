import { Toaster } from "@/components/ui/toaster";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { auth } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 font-sans">
      <Sidebar
        isAdmin={session?.user?.role === "ADMIN" || session?.user?.role === "STAFF"}
        role={session?.user?.role}
        permissions={session?.user?.permissions}
        userName={session?.user?.name}
        userEmail={session?.user?.email}
      />
      <div className="lg:pl-72">
        <main className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">{children}</main>
      </div>
      <Toaster />
    </div>
  );
}
