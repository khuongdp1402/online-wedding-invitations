"use client";

import { Section } from "./Section";
import { Reveal } from "./Reveal";
import Image from "next/image";
import type { WeddingTemplateProps } from "@/lib/template-registry";
import { useEditOverlay, editSlotClass } from "./EditOverlayContext";

type Props = {
  wedding: WeddingTemplateProps["wedding"];
  mode: WeddingTemplateProps["mode"];
};

export function WeddingInfo({ wedding, mode }: Props) {
  const edit = useEditOverlay();
  const isBrideMode = mode === "bride";
  const ceremony = isBrideMode ? wedding.brideCeremony : wedding.groomCeremony;
  const firstName = isBrideMode ? wedding.brideName : wedding.groomName;
  const secondName = isBrideMode ? wedding.groomName : wedding.brideName;
  const firstParents = isBrideMode ? wedding.brideParents : wedding.groomParents;
  const secondParents = isBrideMode ? wedding.groomParents : wedding.brideParents;
  const photo1 = wedding.gallery[2] || "";
  const photo2 = wedding.gallery[3] || "";

  return (
    <Section id="thong-tin" className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-6xl px-4 relative z-10">
        <Reveal y={16}>
          <div className="text-center py-8 sm:py-10">
            <p className="text-lg sm:text-xl font-serif cb-text-primary italic font-medium opacity-90">
              &ldquo;Trăm năm tình viên mãn&rdquo;
            </p>
            <p className="text-lg sm:text-xl font-serif cb-text-primary italic font-medium opacity-90 mt-2">
              &ldquo;Bạc đầu nghĩa phu thê&rdquo;
            </p>
          </div>
        </Reveal>

        {/* Parents info */}
        <div className="grid grid-cols-[1fr_auto_1fr] gap-2 md:gap-12 mb-12 sm:mb-20 px-0 items-center">
          <Reveal x={-20}>
            <div className="space-y-4 text-center border-t border-[color:color-mix(in_srgb,var(--cb-accent)_20%,transparent)] pt-6">
              <div className="flex flex-col items-center gap-2 mb-2">
                <p className="text-[0.6rem] sm:text-[0.7rem] uppercase tracking-[0.2em] cb-text-primary font-bold whitespace-nowrap">
                  {isBrideMode ? "Nhà gái" : "Nhà trai"}
                </p>
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'color-mix(in srgb, var(--cb-accent) 40%, transparent)' }} />
              </div>
              <div className="space-y-0.5">
                <p className="text-base sm:text-xl cb-text-body font-serif font-medium leading-relaxed whitespace-nowrap" style={{ color: 'var(--cb-text)' }}>{firstParents.father}</p>
                <p className="text-base sm:text-xl cb-text-body font-serif font-medium leading-relaxed whitespace-nowrap" style={{ color: 'var(--cb-text)' }}>{firstParents.mother}</p>
              </div>
            </div>
          </Reveal>
          <div className="h-24 w-px mx-auto" style={{ backgroundColor: 'color-mix(in srgb, var(--cb-accent) 20%, transparent)' }} />
          <Reveal x={20}>
            <div className="space-y-4 text-center border-t border-[color:color-mix(in_srgb,var(--cb-accent)_20%,transparent)] pt-6">
              <div className="flex flex-col items-center gap-2 mb-2">
                <p className="text-[0.6rem] sm:text-[0.7rem] uppercase tracking-[0.2em] cb-text-primary font-bold whitespace-nowrap">
                  {isBrideMode ? "Nhà trai" : "Nhà gái"}
                </p>
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'color-mix(in srgb, var(--cb-accent) 40%, transparent)' }} />
              </div>
              <div className="space-y-0.5">
                <p className="text-base sm:text-xl cb-text-body font-serif font-medium leading-relaxed whitespace-nowrap" style={{ color: 'var(--cb-text)' }}>{secondParents.father}</p>
                <p className="text-base sm:text-xl cb-text-body font-serif font-medium leading-relaxed whitespace-nowrap" style={{ color: 'var(--cb-text)' }}>{secondParents.mother}</p>
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
                  <div
                    className={editSlotClass(
                      edit,
                      "cb-wedding-a",
                      "absolute top-0 left-0 w-48 h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-white -rotate-6 z-0 transition-transform hover:z-20 hover:scale-105 duration-500"
                    )}
                    data-wedding-slot="cb-wedding-a"
                    onClick={() => edit?.onSlotClick?.("cb-wedding-a")}
                    role={edit?.onSlotClick ? "button" : undefined}
                  >
                    <Image src={photo1} alt={isBrideMode ? "Cô dâu" : "Chú rể"} className="w-full h-full object-cover" width={192} height={256} unoptimized />
                  </div>
                  <div
                    className={editSlotClass(
                      edit,
                      "cb-wedding-b",
                      "absolute top-10 right-0 w-48 h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-6 z-10 transition-transform hover:z-20 hover:scale-105 duration-500"
                    )}
                    data-wedding-slot="cb-wedding-b"
                    onClick={() => edit?.onSlotClick?.("cb-wedding-b")}
                    role={edit?.onSlotClick ? "button" : undefined}
                  >
                    <Image src={photo2} alt={isBrideMode ? "Chú rể" : "Cô dâu"} className="w-full h-full object-cover" width={192} height={256} unoptimized />
                  </div>
                </div>
              )}

              <div className="space-y-5">
                <div className="flex flex-col gap-3 w-full max-w-4xl mx-auto">
                  <div className="text-left">
                    <span className="text-3xl sm:text-5xl lg:text-6xl font-script cb-text-primary font-bold leading-relaxed drop-shadow-sm">{firstName}</span>
                    <span className="block text-base sm:text-lg font-serif cb-text-body font-bold tracking-[0.2em] uppercase mt-1" style={{ color: 'var(--cb-text)' }}>
                      {isBrideMode ? "Ái Nữ" : "Trưởng Nam"}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl sm:text-5xl lg:text-6xl font-script cb-text-primary font-bold leading-relaxed drop-shadow-sm">{secondName}</span>
                    <span className="block text-base sm:text-lg font-serif cb-text-body font-bold tracking-[0.2em] uppercase mt-1" style={{ color: 'var(--cb-text)' }}>
                      {isBrideMode ? "Trưởng Nam" : "Ái Nữ"}
                    </span>
                  </div>
                </div>

                <div className="h-px w-32 bg-gradient-to-r from-transparent via-[var(--cb-accent)] to-transparent mx-auto opacity-60" />

                <div className="space-y-4 mt-4">
                  <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                    <div className="text-center">
                      <p className="cb-text-body text-xs sm:text-sm uppercase tracking-wider font-semibold mb-0.5 opacity-70" style={{ color: 'var(--cb-text)' }}>Giờ làm lễ</p>
                      <p className="text-4xl sm:text-5xl font-serif cb-text-primary font-bold">{ceremony.ceremonyTime}</p>
                    </div>
                    <div className="w-px h-10 hidden sm:block" style={{ backgroundColor: 'color-mix(in srgb, var(--cb-accent) 30%, transparent)' }} />
                    <div className="text-center">
                      <p className="cb-text-body text-xs sm:text-sm uppercase tracking-wider font-semibold mb-0.5 opacity-70" style={{ color: 'var(--cb-text)' }}>Giờ nhập tiệc</p>
                      <p className="text-4xl sm:text-5xl font-serif cb-text-primary font-bold">{ceremony.receptionTime}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-3xl sm:text-4xl cb-text-body font-serif font-bold tracking-wide" style={{ color: 'var(--cb-text)' }}>{ceremony.date}</p>
                    {ceremony.lunarDate && <p className="text-xl cb-text-body font-semibold">{ceremony.lunarDate}</p>}
                  </div>
                </div>

                <div className="pt-6 border-t border-[color:color-mix(in_srgb,var(--cb-accent)_20%,transparent)] inline-block px-8 mt-2">
                  <p className="text-base uppercase tracking-[0.4em] cb-text-primary font-bold mb-3">Địa điểm</p>
                  <p className="text-4xl cb-text-body font-serif font-black tracking-tight mb-2 leading-tight" style={{ color: 'var(--cb-text)' }}>{ceremony.venue}</p>
                  <p className="text-xl cb-text-body font-bold max-w-[500px] mx-auto leading-relaxed">{ceremony.address}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="absolute top-20 right-[-5%] pointer-events-none select-none font-serif rotate-12">
        <span className="block text-[4rem] sm:text-[10rem] lg:text-[20rem] opacity-10 sm:opacity-[0.05] lg:opacity-[0.03] cb-text-primary">Love</span>
      </div>
    </Section>
  );
}
