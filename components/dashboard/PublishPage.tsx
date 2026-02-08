"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Check,
  Crown,
  Star,
  Sparkles,
  CreditCard,
  Building2,
  ArrowLeft,
  Loader2,
  Copy,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import Link from "next/link";

type Props = {
  wedding: {
    id: string;
    slug: string;
    status: string;
    plan: string;
    groomName: string;
    brideName: string;
  };
};

type BankInfo = {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  branch: string;
  amount: number;
  transferContent: string;
};

const plans = [
  {
    id: "BASIC",
    name: "Cơ Bản",
    price: 500000,
    priceLabel: "500.000₫",
    icon: Star,
    color: "border-blue-200 bg-blue-50",
    activeColor: "ring-2 ring-blue-500 border-blue-300 bg-blue-50",
    buttonColor: "bg-blue-600 hover:bg-blue-700",
    duration: "6 tháng",
    features: [
      "Publish online",
      "Bỏ watermark",
      "50 khách mời",
      "10 ảnh gallery",
      "Custom slug URL",
      "Quản lý lời chúc",
      "RSVP tracking",
    ],
  },
  {
    id: "STANDARD",
    name: "Tiêu Chuẩn",
    price: 1000000,
    priceLabel: "1.000.000₫",
    icon: Crown,
    color: "border-rose-200 bg-rose-50",
    activeColor: "ring-2 ring-rose-500 border-rose-300 bg-rose-50",
    buttonColor: "bg-rose-600 hover:bg-rose-700",
    duration: "1 năm",
    popular: true,
    features: [
      "Tất cả gói Cơ Bản",
      "200 khách mời",
      "20 ảnh gallery",
      "Thiệp in tên khách",
      "Export Excel",
      "Custom domain",
      "Analytics (lượt xem)",
    ],
  },
  {
    id: "PREMIUM",
    name: "Cao Cấp",
    price: 2000000,
    priceLabel: "2.000.000₫",
    icon: Sparkles,
    color: "border-amber-200 bg-amber-50",
    activeColor: "ring-2 ring-amber-500 border-amber-300 bg-amber-50",
    buttonColor: "bg-amber-600 hover:bg-amber-700",
    duration: "Vĩnh viễn",
    features: [
      "Tất cả gói Tiêu Chuẩn",
      "Unlimited khách mời",
      "Unlimited ảnh",
      "Nhạc nền tùy chỉnh",
      "Hỗ trợ ưu tiên",
      "Tất cả template",
      "Vĩnh viễn không hết hạn",
    ],
  },
];

type Step = "select-plan" | "select-method" | "bank-transfer" | "processing";

