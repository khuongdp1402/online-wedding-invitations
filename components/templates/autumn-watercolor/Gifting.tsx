"use client";

import { WeddingData } from "@/lib/template-registry";
import { CreditCard, Heart, Mail } from "lucide-react";

type GiftingProps = {
  wedding: WeddingData;
  isBrideMode: boolean;
};

export function Gifting({ wedding, isBrideMode: _isBrideMode }: GiftingProps) {
  const groomGift = wedding.gifting?.groom;
  const brideGift = wedding.gifting?.bride;

  return (
    <div className="space-y-12">
      <div className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] opacity-40 mb-2">Gifting</p>
        <h2 className="font-script text-4xl text-[#422114]">Hộp mừng cưới</h2>
      </div>

      <div className="flex flex-col items-center space-y-8">
        {/* Envelope Icon */}
        <div className="relative">
          <div className="w-24 h-24 bg-[#422114] rounded-2xl flex items-center justify-center shadow-xl transform -rotate-3">
             <Mail className="w-12 h-12 text-[#f7f1eb]" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#b9856f] rounded-full flex items-center justify-center shadow-md animate-bounce">
             <Heart className="w-4 h-4 text-white fill-white" />
          </div>
        </div>

        <p className="text-sm text-center italic opacity-60 px-4">
          Sự hiện diện của quý vị là niềm hạnh phúc lớn nhất của chúng tôi. Nếu quý vị muốn gửi món quà chúc phúc, có thể sử dụng thông tin dưới đây:
        </p>

        <div className="w-full space-y-6">
          {/* Groom's Bank Info */}
          <div className="p-6 border border-[#b9856f]/20 rounded-xl bg-white space-y-4">
            <p className="font-bold text-[#b9856f] text-xs uppercase tracking-widest text-center">Gửi đến Chú rể</p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5 opacity-40" />
              </div>
              <div className="flex-1 space-y-0.5">
                <p className="text-xs opacity-50 uppercase font-bold">{groomGift?.bankName || "Ngân hàng TMCP MB Bank"}</p>
                <p className="font-bold text-[#422114] tracking-wider">{groomGift?.accountNumber || "1234567890"}</p>
                <p className="text-sm italic opacity-60">Chủ TK: {groomGift?.accountHolder || "PHẠM THANH TÙNG"}</p>
              </div>
            </div>
          </div>

          {/* Bride's Bank Info */}
          <div className="p-6 border border-[#b9856f]/20 rounded-xl bg-white space-y-4">
            <p className="font-bold text-[#b9856f] text-xs uppercase tracking-widest text-center">Gửi đến Cô dâu</p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5 opacity-40" />
              </div>
              <div className="flex-1 space-y-0.5">
                <p className="text-xs opacity-50 uppercase font-bold">{brideGift?.bankName || "Ngân hàng Techcombank"}</p>
                <p className="font-bold text-[#422114] tracking-wider">{brideGift?.accountNumber || "0987654321"}</p>
                <p className="text-sm italic opacity-60">Chủ TK: {brideGift?.accountHolder || "LÊ THỊ MỸ DUYÊN"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
