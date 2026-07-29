import React from 'react';

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFF8DC] text-[#3e3e3e]">
      {/* Decorative SVG or CSS animation for "walking together" */}
      <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
        <div className="absolute w-24 h-24 border border-[#D4AF37] rounded-full animate-ping opacity-20"></div>
        <div className="absolute w-16 h-16 border-2 border-[#D4AF37] rounded-full opacity-50"></div>
        <div className="text-2xl font-serif text-[#7a1f24]">K & H</div>
      </div>
      
      {/* Loading Progress Bar Container */}
      <div className="w-64 h-1 bg-[#FDF5E6] rounded-full overflow-hidden">
        {/* Indeterminate loading bar for now since it's just Suspense fallback */}
        <div className="h-full bg-[#7a1f24] animate-[pulse_1.5s_ease-in-out_infinite] w-1/2 rounded-full mx-auto"></div>
      </div>
      
      <p className="mt-4 text-sm font-light tracking-widest uppercase">Đang mở thiệp...</p>
    </div>
  );
}
