"use client";

import { Flower, Heart } from "lucide-react";
import type { InvitationData } from "./lib/invitation";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { ImageWithFallback } from "./ImageWithFallback";
import { useEditOverlay, editSlotClass } from "@/components/templates/shared/EditOverlayContext";

type WeddingInfoSectionProps = {
  data: InvitationData;
  photo1?: string;
  photo2?: string;
  isBrideMode?: boolean;
};

export function WeddingInfoSection({ data, photo1, photo2, isBrideMode }: WeddingInfoSectionProps) {
  const edit = useEditOverlay();
  // Khối "Nhà trai"/"Nhà gái" luôn hiển thị đúng data.groom/data.bride, không đảo theo mode
  const firstParentsFatherSlot = "cb-groom-father";
  const firstParentsMotherSlot = "cb-groom-mother";
  const secondParentsFatherSlot = "cb-bride-father";
  const secondParentsMotherSlot = "cb-bride-mother";
  // Ceremony hiển thị theo mode hiện tại (nhà trai hoặc nhà gái đang xem)
  const currentDateSlot = isBrideMode ? "cb-bride-date" : "cb-groom-date";
  const currentLunarDateSlot = isBrideMode ? "cb-bride-lunar-date" : "cb-groom-lunar-date";
  const currentVenueSlot = isBrideMode ? "cb-bride-venue" : "cb-groom-venue";
  const currentAddressSlot = isBrideMode ? "cb-bride-address" : "cb-groom-address";

  return (
    <Section id="thong-tin" className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-6xl px-4 relative z-10">
        {/* Câu thành ngữ – giữa banner và thông tin 2 nhà */}
        <Reveal y={16}>
          <div className="text-center py-8 sm:py-10">
            <p className="text-lg sm:text-xl font-heading text-burgundy italic font-medium opacity-90">
              &ldquo;Trăm năm tình viên mãn&rdquo;
            </p>
            <p className="text-lg sm:text-xl font-heading text-burgundy italic font-medium opacity-90 mt-2">
              &ldquo;Bạc đầu nghĩa phu thê&rdquo;
            </p>
          </div>
        </Reveal>

        {/* Row 1: Parents info horizontally */}
        <div className="grid grid-cols-[1fr_auto_1fr] gap-2 md:gap-12 mb-12 sm:mb-20 px-0 items-center">
          {/* Nhà trai */}
          <Reveal x={-20}>
            <div className="space-y-4 text-center border-t border-gold/20 pt-6">
              <div className="flex flex-col items-center gap-2 mb-2">
                <p className="text-[0.6rem] sm:text-[0.7rem] uppercase tracking-[0.2em] text-burgundy font-bold whitespace-nowrap">Nhà trai</p>
                <div className="w-1 h-1 bg-gold/40 rounded-full" />
              </div>
              <div className="space-y-0.5">
                <p
                  className={editSlotClass(edit, firstParentsFatherSlot, "text-base sm:text-xl text-ink-dark font-heading font-medium leading-relaxed whitespace-nowrap")}
                  onClick={(e) => { e.stopPropagation(); edit?.onSlotClick?.(firstParentsFatherSlot, e.currentTarget); }}
                >
                  {data.groom.parents.father}
                </p>
                <p
                  className={editSlotClass(edit, firstParentsMotherSlot, "text-base sm:text-xl text-ink-dark font-heading font-medium leading-relaxed whitespace-nowrap")}
                  onClick={(e) => { e.stopPropagation(); edit?.onSlotClick?.(firstParentsMotherSlot, e.currentTarget); }}
                >
                  {data.groom.parents.mother}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Divider */}
          <div className="h-24 w-px bg-gold/20 mx-auto" />

          {/* Nhà gái */}
          <Reveal x={20}>
            <div className="space-y-4 text-center border-t border-gold/20 pt-6">
              <div className="flex flex-col items-center gap-2 mb-2">
                <p className="text-[0.6rem] sm:text-[0.7rem] uppercase tracking-[0.2em] text-burgundy font-bold whitespace-nowrap">Nhà gái</p>
                <div className="w-1 h-1 bg-gold/40 rounded-full" />
              </div>
              <div className="space-y-0.5">
                <p
                  className={editSlotClass(edit, secondParentsFatherSlot, "text-base sm:text-xl text-ink-dark font-heading font-medium leading-relaxed whitespace-nowrap")}
                  onClick={(e) => { e.stopPropagation(); edit?.onSlotClick?.(secondParentsFatherSlot, e.currentTarget); }}
                >
                  {data.bride.parents.father}
                </p>
                <p
                  className={editSlotClass(edit, secondParentsMotherSlot, "text-base sm:text-xl text-ink-dark font-heading font-medium leading-relaxed whitespace-nowrap")}
                  onClick={(e) => { e.stopPropagation(); edit?.onSlotClick?.(secondParentsMotherSlot, e.currentTarget); }}
                >
                  {data.bride.parents.mother}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Row 2: Visual Centerpiece (Couple + Ceremony) */}
        <div className="max-w-4xl mx-auto">
          <Reveal y={30}>
            <div className="text-center space-y-6 relative">
              {/* Overlapping Images Style — luôn hiển thị như bản gốc, kể cả khi
                  thiếu ảnh (ImageWithFallback tự vẽ placeholder gradient) */}
              <div className="relative h-64 sm:h-80 mb-8 mx-auto w-full max-w-md">
                <div
                  className={editSlotClass(edit, "cb-wedding-a", "absolute top-0 left-0 w-48 h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-white -rotate-6 z-0 transition-transform hover:z-20 hover:scale-105 duration-500")}
                  data-wedding-slot="cb-wedding-a"
                  onClick={(e) => edit?.onSlotClick?.("cb-wedding-a", e.currentTarget)}
                  role={edit?.onSlotClick ? "button" : undefined}
                >
                  <ImageWithFallback src={photo1 || ""} alt="Wedding 1" className="w-full h-full object-cover" />
                </div>
                <div
                  className={editSlotClass(edit, "cb-wedding-b", "absolute top-10 right-0 w-48 h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-6 z-10 transition-transform hover:z-20 hover:scale-105 duration-500")}
                  data-wedding-slot="cb-wedding-b"
                  onClick={(e) => edit?.onSlotClick?.("cb-wedding-b", e.currentTarget)}
                  role={edit?.onSlotClick ? "button" : undefined}
                >
                  <ImageWithFallback src={photo2 || ""} alt="Wedding 2" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex flex-col gap-3 w-full max-w-4xl mx-auto">
                  {/* Dòng 1: Chú rể – căn trái */}
                  <div className="text-left">
                    <span
                      className={editSlotClass(edit, "cb-groom-name", "text-3xl sm:text-5xl lg:text-6xl font-script text-burgundy font-bold leading-relaxed drop-shadow-sm")}
                      onClick={(e) => { e.stopPropagation(); edit?.onSlotClick?.("cb-groom-name", e.currentTarget); }}
                    >
                      {data.groom.name}
                    </span>
                    <span className="block text-base sm:text-lg font-heading text-ink-dark font-bold tracking-[0.2em] uppercase mt-1">
                      Trưởng Nam
                    </span>
                  </div>
                  {/* Dòng 2: Cô dâu – căn phải */}
                  <div className="text-right">
                    <span
                      className={editSlotClass(edit, "cb-bride-name", "text-3xl sm:text-5xl lg:text-6xl font-script text-burgundy font-bold leading-relaxed drop-shadow-sm")}
                      onClick={(e) => { e.stopPropagation(); edit?.onSlotClick?.("cb-bride-name", e.currentTarget); }}
                    >
                      {data.bride.name}
                    </span>
                    <span className="block text-base sm:text-lg font-heading text-ink-dark font-bold tracking-[0.2em] uppercase mt-1">
                      Ái Nữ
                    </span>
                  </div>
                </div>

                <div className="gold-divider w-32 mx-auto opacity-60" />

                <div className="space-y-4 mt-4">
                  <p className="text-2xl sm:text-3xl font-script text-burgundy font-bold">
                    {data.ceremony.title}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                    <div className="text-center">
                      <p className="text-ink/70 text-xs sm:text-sm uppercase tracking-wider font-semibold mb-0.5">Giờ làm lễ</p>
                      <p className="text-4xl sm:text-5xl font-heading text-burgundy font-bold">{data.ceremony.timeLabel}</p>
                    </div>
                    <div className="w-px h-10 bg-gold/30 hidden sm:block" />
                    <div className="text-center">
                      <p className="text-ink/70 text-xs sm:text-sm uppercase tracking-wider font-semibold mb-0.5">Giờ nhập tiệc</p>
                      <p className="text-4xl sm:text-5xl font-heading text-burgundy font-bold">{data.ceremony.receptionTimeLabel}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p
                      className={editSlotClass(edit, currentDateSlot, "text-3xl sm:text-4xl text-ink-dark font-heading font-bold tracking-wide")}
                      onClick={(e) => { e.stopPropagation(); edit?.onSlotClick?.(currentDateSlot, e.currentTarget); }}
                    >
                      {data.ceremony.solarDateLabel}
                    </p>
                    <p
                      className={editSlotClass(edit, currentLunarDateSlot, "text-xl text-ink font-semibold")}
                      onClick={(e) => { e.stopPropagation(); edit?.onSlotClick?.(currentLunarDateSlot, e.currentTarget); }}
                    >
                      {data.ceremony.lunarDateLabel}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gold/20 inline-block px-8 mt-2">
                  <p className="text-base uppercase tracking-[0.4em] text-burgundy font-bold mb-3">
                    Địa điểm
                  </p>
                  <p
                    className={editSlotClass(edit, currentVenueSlot, "text-4xl text-ink-dark font-heading font-black tracking-tight mb-2 leading-tight")}
                    onClick={(e) => { e.stopPropagation(); edit?.onSlotClick?.(currentVenueSlot, e.currentTarget); }}
                  >
                    {data.ceremony.venueName}
                  </p>
                  <p
                    className={editSlotClass(edit, currentAddressSlot, "text-xl text-ink font-bold max-w-[500px] mx-auto leading-relaxed")}
                    onClick={(e) => { e.stopPropagation(); edit?.onSlotClick?.(currentAddressSlot, e.currentTarget); }}
                  >
                    {data.ceremony.address}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Chữ nền Love – resize cho mobile, bling nhẹ */}
      <div className="absolute top-20 right-[-5%] pointer-events-none select-none font-heading rotate-12 bg-bling-text">
        <span className="block text-[4rem] sm:text-[10rem] lg:text-[20rem] text-burgundy/10 sm:text-burgundy/[0.05] lg:text-burgundy/[0.03]">
          Love
        </span>
      </div>
    </Section>
  );
}
