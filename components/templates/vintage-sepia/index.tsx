"use client";

import Image from "next/image";
import type { WeddingTemplateProps } from "@/lib/template-registry";

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

export default function VintageSepiaTemplate({
  wedding,
  mode,
  guestName,
  guestSalutation,
}: WeddingTemplateProps) {
  const ceremony = pickCeremony(wedding, mode || "groom");
  const primary = wedding.primaryColor || "#5d4037";
  const accent = wedding.accentColor || "#b08a5b";
  const bg = wedding.backgroundColor || "#f6efe3";

  const cover = wedding.gallery?.[0]?.trim();
  const gallery = (wedding.gallery || []).slice(1, 7).filter((x) => x?.trim());

  return (
    <div
      className="min-h-screen text-[#4b372c] antialiased"
      style={{ backgroundColor: bg, color: primary, fontFamily: wedding.fontFamily || "Georgia, 'Times New Roman', serif" }}
    >
      <section className="relative overflow-hidden border-b border-[#d7c2a5] px-6 py-16 text-center">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, #ffffff 0%, transparent 40%), radial-gradient(circle at 80% 80%, #e9dac3 0%, transparent 42%)",
          }}
        />

        {cover ? (
          <div className="relative mx-auto mb-8 h-56 w-full max-w-xl overflow-hidden rounded-sm border-4 border-[#eadbc7] shadow-[0_12px_35px_rgba(93,64,55,0.2)] md:h-72">
            <Image
              src={cover}
              alt="Ảnh bìa"
              fill
              className="object-cover sepia-[.4] contrast-95"
              sizes="(max-width: 768px) 100vw, 576px"
              unoptimized={imgUnoptimized(cover)}
            />
          </div>
        ) : null}

        <p className="mb-2 text-xs uppercase tracking-[0.35em]" style={{ color: accent }}>
          Vintage Wedding Invitation
        </p>
        <h1 className="text-4xl md:text-5xl">{wedding.groomName}</h1>
        <p className="my-3 text-2xl italic" style={{ color: accent }}>
          &
        </p>
        <h1 className="text-4xl md:text-5xl">{wedding.brideName}</h1>

        {(guestName || guestSalutation) && (
          <p className="mt-8 text-sm" style={{ color: accent }}>
            Trân trọng kính mời {guestSalutation ? `${guestSalutation} ` : ""}
            {guestName}
          </p>
        )}
      </section>

      <section className="mx-auto max-w-3xl px-6 py-10">
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-md border border-[#d7c2a5] bg-[#fffaf2]/60 p-5">
            <h2 className="text-lg font-semibold" style={{ color: accent }}>
              Thời gian
            </h2>
            <p className="mt-3 text-sm leading-7">{ceremony?.date || "Chưa cập nhật ngày"}</p>
            {ceremony?.lunarDate ? <p className="text-sm leading-7">{ceremony.lunarDate}</p> : null}
            {ceremony?.ceremonyTime ? <p className="text-sm leading-7">Lễ: {ceremony.ceremonyTime}</p> : null}
            {ceremony?.receptionTime ? <p className="text-sm leading-7">Tiệc: {ceremony.receptionTime}</p> : null}
          </article>

          <article className="rounded-md border border-[#d7c2a5] bg-[#fffaf2]/60 p-5">
            <h2 className="text-lg font-semibold" style={{ color: accent }}>
              Địa điểm
            </h2>
            <p className="mt-3 text-sm leading-7">{ceremony?.venue || "Chưa cập nhật địa điểm"}</p>
            {ceremony?.address ? <p className="text-sm leading-7">{ceremony.address}</p> : null}
            {ceremony?.googleMapsUrl ? (
              <a
                href={ceremony.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-sm underline underline-offset-2"
                style={{ color: accent }}
              >
                Xem bản đồ
              </a>
            ) : null}
          </article>
        </div>
      </section>

      {wedding.quote ? (
        <section className="mx-auto max-w-2xl px-6 pb-10 text-center">
          <p className="text-xl italic leading-relaxed">“{wedding.quote}”</p>
        </section>
      ) : null}

      {gallery.length > 0 ? (
        <section className="mx-auto grid max-w-4xl grid-cols-2 gap-3 px-4 pb-14 md:grid-cols-3">
          {gallery.map((url, idx) => (
            <div
              key={`${url}-${idx}`}
              className="relative aspect-square overflow-hidden rounded-sm border border-[#d7c2a5] bg-[#f3e7d6]"
            >
              <Image
                src={url}
                alt="Ảnh cưới"
                fill
                className="object-cover sepia-[.35]"
                sizes="(max-width: 768px) 50vw, 220px"
                unoptimized={imgUnoptimized(url)}
              />
            </div>
          ))}
        </section>
      ) : null}

      <footer className="border-t border-[#d7c2a5] px-6 py-8 text-center text-xs" style={{ color: accent }}>
        Cảm ơn bạn đã dành thời gian chung vui cùng gia đình chúng tôi.
      </footer>
    </div>
  );
}
