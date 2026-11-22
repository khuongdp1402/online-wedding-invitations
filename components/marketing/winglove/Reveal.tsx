"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Hook cuộn-để-hiện (scroll reveal). An toàn khi JS tắt/chưa chạy: phần tử
 * luôn hiển thị (opacity 1) cho tới khi hook kịp gắn theo dõi và ẩn nó đi,
 * ngay sau đó trả nó về trạng thái hiện khi vào viewport.
 *
 * Dùng sự kiện `scroll`/`resize` thật (throttle qua rAF) làm cơ chế chính,
 * không chỉ dựa vào IntersectionObserver — trên trang dài nhiều section
 * lồng trong CSS Grid, có lúc callback đầu tiên của IntersectionObserver
 * báo sai (không giao nhau dù phần tử đang thật sự trong viewport) và
 * không có callback nào tới sau đó nữa, khiến nội dung kẹt vô hình vĩnh
 * viễn. IntersectionObserver vẫn được gắn thêm vì đa số trường hợp nó báo
 * đúng và nhạy hơn (không cần đợi sự kiện scroll kế tiếp).
 */
export function useRevealOnScroll<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setReady(true);
    const el = ref.current;
    if (!el) return;

    let revealed = false;
    let ticking = false;

    const reveal = () => {
      if (revealed) return;
      revealed = true;
      setInView(true);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io?.disconnect();
    };

    const checkNow = () => {
      ticking = false;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh - 60 && r.bottom > 0) reveal();
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(checkNow);
    };

    let io: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) reveal();
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
      );
      io.observe(el);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    checkNow(); // kiểm tra ngay — có thể phần tử đã trong viewport từ đầu

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io?.disconnect();
    };
  }, []);

  return { ref, ready, inView };
}

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Độ trễ trước khi hiện (ms) — dùng để so le nhiều phần tử liền kề. */
  delayMs?: number;
};

/** Wrapper tương đương class `.reveal` trong mockup tĩnh. */
export function Reveal({ children, className, delayMs = 0 }: RevealProps) {
  const { ref, ready, inView } = useRevealOnScroll<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        "transition duration-700 ease-out motion-reduce:!opacity-100 motion-reduce:!translate-y-0 motion-reduce:!transition-none",
        ready && !inView && "opacity-0 translate-y-[18px]",
        className
      )}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
