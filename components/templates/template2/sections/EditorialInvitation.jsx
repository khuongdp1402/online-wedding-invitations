"use client";

import React, { useRef, useContext } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GuestContext } from "../StoryEngine";
import { getFullGuestName } from "../lib/utils/guest";

export default function EditorialInvitation({ chapter }) {
  const { side, guestName, guestRole } = useContext(GuestContext);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Gentle Parallax for right image
  const yParallax = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#FDFCF8] text-[#333333] flex flex-col md:flex-row overflow-hidden"
    >
      {/* CỘT TRÁI (30%) - THÔNG TIN GIA ĐÌNH & ẢNH */}
      <div className="w-full md:w-[30%] flex flex-col justify-center items-center px-4 py-12 md:px-6 lg:px-8 border-b md:border-b-0 border-[#D4AF37]/20">

        {/* Phần Text thông tin gia đình nằm phía trên ảnh */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-[350px] flex justify-between items-start mb-6 text-[#333]"
        >
          <div className="text-left w-1/2 pr-2">
            <p className="font-serif font-bold text-[#800020] mb-2 uppercase tracking-widest text-[14px] md:text-[16px]">Nhà Trai</p>
            <p className="font-medium leading-relaxed text-[13px] md:text-sm">Ông: Đỗ Phú Nhẫn</p>
            <p className="font-medium leading-relaxed text-[13px] md:text-sm">Bà: Nguyễn Thị Liễu</p>
          </div>
          <div className="text-right w-1/2 pl-2">
            <p className="font-serif font-bold text-[#800020] mb-2 uppercase tracking-widest text-[14px] md:text-[16px]">Nhà Gái</p>
            <p className="font-medium leading-relaxed text-[13px] md:text-sm">Ông: Hoàng Đình Du</p>
            <p className="font-medium leading-relaxed text-[13px] md:text-sm">Bà: Nguyễn Thị Thuý Nga</p>
          </div>
        </motion.div>

        {/* Phần ảnh nằm phía dưới - Hidden on mobile to save vertical space */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="hidden md:block relative w-full aspect-[3/4] max-w-[350px] mx-auto rounded-lg overflow-hidden shadow-xl"
        >
          <img
            src={chapter.images?.[0] || "/images/banner.jpg"}
            alt="Family Moment"
            className="w-full h-full object-cover object-top"
          />
        </motion.div>
      </div>

      {/* CỘT GIỮA (30%) - CD-CR & LỜI MỜI */}
      <div className="w-full md:w-[30%] flex flex-col justify-center items-center px-6 py-12 md:py-0 relative z-10 bg-[#FDFCF8]">
        <div className="relative text-center w-full max-w-[380px]">

          {/* Câu dẫn tiếng Anh */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-4"
          >
            <p className="font-serif italic text-[#D4AF37] text-[16px] md:text-[20px] tracking-wide">
              Together with their families
            </p>
            <p className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#555] mt-2 font-semibold">
              Joyfully Invite You To Celebrate
            </p>
          </motion.div>

          {/* Tên CD-CR (Medium size) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-8"
          >
            <h2 className="font-[family-name:var(--font-serif-display)] text-[40px] md:text-[50px] lg:text-[55px] leading-[1.1] text-[#800020] tracking-tighter">
              {side === "nhagai" ? (
                <>
                  <span className="block">Cẩm Hiền</span>
                  <span className="block text-[30px] md:text-[40px] text-[#D4AF37] my-1 font-script italic lowercase">&amp;</span>
                  <span className="block">Phú Khương</span>
                </>
              ) : (
                <>
                  <span className="block">Phú Khương</span>
                  <span className="block text-[30px] md:text-[40px] text-[#D4AF37] my-1 font-script italic lowercase">&amp;</span>
                  <span className="block">Cẩm Hiền</span>
                </>
              )}
            </h2>
          </motion.div>

          {/* Lời mời */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-serif text-[16px] md:text-[18px] text-[#333] space-y-4 mx-auto leading-relaxed border-t border-[#D4AF37]/30 pt-8"
          >
            <h3 className="font-[family-name:var(--font-script)] text-[38px] md:text-[48px] text-[#D4AF37] leading-none mb-4 -rotate-3">
              Trân trọng kính mời
            </h3>

            <p className="font-bold text-[#800020] text-xl md:text-2xl uppercase tracking-widest my-2">
              {getFullGuestName(guestRole, guestName)}
            </p>

            <p className="text-[#444] px-4 text-base md:text-lg">đến dự buổi tiệc chung vui cùng gia đình chúng tôi</p>

            <div className="py-4">
              <p className="text-[#800020] font-bold uppercase tracking-widest text-sm mb-1">Vào lúc</p>
              <p className="text-2xl md:text-3xl text-[#800020] font-bold font-[family-name:var(--font-serif-display)]">
                11:00 | {side === "nhagai" ? "18/07/2026" : "19/07/2026"}
              </p>
              <p className="italic text-[#555] text-sm md:text-base mt-1">
                {side === "nhagai" ? "(Nhằm ngày 05/06 âm lịch năm Bính Ngọ)" : "(Nhằm ngày 06/06 âm lịch năm Bính Ngọ)"}
              </p>
            </div>

            <div className="pt-2">
              <p className="text-[#800020] font-bold uppercase tracking-widest text-sm mb-2">
                {side === "nhagai" ? "Tại Tư Gia Nhà Gái" : "Tại Tư Gia Nhà Trai"}
              </p>
              <p className="font-medium text-base md:text-lg text-[#333] leading-relaxed">
                {side === "nhagai"
                  ? "Thôn 1b, Xã Ea M' Droh(Ea M'nang cũ), Tỉnh Đắk Lắk"
                  : "195 Thôn 4A, Xã Quảng Phú(Cư Suê cũ), Tỉnh Đắk Lắk"
                }
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* CỘT PHẢI (40%) - ẢNH CD-CR */}
      <div className="w-full md:w-[40%] h-[50vh] md:h-screen relative overflow-hidden bg-[#EFEBE4]">
        <motion.div
          className="absolute inset-0 w-full h-[110%]"
          style={{ y: yParallax }}
        >
          <img
            src={chapter.images?.[1] || "/images/banner.jpg"}
            alt="Couple"
            className="w-full h-full object-cover object-top"
          />
        </motion.div>
        {/* Lớp phủ Gradient mờ trên mobile để text dễ nhìn nếu chồng chéo */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FDFCF8] via-transparent to-[#FDFCF8] md:hidden pointer-events-none" />
      </div>

    </section>
  );
}
