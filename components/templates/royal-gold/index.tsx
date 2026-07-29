"use client";

import { useEffect, useMemo, useState } from "react";
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

function toTargetDate(raw?: string) {
  if (!raw) return null;
  const parsed = Date.parse(raw);
  if (!Number.isNaN(parsed)) return new Date(parsed);

  const m = raw.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (!m) return null;
  const dd = Number(m[1]);
  const mm = Number(m[2]) - 1;
  const yyyy = Number(m[3]);
  return new Date(yyyy, mm, dd, 0, 0, 0);
}

export default function RoyalGoldTemplate({
  wedding,
  mode,
  guestName,
  guestSalutation,
}: WeddingTemplateProps) {
  const ceremony = pickCeremony(wedding, mode || "groom");
  const accent = wedding.accentColor || "#4f7c5f";
  const bg = wedding.backgroundColor || "#0e2b20";

  const hero = wedding.gallery?.[0]?.trim();
  const gallery = (wedding.gallery || []).map((x) => x?.trim()).filter(Boolean);

  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const countdown = useMemo(() => {
    const target = toTargetDate(ceremony?.date);
    if (!target) return null;
    const diff = target.getTime() - now;
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds };
  }, [ceremony?.date, now]);

  async function submitRsvp(formData: FormData) {
    const guest = String(formData.get("name") || "").trim();
    const attendance = String(formData.get("attendance") || "accept");
    const numberOfGuests = Number(formData.get("numberOfGuests") || 1);

    if (!guest) return;

    await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        weddingId: wedding.id,
        guestName: guest,
        attendance,
        numberOfGuests,
      }),
    });
  }

  return (
    <div className="min-h-screen text-emerald-50" style={{ backgroundColor: bg }}>
      <section className="relative overflow-hidden border-b border-emerald-300/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(110,168,126,0.35),transparent_35%),radial-gradient(circle_at_85%_5%,rgba(189,221,197,0.20),transparent_30%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
          <p className="text-center text-xs tracking-[0.45em] uppercase text-emerald-200/90">
            Emerald Garden Invitation
          </p>
          <h1
            className="mt-5 text-center text-5xl font-semibold md:text-7xl"
            style={{ color: "#e9fff0", fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {wedding.groomName} <span className="text-emerald-200">&</span> {wedding.brideName}
          </h1>
          {(guestName || guestSalutation) && (
            <p className="mt-5 text-center text-base text-emerald-100/95">
              Trân trọng kính mời {guestSalutation ? `${guestSalutation} ` : ""}
              <span className="font-semibold text-emerald-200">{guestName}</span>
            </p>
          )}

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative h-72 overflow-hidden rounded-2xl border border-emerald-200/30 bg-emerald-950/30 md:h-[420px]">
              {hero ? (
                <Image
                  src={hero}
                  alt="Emerald hero"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  unoptimized={imgUnoptimized(hero)}
                />
              ) : (
                <div className="flex h-full items-center justify-center text-emerald-100/70">
                  Thêm ảnh bìa để hiển thị phong cách Emerald Garden
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-emerald-200/30 bg-black/25 p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-emerald-100">Thông tin buổi lễ</h2>
              <div className="mt-4 space-y-3 text-sm text-emerald-50/95">
                <p><span className="text-emerald-200">Ngày:</span> {ceremony?.date || "—"}</p>
                <p><span className="text-emerald-200">Giờ lễ:</span> {ceremony?.ceremonyTime || "—"}</p>
                <p><span className="text-emerald-200">Giờ tiệc:</span> {ceremony?.receptionTime || "—"}</p>
                <p><span className="text-emerald-200">Địa điểm:</span> {ceremony?.venue || "—"}</p>
                <p>{ceremony?.address || "Đang cập nhật địa chỉ"}</p>
              </div>
              {ceremony?.googleMapsUrl ? (
                <a
                  href={ceremony.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex rounded-md border px-4 py-2 text-sm font-medium text-emerald-100 hover:bg-emerald-500/15"
                  style={{ borderColor: `${accent}99` }}
                >
                  Mở Google Maps
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {countdown ? (
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="rounded-2xl border border-emerald-200/25 bg-black/25 p-6">
            <h3 className="text-center text-xl font-semibold text-emerald-100">Đếm ngược ngày cưới</h3>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["Ngày", countdown.days],
                ["Giờ", countdown.hours],
                ["Phút", countdown.minutes],
                ["Giây", countdown.seconds],
              ].map(([label, value]) => (
                <div key={String(label)} className="rounded-xl border border-emerald-200/30 bg-emerald-950/30 p-4 text-center">
                  <p className="text-3xl font-bold text-emerald-100">{value}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-emerald-200/80">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-6 pb-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200/30 bg-black/25 p-6">
            <h3 className="text-lg font-semibold text-emerald-100">Nhà trai</h3>
            <p className="mt-3 text-sm text-emerald-50/90">Chú rể: {wedding.groomName}</p>
            <p className="text-sm text-emerald-50/90">Thân phụ: {wedding.groomParents?.father || "—"}</p>
            <p className="text-sm text-emerald-50/90">Thân mẫu: {wedding.groomParents?.mother || "—"}</p>
          </div>
          <div className="rounded-2xl border border-emerald-200/30 bg-black/25 p-6">
            <h3 className="text-lg font-semibold text-emerald-100">Nhà gái</h3>
            <p className="mt-3 text-sm text-emerald-50/90">Cô dâu: {wedding.brideName}</p>
            <p className="text-sm text-emerald-50/90">Thân phụ: {wedding.brideParents?.father || "—"}</p>
            <p className="text-sm text-emerald-50/90">Thân mẫu: {wedding.brideParents?.mother || "—"}</p>
          </div>
        </div>
      </section>

      {wedding.quote ? (
        <section className="mx-auto max-w-4xl px-6 py-6 text-center">
          <p className="text-xl italic text-emerald-100/95">“{wedding.quote}”</p>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-6 py-10">
        <h3 className="mb-4 text-center text-xl font-semibold text-emerald-100">Emerald Gallery</h3>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {gallery.slice(1, 9).map((u, i) => (
            <div key={i} className="relative aspect-[3/4] overflow-hidden rounded-xl border border-emerald-200/30 bg-emerald-950/30">
              <Image
                src={u}
                alt="Ảnh cưới"
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
                unoptimized={imgUnoptimized(u)}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-14 md:grid-cols-2">
        <form
          action={async (fd) => {
            await submitRsvp(fd);
          }}
          className="rounded-2xl border border-emerald-200/30 bg-black/25 p-6"
        >
          <h3 className="text-lg font-semibold text-emerald-100">Xác nhận tham dự</h3>
          <div className="mt-4 space-y-3 text-sm">
            <input name="name" placeholder="Tên của bạn" className="w-full rounded-md border border-emerald-200/40 bg-transparent px-3 py-2 text-emerald-50 placeholder:text-emerald-200/60" />
            <select name="attendance" className="w-full rounded-md border border-emerald-200/40 bg-[#123325] px-3 py-2 text-emerald-50">
              <option value="accept">Tham dự</option>
              <option value="decline">Xin phép vắng mặt</option>
            </select>
            <input name="numberOfGuests" type="number" min={1} defaultValue={1} className="w-full rounded-md border border-emerald-200/40 bg-transparent px-3 py-2 text-emerald-50" />
            <button 
              type="submit" 
              className="w-full rounded-md px-4 py-2 font-medium text-[#123325] hover:opacity-90"
              style={{ backgroundColor: accent }}
            >
              Gửi RSVP
            </button>
          </div>
        </form>

        <form
          action={async (fd) => {
            const name = String(fd.get("name") || "").trim();
            const message = String(fd.get("message") || "").trim();
            if (!name || !message) return;
            await fetch("/api/wishes", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                weddingId: wedding.id,
                name,
                message,
                attendance: null,
              }),
            });
          }}
          className="rounded-2xl border border-emerald-200/30 bg-black/25 p-6"
        >
          <h3 className="text-lg font-semibold text-emerald-100">Gửi lời chúc</h3>
          <div className="mt-4 space-y-3 text-sm">
            <input name="name" placeholder="Tên của bạn" className="w-full rounded-md border border-emerald-200/40 bg-transparent px-3 py-2 text-emerald-50 placeholder:text-emerald-200/60" />
            <textarea name="message" rows={4} placeholder="Nhập lời chúc cho cô dâu chú rể..." className="w-full rounded-md border border-emerald-200/40 bg-transparent px-3 py-2 text-emerald-50 placeholder:text-emerald-200/60" />
            <button type="submit" className="w-full rounded-md border border-emerald-200 px-4 py-2 font-medium text-emerald-100 hover:bg-emerald-400/10">
              Gửi lời chúc
            </button>
          </div>
        </form>
      </section>

      <footer className="border-t border-emerald-200/20 py-8 text-center text-sm text-emerald-100/85">
        Emerald Garden · Cảm ơn bạn đã chung vui cùng chúng tôi.
      </footer>
    </div>
  );
}
