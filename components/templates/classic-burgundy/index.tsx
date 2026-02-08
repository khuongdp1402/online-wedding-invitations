"use client";

import type { WeddingTemplateProps } from "@/lib/template-registry";

/**
 * Classic Burgundy Template
 * 
 * Thiệp cưới cổ điển tông đỏ burgundy & vàng gold
 * Phong cách Việt Nam truyền thống
 * 
 * This will be fully implemented in Phase 2 when migrating
 * from the existing thanhtung-huonggiang-wedding project.
 * 
 * Sections:
 * - CardOpening (animation mở thiệp)
 * - InvitationHeader
 * - WeddingInfo (thông tin lễ cưới)
 * - Countdown
 * - Quote
 * - Gallery
 * - Location (bản đồ)
 * - Wishes (lời chúc)
 * - Footer
 */
export default function ClassicBurgundyTemplate({
  wedding,
  mode,
  isDemo,
  guestName,
  guestSalutation,
}: WeddingTemplateProps) {
  const primaryColor = wedding.primaryColor || "#800020";
  const accentColor = wedding.accentColor || "#d4a853";

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#faf8f5",
        fontFamily: wedding.fontFamily || "'Playfair Display', serif",
      }}
    >
      {/* Demo Watermark */}
      {isDemo && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div
            className="text-4xl font-bold opacity-[0.08] rotate-[-30deg] select-none"
            style={{ color: primaryColor }}
          >
            BẢN XEM THỬ - thiepcuoi.online
          </div>
        </div>
      )}

      {/* Placeholder content */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8">
          <div
            className="text-6xl mb-4"
            style={{ color: accentColor }}
          >
            ♥
          </div>
          <h1
            className="text-4xl font-bold mb-2"
            style={{ color: primaryColor }}
          >
            {wedding.groomName} & {wedding.brideName}
          </h1>
          {guestSalutation && guestName && (
            <p className="text-lg text-gray-600 mt-4">
              Trân trọng kính mời {guestSalutation} {guestName}
            </p>
          )}
          <p className="text-gray-400 mt-8 text-sm">
            Template đầy đủ sẽ được migrate ở Phase 2
          </p>
          <p className="text-gray-400 text-sm">
            Mode: {mode === "groom" ? "Nhà trai" : "Nhà gái"}
          </p>
        </div>
      </div>
    </div>
  );
}
