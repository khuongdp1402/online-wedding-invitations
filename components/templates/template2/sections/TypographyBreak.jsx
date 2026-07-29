"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TypographyBreak() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    // Parallax background position cho phần text mask
    gsap.to(textRef.current, {
      backgroundPosition: "50% 100%", // Dịch chuyển ảnh bên trong chữ
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full py-32 flex items-center justify-center overflow-hidden relative z-10">
      <h2 
        ref={textRef}
        className="text-7xl md:text-[12rem] font-serif font-black tracking-tighter text-center"
        style={{
          // Kỹ thuật Text Mask lồng ảnh
          backgroundImage: "url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "50% 0%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        OUR STORY
      </h2>
    </section>
  );
}
