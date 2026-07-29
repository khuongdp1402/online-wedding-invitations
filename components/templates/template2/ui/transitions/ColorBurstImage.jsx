"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function ColorBurstImage({ 
  src = "/images/z7974179677199_aae30dafd89c8b5af79516e11e3569b1.jpg",
  alt = "Wedding Photo" 
}) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(() => {
    // Khi ảnh vào tầm nhìn, GSAP sẽ làm rõ ảnh và đồng thời bắn event cho Canvas hút các hạt bụi
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 60%", // Kích hoạt khi ảnh nằm ở 60% màn hình
      onEnter: () => {
        // 1. Tẩy filter để ảnh rực rỡ lên
        gsap.to(imageRef.current, {
          filter: 'grayscale(0%) blur(0px)',
          opacity: 1,
          duration: 2,
          ease: "power2.out"
        });

        // 2. Báo cho Canvas biết để tiêu diệt các hạt bụi xung quanh
        window.dispatchEvent(new CustomEvent('canvas:gravityPull'));
      },
      // Nếu cuộn ngược lên lại thì có thể khôi phục hiệu ứng (tuỳ ý)
      onLeaveBack: () => {
        gsap.to(imageRef.current, {
          filter: 'grayscale(100%) blur(10px)',
          opacity: 0.7,
          duration: 1
        });
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="flex justify-center items-center py-20 px-4">
      {/* Container with clip-path to create an elegant arch shape */}
      <div 
        className="relative w-full max-w-md aspect-[3/4] overflow-hidden"
        style={{
          clipPath: 'path("M 0 200 Q 0 0 200 0 Q 400 0 400 200 L 400 800 L 0 800 Z")', // Tùy chỉnh path hoặc dùng ellipse nếu responsive
          // CSS fallback cho clipPath
          clipPath: 'ellipse(50% 45% at 50% 45%)', 
          border: '4px solid rgba(255,255,255,0.5)',
        }}
      >
        <Image 
          ref={imageRef}
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          style={{ filter: 'grayscale(100%) blur(10px)', opacity: 0.7 }}
          unoptimized // Tạm thời unoptimized cho ảnh ngoài Unsplash
        />
        <div className="absolute inset-0 ring-4 ring-white/50 ring-inset rounded-[50%]" />
      </div>
    </div>
  );
}
