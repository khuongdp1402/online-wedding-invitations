"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAudio, useGuest, useWeddingData } from "../StoryEngine";
import { weddingData as staticWeddingData } from "../config/weddingData";
import { EASE_LUXURY, DURATION_EPIC, DURATION_AUDIO_FADE } from "../config/motionConstants";
import { useEditOverlay, editSlotClass } from "@/components/templates/shared/EditOverlayContext";

import React from "react";
import { getFullGuestName } from "../lib/utils/guest";

const TransparentWaxSeal = React.forwardRef(({ src, className, onClick }, ref) => {
  const internalRef = useRef(null);

  React.useImperativeHandle(ref, () => internalRef.current);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = internalRef.current;
      if (!canvas) return;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      
      // Remove masking that might have cut off an off-center seal
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;
      
      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const i = (y * canvas.width + x) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          // Remove solid black background and dark noise
          if (r < 25 && g < 25 && b < 25) {
            data[i + 3] = 0; // Fully transparent
          } else if (r < 45 && g < 45 && b < 45) {
            // Smooth edge transition
            data[i + 3] = ((r - 25) / 20) * 255;
          }

          // Calculate bounding box strictly on the RED wax seal or bright gold to completely ignore faint shadows/watermarks
          if (data[i + 3] > 0 && r > 60) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }
      
      // Check if we found any visible pixels
      if (maxX >= minX && maxY >= minY) {
        // Add a small 5px padding
        minX = Math.max(0, minX - 5);
        minY = Math.max(0, minY - 5);
        maxX = Math.min(canvas.width - 1, maxX + 5);
        maxY = Math.min(canvas.height - 1, maxY + 5);
        
        const cropWidth = maxX - minX + 1;
        const cropHeight = maxY - minY + 1;
        
        // Put the modified data back first
        ctx.putImageData(imageData, 0, 0);
        
        // Extract the cropped region
        const croppedData = ctx.getImageData(minX, minY, cropWidth, cropHeight);
        
        // Resize canvas to exactly fit the seal
        canvas.width = cropWidth;
        canvas.height = cropHeight;
        
        // Draw the tightly cropped seal
        ctx.putImageData(croppedData, 0, 0);
      } else {
        ctx.putImageData(imageData, 0, 0);
      }
    };
  }, [src]);

  return <canvas ref={internalRef} className={className} onClick={onClick} />;
});

TransparentWaxSeal.displayName = "TransparentWaxSeal";

