"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  Tag,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Edit3,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

type TemplateRow = {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
  category: string;
  description: string;
  config?: {
    sections?: string[];
    defaultColors?: {
      primary?: string;
      accent?: string;
      background?: string;
    };
  };
  price: number;
  salePrice: number | null;
  saleStartsAt: string | null;
  saleEndsAt: string | null;
  _count?: {
    weddings: number;
  };
};

type Props = {
  templates: TemplateRow[];
  registeredSlugs: string[];
};

function toDateInputValue(iso: string | null): string {
  if (!iso) return "";
  return iso.slice(0, 10);
}

function isSaleActive(t: TemplateRow): boolean {
  if (!t.salePrice) return false;
  const now = new Date();
  if (t.saleStartsAt && new Date(t.saleStartsAt) > now) return false;
  if (t.saleEndsAt && new Date(t.saleEndsAt) <= now) return false;
  return true;
}

export function AdminTemplateList({ templates, registeredSlugs }: Props) {
  const router = useRouter();
  const { toast } = useToast();

  const [priceDrafts, setPriceDrafts] = useState<Record<string, string>>(
    Object.fromEntries(templates.map((t) => [t.id, String(t.price)]))
  );
  const [savingPriceId, setSavingPriceId] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);

  // Dialogs
  const [saleDialogFor, setSaleDialogFor] = useState<TemplateRow | null>(null);
  const [editDialogFor, setEditDialogFor] = useState<TemplateRow | null>(null);

  // Edit form state
  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    thumbnail: "",
    description: "",
    primaryColor: "",
    accentColor: "",
    backgroundColor: "",
  });
  const [savingEdit, setSavingEdit] = useState(false);

  async function handleSync() {
    setSyncing(true);
    try {
      const res = await fetch("/api/admin/templates/sync", {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        toast({
          title: "Đồng bộ thành công!",
          description: `Đã cập nhật ${data.count} mẫu thiệp vào cơ sở dữ liệu.`,
        });
        router.refresh();
      } else {
        toast({
          title: "Lỗi đồng bộ",
          description: data.error,
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Lỗi hệ thống khi đồng bộ",
        variant: "destructive",
      });
    }
    setSyncing(false);
  }

  async function savePrice(id: string) {
    const raw = priceDrafts[id];
    const price = Number(raw);
    if (!Number.isFinite(price) || price < 0) {
      toast({ title: "Giá không hợp lệ", variant: "destructive" });
      return;
    }
    setSavingPriceId(id);
    try {
      const res = await fetch(`/api/admin/templates/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price }),
      });
      if (res.ok) {
        toast({ title: "Đã lưu giá" });
        router.refresh();
      } else {
        const err = await res.json();
        toast({ title: "Lỗi", description: err.error, variant: "destructive" });
      }
    } catch {
      toast({ title: "Lỗi", variant: "destructive" });
    }
    setSavingPriceId(null);
  }

  function openEditModal(t: TemplateRow) {
    setEditDialogFor(t);
    setEditForm({
      name: t.name,
      category: t.category,
      thumbnail: t.thumbnail,
      description: t.description,
      primaryColor: t.config?.defaultColors?.primary || "#800020",
      accentColor: t.config?.defaultColors?.accent || "#d4a853",
      backgroundColor: t.config?.defaultColors?.background || "#faf8f5",
    });
  }

  async function handleSaveEdit() {
    if (!editDialogFor) return;
    setSavingEdit(true);
    try {
      const res = await fetch(`/api/admin/templates/${editDialogFor.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editForm.name,
          category: editForm.category,
          thumbnail: editForm.thumbnail,
          description: editForm.description,
          config: {
            ...editDialogFor.config,
            defaultColors: {
              primary: editForm.primaryColor,
              accent: editForm.accentColor,
              background: editForm.backgroundColor,
            },
          },
        }),
      });

      if (res.ok) {
        toast({ title: "Đã cập nhật thông tin mẫu thiệp!" });
        setEditDialogFor(null);
        router.refresh();
      } else {
        const data = await res.json();
        toast({ title: "Lỗi", description: data.error, variant: "destructive" });
      }
    } catch {
      toast({ title: "Lỗi cập nhật", variant: "destructive" });
    }
    setSavingEdit(false);
  }

  return (
    <div className="space-y-6">
      {/* Top action toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
        <div>
          <p className="text-sm font-semibold text-gray-900">
            Tổng cộng: {templates.length} mẫu thiệp trong DB
          </p>
          <p className="text-xs text-gray-500">
            {templates.filter((t) => registeredSlugs.includes(t.slug)).length} / {templates.length} mẫu đã kết nối đầy đủ Component.
          </p>
        </div>

        <Button
          onClick={handleSync}
          disabled={syncing}
          className="bg-winglove-red hover:bg-winglove-red-deep text-white text-xs flex items-center gap-2 shadow-xs"
        >
          {syncing ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <RefreshCw className="w-3.5 h-3.5" />
          )}
          <span>{syncing ? "Đang đồng bộ..." : "Đồng bộ từ Registry"}</span>
        </Button>
      </div>

      {/* Templates List */}
      <div className="space-y-3">
        {templates.map((t) => {
          const onSale = isSaleActive(t);
          const isConnected = registeredSlugs.includes(t.slug);
          const weddingCount = t._count?.weddings || 0;

          return (
            <Card key={t.id} className="transition-shadow hover:shadow-md border border-amber-900/10 rounded-xl bg-white shadow-xs">
              <CardContent className="pt-4 pb-4 flex flex-wrap items-center gap-4">
                {/* Thumbnail */}
                <div className="w-16 h-20 rounded-lg bg-stone-100 overflow-hidden shrink-0 border border-stone-200/80 shadow-xs relative">
                  {t.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={t.thumbnail} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                      No img
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-900 truncate">{t.name}</p>
                    <Badge variant="outline" className="text-[10px] uppercase font-mono">
                      {t.category}
                    </Badge>
                    {isConnected ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Component: Đã kết nối
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                        <AlertCircle className="w-3 h-3 text-rose-600" /> Chưa có component
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-500 line-clamp-1 mb-1.5">{t.description}</p>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    <span>Slug: <code className="text-stone-800 font-mono">{t.slug}</code></span>
                    <span>•</span>
                    <span className="font-medium text-stone-700">{weddingCount} thiệp đang dùng</span>
                    {isConnected && (
                      <>
                        <span>•</span>
                        <Link
                          href={`/templates?preview=${t.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-primary hover:underline"
                        >
                          <ExternalLink className="w-3 h-3" /> Xem Demo
                        </Link>
                      </>
                    )}
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <div className="flex items-center gap-1">
                    <Input
                      type="number"
                      step={10000}
                      className="w-28 text-sm font-semibold h-9"
                      value={priceDrafts[t.id] ?? ""}
                      onChange={(e) =>
                        setPriceDrafts({ ...priceDrafts, [t.id]: e.target.value })
                      }
                    />
                    <span className="text-xs text-gray-500">₫</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-9 text-xs"
                      disabled={
                        savingPriceId === t.id ||
                        priceDrafts[t.id] === String(t.price)
                      }
                      onClick={() => savePrice(t.id)}
                    >
                      {savingPriceId === t.id ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        "Lưu giá"
                      )}
                    </Button>
                  </div>

                  <Button
                    size="sm"
                    variant={onSale ? "default" : "outline"}
                    className={
                      onSale
                        ? "bg-amber-600 hover:bg-amber-700 text-white h-9 text-xs"
                        : "h-9 text-xs"
                    }
                    onClick={() => setSaleDialogFor(t)}
                  >
                    {onSale ? (
                      <Sparkles className="w-3.5 h-3.5 mr-1" />
                    ) : (
                      <Tag className="w-3.5 h-3.5 mr-1" />
                    )}
                    {onSale
                      ? `${t.salePrice?.toLocaleString("vi-VN")}₫`
                      : "Khuyến mãi"}
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-9 px-2 text-gray-600 hover:text-gray-900"
                    onClick={() => openEditModal(t)}
                    title="Chỉnh sửa chi tiết"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Sale Dialog */}
      {saleDialogFor && (
        <SaleEditDialog
          template={saleDialogFor}
          open={!!saleDialogFor}
          onOpenChange={(o) => {
            if (!o) setSaleDialogFor(null);
          }}
          onSaved={() => {
            setSaleDialogFor(null);
            router.refresh();
          }}
        />
      )}

      {/* Full Edit Modal */}
      {editDialogFor && (
        <Dialog
          open={!!editDialogFor}
          onOpenChange={(o) => {
            if (!o) setEditDialogFor(null);
          }}
        >
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">
                Chỉnh sửa Mẫu Thiệp: {editDialogFor.name}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div>
                <label className="text-xs font-semibold text-gray-700">Tên mẫu thiệp *</label>
                <Input
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="mt-1 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700">Danh mục (Category)</label>
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full mt-1 px-3 py-2 text-sm border rounded-md bg-white border-gray-200"
                  >
                    <option value="classic">Classic</option>
                    <option value="modern">Modern</option>
                    <option value="minimal">Minimal</option>
                    <option value="luxury">Luxury</option>
                    <option value="vintage">Vintage</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700">Slug (Không thể đổi)</label>
                  <Input
                    value={editDialogFor.slug}
                    disabled
                    className="mt-1 text-sm bg-gray-50 text-gray-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700">URL Thumbnail Preview</label>
                <Input
                  value={editForm.thumbnail}
                  onChange={(e) => setEditForm({ ...editForm, thumbnail: e.target.value })}
                  className="mt-1 text-sm"
                  placeholder="/templates/sample-preview.png"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700">Mô tả mẫu</label>
                <Textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="mt-1 text-sm"
                  rows={3}
                />
              </div>

              {/* Color Configuration */}
              <div className="border-t border-gray-100 pt-3">
                <p className="text-xs font-semibold text-gray-800 mb-2">Bảng màu mặc định (Hex code)</p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-gray-500">Màu chính</label>
                    <div className="flex items-center gap-1.5 mt-1">
                      <input
                        type="color"
                        value={editForm.primaryColor}
                        onChange={(e) => setEditForm({ ...editForm, primaryColor: e.target.value })}
                        className="w-7 h-7 rounded border border-gray-300 cursor-pointer p-0.5"
                      />
                      <Input
                        value={editForm.primaryColor}
                        onChange={(e) => setEditForm({ ...editForm, primaryColor: e.target.value })}
                        className="text-xs font-mono h-8"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500">Màu nhấn</label>
                    <div className="flex items-center gap-1.5 mt-1">
                      <input
                        type="color"
                        value={editForm.accentColor}
                        onChange={(e) => setEditForm({ ...editForm, accentColor: e.target.value })}
                        className="w-7 h-7 rounded border border-gray-300 cursor-pointer p-0.5"
                      />
                      <Input
                        value={editForm.accentColor}
                        onChange={(e) => setEditForm({ ...editForm, accentColor: e.target.value })}
                        className="text-xs font-mono h-8"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500">Màu nền</label>
                    <div className="flex items-center gap-1.5 mt-1">
                      <input
                        type="color"
                        value={editForm.backgroundColor}
                        onChange={(e) => setEditForm({ ...editForm, backgroundColor: e.target.value })}
                        className="w-7 h-7 rounded border border-gray-300 cursor-pointer p-0.5"
                      />
                      <Input
                        value={editForm.backgroundColor}
                        onChange={(e) => setEditForm({ ...editForm, backgroundColor: e.target.value })}
                        className="text-xs font-mono h-8"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setEditDialogFor(null)}
                disabled={savingEdit}
              >
                Hủy
              </Button>
              <Button
                onClick={handleSaveEdit}
                disabled={savingEdit}
                className="bg-primary text-white"
              >
                {savingEdit ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : null}
                Lưu Thay Đổi
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function SaleEditDialog({
  template,
  open,
  onOpenChange,
  onSaved,
}: {
  template: TemplateRow;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
}) {
  const { toast } = useToast();
  const [salePrice, setSalePrice] = useState<string>(
    template.salePrice !== null ? String(template.salePrice) : ""
  );
  const [startsAt, setStartsAt] = useState<string>(
    toDateInputValue(template.saleStartsAt)
  );
  const [endsAt, setEndsAt] = useState<string>(
    toDateInputValue(template.saleEndsAt)
  );
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    const trimmed = salePrice.trim();
    const priceNum = trimmed === "" ? null : Number(trimmed);

    if (priceNum !== null) {
      if (!Number.isFinite(priceNum) || priceNum < 0) {
        toast({ title: "Giá khuyến mãi không hợp lệ", variant: "destructive" });
        return;
      }
      if (priceNum >= template.price) {
        toast({
          title: "Giá khuyến mãi phải nhỏ hơn giá gốc",
          description: `Giá gốc hiện tại: ${template.price.toLocaleString("vi-VN")}₫`,
          variant: "destructive",
        });
        return;
      }
    }

    if (startsAt && endsAt && new Date(endsAt) <= new Date(startsAt)) {
      toast({
        title: "Ngày kết thúc phải sau ngày bắt đầu",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/templates/${template.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          salePrice: priceNum,
          saleStartsAt: startsAt ? new Date(startsAt).toISOString() : null,
          saleEndsAt: endsAt ? new Date(endsAt).toISOString() : null,
        }),
      });
      if (res.ok) {
        toast({ title: "Đã cập nhật khuyến mãi" });
        onSaved();
      } else {
        const err = await res.json();
        toast({ title: "Lỗi", description: err.error, variant: "destructive" });
      }
    } catch {
      toast({ title: "Lỗi", variant: "destructive" });
    }
    setLoading(false);
  }

  async function handleRemoveSale() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/templates/${template.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          salePrice: null,
          saleStartsAt: null,
          saleEndsAt: null,
        }),
      });
      if (res.ok) {
        toast({ title: "Đã xoá khuyến mãi" });
        onSaved();
      }
    } catch {
      toast({ title: "Lỗi", variant: "destructive" });
    }
    setLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Khuyến mãi: {template.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <p className="text-xs text-gray-500">
            Giá gốc hiện tại:{" "}
            <span className="font-semibold text-gray-900">
              {template.price.toLocaleString("vi-VN")}₫
            </span>
          </p>

          <div>
            <label className="text-xs font-medium text-gray-700">
              Giá khuyến mãi (VND)
            </label>
            <Input
              type="number"
              step={10000}
              placeholder="Để trống để tắt KM"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-700">
                Bắt đầu từ (tuỳ chọn)
              </label>
              <Input
                type="date"
                value={startsAt}
                onChange={(e) => setStartsAt(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700">
                Kết thúc lúc (tuỳ chọn)
              </label>
              <Input
                type="date"
                value={endsAt}
                onChange={(e) => setEndsAt(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="flex items-center justify-between sm:justify-between">
          {template.salePrice !== null ? (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              disabled={loading}
              onClick={handleRemoveSale}
            >
              Xoá KM
            </Button>
          ) : (
            <div />
          )}
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              Huỷ
            </Button>
            <Button
              type="button"
              size="sm"
              disabled={loading}
              onClick={handleSave}
            >
              {loading && <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />}
              Lưu
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
