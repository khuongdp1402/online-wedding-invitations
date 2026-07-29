"use client";

import { useMemo, useState } from "react";
import type { WeddingTemplateProps } from "@/lib/template-registry";

function pickCeremony(
  wedding: WeddingTemplateProps["wedding"],
  mode: "bride" | "groom"
) {
  return mode === "bride" ? wedding.brideCeremony : wedding.groomCeremony;
}

export default function IvoryCraneTemplate({
  wedding,
  mode,
  guestName,
  guestSalutation,
}: WeddingTemplateProps) {
  const [opened, setOpened] = useState(false);
  const ceremony = pickCeremony(wedding, mode || "groom");

  const palette = useMemo(
    () => ({
      primary: wedding.primaryColor || "#8c2f2f",
      accent: wedding.accentColor || "#c99b5e",
      bg: wedding.backgroundColor || "#efe4d5",
    }),
    [wedding.primaryColor, wedding.accentColor, wedding.backgroundColor]
  );

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: palette.bg }}>
      <div className="pointer-events-none absolute inset-0 opacity-60" style={{
        backgroundImage:
          "radial-gradient(circle at 10% 12%, rgba(140,47,47,.35) 1px, transparent 2px), radial-gradient(circle at 82% 18%, rgba(201,155,94,.45) 1px, transparent 2px), radial-gradient(circle at 72% 72%, rgba(140,47,47,.28) 1px, transparent 2px)",
        backgroundSize: "240px 240px, 260px 260px, 280px 280px",
      }} />

      <main className="relative mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4 py-12">
        <section className="w-full max-w-md rounded-md border border-[#d7c8b6] bg-[#f6f1ea] p-7 text-center shadow-[0_24px_42px_rgba(0,0,0,.22)] md:p-9">
          <p className="text-[11px] uppercase tracking-[0.34em]" style={{ color: palette.accent }}>
            Wedding Invitation
          </p>

          <h1 className="mt-5 text-4xl leading-tight" style={{ color: palette.primary, fontFamily: "'Playfair Display', Georgia, serif" }}>
            {wedding.brideName}
          </h1>
          <p className="my-1 text-xl" style={{ color: palette.accent }}>&amp;</p>
          <h1 className="text-4xl leading-tight" style={{ color: palette.primary, fontFamily: "'Playfair Display', Georgia, serif" }}>
            {wedding.groomName}
          </h1>

          <p className="mt-6 text-sm text-[#6d5a4e]">{ceremony?.date || "Đang cập nhật ngày cưới"}</p>

          <div className="mx-auto mt-6 max-w-xs rounded-full bg-[#eee4d8] px-3 py-2 text-sm text-[#6f5b4e]">
            Thân mời {guestSalutation ? `${guestSalutation} ` : ""}
            <span className="font-semibold" style={{ color: palette.primary }}>{guestName || "Quý khách"}</span>
          </div>

          {opened ? (
            <div className="mt-6 space-y-3 text-sm text-[#5b4a3e]">
              <p>
                <span className="font-medium">Địa điểm:</span> {ceremony?.venue || "Đang cập nhật"}
              </p>
              <p>{ceremony?.address || "Đang cập nhật địa chỉ"}</p>
              <p>
                <span className="font-medium">Giờ lễ:</span> {ceremony?.ceremonyTime || "—"}
                {ceremony?.receptionTime ? ` · Giờ tiệc: ${ceremony.receptionTime}` : ""}
              </p>
              {wedding.quote ? <p className="pt-2 italic text-[#7b6152]">“{wedding.quote}”</p> : null}
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => setOpened((v) => !v)}
            className="mt-7 rounded-full px-7 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(140,47,47,.35)]"
            style={{ backgroundColor: palette.primary }}
          >
            {opened ? "Đóng thiệp" : "Mở thiệp"}
          </button>
        </section>
      </main>
    </div>
  );
}
