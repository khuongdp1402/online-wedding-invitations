"use client";

import { Section } from "./Section";
import { Reveal } from "./Reveal";
import type { WeddingTemplateProps } from "@/lib/template-registry";

type Props = {
  wedding: WeddingTemplateProps["wedding"];
  mode: WeddingTemplateProps["mode"];
};

export function WeddingInfo({ wedding, mode }: Props) {
  const isBrideMode = mode === "bride";
  const ceremony = isBrideMode ? wedding.brideCeremony : wedding.groomCeremony;
  const firstName = isBrideMode ? wedding.brideName : wedding.groomName;
  const secondName = isBrideMode ? wedding.groomName : wedding.brideName;
  const firstParents = isBrideMode ? wedding.brideParents : wedding.groomParents;
  const secondParents = isBrideMode ? wedding.groomParents : wedding.brideParents;
  const photo1 = wedding.gallery[1] || wedding.gallery[0] || "";
  const photo2 = wedding.gallery[2] || wedding.gallery[0] || "";

  return (
    <Section id="thong-tin" className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-6xl px-4 relative z-10">
        <Reveal y={16}>
          <div className="text-center py-8 sm:py-10">
            <p className="text-lg sm:text-xl font-serif text-[#800020] italic font-medium opacity-90">
              &ldquo;Trăm năm tình viên mãn&rdquo;
            </p>
            <p className="text-lg sm:text-xl font-serif text-[#800020] italic font-medium opacity-90 mt-2">
              &ldquo;Bạc đầu nghĩa phu thê&rdquo;
            </p>
          </div>
        </Reveal>

        {/* Parents info */}
        <div className="grid grid-cols-[1fr_auto_1fr] gap-2 md:gap-12 mb-12 sm:mb-20 px-0 items-center">
          <Reveal x={-20}>
            <div className="space-y-4 text-center border-t border-[#D4AF37]/20 pt-6">
              <div className="flex flex-col items-center gap-2 mb-2">
                <p className="text-[0.6rem] sm:text-[0.7rem] uppercase tracking-[0.2em] text-[#800020] font-bold whitespace-nowrap">
                  {isBrideMode ? "Nhà gái" : "Nhà trai"}
                </p>
                <div className="w-1 h-1 bg-[#D4AF37]/40 rounded-full" />
              </div>
              <div className="space-y-0.5">
                <p className="text-base sm:text-xl text-[#2A2A2A] font-serif font-medium leading-relaxed whitespace-nowrap">{firstParents.father}</p>
                <p className="text-base sm:text-xl text-[#2A2A2A] font-serif font-medium leading-relaxed whitespace-nowrap">{firstParents.mother}</p>
              </div>
            </div>
          </Reveal>
          <div className="h-24 w-px bg-[#D4AF37]/20 mx-auto" />
          <Reveal x={20}>
            <div className="space-y-4 text-center border-t border-[#D4AF37]/20 pt-6">
              <div className="flex flex-col items-center gap-2 mb-2">
                <p className="text-[0.6rem] sm:text-[0.7rem] uppercase tracking-[0.2em] text-[#800020] font-bold whitespace-nowrap">
                  {isBrideMode ? "Nhà trai" : "Nhà gái"}
                </p>
                <div className="w-1 h-1 bg-[#D4AF37]/40 rounded-full" />
              </div>
              <div className="space-y-0.5">
                <p className="text-base sm:text-xl text-[#2A2A2A] font-serif font-medium leading-relaxed whitespace-nowrap">{secondParents.father}</p>
                <p className="text-base sm:text-xl text-[#2A2A2A] font-serif font-medium leading-relaxed whitespace-nowrap">{secondParents.mother}</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Couple + Ceremony */}
        <div className="max-w-4xl mx-auto">
          <Reveal y={30}>
            <div className="text-center space-y-6 relative">
              {photo1 && photo2 && (
                <div className="relative h-64 sm:h-80 mb-8 mx-auto w-full max-w-md">
                  <div className="absolute top-0 left-0 w-48 h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-white -rotate-6 z-0 transition-transform hover:z-20 hover:scale-105 duration-500">
                    <img src={photo1} alt={isBrideMode ? "Cô dâu" : "Chú rể"} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute top-10 right-0 w-48 h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-6 z-10 transition-transform hover:z-20 hover:scale-105 duration-500">
                    <img src={photo2} alt={isBrideMode ? "Chú rể" : "Cô dâu"} className="w-full h-full object-cover" />
                  </div>
                </div>
              )}

              <div className="space-y-5">
                <div className="flex flex-col gap-3 w-full max-w-4xl mx-auto">
                  <div className="text-left">
                    <span className="text-3xl sm:text-5xl lg:text-6xl font-script text-[#800020] font-bold leading-relaxed drop-shadow-sm">{firstName}</span>
                    <span className="block text-base sm:text-lg font-serif text-[#2A2A2A] font-bold tracking-[0.2em] uppercase mt-1">
                      {isBrideMode ? "Ái Nữ" : "Trưởng Nam"}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl sm:text-5xl lg:text-6xl font-script text-[#800020] font-bold leading-relaxed drop-shadow-sm">{secondName}</span>
                    <span className="block text-base sm:text-lg font-serif text-[#2A2A2A] font-bold tracking-[0.2em] uppercase mt-1">
                      {isBrideMode ? "Trưởng Nam" : "Ái Nữ"}
                    </span>
                  </div>
                </div>

                <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto opacity-60" />

                <div className="space-y-4 mt-4">
                  <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                    <div className="text-center">
                      <p className="text-[#4A4A4A]/70 text-xs sm:text-sm uppercase tracking-wider font-semibold mb-0.5">Giờ làm lễ</p>
                      <p className="text-4xl sm:text-5xl font-serif text-[#800020] font-bold">{ceremony.ceremonyTime}</p>
                    </div>
                    <div className="w-px h-10 bg-[#D4AF37]/30 hidden sm:block" />
                    <div className="text-center">
                      <p className="text-[#4A4A4A]/70 text-xs sm:text-sm uppercase tracking-wider font-semibold mb-0.5">Giờ nhập tiệc</p>
                      <p className="text-4xl sm:text-5xl font-serif text-[#800020] font-bold">{ceremony.receptionTime}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-3xl sm:text-4xl text-[#2A2A2A] font-serif font-bold tracking-wide">{ceremony.date}</p>
                    {ceremony.lunarDate && <p className="text-xl text-[#4A4A4A] font-semibold">{ceremony.lunarDate}</p>}
                  </div>
                </div>

                <div className="pt-6 border-t border-[#D4AF37]/20 inline-block px-8 mt-2">
                  <p className="text-base uppercase tracking-[0.4em] text-[#800020] font-bold mb-3">Địa điểm</p>
                  <p className="text-4xl text-[#2A2A2A] font-serif font-black tracking-tight mb-2 leading-tight">{ceremony.venue}</p>
                  <p className="text-xl text-[#4A4A4A] font-bold max-w-[500px] mx-auto leading-relaxed">{ceremony.address}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="absolute top-20 right-[-5%] pointer-events-none select-none font-serif rotate-12">
        <span className="block text-[4rem] sm:text-[10rem] lg:text-[20rem] text-[#800020]/10 sm:text-[#800020]/[0.05] lg:text-[#800020]/[0.03]">Love</span>
      </div>
    </Section>
  );
}
