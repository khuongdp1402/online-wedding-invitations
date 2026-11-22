"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Building2,
  ArrowLeft,
  Loader2,
  Copy,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  Clock,
  Sparkles,
  Tag,
} from "lucide-react";
import Link from "next/link";

type Props = {
  wedding: {
    id: string;
    slug: string;
    status: string;
    expiresAt: string | Date | null;
    purchasePrice: number | null;
    groomName: string;
    brideName: string;
  };
  isAdmin?: boolean;
};

type BankInfo = {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  amount: number;
  transferContent: string;
  qrUrl: string | null;
};

type Quote = {
  templatePrice: number;
  effectivePrice: number;
  isOnSale: boolean;
  saleEndsAt: string | null;
  isRenewal: boolean;
  currentExpiresAt: string | null;
  couponPreview?:
    | { valid: true; discount: number; finalAmount: number }
    | { valid: false; reason: string };
};

type Step = "quote" | "bank-transfer" | "processing";

function formatDate(value: string | Date | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("vi-VN");
}

const COUPON_REASON_LABEL: Record<string, string> = {
  not_found: "Mã giảm giá không tồn tại",
  inactive: "Mã giảm giá đã bị vô hiệu hoá",
  not_started: "Mã giảm giá chưa tới ngày áp dụng",
  expired: "Mã giảm giá đã hết hạn",
  exhausted: "Mã giảm giá đã hết lượt sử dụng",
  wrong_template: "Mã giảm giá không áp dụng cho mẫu thiệp này",
};

