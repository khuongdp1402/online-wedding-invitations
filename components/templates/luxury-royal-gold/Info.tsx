"use client";

import type { WeddingData } from "@/types/template";
import { Clock, MapPin, Calendar, Sparkles, Navigation } from "lucide-react";

type InfoProps = {
  wedding: WeddingData;
  isBrideMode: boolean;
};

export function Info({ wedding, isBrideMode }: InfoProps) {
  const ceremony = isBrideMode ? wedding.brideCeremony : wedding.groomCeremony;
  const title = isBrideMode ? "LỄ VU QUY HOÀNG GIA" : "LỄ TÂN HÔN HOÀNG GIA";
  const groomPhoto = wedding.gallery?.[1] || wedding.gallery?.[0] || "/templates/classic-burgundy/samples/02.jpg";
  const bridePhoto = wedding.gallery?.[2] || wedding.gallery?.[0] || "/templates/classic-burgundy/samples/03.jpg";

  return (
    <section className="py-20 px-4 sm:px-8 bg-[#0B0B14] border-b border-[#C9A84C]/30 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/40 text-[#FFE29F] text-xs font-serif uppercase tracking-[0.3em] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
            GIA ĐÌNH QUAN VIÊN HAI HỌ
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#FFE29F] font-bold tracking-tight">
            Trân Trọng Phụng Kính Báo
          </h2>
          <div className="w-24 h-0.5 bg-[#C9A84C] mx-auto mt-4" />
        </div>

        {/* Dual Imperial Medallions (Desktop 2-Column Spread) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          {/* House of Groom */}
          <div className="bg-gradient-to-b from-[#141422] to-[#0D0D18] border-2 border-[#C9A84C]/50 rounded-2xl p-8 text-center relative shadow-xl group hover:border-[#C9A84C] transition-all">
            {/* Gold Baroque Frame */}
            <div className="w-28 h-36 mx-auto rounded-full overflow-hidden border-4 border-[#C9A84C] shadow-lg mb-6 ring-4 ring-[#C9A84C]/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={groomPhoto}
                alt="Chú Rể Hoàng Gia"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <span className="inline-block px-3 py-0.5 rounded-full bg-[#C9A84C]/20 text-[#FFE29F] text-[11px] font-serif uppercase tracking-widest border border-[#C9A84C]/40 mb-2">
              QUAN VIÊN NHÀ TRAI
            </span>
            <h3 className="text-2xl font-serif font-bold text-white mb-4">
              {wedding.groomName}
            </h3>

            <div className="border-t border-[#C9A84C]/30 pt-4 text-xs space-y-1.5">
              <p className="text-[#C9A84C] uppercase text-[10px] tracking-widest font-serif">PHỤ THÂN & MẪU THÂN</p>
              <p className="text-stone-200 text-sm font-medium">
                {wedding.groomParents?.father || "Ông Nguyễn Văn A"}
              </p>
              <p className="text-stone-200 text-sm font-medium">
                {wedding.groomParents?.mother || "Bà Trần Thị B"}
              </p>
            </div>
          </div>

          {/* House of Bride */}
          <div className="bg-gradient-to-b from-[#141422] to-[#0D0D18] border-2 border-[#C9A84C]/50 rounded-2xl p-8 text-center relative shadow-xl group hover:border-[#C9A84C] transition-all">
            {/* Gold Baroque Frame */}
            <div className="w-28 h-36 mx-auto rounded-full overflow-hidden border-4 border-[#C9A84C] shadow-lg mb-6 ring-4 ring-[#C9A84C]/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={bridePhoto}
                alt="Cô Dâu Hoàng Gia"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <span className="inline-block px-3 py-0.5 rounded-full bg-[#C9A84C]/20 text-[#FFE29F] text-[11px] font-serif uppercase tracking-widest border border-[#C9A84C]/40 mb-2">
              QUAN VIÊN NHÀ GÁI
            </span>
            <h3 className="text-2xl font-serif font-bold text-white mb-4">
              {wedding.brideName}
            </h3>

            <div className="border-t border-[#C9A84C]/30 pt-4 text-xs space-y-1.5">
              <p className="text-[#C9A84C] uppercase text-[10px] tracking-widest font-serif">PHỤ THÂN & MẪU THÂN</p>
              <p className="text-stone-200 text-sm font-medium">
                {wedding.brideParents?.father || "Ông Lê Văn C"}
              </p>
              <p className="text-stone-200 text-sm font-medium">
                {wedding.brideParents?.mother || "Bà Phạm Thị D"}
              </p>
            </div>
          </div>
        </div>

        {/* Imperial Grand Banquet Pavilion */}
        <div className="bg-gradient-to-b from-[#FFFDF9] via-[#FFF8EE] to-[#FFFDF9] border-4 border-[#C9A84C] rounded-2xl p-8 sm:p-12 text-center relative shadow-2xl">
          <span className="inline-block px-6 py-1.5 rounded-full bg-[#7A0020] text-[#FFE29F] text-xs font-serif font-bold tracking-widest uppercase mb-4 border border-[#C9A84C]">
            {title}
          </span>

          <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#7A0020] mb-3">
            {ceremony?.venue || "Cung Điện Hoàng Gia / Trung Tâm Yến Tiệc Đẳng Cấp"}
          </h3>

          <p className="text-stone-700 text-sm flex items-center justify-center gap-2 mb-8">
            <MapPin className="w-4 h-4 text-[#7A0020]" />
            <span>{ceremony?.address || "Đại Lộ Hoàng Gia, Thành Phố Hồ Chí Minh"}</span>
          </p>

          {/* Time protocol 3-column pill */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-white border border-[#C9A84C]/40 rounded-xl p-6 mb-8">
            <div className="flex flex-col items-center">
              <Calendar className="w-6 h-6 text-[#7A0020] mb-2" />
              <span className="text-[10px] uppercase font-serif text-[#C9A84C] font-bold tracking-wider">NGÀY ĐẠI LỄ</span>
              <span className="text-lg font-serif font-bold text-stone-900">{ceremony?.date || "22 Tháng 11, 2026"}</span>
              {ceremony?.lunarDate && <span className="text-xs text-stone-500">Âm lịch: {ceremony.lunarDate}</span>}
            </div>

            <div className="flex flex-col items-center border-y sm:border-y-0 sm:border-x border-[#C9A84C]/30 py-4 sm:py-0">
              <Clock className="w-6 h-6 text-[#7A0020] mb-2" />
              <span className="text-[10px] uppercase font-serif text-[#C9A84C] font-bold tracking-wider">NGHI THỨC HOÀNG HÔN</span>
              <span className="text-lg font-serif font-bold text-stone-900">{ceremony?.ceremonyTime || "09:00"}</span>
              <span className="text-xs text-stone-500">Cử hành nghi lễ tôn nghiêm</span>
            </div>

            <div className="flex flex-col items-center">
              <Sparkles className="w-6 h-6 text-[#7A0020] mb-2" />
              <span className="text-[10px] uppercase font-serif text-[#C9A84C] font-bold tracking-wider">ĐẠI YẾN TIỆC MỪNG</span>
              <span className="text-lg font-serif font-bold text-stone-900">{ceremony?.receptionTime || "11:30"}</span>
              <span className="text-xs text-stone-500">Kính mời cùng nâng ly chúc phúc</span>
            </div>
          </div>

          {ceremony?.googleMapsUrl && (
            <a
              href={ceremony.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#7A0020] via-[#8B0000] to-[#7A0020] text-[#FFE29F] border border-[#C9A84C] font-serif font-bold text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
            >
              <Navigation className="w-4 h-4" /> Bản Đồ Chỉ Đường Hoàng Gia
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
