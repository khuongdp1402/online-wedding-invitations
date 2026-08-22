"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Ban, CheckCircle2 } from "lucide-react";

type CouponRow = {
  id: string;
  code: string;
  discountType: "FIXED" | "PERCENT";
  discountValue: number;
  templateId: string | null;
  template: { name: string } | null;
  maxRedemptions: number | null;
  redemptionCount: number;
  startsAt: string | null;
  endsAt: string | null;
  isActive: boolean;
};

type Props = {
  coupons: CouponRow[];
  templates: { id: string; name: string }[];
};

function couponStatus(c: CouponRow): { label: string; className: string } {
  if (!c.isActive) return { label: "Đã tắt", className: "bg-gray-100 text-gray-600" };
  const now = new Date();
  if (c.startsAt && new Date(c.startsAt) > now)
    return { label: "Chưa bắt đầu", className: "bg-sky-100 text-sky-700" };
  if (c.endsAt && new Date(c.endsAt) <= now)
    return { label: "Hết hạn", className: "bg-red-100 text-red-700" };
  if (c.maxRedemptions !== null && c.redemptionCount >= c.maxRedemptions)
    return { label: "Hết lượt", className: "bg-red-100 text-red-700" };
  return { label: "Đang hoạt động", className: "bg-emerald-100 text-emerald-700" };
}

export function AdminCouponList({ coupons, templates }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [creating, setCreating] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  async function toggleActive(c: CouponRow) {
    setTogglingId(c.id);
    try {
      const res = await fetch(`/api/admin/coupons/${c.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !c.isActive }),
      });
      if (res.ok) {
        toast({ title: c.isActive ? "Đã tắt mã" : "Đã bật lại mã" });
        router.refresh();
      } else {
        const err = await res.json();
        toast({ title: "Lỗi", description: err.error, variant: "destructive" });
      }
    } catch {
      toast({ title: "Lỗi", variant: "destructive" });
    }
    setTogglingId(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setCreating(true)} className="bg-rose-600 hover:bg-rose-700">
          <Plus className="w-4 h-4 mr-1.5" /> Tạo mã mới
        </Button>
      </div>

      {coupons.length === 0 ? (
        <p className="text-sm text-gray-500">Chưa có mã giảm giá nào.</p>
      ) : (
        <div className="space-y-3">
          {coupons.map((c) => {
            const status = couponStatus(c);
            return (
              <Card key={c.id}>
                <CardContent className="pt-4 pb-4 flex flex-wrap items-center gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <code className="font-mono font-semibold text-gray-900">{c.code}</code>
                      <Badge className={`text-[10px] ${status.className}`}>{status.label}</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {c.discountType === "FIXED"
                        ? `Giảm ${c.discountValue.toLocaleString("vi-VN")}đ`
                        : `Giảm ${c.discountValue}%`}
                      {" · "}
                      {c.template ? `Chỉ áp dụng: ${c.template.name}` : "Mọi mẫu thiệp"}
                      {" · "}
                      Đã dùng {c.redemptionCount}
                      {c.maxRedemptions !== null ? `/${c.maxRedemptions}` : ""} lượt
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={togglingId === c.id}
                    onClick={() => toggleActive(c)}
                  >
                    {togglingId === c.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : c.isActive ? (
                      <>
                        <Ban className="w-4 h-4 mr-1.5" /> Tắt
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-1.5" /> Bật lại
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {creating && (
        <CreateCouponDialog
          templates={templates}
          onClose={() => setCreating(false)}
          onCreated={() => {
            setCreating(false);
            router.refresh();
          }}
        />
      )}
    </div>
  );
}

function CreateCouponDialog({
  templates,
  onClose,
  onCreated,
}: {
  templates: { id: string; name: string }[];
  onClose: () => void;
  onCreated: () => void;
}) {
  const { toast } = useToast();
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState<"FIXED" | "PERCENT">("FIXED");
  const [discountValue, setDiscountValue] = useState("");
  const [templateId, setTemplateId] = useState<string>("");
  const [maxRedemptions, setMaxRedemptions] = useState("");
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleCreate() {
    if (!code.trim()) {
      toast({ title: "Thiếu mã giảm giá", variant: "destructive" });
      return;
    }
    const value = Number(discountValue);
    if (!Number.isFinite(value) || value <= 0) {
      toast({ title: "Giá trị giảm giá không hợp lệ", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          discountType,
          discountValue: value,
          templateId: templateId || null,
          maxRedemptions: maxRedemptions.trim() ? Number(maxRedemptions) : null,
          startsAt: startsAt || null,
          endsAt: endsAt || null,
        }),
      });
      if (res.ok) {
        toast({ title: "Đã tạo mã giảm giá" });
        onCreated();
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
          <DialogTitle>Tạo mã giảm giá</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Mã</label>
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="VD: CUOI2026"
              className="mt-1"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700">Loại giảm giá</label>
              <Select value={discountType} onValueChange={(v) => setDiscountType(v as "FIXED" | "PERCENT")}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FIXED">Số tiền cố định (đ)</SelectItem>
                  <SelectItem value="PERCENT">Phần trăm (%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Giá trị</label>
              <Input
                type="number"
                min={0}
                max={discountType === "PERCENT" ? 100 : undefined}
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                placeholder={discountType === "PERCENT" ? "10" : "50000"}
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Áp dụng cho</label>
            <Select value={templateId || "ALL"} onValueChange={(v) => setTemplateId(v === "ALL" ? "" : v)}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Mọi mẫu thiệp</SelectItem>
                {templates.map((t) => (
                  <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700">Giới hạn lượt dùng</label>
              <Input
                type="number"
                min={1}
                value={maxRedemptions}
                onChange={(e) => setMaxRedemptions(e.target.value)}
                placeholder="Không giới hạn"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Bắt đầu</label>
              <Input type="date" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Kết thúc</label>
              <Input type="date" value={endsAt} onChange={(e) => setEndsAt(e.target.value)} className="mt-1" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreate} disabled={saving} className="bg-rose-600 hover:bg-rose-700">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Tạo mã"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
