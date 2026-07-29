"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";

const photos = [
  { src: "/images/z7481584607328_c9e58e9bbed1d112b3e49b082ecdc8fb.jpg", caption: "The first glance" },
  { src: "/images/z7481584990162_737432ce6ed364dd589a63b91f2193ae.jpg", caption: "City lights" },
  { src: "/images/z7481585343579_3930a96148bb262932c18954629fdfb1.jpg", caption: "Quiet sunsets" },
  { src: "/images/z7481585541533_11d8b7ae067a0149ffec4e57e96fe90b.jpg", caption: "Our laughter" }
];

export function PhotoStorySection() {
  return (
    <SectionWrapper id="story" className="relative">
      <div className="mb-10 flex flex-col gap-3">
        <p className="serif-heading text-xs text-white/60">OUR STORY</p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          A little love story in frames.
        </h2>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-0 fade-top-mask" />

        {/* Horizontal, scrollable cinematic strip */}
        <motion.div
          className="flex gap-6 overflow-x-auto pb-4 pt-2 snap-x snap-mandatory"
          whileTap={{ cursor: "grabbing" }}
        >
          {photos.map((photo, index) => (
            <motion.div
              key={photo.src}
              className="relative min-w-[72%] sm:min-w-[48%] lg:min-w-[32%] snap-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              {/* Removed picture border for a cleaner, more cinematic look */}
              <div className="group relative overflow-hidden rounded-3xl glass-card">
                <motion.div
                  className="relative h-72 sm:h-80 lg:h-96"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 120, damping: 18 }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.18),rgba(0,0,0,0.85))]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
                </motion.div>
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-end justify-between">
                  <p className="text-sm sm:text-base font-medium text-white">
                    {photo.caption}
                  </p>
                  <span className="text-[0.65rem] uppercase tracking-[0.22em] font-semibold text-white/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

