"use client";

import { useEffect, useRef } from "react";
import { Clock, MapPin, Calendar } from "lucide-react";
import type { WeddingData } from "@/types/template";

type InfoProps = {
  wedding: WeddingData;
  isBrideMode: boolean;
};

function useScrollReveal(className = "ss-reveal-up") {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("ss-in-view");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    el.classList.add(className);
    observer.observe(el);
    return () => observer.disconnect();
  }, [className]);
  return ref;
}

export function Info({ wedding, isBrideMode }: InfoProps) {
  const ceremony = isBrideMode ? wedding.brideCeremony : wedding.groomCeremony;
  const title = isBrideMode ? "Lễ Vu Quy" : "Lễ Tân Hôn";
  const photo1 = wedding.gallery?.[0] || "/templates/classic-burgundy/samples/01.jpg";
  const photo2 = wedding.gallery?.[1] || "/templates/classic-burgundy/samples/02.jpg";

  const headerRef = useScrollReveal();
  const photosRef = useScrollReveal();
  const parentsRef = useScrollReveal();
  const ceremonyRef = useScrollReveal();

  return (
    <section className="py-16 px-5 border-b border-[#F6D6DF] relative overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F8B4C4] to-transparent" />
      <div className="absolute bottom-6 right-4 text-4xl opacity-8 select-none pointer-events-none ss-branch-deco">🌸</div>

      <div className="max-w-sm mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-10">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#D4456B] font-semibold mb-2">
            Trân Trọng Kính Báo
          </p>
          <h2 className="text-2xl font-serif text-[#3D1A26] font-medium" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Gia Đình Hai Họ
          </h2>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#F8B4C4]" />
            <span className="text-[#F8B4C4] text-sm">✦</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#F8B4C4]" />
          </div>
        </div>

        {/* Instax Photos — floating & staggered */}
        <div ref={photosRef} className="relative h-48 mb-12 mx-auto max-w-[280px]">
          {/* Photo 1 */}
          <div className="ss-instax-1 absolute left-0 top-0 w-32 h-40 bg-white p-2 shadow-lg rounded-sm z-10" style={{ border: "1px solid #f0e0e8" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo1} alt="Ảnh 1" className="w-full h-32 object-cover" />
            <div className="text-center mt-1">
              <p className="text-[9px] font-mono text-stone-400 tracking-wider">
                {isBrideMode ? wedding.brideName : wedding.groomName}
              </p>
            </div>
          </div>
          {/* Photo 2 */}
          <div className="ss-instax-2 absolute right-0 top-6 w-32 h-40 bg-white p-2 shadow-lg rounded-sm z-20" style={{ border: "1px solid #f0e0e8" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo2} alt="Ảnh 2" className="w-full h-32 object-cover" />
            <div className="text-center mt-1">
              <p className="text-[9px] font-mono text-stone-400 tracking-wider">
                {isBrideMode ? wedding.groomName : wedding.brideName}
              </p>
            </div>
          </div>
          {/* Heart between */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-white border-2 border-[#F8B4C4] flex items-center justify-center shadow-sm">
            <span className="ss-heartbeat text-[#D4456B] text-sm inline-block">♥</span>
          </div>
        </div>

        {/* Parents */}
        <div ref={parentsRef} className="mb-8 bg-[#FFF7F9] rounded-3xl border border-[#F6D6DF] p-5 shadow-xs">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-widest text-[#D4456B] font-bold mb-2 flex items-center justify-center gap-1">
                <span>🌸</span>
                <span>{isBrideMode ? "Nhà Gái" : "Nhà Trai"}</span>
              </p>
              <div className="border-t border-[#F6D6DF] pt-2 space-y-0.5">
                <p className="text-xs text-stone-700 font-medium">{(isBrideMode ? wedding.brideParents : wedding.groomParents)?.father || "Ông Nguyễn Văn A"}</p>
                <p className="text-xs text-stone-700 font-medium">{(isBrideMode ? wedding.brideParents : wedding.groomParents)?.mother || "Bà Trần Thị B"}</p>
              </div>
            </div>
            <div className="text-center border-l border-[#F6D6DF]">
              <p className="text-[10px] uppercase tracking-widest text-[#D4456B] font-bold mb-2 flex items-center justify-center gap-1">
                <span>🌸</span>
                <span>{isBrideMode ? "Nhà Trai" : "Nhà Gái"}</span>
              </p>
              <div className="border-t border-[#F6D6DF] pt-2 space-y-0.5">
                <p className="text-xs text-stone-700 font-medium">{(isBrideMode ? wedding.groomParents : wedding.brideParents)?.father || "Ông Lê Văn C"}</p>
                <p className="text-xs text-stone-700 font-medium">{(isBrideMode ? wedding.groomParents : wedding.brideParents)?.mother || "Bà Phạm Thị D"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ceremony Card */}
        <div ref={ceremonyRef} className="rounded-3xl overflow-hidden shadow-sm border border-[#F6D6DF]"
          style={{ background: "linear-gradient(135deg, #FFF0F5 0%, #FFE4EF 100%)" }}>
          {/* Header gradient bar */}
          <div className="h-1 bg-gradient-to-r from-[#D4456B] via-[#F8B4C4] to-[#D4456B]" />

          <div className="p-6 text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-[#D4456B] text-white text-[11px] font-medium tracking-wide uppercase mb-3">
              {title}
            </span>

            <h3 className="text-lg font-serif text-[#3D1A26] mb-4 font-semibold leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {ceremony?.venue || "Trung Tâm Yến Tiệc Sakura Palace"}
            </h3>

            <div className="space-y-2.5 text-xs text-stone-600 mb-5">
              <p className="flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4 text-[#D4456B] shrink-0" />
                <span className="font-semibold text-stone-900">{ceremony?.date || "18 Tháng 10, 2026"}</span>
                {ceremony?.lunarDate && <span className="text-stone-400">({ceremony.lunarDate})</span>}
              </p>
              <p className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 text-[#D4456B] shrink-0" />
                <span>Hôn Lễ: <strong>{ceremony?.ceremonyTime || "09:00"}</strong> · Tiệc: <strong>{ceremony?.receptionTime || "11:30"}</strong></span>
              </p>
              <p className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4456B] shrink-0" />
                <span>{ceremony?.address || "123 Đường Hoa Đào, TP. HCM"}</span>
              </p>
            </div>

            {ceremony?.googleMapsUrl && (
              <a
                href={ceremony.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#F6D6DF] text-[#D4456B] hover:bg-[#FFEBF0] text-xs font-medium tracking-wide shadow-xs transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" /> Chỉ Đường Maps
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

