"use client";

import { useState } from "react";
import { Monitor, Smartphone, Eye } from "lucide-react";
import { TemplateRenderer } from "@/components/templates/TemplateRenderer";
import type { WeddingData } from "@/lib/template-registry";

type Props = {
  templateSlug: string;
  weddingDraft: WeddingData;
  highlightSlot: string | null;
  onSlotClick: (slotKey: string) => void;
};

export function EditWeddingPreviewPanel({
  templateSlug,
  weddingDraft,
  highlightSlot,
  onSlotClick,
}: Props) {
  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">("mobile");

  return (
    <div className="h-full w-full flex flex-col bg-neutral-100">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-white shadow-sm z-10 shrink-0">
        <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <Eye className="w-4 h-4 text-rose-600" /> Preview trực tiếp
        </p>
        
        <div className="flex items-center bg-gray-100 p-1 rounded-md">
          <button
            onClick={() => setDeviceMode("desktop")}
            className={`p-1.5 rounded text-sm flex items-center justify-center transition-colors ${
              deviceMode === "desktop" ? "bg-white shadow-sm text-rose-600" : "text-gray-500 hover:text-gray-900"
            }`}
            title="Desktop mode"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeviceMode("mobile")}
            className={`p-1.5 rounded text-sm flex items-center justify-center transition-colors ${
              deviceMode === "mobile" ? "bg-white shadow-sm text-rose-600" : "text-gray-500 hover:text-gray-900"
            }`}
            title="Mobile mode"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto flex justify-center p-4 lg:p-8">
        <div
          className={`bg-white shadow-2xl transition-all duration-300 ease-in-out shrink-0 overflow-hidden ${
            deviceMode === "mobile"
              ? "w-[375px] h-[812px] rounded-3xl ring-8 ring-gray-900"
              : "w-full max-w-[1200px] h-full rounded-xl ring-1 ring-gray-200"
          }`}
        >
          <div className="h-full w-full overflow-y-auto overflow-x-hidden scrollbar-hide">
            <TemplateRenderer
              templateSlug={templateSlug}
              wedding={weddingDraft}
              mode="groom"
              isDemo={false}
              editOverlay={{ highlightSlot, onSlotClick }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
