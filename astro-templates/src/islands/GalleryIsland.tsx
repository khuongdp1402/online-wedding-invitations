import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

/**
 * Port từ components/templates/classic-burgundy/Gallery.tsx — lightbox
 * (bắt buộc JS) + parallax scroll-linked nhẹ. Bỏ useEditOverlay/editSlotClass
 * (không cần ở trang public) và ImageWithFallback/next-image (đổi sang <img>
 * thô — ảnh đã `unoptimized` ở bản gốc nên hành vi hiển thị không đổi).
 */
function GalleryItem({ src, alt, parallax }: { src: string; alt: string; parallax: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["0 1", "1 0"] });
  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className="group relative bg-white p-3 sm:p-4 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] hover:shadow-2xl transition-all duration-500"
    >
      <div className="relative aspect-[3/4] overflow-hidden cb-bg-page">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
        />
      </div>
      <div className="mt-4 flex justify-center">
        <div className="h-1 w-8 rounded-full" style={{ backgroundColor: "color-mix(in srgb, var(--cb-accent) 20%, transparent)" }} />
      </div>
    </motion.div>
  );
}

export default function GalleryIsland({ gallery }: { gallery: string[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
        {gallery.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className={`${index % 2 === 0 ? "lg:translate-y-12" : "lg:-translate-y-12"} transition-transform cursor-pointer`}
            onClick={() => setSelectedImage(src)}
          >
            <GalleryItem src={src} alt={`Ảnh cưới ${index + 1}`} parallax={index % 2 === 0 ? 20 : -20} />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl max-h-[85vh] overflow-hidden rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition-all z-20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              </button>
              <img src={selectedImage} alt="Gallery Fullscreen" className="w-full h-full object-contain max-h-[85vh]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
