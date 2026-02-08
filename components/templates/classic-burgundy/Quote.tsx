"use client";

import { Heart } from "lucide-react";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import type { WeddingTemplateProps } from "@/lib/template-registry";

type Props = {
  wedding: WeddingTemplateProps["wedding"];
  mode: WeddingTemplateProps["mode"];
  guestName?: string;
  guestSalutation?: string;
};

export function Quote({ wedding, mode, guestName, guestSalutation }: Props) {
  const isBrideMode = mode === "bride";
  const inviteeLabel = guestSalutation && guestName
    ? `${guestSalutation} ${guestName}`
    : guestName || "quý khách";
  const salutationOnly = guestSalutation || "quý khách";
  const photo1 = wedding.gallery[2] || wedding.gallery[0] || "";
  const photo2 = wedding.gallery[3] || wedding.gallery[0] || "";

  return (
    <Section className="relative sm:py-40 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        {/* Mobile photos */}
        {photo1 && photo2 && (
          <div className="lg:hidden grid grid-cols-2 gap-4 sm:gap-6 max-w-sm mx-auto mb-8 sm:mb-10">
            <Reveal x={-20}>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-[4px] border-white shadow-xl rotate-[-3deg]">
                <img src={photo1} alt={isBrideMode ? "Cô dâu" : "Chú rể"} className="w-full h-full object-cover" />
              </div>
            </Reveal>
            <Reveal x={20}>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-[4px] border-white shadow-xl rotate-[3deg] mt-6">
                <img src={photo2} alt={isBrideMode ? "Chú rể" : "Cô dâu"} className="w-full h-full object-cover" />
              </div>
            </Reveal>
          </div>
        )}

        <div className="relative grid grid-cols-12 gap-8 items-center">
          {/* Desktop left photo */}
          {photo1 && (
            <div className="hidden lg:block lg:col-span-4">
              <Reveal x={-40}>
                <div className="relative aspect-[3/4] rounded-full overflow-hidden border-[6px] border-white shadow-2xl rotate-[-2deg] grayscale-[0.2] hover:grayscale-0 transition-all duration-700">
                  <img src={photo1} alt="Portrait" className="w-full h-full object-cover scale-110" />
                </div>
              </Reveal>
            </div>
          )}

          {/* Quote content */}
          <div className="col-span-12 lg:col-span-4 text-center px-4 space-y-6 sm:space-y-8">
            <Reveal>
              <div className="mb-6 flex justify-center opacity-30">
                <Heart className="w-10 h-10 text-[#800020] fill-[#800020]" />
              </div>
              <p className="text-[#800020] text-sm sm:text-base uppercase tracking-[0.35em] font-bold mb-4">Trân trọng kính mời</p>
              <p className="text-[#2A2A2A] text-lg sm:text-xl font-serif font-medium mb-4">
                <span className="font-bold">{inviteeLabel}</span> tới dự buổi tiệc chung vui cùng gia đình chúng tôi.
              </p>
              <p className="text-[#2A2A2A] text-lg sm:text-xl font-serif font-medium mb-8">
                Sự hiện diện của <span className="font-bold">{salutationOnly}</span> là niềm vinh hạnh lớn lao cho gia đình chúng tôi.
              </p>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto my-8" />
            </Reveal>
          </div>

          {/* Desktop right photo */}
          {photo2 && (
            <div className="hidden lg:block lg:col-span-4">
              <Reveal x={40}>
                <div className="relative aspect-[3/4] rounded-t-full overflow-hidden border-[6px] border-white shadow-2xl rotate-[2deg] grayscale-[0.2] hover:grayscale-0 transition-all duration-700 mt-12">
                  <img src={photo2} alt="Portrait" className="w-full h-full object-cover scale-110" />
                </div>
              </Reveal>
            </div>
          )}
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none italic font-serif">
        <span className="block text-[4rem] sm:text-[7rem] lg:text-[15rem] text-[#800020]/10 sm:text-[#800020]/[0.06] lg:text-[#800020]/[0.03]">Forever</span>
      </div>
    </Section>
  );
}
