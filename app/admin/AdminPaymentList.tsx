"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Check, X, Loader2, Shield } from "lucide-react";
import Link from "next/link";

type WeddingInfo = {
  slug: string;
  groomName: string;
  brideName: string;
  id?: string;
  status?: string;
};

const TYPE_LABEL: Record<string, string> = {
  PUBLISH: "Xuất bản",
  RENEW: "Gia hạn",
  TEMPLATE_CHANGE: "Đổi mẫu",
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
};

export function AdminPaymentList({ pendingPayments, allPayments }: Props) {
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
          title: action === "confirm" ? "Đã xác nhận thanh toán" : "Đã từ chối",
        });
        router.refresh();
      } else {
        const data = await res.json();
        toast({ title: "Lỗi", description: data.error, variant: "destructive" });
      }
    } catch {
      toast({ title: "Lỗi", variant: "destructive" });
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
    <div className="space-y-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-600" />
            Thanh toán chuyển khoản chờ xác nhận ({pendingPayments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pendingPayments.length === 0 ? (
            <p className="text-gray-500 text-sm">Không có giao dịch nào chờ xác nhận.</p>
          ) : (
            <ul className="space-y-4">
              {pendingPayments.map((p) => (
                <li
                  key={p.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-lg border p-4 bg-white"
                >
                  <div>
                    <p className="font-medium">
                      {p.wedding.groomName} & {p.wedding.brideName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatMoney(p.amount)} · {TYPE_LABEL[p.type] ?? p.type} · {formatDate(p.createdAt)}
                    </p>
                    <Link
                      href={`/w/${p.wedding.slug}`}
                      className="text-sm text-rose-600 hover:underline"
                    >
                      /w/{p.wedding.slug}
                    </Link>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => handleAction(p.id, "confirm")}
                      disabled={loadingId === p.id}
                    >
                      {loadingId === p.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Check className="w-4 h-4 mr-1" />
                      )}
                      Xác nhận
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleAction(p.id, "reject")}
                      disabled={loadingId === p.id}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Từ chối
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Giao dịch gần đây (50)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-600">
                  <th className="pb-2 pr-4">Thời gian</th>
                  <th className="pb-2 pr-4">Cặp đôi</th>
                  <th className="pb-2 pr-4">Số tiền</th>
                  <th className="pb-2 pr-4">Loại</th>
                  <th className="pb-2 pr-4">Phương thức</th>
                  <th className="pb-2">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {allPayments.map((p) => (
                  <tr key={p.id} className="border-b">
                    <td className="py-2 pr-4 text-gray-600">{formatDate(p.createdAt)}</td>
                    <td className="py-2 pr-4">
                      {p.wedding.groomName} & {p.wedding.brideName}
                    </td>
                    <td className="py-2 pr-4">{formatMoney(p.amount)}</td>
                    <td className="py-2 pr-4">{TYPE_LABEL[p.type] ?? p.type}</td>
                    <td className="py-2 pr-4">{p.method}</td>
                    <td className="py-2">
                      <Badge
                        variant={
                          p.status === "COMPLETED"
                            ? "default"
                            : p.status === "FAILED"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {p.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <p className="text-sm text-gray-500">
        <Link href="/dashboard" className="text-rose-600 hover:underline">
          ← Quay lại Dashboard
        </Link>
      </p>
    </div>
  );
}
