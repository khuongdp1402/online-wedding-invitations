"use client";

import { WeddingData } from "@/lib/template-registry";
import { Clock, MapPin, Heart } from "lucide-react";

type TimelineProps = {
  wedding: WeddingData;
  isBrideMode: boolean;
};

export function Timeline({ wedding, isBrideMode }: TimelineProps) {
  const events = [
    {
      time: "08:00",
      title: "Lễ Thành Hôn",
      description: "Lễ rước dâu và làm lễ tại gia đình",
      icon: <Heart className="w-5 h-5" />,
    },
    {
      time: "10:00",
      title: "Đón Khách",
      description: "Chào đón quý quan khách tại sảnh tiệc",
      icon: <Clock className="w-5 h-5" />,
    },
    {
      time: "11:00",
      title: "Khai Tiệc",
      description: "Nâng ly chúc mừng hạnh phúc lứa đôi",
      icon: <Clock className="w-5 h-5" />,
    },
  ];

  return (
    <div className="space-y-12">
      <div className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] opacity-40 mb-2">Schedule</p>
        <h2 className="font-script text-4xl text-[#422114]">Chương trình tiệc</h2>
      </div>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-[17px] top-4 bottom-4 w-px bg-[#b9856f]/30" />

        <div className="space-y-10">
          {events.map((item, i) => (
            <div key={i} className="flex gap-6 items-start relative">
              <div className="w-9 h-9 rounded-full bg-white border border-[#b9856f]/30 flex items-center justify-center z-10 text-[#b9856f] shrink-0 shadow-sm">
                {item.icon}
              </div>
              <div className="flex-1 pt-1">
                <p className="text-sm font-bold text-[#b9856f] tracking-widest">{item.time}</p>
                <h3 className="text-lg font-bold text-[#422114] mt-1">{item.title}</h3>
                <p className="text-sm opacity-60 italic mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Location teaser */}
      <div className="p-6 bg-[#422114]/5 rounded-xl border border-[#422114]/5 text-center space-y-3">
        <MapPin className="w-6 h-6 mx-auto text-[#b9856f]" />
        <p className="text-sm font-bold opacity-80 uppercase tracking-widest">Địa điểm tổ chức</p>
        <p className="text-sm font-bold">{isBrideMode ? wedding.brideCeremony.venue : wedding.groomCeremony.venue}</p>
        <p className="text-xs opacity-60 italic">{isBrideMode ? wedding.brideCeremony.address : wedding.groomCeremony.address}</p>
      </div>
    </div>
  );
}
