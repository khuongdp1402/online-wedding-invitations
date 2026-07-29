"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AsymmetricMasonryGallery({ chapter }) {
  const containerRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fallback images if not provided
  const rawImages = chapter?.images || [];
  
  const images = rawImages.length > 0 
    ? rawImages.map((src, i) => ({ src, alt: `Gallery image ${i}` }))
    : [
        { src: "/images/gallery/1.jpg", alt: "1" },
        { src: "/images/gallery/2.jpg", alt: "2" },
        { src: "/images/gallery/3.jpg", alt: "3" },
        { src: "/images/gallery/4.jpg", alt: "4" },
        { src: "/images/gallery/5.jpg", alt: "5" },
        { src: "/images/gallery/6.jpg", alt: "6" },
      ];

  // Distribute images dynamically: Cô dâu on Left (Col 1), The First in Center (Col 2), Chú rể on Right (Col 3)
  const chureImages = images.filter(img => img.src.includes('/images/chure/'));
  const codauImages = images.filter(img => img.src.includes('/images/codau/'));
  const centerImages = images.filter(img => img.src.includes('/images/the-first/'));

  const hasSpecificFolders = chureImages.length > 0 || codauImages.length > 0 || centerImages.length > 0;

  // Desktop distribution (3 columns)
  const col1 = hasSpecificFolders ? codauImages : images.filter((_, i) => i % 3 === 0);
  const col2 = hasSpecificFolders ? centerImages : images.filter((_, i) => i % 3 === 1);
  const col3 = hasSpecificFolders ? chureImages : images.filter((_, i) => i % 3 === 2);

  // Mobile distribution (2 columns) - balanced for height
  const col1_mobile = hasSpecificFolders
    ? [...codauImages, ...(centerImages.slice(0, 1))]
    : images.filter((_, i) => i % 2 === 0);

  const col2_mobile = hasSpecificFolders
    ? [...chureImages, ...(centerImages.slice(1))]
    : images.filter((_, i) => i % 2 === 1);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Desktop: Setup parallax effect on columns
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });

      tl.to(".gallery-col-1", { yPercent: 10 }, 0)
        .to(".gallery-col-2", { yPercent: -5 }, 0)
        .to(".gallery-col-3", { yPercent: 15 }, 0);
    });

    // Mobile: Entrance animations (Symmetric: Left slides left, Center slides up, Right slides right)
    mm.add("(max-width: 767px)", () => {
      // Left column items slide in from left
      const leftItems = gsap.utils.toArray(".gallery-item-left");
      leftItems.forEach((item) => {
        gsap.fromTo(item,
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 92%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Center column items fade and slide up from bottom
      const centerItems = gsap.utils.toArray(".gallery-item-center");
      centerItems.forEach((item) => {
        gsap.fromTo(item,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 92%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Right column items slide in from right
      const rightItems = gsap.utils.toArray(".gallery-item-right");
      rightItems.forEach((item) => {
        gsap.fromTo(item,
          { x: 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 92%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full py-24 min-h-screen relative bg-[#F9F6F0] text-[#4A3728] overflow-x-hidden">
      
      {chapter?.title && (
        <div className="container mx-auto px-4 lg:px-8 mb-12 text-center">
          <h2 className="text-[50px] md:text-[80px] font-[family-name:var(--font-serif-display)] text-[#4A3728] leading-none">
            {chapter.title}
          </h2>
          {chapter.quote && (
            <p className="mt-4 text-[12px] md:text-sm tracking-[0.2em] font-sans text-[#4A3728]/70 uppercase">
              {chapter.quote}
            </p>
          )}
        </div>
      )}

      <div className="container mx-auto px-4 lg:px-8 mt-20 relative">

        {/* Desktop Layout (3 Columns) */}
        <div className="hidden md:grid grid-cols-[2.5fr_3.5fr_4fr] gap-8 relative z-10">
          
          {/* Column 1 - Cô dâu */}
          <div className="gallery-col-1 flex flex-col gap-8">
            {col1.map((img, i) => (
              <div 
                key={`col1-desk-${i}`} 
                className="gallery-item-left relative cursor-pointer overflow-hidden rounded-xl"
                onClick={() => setSelectedImage(img)}
              >
                <img src={img.src} alt={img.alt} className="w-full h-auto object-cover object-top transition-transform duration-500 hover:scale-105" loading="lazy" />
              </div>
            ))}
          </div>

          {/* Column 2 - The First */}
          <div className="gallery-col-2 flex flex-col gap-8 mt-24">
            {col2.map((img, i) => (
              <div 
                key={`col2-desk-${i}`} 
                className="gallery-item-center relative cursor-pointer overflow-hidden rounded-xl"
                onClick={() => setSelectedImage(img)}
              >
                <img src={img.src} alt={img.alt} className="w-full h-auto object-cover object-top transition-transform duration-500 hover:scale-105" />
              </div>
            ))}
          </div>

          {/* Column 3 - Chú rể */}
          <div className="gallery-col-3 flex flex-col gap-8 mt-12">
            {col3.map((img, i) => (
              <div 
                key={`col3-desk-${i}`} 
                className="gallery-item-right relative cursor-pointer overflow-hidden rounded-xl"
                onClick={() => setSelectedImage(img)}
              >
                <img src={img.src} alt={img.alt} className="w-full h-auto object-cover object-top transition-transform duration-500 hover:scale-105" />
              </div>
            ))}
          </div>

        </div>

        {/* Mobile Layout (2 Columns) */}
        <div className="grid grid-cols-2 gap-4 md:hidden relative z-10">
          
          {/* Column 1 - Cô dâu & 1 Center image */}
          <div className="flex flex-col gap-4">
            {col1_mobile.map((img, i) => (
              <div 
                key={`col1-mob-${i}`} 
                className="gallery-item-left relative cursor-pointer overflow-hidden rounded-xl"
                onClick={() => setSelectedImage(img)}
              >
                <img src={img.src} alt={img.alt} className="w-full h-auto object-cover object-top transition-transform duration-500 hover:scale-105" loading="lazy" />
              </div>
            ))}
          </div>

          {/* Column 2 - Chú rể & 4 Center images */}
          <div className="flex flex-col gap-4 mt-8">
            {col2_mobile.map((img, i) => (
              <div 
                key={`col2-mob-${i}`} 
                className="gallery-item-right relative cursor-pointer overflow-hidden rounded-xl"
                onClick={() => setSelectedImage(img)}
              >
                <img src={img.src} alt={img.alt} className="w-full h-auto object-cover object-top transition-transform duration-500 hover:scale-105" />
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
