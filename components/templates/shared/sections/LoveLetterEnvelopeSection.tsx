"use client";

import React, { useState } from "react";
import { Mail, Heart, Sparkles } from "lucide-react";

interface LoveLetterEnvelopeSectionProps {
  groomName?: string;
  brideName?: string;
  letterTitle?: string;
  letterContent?: string;
  badge?: string;
}

export function LoveLetterEnvelopeSection({
  groomName = "Chú Rể",
  brideName = "Cô Dâu",
  letterTitle = "Tâm Thư Gửi Quý Khách",
  letterContent = "Gặp gỡ và yêu nhau là một hành trình kỳ diệu, nhưng hành trình ấy sẽ chẳng thể trọn vẹn nếu thiếu đi sự yêu thương và đồng hành của bạn. Ngày hôm nay, khi chúng mình chính thức nắm tay nhau bước vào cánh cửa hôn nhân, sự hiện diện và lời chúc phúc của bạn chính là món quà quý giá và ý nghĩa nhất đối với chúng mình.",
  badge = "A MESSAGE FROM US",
}: LoveLetterEnvelopeSectionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <section className="py-20 px-4 sm:px-8 bg-[#FAF6EE] border-b border-[#E8DFC8] text-center relative overflow-hidden">
      <div className="max-w-2xl mx-auto relative z-10">
        {badge && (
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#EAE2D0] text-[#5D6B58] border border-[#D5C6A8] text-xs font-serif uppercase tracking-[0.25em] mb-3">
            <Mail className="w-3.5 h-3.5" />
            {badge}
          </span>
        )}
        <h2 className="text-3xl font-serif text-[#2D3E2E] mb-3 font-medium">
          {letterTitle}
        </h2>
        <p className="text-xs sm:text-sm text-[#6C7865] max-w-md mx-auto mb-10 leading-relaxed font-serif">
          Chạm vào phong bì để mở lá thư tay mà chúng mình gửi gắm đến bạn.
        </p>

        {/* Envelope Interactive Component */}
        <div className="relative max-w-lg mx-auto select-none">
          {!isOpen ? (
            /* Closed Envelope State */
            <div
              onClick={() => setIsOpen(true)}
              className="bg-[#FFFDF9] border-2 border-[#D5C6A8] p-8 sm:p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer group hover:-translate-y-1 relative"
            >
              {/* Envelope Flap visual */}
              <div className="absolute top-0 left-0 right-0 h-16 border-b border-[#E8DFC8] bg-gradient-to-b from-[#F2ECE1] to-[#FFFDF9] rounded-t-2xl flex items-center justify-center">
                {/* Red Wax Seal */}
                <div className="w-12 h-12 rounded-full bg-[#8B0000] border-2 border-[#E5A93C] shadow-lg flex items-center justify-center text-[#E5A93C] group-hover:scale-110 transition-transform -translate-y-2">
                  <Heart className="w-5 h-5 fill-[#E5A93C]" />
                </div>
              </div>

              <div className="pt-10 text-center font-serif">
                <span className="text-xs tracking-widest text-[#8C7A6B] uppercase block mb-1">
                  THƯ MỜI &amp; TÂM TÌNH
                </span>
                <span className="text-lg font-bold text-[#2D3E2E]">
                  {groomName} &amp; {brideName}
                </span>
                <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE2D0] text-[#4A5D3F] text-xs font-serif">
                  <Sparkles className="w-3 h-3" />
                  Nhấn để mở phong bì
                </div>
              </div>
            </div>
          ) : (
            /* Open Letter State */
            <div className="bg-[#FFFDF9] border-2 border-[#C5D5C1] p-6 sm:p-8 rounded-2xl shadow-2xl relative text-left animate-in fade-in zoom-in-95 duration-500">
              <div className="flex items-center justify-between border-b border-[#E8DFC8] pb-3 mb-4">
                <span className="text-xs font-serif text-[#8A9A5B] tracking-widest uppercase font-bold">
                  LỜI NGỎ YÊU THƯƠNG
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-serif text-stone-400 hover:text-stone-700 underline"
                >
                  Đóng phong bì
                </button>
              </div>

              <p className="font-serif text-sm sm:text-base text-[#3A4A3B] leading-relaxed italic mb-6">
                &ldquo;{letterContent}&rdquo;
              </p>

              <div className="text-right border-t border-[#E8DFC8] pt-4 font-serif">
                <span className="text-xs text-stone-400 block mb-1">Thương mến,</span>
                <span className="text-lg font-bold text-[#2D3E2E]">
                  {groomName} &amp; {brideName}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
