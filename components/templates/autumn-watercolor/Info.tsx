"use client";

import type { WeddingData } from "@/lib/template-registry";
import { Clock, MapPin, Calendar, Compass, Sparkles } from "lucide-react";

type InfoProps = {
  wedding: WeddingData;
  isBrideMode: boolean;
};

export function WeddingInfo({ wedding, isBrideMode }: InfoProps) {
  const ceremony = isBrideMode ? wedding.brideCeremony : wedding.groomCeremony;
  const title = isBrideMode ? "LỄ VU QUY" : "LỄ TÂN HÔN";
  const groomPhoto = wedding.gallery?.[1] || wedding.gallery?.[0] || "/templates/classic-burgundy/samples/02.jpg";
  const bridePhoto = wedding.gallery?.[2] || wedding.gallery?.[0] || "/templates/classic-burgundy/samples/03.jpg";

  return (
    <section className="py-20 px-4 sm:px-8 bg-[#F7F1EB] border-b border-[#E3D4C5] relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#EFE3D8] border border-[#D9C4B3] text-[#8C4A32] text-xs font-serif uppercase tracking-[0.25em] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#8C4A32]" />
            GIA ĐÌNH HAI HỌ
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#422114] font-medium tracking-tight">
            Trân Trọng Báo Tin Mừng
          </h2>
          <div className="w-16 h-0.5 bg-[#B9856F] mx-auto mt-4 rounded-full" />
        </div>

        {/* 2-Column Watercolor Couple Pavilions on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          {/* Groom Pavilion */}
          <div className="bg-[#FFFDF9] border-2 border-[#E3D4C5] rounded-3xl p-8 text-center relative shadow-xs hover:border-[#B9856F] transition-all">
            <div className="w-28 h-36 mx-auto rounded-full overflow-hidden border-2 border-[#B9856F] mb-6 shadow-md p-1 bg-[#F5EDE4]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={groomPhoto}
                alt="Chú Rể Mùa Thu"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <span className="inline-block px-3 py-0.5 rounded-full bg-[#F5EDE4] text-[#8C4A32] text-[11px] font-serif uppercase tracking-widest border border-[#E3D4C5] mb-2">
              NHÀ TRAI
            </span>
            <h3 className="text-2xl font-serif font-bold text-[#422114] mb-3">
              {wedding.groomName}
            </h3>

            <div className="border-t border-[#E3D4C5] pt-4 text-xs space-y-1">
              <p className="text-[#8C4A32] uppercase text-[10px] tracking-widest font-semibold">THÂN PHỤ & THÂN MẪU</p>
              <p className="text-stone-700 text-sm font-medium">
                {wedding.groomParents?.father || "Ông Nguyễn Văn A"}
              </p>
              <p className="text-stone-700 text-sm font-medium">
                {wedding.groomParents?.mother || "Bà Trần Thị B"}
              </p>
            </div>
          </div>

          {/* Bride Pavilion */}
          <div className="bg-[#FFFDF9] border-2 border-[#E3D4C5] rounded-3xl p-8 text-center relative shadow-xs hover:border-[#B9856F] transition-all">
            <div className="w-28 h-36 mx-auto rounded-full overflow-hidden border-2 border-[#B9856F] mb-6 shadow-md p-1 bg-[#F5EDE4]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={bridePhoto}
                alt="Cô Dâu Mùa Thu"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <span className="inline-block px-3 py-0.5 rounded-full bg-[#F5EDE4] text-[#8C4A32] text-[11px] font-serif uppercase tracking-widest border border-[#E3D4C5] mb-2">
              NHÀ GÁI
            </span>
            <h3 className="text-2xl font-serif font-bold text-[#422114] mb-3">
              {wedding.brideName}
            </h3>

            <div className="border-t border-[#E3D4C5] pt-4 text-xs space-y-1">
              <p className="text-[#8C4A32] uppercase text-[10px] tracking-widest font-semibold">THÂN PHỤ & THÂN MẪU</p>
              <p className="text-stone-700 text-sm font-medium">
                {wedding.brideParents?.father || "Ông Lê Văn C"}
              </p>
              <p className="text-stone-700 text-sm font-medium">
                {wedding.brideParents?.mother || "Bà Phạm Thị D"}
              </p>
            </div>
          </div>
        </div>

        {/* Watercolor Ceremony Card */}
        <div className="bg-[#FFFDF9] border-2 border-[#B9856F]/40 rounded-3xl p-8 sm:p-12 text-center shadow-md relative">
          <span className="inline-block px-5 py-1.5 rounded-full bg-[#8C4A32] text-white text-xs font-serif uppercase tracking-widest mb-4 shadow-xs">
            {title}
          </span>

          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#422114] mb-2">
            {ceremony?.venue || "Nhà Hàng Ven Sông Mùa Thu"}
          </h3>

          <p className="text-stone-500 text-sm flex items-center justify-center gap-2 mb-8">
            <MapPin className="w-4 h-4 text-[#8C4A32]" />
            <span>{ceremony?.address || "123 Đường Ven Hồ, Quận 2, TP. Hồ Chí Minh"}</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-[#F9F5F0] border border-[#E3D4C5] rounded-2xl p-6 mb-8">
            <div className="flex flex-col items-center">
              <Calendar className="w-6 h-6 text-[#8C4A32] mb-2" />
              <span className="text-[10px] uppercase font-serif text-[#8C4A32] font-bold">NGÀY THÀNH HÔN</span>
              <span className="text-base font-serif font-bold text-stone-800">{ceremony?.date || "10.05.2026"}</span>
              {ceremony?.lunarDate && <span className="text-xs text-stone-400">({ceremony.lunarDate})</span>}
            </div>

            <div className="flex flex-col items-center border-y sm:border-y-0 sm:border-x border-[#E3D4C5] py-4 sm:py-0">
              <Clock className="w-6 h-6 text-[#8C4A32] mb-2" />
              <span className="text-[10px] uppercase font-serif text-[#8C4A32] font-bold">LỄ GIA TIÊN</span>
              <span className="text-base font-serif font-bold text-stone-800">{ceremony?.ceremonyTime || "09:00"}</span>
              <span className="text-xs text-stone-500">Nghi lễ truyền thống</span>
            </div>

            <div className="flex flex-col items-center">
              <Sparkles className="w-6 h-6 text-[#8C4A32] mb-2" />
              <span className="text-[10px] uppercase font-serif text-[#8C4A32] font-bold">TIỆC MỪNG DẠ YẾN</span>
              <span className="text-base font-serif font-bold text-stone-800">{ceremony?.receptionTime || "11:30"}</span>
              <span className="text-xs text-stone-500">Kính mời cùng nâng ly</span>
            </div>
          </div>

          {ceremony?.googleMapsUrl && (
            <a
              href={ceremony.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#8C4A32] hover:bg-[#723722] text-white font-serif text-xs uppercase tracking-wider shadow-sm transition-all hover:scale-105"
            >
              <Compass className="w-4 h-4" /> Chỉ Đường Google Maps
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