export function PublishPage({ wedding, isAdmin = false }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const isPublished = wedding.status === "PUBLISHED";
  const paymentResult = searchParams.get("payment");

  const [step, setStep] = useState<Step>("quote");
  const [quote, setQuote] = useState<Quote | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [bankInfo, setBankInfo] = useState<BankInfo | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [pollStatus, setPollStatus] = useState<string | null>(null);
  const [mocking, setMocking] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplying, setCouponApplying] = useState(false);

  const loadQuote = useCallback(
    async (coupon?: string) => {
      setQuoteLoading(true);
      try {
        const url = new URL(`/api/weddings/${wedding.id}/publish-quote`, window.location.origin);
        if (coupon) url.searchParams.set("coupon", coupon);
        const res = await fetch(url.toString().replace(window.location.origin, ""));
        if (res.ok) {
          setQuote(await res.json());
        }
      } catch {
        // giữ nguyên quote=null, UI hiện nút thử lại
      }
      setQuoteLoading(false);
    },
    [wedding.id]
  );

  // Giá xuất bản/gia hạn của template — server tính, không cho chọn tuỳ ý.
  useEffect(() => {
    loadQuote();
  }, [loadQuote]);

  // Show toast for payment return result
  useEffect(() => {
    if (paymentResult === "failed") {
      toast({
        title: "Thanh toán thất bại",
        description: "Giao dịch không thành công. Vui lòng thử lại.",
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

  async function handleApplyCoupon() {
    if (!couponCode.trim()) return;
    setCouponApplying(true);
    await loadQuote(couponCode.trim());
    setCouponApplying(false);
  }

  async function handlePayment() {
    setLoading(true);
    try {
      const couponApplied = quote?.couponPreview?.valid === true;
      const res = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weddingId: wedding.id,
          method: "bank_transfer",
          ...(couponApplied && { couponCode: couponCode.trim() }),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        toast({ title: "Lỗi", description: err.error, variant: "destructive" });
        setLoading(false);
        return;
      }

      const data = await res.json();
      if (data.completed) {
        toast({
          title: "Xuất bản thiệp thành công!",
          description: "Thiệp cưới của bạn đã được kích hoạt công khai.",
        });
        router.push(`/dashboard/weddings/${wedding.id}?payment=success`);
        return;
      }
      setBankInfo(data.bankInfo);
      setPaymentId(data.payment.id);
      setStep("bank-transfer");
    } catch {
      toast({ title: "Lỗi", description: "Đã xảy ra lỗi, vui lòng thử lại.", variant: "destructive" });
    }
    setLoading(false);
  }

  function copyToClipboard(text: string, label: string) {
    navigator.clipboard.writeText(text);
    toast({ title: `Đã sao chép ${label}` });
  }

  const displayAmount =
    quote?.couponPreview?.valid === true ? quote.couponPreview.finalAmount : quote?.effectivePrice;

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
                  Hạn sử dụng: <strong>{formatDate(wedding.expiresAt)}</strong>
                  {wedding.purchasePrice != null && (
                    <> · Đã trả: <strong>{wedding.purchasePrice.toLocaleString("vi-VN")}đ</strong></>
                  )}
                  {" "}· Đường dẫn:{" "}
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

      {/* Step: báo giá theo template */}
      {step === "quote" && (
        <>
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {isPublished ? "Gia hạn thiệp cưới" : "Xuất bản thiệp cưới"}
            </h2>
            <p className="text-gray-500">
              {isPublished
                ? "Gia hạn thêm 30 ngày sử dụng kể từ hạn hiện tại."
                : "Giá cố định theo mẫu thiệp bạn đang dùng, hiệu lực 30 ngày."}
            </p>
          </div>

          {quoteLoading ? (
            <div className="flex items-center justify-center gap-2 text-gray-500 py-12">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Đang tính giá...</span>
            </div>
          ) : !quote ? (
            <div className="text-center py-12 space-y-3">
              <p className="text-gray-500">Không tính được giá, vui lòng thử lại.</p>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Thử lại
              </Button>
            </div>
          ) : (
            <Card className="max-w-md mx-auto">
              <CardHeader className="text-center pb-2">
                <Sparkles className="w-8 h-8 mx-auto mb-2 text-rose-500" />
                <CardTitle className="text-lg">
                  {quote.isRenewal ? "Gia hạn 30 ngày" : "Xuất bản thiệp"}
                </CardTitle>
                <div className="text-3xl font-bold text-gray-900 mt-1">
                  {displayAmount?.toLocaleString("vi-VN")}₫
                </div>
                {(quote.isOnSale || quote.couponPreview?.valid) && (
                  <div className="text-sm text-gray-400 line-through">
                    {quote.templatePrice.toLocaleString("vi-VN")}₫
                  </div>
                )}
                <p className="text-sm text-gray-500">
                  {quote.isRenewal
                    ? `Hạn hiện tại: ${formatDate(quote.currentExpiresAt)}`
                    : "Hiệu lực 30 ngày kể từ khi xuất bản"}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    Dùng đầy đủ mọi khối của mẫu thiệp
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    Thiệp hiển thị công khai tại /w/{wedding.slug}
                  </li>
                </ul>

                <div className="border-t pt-4 space-y-2">
                  <label className="text-xs font-medium text-gray-700 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" /> Mã giảm giá
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Nhập mã (nếu có)"
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      disabled={!couponCode.trim() || couponApplying}
                      onClick={handleApplyCoupon}
                    >
                      {couponApplying ? <Loader2 className="w-4 h-4 animate-spin" /> : "Áp dụng"}
                    </Button>
                  </div>
                  {quote.couponPreview?.valid === true && (
                    <p className="text-xs text-emerald-600">
                      Đã áp dụng — giảm {quote.couponPreview.discount.toLocaleString("vi-VN")}đ
                    </p>
                  )}
                  {quote.couponPreview?.valid === false && (
                    <p className="text-xs text-red-500">
                      {COUPON_REASON_LABEL[quote.couponPreview.reason] ?? "Mã giảm giá không hợp lệ"}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex items-center justify-between pt-4">
            <Link href={`/dashboard/weddings/${wedding.id}/edit`}>
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-1.5" /> Quay lại chỉnh sửa
              </Button>
            </Link>
            {quote && (
              <Button
                onClick={handlePayment}
                disabled={loading}
                className="bg-rose-600 hover:bg-rose-700"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                ) : (
                  <ExternalLink className="w-4 h-4 mr-1.5" />
                )}
                Tiếp tục
              </Button>
            )}
          </div>
        </>
      )}

      {/* Thông tin chuyển khoản */}
      {step === "bank-transfer" && bankInfo && quote && (
        <>
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Quét mã QR để chuyển khoản</h2>
            <p className="text-gray-500">{bankInfo.amount.toLocaleString("vi-VN")}₫</p>
          </div>

          <Card className="max-w-lg mx-auto">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-600" />
                Chi tiết chuyển khoản
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {bankInfo.qrUrl && (
                <div className="flex flex-col items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={bankInfo.qrUrl}
                    alt="QR chuyển khoản"
                    className="w-56 h-56 rounded-lg border"
                  />
                  <p className="text-xs text-gray-500">
                    Quét mã bằng app ngân hàng để tự điền thông tin
                  </p>
                </div>
              )}

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
                  Thiệp sẽ được xuất bản ngay sau khi hệ thống nhận được tiền (thường trong vài phút).
                </p>
              </div>

              {/* Polling status */}
              <div className="flex items-center justify-between pt-4 text-gray-500 border-t">
                <div className="flex items-center gap-2">
                  {pollStatus === "COMPLETED" ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span className="text-green-600 font-medium">Đã xác nhận thanh toán!</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-4 h-4 animate-pulse" />
                      <span className="text-sm">Đang chờ xác nhận...</span>
                    </>
                  )}
                </div>

                {/*
                  Nút giả lập chỉ hiện ở môi trường dev và gọi route xác nhận
                  của admin (yêu cầu đăng nhập ADMIN). Trước đây nút này gọi
                  thẳng /api/webhooks/casso — route đó nay đã yêu cầu secret
                  phía server nên không thể gọi từ trình duyệt.
                */}
                {(isAdmin || process.env.NODE_ENV !== "production") && pollStatus !== "COMPLETED" && paymentId && (
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled={mocking}
                    onClick={async () => {
                      setMocking(true);
                      try {
                        const res = await fetch("/api/payment/webhook", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ paymentId, action: "confirm" })
                        });
                        if (res.ok) {
                          setPollStatus("COMPLETED");
                          toast({
                            title: "Đã xác nhận thanh toán & xuất bản thiệp!",
                            description: "Đang chuyển đến trang quản lý thiệp...",
                          });
                          router.push(`/dashboard/weddings/${wedding.id}?payment=success`);
                        } else {
                          const err = await res.json().catch(() => ({}));
                          toast({
                            title: "Không xác nhận được",
                            description: err.error ?? "Cần đăng nhập bằng tài khoản ADMIN",
                            variant: "destructive",
                          });
                        }
                      } catch {
                        toast({ title: "Lỗi xác nhận thanh toán", variant: "destructive" });
                      }
                      setMocking(false);
                    }}
                  >
                    {mocking ? <Loader2 className="w-3 h-3 mr-2 animate-spin" /> : <Sparkles className="w-3 h-3 mr-2 text-rose-500" />}
                    Xác nhận &amp; Xuất bản ngay (Admin)
                  </Button>
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
        <span className={highlight ? "font-bold text-gray-900" : "text-gray-700"}>{value}</span>
        {onCopy && (
          <button onClick={onCopy} className="text-gray-400 hover:text-gray-600">
            <Copy className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
