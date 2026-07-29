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
    <div className="min-h-screen bg-gray-50">
      <Sidebar isAdmin={session?.user?.role === "ADMIN"} />
      <div className="lg:pl-72">
        <main className="py-8 px-4 sm:px-6 lg:px-8">{children}</main>
      </div>
      <Toaster />
    </div>
  );
}
