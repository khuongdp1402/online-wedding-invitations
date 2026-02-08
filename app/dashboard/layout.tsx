import { Toaster } from "@/components/ui/toaster";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:pl-72">
        <main className="py-8 px-4 sm:px-6 lg:px-8">{children}</main>
      </div>
      <Toaster />
    </div>
  );
}
