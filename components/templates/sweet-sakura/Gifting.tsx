"use client";

import type { WeddingData } from "@/types/template";
import { CreditCard, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type GiftingProps = {
  wedding: WeddingData;
  isBrideMode: boolean;
};

export function Gifting({ wedding, isBrideMode }: GiftingProps) {
  const { toast } = useToast();
  const giftingInfo = isBrideMode ? wedding.gifting?.bride : wedding.gifting?.groom;

  function copy(text: string, label: string) {
    navigator.clipboard.writeText(text);
    toast({ title: `Đã sao chép ${label}` });
  }

  if (!giftingInfo?.accountNumber) return null;

  return (
    <section className="py-14 px-6 bg-white border-b border-[#F6D6DF]">
      <div className="max-w-md mx-auto text-center">
        <p className="text-[11px] uppercase tracking-[0.25em] text-[#E05A7A] font-semibold mb-2">
          WEDDING GIFTING
        </p>
        <h2 className="text-2xl font-serif text-[#382329] mb-4 font-medium">Hộp Mừng Cưới</h2>
        <p className="text-xs text-stone-500 mb-8 max-w-xs mx-auto leading-relaxed">
          Tình cảm và sự chúc phúc của quý khách là niềm hạnh phúc lớn lao nhất của chúng tôi.
        </p>

        <div className="bg-[#FFF7F9] border border-[#F6D6DF] p-7 rounded-3xl shadow-xs max-w-sm mx-auto text-center">
          <div className="w-12 h-12 rounded-full bg-white border border-[#F6D6DF] flex items-center justify-center mx-auto mb-3 text-[#E05A7A] shadow-xs">
            <CreditCard className="w-5 h-5" />
          </div>

          <p className="text-xs text-stone-500 mb-1">{giftingInfo.bankName || "Ngân hàng"}</p>
          <p className="text-sm font-serif font-bold text-stone-900 mb-1">{giftingInfo.accountHolder || "Chủ tài khoản"}</p>
          <p className="text-base font-mono font-bold text-[#E05A7A] mb-5 tracking-wider">{giftingInfo.accountNumber}</p>

          <button
            type="button"
            onClick={() => copy(giftingInfo.accountNumber, "số tài khoản")}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-[#F6D6DF] text-xs font-medium text-stone-700 hover:bg-[#FFEBF0] transition-colors shadow-2xs"
          >
            <Copy className="w-3.5 h-3.5 text-[#E05A7A]" /> Sao Chép Số Tài Khoản
          </button>
        </div>
      </div>
    </section>
  );
}
