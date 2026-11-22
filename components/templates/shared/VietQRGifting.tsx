"use client";

import { useState } from "react";
import { Copy, Check, QrCode } from "lucide-react";
import Image from "next/image";
import { buildVietQrUrl } from "@/lib/vietqr";

type BankAccount = {
  bankName?: string;
  accountNumber?: string;
  accountHolder?: string;
  qrCodeUrl?: string;
};

type VietQRGiftingProps = {
  groomBank?: BankAccount;
  brideBank?: BankAccount;
  groomName: string;
  brideName: string;
  primaryColor?: string;
};

export function VietQRGifting({
  groomBank,
  brideBank,
  groomName,
  brideName,
  primaryColor = "#511419",
}: VietQRGiftingProps) {
  const [activeTab, setActiveTab] = useState<"groom" | "bride">(
    groomBank?.accountNumber ? "groom" : "bride"
  );
  const [copied, setCopied] = useState<string | null>(null);

  const hasGroom = Boolean(groomBank?.accountNumber);
  const hasBride = Boolean(brideBank?.accountNumber);

  if (!hasGroom && !hasBride) return null;

  const current = activeTab === "groom" ? groomBank : brideBank;
  const currentTitle = activeTab === "groom" ? `Mừng Chú Rể (${groomName})` : `Mừng Cô Dâu (${brideName})`;

  const handleCopy = (text?: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  // Generate VietQR dynamic image URL if bankName and accountNumber exist
  const qrUrl =
    current?.qrCodeUrl ||
    (current?.bankName && current?.accountNumber
      ? buildVietQrUrl({
          bankName: current.bankName,
          accountNumber: current.accountNumber,
          accountHolder: current.accountHolder,
          message: `Mung cuoi ${activeTab === "groom" ? groomName : brideName}`,
        })
      : null);

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-2xl bg-white/80 backdrop-blur-sm border shadow-lg" style={{ borderColor: `${primaryColor}25` }}>
      <div className="text-center mb-6">
        <h3 className="text-xl md:text-2xl font-serif font-bold uppercase tracking-wide" style={{ color: primaryColor }}>
          Hộp Quà Mừng Cưới
        </h3>
        <p className="text-xs md:text-sm text-gray-500 mt-1">
          Gửi lời chúc phúc và món quà ý nghĩa đến cô dâu &amp; chú rể
        </p>
      </div>

      {/* Tabs if both exist */}
      {hasGroom && hasBride && (
        <div className="flex rounded-xl p-1 bg-gray-100 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab("groom")}
            className={`flex-1 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all ${
              activeTab === "groom"
                ? "bg-white shadow text-[#511419]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Nhà Chú Rể
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("bride")}
            className={`flex-1 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all ${
              activeTab === "bride"
                ? "bg-white shadow text-[#511419]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Nhà Cô Dâu
          </button>
        </div>
      )}

      {/* QR & Bank Information Box */}
      <div className="flex flex-col items-center">
        <div className="text-sm font-medium mb-3 text-gray-700">
          {currentTitle}
        </div>

        {qrUrl ? (
          <div className="p-3 bg-white rounded-xl shadow-inner border border-gray-200 mb-4">
            <Image
              src={qrUrl}
              alt="Mã VietQR Mừng Cưới"
              width={200}
              height={200}
              className="w-48 h-48 object-contain rounded-lg"
              unoptimized
            />
          </div>
        ) : (
          <div className="w-48 h-48 rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 mb-4">
            <QrCode className="w-12 h-12 stroke-[1.5] mb-2" />
            <span className="text-xs">Chưa có mã QR</span>
          </div>
        )}

        {/* Bank details card */}
        <div className="w-full bg-[#fdfaf5] border rounded-xl p-4 space-y-2.5 text-xs md:text-sm" style={{ borderColor: `${primaryColor}20` }}>
          {current?.bankName && (
            <div className="flex justify-between items-center text-gray-600">
              <span className="opacity-75">Ngân hàng:</span>
              <span className="font-semibold text-gray-900">{current.bankName}</span>
            </div>
          )}

          {current?.accountHolder && (
            <div className="flex justify-between items-center text-gray-600">
              <span className="opacity-75">Chủ tài khoản:</span>
              <span className="font-semibold text-gray-900 uppercase">{current.accountHolder}</span>
            </div>
          )}

          {current?.accountNumber && (
            <div className="flex justify-between items-center pt-1 border-t border-dashed border-gray-200">
              <span className="opacity-75">Số tài khoản:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm md:text-base" style={{ color: primaryColor }}>
                  {current.accountNumber}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(current?.accountNumber)}
                  className="p-1 rounded hover:bg-gray-200 transition text-gray-500"
                  title="Sao chép số tài khoản"
                >
                  {copied === current?.accountNumber ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
