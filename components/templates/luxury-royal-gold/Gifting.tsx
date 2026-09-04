"use client";

import type { WeddingData } from "@/types/template";
import { CreditCard, Copy, Crown, Sparkles } from "lucide-react";
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
    <section className="py-20 px-4 sm:px-8 bg-[#0B0B14] border-b border-[#C9A84C]/30 relative overflow-hidden">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/40 text-[#FFE29F] text-xs font-serif uppercase tracking-[0.3em] mb-3">
          <Crown className="w-3.5 h-3.5 text-[#C9A84C]" />
          ROYAL TRIBUTE & CONGRATULATIONS
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#FFE29F] font-bold mb-4">
          Hộp Mừng Cưới Hoàng Gia
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto mb-14 font-serif leading-relaxed">
          Tình cảm quý mến và sự hiện diện diện kiến của quý khách là niềm vinh hạnh tối thượng của hoàng gia hai họ.
        </p>

        {/* 2-Column Royal Treasury Cards */}
        <div className={`grid ${showBoth ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 max-w-md mx-auto"} gap-8`}>
          {groomGift?.accountNumber && (
            <div className="bg-gradient-to-b from-[#141424] to-[#0E0E18] border-2 border-[#C9A84C] rounded-2xl p-8 shadow-2xl relative group hover:border-[#FFE29F] transition-all">
              <div className="w-14 h-14 rounded-full bg-[#7A0020] border-2 border-[#C9A84C] flex items-center justify-center mx-auto mb-4 text-[#FFE29F] shadow-md">
                <CreditCard className="w-6 h-6" />
              </div>

              <span className="inline-block px-4 py-0.5 rounded-full bg-[#C9A84C]/20 text-[#FFE29F] text-xs font-serif uppercase tracking-widest border border-[#C9A84C]/40 mb-2">
                HỘP MỪNG HOÀNG TỬ / CHÚ RỂ
              </span>
              <h4 className="text-xl font-serif font-bold text-white mb-1">
                {groomGift.accountHolder || wedding.groomName}
              </h4>
              <p className="text-xs font-serif text-[#C9A84C] mb-4">{groomGift.bankName || "Ngân hàng Hoàng Gia"}</p>

              <div className="bg-[#0A0A12] border border-[#C9A84C]/40 p-3 rounded-lg mb-6 font-mono text-xl font-bold text-[#FFE29F] tracking-widest">
                {groomGift.accountNumber}
              </div>

              <button
                type="button"
                onClick={() => copy(groomGift.accountNumber, "số tài khoản chú rể")}
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-gradient-to-r from-[#7A0020] to-[#8B0000] border border-[#C9A84C] text-xs font-serif font-bold text-[#FFE29F] uppercase tracking-wider hover:brightness-110 transition-all shadow-lg"
              >
                <Copy className="w-3.5 h-3.5" /> Sao Chép Số Tài Khoản
              </button>
            </div>
          )}

          {brideGift?.accountNumber && (
            <div className="bg-gradient-to-b from-[#141424] to-[#0E0E18] border-2 border-[#C9A84C] rounded-2xl p-8 shadow-2xl relative group hover:border-[#FFE29F] transition-all">
              <div className="w-14 h-14 rounded-full bg-[#7A0020] border-2 border-[#C9A84C] flex items-center justify-center mx-auto mb-4 text-[#FFE29F] shadow-md">
                <CreditCard className="w-6 h-6" />
              </div>

              <span className="inline-block px-4 py-0.5 rounded-full bg-[#C9A84C]/20 text-[#FFE29F] text-xs font-serif uppercase tracking-widest border border-[#C9A84C]/40 mb-2">
                HỘP MỪNG CÔNG CHÚA / CÔ DÂU
              </span>
              <h4 className="text-xl font-serif font-bold text-white mb-1">
                {brideGift.accountHolder || wedding.brideName}
              </h4>
              <p className="text-xs font-serif text-[#C9A84C] mb-4">{brideGift.bankName || "Ngân hàng Hoàng Gia"}</p>

              <div className="bg-[#0A0A12] border border-[#C9A84C]/40 p-3 rounded-lg mb-6 font-mono text-xl font-bold text-[#FFE29F] tracking-widest">
                {brideGift.accountNumber}
              </div>

              <button
                type="button"
                onClick={() => copy(brideGift.accountNumber, "số tài khoản cô dâu")}
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-gradient-to-r from-[#7A0020] to-[#8B0000] border border-[#C9A84C] text-xs font-serif font-bold text-[#FFE29F] uppercase tracking-wider hover:brightness-110 transition-all shadow-lg"
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
