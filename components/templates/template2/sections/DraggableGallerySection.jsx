"use client";

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Draggable } from 'gsap/Draggable';
import { weddingData } from '@/config/weddingData';
import { getDirectImageUrl } from '@/lib/utils/image';

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

const IMG_URLS = weddingData.gallery || [];

export default function DraggableGallerySection() {
  const containerRef = useRef(null);
  const [maxZ, setMaxZ] = useState(10);

  useGSAP(() => {
    // Randomize initial positions
    gsap.utils.toArray('.polaroid-card').forEach((card) => {
      gsap.set(card, {
        rotation: gsap.utils.random(-25, 25),
        x: gsap.utils.random(-200, 200),
        y: gsap.utils.random(-150, 150),
      });
    });

    Draggable.create('.polaroid-card', {
      type: "x,y",
      bounds: containerRef.current,
      inertia: true,
      onPress: function () {
        setMaxZ(prev => {
          const nextZ = prev + 1;
          gsap.set(this.target, { zIndex: nextZ });
          return nextZ;
        });
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#e8e4db] z-10 overflow-hidden border-t border-white/50 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing">
      
      <div className="absolute top-16 md:top-24 left-0 w-full z-0 pointer-events-none text-center">
        <p className="text-xs tracking-[0.3em] text-[#7a1f24] font-semibold uppercase mb-4">Lưu Giữ</p>
        <h2 className="text-4xl md:text-5xl font-serif text-[#4A3728] drop-shadow-sm">Scrapbook</h2>
        <p className="inline-block mt-6 px-6 py-2 bg-[#FFF8DC] border border-[#D4AF37]/50 rounded-full text-sm font-semibold text-[#7a1f24] shadow-md animate-bounce">👆 Kéo thả các bức ảnh bạn nhé!</p>
      </div>

      <div className="relative w-full h-full max-w-4xl flex items-center justify-center pointer-events-auto">
        {IMG_URLS.map((url, i) => (
          <div 
            key={i} 
            className="polaroid-card absolute w-[60vw] md:w-[25vw] aspect-[3/4] bg-transparent p-3 pb-12 shadow-xl rounded-sm will-change-transform"
            style={{ zIndex: i + 1 }}
          >
            <div className="relative w-full h-full bg-[#FDFBF7] overflow-hidden border border-[#4A3728]/10">
              <Image 
                src={getDirectImageUrl(url)} 
                alt={`Scrapbook ${i}`} 
                fill 
                className="object-cover pointer-events-none" 
                sizes="(max-width: 768px) 60vw, 25vw"
                unoptimized
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
