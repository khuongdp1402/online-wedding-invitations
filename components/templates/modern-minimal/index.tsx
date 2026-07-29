"use client";

import Image from "next/image";
import type { WeddingTemplateProps } from "@/lib/template-registry";

/** Tránh cấu hình remotePatterns cho mọi host S3/MinIO trong dev. */
function imgUnoptimized(src: string) {
  return (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.includes("localhost")
  );
}

function pickCeremony(
  wedding: WeddingTemplateProps["wedding"],
  mode: "bride" | "groom"
) {
  return mode === "bride" ? wedding.brideCeremony : wedding.groomCeremony;
}

export default function ModernMinimalTemplate({
  wedding,
  mode,
  isDemo: _isDemo,
  guestName,
  guestSalutation,
}: WeddingTemplateProps) {
  const ceremony = pickCeremony(wedding, mode || "groom");
  const primary = wedding.primaryColor || "#1a1a1a";
  const accent = wedding.accentColor || "#737373";
  const bg = wedding.backgroundColor || "#ffffff";
  const hero = wedding.gallery?.[0]?.trim();

  return (
    <div
      className="min-h-screen text-neutral-900 antialiased"
      style={{ backgroundColor: bg, color: primary }}
    >
      <section className="relative px-6 pt-16 pb-12 text-center">
        {hero ? (
          <div className="relative mx-auto mb-10 h-56 w-full max-w-lg overflow-hidden rounded-2xl shadow-sm md:h-72">
            <Image
              src={hero}
              alt="Ảnh bìa thiệp"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 512px"
              unoptimized={imgUnoptimized(hero)}
            />
          </div>
        ) : null}
        <p
          className="mb-3 text-xs uppercase tracking-[0.35em]"
          style={{ color: accent }}
        >
          Wedding
        </p>
        <h1 className="text-4xl font-light md:text-5xl">{wedding.groomName}</h1>
        <p className="my-4 text-xl font-light" style={{ color: accent }}>
          &
        </p>
        <h1 className="text-4xl font-light md:text-5xl">{wedding.brideName}</h1>
        {(guestName || guestSalutation) && (
          <p className="mt-8 text-sm" style={{ color: accent }}>
            {guestSalutation ? `${guestSalutation} ` : ""}
            {guestName}
          </p>
        )}
      </section>

      <section className="mx-auto max-w-lg px-6 py-10 text-center">
        <p className="text-sm leading-relaxed" style={{ color: accent }}>
          {ceremony?.date || "—"}
        </p>
        {ceremony?.venue ? (
          <p className="mt-2 font-medium">{ceremony.venue}</p>
        ) : null}
        {ceremony?.address ? (
          <p className="mt-1 text-sm" style={{ color: accent }}>
            {ceremony.address}
          </p>
        ) : null}
        {ceremony?.ceremonyTime ? (
          <p className="mt-3 text-sm">
            Lễ: {ceremony.ceremonyTime}
            {ceremony.receptionTime ? ` · Tiệc: ${ceremony.receptionTime}` : ""}
          </p>
        ) : null}
      </section>

      {wedding.quote ? (
        <section className="mx-auto max-w-md px-6 py-8 text-center">
          <p className="text-lg font-light italic leading-relaxed">
            &ldquo;{wedding.quote}&rdquo;
          </p>
        </section>
      ) : null}

      {wedding.gallery && wedding.gallery.length > 1 ? (
        <section className="mx-auto grid max-w-3xl grid-cols-2 gap-3 px-4 pb-16 md:grid-cols-3">
          {wedding.gallery.slice(1, 7).map((url, i) => {
            const u = url?.trim();
            if (!u) return null;
            return (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100"
              >
                <Image
                  src={u}
                  alt="Ảnh kỷ niệm"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 200px"
                  unoptimized={imgUnoptimized(u)}
                />
              </div>
            );
          })}
        </section>
      ) : null}

      <footer className="border-t border-neutral-200 py-10 text-center text-xs text-neutral-500">
        Cảm ơn bạn đã đến chung vui cùng chúng tôi.
      </footer>
    </div>
  );
}
