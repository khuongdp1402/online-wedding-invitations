"use client";

import { motion } from "framer-motion";
import type { InvitationData } from "./lib/invitation";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

type LocationSectionProps = {
  data: InvitationData;
};

export function LocationSection({ data }: LocationSectionProps) {
  return (
    <Section id="dia-diem" className="relative lg:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="grid gap-16 md:grid-cols-12 md:gap-20 items-center">
            <div className="md:col-span-5 text-center md:text-left">
              <h2 className="title-primary text-base sm:text-lg mb-6">Địa điểm tổ chức</h2>
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-ink-dark font-bold leading-tight mb-6">
                {data.ceremony.venueName}
              </h3>
              <p className="text-xl sm:text-2xl text-ink leading-relaxed mb-10 max-w-md mx-auto md:mx-0 font-medium">
                {data.ceremony.address}
              </p>

              <div className="flex flex-col gap-4">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={data.ceremony.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-10 py-4 bg-burgundy text-white text-base tracking-[0.3em] uppercase rounded-none hover:bg-burgundy-dark transition-all shadow-lg font-bold"
                >
                  Mở Google Maps
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(128, 0, 32, 0.05)" }}
                  whileTap={{ scale: 0.98 }}
                  href="#loi-chuc"
                  className="inline-flex items-center justify-center px-10 py-4 border border-burgundy/20 bg-transparent text-burgundy text-sm tracking-[0.3em] uppercase transition-all font-bold"
                >
                  Xác nhận tham dự
                </motion.a>
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="content-card !p-0 overflow-hidden border-gold/20 shadow-2xl scale-[1.02]">
                <iframe
                  title="Google Maps"
                  src={data.ceremony.googleMapsEmbedUrl}
                  className="h-[400px] w-full lg:h-[480px] grayscale-[0.2] contrast-[1.1]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
