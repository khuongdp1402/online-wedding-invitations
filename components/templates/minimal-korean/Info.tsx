"use client";

import type { WeddingData } from "@/types/template";
import { Clock, MapPin, Calendar, ArrowUpRight } from "lucide-react";

type InfoProps = {
  wedding: WeddingData;
  isBrideMode: boolean;
};

export function Info({ wedding, isBrideMode }: InfoProps) {
  const ceremony = isBrideMode ? wedding.brideCeremony : wedding.groomCeremony;
  const title = isBrideMode ? "Lễ Vu Quy" : "Lễ Tân Hôn";
  const mainPhoto = wedding.gallery?.[0] || "/templates/classic-burgundy/samples/01.jpg";

  return (
    <section className="py-20 px-6 sm:px-12 bg-white border-y border-stone-200">
      <div className="max-w-5xl mx-auto">
        {/* Magazine Masthead Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-stone-900 pb-4 mb-12">
          <div>
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-stone-400 block mb-1">
              VOL. 2026 / EDITORIAL SPREAD
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 tracking-tight">
              The Proclamation
            </h2>
          </div>
          <div className="mt-2 sm:mt-0 text-left sm:text-right font-mono text-[11px] text-stone-500 uppercase tracking-widest">
            <span>SEOUL — SAIGON EDITION</span>
          </div>
        </div>

        {/* 2-Column Magazine Lookbook Spread on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Fashion Editorial Portrait with Fig Caption */}
          <div className="lg:col-span-5">
            <div className="relative border border-stone-200 p-2 bg-[#FAF9F6] shadow-sm">
              <div className="aspect-[3/4] w-full overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mainPhoto}
                  alt="Editorial couple portrait"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-stone-500 px-1">
                <span>[ FIG. 01 — THE UNION ]</span>
                <span className="tracking-widest">35MM / B&W</span>
              </div>
            </div>
          </div>

          {/* Right: Editorial Typography, Lineage & Ceremony Ticket */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-8">
            <div>
              <p className="text-sm font-serif italic text-stone-600 leading-relaxed border-l-2 border-stone-900 pl-4 mb-6">
                &ldquo;Tình yêu là khi hai thế giới riêng biệt tìm thấy điểm giao hòa hoàn hảo nhất, bình dị nhưng son sắt đến trọn đời.&rdquo;
              </p>

              {/* Parents Lineage Monospace Box */}
              <div className="bg-[#FAF9F6] border border-stone-200 p-6 rounded-none">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-stone-400 block mb-4">
                  // FAMILY LINEAGE & REPRESENTATION
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="border-l border-stone-300 pl-3">
                    <span className="text-xs font-mono font-bold text-stone-900 block mb-1">
                      GROOM&apos;S FAMILY (NHÀ TRAI)
                    </span>
                    <p className="text-xs text-stone-600">
                      Thân phụ: <strong className="text-stone-900">{wedding.groomParents?.father || "Nguyễn Văn A"}</strong>
                    </p>
                    <p className="text-xs text-stone-600">
                      Thân mẫu: <strong className="text-stone-900">{wedding.groomParents?.mother || "Trần Thị B"}</strong>
                    </p>
                  </div>

                  <div className="border-l border-stone-300 pl-3">
                    <span className="text-xs font-mono font-bold text-stone-900 block mb-1">
                      BRIDE&apos;S FAMILY (NHÀ GÁI)
                    </span>
                    <p className="text-xs text-stone-600">
                      Thân phụ: <strong className="text-stone-900">{wedding.brideParents?.father || "Lê Văn C"}</strong>
                    </p>
                    <p className="text-xs text-stone-600">
                      Thân mẫu: <strong className="text-stone-900">{wedding.brideParents?.mother || "Phạm Thị D"}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ceremony Exhibition Ticket */}
            <div className="border-2 border-stone-900 p-6 relative bg-white">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono font-bold tracking-wider bg-stone-900 text-white px-2.5 py-1">
                  OFFICIAL INVITATION — {title.toUpperCase()}
                </span>
                <span className="text-xs font-mono text-stone-400">TICKET #2026-KR</span>
              </div>

              <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">
                {ceremony?.venue || "Trung Tâm Hội Nghị Tiệc Cưới Phong Cách Tối Giản"}
              </h3>

              <div className="space-y-2 text-xs font-mono text-stone-600 mb-6">
                <p className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-stone-900" />
                  <span>NGÀY: <strong>{ceremony?.date || "22.11.2026"}</strong> {ceremony?.lunarDate && `(Âm lịch: ${ceremony.lunarDate})`}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-stone-900" />
                  <span>GIỜ: <strong>LỄ GIA TIÊN {ceremony?.ceremonyTime || "09:00"}</strong> | <strong>TIỆC MỪNG {ceremony?.receptionTime || "11:30"}</strong></span>
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-stone-900 shrink-0" />
                  <span>ĐỊA CHỈ: {ceremony?.address || "123 Đường Nam Kỳ Khởi Nghĩa, Quận 1, TP. Hồ Chí Minh"}</span>
                </p>
              </div>

              {ceremony?.googleMapsUrl && (
                <a
                  href={ceremony.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-stone-900 hover:text-stone-600 uppercase border-b-2 border-stone-900 pb-0.5 tracking-wider transition-colors"
                >
                  <span>Chỉ đường trên Google Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
