"use client";

import { Section } from "./Section";
import { Reveal } from "./Reveal";
import type { WeddingTemplateProps } from "@/lib/template-registry";

type Props = {
  wedding: WeddingTemplateProps["wedding"];
  mode: WeddingTemplateProps["mode"];
};

export function Footer({ wedding, mode }: Props) {
  const isBrideMode = mode === "bride";
  const names = isBrideMode
    ? `${wedding.brideName} & ${wedding.groomName}`
    : `${wedding.groomName} & ${wedding.brideName}`;

  return (
    <Section className="bg-[#FDFBF7] pb-16">
      <Reveal>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto h-px w-full max-w-6xl bg-[linear-gradient(90deg,transparent,rgba(58,13,26,0.18),transparent)]" />
          <p className="mt-10 text-lg sm:text-xl text-[#2A2A2A] font-medium">
            Cảm ơn bạn đã dành thời gian cho ngày trọng đại của
          </p>
          <p className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-script text-[#800020] font-bold whitespace-nowrap">{names}</p>
          <p className="mt-4 text-sm sm:text-base tracking-[0.32em] uppercase text-[#4A4A4A]/70 font-semibold">Hẹn gặp bạn</p>
        </div>
      </Reveal>
    </Section>
  );
}
