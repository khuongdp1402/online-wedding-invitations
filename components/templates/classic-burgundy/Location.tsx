"use client";

import { motion } from "framer-motion";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import type { WeddingTemplateProps } from "@/lib/template-registry";

type Props = {
  wedding: WeddingTemplateProps["wedding"];
  mode: WeddingTemplateProps["mode"];
};

export function Location({ wedding, mode }: Props) {
  const ceremony = mode === "bride" ? wedding.brideCeremony : wedding.groomCeremony;

  return (
    <Section id="dia-diem" className="relative lg:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="grid gap-16 md:grid-cols-12 md:gap-20 items-center">
            <div className="md:col-span-5 text-center md:text-left">
              <h2 className="text-[#800020] uppercase tracking-[0.25em] text-base sm:text-lg mb-6 font-bold">Địa điểm tổ chức</h2>
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#2A2A2A] font-bold leading-tight mb-6">{ceremony.venue}</h3>
              <p className="text-xl sm:text-2xl text-[#4A4A4A] leading-relaxed mb-10 max-w-md mx-auto md:mx-0 font-medium">{ceremony.address}</p>

              <div className="flex flex-col gap-4">
                {ceremony.googleMapsUrl && (
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={ceremony.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center px-10 py-4 bg-[#800020] text-white text-base tracking-[0.3em] uppercase rounded-none hover:bg-[#5A0016] transition-all shadow-lg font-bold"
                  >
                    Mở Google Maps
                  </motion.a>
                )}
                <motion.a
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(128, 0, 32, 0.05)" }}
                  whileTap={{ scale: 0.98 }}
                  href="#loi-chuc"
                  className="inline-flex items-center justify-center px-10 py-4 border border-[#800020]/20 bg-transparent text-[#800020] text-sm tracking-[0.3em] uppercase transition-all font-bold"
                >
                  Xác nhận tham dự
                </motion.a>
              </div>
            </div>

            <div className="md:col-span-7">
              {ceremony.googleMapsUrl && (
                <div className="bg-white shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] border border-[#D4AF37]/10 rounded-2xl p-0 overflow-hidden shadow-2xl scale-[1.02]">
                  <iframe
                    title="Google Maps"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(ceremony.address)}&output=embed`}
                    className="h-[400px] w-full lg:h-[480px] grayscale-[0.2] contrast-[1.1]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
