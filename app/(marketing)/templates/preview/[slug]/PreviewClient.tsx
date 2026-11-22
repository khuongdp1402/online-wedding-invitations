"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TemplateRenderer } from "@/components/templates/TemplateRenderer";
import { getSampleWeddingForTemplate } from "@/lib/sample-wedding-data";
import { getTemplate } from "@/lib/template-registry";
import {
  ArrowLeft,
  Heart,
  Smartphone,
  Monitor,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type PreviewClientProps = {
  slug: string;
};

export function PreviewClient({ slug }: PreviewClientProps) {
  const router = useRouter();

  const [mode, setMode] = useState<"groom" | "bride">("groom");
  // Mặc định xem như một website thật (desktop, không khung mock) —
  // người dùng có thể bật chế độ mobile nếu muốn kiểm tra giao diện điện thoại.
  const [device, setDevice] = useState<"mobile" | "desktop">("desktop");

  const templateConfig = getTemplate(slug);
  const sampleWedding = getSampleWeddingForTemplate(slug);

  if (!templateConfig) {
    return (
      <div className="min-h-screen bg-stone-900 text-white flex flex-col items-center justify-center p-4">
        <p className="text-xl font-medium mb-4">Không tìm thấy mẫu thiệp &ldquo;{slug}&rdquo;</p>
        <Button onClick={() => router.push("/templates")} variant="outline" className="text-stone-900">
          <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại kho mẫu thiệp
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col">
      {/* Floating Sticky Top Bar */}
      <header className="sticky top-0 z-[100] bg-stone-900/95 backdrop-blur-md border-b border-stone-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Back and Template Title */}
        <div className="flex items-center gap-3">
          <Link
            href="/templates"
            className="inline-flex items-center gap-1.5 text-xs text-stone-300 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-stone-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Kho Mẫu</span>
          </Link>
          <div className="h-4 w-px bg-stone-700 hidden sm:block" />
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-semibold text-white tracking-wide">
              {templateConfig.name}
            </h1>
            <Badge variant="outline" className="text-[10px] uppercase border-stone-700 text-stone-300">
              {templateConfig.category}
            </Badge>
          </div>
        </div>

        {/* Center Controls: Ceremony Mode & Device Switcher */}
        <div className="flex items-center gap-3">
          {/* Groom / Bride Mode Switcher */}
          <div className="bg-stone-800 p-0.5 rounded-lg flex text-xs">
            <button
              type="button"
              onClick={() => setMode("groom")}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                mode === "groom"
                  ? "bg-rose-600 text-white shadow-sm"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              Nhà Trai
            </button>
            <button
              type="button"
              onClick={() => setMode("bride")}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                mode === "bride"
                  ? "bg-rose-600 text-white shadow-sm"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              Nhà Gái
            </button>
          </div>

          {/* Device Size Switcher: mặc định desktop (website thật), có thể bật mobile để kiểm tra */}
          <div className="flex bg-stone-800 p-0.5 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setDevice("desktop")}
              className={`p-1.5 rounded-md transition-all ${
                device === "desktop"
                  ? "bg-stone-700 text-white shadow-xs"
                  : "text-stone-400 hover:text-stone-200"
              }`}
              title="Xem như website thật (mặc định)"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setDevice("mobile")}
              className={`p-1.5 rounded-md transition-all ${
                device === "mobile"
                  ? "bg-stone-700 text-white shadow-xs"
                  : "text-stone-400 hover:text-stone-200"
              }`}
              title="Xem dạng điện thoại (mô phỏng khung 420px)"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/weddings/new?template=${slug}`}>
            <Button
              size="sm"
              className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-full px-4 shadow-md hover:shadow-rose-600/20"
            >
              <Heart className="w-3.5 h-3.5 mr-1.5 fill-current" />
              Dùng Mẫu Này
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Viewport: mặc định full-bleed như website thật, chỉ khi bật chế độ
          mobile mới thu vào khung mô phỏng điện thoại để kiểm tra responsive. */}
      {device === "desktop" ? (
        <main className="flex-1 bg-white text-stone-900">
          <TemplateRenderer
            templateSlug={slug}
            wedding={sampleWedding}
            mode={mode}
            isDemo={true}
            guestName="Khách Quý"
            guestSalutation="Kính mời"
          />
        </main>
      ) : (
        <main className="flex-1 flex justify-center items-start p-2 sm:p-6 bg-stone-900 overflow-y-auto">
          <div className="w-full max-w-[430px] h-[85vh] min-h-[720px] rounded-[36px] border-[8px] border-stone-800 my-2 overflow-hidden bg-white text-stone-900 shadow-2xl relative [transform:translateZ(0)]">
            <div className="w-full h-full overflow-y-auto">
              <TemplateRenderer
                templateSlug={slug}
                wedding={sampleWedding}
                mode={mode}
                isDemo={true}
                guestName="Khách Quý"
                guestSalutation="Kính mời"
              />
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
