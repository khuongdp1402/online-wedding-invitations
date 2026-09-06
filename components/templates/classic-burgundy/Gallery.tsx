"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ImageWithFallback } from "./ImageWithFallback";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { useEditOverlay, editSlotClass } from "@/components/templates/shared/EditOverlayContext";
import { albumSlotKey } from "@/lib/wedding-image-slots";

/**
 * A small set of soft, organic border-radius presets. Cycling through
 * these (instead of one fixed radius) is what keeps the timeline from
 * reading as "rectangles with rounded corners" and gives it a hand-made,
 * blob-ish feel while still cropping to a stable frame size.
 */
const ORGANIC_RADII = [
  "63% 37% 54% 46% / 55% 48% 52% 45%",
  "42% 58% 63% 37% / 41% 47% 53% 59%",
  "58% 42% 39% 61% / 62% 44% 56% 38%",
  "38% 62% 57% 43% / 47% 60% 40% 53%",
];

const ROTATIONS = [-3, 2, -2, 3, -4, 4];

type Props = {
  gallery: string[];
};

export function Gallery({ gallery }: Props) {
  const edit = useEditOverlay();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!gallery || gallery.length === 0) return null;

  return (
    <Section id="anh" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-5xl px-4">
        <Reveal>
          <div className="text-center mb-16 lg:mb-24">
            <h2 className="cb-text-primary uppercase tracking-[0.25em] text-lg sm:text-xl font-bold mb-6">
              Bộ ảnh kỷ niệm
            </h2>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-[var(--cb-accent)] to-transparent mx-auto my-8 opacity-60" />
            <p className="mt-8 text-3xl sm:text-4xl font-heading cb-text-body italic opacity-90 leading-tight">
              &ldquo;Những khoảnh khắc chúng mình yêu nhất.&rdquo;
            </p>
          </div>
        </Reveal>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line: near-left on mobile, centered from md up */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-6 md:left-1/2 w-px md:-translate-x-1/2 bg-gradient-to-b from-transparent via-[var(--cb-accent)] to-transparent opacity-50"
          />

          <ol className="relative flex flex-col gap-16 sm:gap-20 lg:gap-28">
            {gallery.map((src, index) => {
              const isRight = index % 2 === 1;
              const radius = ORGANIC_RADII[index % ORGANIC_RADII.length];
              const rotation = ROTATIONS[index % ROTATIONS.length];
              const slotKey = albumSlotKey(index);

              return (
                <li
                  key={`${src}-${index}`}
                  className="relative pl-16 md:pl-0"
                >
                  {/* Node on the line */}
                  <span
                    aria-hidden
                    className="absolute top-6 left-6 md:left-1/2 h-3 w-3 -translate-x-1/2 rounded-full ring-4 ring-[var(--cb-bg)]"
                    style={{ backgroundColor: "var(--cb-accent)" }}
                  />

                  <div
                    className={`md:flex md:items-center ${
                      isRight ? "md:flex-row-reverse" : "md:flex-row"
                    }`}
                  >
                    <div
                      className={`md:w-1/2 ${
                        isRight ? "md:pl-12 lg:pl-16" : "md:pr-12 lg:pr-16"
                      }`}
                    >
                      <Reveal
                        x={isRight ? 24 : -24}
                        y={20}
                        delay={0.05 * (index % 4)}
                      >
                        <div
                          className={editSlotClass(
                            edit,
                            slotKey,
                            "group mx-auto w-full max-w-sm cursor-pointer"
                          )}
                          data-wedding-slot={slotKey}
                          onClick={(e) => {
                            if (edit?.onSlotClick) {
                              e.stopPropagation();
                              edit.onSlotClick(slotKey, e.currentTarget);
                            } else {
                              setSelectedImage(src);
                            }
                          }}
                        >
                          <div
                            className="relative aspect-[4/5] overflow-hidden bg-white p-2.5 shadow-[0_16px_40px_-12px_rgba(128,0,32,0.25)] transition-all duration-500 group-hover:shadow-[0_20px_50px_-10px_rgba(128,0,32,0.35)] group-hover:-translate-y-1"
                            style={{
                              borderRadius: radius,
                              transform: `rotate(${rotation}deg)`,
                            }}
                          >
                            <div
                              className="relative h-full w-full overflow-hidden"
                              style={{ borderRadius: radius }}
                            >
                              <ImageWithFallback
                                src={src}
                                alt={`Ảnh cưới ${index + 1}`}
                                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                              />
                            </div>
                          </div>
                        </div>
                      </Reveal>
                    </div>

                    {/* Spacer for the other half on desktop */}
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 lg:mt-24 text-center text-base sm:text-lg cb-text-body italic font-medium opacity-60">
            Tình yêu không chỉ là nhìn nhau, mà là cùng nhau nhìn về một hướng.
          </div>
        </Reveal>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl max-h-[85vh] overflow-hidden rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition-all z-20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
              <ImageWithFallback src={selectedImage} alt="Gallery Fullscreen" className="w-full h-full object-contain max-h-[85vh]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
