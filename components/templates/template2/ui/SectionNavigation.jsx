"use client";

import { useLenis } from "lenis/react";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function SectionNavigation({ hasStarted }) {
  const lenis = useLenis();

  if (!hasStarted) return null;

  // Custom luxurious easing
  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

  const scrollToElement = (element) => {
    if (!lenis) return;
    
    // Disable CSS snapping during programmatic scroll to prevent browser jumping
    document.documentElement.style.scrollSnapType = 'none';
    
    lenis.scrollTo(element, { 
      duration: 1.8, 
      easing: easeOutQuart,
      onComplete: () => {
        // Re-enable CSS snapping after scroll completes
        document.documentElement.style.scrollSnapType = '';
      }
    });
  };

  const handleNext = () => {
    const chapters = Array.from(document.querySelectorAll('.nav-chapter'));
    const currentScroll = window.scrollY;
    
    // Find the next chapter whose top is significantly below current scroll
    const nextChapter = chapters.find(c => {
      const rect = c.getBoundingClientRect();
      return rect.top > 20; // greater than 20px from top of viewport
    });
    
    if (nextChapter) {
      scrollToElement(nextChapter);
    }
  };

  const handlePrev = () => {
    const chapters = Array.from(document.querySelectorAll('.nav-chapter'));
    const currentScroll = window.scrollY;
    
    // Find the last chapter whose top is significantly above current scroll
    const prevChapter = chapters.slice().reverse().find(c => {
      const rect = c.getBoundingClientRect();
      return rect.top < -20; // less than -20px from top of viewport
    });
    
    if (prevChapter) {
      scrollToElement(prevChapter);
    } else {
      // If no prev chapter found but we are scrolled down, go to top
      if (currentScroll > 50) {
        scrollToElement(0);
      }
    }
  };

  return (
    <div className="fixed right-6 bottom-24 z-[9999] flex flex-col gap-3">
      <button 
        onClick={handlePrev}
        className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:bg-black/40 hover:text-white hover:border-white/40 transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.1)]"
        aria-label="Previous Section"
      >
        <ChevronUp size={24} />
      </button>
      <button 
        onClick={handleNext}
        className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:bg-black/40 hover:text-white hover:border-white/40 transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.1)]"
        aria-label="Next Section"
      >
        <ChevronDown size={24} />
      </button>
    </div>
  );
}
