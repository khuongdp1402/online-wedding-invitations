"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

type SectionWrapperProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Reusable scroll-aware wrapper with soft parallax & fade/slide-in.
 */
export function SectionWrapper({ id, children, className = "" }: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0.1 1", "0.8 0"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id={id} className={`section-padding ${className}`}>
      <motion.div
        ref={ref}
        style={{ y, opacity }}
        transition={{ type: "spring", stiffness: 80, damping: 25 }}
      >
        {children}
      </motion.div>
    </section>
  );
}

