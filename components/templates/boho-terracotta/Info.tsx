"use client";

import type { WeddingData } from "@/types/template";
import { Clock, MapPin, Calendar, Compass, Sun, Heart } from "lucide-react";

type InfoProps = {
  wedding: WeddingData;
  isBrideMode: boolean;
};

export function Info({ wedding, isBrideMode }: InfoProps) {
  const ceremony = isBrideMode ? wedding.brideCeremony : wedding.groomCeremony;
  const title = isBrideMode ? "Lễ Vu Quy" : "Lễ Tân Hôn";
  const firstPhoto = wedding.gallery?.[1] || wedding.gallery?.[0] || "/templates/classic-burgundy/samples/02.jpg";
  const secondPhoto = wedding.gallery?.[2] || wedding.gallery?.[0] || "/templates/classic-burgundy/samples/03.jpg";

  return (
    <section className="py-16 px-4 sm:px-8 bg-[#FDF8F5] border-y border-[#EEDFD5] relative overflow-hidden">
      {/* Background Decorative Earthen Arches */}
      <div className="absolute top-10 left-[-60px] w-64 h-96 rounded-t-full border-2 border-[#EEDFD5]/40 pointer-events-none -rotate-12" />
      <div className="absolute bottom-10 right-[-60px] w-80 h-[450px] rounded-t-full border-2 border-[#DDA15E]/20 pointer-events-none rotate-6" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5E6DD] border border-[#EEDFD5] text-[#C25E42] text-[11px] uppercase tracking-[0.25em] font-semibold mb-3">
            <Sun className="w-3.5 h-3.5" /> GIA ĐÌNH HAI HỌ
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-[#3A231B] font-medium tracking-tight">
            Trân Trọng Báo Hỷ
          </h2>
          <div className="w-16 h-0.5 bg-[#C25E42] mx-auto mt-4 rounded-full" />
        </div>

        {/* Dual Arched Family Pavilion (Desktop 2-Column, Mobile Stacked) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          {/* Groom Family Arch */}
          <div className="bg-white/80 backdrop-blur-xs rounded-t-[100px] rounded-b-3xl border-2 border-[#EEDFD5] p-6 sm:p-8 text-center shadow-sm relative group hover:border-[#C25E42]/50 transition-all">
            <div className="w-24 h-32 mx-auto rounded-t-full rounded-b-lg overflow-hidden border-2 border-[#DDA15E] mb-5 shadow-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={firstPhoto}
                alt="Nhà Trai"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <span className="inline-block px-3 py-0.5 rounded-full bg-[#FDF8F5] text-[#C25E42] font-semibold text-[11px] uppercase tracking-widest border border-[#EEDFD5] mb-2">
              NHÀ TRAI
            </span>
            <h3 className="text-xl font-serif text-[#3A231B] font-bold mb-3">
              {wedding.groomName}
            </h3>
            <div className="border-t border-[#EEDFD5] pt-3 text-xs text-stone-600 space-y-1">
              <p className="text-stone-400 uppercase text-[10px] tracking-wider">Thân phụ & Thân mẫu</p>
              <p className="font-medium text-stone-800 text-sm">
                {wedding.groomParents?.father || "Ông Nguyễn Văn A"}
              </p>
              <p className="font-medium text-stone-800 text-sm">
                {wedding.groomParents?.mother || "Bà Trần Thị B"}
              </p>
            </div>
          </div>

          {/* Bride Family Arch */}
          <div className="bg-white/80 backdrop-blur-xs rounded-t-[100px] rounded-b-3xl border-2 border-[#EEDFD5] p-6 sm:p-8 text-center shadow-sm relative group hover:border-[#C25E42]/50 transition-all">
            <div className="w-24 h-32 mx-auto rounded-t-full rounded-b-lg overflow-hidden border-2 border-[#DDA15E] mb-5 shadow-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={secondPhoto}
                alt="Nhà Gái"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <span className="inline-block px-3 py-0.5 rounded-full bg-[#FDF8F5] text-[#C25E42] font-semibold text-[11px] uppercase tracking-widest border border-[#EEDFD5] mb-2">
              NHÀ GÁI
            </span>
            <h3 className="text-xl font-serif text-[#3A231B] font-bold mb-3">
              {wedding.brideName}
            </h3>
            <div className="border-t border-[#EEDFD5] pt-3 text-xs text-stone-600 space-y-1">
              <p className="text-stone-400 uppercase text-[10px] tracking-wider">Thân phụ & Thân mẫu</p>
              <p className="font-medium text-stone-800 text-sm">
                {wedding.brideParents?.father || "Ông Lê Văn C"}
              </p>
              <p className="font-medium text-stone-800 text-sm">
                {wedding.brideParents?.mother || "Bà Phạm Thị D"}
              </p>
            </div>
          </div>
        </div>

        {/* Grand Ceremony Arch Pavilion */}
        <div className="bg-white rounded-[32px] border-2 border-[#C25E42]/30 p-8 md:p-10 shadow-lg relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#C25E42]/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block px-5 py-1.5 rounded-full bg-[#C25E42] text-white text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
              {title}
            </span>

            <h3 className="text-2xl md:text-3xl font-serif text-[#3A231B] font-bold mb-2">
              {ceremony?.venue || "Nhà Hàng Tiệc Cưới Phong Cách Boho"}
            </h3>
            <p className="text-stone-500 text-xs md:text-sm flex items-center justify-center gap-1.5 mb-6">
              <MapPin className="w-4 h-4 text-[#C25E42]" />
              {ceremony?.address || "123 Đại Lộ Tình Yêu, Thành Phố Hồ Chí Minh"}
            </p>

            {/* Time & Date Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#FDF8F5] border border-[#EEDFD5] rounded-2xl p-5 mb-8">
              <div className="flex flex-col items-center justify-center p-2">
                <Calendar className="w-5 h-5 text-[#C25E42] mb-1.5" />
                <span className="text-[11px] text-stone-400 uppercase font-semibold">NGÀY CỬ HÀNH</span>
                <span className="text-base font-serif font-bold text-stone-800">{ceremony?.date || "28 Tháng 12, 2026"}</span>
                {ceremony?.lunarDate && (
                  <span className="text-[11px] text-[#DDA15E] font-medium">Âm lịch: {ceremony.lunarDate}</span>
                )}
              </div>

              <div className="flex flex-col items-center justify-center p-2 border-y sm:border-y-0 sm:border-x border-[#EEDFD5]">
                <Clock className="w-5 h-5 text-[#C25E42] mb-1.5" />
                <span className="text-[11px] text-stone-400 uppercase font-semibold">HÔN LỄ</span>
                <span className="text-base font-serif font-bold text-stone-800">{ceremony?.ceremonyTime || "09:00 AM"}</span>
                <span className="text-[11px] text-stone-500">Nghi thức trang trọng</span>
              </div>

              <div className="flex flex-col items-center justify-center p-2">
                <Heart className="w-5 h-5 text-[#C25E42] mb-1.5" />
                <span className="text-[11px] text-stone-400 uppercase font-semibold">TIỆC MỪNG</span>
                <span className="text-base font-serif font-bold text-stone-800">{ceremony?.receptionTime || "11:30 AM"}</span>
                <span className="text-[11px] text-stone-500">Kính mời cùng nâng ly</span>
              </div>
            </div>

            {ceremony?.googleMapsUrl && (
              <a
                href={ceremony.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#C25E42] hover:bg-[#A94A31] text-white font-medium text-xs tracking-wide shadow-md transition-all hover:scale-105"
              >
                <Compass className="w-4 h-4" /> Xem Chỉ Đường Trực Tiếp (Google Maps)
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