export default function HeroSection({ chapter, hasStarted, setHasStarted }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const heroImageRef = useRef(null);
  const signatureRef = useRef(null);
  const envelopeRef = useRef(null);
  const polaroidRef = useRef(null);
  const topTextRef = useRef(null);
  const waxSealRef = useRef(null);
  const helperTextRef = useRef(null);
  const bgSilkRef = useRef(null);
  const audioRef = useAudio();
  
  const { side, guestName, guestRole } = useGuest();
  const contextData = useWeddingData();
  const activeWeddingData = contextData || staticWeddingData;
  const editCtx = useEditOverlay();

  const [isAnimating, setIsAnimating] = useState(false);

  // Parse wedding dateSolar to get day, month, year
  const solarDateStr = activeWeddingData[side]?.ceremony?.dateSolar || "19/07/2026";
  const [day, month, year] = solarDateStr.includes('/') ? solarDateStr.split('/') : ["19", "07", "2026"];

  const handleWaxSealClick = useCallback(() => {
    if (hasStarted || isAnimating) return;
    setIsAnimating(true);

    const isDesktop = window.innerWidth >= 768;

    const tl = gsap.timeline({
      onComplete: () => {
        setHasStarted(true);
        setIsAnimating(false);
      }
    });

    // 1. Click seal -> Seal fades
    tl.to(helperTextRef.current, { opacity: 0, duration: 0.3 })
      .to(waxSealRef.current, { scale: 1.5, opacity: 0, duration: 0.8, ease: EASE_LUXURY }, "<");

    // 2. Polaroid is pushed UPWARDS (out of the envelope) and scales up
    tl.to(polaroidRef.current, {
      yPercent: -115,
      scale: 1.4,
      rotation: 0,
      duration: 1.0,
      ease: "power2.out"
    }, "-=0.4")
    // Simultaneously shrink the envelope card cover
    .to(envelopeRef.current, {
      scale: 0.6,
      duration: 1.0,
      ease: "power2.out"
    }, "<");

    // 3. Change zIndex of Polaroid so it overlays the envelope card cover
    tl.set(polaroidRef.current, { zIndex: 20 });

    // 4. Polaroid falls down, landing on top of the envelope card cover
    tl.to(polaroidRef.current, {
      yPercent: 0,
      xPercent: 0,
      rotation: 0,
      duration: 1.0,
      ease: "bounce.out"
    })
    .to(envelopeRef.current, {
      yPercent: 3,
      duration: 0.1,
      ease: "power1.out"
    }, "-=0.7") // Nudge envelope slightly as the polaroid hits it
    .to(envelopeRef.current, {
      yPercent: 0,
      duration: 0.2,
      ease: "power1.inOut"
    })

    // 5. Brief pause to let the guest appreciate the landed photo
    .to({}, { duration: 0.6 });

    // 4. Start opening card ("mở thiệp ra"), fade out the silk background, and turn on the music
    tl.call(() => {
      const audio = audioRef.current;
      if (audio) {
        audio.volume = 0;
        audio.play().catch(() => {});
        gsap.to(audio, { volume: 1, duration: 2.0 }); // Smooth fade in over 2s
      }
    })
    .to(bgSilkRef.current, {
      opacity: 0,
      duration: 1.4,
      ease: "power2.inOut"
    })
    .to(envelopeRef.current, { 
      rotationY: 90, 
      scale: 0.8, 
      opacity: 0, 
      duration: 1.4, 
      ease: "power2.inOut"
    }, "<") // Start rotating card at the exact same time as silk background fades out!
    .to(polaroidRef.current, {
      rotationY: 90,
      scale: 1.8,
      opacity: 0,
      duration: 1.4,
      ease: "power2.inOut"
    }, "<+=0.15") // Start rotating card at the exact same time as silk background fades out!
    
    // Fade in the background Hero Image immediately as the card opens!
    .to(heroImageRef.current, {
      opacity: 0.9,
      scale: 1.1,
      zIndex: 55, // Overlay on top of the card cover
      duration: 2.0,
      ease: "power2.out",
    }, "-=1.2"); // Ends the chain here with a semicolon

    // Handwriting signatures appear right when the background is visible
    if (isDesktop) {
      tl.to(signatureRef.current, { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        ease: EASE_LUXURY 
      }, "-=1.0");
    } else {
      tl.to(signatureRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.1
      }, "-=1.0")
      .fromTo([".mobile-groom", ".mobile-amp", ".mobile-bride", ".mobile-date"],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power2.out"
        },
        "<"
      );
    }

    // Continuous slow zoom that doesn't block the timeline from completing
    gsap.to(heroImageRef.current, {
      scale: 1.15,
      duration: 8,
      ease: "none",
      delay: 2.5
    });
  }, [hasStarted, isAnimating, audioRef, side, day, month, year]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center"
      style={{ backgroundColor: "#3a0909" }}
    >
      {/* ---------------- ENVELOPE / CARD COVER (Layer 0-4) ---------------- */}
      {!hasStarted && (
        <div className="absolute inset-0 z-50 flex items-center justify-center perspective-[1000px]">
          {/* Layer 0: Background Silk */}
          <img ref={bgSilkRef} src="/bia/background.jpg" alt="" className="absolute top-0 left-0 w-full h-[120%] object-cover object-top z-0" />

          {/* Envelope Wrapper - Centered perfectly in the viewport */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Polaroid (Our Story) */}
            <div 
              ref={polaroidRef}
              className="absolute inset-0 m-auto z-0 w-[65vw] md:w-[30vh] h-fit max-w-sm bg-[#F5F5DC] p-3 md:p-5 pb-10 md:pb-14 shadow-2xl rounded-sm"
            >
              <img src={chapter.images[0]} alt="Our Story" className="w-full aspect-[3/4] object-cover object-top rounded-sm" />
              <p className="absolute bottom-3 left-1/2 -translate-x-1/2 font-[family-name:var(--font-calligraphy)] text-2xl md:text-3xl text-[#5D4037]">
                Our Story
              </p>
            </div>

            {/* Layer 1: Card Base */}
            <div 
              ref={envelopeRef} 
              onClick={handleWaxSealClick}
              className="absolute inset-0 m-auto z-10 w-[95vw] md:w-[55vh] aspect-square max-w-lg bg-[#FAF5EC] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.9),0_20px_40px_rgba(0,0,0,0.6),-10px_-10px_30px_rgba(255,255,255,0.1)] rounded-sm cursor-pointer group"
            >
              <img src="/bia/bia-thiep.jpg" alt="Envelope Card" fetchpriority="high" className="absolute inset-0 w-full h-full object-cover rounded-sm z-0" />
              
              {/* Gold string */}
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-[#8B6914] via-[var(--color-gold)] to-[#8B6914] z-20 shadow-sm" style={{ transform: 'translateY(-50%)' }}></div>
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/40 z-20" style={{ transform: 'translateY(-50%)' }}></div>

              {/* Top Text (We're Getting Married) */}
              <div className="absolute top-6 md:top-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-[#5D4037] z-20 w-full">
                <span className="text-sm md:text-base mb-1">❦</span>
                <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-calligraphy)] leading-none mt-1">We&apos;re</h2>
                <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-calligraphy)] leading-none mb-2">Getting Married</h2>
                <span className="text-[10px] md:text-xs">♥</span>
              </div>

              {/* Middle-Bottom Text (Names & Date) */}
              <div className="absolute top-[62%] md:top-[60%] left-1/2 -translate-x-1/2 flex flex-col items-center text-[#5D4037] z-20 w-full text-center">
                <p className="font-serif text-[13px] md:text-base font-bold tracking-[0.2em] mb-1 md:mb-2 uppercase whitespace-nowrap">
                  {side === "nhagai" 
                    ? `${activeWeddingData.couple.bride.name} & ${activeWeddingData.couple.groom.name}` 
                    : `${activeWeddingData.couple.groom.name} & ${activeWeddingData.couple.bride.name}`}
                </p>
                <p className="font-serif text-[11px] md:text-xs tracking-[0.3em] font-medium">{day} . {month} . {year}</p>
              </div>

              {/* Dynamic Text (Trân trọng kính mời...) - Centered at bottom */}
              <div className="absolute bottom-5 md:bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center text-[#5D4037] z-20 w-full text-center">
                <p className="font-[family-name:var(--font-serif-display)] text-xs md:text-sm tracking-[0.25em] uppercase opacity-85 mb-1 font-bold">Trân trọng kính mời</p>
                <h2 className="font-[family-name:var(--font-calligraphy)] text-lg md:text-2xl text-[#7A0C11] font-normal leading-none">
                  {getFullGuestName(guestRole, guestName)}
                </h2>
                <div className="text-[#5D4037]/40 tracking-[0.1em] text-[8px] md:text-xs select-none mt-1.5 leading-none">
                  ......................................................................
                </div>
              </div>

              {/* Layer 3: Wax Seal & Prompt */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group flex flex-col items-center justify-center pointer-events-auto">
                <TransparentWaxSeal 
                  ref={waxSealRef}
                  src="/bia/dau-an-transparent.png" 
                  className="w-16 md:w-24 h-16 md:h-24 object-contain animate-pulse-seal transition-transform group-hover:scale-110 drop-shadow-2xl" 
                />
                <span className="mt-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-amber-300/40 text-amber-200 text-[10px] sm:text-xs font-sans font-medium animate-pulse shadow-xl tracking-wide whitespace-nowrap">
                  Chạm để mở thiệp ✉️
                </span>
              </div>
            </div>
          </div>

          {/* Helper Text (Hidden but preserved for GSAP ref safety) */}
          <div ref={helperTextRef} className="hidden" />
        </div>
      )}

      {/* ---------------- INSIDE THE CARD (Hero Image Sequence) ---------------- */}
      {/* Hero Image Group */}
      <div
        ref={heroImageRef}
        className="absolute inset-0 z-0 opacity-0 will-change-transform flex items-center justify-center"
        style={{ transform: "scale(1)" }}
      >
        {/* Main Content Wrapper (Desktop constrained to aspect ratio, Mobile fills screen) */}
        <div
          className="relative w-full h-full md:aspect-[2560/1708] md:max-w-[calc(100vh*2560/1708)] md:max-h-[calc(100vw*1708/2560)] flex items-center justify-center"
        >
          {/* Responsive Image (Desktop: original banner, Mobile: requested tall image) */}
          <picture
            className={editSlotClass(editCtx, "mc-hero", "absolute inset-0 w-full h-full z-10")}
            onClick={(e) => editCtx?.onSlotClick?.("mc-hero", e.currentTarget)}
          >
            <source media="(max-width: 767px)" srcSet="/images/our-journey/z7974179820669_9281941717087d8906923bbae63e6d2d.jpg" />
            <img
              src={chapter.images[0]}
              alt="Save The Date"
              className="w-full h-full object-cover md:object-cover object-center opacity-70 md:opacity-100"
            />
          </picture>

          {/* Vertical Typography - Left (Quote) - DESKTOP ONLY */}
          <div className="hidden md:flex absolute right-full mr-4 lg:mr-8 top-1/2 -translate-y-1/2 w-12 h-80 items-center justify-center z-30">
            <div className="-rotate-90 whitespace-nowrap text-white tracking-[0.8em] text-[14px] font-sans uppercase">
              The Beginning of Forever
            </div>
          </div>

          {/* Vertical Typography - Right (Stacked Date) - DESKTOP ONLY */}
          <div className="hidden md:flex absolute left-full ml-8 lg:ml-12 top-1/2 -translate-y-1/2 flex-col items-center justify-center gap-3 text-white font-serif text-[40px] lg:text-[45px] z-30">
            <span>{day}</span>
            <div className="w-[1px] h-[30px] lg:h-[50px] bg-white"></div>
            <span>{month}</span>
            <div className="w-[1px] h-[30px] lg:h-[50px] bg-white"></div>
            <span className="writing-vertical-lr text-center" style={{ writingMode: 'vertical-lr', textOrientation: 'upright', letterSpacing: '-0.1em' }}>{year}</span>
          </div>
        </div>

        {/* Soft black gradient at bottom for mobile to make text readable */}
        <div className="absolute inset-0 z-20 md:hidden bg-gradient-to-t from-black via-black/50 to-transparent h-1/2 mt-auto pointer-events-none" />
      </div>

      {/* Cinematic Quote Text (Hidden but ref preserved for GSAP timeline safety) */}
      <div ref={textRef} className="hidden" />

      {/* Signatures & Mobile Date */}
      <div
        ref={signatureRef}
        className="absolute inset-0 z-60 pointer-events-none opacity-0 translate-y-8 flex flex-col justify-end items-center pb-24 md:pb-0 md:justify-center md:items-center"
      >
        {/* Desktop Signatures Wrapper - centered, same dimensions as image */}
        <div className="hidden md:block relative w-full h-full md:aspect-[2560/1708] md:max-w-[calc(100vh*2560/1708)] md:max-h-[calc(100vw*1708/2560)]">
          <div className={`absolute top-[2.5%] ${side === "nhagai" ? "right-[2%] text-right" : "left-[2%] text-left"}`}>
            <h1
              className={editSlotClass(editCtx, "mc-groom-name", "text-[40px] md:text-[50px] lg:text-[60px] xl:text-[70px] text-white/90 font-[family-name:var(--font-calligraphy)] whitespace-nowrap")}
              style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)', pointerEvents: editCtx?.onSlotClick ? "auto" : undefined }}
              onClick={(e) => { e.stopPropagation(); editCtx?.onSlotClick?.("mc-groom-name", e.currentTarget); }}
            >
              {activeWeddingData.couple.groom.firstName}
            </h1>
          </div>
          <div className={`absolute top-[2.5%] ${side === "nhagai" ? "left-[2%] text-left" : "right-[2%] text-right"}`}>
            <h1
              className={editSlotClass(editCtx, "mc-bride-name", "text-[40px] md:text-[50px] lg:text-[60px] xl:text-[70px] text-white/90 font-[family-name:var(--font-calligraphy)] whitespace-nowrap")}
              style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)', pointerEvents: editCtx?.onSlotClick ? "auto" : undefined }}
              onClick={(e) => { e.stopPropagation(); editCtx?.onSlotClick?.("mc-bride-name", e.currentTarget); }}
            >
              {activeWeddingData.couple.bride.firstName}
            </h1>
          </div>
        </div>

        {/* Mobile Signatures & Date (Bottom Center) */}
        <div className="md:hidden w-full flex flex-col items-center justify-center text-center pb-8">
          {side === "nhagai" ? (
            <>
              <h1
                className={editSlotClass(editCtx, "mc-bride-name", "mobile-bride text-[60px] text-[var(--color-gold)] font-[family-name:var(--font-calligraphy)] leading-none")}
                style={{ textShadow: '0 4px 15px rgba(0,0,0,0.8)', pointerEvents: editCtx?.onSlotClick ? "auto" : undefined }}
                onClick={(e) => { e.stopPropagation(); editCtx?.onSlotClick?.("mc-bride-name", e.currentTarget); }}
              >
                {activeWeddingData.couple.bride.firstName}
              </h1>
              <span className="mobile-amp text-white/80 text-3xl font-script italic leading-none -my-1" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>&amp;</span>
              <h1
                className={editSlotClass(editCtx, "mc-groom-name", "mobile-groom text-[60px] text-[var(--color-gold)] font-[family-name:var(--font-calligraphy)] leading-none")}
                style={{ textShadow: '0 4px 15px rgba(0,0,0,0.8)', pointerEvents: editCtx?.onSlotClick ? "auto" : undefined }}
                onClick={(e) => { e.stopPropagation(); editCtx?.onSlotClick?.("mc-groom-name", e.currentTarget); }}
              >
                {activeWeddingData.couple.groom.firstName}
              </h1>
            </>
          ) : (
            <>
              <h1
                className={editSlotClass(editCtx, "mc-groom-name", "mobile-groom text-[60px] text-[var(--color-gold)] font-[family-name:var(--font-calligraphy)] leading-none")}
                style={{ textShadow: '0 4px 15px rgba(0,0,0,0.8)', pointerEvents: editCtx?.onSlotClick ? "auto" : undefined }}
                onClick={(e) => { e.stopPropagation(); editCtx?.onSlotClick?.("mc-groom-name", e.currentTarget); }}
              >
                {activeWeddingData.couple.groom.firstName}
              </h1>
              <span className="mobile-amp text-white/80 text-3xl font-script italic leading-none -my-1" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>&amp;</span>
              <h1
                className={editSlotClass(editCtx, "mc-bride-name", "mobile-bride text-[60px] text-[var(--color-gold)] font-[family-name:var(--font-calligraphy)] leading-none")}
                style={{ textShadow: '0 4px 15px rgba(0,0,0,0.8)', pointerEvents: editCtx?.onSlotClick ? "auto" : undefined }}
                onClick={(e) => { e.stopPropagation(); editCtx?.onSlotClick?.("mc-bride-name", e.currentTarget); }}
              >
                {activeWeddingData.couple.bride.firstName}
              </h1>
            </>
          )}
          <div className="mobile-date mt-5 flex items-center gap-4 text-[var(--color-gold)] font-serif text-lg tracking-[0.15em] uppercase" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
            <span>{day}</span>
            <span className="w-1 h-1 rounded-full bg-[var(--color-gold)]"></span>
            <span>{month}</span>
            <span className="w-1 h-1 rounded-full bg-[var(--color-gold)]"></span>
            <span>{year}</span>
          </div>
        </div>

        {/* Decorative lines & elements on mobile */}
        <div className="md:hidden absolute top-0 left-0 w-full h-full border-[12px] border-double border-[color-mix(in_srgb,var(--color-gold)_20%,transparent)] z-0 pointer-events-none" />
        <div className="md:hidden absolute top-12 left-1/2 -translate-x-1/2 z-0 font-serif text-[10px] tracking-[0.4em] uppercase text-white/40 pointer-events-none">
          Save the Date
        </div>
        <div 
          ref={helperTextRef}
          style={{ transform: "scale(1)" }}
          className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 z-60 text-[10px] tracking-[0.2em] uppercase text-white/60 font-serif opacity-0 animate-pulse pointer-events-none"
        >
          Cuộn xuống để xem thiệp
        </div>
      </div>
    </div>
  );
}
