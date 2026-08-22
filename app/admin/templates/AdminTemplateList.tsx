"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Tag, Sparkles } from "lucide-react";

type TemplateRow = {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
  category: string;
  price: number;
  salePrice: number | null;
  saleStartsAt: string | null;
  saleEndsAt: string | null;
};

type Props = {
  templates: TemplateRow[];
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

export function AdminTemplateList({ templates }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [priceDrafts, setPriceDrafts] = useState<Record<string, string>>(
    Object.fromEntries(templates.map((t) => [t.id, String(t.price)]))
  );
  const [savingPriceId, setSavingPriceId] = useState<string | null>(null);
  const [saleDialogFor, setSaleDialogFor] = useState<TemplateRow | null>(null);

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

  return (
    <div className="space-y-3">
      {templates.map((t) => {
        const onSale = isSaleActive(t);
        return (
          <Card key={t.id}>
            <CardContent className="pt-4 pb-4 flex flex-wrap items-center gap-4">
              <div className="w-14 h-14 rounded-md bg-gray-100 overflow-hidden shrink-0">
                {t.thumbnail && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={t.thumbnail} alt="" className="w-full h-full object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-900 truncate">{t.name}</p>
                  <Badge variant="outline" className="text-[10px]">{t.category}</Badge>
                  {onSale && (
                    <Badge className="text-[10px] bg-amber-500 hover:bg-amber-500">
                      <Sparkles className="w-3 h-3 mr-1" /> Đang khuyến mãi
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-gray-400">/{t.slug}</p>
                {onSale && (
                  <p className="text-xs text-emerald-600 mt-1">
                    Giá khuyến mãi: {t.salePrice!.toLocaleString("vi-VN")}đ
                    {t.saleEndsAt && ` · đến ${new Date(t.saleEndsAt).toLocaleDateString("vi-VN")}`}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Input
                    type="number"
                    min={0}
                    value={priceDrafts[t.id] ?? ""}
                    onChange={(e) =>
                      setPriceDrafts((prev) => ({ ...prev, [t.id]: e.target.value }))
                    }
                    className="w-32 h-9"
                  />
                  <span className="text-sm text-gray-500">đ</span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={savingPriceId === t.id || priceDrafts[t.id] === String(t.price)}
                  onClick={() => savePrice(t.id)}
                >
                  {savingPriceId === t.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Lưu"
                  )}
                </Button>
                <Button size="sm" variant="secondary" onClick={() => setSaleDialogFor(t)}>
                  <Tag className="w-4 h-4 mr-1.5" /> Khuyến mãi
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {saleDialogFor && (
        <SaleDialog
          template={saleDialogFor}
          onClose={() => setSaleDialogFor(null)}
          onSaved={() => {
            setSaleDialogFor(null);
            router.refresh();
          }}
        />
      )}
    </div>
  );
}

function SaleDialog({
  template,
  onClose,
  onSaved,
}: {
  template: TemplateRow;
  onClose: () => void;
  onSaved: () => void;
}) {
  const { toast } = useToast();
  const [salePrice, setSalePrice] = useState(
    template.salePrice != null ? String(template.salePrice) : ""
  );
  const [startsAt, setStartsAt] = useState(toDateInputValue(template.saleStartsAt));
  const [endsAt, setEndsAt] = useState(toDateInputValue(template.saleEndsAt));
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    const value = salePrice.trim() ? Number(salePrice) : null;
    if (value !== null && (!Number.isFinite(value) || value < 0 || value >= template.price)) {
      toast({
        title: "Giá khuyến mãi không hợp lệ",
        description: "Phải nhỏ hơn giá gốc và không âm.",
        variant: "destructive",
      });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/templates/${template.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          salePrice: value,
          saleStartsAt: value !== null && startsAt ? startsAt : null,
          saleEndsAt: value !== null && endsAt ? endsAt : null,
        }),
      });
      if (res.ok) {
        toast({ title: "Đã lưu khuyến mãi" });
        onSaved();
      } else {
        const err = await res.json();
        toast({ title: "Lỗi", description: err.error, variant: "destructive" });
      }
    } catch {
      toast({ title: "Lỗi", variant: "destructive" });
    }
    setSaving(false);
  }

  async function handleClear() {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/templates/${template.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ salePrice: null, saleStartsAt: null, saleEndsAt: null }),
      });
      if (res.ok) {
        toast({ title: "Đã bỏ khuyến mãi" });
        onSaved();
      } else {
        const err = await res.json();
        toast({ title: "Lỗi", description: err.error, variant: "destructive" });
      }
    } catch {
      toast({ title: "Lỗi", variant: "destructive" });
    }
    setSaving(false);
  }

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Khuyến mãi — {template.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Giá khuyến mãi (để trống để bỏ khuyến mãi)
            </label>
            <Input
              type="number"
              min={0}
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
              placeholder={`Giá gốc: ${template.price.toLocaleString("vi-VN")}đ`}
              className="mt-1"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700">Bắt đầu</label>
              <Input
                type="date"
                value={startsAt}
                onChange={(e) => setStartsAt(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Kết thúc</label>
              <Input
                type="date"
                value={endsAt}
                onChange={(e) => setEndsAt(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <p className="text-xs text-gray-400">
            Để trống ngày bắt đầu/kết thúc nghĩa là không giới hạn phía đó.
          </p>
        </div>
        <DialogFooter>
          {template.salePrice != null && (
            <Button variant="outline" onClick={handleClear} disabled={saving}>
              Bỏ khuyến mãi
            </Button>
          )}
          <Button onClick={handleSave} disabled={saving} className="bg-rose-600 hover:bg-rose-700">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Lưu"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
