"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function InvitationWords({ name, role }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Fade up animation for the images and text
    gsap.from(".invitation-item", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

    // Parallax for the text block
    let mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      gsap.to(".invitation-text-block", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  const guestText = name ? `${role ? role + ' ' : ''}${name}` : 'quý khách';

  return (
    <section ref={containerRef} className="py-12 px-4 bg-transparent relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 md:gap-8">
        
        {/* Ảnh trái (Chú rể) */}
        <div className="invitation-item w-full md:w-1/3 flex justify-center md:justify-end">
          <div className="relative w-[280px] h-[350px] md:w-[320px] md:h-[400px] rounded-t-full rounded-b-2xl overflow-hidden shadow-2xl border-4 border-white transform -rotate-2">
            <Image 
              src="https://images.unsplash.com/photo-1555529902-5261145633bf?q=80&w=800&auto=format&fit=crop"
              alt="Groom"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>

        {/* Lời mời (Giữa) */}
        <div className="invitation-item invitation-text-block w-full md:w-1/3 text-center px-4 py-16">
          <div className="text-[var(--color-gold)] mb-8">
            <svg className="w-10 h-10 mx-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <h2 className="text-3xl tracking-[0.2em] text-[#7a1f24] uppercase font-serif mb-10">Trân trọng kính mời</h2>
          <p className="text-[var(--color-text-primary)] font-serif text-xl md:text-2xl leading-relaxed mb-8">
            quý khách tới dự buổi tiệc chung vui cùng gia đình chúng tôi.
          </p>
          <p className="text-[color-mix(in_srgb,var(--color-text-primary)_80%,transparent)] font-serif text-lg leading-relaxed">
            Sự hiện diện của <br/><strong className="font-semibold text-[var(--color-text-primary)] text-2xl mt-2 inline-block">{guestText}</strong> <br/>là niềm vinh hạnh lớn lao cho gia đình chúng tôi.
          </p>
          
          <div className="w-24 h-px bg-[var(--color-gold)] mx-auto mt-12" />
        </div>

        {/* Ảnh phải (Cô dâu) */}
        <div className="invitation-item w-full md:w-1/3 flex justify-center md:justify-start">
          <div className="relative w-[280px] h-[350px] md:w-[320px] md:h-[400px] rounded-t-full rounded-b-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2">
            <Image 
              src="https://images.unsplash.com/photo-1546193430-c1d3204ecb1a?q=80&w=800&auto=format&fit=crop"
              alt="Bride"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>

      </div>
    </section>
  );
}
