"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

export default function Carousel3DGallery({ chapter }) {
  const containerRef = useRef(null);
  const wheelRef = useRef(null);
  const images = chapter.images || [];
  
  const [rotation, setRotation] = useState(0);
  const totalImages = images.length;
  const anglePerImage = 360 / totalImages;
  
  useGSAP(() => {
    if (!wheelRef.current || totalImages === 0) return;

    Draggable.create(wheelRef.current, {
      type: "rotation",
      inertia: true,
      onDrag: function() {
        setRotation(this.rotation);
      },
      onThrowUpdate: function() {
        setRotation(this.rotation);
      },
      snap: function(endValue) {
        return Math.round(endValue / anglePerImage) * anglePerImage;
      }
    });
  }, { scope: containerRef });

  // Compute active index based on rotation
  // When rotation is 0, index 0 is at bottom (or top depending on setup)
  // We want the image closest to the top of the wheel (center screen) to be active
  
  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[100vh] overflow-hidden bg-[#e8e4db] flex flex-col items-center justify-start"
    >
      <div className="text-center pt-20 relative z-10 pointer-events-none">
        <h2 className="text-[50px] md:text-[80px] font-[family-name:var(--font-serif-display)] text-[#4A3728] drop-shadow-sm leading-none">
          {chapter.title}
        </h2>
        <p className="text-sm tracking-[0.3em] font-semibold text-[#800020] uppercase mt-4">
          Vuốt để xoay vòng thời gian
        </p>
      </div>

      <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] aspect-square" style={{ perspective: "2000px" }}>
        
        <div 
          ref={wheelRef}
          className="relative w-full h-full cursor-grab active:cursor-grabbing"
          style={{ transformStyle: "preserve-3d" }}
        >
          {images.map((src, i) => {
            const angle = i * anglePerImage;
            // Calculate distance from current rotation to determine active state
            // Normalize rotation
            const normalizedRot = ((rotation % 360) + 360) % 360;
            const targetAngle = ((angle % 360) + 360) % 360;
            
            // Shortest angular distance
            let diff = Math.abs(normalizedRot + targetAngle);
            if (diff > 180) diff = Math.abs(diff - 360);
            
            const isActive = diff < (anglePerImage / 2);
            
            return (
              <div 
                key={i}
                className="absolute top-1/2 left-1/2 h-[22vh] sm:h-[28vh] md:h-[32vh] lg:h-[36vh] aspect-[3/4] -translate-x-1/2 -translate-y-1/2 origin-center transition-all duration-300"
                style={{
                  transform: `rotate(${angle}deg) translateY(-140%) rotateX(-5deg)`,
                  opacity: isActive ? 1 : 0.6,
                  filter: isActive ? 'brightness(1.1) drop-shadow(0 15px 25px rgba(0,0,0,0.3))' : 'brightness(0.7) blur(1px)',
                  scale: isActive ? 1.15 : 0.95,
                  zIndex: isActive ? 50 : 10
                }}
              >
                <div className="w-full h-full bg-white p-2 md:p-3 shadow-xl rounded-sm">
                  <div 
                    className="w-full h-full bg-cover bg-top rounded-sm"
                    style={{ backgroundImage: `url(${src})` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Subtle overlay to blend edges if needed, but not hiding the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[15vh] bg-gradient-to-t from-[#e8e4db] to-transparent pointer-events-none z-20 opacity-50" />
      
    </section>
  );
}
