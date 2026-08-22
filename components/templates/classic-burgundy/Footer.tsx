"use client";

import { Section } from "./Section";
import { Reveal } from "./Reveal";
import type { WeddingTemplateProps } from "@/lib/template-registry";
import { WatermarkBadge } from "@/components/templates/shared/WatermarkBadge";

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
    <Section className="cb-bg-page pb-16">
      <Reveal>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto h-px w-full max-w-6xl bg-[linear-gradient(90deg,transparent,rgba(58,13,26,0.18),transparent)]" />
          <p className="mt-10 text-lg sm:text-xl cb-text-body font-medium" style={{ color: 'var(--cb-text)' }}>
            Cảm ơn bạn đã dành thời gian cho ngày trọng đại của
          </p>
          <p className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-script cb-text-primary font-bold whitespace-nowrap">{names}</p>
          <p className="mt-4 text-sm sm:text-base tracking-[0.32em] uppercase cb-text-body font-semibold opacity-70">Hẹn gặp bạn</p>
          {wedding.status !== "PUBLISHED" && (
            <WatermarkBadge className="mt-6" />
          )}
        </div>
      </Reveal>
    </Section>
  );
}
