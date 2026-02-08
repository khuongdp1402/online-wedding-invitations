"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TemplateRenderer } from "@/components/templates/TemplateRenderer";
import type { WeddingData } from "@/lib/template-registry";
import { ArrowLeft, Monitor, Smartphone, Users } from "lucide-react";
import Link from "next/link";

type Props = {
  weddingData: WeddingData;
  templateSlug: string;
  weddingId: string;
};

export function PreviewClient({ weddingData, templateSlug, weddingId }: Props) {
  const [mode, setMode] = useState<"bride" | "groom">("groom");
  const [device, setDevice] = useState<"desktop" | "mobile">("mobile");

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Toolbar */}
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href={`/dashboard/weddings/${weddingId}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-1" /> Quay lại
              </Button>
            </Link>
            <div className="hidden sm:block">
              <h2 className="text-sm font-semibold">Xem trước thiệp</h2>
              <p className="text-xs text-gray-500">
                {weddingData.groomName} & {weddingData.brideName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mode switch */}
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={() => setMode("groom")}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                  mode === "groom" ? "bg-blue-500 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Users className="w-3 h-3 inline mr-1" /> Nhà trai
              </button>
              <button
                onClick={() => setMode("bride")}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                  mode === "bride" ? "bg-pink-500 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Users className="w-3 h-3 inline mr-1" /> Nhà gái
              </button>
            </div>

            {/* Device switch */}
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={() => setDevice("mobile")}
                className={`p-1.5 transition-colors ${
                  device === "mobile" ? "bg-gray-900 text-white" : "bg-white text-gray-600"
                }`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDevice("desktop")}
                className={`p-1.5 transition-colors ${
                  device === "desktop" ? "bg-gray-900 text-white" : "bg-white text-gray-600"
                }`}
              >
                <Monitor className="w-4 h-4" />
              </button>
            </div>

            <Badge variant="outline" className="text-xs">Demo</Badge>
          </div>
        </div>
      </div>

      {/* Preview frame */}
      <div className="flex justify-center py-8 px-4">
        <div
          className={`bg-white shadow-2xl overflow-auto transition-all duration-300 ${
            device === "mobile"
              ? "w-[390px] max-h-[844px] rounded-[2.5rem] ring-8 ring-gray-800"
              : "w-full max-w-5xl rounded-lg"
          }`}
          style={device === "mobile" ? { height: "844px" } : undefined}
        >
          <TemplateRenderer
            templateSlug={templateSlug}
            wedding={weddingData}
            mode={mode}
            isDemo={true}
          />
        </div>
      </div>
    </div>
  );
}