export function PublishPage({ wedding }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const isPublished = wedding.status === "PUBLISHED";
  const paymentResult = searchParams.get("payment");

  const [step, setStep] = useState<Step>("select-plan");
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [bankInfo, setBankInfo] = useState<BankInfo | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [pollStatus, setPollStatus] = useState<string | null>(null);

  // Show toast for VNPay return result
  useEffect(() => {
    if (paymentResult === "failed") {
      toast({
        title: "Thanh toán thất bại",
        description: "Giao dịch VNPay không thành công. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
  }, [paymentResult, toast]);

  // Poll bank transfer status
  const pollPaymentStatus = useCallback(async () => {
    if (!paymentId) return;
    try {
      const res = await fetch(`/api/payment/${paymentId}/status`);
      if (res.ok) {
        const data = await res.json();
        setPollStatus(data.status);
        if (data.status === "COMPLETED") {
          toast({ title: "Thanh toán thành công!", description: "Thiệp cưới đã được xuất bản." });
          router.push(`/dashboard/weddings/${wedding.id}?payment=success`);
        }
      }
    } catch {
      // ignore polling errors
    }
  }, [paymentId, router, toast, wedding.id]);

  useEffect(() => {
    if (step !== "bank-transfer" || !paymentId) return;
    const interval = setInterval(pollPaymentStatus, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, [step, paymentId, pollPaymentStatus]);

  async function handlePayment(method: "vnpay" | "bank_transfer") {
    setLoading(true);
    try {
      const res = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weddingId: wedding.id,
          plan: selectedPlan,
          method,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        toast({ title: "Lỗi", description: err.error, variant: "destructive" });
        setLoading(false);
        return;
      }

      const data = await res.json();

      if (method === "vnpay") {
        // Redirect to VNPay
        window.location.href = data.paymentUrl;
        return;
      }

      if (method === "bank_transfer") {
        setBankInfo(data.bankInfo);
        setPaymentId(data.payment.id);
        setStep("bank-transfer");
      }
    } catch {
      toast({ title: "Lỗi", description: "Đã xảy ra lỗi, vui lòng thử lại.", variant: "destructive" });
    }
    setLoading(false);
  }

  function copyToClipboard(text: string, label: string) {
    navigator.clipboard.writeText(text);
    toast({ title: `Đã sao chép ${label}` });
  }

  const selectedPlanData = plans.find((p) => p.id === selectedPlan);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Published banner */}
      {isPublished && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-semibold text-green-800">Thiệp đã được xuất bản!</p>
                <p className="text-sm text-green-600">
                  Gói hiện tại: <strong>{wedding.plan}</strong> · Đường dẫn:{" "}
                  <Link href={`/w/${wedding.slug}`} target="_blank" className="underline">
                    /w/{wedding.slug}
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment failed banner */}
      {paymentResult === "failed" && (
        <Card className="bg-red-50 border-red-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <div>
                <p className="font-semibold text-red-800">Thanh toán thất bại</p>
                <p className="text-sm text-red-600">Vui lòng thử lại hoặc chọn phương thức khác.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 1: Select Plan */}
      {step === "select-plan" && (
        <>
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Chọn gói để xuất bản</h2>
            <p className="text-gray-500">
              Nâng cấp để bỏ watermark, publish thiệp và mở khoá tính năng
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.id;
              const isCurrent = wedding.plan === plan.id;
              return (
                <Card
                  key={plan.id}
                  className={`relative cursor-pointer transition-all hover:shadow-lg ${
                    isSelected ? plan.activeColor : plan.color
                  } ${isCurrent ? "opacity-60" : ""}`}
                  onClick={() => !isCurrent && setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-500 hover:bg-rose-500 text-white">
                      Phổ biến nhất
                    </Badge>
                  )}
                  {isCurrent && (
                    <Badge className="absolute -top-3 right-4 bg-green-500 hover:bg-green-500 text-white">
                      Gói hiện tại
                    </Badge>
                  )}
                  <CardHeader className="text-center pb-2">
                    <plan.icon className="w-8 h-8 mx-auto mb-2 text-gray-700" />
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <div className="text-3xl font-bold text-gray-900 mt-1">{plan.priceLabel}</div>
                    <p className="text-sm text-gray-500">{plan.duration}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    {isSelected && (
                      <div className="flex items-center justify-center gap-2 text-sm font-medium text-rose-600 pt-2 border-t">
                        <CheckCircle2 className="w-4 h-4" /> Đã chọn
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4">
            <Link href={`/dashboard/weddings/${wedding.id}`}>
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-1.5" /> Quay lại
              </Button>
            </Link>
            <Button
              disabled={!selectedPlan}
              onClick={() => setStep("select-method")}
              className="bg-rose-600 hover:bg-rose-700"
            >
              Tiếp tục <ExternalLink className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </>
      )}

      {/* Step 2: Select Payment Method */}
      {step === "select-method" && selectedPlanData && (
        <>
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Chọn phương thức thanh toán</h2>
            <p className="text-gray-500">
              Gói <strong>{selectedPlanData.name}</strong> - {selectedPlanData.priceLabel}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* VNPay */}
            <Card
              className="cursor-pointer hover:shadow-lg transition-all hover:ring-2 hover:ring-blue-400"
              onClick={() => handlePayment("vnpay")}
            >
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">VNPay</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Thanh toán qua thẻ ATM, Visa, MasterCard, QR Pay
                </p>
                <Badge variant="outline" className="text-xs text-blue-600 border-blue-200">
                  Xác nhận tự động
                </Badge>
              </CardContent>
            </Card>

            {/* Bank Transfer */}
            <Card
              className="cursor-pointer hover:shadow-lg transition-all hover:ring-2 hover:ring-emerald-400"
              onClick={() => handlePayment("bank_transfer")}
            >
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Chuyển khoản ngân hàng</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Chuyển khoản và chờ xác nhận từ admin
                </p>
                <Badge variant="outline" className="text-xs text-emerald-600 border-emerald-200">
                  Xác nhận trong 24h
                </Badge>
              </CardContent>
            </Card>
          </div>

          {loading && (
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Đang xử lý...</span>
            </div>
          )}

          <div className="flex justify-center pt-4">
            <Button variant="outline" onClick={() => setStep("select-plan")}>
              <ArrowLeft className="w-4 h-4 mr-1.5" /> Chọn lại gói
            </Button>
          </div>
        </>
      )}

      {/* Step 3: Bank Transfer Info */}
      {step === "bank-transfer" && bankInfo && selectedPlanData && (
        <>
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Thông tin chuyển khoản</h2>
            <p className="text-gray-500">
              Gói <strong>{selectedPlanData.name}</strong> - {selectedPlanData.priceLabel}
            </p>
          </div>

          <Card className="max-w-lg mx-auto">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-600" />
                Chi tiết chuyển khoản
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <InfoRow
                  label="Ngân hàng"
                  value={bankInfo.bankName}
                  onCopy={() => copyToClipboard(bankInfo.bankName, "tên ngân hàng")}
                />
                <Separator />
                <InfoRow
                  label="Số tài khoản"
                  value={bankInfo.accountNumber}
                  onCopy={() => copyToClipboard(bankInfo.accountNumber, "số tài khoản")}
                  highlight
                />
                <Separator />
                <InfoRow
                  label="Chủ tài khoản"
                  value={bankInfo.accountHolder}
                  onCopy={() => copyToClipboard(bankInfo.accountHolder, "chủ tài khoản")}
                />
                <Separator />
                <InfoRow
                  label="Chi nhánh"
                  value={bankInfo.branch}
                />
                <Separator />
                <InfoRow
                  label="Số tiền"
                  value={`${bankInfo.amount.toLocaleString("vi-VN")}₫`}
                  onCopy={() => copyToClipboard(String(bankInfo.amount), "số tiền")}
                  highlight
                />
                <Separator />
                <InfoRow
                  label="Nội dung CK"
                  value={bankInfo.transferContent}
                  onCopy={() => copyToClipboard(bankInfo.transferContent, "nội dung CK")}
                  highlight
                />
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-amber-800 font-medium mb-1">
                  <AlertCircle className="w-4 h-4 inline mr-1" />
                  Quan trọng
                </p>
                <p className="text-sm text-amber-700">
                  Vui lòng ghi đúng <strong>nội dung chuyển khoản</strong> để chúng tôi xác nhận nhanh nhất.
                  Thiệp sẽ được xuất bản sau khi admin xác nhận thanh toán (trong vòng 24h).
                </p>
              </div>

              {/* Polling status */}
              <div className="flex items-center justify-center gap-2 pt-4 text-gray-500">
                {pollStatus === "COMPLETED" ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-green-600 font-medium">Đã xác nhận thanh toán!</span>
                  </>
                ) : (
                  <>
                    <Clock className="w-4 h-4 animate-pulse" />
                    <span className="text-sm">Đang chờ xác nhận... (tự động kiểm tra mỗi 10 giây)</span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center pt-4">
            <Link href={`/dashboard/weddings/${wedding.id}`}>
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-1.5" /> Về trang quản lý
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

function InfoRow({
  label,
  value,
  onCopy,
  highlight,
}: {
  label: string;
  value: string;
  onCopy?: () => void;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-500">{label}</span>
      <div className="flex items-center gap-2">
        <span className={`text-sm ${highlight ? "font-bold text-gray-900" : "text-gray-700"}`}>
          {value}
        </span>
        {onCopy && (
          <button onClick={onCopy} className="text-gray-400 hover:text-gray-600 transition-colors">
            <Copy className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
