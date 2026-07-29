"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import type { WeddingTemplateProps } from "@/lib/template-registry";

type WishItem = {
  id: string;
  name: string;
  message: string;
  attendance: string | null;
  createdAt: string;
};

function imgUnoptimized(src: string) {
  return (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.includes("localhost")
  );
}

function toDateOrNull(dateRaw?: string) {
  if (!dateRaw) return null;
  const d = new Date(dateRaw);
  return Number.isNaN(d.getTime()) ? null : d;
}

function formatCountdown(target: Date | null) {
  if (!target) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, done: false };
}

function pickMainDate(wedding: WeddingTemplateProps["wedding"]) {
  return toDateOrNull(wedding.groomCeremony?.date) || toDateOrNull(wedding.brideCeremony?.date);
}

export default function VintageRoseTemplate({
  wedding,
  guestName,
  guestSalutation,
}: WeddingTemplateProps) {
  const primary = wedding.primaryColor || "#5e3a2f";
  const accent = wedding.accentColor || "#b9856f";
  const bg = wedding.backgroundColor || "#f7efe5";

  const hero = wedding.gallery?.[0]?.trim() || "";
  const gallery = (wedding.gallery || []).map((u) => u?.trim()).filter(Boolean);

  const weddingDate = useMemo(() => pickMainDate(wedding), [wedding]);
  const [countdown, setCountdown] = useState(() => formatCountdown(weddingDate));

  const [rsvpName, setRsvpName] = useState(guestName || "");
  const [rsvpAttendance, setRsvpAttendance] = useState<"accept" | "decline">("accept");
  const [rsvpGuests, setRsvpGuests] = useState(1);
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [rsvpMessage, setRsvpMessage] = useState("");

  const [wishName, setWishName] = useState(guestName || "");
  const [wishText, setWishText] = useState("");
  const [wishLoading, setWishLoading] = useState(false);
  const [wishMessage, setWishMessage] = useState("");
  const [wishes, setWishes] = useState<WishItem[]>([]);

  useEffect(() => {
    const t = setInterval(() => setCountdown(formatCountdown(weddingDate)), 1000);
    return () => clearInterval(t);
  }, [weddingDate]);

  useEffect(() => {
    let cancelled = false;

    async function fetchWishes() {
      try {
        const res = await fetch(`/api/wishes?weddingId=${encodeURIComponent(wedding.id)}`);
        if (!res.ok) return;
        const data = (await res.json()) as { wishes?: WishItem[] };
        if (!cancelled) setWishes(Array.isArray(data.wishes) ? data.wishes.slice(0, 8) : []);
      } catch {
        // ignore
      }
    }

    fetchWishes();
    return () => {
      cancelled = true;
    };
  }, [wedding.id]);

  async function handleRsvpSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!rsvpName.trim()) {
      setRsvpMessage("Vui lòng nhập tên để xác nhận tham gia.");
      return;
    }

    setRsvpLoading(true);
    setRsvpMessage("");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weddingId: wedding.id,
          guestName: rsvpName.trim(),
          attendance: rsvpAttendance,
          numberOfGuests: Math.max(1, Number(rsvpGuests) || 1),
        }),
      });

      const data = (await res.json()) as { message?: string; error?: string };
      if (res.ok) {
        setRsvpMessage(data.message || "Đã ghi nhận xác nhận tham gia. Cảm ơn bạn!");
      } else {
        setRsvpMessage(data.error || "Không thể gửi xác nhận. Vui lòng thử lại.");
      }
    } catch {
      setRsvpMessage("Không thể gửi xác nhận. Vui lòng thử lại.");
    } finally {
      setRsvpLoading(false);
    }
  }

  async function handleWishSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!wishName.trim() || !wishText.trim()) {
      setWishMessage("Vui lòng nhập tên và lời chúc.");
      return;
    }

    setWishLoading(true);
    setWishMessage("");
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weddingId: wedding.id,
          name: wishName.trim(),
          message: wishText.trim(),
          attendance: null,
        }),
      });

      const data = (await res.json()) as { wish?: WishItem; error?: string };
      if (res.ok && data.wish) {
        setWishes((prev) => [data.wish as WishItem, ...prev].slice(0, 8));
        setWishText("");
        setWishMessage("Đã gửi lời chúc thành công. Cảm ơn bạn!");
      } else {
        setWishMessage(data.error || "Không thể gửi lời chúc. Vui lòng thử lại.");
      }
    } catch {
      setWishMessage("Không thể gửi lời chúc. Vui lòng thử lại.");
    } finally {
      setWishLoading(false);
    }
  }

  const hasMap = Boolean(wedding.groomCeremony?.googleMapsUrl || wedding.brideCeremony?.googleMapsUrl);

  return (
    <div
      className="min-h-screen text-[#4a2f27] antialiased"
      style={{
        backgroundColor: bg,
        backgroundImage:
          "radial-gradient(circle at 12% 8%, #fffaf5 0%, transparent 26%), radial-gradient(circle at 88% 10%, #eddccd 0%, transparent 24%), linear-gradient(180deg, #f9f1e8 0%, #f4e7db 40%, #f8f2ea 100%)",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
        {/* Banner */}
        <section className="relative overflow-hidden rounded-[2rem] border border-[#ddc2ae] bg-[#fff8f1] shadow-[0_20px_60px_rgba(84,56,45,0.18)]">
          <div className="grid gap-0 md:grid-cols-2">
            <div className="relative min-h-[300px] md:min-h-[520px]">
              {hero ? (
                <Image
                  src={hero}
                  alt="Ảnh banner thiệp cưới"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized={imgUnoptimized(hero)}
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-[#e9d5c3] text-sm text-[#7f5e4f]">
                  Hãy thêm ảnh bìa để phần banner nổi bật hơn
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#3b261f]/55 via-transparent to-transparent" />
            </div>

            <div className="relative p-7 md:p-12">
              <div className="pointer-events-none absolute right-6 top-6 h-24 w-24 rounded-full border border-[#cfad96]/70" />
              <p
                className="text-xs uppercase tracking-[0.42em]"
                style={{ color: accent }}
              >
                The Wedding Day
              </p>
              <h1
                className="mt-5 text-4xl leading-tight md:text-6xl"
                style={{ color: primary, fontFamily: '"Playfair Display", serif' }}
              >
                {wedding.groomName}
                <span className="mx-3 text-2xl md:text-4xl" style={{ color: accent }}>
                  &
                </span>
                {wedding.brideName}
              </h1>
              {(guestName || guestSalutation) && (
                <p className="mt-4 text-sm text-[#7a5d4e] md:text-base">
                  Trân trọng kính mời {guestSalutation ? `${guestSalutation} ` : ""}
                  <span className="font-semibold" style={{ color: primary }}>
                    {guestName}
                  </span>
                </p>
              )}

              <div className="mt-7 rounded-2xl border border-[#e2ccbc] bg-[#fff3e8] p-4 text-sm">
                <p className="font-semibold" style={{ color: primary }}>Ngày cưới</p>
                <p className="mt-1">{wedding.groomCeremony?.date || wedding.brideCeremony?.date || "Đang cập nhật"}</p>
                <p className="mt-2 text-[#7a5d4e]">
                  {wedding.groomCeremony?.venue || wedding.brideCeremony?.venue || "Địa điểm sẽ cập nhật sớm"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Countdown */}
        <section className="mt-8 rounded-[1.7rem] border border-[#dcc0ab] bg-[#fff6ee] p-6 md:p-8">
          <h2
            className="text-center text-2xl md:text-3xl"
            style={{ color: primary, fontFamily: '"Playfair Display", serif' }}
          >
            Countdown tới ngày cưới
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Ngày", value: countdown.days },
              { label: "Giờ", value: countdown.hours },
              { label: "Phút", value: countdown.minutes },
              { label: "Giây", value: countdown.seconds },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-[#e4ccbc] bg-white/70 p-4 text-center">
                <p className="text-3xl font-semibold md:text-4xl" style={{ color: primary }}>
                  {String(item.value).padStart(2, "0")}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.22em] text-[#8a6859]">{item.label}</p>
              </div>
            ))}
          </div>
          {countdown.done && <p className="mt-4 text-center text-sm text-[#8a6859]">Ngày vui đã đến rồi. Hẹn gặp bạn tại lễ cưới.</p>}
        </section>

        {/* Couple info */}
        <section className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-[1.4rem] border border-[#dec7b5] bg-[#fff8f2] p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-[#9a7868]">Nhà trai</p>
            <h3 className="mt-2 text-2xl font-semibold" style={{ color: primary }}>{wedding.groomName}</h3>
            <p className="mt-3 text-sm text-[#6f5548]">Thân phụ: {wedding.groomParents?.father || "Đang cập nhật"}</p>
            <p className="text-sm text-[#6f5548]">Thân mẫu: {wedding.groomParents?.mother || "Đang cập nhật"}</p>
            <div className="mt-4 border-t border-[#edd9cc] pt-4 text-sm">
              <p><span className="font-medium">Lễ:</span> {wedding.groomCeremony?.ceremonyTime || "--:--"}</p>
              <p><span className="font-medium">Tiệc:</span> {wedding.groomCeremony?.receptionTime || "--:--"}</p>
              <p className="mt-1">{wedding.groomCeremony?.venue || "Đang cập nhật"}</p>
              <p className="text-[#7c6051]">{wedding.groomCeremony?.address || ""}</p>
            </div>
          </div>

          <div className="rounded-[1.4rem] border border-[#dec7b5] bg-[#fff8f2] p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-[#9a7868]">Nhà gái</p>
            <h3 className="mt-2 text-2xl font-semibold" style={{ color: primary }}>{wedding.brideName}</h3>
            <p className="mt-3 text-sm text-[#6f5548]">Thân phụ: {wedding.brideParents?.father || "Đang cập nhật"}</p>
            <p className="text-sm text-[#6f5548]">Thân mẫu: {wedding.brideParents?.mother || "Đang cập nhật"}</p>
            <div className="mt-4 border-t border-[#edd9cc] pt-4 text-sm">
              <p><span className="font-medium">Lễ:</span> {wedding.brideCeremony?.ceremonyTime || "--:--"}</p>
              <p><span className="font-medium">Tiệc:</span> {wedding.brideCeremony?.receptionTime || "--:--"}</p>
              <p className="mt-1">{wedding.brideCeremony?.venue || "Đang cập nhật"}</p>
              <p className="text-[#7c6051]">{wedding.brideCeremony?.address || ""}</p>
            </div>
          </div>
        </section>

        {/* Quote */}
        {wedding.quote && (
          <section className="mt-8 rounded-[1.5rem] border border-[#dfc6b4] bg-[#fffaf5] px-6 py-8 text-center">
            <p className="text-xl italic leading-relaxed md:text-2xl" style={{ color: primary, fontFamily: '"Cormorant Garamond", serif' }}>
              “{wedding.quote}”
            </p>
          </section>
        )}

        {/* Gallery */}
        <section className="mt-8">
          <h2 className="mb-4 text-center text-2xl md:text-3xl" style={{ color: primary, fontFamily: '"Playfair Display", serif' }}>
            Gallery kỷ niệm
          </h2>
          {gallery.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {gallery.slice(0, 8).map((url, i) => (
                <div key={`${url}-${i}`} className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-[#e1c7b5] bg-[#f1dfd0] shadow-sm">
                  <Image
                    src={url}
                    alt={`Ảnh cưới ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    unoptimized={imgUnoptimized(url)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#d9bda8] bg-[#fff7ee] p-8 text-center text-sm text-[#836353]">
              Chưa có ảnh gallery. Bạn có thể upload thêm ảnh trong trang chỉnh sửa.
            </div>
          )}
        </section>

        {/* Map + RSVP */}
        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="rounded-[1.4rem] border border-[#ddc5b3] bg-[#fff8f2] p-6">
            <h2 className="text-2xl" style={{ color: primary, fontFamily: '"Playfair Display", serif' }}>Map địa chỉ</h2>
            <p className="mt-2 text-sm text-[#7a5f51]">Chạm vào nút để mở Google Maps chỉ đường nhanh.</p>

            <div className="mt-4 space-y-4 text-sm">
              <div className="rounded-xl border border-[#ecd7c8] bg-white/70 p-4">
                <p className="font-semibold">Nhà trai</p>
                <p className="mt-1 text-[#7a5f51]">{wedding.groomCeremony?.address || "Đang cập nhật"}</p>
                {wedding.groomCeremony?.googleMapsUrl && (
                  <a href={wedding.groomCeremony.googleMapsUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block rounded-lg bg-[#8b5e4a] px-4 py-2 text-white hover:bg-[#754c3c]">
                    Mở bản đồ nhà trai
                  </a>
                )}
              </div>

              <div className="rounded-xl border border-[#ecd7c8] bg-white/70 p-4">
                <p className="font-semibold">Nhà gái</p>
                <p className="mt-1 text-[#7a5f51]">{wedding.brideCeremony?.address || "Đang cập nhật"}</p>
                {wedding.brideCeremony?.googleMapsUrl && (
                  <a href={wedding.brideCeremony.googleMapsUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block rounded-lg bg-[#8b5e4a] px-4 py-2 text-white hover:bg-[#754c3c]">
                    Mở bản đồ nhà gái
                  </a>
                )}
              </div>
            </div>

            {!hasMap && <p className="mt-4 text-sm text-[#8e6f61]">Chưa có link bản đồ. Hãy bổ sung trong trang chỉnh sửa thiệp.</p>}
          </div>

          <div className="rounded-[1.4rem] border border-[#ddc5b3] bg-[#fff8f2] p-6">
            <h2 className="text-2xl" style={{ color: primary, fontFamily: '"Playfair Display", serif' }}>Xác nhận tham gia (RSVP)</h2>
            <form className="mt-4 space-y-3" onSubmit={handleRsvpSubmit}>
              <input
                value={rsvpName}
                onChange={(e) => setRsvpName(e.target.value)}
                placeholder="Tên của bạn"
                className="h-11 w-full rounded-lg border border-[#dcc3b0] bg-white px-3 text-sm outline-none focus:border-[#b9856f]"
              />
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={rsvpAttendance}
                  onChange={(e) => setRsvpAttendance(e.target.value as "accept" | "decline")}
                  className="h-11 rounded-lg border border-[#dcc3b0] bg-white px-3 text-sm outline-none focus:border-[#b9856f]"
                >
                  <option value="accept">Tham dự</option>
                  <option value="decline">Xin phép vắng mặt</option>
                </select>
                <input
                  type="number"
                  min={1}
                  value={rsvpGuests}
                  onChange={(e) => setRsvpGuests(Math.max(1, Number(e.target.value) || 1))}
                  className="h-11 rounded-lg border border-[#dcc3b0] bg-white px-3 text-sm outline-none focus:border-[#b9856f]"
                  placeholder="Số người"
                />
              </div>

              <button
                type="submit"
                disabled={rsvpLoading}
                className="h-11 w-full rounded-lg bg-[#8b5e4a] text-sm font-medium text-white transition hover:bg-[#754c3c] disabled:opacity-60"
              >
                {rsvpLoading ? "Đang gửi..." : "Gửi xác nhận"}
              </button>

              {rsvpMessage && <p className="text-sm text-[#7b5d4f]">{rsvpMessage}</p>}
            </form>
          </div>
        </section>

        {/* Wishes */}
        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="rounded-[1.4rem] border border-[#dcc4b2] bg-[#fff8f2] p-6">
            <h2 className="text-2xl" style={{ color: primary, fontFamily: '"Playfair Display", serif' }}>Gửi lời chúc</h2>
            <form className="mt-4 space-y-3" onSubmit={handleWishSubmit}>
              <input
                value={wishName}
                onChange={(e) => setWishName(e.target.value)}
                placeholder="Tên của bạn"
                className="h-11 w-full rounded-lg border border-[#dcc3b0] bg-white px-3 text-sm outline-none focus:border-[#b9856f]"
              />
              <textarea
                value={wishText}
                onChange={(e) => setWishText(e.target.value)}
                placeholder="Viết lời chúc cho cô dâu chú rể..."
                rows={4}
                className="w-full rounded-lg border border-[#dcc3b0] bg-white px-3 py-2 text-sm outline-none focus:border-[#b9856f]"
              />
              <button
                type="submit"
                disabled={wishLoading}
                className="h-11 w-full rounded-lg bg-[#8b5e4a] text-sm font-medium text-white transition hover:bg-[#754c3c] disabled:opacity-60"
              >
                {wishLoading ? "Đang gửi..." : "Gửi lời chúc"}
              </button>
              {wishMessage && <p className="text-sm text-[#7b5d4f]">{wishMessage}</p>}
            </form>
          </div>

          <div className="rounded-[1.4rem] border border-[#dcc4b2] bg-[#fff8f2] p-6">
            <h2 className="text-2xl" style={{ color: primary, fontFamily: '"Playfair Display", serif' }}>Lời chúc gần đây</h2>
            {wishes.length > 0 ? (
              <div className="mt-4 space-y-3">
                {wishes.map((w) => (
                  <div key={w.id} className="rounded-xl border border-[#ead5c6] bg-white/70 p-4">
                    <p className="text-sm font-semibold" style={{ color: primary }}>{w.name}</p>
                    <p className="mt-1 text-sm text-[#6f5448]">{w.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-[#856657]">Chưa có lời chúc nào. Hãy là người đầu tiên gửi lời chúc nhé.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
