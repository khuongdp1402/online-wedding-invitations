"use client";

import type { WeddingData } from "@/types/template";
import { Clock, MapPin, Calendar, Compass, Sparkles } from "lucide-react";

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
    <section className="py-20 px-4 sm:px-8 bg-[#061811] border-b border-[#D4AF37]/30 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-serif uppercase tracking-[0.3em] mb-2">
            <Sparkles className="w-3.5 h-3.5" /> GIA ĐÌNH QUAN VIÊN HAI HỌ
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold tracking-wider">
            Trân Trọng Kính Báo
          </h2>
          <div className="w-20 h-0.5 bg-[#D4AF37] mx-auto mt-4" />
        </div>

        {/* 2-Column Art Deco Hexagonal/Chamfered Couple Portrait Grid on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          {/* House of Groom */}
          <div className="bg-[#0A261D] border-2 border-[#D4AF37] p-8 text-center relative shadow-xl group hover:scale-[1.02] transition-all">
            <div className="w-28 h-36 mx-auto overflow-hidden border-2 border-[#D4AF37] mb-6 shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={groomPhoto}
                alt="Groom Art Deco"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <span className="inline-block px-3 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-[11px] font-mono uppercase tracking-widest border border-[#D4AF37]/40 mb-2">
              NHÀ TRAI
            </span>
            <h3 className="text-2xl font-serif font-bold text-white mb-4">
              {wedding.groomName}
            </h3>

            <div className="border-t border-[#D4AF37]/30 pt-4 text-xs space-y-1.5">
              <p className="text-[#D4AF37] uppercase text-[10px] tracking-widest font-mono">THÂN PHỤ & THÂN MẪU</p>
              <p className="text-stone-200 text-sm font-medium">
                {wedding.groomParents?.father || "Ông Nguyễn Văn A"}
              </p>
              <p className="text-stone-200 text-sm font-medium">
                {wedding.groomParents?.mother || "Bà Trần Thị B"}
              </p>
            </div>
          </div>

          {/* House of Bride */}
          <div className="bg-[#0A261D] border-2 border-[#D4AF37] p-8 text-center relative shadow-xl group hover:scale-[1.02] transition-all">
            <div className="w-28 h-36 mx-auto overflow-hidden border-2 border-[#D4AF37] mb-6 shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={bridePhoto}
                alt="Bride Art Deco"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <span className="inline-block px-3 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-[11px] font-mono uppercase tracking-widest border border-[#D4AF37]/40 mb-2">
              NHÀ GÁI
            </span>
            <h3 className="text-2xl font-serif font-bold text-white mb-4">
              {wedding.brideName}
            </h3>

            <div className="border-t border-[#D4AF37]/30 pt-4 text-xs space-y-1.5">
              <p className="text-[#D4AF37] uppercase text-[10px] tracking-widest font-mono">THÂN PHỤ & THÂN MẪU</p>
              <p className="text-stone-200 text-sm font-medium">
                {wedding.brideParents?.father || "Ông Lê Văn C"}
              </p>
              <p className="text-stone-200 text-sm font-medium">
                {wedding.brideParents?.mother || "Bà Phạm Thị D"}
              </p>
            </div>
          </div>
        </div>

        {/* Grand Ballroom Venue Card */}
        <div className="bg-gradient-to-r from-[#0E3529] via-[#124234] to-[#0E3529] border-2 border-[#D4AF37] p-8 sm:p-12 text-center rounded-2xl shadow-2xl relative">
          <span className="inline-block px-6 py-1 rounded-full bg-[#04120D] text-[#D4AF37] text-xs font-mono font-bold tracking-widest uppercase mb-4 border border-[#D4AF37]">
            {title}
          </span>

          <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-white mb-2">
            {ceremony?.venue || "Grand Gatsby Ballroom & Speakeasy"}
          </h3>

          <p className="text-stone-300 text-sm flex items-center justify-center gap-2 mb-8">
            <MapPin className="w-4 h-4 text-[#D4AF37]" />
            <span>{ceremony?.address || "123 Đại Lộ Ánh Sáng, Quận 1, TP. Hồ Chí Minh"}</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-[#071F17] border border-[#D4AF37]/40 rounded-xl p-6 mb-8">
            <div className="flex flex-col items-center">
              <Calendar className="w-6 h-6 text-[#D4AF37] mb-2" />
              <span className="text-[10px] uppercase font-mono text-[#D4AF37] font-bold">DATE OF CELEBRATION</span>
              <span className="text-base font-serif font-bold text-white">{ceremony?.date || "22.11.2026"}</span>
              {ceremony?.lunarDate && <span className="text-xs text-stone-400">({ceremony.lunarDate})</span>}
            </div>

            <div className="flex flex-col items-center border-y sm:border-y-0 sm:border-x border-[#D4AF37]/30 py-4 sm:py-0">
              <Clock className="w-6 h-6 text-[#D4AF37] mb-2" />
              <span className="text-[10px] uppercase font-mono text-[#D4AF37] font-bold">SOIRÉE CEREMONY</span>
              <span className="text-base font-serif font-bold text-white">{ceremony?.ceremonyTime || "09:00"}</span>
              <span className="text-xs text-stone-400">Formal vows & champagne</span>
            </div>

            <div className="flex flex-col items-center">
              <Sparkles className="w-6 h-6 text-[#D4AF37] mb-2" />
              <span className="text-[10px] uppercase font-mono text-[#D4AF37] font-bold">BALLROOM BANQUET</span>
              <span className="text-base font-serif font-bold text-white">{ceremony?.receptionTime || "11:30"}</span>
              <span className="text-xs text-stone-400">Dinner & live jazz music</span>
            </div>
          </div>

          {ceremony?.googleMapsUrl && (
            <a
              href={ceremony.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#D4AF37] hover:bg-[#BFA030] text-[#051510] font-mono font-bold text-xs uppercase tracking-widest shadow-xl transition-all hover:scale-105"
            >
              <Compass className="w-4 h-4" /> Chỉ Đường Google Maps (Ballroom)
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
