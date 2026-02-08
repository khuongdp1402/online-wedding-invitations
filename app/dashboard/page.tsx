import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Plus, Eye, MessageSquare, ExternalLink, Settings } from "lucide-react";
import Link from "next/link";

const statusLabels: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  DRAFT: { label: "Nháp", variant: "secondary" },
  DEMO: { label: "Demo", variant: "outline" },
  PUBLISHED: { label: "Đã xuất bản", variant: "default" },
  EXPIRED: { label: "Hết hạn", variant: "destructive" },
};

const planLabels: Record<string, string> = {
  FREE: "Miễn phí",
  BASIC: "Cơ bản",
  STANDARD: "Tiêu chuẩn",
  PREMIUM: "Cao cấp",
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const weddings = await prisma.wedding.findMany({
    where: { userId: session.user.id },
    include: {
      template: { select: { name: true, slug: true } },
      _count: { select: { wishes: true, guests: true } },
    },
    orderBy: { updatedAt: "desc" },
  });

  const totalViews = weddings.reduce((sum, w) => sum + w.viewCount, 0);
  const totalWishes = weddings.reduce((sum, w) => sum + w._count.wishes, 0);
  const publishedCount = weddings.filter((w) => w.status === "PUBLISHED").length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tổng Quan</h1>
          <p className="text-gray-500 mt-1">
            Xin chào, {session.user.name || "bạn"}!
          </p>
        </div>
        <Link href="/dashboard/weddings/new">
          <Button className="bg-rose-600 hover:bg-rose-700">
            <Plus className="w-4 h-4 mr-2" />
            Tạo Thiệp Mới
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Tổng Thiệp</CardTitle>
            <Heart className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weddings.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Đã Xuất Bản</CardTitle>
            <Badge variant="secondary" className="bg-green-100 text-green-700">Active</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Lượt Xem</CardTitle>
            <Eye className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Lời Chúc</CardTitle>
            <MessageSquare className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWishes}</div>
          </CardContent>
        </Card>
      </div>

      {/* Wedding List */}
      {weddings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {weddings.map((wedding) => {
            const st = statusLabels[wedding.status] || statusLabels.DRAFT;
            return (
              <Card key={wedding.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg truncate">
                        {wedding.groomName} & {wedding.brideName}
                      </CardTitle>
                      <p className="text-sm text-gray-500 mt-1">
                        {wedding.template.name}
                      </p>
                    </div>
                    <Badge variant={st.variant}>{st.label}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Gói</span>
                      <span className="font-medium">{planLabels[wedding.plan]}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Lượt xem</span>
                      <span className="font-medium">{wedding.viewCount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Lời chúc</span>
                      <span className="font-medium">{wedding._count.wishes}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Khách mời</span>
                      <span className="font-medium">{wedding._count.guests}</span>
                    </div>

                    <div className="pt-3 border-t flex gap-2">
                      <Link href={`/dashboard/weddings/${wedding.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          <Settings className="w-3.5 h-3.5 mr-1.5" />
                          Quản lý
                        </Button>
                      </Link>
                      <Link href={`/w/${wedding.slug}`} target="_blank" className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                          Xem thiệp
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-rose-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Chưa có thiệp cưới nào</h3>
            <p className="text-gray-500 text-center mb-6 max-w-sm">
              Bắt đầu tạo thiệp cưới online đầu tiên của bạn. Chọn mẫu thiệp, nhập thông tin và chia sẻ với khách mời.
            </p>
            <Link href="/dashboard/weddings/new">
              <Button className="bg-rose-600 hover:bg-rose-700">
                <Plus className="w-4 h-4 mr-2" />
                Tạo Thiệp Đầu Tiên
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
