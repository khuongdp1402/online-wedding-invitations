"use client";

import type { WeddingData } from "@/types/template";
import { CreditCard, Copy, Sparkles, Gift } from "lucide-react";
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

  const showBoth = Boolean(groomGift?.accountNumber && brideGift?.accountNumber);

  return (
    <section className="py-20 px-4 sm:px-8 bg-[#061811] border-b border-[#D4AF37]/30 relative overflow-hidden">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-serif uppercase tracking-[0.3em] mb-2">
          <Gift className="w-3.5 h-3.5 text-[#D4AF37]" /> WEDDING GIFTING
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold mb-4">
          Hộp Mừng Cưới Gatsby
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto mb-14 font-serif leading-relaxed">
          Sự hiện diện nâng ly cùng gia đình chúng tôi là món quà tuyệt vời nhất. Quý khách cũng có thể gửi lời chúc phúc và quà mừng qua tài khoản dưới đây:
        </p>

        {/* 2-Column Art Deco Gifting Cards */}
        <div className={`grid ${showBoth ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 max-w-md mx-auto"} gap-8`}>
          {groomGift?.accountNumber && (
            <div className="bg-[#0A261D] border-2 border-[#D4AF37] p-8 rounded-none shadow-2xl relative group hover:border-white transition-all">
              <div className="w-14 h-14 border border-[#D4AF37] flex items-center justify-center mx-auto mb-4 text-[#D4AF37] shadow-md">
                <CreditCard className="w-6 h-6" />
              </div>

              <span className="inline-block px-4 py-0.5 bg-[#04120D] text-[#D4AF37] text-xs font-mono uppercase tracking-widest border border-[#D4AF37]/40 mb-2">
                MỪNG CƯỚI CHÚ RỂ
              </span>
              <h4 className="text-xl font-serif font-bold text-white mb-1">
                {groomGift.accountHolder || wedding.groomName}
              </h4>
              <p className="text-xs font-mono text-stone-400 mb-4">{groomGift.bankName || "Ngân hàng"}</p>

              <div className="bg-[#04120D] border border-[#D4AF37]/40 p-3 mb-6 font-mono text-xl font-bold text-[#D4AF37] tracking-widest">
                {groomGift.accountNumber}
              </div>

              <button
                type="button"
                onClick={() => copy(groomGift.accountNumber, "số tài khoản chú rể")}
                className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#D4AF37] hover:bg-[#BFA030] text-[#04120D] font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
              >
                <Copy className="w-3.5 h-3.5" /> Sao Chép Số Tài Khoản
              </button>
            </div>
          )}

          {brideGift?.accountNumber && (
            <div className="bg-[#0A261D] border-2 border-[#D4AF37] p-8 rounded-none shadow-2xl relative group hover:border-white transition-all">
              <div className="w-14 h-14 border border-[#D4AF37] flex items-center justify-center mx-auto mb-4 text-[#D4AF37] shadow-md">
                <CreditCard className="w-6 h-6" />
              </div>

              <span className="inline-block px-4 py-0.5 bg-[#04120D] text-[#D4AF37] text-xs font-mono uppercase tracking-widest border border-[#D4AF37]/40 mb-2">
                MỪNG CƯỚI CÔ DÂU
              </span>
              <h4 className="text-xl font-serif font-bold text-white mb-1">
                {brideGift.accountHolder || wedding.brideName}
              </h4>
              <p className="text-xs font-mono text-stone-400 mb-4">{brideGift.bankName || "Ngân hàng"}</p>

              <div className="bg-[#04120D] border border-[#D4AF37]/40 p-3 mb-6 font-mono text-xl font-bold text-[#D4AF37] tracking-widest">
                {brideGift.accountNumber}
              </div>

              <button
                type="button"
                onClick={() => copy(brideGift.accountNumber, "số tài khoản cô dâu")}
                className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#D4AF37] hover:bg-[#BFA030] text-[#04120D] font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
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
