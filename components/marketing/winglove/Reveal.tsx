"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Hook cuộn-để-hiện (scroll reveal) — port từ IntersectionObserver trong
 * mockup tĩnh (`.reveal` / `.in-view`). An toàn khi JS tắt/chưa chạy: phần
 * tử luôn hiển thị (opacity 1) cho tới khi hook kịp gắn observer và ẩn nó
 * đi, ngay sau đó observer sẽ trả nó về trạng thái hiện khi vào viewport.
 */
export function useRevealOnScroll<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setReady(true);
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
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
