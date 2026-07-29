"use client";

import React, { useState } from 'react';
import confetti from 'canvas-confetti';

export default function RsvpSection({ name }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    attendance: 'yes',
    guests: '1',
    wishes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Fake API log
    console.log("RSVP Submitted:", { name, ...formData });
    
    setIsSubmitted(true);
    
    // Bắn Confetti
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  return (
    <section className="py-24 px-4 relative z-10 overflow-hidden">
      {/* Decorative blurred blobs for background */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#7a1f24]/10 rounded-full blur-3xl" />

      <div className="max-w-xl mx-auto bg-white/40 backdrop-blur-xl rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border border-white/60 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-serif text-[#7a1f24] mb-2">Phúc Đáp (RSVP) 💌</h2>
          <p className="text-[#4A3728]/80 font-light">Sự hiện diện của bạn là món quà to bự nhất dành cho tụi mình đấy! 🥰</p>
        </div>

        {isSubmitted ? (
          <div className="text-center py-12 space-y-4 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-50/80 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200 text-green-500 shadow-inner">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-serif text-[#4A3728]">Triệu like cho {name || 'bạn'}! 👍</h3>
            <p className="text-[#4A3728]/80">Tụi mình đã nhận được phản hồi. Hẹn quẩy hết mình tại đám cưới nhé! 🎉🍻</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#4A3728] mb-1">Tên khách mời thân thương 💕</label>
              <input 
                type="text" 
                value={name || ''} 
                disabled 
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/60 rounded-xl text-[#4A3728]/60 cursor-not-allowed shadow-inner focus:outline-none"
              />
              <p className="text-xs text-[#4A3728]/60 mt-2">* Tên được điền tự động (chống fake vé mời đó nha 😎)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#4A3728] mb-3">Bạn sẽ đến chung vui chứ? 👀</label>
              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex-1 flex items-center gap-2 cursor-pointer bg-white/50 hover:bg-white/70 transition-colors p-3 rounded-xl border border-white/60 shadow-sm">
                  <input 
                    type="radio" 
                    name="attendance" 
                    value="yes"
                    checked={formData.attendance === 'yes'}
                    onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                    className="text-[#D4AF37] focus:ring-[#E2B75A] w-4 h-4"
                  />
                  <span className="text-[#4A3728] text-sm">Chắc chắn rồi! Quẩy tới bến! 🚀</span>
                </label>
                <label className="flex-1 flex items-center gap-2 cursor-pointer bg-white/50 hover:bg-white/70 transition-colors p-3 rounded-xl border border-white/60 shadow-sm">
                  <input 
                    type="radio" 
                    name="attendance" 
                    value="no"
                    checked={formData.attendance === 'no'}
                    onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                    className="text-[#D4AF37] focus:ring-[#E2B75A] w-4 h-4"
                  />
                  <span className="text-[#4A3728] text-sm">Bận mất tiêu, xin lỗi nha 🥺</span>
                </label>
              </div>
            </div>

            {formData.attendance === 'yes' && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-sm font-medium text-[#4A3728] mb-2">Đi mấy người để tụi mình dọn cỗ nè? 🍽️</label>
                <select 
                  value={formData.guests}
                  onChange={(e) => setFormData({...formData, guests: e.target.value})}
                  className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/60 rounded-xl focus:border-[#E2B75A] focus:ring-1 focus:ring-[#E2B75A] outline-none transition-all shadow-inner text-[#4A3728]"
                >
                  <option value="1">1 người (Đi lẻ nhưng quẩy khỏe) 😎</option>
                  <option value="2">2 người (Có đôi có cặp) 👫</option>
                  <option value="3">Hơn 2 người (Kéo cả hội) 🥳</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[#4A3728] mb-2">Để lại vài lời ướt át cho tụi mình nha ✍️</label>
              <textarea 
                rows="4" 
                placeholder="Ví dụ: Chúc hai bạn trăm năm hạnh phúc, sớm sinh quý tử..."
                value={formData.wishes}
                onChange={(e) => setFormData({...formData, wishes: e.target.value})}
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/60 rounded-xl focus:border-[#E2B75A] focus:ring-1 focus:ring-[#E2B75A] outline-none transition-all resize-none shadow-inner text-[#4A3728] placeholder-[#4A3728]/40"
              ></textarea>
            </div>

              <button 
                type="submit"
                className="w-full py-4 bg-[#7a1f24] hover:bg-[#5a1519] text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(122,31,36,0.39)] hover:shadow-[0_6px_20px_rgba(122,31,36,0.23)] hover:-translate-y-0.5 transition-all active:scale-95 uppercase tracking-wider"
              >
                Chốt Đơn! 🚀
              </button>
          </form>
        )}
      </div>
    </section>
  );
}
