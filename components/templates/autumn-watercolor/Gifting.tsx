"use client";

import type { WeddingData } from "@/lib/template-registry";
import { CreditCard, Copy, Heart } from "lucide-react";
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
    <section className="py-20 px-4 sm:px-8 bg-[#F7F1EB] border-b border-[#E3D4C5] relative overflow-hidden">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#EFE3D8] border border-[#D9C4B3] text-[#8C4A32] text-xs font-serif uppercase tracking-[0.25em] mb-2">
          <Heart className="w-3.5 h-3.5 fill-current text-[#8C4A32]" />
          GỬI TRAO YÊU THƯƠNG
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#422114] font-medium mb-3">
          Hộp Mừng Cưới Mùa Thu
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 max-w-lg mx-auto mb-14 leading-relaxed">
          Sự hiện diện và lời chúc phúc chân thành của quý khách là niềm hạnh phúc lớn nhất của chúng mình.
        </p>

        {/* 2-Column Watercolor Cards on Desktop */}
        <div className={`grid ${showBoth ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 max-w-md mx-auto"} gap-8`}>
          {groomGift?.accountNumber && (
            <div className="bg-[#FFFDF9] border-2 border-[#E3D4C5] p-8 rounded-3xl shadow-sm text-center relative group hover:border-[#8C4A32] transition-all">
              <div className="w-14 h-14 rounded-full bg-[#F5EDE4] border border-[#B9856F] flex items-center justify-center mx-auto mb-4 text-[#8C4A32] shadow-xs">
                <CreditCard className="w-6 h-6" />
              </div>

              <span className="inline-block px-3 py-0.5 rounded-full bg-[#F5EDE4] text-[#8C4A32] text-xs font-serif uppercase tracking-widest border border-[#E3D4C5] mb-2">
                MỪNG CƯỚI CHÚ RỂ
              </span>
              <h4 className="text-xl font-serif font-bold text-stone-900 mb-1">
                {groomGift.accountHolder || wedding.groomName}
              </h4>
              <p className="text-xs text-stone-500 mb-4">{groomGift.bankName || "Ngân hàng"}</p>

              <div className="bg-[#F7F1EB] border border-[#E3D4C5] p-3 rounded-xl mb-6 font-mono text-xl font-bold text-[#8C4A32] tracking-wider">
                {groomGift.accountNumber}
              </div>

              <button
                type="button"
                onClick={() => copy(groomGift.accountNumber, "số tài khoản chú rể")}
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#8C4A32] hover:bg-[#723722] text-white font-serif text-xs font-semibold uppercase tracking-wider transition-all shadow-xs"
              >
                <Copy className="w-3.5 h-3.5" /> Sao Chép Số Tài Khoản
              </button>
            </div>
          )}

          {brideGift?.accountNumber && (
            <div className="bg-[#FFFDF9] border-2 border-[#E3D4C5] p-8 rounded-3xl shadow-sm text-center relative group hover:border-[#8C4A32] transition-all">
              <div className="w-14 h-14 rounded-full bg-[#F5EDE4] border border-[#B9856F] flex items-center justify-center mx-auto mb-4 text-[#8C4A32] shadow-xs">
                <CreditCard className="w-6 h-6" />
              </div>

              <span className="inline-block px-3 py-0.5 rounded-full bg-[#F5EDE4] text-[#8C4A32] text-xs font-serif uppercase tracking-widest border border-[#E3D4C5] mb-2">
                MỪNG CƯỚI CÔ DÂU
              </span>
              <h4 className="text-xl font-serif font-bold text-stone-900 mb-1">
                {brideGift.accountHolder || wedding.brideName}
              </h4>
              <p className="text-xs text-stone-500 mb-4">{brideGift.bankName || "Ngân hàng"}</p>

              <div className="bg-[#F7F1EB] border border-[#E3D4C5] p-3 rounded-xl mb-6 font-mono text-xl font-bold text-[#8C4A32] tracking-wider">
                {brideGift.accountNumber}
              </div>

              <button
                type="button"
                onClick={() => copy(brideGift.accountNumber, "số tài khoản cô dâu")}
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#8C4A32] hover:bg-[#723722] text-white font-serif text-xs font-semibold uppercase tracking-wider transition-all shadow-xs"
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
