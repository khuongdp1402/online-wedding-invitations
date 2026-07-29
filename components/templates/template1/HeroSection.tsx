"use client";

import { motion } from "framer-motion";

type HeroSectionProps = {
  coupleNames?: string;
  date?: string;
  locationLabel?: string;
};

export function HeroSection({
  coupleNames = "Minh Anh & Gia Huy",
  date = "Saturday, 12 October 2026",
  locationLabel = "Saigon, Vietnam"
}: HeroSectionProps) {
  return (
    <section className="relative h-svh min-h-[640px] overflow-hidden">
      {/* Background visual: image or looped video placeholder */}
      <div className="absolute inset-0">
        {/* Replace `hero.jpg` with your own cinematic image or use a <video> */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(91,21,41,0.55),rgba(0,0,0,0.9))]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-burgundy/80 to-black/90" />
      </div>

      <div className="relative flex h-full items-center justify-center px-6 sm:px-10 lg:px-24">
        <div className="max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="serif-heading text-xs sm:text-sm text-white/70 tracking-[0.22em] font-semibold mb-6"
          >
            WE INVITE YOU TO CELEBRATE
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.9, ease: "easeOut" }}
            className="handwritten text-5xl sm:text-6xl lg:text-7xl text-white drop-shadow-[0_15px_45px_rgba(0,0,0,0.6)]"
          >
            {coupleNames}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-8 space-y-2"
          >
            <p className="serif-heading text-[0.80rem] sm:text-xs text-gold tracking-[0.35em]">
              THE WEDDING DAY
            </p>
            <p className="text-lg sm:text-xl lg:text-2xl font-medium text-white/90">
              {date}
            </p>
            <p className="text-sm sm:text-base text-white/60">{locationLabel}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="mt-10 flex flex-col items-center gap-6"
          >
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
            <p className="text-xs sm:text-sm text-white/70 max-w-md">
              A modern, intimate celebration of love, shared with the people who mean
              everything to us.
            </p>
            <a
              href="#loi-chuc"
              className="inline-flex items-center gap-2 rounded-full border border-gold/60 bg-white/5 px-7 py-2.5 text-xs sm:text-sm uppercase tracking-[0.28em] text-gold hover:bg-gold/10 transition-colors"
            >
              RSVP TO CELEBRATE
            </a>
          </motion.div>
        </div>

        {/* scroll hint */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/60 flex flex-col items-center gap-2"
        >
          <span className="tracking-[0.3em] uppercase text-[0.65rem]">Scroll</span>
          <div className="h-10 w-px bg-gradient-to-b from-gold/70 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

