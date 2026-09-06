"use client";

import { useSearchParams } from "next/navigation";
import { Heart } from "lucide-react";
import type { InvitationData } from "./lib/invitation";
import { getInviteeFromSearchParams } from "./lib/invitee";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { ImageWithFallback } from "./ImageWithFallback";
import { useEditOverlay, editSlotClass } from "@/components/templates/shared/EditOverlayContext";

type QuoteSectionProps = {
  data: InvitationData;
  photo1?: string;
  photo2?: string;
  isBrideMode?: boolean;
};

export function QuoteSection({ data, photo1, photo2 }: QuoteSectionProps) {
  const edit = useEditOverlay();
  const searchParams = useSearchParams();
  const { inviteeLabel, salutationOnly } = getInviteeFromSearchParams(searchParams);

  return (
    <Section className="relative sm:py-40 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        {/* Mobile: 2 ảnh hiển thị trên khối chữ — luôn hiển thị như bản gốc */}
        <div className="lg:hidden grid grid-cols-2 gap-4 sm:gap-6 max-w-sm mx-auto mb-8 sm:mb-10">
          <Reveal x={-20}>
            <div
              className={editSlotClass(edit, "cb-quote-a", "relative aspect-[3/4] rounded-2xl overflow-hidden border-[4px] border-white shadow-xl rotate-[-3deg]")}
              data-wedding-slot="cb-quote-a"
              onClick={(e) => edit?.onSlotClick?.("cb-quote-a", e.currentTarget)}
              role={edit?.onSlotClick ? "button" : undefined}
            >
              <ImageWithFallback src={photo1 || ""} alt="Ảnh cưới" className="w-full h-full object-cover" />
            </div>
          </Reveal>
          <Reveal x={20}>
            <div
              className={editSlotClass(edit, "cb-quote-b", "relative aspect-[3/4] rounded-2xl overflow-hidden border-[4px] border-white shadow-xl rotate-[3deg] mt-6")}
              data-wedding-slot="cb-quote-b"
              onClick={(e) => edit?.onSlotClick?.("cb-quote-b", e.currentTarget)}
              role={edit?.onSlotClick ? "button" : undefined}
            >
              <ImageWithFallback src={photo2 || ""} alt="Cô dâu" className="w-full h-full object-cover" />
            </div>
          </Reveal>
        </div>

        <div className="relative grid grid-cols-12 gap-8 items-center">
          {/* Desktop: Ảnh trái — luôn hiển thị như bản gốc */}
          <div className="hidden lg:block lg:col-span-4">
            <Reveal x={-40}>
              <div
                className={editSlotClass(edit, "cb-quote-a", "relative aspect-[3/4] rounded-full overflow-hidden border-[6px] border-white shadow-2xl rotate-[-2deg] grayscale-[0.2] hover:grayscale-0 transition-all duration-700")}
                data-wedding-slot="cb-quote-a"
                onClick={(e) => edit?.onSlotClick?.("cb-quote-a", e.currentTarget)}
                role={edit?.onSlotClick ? "button" : undefined}
              >
                <ImageWithFallback src={photo1 || ""} alt="Ảnh cưới" className="w-full h-full object-cover scale-110" />
              </div>
            </Reveal>
          </div>

          {/* Main Quote Content – Trân trọng kính mời trên, quote dưới */}
          <div className="col-span-12 lg:col-span-4 text-center px-4 space-y-6 sm:space-y-8">
            <Reveal>
              <div className="mb-6 flex justify-center opacity-30">
                <Heart className="w-10 h-10 text-burgundy fill-burgundy" />
              </div>
              <p className="text-burgundy text-sm sm:text-base uppercase tracking-[0.35em] font-bold mb-4">
                Trân trọng kính mời
              </p>
              <p className="text-ink-dark text-lg sm:text-xl font-heading font-medium mb-4">
                <span className="font-bold">{inviteeLabel}</span> tới dự buổi tiệc chung vui cùng gia đình chúng tôi.
              </p>
              <p className="text-ink-dark text-lg sm:text-xl font-heading font-medium mb-8">
                Sự hiện diện của <span className="font-bold">{salutationOnly}</span> là niềm vinh hạnh lớn lao cho gia đình chúng tôi.
              </p>
              {data.quote && (
                <p
                  className={editSlotClass(edit, "cb-quote", "text-ink-dark text-base sm:text-lg italic font-medium mb-4")}
                  onClick={(e) => { e.stopPropagation(); edit?.onSlotClick?.("cb-quote", e.currentTarget); }}
                >
                  &ldquo;{data.quote}&rdquo;
                </p>
              )}
              <div className="gold-divider w-24" />
            </Reveal>
          </div>

          {/* Desktop: Ảnh phải — luôn hiển thị như bản gốc */}
          <div className="hidden lg:block lg:col-span-4">
            <Reveal x={40}>
              <div
                className={editSlotClass(edit, "cb-quote-b", "relative aspect-[3/4] rounded-t-full overflow-hidden border-[6px] border-white shadow-2xl rotate-[2deg] grayscale-[0.2] hover:grayscale-0 transition-all duration-700 mt-12")}
                data-wedding-slot="cb-quote-b"
                onClick={(e) => edit?.onSlotClick?.("cb-quote-b", e.currentTarget)}
                role={edit?.onSlotClick ? "button" : undefined}
              >
                <ImageWithFallback src={photo2 || ""} alt="Cô dâu" className="w-full h-full object-cover scale-110" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Decorative text – resize cho mobile thấy rõ, animation bling nhẹ */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none italic font-heading text-burgundy bg-bling-text">
        <span className="block text-[4rem] sm:text-[7rem] lg:text-[15rem] text-burgundy/10 sm:text-burgundy/[0.06] lg:text-burgundy/[0.03]">
          Forever
        </span>
      </div>
    </Section>
  );
}
