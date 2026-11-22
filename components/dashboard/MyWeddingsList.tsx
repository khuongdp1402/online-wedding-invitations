"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Heart,
  Plus,
  Eye,
  MessageSquare,
  Users,
  ExternalLink,
  Settings,
  Copy,
  Search,
  Check,
  Sparkles,
} from "lucide-react";

export type WeddingItem = {
  id: string;
  slug: string;
  groomName: string;
  brideName: string;
  status: string;
  plan: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  expiresAt: string | null;
  template: {
    name: string;
    slug: string;
    category?: string;
    thumbnail?: string;
  };
  _count: {
    wishes: number;
    guests: number;
  };
};

const statusLabels: Record<
  string,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  DRAFT: { label: "Bản nháp", variant: "secondary" },
  DEMO: { label: "Demo xem thử", variant: "outline" },
  PUBLISHED: { label: "Đã xuất bản", variant: "default" },
  EXPIRED: { label: "Hết hạn", variant: "destructive" },
};

const planLabels: Record<string, string> = {
  FREE: "Miễn phí",
  BASIC: "Cơ bản",
  STANDARD: "Tiêu chuẩn",
  PREMIUM: "Cao cấp",
};

export function MyWeddingsList({ weddings }: { weddings: WeddingItem[] }) {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const filteredWeddings = weddings.filter((w) => {
    const matchSearch =
      w.groomName.toLowerCase().includes(search.toLowerCase()) ||
      w.brideName.toLowerCase().includes(search.toLowerCase()) ||
      w.slug.toLowerCase().includes(search.toLowerCase()) ||
      w.template.name.toLowerCase().includes(search.toLowerCase());

    if (!matchSearch) return false;

    if (filterStatus === "ALL") return true;
    return w.status === filterStatus;
  });

  const handleCopyLink = (slug: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const url = `${origin}/w/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    toast({
      title: "Đã sao chép liên kết thiệp!",
      description: url,
    });
    setTimeout(() => setCopiedSlug(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Tìm theo tên cô dâu, chú rể, mẫu thiệp..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-white border-amber-900/10 focus-visible:ring-[#8C1C24]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <Button
            size="sm"
            variant={filterStatus === "ALL" ? "default" : "outline"}
            onClick={() => setFilterStatus("ALL")}
            className={filterStatus === "ALL" ? "bg-[#8C1C24] hover:bg-[#70161D] text-white" : "text-stone-600"}
          >
            Tất cả ({weddings.length})
          </Button>
          <Button
            size="sm"
            variant={filterStatus === "PUBLISHED" ? "default" : "outline"}
            onClick={() => setFilterStatus("PUBLISHED")}
            className={filterStatus === "PUBLISHED" ? "bg-[#8C1C24] hover:bg-[#70161D] text-white" : "text-stone-600"}
          >
            Đã xuất bản
          </Button>
          <Button
            size="sm"
            variant={filterStatus === "DRAFT" ? "default" : "outline"}
            onClick={() => setFilterStatus("DRAFT")}
            className={filterStatus === "DRAFT" ? "bg-[#8C1C24] hover:bg-[#70161D] text-white" : "text-stone-600"}
          >
            Bản nháp
          </Button>
        </div>
      </div>

      {/* Grid of Weddings */}
      {filteredWeddings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWeddings.map((wedding) => {
            const st = statusLabels[wedding.status] || statusLabels.DRAFT;
            return (
              <Card
                key={wedding.id}
                className="bg-white border-amber-900/10 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden"
              >
                <CardHeader className="pb-3 border-b border-stone-100 bg-[#FAF7F2]/50">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg font-serif font-bold text-stone-900 truncate">
                        {wedding.groomName} & {wedding.brideName}
                      </CardTitle>
                      <p className="text-xs text-stone-500 mt-1 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                        <span>Mẫu: {wedding.template.name}</span>
                      </p>
                    </div>
                    <Badge
                      variant={st.variant}
                      className={
                        wedding.status === "PUBLISHED"
                          ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                          : wedding.status === "DRAFT"
                          ? "bg-stone-100 text-stone-700 border-stone-200"
                          : ""
                      }
                    >
                      {st.label}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-4 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5 text-xs text-stone-600">
                    <div className="flex items-center justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-400">Gói dịch vụ</span>
                      <span className="font-semibold text-stone-700">
                        {planLabels[wedding.plan] || wedding.plan}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-400">Đường dẫn thiệp</span>
                      <span className="font-mono text-stone-800 bg-stone-100 px-1.5 py-0.5 rounded text-[11px] truncate max-w-[170px]">
                        /w/{wedding.slug}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                      <div className="p-2 rounded bg-[#FAF7F2] border border-amber-900/5">
                        <p className="text-stone-400 text-[10px]">Lượt xem</p>
                        <p className="font-bold text-stone-800 text-sm mt-0.5 flex items-center justify-center gap-1">
                          <Eye className="w-3 h-3 text-stone-400" />
                          {wedding.viewCount}
                        </p>
                      </div>
                      <div className="p-2 rounded bg-[#FAF7F2] border border-amber-900/5">
                        <p className="text-stone-400 text-[10px]">Lời chúc</p>
                        <p className="font-bold text-stone-800 text-sm mt-0.5 flex items-center justify-center gap-1">
                          <MessageSquare className="w-3 h-3 text-stone-400" />
                          {wedding._count.wishes}
                        </p>
                      </div>
                      <div className="p-2 rounded bg-[#FAF7F2] border border-amber-900/5">
                        <p className="text-stone-400 text-[10px]">Khách mời</p>
                        <p className="font-bold text-stone-800 text-sm mt-0.5 flex items-center justify-center gap-1">
                          <Users className="w-3 h-3 text-stone-400" />
                          {wedding._count.guests}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="flex-1 text-xs border-amber-900/15 hover:bg-[#FAF7F2] hover:text-[#8C1C24]"
                      >
                        <Link href={`/dashboard/weddings/${wedding.id}`}>
                          <Settings className="w-3.5 h-3.5 mr-1.5 text-stone-500" />
                          Quản lý & Sửa
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="flex-1 text-xs border-amber-900/15 hover:bg-[#FAF7F2] hover:text-[#8C1C24]"
                      >
                        <Link href={`/w/${wedding.slug}`} target="_blank">
                          <ExternalLink className="w-3.5 h-3.5 mr-1.5 text-stone-500" />
                          Xem trực tiếp
                        </Link>
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyLink(wedding.slug)}
                      className="w-full text-xs text-stone-500 hover:text-stone-800 hover:bg-[#FAF7F2] h-7"
                    >
                      {copiedSlug === wedding.slug ? (
                        <>
                          <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                          <span className="text-emerald-700 font-medium">Đã sao chép link</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 mr-1.5" />
                          <span>Sao chép link gửi khách</span>
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="border-dashed border-2 border-stone-200 bg-white">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-[#8C1C24]" />
            </div>
            <h3 className="text-lg font-serif font-bold text-stone-900 mb-2">
              {search || filterStatus !== "ALL"
                ? "Không tìm thấy thiệp cưới phù hợp"
                : "Chưa có thiệp cưới nào"}
            </h3>
            <p className="text-stone-500 text-sm max-w-md mb-6">
              {search || filterStatus !== "ALL"
                ? "Hãy thử thay đổi từ khóa tìm kiếm hoặc bỏ chọn bộ lọc trạng thái."
                : "Tạo thiệp cưới online cao cấp của bạn chỉ trong vài phút với các mẫu thiết kế tinh tế của Winglove."}
            </p>
            <Link href="/dashboard/weddings/new">
              <Button className="bg-[#8C1C24] hover:bg-[#70161D] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Tạo Thiệp Cưới Mới
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
