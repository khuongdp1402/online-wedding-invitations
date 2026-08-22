"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function StickyStorytellingSection({ chapter }) {
  const containerRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageRefs = useRef([]);

  const milestones = chapter.milestones || [];

  useGSAP(() => {
    if (!milestones.length) return;

    // Fade out images when scrolling past milestones
    milestones.forEach((_, i) => {
      if (i === 0) return; // First image is already visible
      
      const triggerElement = `.milestone-text-${i}`;
      
      ScrollTrigger.create({
        trigger: triggerElement,
        start: "top 60%", // When text reaches 60% of viewport
        end: "bottom 40%",
        onEnter: () => {
          gsap.to(imageRefs.current, { opacity: 0, duration: 0.5 });
          gsap.to(imageRefs.current[i], { opacity: 1, duration: 0.8, ease: "power2.out" });
        },
        onEnterBack: () => {
          gsap.to(imageRefs.current, { opacity: 0, duration: 0.5 });
          gsap.to(imageRefs.current[i], { opacity: 1, duration: 0.8, ease: "power2.out" });
        }
      });
    });

  }, { scope: containerRef });

  if (!milestones.length) return null;

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#FFFDF9] text-[var(--color-text-primary)]"
    >
      <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto">
        
        {/* LEFT: Sticky Image Container */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen sticky top-0 left-0 overflow-hidden bg-[#F5EEDF]">
          <div ref={imageContainerRef} className="relative w-full h-full">
            {milestones.map((m, i) => (
              <div 
                key={i}
                ref={el => imageRefs.current[i] = el}
                className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-[20s] ease-linear hover:scale-110"
                style={{ 
                  backgroundImage: `url(${m.image})`,
                  opacity: i === 0 ? 1 : 0,
                  zIndex: i === 0 ? 1 : 0
                }}
              />
            ))}
            
            {/* Gradient Overlay for text readability on mobile if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF9] via-transparent to-transparent md:hidden" />
          </div>
        </div>

        {/* RIGHT: Scrolling Content */}
        <div className="w-full md:w-1/2 py-[10vh] md:py-[30vh] px-8 md:px-16 flex flex-col justify-center">
          
          <h2 className="text-[50px] md:text-[80px] font-[family-name:var(--font-serif-display)] leading-none text-[var(--color-gold)] mb-20 text-center md:text-left drop-shadow-sm">
            {chapter.title}
          </h2>

          <div className="relative border-l border-[color-mix(in_srgb,var(--color-gold)_30%,transparent)] pl-8 ml-4 md:ml-0 flex flex-col gap-[30vh] pb-[20vh]">
            {milestones.map((m, i) => (
              <div 
                key={i} 
                className={`milestone-text-${i} relative`}
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[37px] top-2 w-4 h-4 rounded-full bg-[#FFFDF9] border-2 border-[var(--color-gold)] shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
                
                <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-[var(--color-gold)] mb-2">
                  {m.year}
                </p>
                <h3 className="font-[family-name:var(--font-serif-display)] text-3xl md:text-4xl text-[var(--color-text-primary)] mb-4">
                  {m.title}
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-[color-mix(in_srgb,var(--color-text-primary)_80%,transparent)] font-serif">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
          
        </div>

      </div>
    </section>
  );
}
