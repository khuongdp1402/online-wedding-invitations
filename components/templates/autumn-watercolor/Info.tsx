"use client";

import { WeddingData } from "@/lib/template-registry";

type InfoProps = {
  wedding: WeddingData;
  isBrideMode: boolean;
};

export function WeddingInfo({ wedding, isBrideMode }: InfoProps) {
  const groom = { name: wedding.groomName, parents: wedding.groomParents };
  const bride = { name: wedding.brideName, parents: wedding.brideParents };

  return (
    <div className="space-y-16 text-center">
      {/* Parents Info */}
      <div className="grid grid-cols-2 gap-8 relative">
        <div className="space-y-2">
          <p className="font-bold text-xs uppercase tracking-widest opacity-50">Nhà trai</p>
          <div className="text-sm space-y-1">
            <p>Bố: {groom.parents.father}</p>
            <p>Mẹ: {groom.parents.mother}</p>
          </div>
          <p className="font-script text-2xl mt-4">{groom.name}</p>
        </div>
        
        <div className="h-24 w-px bg-gray-200 absolute left-1/2 top-4" />

        <div className="space-y-2">
          <p className="font-bold text-xs uppercase tracking-widest opacity-50">Nhà gái</p>
          <div className="text-sm space-y-1">
            <p>Bố: {bride.parents.father}</p>
            <p>Mẹ: {bride.parents.mother}</p>
          </div>
          <p className="font-script text-2xl mt-4">{bride.name}</p>
        </div>
      </div>

      {/* Ceremony Details */}
      <div className="pt-8 space-y-8">
        <div className="inline-block p-1 border border-[color-mix(in_srgb,var(--secondary)_30%,transparent)]">
          <div className="border border-[color-mix(in_srgb,var(--secondary)_10%,transparent)] p-4">
             <p className="font-script text-3xl mb-2">Save the Date</p>
             <p className="text-2xl font-bold">10 . 05 . 2026</p>
             <p className="text-xs uppercase tracking-widest opacity-60">(10 tháng 4 năm Bính Ngọ)</p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="font-script text-3xl text-[var(--secondary)]">Wedding Ceremony</p>
          <div className="space-y-2 text-sm italic opacity-80">
            <p>{isBrideMode ? wedding.brideCeremony.ceremonyTime : wedding.groomCeremony.ceremonyTime}</p>
            <p className="font-bold uppercase not-italic tracking-tighter text-lg">
              {isBrideMode ? wedding.brideCeremony.venue : wedding.groomCeremony.venue}
            </p>
            <p>{isBrideMode ? wedding.brideCeremony.address : wedding.groomCeremony.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
