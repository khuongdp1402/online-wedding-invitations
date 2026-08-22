"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import type { WeddingTemplateProps } from "@/lib/template-registry";
import { useEditOverlay, editSlotClass } from "@/components/templates/shared/EditOverlayContext";

type Props = {
  wedding: WeddingTemplateProps["wedding"];
  mode: WeddingTemplateProps["mode"];
  guestName?: string;
  guestSalutation?: string;
};

export function Quote({ wedding, mode, guestName, guestSalutation }: Props) {
  const edit = useEditOverlay();
  const isBrideMode = mode === "bride";
  const inviteeLabel = guestSalutation && guestName
    ? `${guestSalutation} ${guestName}`
    : guestName || "quý khách";
  const salutationOnly = guestSalutation || "quý khách";
  const photo1 = wedding.gallery[4] || "";
  const photo2 = wedding.gallery[5] || "";

  return (
    <Section className="relative sm:py-40 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        {/* Mobile photos */}
        {photo1 && photo2 && (
          <div className="lg:hidden grid grid-cols-2 gap-4 sm:gap-6 max-w-sm mx-auto mb-8 sm:mb-10">
            <Reveal x={-20}>
              <div
                className={editSlotClass(
                  edit,
                  "cb-quote-a",
                  "relative aspect-[3/4] rounded-2xl overflow-hidden border-[4px] border-white shadow-xl rotate-[-3deg]"
                )}
                data-wedding-slot="cb-quote-a"
                onClick={(e) => edit?.onSlotClick?.("cb-quote-a", e.currentTarget)}
                role={edit?.onSlotClick ? "button" : undefined}
              >
                <Image src={photo1} alt={isBrideMode ? "Cô dâu" : "Chú rể"} className="w-full h-full object-cover" fill unoptimized />
              </div>
            </Reveal>
            <Reveal x={20}>
              <div
                className={editSlotClass(
                  edit,
                  "cb-quote-b",
                  "relative aspect-[3/4] rounded-2xl overflow-hidden border-[4px] border-white shadow-xl rotate-[3deg] mt-6"
                )}
                data-wedding-slot="cb-quote-b"
                onClick={(e) => edit?.onSlotClick?.("cb-quote-b", e.currentTarget)}
                role={edit?.onSlotClick ? "button" : undefined}
              >
                <Image src={photo2} alt={isBrideMode ? "Chú rể" : "Cô dâu"} className="w-full h-full object-cover" fill unoptimized />
              </div>
            </Reveal>
          </div>
        )}

        <div className="relative grid grid-cols-12 gap-8 items-center">
          {/* Desktop left photo */}
          {photo1 && (
            <div className="hidden lg:block lg:col-span-4">
              <Reveal x={-40}>
                <div
                  className={editSlotClass(
                    edit,
                    "cb-quote-a",
                    "relative aspect-[3/4] rounded-full overflow-hidden border-[6px] border-white shadow-2xl rotate-[-2deg] grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                  )}
                  data-wedding-slot="cb-quote-a"
                  onClick={(e) => edit?.onSlotClick?.("cb-quote-a", e.currentTarget)}
                  role={edit?.onSlotClick ? "button" : undefined}
                >
                  <Image src={photo1} alt="Portrait" className="w-full h-full object-cover scale-110" fill unoptimized />
                </div>
              </Reveal>
            </div>
          )}

          {/* Quote content */}
          <div className="col-span-12 lg:col-span-4 text-center px-4 space-y-6 sm:space-y-8">
            <Reveal>
              <div className="mb-6 flex justify-center opacity-30">
                <Heart className="w-10 h-10 cb-text-primary" style={{ color: 'var(--cb-primary)', fill: 'var(--cb-primary)' }} />
              </div>
              <p className="cb-text-primary text-sm sm:text-base uppercase tracking-[0.35em] font-bold mb-4">Trân trọng kính mời</p>
              <p className="cb-text-body text-lg sm:text-xl font-heading font-medium mb-4" style={{ color: 'var(--cb-text)' }}>
                <span className="font-bold">{inviteeLabel}</span> tới dự buổi tiệc chung vui cùng gia đình chúng tôi.
              </p>
              <p className="cb-text-body text-lg sm:text-xl font-heading font-medium mb-8" style={{ color: 'var(--cb-text)' }}>
                Sự hiện diện của <span className="font-bold">{salutationOnly}</span> là niềm vinh hạnh lớn lao cho gia đình chúng tôi.
              </p>
              {wedding.quote && (
                <p
                  className={editSlotClass(edit, "cb-quote", "cb-text-body text-base sm:text-lg italic font-medium mb-4")}
                  style={{ color: 'var(--cb-text)' }}
                  onClick={(e) => { e.stopPropagation(); edit?.onSlotClick?.("cb-quote", e.currentTarget); }}
                >
                  &ldquo;{wedding.quote}&rdquo;
                </p>
              )}
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-[var(--cb-accent)] to-transparent mx-auto my-8" />
            </Reveal>
          </div>

          {/* Desktop right photo */}
          {photo2 && (
            <div className="hidden lg:block lg:col-span-4">
              <Reveal x={40}>
                <div
                  className={editSlotClass(
                    edit,
                    "cb-quote-b",
                    "relative aspect-[3/4] rounded-t-full overflow-hidden border-[6px] border-white shadow-2xl rotate-[2deg] grayscale-[0.2] hover:grayscale-0 transition-all duration-700 mt-12"
                  )}
                  data-wedding-slot="cb-quote-b"
                  onClick={(e) => edit?.onSlotClick?.("cb-quote-b", e.currentTarget)}
                  role={edit?.onSlotClick ? "button" : undefined}
                >
                  <Image src={photo2} alt="Portrait" className="w-full h-full object-cover scale-110" fill unoptimized />
                </div>
              </Reveal>
            </div>
          )}
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none italic font-heading">
        <span className="block text-[4rem] sm:text-[7rem] lg:text-[15rem] opacity-10 sm:opacity-[0.06] lg:opacity-[0.03] cb-text-primary">Forever</span>
      </div>
    </Section>
  );
}
