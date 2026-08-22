"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useWeddingData } from '../StoryEngine';
import { weddingData as staticWeddingData } from '../config/weddingData';

gsap.registerPlugin(ScrollTrigger);

export default function CalendarSection({ side }) {
  const containerRef = useRef(null);
  const heart1Ref = useRef(null);
  const heart2Ref = useRef(null);

  const contextData = useWeddingData();
  const activeWeddingData = contextData || staticWeddingData;
  const currentSide = side === 'nhagai' ? 'nhagai' : 'nhatrai';
  const data = activeWeddingData[currentSide];
  
  // Safe parsing of dateSolar "DD/MM/YYYY" or ISO date
  let weddingDay = 19;
  let weddingMonth = 7;
  let weddingYear = 2026;

  if (data?.ceremony?.dateSolar) {
    const parts = data.ceremony.dateSolar.split('/');
    if (parts.length === 3) {
      weddingDay = parseInt(parts[0], 10);
      weddingMonth = parseInt(parts[1], 10);
      weddingYear = parseInt(parts[2], 10);
    } else {
      const dateObj = new Date(data.ceremony.dateSolar);
      if (!isNaN(dateObj.getTime())) {
        weddingDay = dateObj.getDate();
        weddingMonth = dateObj.getMonth() + 1;
        weddingYear = dateObj.getFullYear();
      }
    }
  }

  // Calculate days in the current wedding month
  const getDaysInMonth = (m, y) => new Date(y, m, 0).getDate();
  const totalDays = getDaysInMonth(weddingMonth, weddingYear);
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  // Calculate day index for padding (Sunday is CN=0, Monday is T2=1...)
  const firstDayIndex = new Date(weddingYear, weddingMonth - 1, 1).getDay();
  const paddingDays = Array.from({ length: firstDayIndex }, (_, i) => i);
  const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  useGSAP(() => {
    const hearts = [heart1Ref.current, heart2Ref.current];
    
    hearts.forEach((heart, index) => {
      if (!heart) return;
      const length = heart.getTotalLength();
      gsap.set(heart, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 0
      });

      gsap.to(heart, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 1.5,
        delay: index * 0.3, // Trái tim thứ 2 vẽ sau trái tim 1 một chút
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%", 
        }
      });
    });

  }, { scope: containerRef });

  // Thêm md:-translate-y-12 để tạo hiệu ứng so le với ảnh bên phải
  return (
    <section ref={containerRef} className="w-full relative z-10 md:-translate-y-12">
      <div className="max-w-md mx-auto bg-[#FFF8DC]/60 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white">
        <div className="text-center mb-8">
          <p className="text-sm tracking-[0.2em] uppercase text-[color-mix(in_srgb,var(--color-text-primary)_60%,transparent)] mb-2">Save the Date</p>
          <h2 className="text-4xl font-serif text-[#7a1f24]">Tháng {weddingMonth} . {weddingYear}</h2>
        </div>

        {/* Lưới Lịch */}
        <div className="grid grid-cols-7 gap-2 text-center mb-4 relative z-20">
          {weekDays.map(day => (
            <div key={day} className="text-xs font-bold text-[color-mix(in_srgb,var(--color-text-primary)_60%,transparent)]">{day}</div>
          ))}
          
          {paddingDays.map(pad => (
            <div key={`pad-${pad}`} className="p-2" />
          ))}

          {days.map(day => {
            const isWeddingDay = day === weddingDay;
            
            return (
              <div 
                key={day} 
                className={`p-2 relative flex items-center justify-center text-sm md:text-base font-medium
                  ${isWeddingDay ? 'text-[#7a1f24] font-bold z-10' : 'text-[color-mix(in_srgb,var(--color-text-primary)_60%,transparent)]'}
                `}
              >
                {day}
                
                {/* 2 trái tim đè lên nhau khoanh vào ngày */}
                {isWeddingDay && (
                  <svg 
                    className="absolute z-[-1] overflow-visible w-[180%] h-[180%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    viewBox="0 0 100 100" 
                    fill="none"
                  >
                    {/* Trái tim 1 (Lệch trái dưới) */}
                    <path 
                      ref={heart1Ref}
                      d="M 50 35 C 50 25, 30 20, 20 35 C 10 50, 50 75, 50 75 C 50 75, 90 50, 80 35 C 70 20, 50 25, 50 35 Z" 
                      stroke="#7a1f24" 
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      transform="translate(-3, 3) rotate(-10 50 50)"
                    />
                    {/* Trái tim 2 (Lệch phải trên) */}
                    <path 
                      ref={heart2Ref}
                      d="M 50 35 C 50 25, 30 20, 20 35 C 10 50, 50 75, 50 75 C 50 75, 90 50, 80 35 C 70 20, 50 25, 50 35 Z" 
                      stroke="#7a1f24" 
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      transform="translate(4, -2) rotate(15 50 50)"
                      opacity="0.8"
                    />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-8 space-y-2">
          <p className="font-serif text-lg text-[#7a1f24] font-semibold">{data.ceremony.type}</p>
          <p className="text-sm font-light text-[color-mix(in_srgb,var(--color-text-primary)_60%,transparent)] tracking-wide uppercase">
            {data.ceremony.dateSolar.replace(/\//g, ' Tháng ').replace(' Tháng 2026', ' Năm 2026')}
          </p>
        </div>
      </div>
    </section>
  );
}
