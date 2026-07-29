"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { weddingData } from '@/config/weddingData';
import { getDirectImageUrl } from '@/lib/utils/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const IMG_URLS = weddingData.gallery || [];
// Duplicate array to create seamless loop
const DUPLICATED_URLS = [...IMG_URLS, ...IMG_URLS];

export default function GallerySection() {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useGSAP(() => {
    if (!scrollRef.current) return;

    // Translate by -50% to create an infinite loop since we duplicated the array
    const animation = gsap.to(scrollRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 30, // 30 seconds for a full loop, adjust to taste
      repeat: -1,
    });

    const handleMouseEnter = () => animation.pause();
    const handleMouseLeave = () => animation.play();

    const el = scrollRef.current;
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
      animation.kill();
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-[80vh] md:h-screen bg-transparent z-10 overflow-hidden border-t border-[#4A3728]/10 py-6 md:py-0">
      
      {/* Title */}
      <div className="absolute top-10 md:top-24 left-0 w-full z-20 pointer-events-none text-center">
        <p className="text-xs tracking-[0.3em] text-[#7a1f24] font-semibold uppercase mb-4">Khoảnh Khắc</p>
        <h2 className="text-4xl md:text-5xl font-serif text-[#4A3728] drop-shadow-sm">Our Journey</h2>
      </div>

      {/* The Scroll Container with GSAP */}
      <div 
        ref={scrollRef}
        className="flex items-center h-full pt-20 px-4 w-max"
      >
        {DUPLICATED_URLS.map((url, i) => (
          <div key={i} className="relative w-[75vw] md:w-[35vw] h-[55vh] md:h-[65vh] flex-shrink-0 mx-4 md:mx-10 rounded-sm overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-8 border-white group">
            <Image 
              src={getDirectImageUrl(url)} 
              alt={`Memory ${i}`} 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105" 
              sizes="(max-width: 768px) 75vw, 35vw"
              unoptimized
            />
          </div>
        ))}
      </div>
    </section>
  );
}
