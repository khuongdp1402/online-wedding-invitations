"use client";

import React from 'react';

export default function MapSection() {
  return (
    <section className="py-10 bg-[#FFF8DC] relative z-10 border-t border-[#4A3728]/10">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h3 className="text-2xl font-serif text-[#4A3728] mb-4">Hướng dẫn đường đi</h3>
        <p className="text-[#4A3728]/80 mb-8 max-w-lg mx-auto">
          Để thuận tiện cho việc di chuyển, quý khách có thể xem bản đồ hướng dẫn đường đi chi tiết bằng Google Maps.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <a 
            href="https://maps.google.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#7a1f24] text-[#FDF5E6] font-medium rounded-full shadow-lg hover:bg-[#5a1519] transition-colors gap-2 w-full md:w-auto"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Chỉ đường trên Google Maps
          </a>

          <a 
            href="https://www.google.com/search?q=địa+điểm+ăn+chơi+Buôn+Ma+Thuột" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-[#7a1f24] text-[#7a1f24] font-medium rounded-full shadow-lg hover:bg-[#7a1f24] hover:text-[#FDF5E6] transition-colors gap-2 w-full md:w-auto"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Gợi ý địa điểm ăn chơi tại BMT
          </a>
        </div>
      </div>
    </section>
  );
}
