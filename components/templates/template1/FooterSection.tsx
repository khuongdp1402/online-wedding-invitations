import type { InvitationData } from "./lib/invitation";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { WatermarkBadge } from "@/components/templates/shared/WatermarkBadge";

type FooterSectionProps = {
  data: InvitationData;
  isFreePlan?: boolean;
};

export function FooterSection({ data, isFreePlan }: FooterSectionProps) {
  return (
    <Section className="bg-paper pb-16">
      <Reveal>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto h-px w-full max-w-6xl bg-[linear-gradient(90deg,transparent,rgba(58,13,26,0.18),transparent)]" />
          <p className="mt-10 text-lg sm:text-xl text-ink-dark font-medium">
            Cảm ơn bạn đã dành thời gian cho ngày trọng đại của
          </p>
          <p className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-script text-burgundy font-bold whitespace-nowrap">
            {data.groom.name} &amp; {data.bride.name}
          </p>
          <p className="mt-4 text-sm sm:text-base tracking-[0.32em] uppercase text-ink/70 font-semibold">Hẹn gặp bạn</p>
          {isFreePlan && <WatermarkBadge className="mt-6 text-ink/70" />}
        </div>
      </Reveal>
    </Section>
  );
}
