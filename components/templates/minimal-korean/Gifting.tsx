"use client";

import type { WeddingData } from "@/types/template";
import { CreditCard, Copy, ArrowRight } from "lucide-react";
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
    <section className="py-20 px-6 sm:px-12 bg-white border-b border-stone-200">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-stone-900 pb-4 mb-12">
          <div>
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-stone-400 block mb-1">
              // WEDDING REGISTRY & GIFTING
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 tracking-tight">
              Hộp Mừng Cưới
            </h2>
          </div>
          <span className="text-xs font-mono text-stone-500 uppercase tracking-widest mt-2 sm:mt-0">
            BANK TRANSFERS & CONGRATULATIONS
          </span>
        </div>

        <p className="text-sm font-serif italic text-stone-600 mb-10 max-w-xl">
          Sự hiện diện và lời chúc phúc chân thành của quý vị là món quà ý nghĩa nhất. Mọi sự sẻ chia mừng duyên mới xin được gửi về:
        </p>

        {/* 2-Column Monospace Bank Registry */}
        <div className={`grid ${showBoth ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 max-w-md"} gap-8`}>
          {groomGift?.accountNumber && (
            <div className="border-2 border-stone-900 p-8 bg-[#FAF9F6] relative">
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-stone-400 block mb-2">
                ACCOUNT DESIGNATION: GROOM
              </span>
              <h4 className="text-xl font-serif font-bold text-stone-900 mb-1">
                {groomGift.accountHolder || wedding.groomName}
              </h4>
              <p className="text-xs font-mono text-stone-500 mb-4">{groomGift.bankName || "Ngân hàng"}</p>

              <div className="bg-white border border-stone-200 p-3 mb-6 font-mono text-lg font-bold text-stone-900 tracking-wider">
                {groomGift.accountNumber}
              </div>

              <button
                type="button"
                onClick={() => copy(groomGift.accountNumber, "số tài khoản chú rể")}
                className="w-full inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white py-3 px-4 text-xs font-mono font-bold uppercase tracking-wider transition-colors"
              >
                <Copy className="w-3.5 h-3.5" /> Sao chép số tài khoản
              </button>
            </div>
          )}

          {brideGift?.accountNumber && (
            <div className="border-2 border-stone-900 p-8 bg-[#FAF9F6] relative">
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-stone-400 block mb-2">
                ACCOUNT DESIGNATION: BRIDE
              </span>
              <h4 className="text-xl font-serif font-bold text-stone-900 mb-1">
                {brideGift.accountHolder || wedding.brideName}
              </h4>
              <p className="text-xs font-mono text-stone-500 mb-4">{brideGift.bankName || "Ngân hàng"}</p>

              <div className="bg-white border border-stone-200 p-3 mb-6 font-mono text-lg font-bold text-stone-900 tracking-wider">
                {brideGift.accountNumber}
              </div>

              <button
                type="button"
                onClick={() => copy(brideGift.accountNumber, "số tài khoản cô dâu")}
                className="w-full inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white py-3 px-4 text-xs font-mono font-bold uppercase tracking-wider transition-colors"
              >
                <Copy className="w-3.5 h-3.5" /> Sao chép số tài khoản
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
