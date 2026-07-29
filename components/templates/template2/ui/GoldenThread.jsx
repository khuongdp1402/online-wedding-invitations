"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GoldenThread() {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!pathRef.current) return;

    const pathLength = pathRef.current.getTotalLength();

    // Khởi tạo — Vol.1 §3.1: stroke-dasharray + stroke-dashoffset
    gsap.set(pathRef.current, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // Vẽ theo cuộn — scrub: 1
    triggerRef.current = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        const drawLength = pathLength * self.progress;
        gsap.set(pathRef.current, {
          strokeDashoffset: pathLength - drawLength,
        });
      },
    });

    return () => {
      if (triggerRef.current) triggerRef.current.kill();
    };
  }, []);

  return (
    // Vol.1 §3.1: z-index dưới nội dung (z-10) nhưng trên màu nền (-z-10)
    // => z-[5] là chính xác
    <div className="fixed inset-0 pointer-events-none z-[5] w-full h-full flex justify-center">
      <svg
        ref={svgRef}
        width="60"
        height="100%"
        viewBox="0 0 60 1000"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full"
        style={{ filter: "drop-shadow(0 0 8px rgba(212,175,55,0.5))" }}
      >
        <path
          ref={pathRef}
          d="M30 0 C60 100, 0 200, 30 300 C60 400, 0 500, 30 600 C60 700, 0 800, 30 900 C45 950, 30 1000, 30 1000"
          stroke="var(--color-gold, #D4AF37)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}
