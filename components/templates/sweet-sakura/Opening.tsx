"use client";

import { useState } from "react";
import { MailOpen } from "lucide-react";

type WeddingCardOpeningProps = {
  groomName?: string;
  brideName?: string;
  isBrideMode?: boolean;
  guestName?: string;
  guestSalutation?: string;
};

export function WeddingCardOpening({
  groomName = "Hoàng Long",
  brideName = "Thanh Hương",
  isBrideMode = false,
  guestName,
  guestSalutation = "Kính mời",
}: WeddingCardOpeningProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  const title = isBrideMode ? `${brideName} & ${groomName}` : `${groomName} & ${brideName}`;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-700 ${
        isOpen ? "opacity-0 pointer-events-none scale-105" : "opacity-100 bg-stone-900/60 backdrop-blur-sm"
      }`}
    >
      <div className="relative w-full max-w-sm bg-[#FFF7F9] border-2 border-[#F6D6DF] rounded-3xl p-8 shadow-2xl text-center overflow-hidden">
        {/* Sakura petals floating background */}
        <div className="absolute -top-6 -right-6 w-20 h-20 text-4xl opacity-30 select-none pointer-events-none">
          🌸
        </div>
        <div className="absolute -bottom-6 -left-6 w-20 h-20 text-4xl opacity-30 select-none pointer-events-none">
          🌸
        </div>

        <div className="w-16 h-16 rounded-full bg-[#FFEBF0] border border-[#F8B4C4] flex items-center justify-center mx-auto mb-4 text-2xl shadow-xs">
          🌸
        </div>

        <p className="text-[11px] uppercase tracking-[0.25em] text-[#E05A7A] font-semibold mb-2">
          THƯ MỜI CƯỚI
        </p>

        <h1 className="text-2xl font-serif text-[#382329] mb-4 font-semibold tracking-wide">
          {title}
        </h1>

        {guestName && (
          <div className="my-6 p-4 rounded-2xl bg-white border border-[#F6D6DF] shadow-xs">
            <p className="text-xs text-stone-500 mb-1">{guestSalutation}</p>
            <p className="text-base font-serif font-bold text-[#E05A7A]">{guestName}</p>
          </div>
        )}

        <p className="text-xs text-stone-600 mb-8 italic">
          &ldquo;Nguyện cùng người đi qua bốn mùa rực rỡ, trăm năm hẹn ước vẹn toàn&rdquo;
        </p>

        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
            setTimeout(() => setIsDismissed(true), 700);
          }}
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-gradient-to-r from-[#E05A7A] to-[#F08098] hover:opacity-95 text-white font-medium text-xs tracking-wider uppercase shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <MailOpen className="w-4 h-4" /> Mở Thiệp Mừng
        </button>
      </div>
    </div>
  );
}
