import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

type GalleryItemProps = {
  src: string;
  alt: string;
  className: string;
  parallax: number;
};

function GalleryItem({ src, alt, className, parallax }: GalleryItemProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1 0"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className={`${className} group relative bg-white p-3 sm:p-4 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05),0_4px_10px_-5px_rgba(128,0,32,0.02)] hover:shadow-2xl transition-all duration-500`}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#FDFBF7]">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
        />
      </div>
      <div className="mt-4 flex justify-center">
        <div className="h-1 w-8 bg-gold/20 rounded-full" />
      </div>
    </motion.div>
  );
}

export function GalleryIslandT1({ gallery }: { gallery: {src: string, alt: string}[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  return (
    <section id="anh" className="relative py-24 lg:py-32 overflow-hidden bg-paper">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-20">
            <h2 className="title-primary text-lg sm:text-xl font-bold mb-6 tracking-[0.25em]">Bộ ảnh kỷ niệm</h2>
            <div className="h-px w-24 bg-gold mx-auto opacity-60" />
            <p className="mt-8 text-3xl sm:text-4xl font-heading text-ink italic opacity-90 leading-tight">
              “Những khoảnh khắc chúng mình yêu nhất.”
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
          {gallery.map((item, index) => (
            <div
              key={item.src}
              className={`${index % 2 === 0 ? 'lg:translate-y-12' : 'lg:-translate-y-12'} transition-transform`}
              onClick={() => handleImageClick(item.src)}
            >
              <GalleryItem
                src={item.src}
                alt={item.alt}
                className="w-full cursor-pointer"
                parallax={index % 2 === 0 ? 20 : -20}
              />
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="mt-16 text-center text-base sm:text-lg text-ink/60 italic font-medium">
            Tình yêu không chỉ là nhìn nhau, mà là cùng nhau nhìn về một hướng.
          </div>
        </motion.div>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl max-h-[85vh] overflow-hidden rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition-all z-20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              </button>

              <img
                src={selectedImage}
                alt="Gallery Fullscreen"
                className="w-full h-full object-contain max-h-[85vh]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
