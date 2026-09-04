"use client";

import type { WeddingData } from "@/types/template";
import { CreditCard, Copy, Gift, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type GiftingProps = {
  wedding: WeddingData;
  isBrideMode: boolean;
};

export function Gifting({ wedding, isBrideMode }: GiftingProps) {
  const { toast } = useToast();
  const groomGift = wedding.gifting?.groom;
  const brideGift = wedding.gifting?.bride;

  function copy(text: string, label: string) {
    navigator.clipboard.writeText(text);
    toast({ title: `Đã sao chép ${label}` });
  }

  // If both exist, show 2 envelopes on desktop; otherwise show available one
  const showBoth = Boolean(groomGift?.accountNumber && brideGift?.accountNumber);
  const singleGift = isBrideMode ? brideGift : groomGift;

  return (
    <section className="py-20 px-4 sm:px-8 bg-white border-b border-[#EEDFD5] relative">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDF8F5] border border-[#EEDFD5] text-[#C25E42] text-[11px] uppercase tracking-[0.25em] font-semibold mb-3">
          <Gift className="w-3.5 h-3.5" /> HỘP MỪNG CƯỚI
        </div>
        <h2 className="text-3xl font-serif text-[#3A231B] mb-3 font-medium">Gửi Lời Chúc Phúc & Mừng Cưới</h2>
        <p className="text-xs sm:text-sm text-stone-500 mb-12 max-w-md mx-auto leading-relaxed">
          Sự hiện diện và lời chúc phúc của quý khách là món quà quý giá nhất dành cho chúng mình. Quý khách cũng có thể gửi quà mừng qua phương thức dưới đây.
        </p>

        <div className={`grid ${showBoth ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 max-w-md mx-auto"} gap-8`}>
          {/* Groom Envelope */}
          {groomGift?.accountNumber && (
            <div className="bg-[#FDF8F5] border-2 border-[#EEDFD5] p-8 rounded-t-full rounded-b-3xl shadow-sm text-center relative group hover:border-[#C25E42] transition-all">
              <div className="w-14 h-14 rounded-full bg-white border border-[#EEDFD5] flex items-center justify-center mx-auto mb-4 text-[#C25E42] shadow-xs">
                <CreditCard className="w-6 h-6" />
              </div>

              <span className="inline-block px-3 py-0.5 rounded-full bg-white text-[#C25E42] text-[11px] font-semibold tracking-wider uppercase border border-[#EEDFD5] mb-2">
                MỪNG CƯỚI CHÚ RỂ
              </span>
              <h4 className="text-lg font-serif font-bold text-stone-900 mb-1">{groomGift.accountHolder || wedding.groomName}</h4>
              <p className="text-xs text-stone-500 mb-2">{groomGift.bankName || "Ngân hàng"}</p>
              <p className="text-lg font-mono font-bold text-[#C25E42] mb-6 tracking-wider">{groomGift.accountNumber}</p>

              <button
                type="button"
                onClick={() => copy(groomGift.accountNumber, "số tài khoản chú rể")}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-[#EEDFD5] text-xs font-semibold text-stone-700 hover:bg-[#C25E42] hover:text-white transition-all shadow-xs"
              >
                <Copy className="w-3.5 h-3.5" /> Sao Chép Số Tài Khoản
              </button>
            </div>
          )}

          {/* Bride Envelope */}
          {brideGift?.accountNumber && (
            <div className="bg-[#FDF8F5] border-2 border-[#EEDFD5] p-8 rounded-t-full rounded-b-3xl shadow-sm text-center relative group hover:border-[#C25E42] transition-all">
              <div className="w-14 h-14 rounded-full bg-white border border-[#EEDFD5] flex items-center justify-center mx-auto mb-4 text-[#C25E42] shadow-xs">
                <CreditCard className="w-6 h-6" />
              </div>

              <span className="inline-block px-3 py-0.5 rounded-full bg-white text-[#C25E42] text-[11px] font-semibold tracking-wider uppercase border border-[#EEDFD5] mb-2">
                MỪNG CƯỚI CÔ DÂU
              </span>
              <h4 className="text-lg font-serif font-bold text-stone-900 mb-1">{brideGift.accountHolder || wedding.brideName}</h4>
              <p className="text-xs text-stone-500 mb-2">{brideGift.bankName || "Ngân hàng"}</p>
              <p className="text-lg font-mono font-bold text-[#C25E42] mb-6 tracking-wider">{brideGift.accountNumber}</p>

              <button
                type="button"
                onClick={() => copy(brideGift.accountNumber, "số tài khoản cô dâu")}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-[#EEDFD5] text-xs font-semibold text-stone-700 hover:bg-[#C25E42] hover:text-white transition-all shadow-xs"
              >
                <Copy className="w-3.5 h-3.5" /> Sao Chép Số Tài Khoản
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
