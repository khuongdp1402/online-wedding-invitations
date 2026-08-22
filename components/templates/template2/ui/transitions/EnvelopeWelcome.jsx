"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useWeddingData } from '../../StoryEngine';
import { weddingData as staticWeddingData } from '../../config/weddingData';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function EnvelopeWelcome({ guestName, side }) {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);
  const waxSealRef = useRef(null);
  const topFlapRef = useRef(null);
  const innerCardRef = useRef(null);
  const envelopeBodyRef = useRef(null);
  const envelopeBackRef = useRef(null);
  const textRef = useRef(null);
  
  const tl = useRef(null);

  const contextData = useWeddingData();
  const activeWeddingData = contextData || staticWeddingData;

  // Lấy ngày cưới theo side
  const weddingDate = (side === 'nhagai' 
    ? activeWeddingData?.nhagai?.ceremony?.dateSolar 
    : activeWeddingData?.nhatrai?.ceremony?.dateSolar) || "";

  // Lock scroll when envelope is visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  useGSAP(() => {
    // Initial draw SVG animation
    gsap.fromTo(textRef.current, 
      { strokeDasharray: 800, strokeDashoffset: 800, fill: "rgba(212, 175, 55, 0)" },
      { 
        strokeDashoffset: 0, 
        fill: "rgba(212, 175, 55, 1)", 
        duration: 3, 
        ease: "power2.inOut",
      }
    );

    // Setup timeline for the opening sequence
    tl.current = gsap.timeline({ paused: true, onComplete: () => setIsVisible(false) });

    tl.current
      // 1. Wax seal pop, rotate, fade
      .to(waxSealRef.current, { scale: 0, rotation: 15, opacity: 0, duration: 0.4, ease: "back.in(1.7)" })
      // 2. Flap flip
      .to(topFlapRef.current, { rotateX: -180, duration: 0.8, ease: "power2.inOut" })
      // 3. Inner card slides up
      .to(innerCardRef.current, { y: "-40%", duration: 0.6, ease: "power2.out" })
      // 4. Envelope body & back fade out while card expands
      .to([envelopeBodyRef.current, envelopeBackRef.current, topFlapRef.current], { opacity: 0, duration: 0.4 }, "+=0.2")
      // 5. Card expands to fill viewport and becomes transparent
      .to(innerCardRef.current, {
        width: "100vw",
        height: "100vh",
        maxWidth: "100%",
        y: "0%",
        top: 0,
        borderRadius: 0,
        opacity: 0,
        duration: 0.8,
        ease: "power3.inOut"
      }, "<")
      .to(containerRef.current, { opacity: 0, duration: 0.4 }, "-=0.2");

  }, { scope: containerRef });

  const handleOpen = () => {
    if (tl.current) {
      tl.current.play();
    }
  };

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 md:px-10"
      style={{ backgroundImage: 'radial-gradient(circle at center, #FFF8DC 0%, #FDF5E6 100%)' }}
    >
      {/* Envelope Container: Fixed aspect ratio */}
      <div className="relative w-full max-w-4xl aspect-[4/3] md:aspect-[16/9] max-h-[80vh] flex flex-col items-center justify-center mt-8 perspective-[1000px]">
        
        {/* Envelope Back/Inside */}
        <div ref={envelopeBackRef} className="absolute top-0 w-full h-full bg-[#3a0f12] shadow-inner rounded-lg z-0 border border-[#5a1519]"></div>

        {/* Inner Card */}
        <div 
          ref={innerCardRef}
          className="absolute top-10 w-[95%] h-[90%] bg-[#FFF8DC] shadow-md rounded-md z-10 flex flex-col items-center justify-center border border-[color-mix(in_srgb,var(--color-gold)_30%,transparent)]"
          style={{ backgroundImage: 'radial-gradient(circle at center, #FFF8DC 0%, #FDF5E6 100%)' }}
        >
           <div className="text-center">
               <p className="text-sm md:text-base font-light text-[#7a1f24] tracking-[0.2em] uppercase">Save the Date</p>
               <p className="text-4xl md:text-5xl font-calligraphy text-[var(--color-gold)] mt-4 mb-2">{side === 'nhagai' ? `${activeWeddingData.couple.bride.firstName} & ${activeWeddingData.couple.groom.firstName}` : `${activeWeddingData.couple.groom.firstName} & ${activeWeddingData.couple.bride.firstName}`}</p>
           </div>
        </div>

        {/* Bottom/Main Envelope Body */}
        <div ref={envelopeBodyRef} className="absolute bottom-0 w-full h-[85%] bg-[#5a1519] rounded-t-3xl rounded-b-lg shadow-2xl z-20 flex flex-col items-center justify-end pb-8 md:pb-12 border-t-2 border-[color-mix(in_srgb,var(--color-gold)_50%,transparent)] overflow-hidden">
          <div className="text-center flex flex-col items-center">
            {/* Lời Xin chào nét mảnh */}
            <div className="h-16 md:h-24 w-[150%] md:w-full relative flex items-center justify-center">
              <svg width="100%" height="100%" viewBox="0 0 600 120" className="overflow-visible">
                <text
                  ref={textRef}
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-calligraphy text-5xl md:text-6xl stroke-[var(--color-gold)]"
                  style={{ strokeWidth: 0.2, fill: "rgba(212, 175, 55, 0)" }}
                >
                  Xin chào {guestName ? guestName : "bạn"}
                </text>
              </svg>
            </div>
            
            {/* Lời mời mở thiệp nhỏ gọn */}
            <p className="text-sm md:text-base text-[#FDF5E6]/80 font-serif italic mt-1 tracking-wide">
              Mời bạn mở thiệp cưới
            </p>
          </div>
        </div>

        {/* Top Flap of Envelope */}
        <div
          ref={topFlapRef}
          style={{ transformOrigin: "top", backfaceVisibility: "hidden" }}
          className="absolute top-0 w-full h-[55%] bg-[#7a1f24] drop-shadow-lg z-30 flex flex-col justify-center items-center pb-8 rounded-b-[50%] border-b border-[color-mix(in_srgb,var(--color-gold)_50%,transparent)]"
        >
          {/* Nội dung trên nắp phong bì */}
          <div className="text-center space-y-2 mt-4 md:mt-8 pointer-events-none">
            <p className="text-sm md:text-base font-light text-[#FDF5E6] tracking-[0.2em] uppercase">
              Save the Date
            </p>
             <p className="text-5xl md:text-6xl font-calligraphy text-[var(--color-gold)] mt-2 mb-2 drop-shadow-sm">
               {side === 'nhagai' ? `${activeWeddingData.couple.bride.firstName} & ${activeWeddingData.couple.groom.firstName}` : `${activeWeddingData.couple.groom.firstName} & ${activeWeddingData.couple.bride.firstName}`}
             </p>
            <p className="text-lg md:text-xl font-medium text-[var(--color-gold)] tracking-widest drop-shadow-sm">
              {weddingDate.replace(/\//g, '.')}
            </p>
          </div>

          {/* Wax Seal - Vàng Đồng & Chữ đè lên nhau */}
          <div 
            ref={waxSealRef}
            onClick={handleOpen}
            className="absolute -bottom-10 md:-bottom-12 w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#E2B75A] via-[var(--color-gold)] to-[#AA7C11] cursor-pointer shadow-xl border-[3px] border-[var(--color-gold)] flex items-center justify-center pointer-events-auto"
            style={{
              boxShadow: "0 10px 15px -3px rgba(170, 124, 17, 0.4), inset 0 0 12px rgba(255,255,255,0.4)",
              transformOrigin: "center"
            }}
          >
            {/* Chữ K & H thay bằng Logo */}
            <div className="relative w-full h-full rounded-full overflow-hidden pointer-events-none">
              <Image 
                src="/logo.jpg" 
                alt={side === 'nhagai' ? "Logo Hiền & Khương" : "Logo Khương & Hiền"} 
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
