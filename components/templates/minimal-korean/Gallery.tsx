"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

type GalleryProps = {
  gallery?: string[];
};

const FALLBACK_IMAGE = "/templates/classic-burgundy/samples/01.jpg";

/** Minimal, editorial captions — thin, wide tracking, cycled if photos exceed labels. */
const STORY_LABELS = [
  { num: "01", ko: "만남", vi: "Gặp Gỡ" },
  { num: "02", ko: "설렘", vi: "Rung Động" },
  { num: "03", ko: "약속", vi: "Lời Hứa" },
  { num: "04", ko: "동행", vi: "Song Hành" },
  { num: "05", ko: "사랑", vi: "Yêu Thương" },
  { num: "06", ko: "영원", vi: "Trọn Đời" },
];

const MAX_CHAPTERS = 6;

function StoryImage({ src, alt }: { src: string; alt: string }) {
  const [errored, setErrored] = useState(false);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={errored ? FALLBACK_IMAGE : src}
      alt={alt}
      loading="lazy"
      onError={() => setErrored(true)}
      className="w-full h-full object-cover"
    />
  );
}

/** Desktop / tablet: sticky-pinned photo with a narrow scrolling caption column. */
function StickyChapters({ photos }: { photos: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = photos.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(count - 1, Math.max(0, Math.floor(v * count)));
    setActive(idx);
  });

  return (
    <div
      ref={containerRef}
      className="hidden md:block relative"
      style={{ height: `${count * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full flex">
        {/* Pinned photo */}
        <div className="relative w-1/2 h-full overflow-hidden bg-stone-100">
          <AnimatePresence initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <StoryImage src={photos[active]} alt={`Ảnh cưới ${active + 1}`} />
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-8 left-8 font-mono text-[11px] tracking-[0.3em] text-white/80 mix-blend-difference">
            {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </div>
        </div>

        {/* Scrolling captions */}
        <div className="w-1/2 h-full flex items-center justify-center px-10 lg:px-16">
          <div className="max-w-sm">
            {STORY_LABELS[active % STORY_LABELS.length] && (
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="block font-mono text-[11px] tracking-[0.35em] text-[var(--mk-accent,#A8A29E)] mb-4">
                  {STORY_LABELS[active % STORY_LABELS.length].num}
                </span>
                <h3 className="font-serif text-3xl lg:text-4xl font-light tracking-tight text-stone-900 mb-3">
                  {STORY_LABELS[active % STORY_LABELS.length].vi}
                </h3>
                <p className="text-xs tracking-[0.2em] uppercase text-stone-400 font-light">
                  {STORY_LABELS[active % STORY_LABELS.length].ko}
                </p>
                <div className="mt-8 h-px w-10 bg-stone-300" />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Mobile: simple, minimal vertical sequence — no pinning, still large photos + captions. */
function MobileStory({ photos }: { photos: string[] }) {
  return (
    <div className="md:hidden">
      {photos.map((src, i) => {
        const label = STORY_LABELS[i % STORY_LABELS.length];
        return (
          <div key={i} className="mk-reveal mk-in-view border-b border-stone-200">
            <div className="w-full aspect-[4/5] bg-stone-100 overflow-hidden">
              <StoryImage src={src} alt={`Ảnh cưới ${i + 1}`} />
            </div>
            <div className="px-6 py-8">
              <span className="block font-mono text-[11px] tracking-[0.35em] text-[var(--mk-accent,#A8A29E)] mb-3">
                {label.num}
              </span>
              <h3 className="font-serif text-2xl font-light tracking-tight text-stone-900 mb-2">
                {label.vi}
              </h3>
              <p className="text-[11px] tracking-[0.2em] uppercase text-stone-400 font-light">
                {label.ko}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Minimal overflow grid for photos beyond the sticky chapter cap. */
function OverflowGrid({ photos }: { photos: string[] }) {
  if (!photos.length) return null;
  return (
    <div className="border-t border-stone-200 px-4 sm:px-8 py-16">
      <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-stone-400 text-center mb-8">
        More
      </p>
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
        {photos.map((src, i) => (
          <div key={i} className="aspect-square overflow-hidden bg-stone-100">
            <StoryImage src={src} alt={`Ảnh cưới bổ sung ${i + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Gallery({ gallery }: GalleryProps) {
  const photos = (gallery ?? []).filter(Boolean);
  if (photos.length === 0) return null;

  const chapters = photos.slice(0, MAX_CHAPTERS);
  const overflow = photos.slice(MAX_CHAPTERS);

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="pt-20 pb-12 px-6 text-center border-b border-stone-200">
        <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-stone-400 block mb-3">
          {"// Câu Chuyện Của Chúng Tôi"}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-stone-900">
          Hành Trình Yêu Thương
        </h2>
      </div>

      <StickyChapters photos={chapters} />
      <MobileStory photos={chapters} />
      <OverflowGrid photos={overflow} />
    </section>
  );
}
