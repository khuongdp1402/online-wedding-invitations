"use client";

import React from 'react';
import { useWeddingData } from '../StoryEngine';
import { weddingData as staticWeddingData } from '../config/weddingData';

export default function FamilySection({ side }) {
  const contextData = useWeddingData();
  const activeWeddingData = contextData || staticWeddingData;
  // Mặc định nhatrai nếu không có
  const currentSide = side === 'nhagai' ? 'nhagai' : 'nhatrai';
  const data = activeWeddingData[currentSide];
  const order = data?.displayOrder || ['groom', 'bride'];

  // Helper để lấy data theo role (groom/bride)
  const getPersonData = (role) => {
    if (role === 'groom') {
      return {
        label: 'Nhà Trai',
        father: activeWeddingData.nhatrai?.parents?.father || "",
        mother: activeWeddingData.nhatrai?.parents?.mother || "",
        name: activeWeddingData.couple?.groom?.firstName || "Chú Rể",
        title: activeWeddingData.couple?.groom?.title || "Quý Nam"
      };
    } else {
      return {
        label: 'Nhà Gái',
        father: activeWeddingData.nhagai?.parents?.father || "",
        mother: activeWeddingData.nhagai?.parents?.mother || "",
        name: activeWeddingData.couple?.bride?.firstName || "Cô Dâu",
        title: activeWeddingData.couple?.bride?.title || "Thứ Nữ"
      };
    }
  };

  const leftPerson = getPersonData(order[0]);
  const rightPerson = getPersonData(order[1]);

  return (
    <section className="py-12 px-4 relative z-10 bg-[#F9F6F0]">
      <div className="max-w-4xl mx-auto">
        
        {/* Lưới 2 họ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 mb-10 text-center relative">
          
          {/* Cột Trái */}
          <div className="space-y-6 relative flex flex-col items-center">
            <h3 className="text-sm tracking-[0.3em] text-[#7a1f24] font-semibold uppercase mb-6 bg-[#FFF8DC] px-4 py-1 rounded-full shadow-sm border border-[color-mix(in_srgb,var(--color-gold)_30%,transparent)]">{leftPerson.label}</h3>
            
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-24 h-32 md:w-32 md:h-40 bg-[color-mix(in_srgb,var(--color-gold)_20%,transparent)] rounded-[50%] mb-4 overflow-hidden border-2 border-[color-mix(in_srgb,var(--color-gold)_40%,transparent)] shadow-sm flex items-center justify-center">
                  <span className="text-[var(--color-gold)] font-serif text-xs">Ảnh Ông</span>
                </div>
                <p className="text-[var(--color-text-primary)] font-serif text-lg md:text-xl font-medium">Ông {leftPerson.father}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-24 h-32 md:w-32 md:h-40 bg-[color-mix(in_srgb,var(--color-gold)_20%,transparent)] rounded-[50%] mb-4 overflow-hidden border-2 border-[color-mix(in_srgb,var(--color-gold)_40%,transparent)] shadow-sm flex items-center justify-center">
                  <span className="text-[var(--color-gold)] font-serif text-xs">Ảnh Bà</span>
                </div>
                <p className="text-[var(--color-text-primary)] font-serif text-lg md:text-xl font-medium">Bà {leftPerson.mother}</p>
              </div>
            </div>
            
            <div className="mt-8">
              <h2 className="text-6xl md:text-7xl font-calligraphy text-[#7a1f24] mb-4 drop-shadow-sm">{leftPerson.name}</h2>
              <p className="text-sm tracking-[0.3em] font-semibold text-[color-mix(in_srgb,var(--color-text-primary)_80%,transparent)] uppercase">{leftPerson.title}</p>
            </div>

            {/* Dấu phân cách nhỏ (chỉ hiện trên Mobile) */}
            <div className="w-12 h-px bg-[var(--color-gold)] mx-auto mt-12 md:hidden" />
          </div>

          {/* Đường kẻ dọc phân cách (chỉ hiện trên Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-[var(--color-gold)] to-transparent -translate-x-1/2" />

          {/* Cột Phải */}
          <div className="space-y-6 flex flex-col items-center">
            <h3 className="text-sm tracking-[0.3em] text-[#7a1f24] font-semibold uppercase mb-6 bg-[#FFF8DC] px-4 py-1 rounded-full shadow-sm border border-[color-mix(in_srgb,var(--color-gold)_30%,transparent)]">{rightPerson.label}</h3>
            
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-24 h-32 md:w-32 md:h-40 bg-[color-mix(in_srgb,var(--color-gold)_20%,transparent)] rounded-[50%] mb-4 overflow-hidden border-2 border-[color-mix(in_srgb,var(--color-gold)_40%,transparent)] shadow-sm flex items-center justify-center">
                  <span className="text-[var(--color-gold)] font-serif text-xs">Ảnh Ông</span>
                </div>
                <p className="text-[var(--color-text-primary)] font-serif text-lg md:text-xl font-medium">Ông {rightPerson.father}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-24 h-32 md:w-32 md:h-40 bg-[color-mix(in_srgb,var(--color-gold)_20%,transparent)] rounded-[50%] mb-4 overflow-hidden border-2 border-[color-mix(in_srgb,var(--color-gold)_40%,transparent)] shadow-sm flex items-center justify-center">
                  <span className="text-[var(--color-gold)] font-serif text-xs">Ảnh Bà</span>
                </div>
                <p className="text-[var(--color-text-primary)] font-serif text-lg md:text-xl font-medium">Bà {rightPerson.mother}</p>
              </div>
            </div>
            
            <div className="mt-8">
              <h2 className="text-6xl md:text-7xl font-calligraphy text-[#7a1f24] mb-4 drop-shadow-sm">{rightPerson.name}</h2>
              <p className="text-sm tracking-[0.3em] font-semibold text-[color-mix(in_srgb,var(--color-text-primary)_80%,transparent)] uppercase">{rightPerson.title}</p>
            </div>
          </div>

        </div>

        {/* Thông tin Lễ Tân Hôn / Vu Quy */}
        <div className="text-center mt-10 max-w-2xl mx-auto border-t border-b border-[var(--color-gold)] py-10">
          <h3 className="text-3xl font-calligraphy text-[#7a1f24] mb-8">{data.ceremony.type}</h3>
          
          <div className="flex justify-center gap-12 md:gap-24 mb-6">
            <div className="flex flex-col items-center">
              <p className="text-xs text-[color-mix(in_srgb,var(--color-text-primary)_60%,transparent)] tracking-widest uppercase mb-2">Giờ làm lễ</p>
              <p className="text-3xl font-serif text-[#7a1f24]">{data.ceremony.time}</p>
            </div>
            {data.party && (
              <div className="flex flex-col items-center">
                <p className="text-xs text-[color-mix(in_srgb,var(--color-text-primary)_60%,transparent)] tracking-widest uppercase mb-2">Giờ nhập tiệc</p>
                <p className="text-3xl font-serif text-[#7a1f24]">{data.party.time.split(' ')[0]}</p>
              </div>
            )}
          </div>

          <p className="text-xl md:text-2xl font-serif text-[var(--color-text-primary)] mb-2">{data.ceremony.dateSolar}</p>
          <p className="text-sm text-[color-mix(in_srgb,var(--color-text-primary)_60%,transparent)] font-light italic mb-8">Nhằm ngày {data.ceremony.dateLunar}</p>

          <p className="text-xs tracking-[0.3em] text-[#7a1f24] font-semibold uppercase mb-4">Địa điểm</p>
          <p className="text-xl font-serif text-[var(--color-text-primary)] mb-2">{data.party.title}</p>
          <p className="text-sm text-[color-mix(in_srgb,var(--color-text-primary)_80%,transparent)] font-light">{data.ceremony.address}</p>
        </div>

      </div>
    </section>
  );
}
