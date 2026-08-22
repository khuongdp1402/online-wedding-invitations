"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { getDirectImageUrl } from '../lib/utils/image';

export default function MouseTrailGallerySection({ chapter }) {
  const containerRef = useRef(null);
  const imgUrls = chapter?.images || [];
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let currentIndex = 0;
    let lastPos = { x: 0, y: 0 };
    const DISTANCE_THRESHOLD = 100;
    let zIndexCount = 10;

    const spawnImage = (x, y) => {
      const imgDiv = document.createElement("div");
      imgDiv.className = "absolute w-[45vw] md:w-[15vw] aspect-[3/4] shadow-2xl rounded-sm overflow-hidden border-4 border-white opacity-0 pointer-events-none";
      
      imgDiv.style.left = `${x}px`;
      imgDiv.style.top = `${y}px`;
      imgDiv.style.transform = `translate(-50%, -50%)`;
      imgDiv.style.zIndex = zIndexCount++;

      const img = document.createElement("img");
      const rawUrl = imgUrls[currentIndex % imgUrls.length];
      img.src = getDirectImageUrl(rawUrl);
      img.className = "w-full h-full object-cover object-top";
      imgDiv.appendChild(img);

      container.appendChild(imgDiv);

      currentIndex++;

      gsap.fromTo(imgDiv, 
        { 
          scale: 0, 
          rotation: gsap.utils.random(-20, 20),
          opacity: 1 
        },
        { 
          scale: 1, 
          duration: 0.4, 
          ease: "back.out(1.7)"
        }
      );
      
      // Keep a max of 40 images to prevent performance issues
      if (container.childElementCount > 40) {
        const oldestImage = container.querySelector('div.absolute');
        if (oldestImage) {
          gsap.to(oldestImage, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => oldestImage.remove()
          });
        }
      }
    };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const dx = x - lastPos.x;
      const dy = y - lastPos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > DISTANCE_THRESHOLD) {
        lastPos = { x, y };
        spawnImage(x, y);
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("touchmove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("touchmove", handleMouseMove);
    };
  }, [imgUrls]);

  return (
    <section 
      ref={containerRef}
      className="flex story-chapter relative w-full h-screen overflow-hidden flex-col items-center justify-center cursor-crosshair bg-[#111] border-t border-gray-900">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full z-0 pointer-events-none text-center">
        <p className="text-[14px] tracking-[0.3em] text-[var(--color-gold)] font-semibold uppercase mb-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>{chapter?.quote || "Phép Màu"}</p>
        <h2 className="text-[60px] md:text-[100px] text-white/90 font-[family-name:var(--font-serif-display)] leading-none text-shadow-xl drop-shadow-2xl">
          {chapter?.title || "Lễ Hằng Thuận"}
        </h2>
        <p className="inline-block mt-6 px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-semibold text-white shadow-[0_0_15px_rgba(255,255,255,0.3)] animate-pulse">✨ Lướt hoặc chạm để khám phá ✨</p>
      </div>

    </section>
  );
}
