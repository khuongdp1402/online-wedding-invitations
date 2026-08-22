"use client";

import { WeddingData, GiftingInfo } from "@/lib/template-registry";
import { CreditCard, Heart, Mail } from "lucide-react";
import { buildVietQrUrl } from "@/lib/vietqr";

type GiftingProps = {
  wedding: WeddingData;
  isBrideMode: boolean;
};

export function Gifting({ wedding, isBrideMode: _isBrideMode }: GiftingProps) {
  const groomGift = wedding.gifting?.groom;
  const brideGift = wedding.gifting?.bride;

  const sides: { label: string; gift?: GiftingInfo }[] = [
    { label: "Gửi đến Chú rể", gift: groomGift },
    { label: "Gửi đến Cô dâu", gift: brideGift },
  ];

  const cards = sides.flatMap(({ label, gift }) => {
    if (!gift?.accountNumber?.trim()) return [];
    return [
      {
        label,
        gift,
        qrUrl: buildVietQrUrl({
          bankName: gift.bankName ?? "",
          accountNumber: gift.accountNumber,
          accountHolder: gift.accountHolder,
          message: "Mung cuoi",
        }),
      },
    ];
  });

  // Chưa nhập tài khoản nào thì ẩn hẳn khối thay vì hiện thẻ rỗng.
  if (cards.length === 0) return null;

  return (
    <div className="space-y-12">
      <div className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] opacity-40 mb-2">Gifting</p>
        <h2 className="font-script text-4xl text-[var(--primary)]">Hộp mừng cưới</h2>
      </div>

      <div className="flex flex-col items-center space-y-8">
        {/* Envelope Icon */}
        <div className="relative">
          <div className="w-24 h-24 bg-[var(--primary)] rounded-2xl flex items-center justify-center shadow-xl transform -rotate-3">
             <Mail className="w-12 h-12 text-[var(--bg-cream)]" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-[var(--secondary)] rounded-full flex items-center justify-center shadow-md animate-bounce">
             <Heart className="w-4 h-4 text-white fill-white" />
          </div>
        </div>

        <p className="text-sm text-center italic opacity-60 px-4">
          Sự hiện diện của quý vị là niềm hạnh phúc lớn nhất của chúng tôi. Nếu quý vị muốn gửi món quà chúc phúc, có thể sử dụng thông tin dưới đây:
        </p>

        <div className="w-full space-y-6">
          {/* Chỉ hiện bên nào đã nhập tài khoản thật — trước đây có số tài khoản
              giả hard-code, khách sẽ chuyển nhầm tiền cho người lạ. */}
          {cards.map(({ label, gift, qrUrl }) => (
            <div
              key={label}
              className="p-6 border border-[color-mix(in_srgb,var(--secondary)_20%,transparent)] rounded-xl bg-white space-y-4"
            >
              <p className="font-bold text-[var(--secondary)] text-xs uppercase tracking-widest text-center">
                {label}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5 opacity-40" />
                </div>
                <div className="flex-1 space-y-0.5">
                  <p className="text-xs opacity-50 uppercase font-bold">{gift.bankName}</p>
                  <p className="font-bold text-[var(--primary)] tracking-wider">{gift.accountNumber}</p>
                  {gift.accountHolder && (
                    <p className="text-sm italic opacity-60">Chủ TK: {gift.accountHolder}</p>
                  )}
                </div>
              </div>

              {/* QR chuẩn VietQR, quét bằng app ngân hàng là tự điền */}
              {qrUrl && (
                <div className="flex justify-center pt-2">
                  <img
                    src={qrUrl}
                    alt={`Mã QR ${label}`}
                    className="w-40 h-40 object-contain"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
