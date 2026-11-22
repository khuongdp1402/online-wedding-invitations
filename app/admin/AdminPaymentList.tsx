"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Check, X, Loader2, Shield, CreditCard, ExternalLink } from "lucide-react";
import Link from "next/link";

type WeddingInfo = {
  slug: string;
  groomName: string;
  brideName: string;
  id?: string;
  status?: string;
};

const TYPE_LABEL: Record<string, string> = {
  PUBLISH: "Xuất bản thiệp",
  RENEW: "Gia hạn thiệp",
  TEMPLATE_CHANGE: "Đổi mẫu thiệp",
};

type PaymentRow = {
  id: string;
  amount: number;
  type: string;
  method: string;
  status: string;
  createdAt: string;
  wedding: WeddingInfo;
};

type Props = {
  pendingPayments: PaymentRow[];
  allPayments: PaymentRow[];
  showRecentOnly?: boolean;
};

export function AdminPaymentList({ pendingPayments, allPayments, showRecentOnly = false }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleAction(paymentId: string, action: "confirm" | "reject") {
    setLoadingId(paymentId);
    try {
      const res = await fetch("/api/payment/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentId, action }),
      });
      if (res.ok) {
        toast({
          title: action === "confirm" ? "Đã duyệt thanh toán thành công" : "Đã từ chối thanh toán",
        });
        router.refresh();
      } else {
        const data = await res.json();
        toast({ title: "Lỗi", description: data.error, variant: "destructive" });
      }
    } catch {
      toast({ title: "Lỗi kết nối máy chủ", variant: "destructive" });
    }
    setLoadingId(null);
  }

  const formatDate = (s: string) =>
    new Date(s).toLocaleString("vi-VN", {
      dateStyle: "short",
      timeStyle: "short",
    });
  const formatMoney = (n: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

  return (
    <div className="space-y-6">
      {/* Pending Payments Card */}
      <Card className="border border-amber-900/10 shadow-sm bg-white rounded-xl overflow-hidden">
        <CardHeader className="bg-[#FAF7F2] border-b border-amber-900/10 py-4 px-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-bold font-serif text-stone-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-700" />
              Chuyển khoản ngân hàng chờ duyệt ({pendingPayments.length})
            </CardTitle>
            {pendingPayments.length > 0 && (
              <Badge className="bg-amber-100 text-amber-800 border-0 text-xs">
                Cần đối soát
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {pendingPayments.length === 0 ? (
            <div className="text-center py-6 text-stone-500 text-sm">
              Không có giao dịch nào đang chờ duyệt. Mọi khoản chuyển khoản đã được đối soát!
            </div>
          ) : (
            <ul className="divide-y divide-stone-100">
              {pendingPayments.map((p) => (
                <li
                  key={p.id}
                  className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-stone-900 text-base">
                        {p.wedding.groomName} & {p.wedding.brideName}
                      </span>
                      <Link
                        href={`/w/${p.wedding.slug}`}
                        target="_blank"
                        className="text-xs text-[#8C1C24] hover:underline inline-flex items-center gap-0.5"
                      >
                        <span>/w/{p.wedding.slug}</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                    <div className="text-xs text-stone-500 flex flex-wrap items-center gap-2">
                      <span className="font-bold text-sm text-[#8C1C24]">
                        {formatMoney(p.amount)}
                      </span>
                      <span>·</span>
                      <Badge variant="outline" className="text-[11px] border-stone-200">
                        {TYPE_LABEL[p.type] ?? p.type}
                      </Badge>
                      <span>·</span>
                      <span>{formatDate(p.createdAt)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      size="sm"
                      className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs h-9 px-3 shadow-xs"
                      onClick={() => handleAction(p.id, "confirm")}
                      disabled={loadingId === p.id}
                    >
                      {loadingId === p.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                      ) : (
                        <Check className="w-3.5 h-3.5 mr-1.5" />
                      )}
                      Duyệt Ngay
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-200 text-red-700 hover:bg-red-50 text-xs h-9 px-3"
                      onClick={() => handleAction(p.id, "reject")}
                      disabled={loadingId === p.id}
                    >
                      <X className="w-3.5 h-3.5 mr-1.5" />
                      Từ Chối
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Transaction History Card */}
      <Card className="border border-amber-900/10 shadow-sm bg-white rounded-xl overflow-hidden">
        <CardHeader className="bg-[#FAF7F2] border-b border-amber-900/10 py-4 px-6 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-bold font-serif text-stone-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-stone-600" />
            Lịch sử giao dịch {showRecentOnly ? "gần đây" : `(${allPayments.length})`}
          </CardTitle>
          {showRecentOnly && (
            <Link
              href="/admin/payments"
              className="text-xs font-semibold text-[#8C1C24] hover:underline flex items-center gap-1"
            >
              <span>Xem tất cả</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-stone-50/70 border-b border-stone-200 text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Thời gian</th>
                  <th className="py-3 px-4">Cặp đôi & Thiệp</th>
                  <th className="py-3 px-4">Số tiền</th>
                  <th className="py-3 px-4">Loại GD</th>
                  <th className="py-3 px-4">Phương thức</th>
                  <th className="py-3 px-4 text-right">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {allPayments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-stone-500 text-sm">
                      Chưa có lịch sử giao dịch nào.
                    </td>
                  </tr>
                ) : (
                  allPayments.map((p) => {
                    const isCompleted = p.status === "COMPLETED";
                    const isFailed = p.status === "FAILED";
                    return (
                      <tr key={p.id} className="hover:bg-[#FAF7F2]/50 transition-colors">
                        <td className="py-3.5 px-4 text-xs text-stone-600 whitespace-nowrap">
                          {formatDate(p.createdAt)}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-medium text-stone-900">
                            {p.wedding.groomName} & {p.wedding.brideName}
                          </div>
                          <Link
                            href={`/w/${p.wedding.slug}`}
                            target="_blank"
                            className="text-[11px] text-[#8C1C24] hover:underline"
                          >
                            /w/{p.wedding.slug}
                          </Link>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-stone-900 whitespace-nowrap">
                          {formatMoney(p.amount)}
                        </td>
                        <td className="py-3.5 px-4 text-xs text-stone-600">
                          {TYPE_LABEL[p.type] ?? p.type}
                        </td>
                        <td className="py-3.5 px-4 text-xs text-stone-600 uppercase font-mono">
                          {p.method}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <Badge
                            variant="outline"
                            className={
                              isCompleted
                                ? "bg-emerald-50 text-emerald-800 border-emerald-200 text-xs"
                                : isFailed
                                ? "bg-rose-50 text-rose-800 border-rose-200 text-xs"
                                : "bg-amber-50 text-amber-800 border-amber-200 text-xs"
                            }
                          >
                            {isCompleted ? "Thành công" : isFailed ? "Thất bại" : "Chờ duyệt"}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
