"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { getDirectImageUrl } from "../lib/utils/image";

export default function HorizontalMarqueeGallery({ chapter }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const dragStateRef = useRef({ dragDistance: 0 });
  
  const images = chapter?.images || [];
  
  // Duplicate images ONLY ONCE to save memory while allowing infinite scroll
  const duplicatedImages = [...images, ...images];

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const state = {
      isDragging: false,
      startX: 0,
      currentX: 0,
      xPos: 0,
      lastInteractionTime: 0
    };

    let animationFrameId;
    const scrollSpeed = 2.0; // Dynamic, smooth speed (can be adjusted for fast/slow)

    const getSetWidth = () => track.scrollWidth / 2;

    const checkWrap = () => {
      const w = getSetWidth();
      if (w <= 0) return;
      
      // If we scroll left past the first set, wrap back
      if (state.xPos <= -w) {
        state.xPos += w;
      } 
      // If we scroll right past 0, wrap forward
      else if (state.xPos >= 0) {
        state.xPos -= w;
      }
    };

    const updatePosition = () => {
      track.style.transform = `translate3d(${state.xPos}px, 0, 0)`;
    };

    const autoScroll = () => {
      // Auto scroll only when user hasn't interacted for 1.5s
      if (!state.isDragging && Date.now() - state.lastInteractionTime > 1500) {
        state.xPos -= scrollSpeed;
        checkWrap();
        updatePosition();
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    autoScroll();

    // Mouse Drag events
    const handleMouseDown = (e) => {
      state.isDragging = true;
      state.lastInteractionTime = Date.now();
      dragStateRef.current.dragDistance = 0;
      state.startX = e.pageX;
      state.currentX = state.xPos;
      container.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e) => {
      if (!state.isDragging) return;
      e.preventDefault();
      state.lastInteractionTime = Date.now();
      
      const deltaX = e.pageX - state.startX;
      dragStateRef.current.dragDistance += Math.abs(deltaX);
      
      state.xPos = state.currentX + deltaX;
      checkWrap();
      updatePosition();
    };

    const handleMouseUpOrLeave = () => {
      if (!state.isDragging) return;
      state.isDragging = false;
      state.lastInteractionTime = Date.now();
      container.style.cursor = 'grab';
    };

    // Touch events for Mobile
    const handleTouchStart = (e) => {
      state.isDragging = true;
      state.lastInteractionTime = Date.now();
      dragStateRef.current.dragDistance = 0;
      state.startX = e.touches[0].pageX;
      state.currentX = state.xPos;
    };

    const handleTouchMove = (e) => {
      if (!state.isDragging) return;
      state.lastInteractionTime = Date.now();
      
      const deltaX = e.touches[0].pageX - state.startX;
      dragStateRef.current.dragDistance += Math.abs(deltaX);
      
      state.xPos = state.currentX + deltaX;
      checkWrap();
      updatePosition();
    };

    const handleTouchEnd = () => {
      state.isDragging = false;
      state.lastInteractionTime = Date.now();
    };

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUpOrLeave);
    container.addEventListener('mouseleave', handleMouseUpOrLeave);
    
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUpOrLeave);
      container.removeEventListener('mouseleave', handleMouseUpOrLeave);
      
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [images.length]);

  return (
    <div className="w-full py-24 min-h-screen relative bg-[#F9F6F0] flex flex-col items-center justify-center overflow-hidden z-10">
      
      {chapter?.title && (
        <div className="container mx-auto px-4 lg:px-8 mb-16 text-center relative z-20 pointer-events-none">
          <h2 className="text-[50px] md:text-[80px] font-[family-name:var(--font-serif-display)] text-[var(--color-text-primary)] leading-none">
            {chapter.title}
          </h2>
          {chapter.quote && (
            <p className="mt-4 text-[12px] md:text-sm tracking-[0.2em] font-sans text-[color-mix(in_srgb,var(--color-text-primary)_70%,transparent)] uppercase">
              {chapter.quote}
            </p>
          )}
        </div>
      )}

      {/* Marquee Container */}
      <div 
        ref={containerRef}
        className="w-full h-[45vh] md:h-[60vh] overflow-hidden cursor-grab active:cursor-grabbing select-none"
      >
        <div 
          ref={trackRef}
          className="flex items-center gap-4 md:gap-8 h-full will-change-transform py-4"
        >
          {duplicatedImages.map((src, i) => (
            <div 
              key={i} 
              className="flex-shrink-0 h-full relative rounded-md shadow-[0_10px_30px_rgba(0,0,0,0.15)] overflow-hidden transition-transform duration-500 hover:scale-[1.02]"
              onClick={(e) => {
                if (dragStateRef.current.dragDistance > 10) {
                  e.preventDefault();
                  return;
                }
                setSelectedImage({ src, alt: `Khoảnh khắc ${i}` });
              }}
            >
              <img 
                src={getDirectImageUrl(src)} 
                alt={`Gallery ${i}`} 
                loading={i < 5 ? "eager" : "lazy"}
                decoding="async"
                className="h-full w-auto block pointer-events-none bg-black/5"
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors z-50 p-2"
              onClick={() => setSelectedImage(null)}
            >
              <X size={36} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={getDirectImageUrl(selectedImage.src)}
              alt={selectedImage.alt}
              className="max-w-full max-h-[90vh] md:max-h-[95vh] object-contain rounded-sm"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
