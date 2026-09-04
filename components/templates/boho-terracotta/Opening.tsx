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
      <div className="relative w-full max-w-sm bg-[#FDF8F5] border-2 border-[#EEDFD5] rounded-3xl p-8 shadow-2xl text-center overflow-hidden">
        {/* Boho sun icon */}
        <div className="w-16 h-16 rounded-full bg-[#F5E6DD] border border-[#DDA15E]/40 flex items-center justify-center mx-auto mb-4 text-2xl text-[#C25E42] shadow-xs">
          ☀️
        </div>

        <p className="text-[11px] uppercase tracking-[0.25em] text-[#C25E42] font-semibold mb-2">
          THƯ MỜI THÀNH HÔN
        </p>

        <h1 className="text-2xl font-serif text-[#3A231B] mb-4 font-semibold tracking-wide">
          {title}
        </h1>

        {guestName && (
          <div className="my-6 p-4 rounded-2xl bg-white border border-[#EEDFD5] shadow-xs">
            <p className="text-xs text-stone-500 mb-1">{guestSalutation}</p>
            <p className="text-base font-serif font-bold text-[#C25E42]">{guestName}</p>
          </div>
        )}

        <p className="text-xs text-stone-600 mb-8 italic">
          &ldquo;Gặp gỡ nhau giữa vạn người, hẹn ước cùng nhau trọn cuộc đời&rdquo;
        </p>

        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
            setTimeout(() => setIsDismissed(true), 700);
          }}
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#C25E42] hover:bg-[#A64A31] text-white font-medium text-xs tracking-wider uppercase shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <MailOpen className="w-4 h-4" /> Mở Thiệp Cưới
        </button>
      </div>
    </div>
  );
}
