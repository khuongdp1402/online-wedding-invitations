import type { InvitationData } from "./lib/invitation";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

type FooterSectionProps = {
  data: InvitationData;
};

export function FooterSection({ data }: FooterSectionProps) {
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
        </div>
      </Reveal>
    </Section>
  );
}
