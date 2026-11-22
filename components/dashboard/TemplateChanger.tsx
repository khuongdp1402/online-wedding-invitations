"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Check, Loader2, ArrowLeft, Search, Eye } from "lucide-react";
import Link from "next/link";

type Template = {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  category: string;
  price: number;
};

type Props = {
  weddingId: string;
  currentTemplateId: string;
  templates: Template[];
};

const CATEGORIES = [
  { id: "ALL", label: "Tất cả" },
  { id: "MINIMAL", label: "Hiện đại / Tối giản" },
  { id: "LUXURY", label: "Sang trọng" },
  { id: "ROMANTIC", label: "Lãng mạn / Hoa" },
  { id: "TRADITIONAL", label: "Truyền thống" },
];

export function TemplateChanger({ weddingId, currentTemplateId, templates }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [selected, setSelected] = useState(currentTemplateId);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");

  const filteredTemplates = useMemo(() => {
    return templates.filter((t) => {
      if (category !== "ALL" && t.category !== category) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        return (
          t.name.toLowerCase().includes(q) ||
          t.slug.toLowerCase().includes(q) ||
          (t.description || "").toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [templates, category, search]);

  async function handleSave() {
    if (selected === currentTemplateId) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/weddings/${weddingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId: selected }),
      });
      if (res.ok) {
        toast({
          title: "Đã đổi mẫu thiệp thành công!",
          description: "Toàn bộ thông tin cô dâu chú rể của bạn được giữ nguyên.",
        });
        router.push(`/dashboard/weddings/${weddingId}/edit`);
        router.refresh();
        return;
      }

      const err = await res.json();

      if (res.status === 402 && err.requiresPayment) {
        toast({
          title: "Cần thanh toán phần chênh lệch",
          description: `Mẫu này đắt hơn ${Number(err.amount).toLocaleString("vi-VN")}đ so với mẫu hiện tại. Vui lòng liên hệ hỗ trợ để đổi mẫu.`,
          variant: "destructive",
        });
        setSaving(false);
        return;
      }

      toast({ title: "Lỗi", description: err.error, variant: "destructive" });
    } catch {
      toast({ title: "Lỗi", variant: "destructive" });
    }
    setSaving(false);
  }

  return (
    <div className="space-y-6">
      {/* Top sticky action bar */}
      <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white/95 p-4 backdrop-blur shadow-xs">
        <div className="flex items-center gap-3">
          <Link href={`/dashboard/weddings/${weddingId}/edit`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-1.5" /> Quay lại chỉnh sửa
            </Button>
          </Link>
          <span className="text-sm text-gray-600">
            Hiển thị <strong>{filteredTemplates.length}</strong> mẫu thiệp
          </span>
        </div>

        <Button
          onClick={handleSave}
          disabled={saving || selected === currentTemplateId}
          className="bg-rose-600 hover:bg-rose-700"
        >
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-2" />}
          {saving ? "Đang áp dụng..." : "Áp Dụng Mẫu Đã Chọn"}
        </Button>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên mẫu thiệp..."
            className="pl-9 bg-white"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                category === c.id
                  ? "bg-rose-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredTemplates.map((t) => (
          <Card
            key={t.id}
            className={`cursor-pointer transition-all hover:shadow-lg overflow-hidden ${
              selected === t.id
                ? "ring-2 ring-rose-500 shadow-lg"
                : "hover:ring-1 hover:ring-gray-200"
            }`}
            onClick={() => setSelected(t.id)}
          >
            <CardContent className="p-3">
              <div className="aspect-[3/4] rounded-lg bg-gradient-to-br from-rose-50 to-amber-50 mb-3 overflow-hidden relative group">
                {t.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={t.thumbnail}
                    alt={t.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-3 text-center">
                    <p className="font-serif text-sm font-semibold text-gray-600">{t.name}</p>
                  </div>
                )}
                {selected === t.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-rose-600 rounded-full flex items-center justify-center shadow">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
                {currentTemplateId === t.id && (
                  <Badge className="absolute top-2 left-2 bg-emerald-600 hover:bg-emerald-600 text-white text-[10px]">
                    Đang dùng
                  </Badge>
                )}
                <Link
                  href={`/templates/${t.slug}`}
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                  className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-black/65 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Eye className="w-3 h-3" /> Xem mẫu
                </Link>
              </div>
              <h3 className="font-semibold text-sm text-gray-900 truncate">{t.name}</h3>
              <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{t.description}</p>
              <p className="text-xs font-semibold text-rose-600 mt-1.5">
                {t.price.toLocaleString("vi-VN")}đ
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
