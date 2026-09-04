"use client";

import type { WeddingData } from "@/types/template";
import { Clock, MapPin, Calendar, Compass, Sprout } from "lucide-react";

type InfoProps = {
  wedding: WeddingData;
  isBrideMode: boolean;
};

export function Info({ wedding, isBrideMode }: InfoProps) {
  const ceremony = isBrideMode ? wedding.brideCeremony : wedding.groomCeremony;
  const title = isBrideMode ? "LỄ VU QUY" : "LỄ TÂN HÔN";
  const groomPhoto = wedding.gallery?.[1] || wedding.gallery?.[0] || "/templates/classic-burgundy/samples/02.jpg";
  const bridePhoto = wedding.gallery?.[2] || wedding.gallery?.[0] || "/templates/classic-burgundy/samples/03.jpg";

  return (
    <section className="py-20 px-4 sm:px-8 bg-[#FAF8F2] border-b border-[#D8E2D5] relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#EBF2E8] border border-[#C5D5C1] text-[#2D4A3E] text-xs font-serif uppercase tracking-[0.25em] mb-2">
            <Sprout className="w-3.5 h-3.5 text-[#556B2F]" />
            GIA ĐÌNH HAI HỌ
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#2D4A3E] font-medium tracking-tight">
            Trân Trọng Kính Báo
          </h2>
          <div className="w-16 h-0.5 bg-[#8A9A5B] mx-auto mt-4 rounded-full" />
        </div>

        {/* Dual Botanical Groves (2-Column Desktop Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          {/* Groom Olive Grove */}
          <div className="bg-white border-2 border-[#D8E2D5] rounded-3xl p-8 text-center relative shadow-xs hover:border-[#8A9A5B] transition-all">
            <div className="w-28 h-36 mx-auto rounded-2xl overflow-hidden border-2 border-[#C5D5C1] mb-6 shadow-inner p-1 bg-[#FAF8F2]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={groomPhoto}
                alt="Groom Botanical"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            <span className="inline-block px-3 py-0.5 rounded-full bg-[#F2F7F0] text-[#2D4A3E] text-[11px] font-serif uppercase tracking-widest border border-[#D8E2D5] mb-2">
              NHÀ TRAI
            </span>
            <h3 className="text-2xl font-serif font-bold text-[#2D4A3E] mb-3">
              {wedding.groomName}
            </h3>

            <div className="border-t border-[#D8E2D5] pt-4 text-xs space-y-1">
              <p className="text-[#8A9A5B] uppercase text-[10px] tracking-widest font-semibold">THÂN PHỤ & THÂN MẪU</p>
              <p className="text-stone-700 text-sm font-medium">
                {wedding.groomParents?.father || "Ông Nguyễn Văn A"}
              </p>
              <p className="text-stone-700 text-sm font-medium">
                {wedding.groomParents?.mother || "Bà Trần Thị B"}
              </p>
            </div>
          </div>

          {/* Bride Eucalyptus Grove */}
          <div className="bg-white border-2 border-[#D8E2D5] rounded-3xl p-8 text-center relative shadow-xs hover:border-[#8A9A5B] transition-all">
            <div className="w-28 h-36 mx-auto rounded-2xl overflow-hidden border-2 border-[#C5D5C1] mb-6 shadow-inner p-1 bg-[#FAF8F2]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={bridePhoto}
                alt="Bride Botanical"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            <span className="inline-block px-3 py-0.5 rounded-full bg-[#F2F7F0] text-[#2D4A3E] text-[11px] font-serif uppercase tracking-widest border border-[#D8E2D5] mb-2">
              NHÀ GÁI
            </span>
            <h3 className="text-2xl font-serif font-bold text-[#2D4A3E] mb-3">
              {wedding.brideName}
            </h3>

            <div className="border-t border-[#D8E2D5] pt-4 text-xs space-y-1">
              <p className="text-[#8A9A5B] uppercase text-[10px] tracking-widest font-semibold">THÂN PHỤ & THÂN MẪU</p>
              <p className="text-stone-700 text-sm font-medium">
                {wedding.brideParents?.father || "Ông Lê Văn C"}
              </p>
              <p className="text-stone-700 text-sm font-medium">
                {wedding.brideParents?.mother || "Bà Phạm Thị D"}
              </p>
            </div>
          </div>
        </div>

        {/* Glasshouse Conservatory Ceremony Card */}
        <div className="bg-white border-2 border-[#8A9A5B]/40 rounded-3xl p-8 sm:p-12 text-center shadow-md relative">
          <span className="inline-block px-5 py-1.5 rounded-full bg-[#2D4A3E] text-white text-xs font-serif uppercase tracking-widest mb-4 shadow-xs">
            {title}
          </span>

          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D4A3E] mb-2">
            {ceremony?.venue || "Nhà Kính Sinh Thái & Vườn Nhiệt Đới"}
          </h3>

          <p className="text-stone-500 text-sm flex items-center justify-center gap-2 mb-8">
            <MapPin className="w-4 h-4 text-[#8A9A5B]" />
            <span>{ceremony?.address || "123 Thung Lũng Xanh, TP. Đà Lạt"}</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-[#F8FAF6] border border-[#D8E2D5] rounded-2xl p-6 mb-8">
            <div className="flex flex-col items-center">
              <Calendar className="w-6 h-6 text-[#2D4A3E] mb-2" />
              <span className="text-[10px] uppercase font-serif text-[#8A9A5B] font-bold">NGÀY ĐƯỢC CHỌN</span>
              <span className="text-base font-serif font-bold text-stone-800">{ceremony?.date || "22.11.2026"}</span>
              {ceremony?.lunarDate && <span className="text-xs text-stone-400">({ceremony.lunarDate})</span>}
            </div>

            <div className="flex flex-col items-center border-y sm:border-y-0 sm:border-x border-[#D8E2D5] py-4 sm:py-0">
              <Clock className="w-6 h-6 text-[#2D4A3E] mb-2" />
              <span className="text-[10px] uppercase font-serif text-[#8A9A5B] font-bold">LỄ GIA TIÊN</span>
              <span className="text-base font-serif font-bold text-stone-800">{ceremony?.ceremonyTime || "09:00"}</span>
              <span className="text-xs text-stone-500">Nghi thức trang trọng</span>
            </div>

            <div className="flex flex-col items-center">
              <Sprout className="w-6 h-6 text-[#2D4A3E] mb-2" />
              <span className="text-[10px] uppercase font-serif text-[#8A9A5B] font-bold">TIỆC TRONG VƯỜN</span>
              <span className="text-base font-serif font-bold text-stone-800">{ceremony?.receptionTime || "11:30"}</span>
              <span className="text-xs text-stone-500">Nâng ly chúc phúc</span>
            </div>
          </div>

          {ceremony?.googleMapsUrl && (
            <a
              href={ceremony.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2D4A3E] hover:bg-[#1E332A] text-white font-serif text-xs uppercase tracking-wider shadow-sm transition-all hover:scale-105"
            >
              <Compass className="w-4 h-4" /> Chỉ Đường Đến Khu Vườn (Google Maps)
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
