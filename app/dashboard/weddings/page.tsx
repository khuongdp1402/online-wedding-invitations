import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, ScrollText } from "lucide-react";
import { MyWeddingsList, type WeddingItem } from "@/components/dashboard/MyWeddingsList";

export default async function WeddingsPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/dashboard/weddings");
  }

  const dbWeddings = await prisma.wedding.findMany({
    where: { userId: session.user.id },
    include: {
      template: {
        select: {
          name: true,
          slug: true,
          category: true,
          thumbnail: true,
        },
      },
      _count: {
        select: {
          wishes: true,
          guests: true,
        },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  const weddings: WeddingItem[] = JSON.parse(JSON.stringify(dbWeddings));

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ScrollText className="w-5 h-5 text-[#8C1C24]" />
            <h1 className="text-2xl font-serif font-bold text-stone-900">
              Thiệp Của Tôi
            </h1>
          </div>
          <p className="text-sm text-stone-500">
            Quản lý các thiệp cưới online bạn đã tạo, chỉnh sửa nội dung và chia sẻ tới người thân, bạn bè.
          </p>
        </div>
        <Button asChild className="bg-[#8C1C24] hover:bg-[#70161D] text-white shrink-0">
          <Link href="/dashboard/weddings/new">
            <Plus className="w-4 h-4 mr-2" />
            Tạo Thiệp Mới
          </Link>
        </Button>
      </div>

      {/* Wedding List */}
      <MyWeddingsList weddings={weddings} />
    </div>
  );
}
