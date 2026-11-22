"use client";

import React, { useState, useEffect, useRef, useCallback, useId } from "react";
import { type WeddingTemplateProps } from "@/lib/template-registry";
import { buildVietQrUrl } from "@/lib/vietqr";
import { X, Copy, Check, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

const THEME = {
  bg: "rgb(255, 247, 235)",
  primary: "rgb(128, 0, 0)",
  primaryHex: "#800000",
  secondary: "#fbbf24",
  cream: "rgb(255, 238, 210)",
  textMuted: "rgb(102, 102, 102)",
  textDark: "rgb(70, 70, 70)",
  modalBg: "rgb(236, 223, 214)",
};

const ASSETS = {
  sunburst: "/images/themes/song-hy-red/sunburst.svg",
  chuHy: "/images/themes/song-hy-red/chu-hy.webp",
  star: "/images/themes/song-hy-red/star.webp",
  sealMask: "/images/themes/songlong-red/chinese_happiness.webp",
  defaultHero: "/images/themes/song-hy-red/couple.webp",
  defaultGallery: [
    "/images/themes/song-hy-red/gallery_1.webp",
    "/images/themes/song-hy-red/gallery_2.webp",
    "/images/themes/song-hy-red/gallery_3.webp",
    "/images/themes/song-hy-red/gallery_4.webp",
    "/images/themes/song-hy-red/gallery_5.webp",
    "/images/themes/song-hy-red/gallery_6.webp",
    "/images/themes/song-hy-red/gallery_7.webp",
  ],
  giftEnvelope: "/images/envelope/song_hy_red.webp",
  giftBox: "/images/giftbox/song_hy_red.webp",
  defaultMusic: "/music/perfect-ed-sheeran.mp3",
};

const AMBIENT_HY = [
  { left: 36.85, color: "#FFE066", fontSize: 18.48, sway: -0.7, duration: 8.87, delay: 2.17 },
  { left: 41.51, color: "#FFC107", fontSize: 17.56, sway: 8.33, duration: 8.25, delay: 2.49 },
  { left: 91.68, color: "#FFC107", fontSize: 20.86, sway: 20.43, duration: 12.72, delay: 0.89 },
  { left: 41.88, color: "#FF6B6B", fontSize: 14.56, sway: 26.77, duration: 9.27, delay: 2.18 },
  { left: 65.13, color: "#FF6B6B", fontSize: 14.01, sway: 6.9, duration: 12.2, delay: 1.36 },
  { left: 57.52, color: "#FF6B6B", fontSize: 19.37, sway: -13.64, duration: 9.94, delay: 0.57 },
  { left: 16.33, color: "#FFD700", fontSize: 14.14, sway: 10.47, duration: 12.4, delay: 1.23 },
  { left: 74.81, color: "#FF6B6B", fontSize: 17.63, sway: -29.65, duration: 10.93, delay: 0.76 },
  { left: 69.29, color: "#FFE066", fontSize: 10.84, sway: -4.67, duration: 9.08, delay: 0.04 },
  { left: 12.75, color: "#FFD700", fontSize: 16.54, sway: 4.92, duration: 9.47, delay: 1.0 },
  { left: 6.94, color: "#FFD700", fontSize: 12.02, sway: 25.61, duration: 10.26, delay: 0.3 },
  { left: 34.3, color: "#FF6B6B", fontSize: 15.61, sway: -11.79, duration: 12.26, delay: 2.39 },
];

const BURST_COLORS = ["#FFE066", "#FFC107", "#FF6B6B", "#FFD700"];

const AI_WISH_SUGGESTIONS = [
  "Chúc hai cháu trăm năm hạnh phúc, sớm sinh quý tử!",
  "Chúc mừng hai bạn về chung một nhà. Mong hai bạn luôn yêu thương nhau như ngày đầu!",
  "Nhìn thiệp mà thấy ấm áp ghê. Chúc đám cưới thật trọn vẹn nhé!",
  "Chúc cô dâu chú rể trăm năm hảo hợp, gia đình luôn đầm ấm.",
];

const DEMO_WISHES = [
  { id: "1", name: "Gia đình cô Lan", time: "10:58 30/07/2026", message: "Chúc hai cháu trăm năm hạnh phúc, sớm sinh quý tử!" },
  { id: "2", name: "Bạn thân của cô dâu", time: "10:58 29/07/2026", message: "Chúc mừng hai bạn về chung một nhà. Mong hai bạn luôn yêu thương nhau như ngày đầu!" },
  { id: "3", name: "Anh Minh", time: "10:58 28/07/2026", message: "Nhìn thiệp mà thấy ấm áp ghê. Chúc đám cưới thật trọn vẹn nhé!" },
  { id: "4", name: "Chị Hương", time: "10:58 27/07/2026", message: "Chúc cô dâu chú rể trăm năm hảo hợp, gia đình luôn đầm ấm." },
];

function playEnvelopeChime() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      const start = now + 0.1 * idx;
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.035 - 0.005 * idx, start + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 1.8);
      osc.start(start);
      osc.stop(start + 1.8);
    });
  } catch {
    // Ignore audio restrictions
  }
}

function parseWeddingDate(dateStr?: string) {
  if (!dateStr) return { day: 14, month: 6, year: 2026, dayOfWeek: "CHỦ NHẬT" };
  const cleaned = dateStr.replace(/^[^0-9]*/, "").trim();
  const parts = cleaned.split(/[\/\-]/);
  let d = 14, m = 6, y = 2026;
  if (parts.length === 3) {
    if (parts[0].length === 4) {
      y = Number(parts[0]) || 2026;
      m = Number(parts[1]) || 6;
      d = Number(parts[2]) || 14;
    } else {
      d = Number(parts[0]) || 14;
      m = Number(parts[1]) || 6;
      y = Number(parts[2]) || 2026;
    }
  }
  const dt = new Date(y, m - 1, d);
  const days = ["CHỦ NHẬT", "THỨ HAI", "THỨ BA", "THỨ TƯ", "THỨ NĂM", "THỨ SÁU", "THỨ BẢY"];
  return {
    day: d,
    month: m,
    year: y,
    dayOfWeek: Number.isNaN(dt.getTime()) ? "CHỦ NHẬT" : days[dt.getDay()],
  };
}

function getShortName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  return parts.length >= 2 ? parts.slice(-2).join(" ") : fullName;
}

function CrimsonBanner({
  children,
  as: Tag = "h2",
  stack = false,
  className = "",
}: {
  children: React.ReactNode;
  as?: "h2" | "h3";
  stack?: boolean;
  className?: string;
}) {
  return (
    <div className="w-full py-3 md:py-4" style={{ backgroundColor: THEME.primary }}>
      <Tag
        className={`text-center text-[20px] font-bold uppercase tracking-wide md:text-[24px] ${
          stack ? "flex flex-col items-center" : ""
        } ${className}`}
        style={{ color: THEME.cream, fontFamily: '"Times New Roman", serif' }}
      >
        {children}
      </Tag>
    </div>
  );
}

function ArchedLoveBanner() {
  const rawId = useId().replace(/:/g, "");
  const size = 286;
  const fontSize = 14;
  const cx = size / 2;
  const r = size / 2 + 0.38 * fontSize;
  const d = `M ${cx - r} ${cx} A ${r} ${r} 0 0 1 ${cx + r} ${cx}`;

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-10 aspect-[2/1] w-full overflow-visible"
      aria-label="LOVE NEVER FAILS"
    >
      <div className="pointer-events-none absolute inset-0 size-full -translate-y-5 md:-translate-y-[15px] lg:-translate-y-[20px]">
        <svg
          className="h-full w-full overflow-visible"
          viewBox="0 0 286 143"
          preserveAspectRatio="xMidYMax meet"
          aria-hidden="true"
        >
          <defs>
            <path id={rawId} d={d} fill="none" />
          </defs>
          <text
            fill="#ffeed2"
            fontSize={fontSize}
            fontFamily='"Cormorant Garamond", "Times New Roman", serif'
            letterSpacing="0.22em"
            dominantBaseline="central"
          >
            <textPath href={`#${rawId}`} startOffset="50%" textAnchor="middle">
              ✦ LOVE NEVER FAILS ✦
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
}

export default function SongHyRedTemplate({
  wedding,
  guestName,
  guestSalutation,
  isDemo,
}: WeddingTemplateProps) {
  const [envelopeState, setEnvelopeState] = useState<"idle" | "opening" | "away" | "closed">("idle");
  const [particles, setParticles] = useState<
    Array<{ id: number; color: string; size: number; dx: number; dy: number; rotStart: number; rotEnd: number; delay: number }>
  >([]);

  // Music player
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [showMusicHint, setShowMusicHint] = useState(true);
  const musicSrc = wedding.backgroundMusic || ASSETS.defaultMusic;

  // Lightbox
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Modals
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // RSVP form
  const [rsvpName, setRsvpName] = useState(guestName || "");
  const [rsvpAttend, setRsvpAttend] = useState<"YES" | "NO">("YES");
  const [rsvpGuests, setRsvpGuests] = useState("1");
  const [rsvpNote, setRsvpNote] = useState("");
  const [rsvpSubmitting, setRsvpSubmitting] = useState(false);
  const [rsvpDone, setRsvpDone] = useState(false);

  // Guestbook
  const [wishes, setWishes] = useState<Array<{ id: string; name: string; time: string; message: string }>>(DEMO_WISHES);
  const [wishName, setWishName] = useState(guestName || "");
  const [wishMessage, setWishMessage] = useState("");
  const [wishSubmitting, setWishSubmitting] = useState(false);
  const [wishSubmitted, setWishSubmitted] = useState(false);

  // Couple & Family data
  const groomFull = wedding.groomName || "Phan Gia Khánh";
  const brideFull = wedding.brideName || "Phạm Quỳnh Anh";
  const groomShort = getShortName(groomFull);
  const brideShort = getShortName(brideFull);

  const groomParents = wedding.groomParents || {
    father: "Phan Văn Hoàng",
    mother: "Lê Thị Mai",
  };
  const brideParents = wedding.brideParents || {
    father: "Phạm Văn Mạnh",
    mother: "Huỳnh Thị Kim Oanh",
  };

  const groomCeremony = wedding.groomCeremony || {
    date: "01/06/2026",
    lunarDate: "(Tức ngày 16 tháng 4 năm Bính Ngọ)",
    ceremonyTime: "09:00",
    receptionTime: "10:30",
    venue: "Tư Gia Nhà Trai",
    address: "Số 85 Nguyễn Thái Sơn, Phường 4, Gò Vấp, TP. Hồ Chí Minh",
  };

  const brideCeremony = wedding.brideCeremony || {
    date: "14/06/2026",
    lunarDate: "(Tức ngày 29 tháng 4 năm Bính Ngọ)",
    ceremonyTime: "10:00",
    receptionTime: "10:30",
    venue: "Sun Palace",
    address: "170 Kinh Dương Vương, Phường 13, Quận 6, TP. Hồ Chí Minh",
    googleMapsUrl: "https://maps.google.com/?q=Sun+Palace+170+Kinh+Duong+Vuong",
  };

  const ceremonyDate = parseWeddingDate(groomCeremony.date);
  const partyDate = parseWeddingDate(brideCeremony.date || groomCeremony.date);

  const heroPhoto = wedding.gallery?.[0] || ASSETS.defaultHero;
  const galleryPhotos =
    wedding.gallery && wedding.gallery.length > 1
      ? wedding.gallery.slice(1)
      : ASSETS.defaultGallery;

  const scheduleItems = [
    { time: "17:30", label: "Đón khách" },
    { time: "18:30", label: "Khai tiệc" },
    { time: "18:45", label: "Rót rượu, cắt bánh" },
    { time: "19:00", label: "Phục vụ món chính" },
    { time: "21:00", label: "Kết thúc tiệc" },
  ];

  const dressCodeColors = ["#800000", "#D4AF37", "#F5E6D3", "#3B2F2F"];

  useEffect(() => {
    if (!wedding.id || wedding.id === "sample-demo-wedding-id" || isDemo) return;
    fetch(`/api/wishes?weddingId=${encodeURIComponent(wedding.id)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setWishes(
            data.map((w: { id: string; guestName: string; message: string; createdAt: string }) => ({
              id: w.id,
              name: w.guestName,
              message: w.message,
              time: new Date(w.createdAt).toLocaleDateString("vi-VN"),
            }))
          );
        }
      })
      .catch(() => {});
  }, [wedding.id, isDemo]);

  // Live countdown
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const [hh = 10, mm = 30] = (brideCeremony.receptionTime || "10:30").split(":").map(Number);
    const target = new Date(partyDate.year, partyDate.month - 1, partyDate.day, hh, mm).getTime();
    const update = () => {
      const diff = Math.max(0, target - Date.now());
      const totalSec = Math.floor(diff / 1000);
      setCountdown({
        days: Math.floor(totalSec / 86400),
        hours: Math.floor((totalSec % 86400) / 3600),
        minutes: Math.floor((totalSec % 3600) / 60),
        seconds: totalSec % 60,
      });
    };
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [partyDate.year, partyDate.month, partyDate.day, brideCeremony.receptionTime]);

  const handleOpenEnvelope = useCallback(() => {
    if (envelopeState !== "idle") return;
    playEnvelopeChime();
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setPlaying(true);
        setShowMusicHint(false);
      }).catch(() => {});
    }
    setEnvelopeState("opening");
    window.setTimeout(() => {
      const burst = Array.from({ length: 28 }, (_, idx) => {
        const angle = (2 * Math.PI * idx) / 28 + (Math.random() - 0.5) * 0.4;
        const dist = 25 + 60 * Math.random();
        return {
          id: idx,
          color: BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)],
          size: 12 + 16 * Math.random(),
          dx: Math.cos(angle) * dist * 5,
          dy: Math.sin(angle) * dist * 5,
          rotStart: (Math.random() - 0.5) * 30,
          rotEnd: (Math.random() - 0.5) * 360,
          delay: 0.15 * Math.random(),
        };
      });
      setParticles(burst);
      setEnvelopeState("away");
    }, 500);
    window.setTimeout(() => {
      setEnvelopeState("closed");
    }, 1300);
  }, [envelopeState]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setPlaying(true);
        setShowMusicHint(false);
      }).catch(() => {});
    }
  };

  const handleWishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishName.trim() || !wishMessage.trim()) return;
    setWishSubmitting(true);
    try {
      if (wedding.id && wedding.id !== "sample-demo-wedding-id" && !isDemo) {
        await fetch("/api/wishes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            weddingId: wedding.id,
            guestName: wishName.trim(),
            message: wishMessage.trim(),
          }),
        });
      }
      setWishes((prev) => [
        {
          id: String(Date.now()),
          name: wishName.trim(),
          message: wishMessage.trim(),
          time: "Vừa xong",
        },
        ...prev,
      ]);
      setWishMessage("");
      setWishSubmitted(true);
      window.setTimeout(() => setWishSubmitted(false), 4000);
    } finally {
      setWishSubmitting(false);
    }
  };

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;
    setRsvpSubmitting(true);
    try {
      if (wedding.id && wedding.id !== "sample-demo-wedding-id" && !isDemo) {
        await fetch("/api/rsvp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            weddingId: wedding.id,
            guestName: rsvpName.trim(),
            status: rsvpAttend === "YES" ? "ATTENDING" : "DECLINED",
            numberOfGuests: Number(rsvpGuests) || 1,
            note: rsvpNote.trim(),
          }),
        });
      }
      setRsvpDone(true);
    } finally {
      setRsvpSubmitting(false);
    }
  };

  // Calendar grid
  const daysInMonth = new Date(partyDate.year, partyDate.month, 0).getDate();
  const firstDayOffset = (new Date(partyDate.year, partyDate.month - 1, 1).getDay() + 6) % 7;
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const mapQuery = encodeURIComponent(`${brideCeremony.venue}, ${brideCeremony.address}`);
  const mapEmbedSrc = `https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  const groomBank = wedding.gifting?.groom?.bankName
    ? wedding.gifting.groom
    : { bankName: "BIDV", accountNumber: "568567989877", accountHolder: groomFull.toUpperCase() };
  const brideBank = wedding.gifting?.bride?.bankName
    ? wedding.gifting.bride
    : { bankName: "BIDV", accountNumber: "8084856145", accountHolder: brideFull.toUpperCase() };

  return (
    <div className="demo-page relative" data-testid="song-hy-red-template">
      {/* 1. ENVELOPE INTRO OVERLAY (1:1 from ss in song-hy-red-template-CuQ4CoIY.js) */}
      {envelopeState !== "closed" && (
        <div
          data-landing-screenshot-id="invite-envelope"
          className={`song-hy-intro-overlay fixed inset-0 z-50 flex items-center justify-center overflow-hidden ${
            envelopeState === "opening" || envelopeState === "away" ? "song-hy-intro-opening" : ""
          }`}
          style={{
            background: "linear-gradient(to bottom right, #5a0000, #400000, #2a0000)",
          }}
        >
          {envelopeState === "idle" && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
              {AMBIENT_HY.map((c, idx) => (
                <div
                  key={idx}
                  className="absolute"
                  style={
                    {
                      left: `${c.left}%`,
                      bottom: -30,
                      color: c.color,
                      fontSize: c.fontSize,
                      "--sway": `${c.sway}px`,
                      animation: `song-hy-ambient-rise ${c.duration}s ease-in-out ${c.delay}s infinite`,
                    } as React.CSSProperties
                  }
                >
                  囍
                </div>
              ))}
            </div>
          )}

          {particles.length > 0 && (
            <div className="pointer-events-none absolute inset-0" style={{ zIndex: 100 }} aria-hidden="true">
              {particles.map((c) => (
                <div
                  key={c.id}
                  className="absolute left-1/2 top-1/2"
                  style={
                    {
                      color: c.color,
                      fontSize: c.size,
                      textShadow: `0 0 10px ${c.color}`,
                      "--dx": `${c.dx}px`,
                      "--dy": `${c.dy}px`,
                      "--rot-start": `${c.rotStart}deg`,
                      "--rot-end": `${c.rotEnd}deg`,
                      animation: `song-hy-particle-burst 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${c.delay}s forwards`,
                    } as React.CSSProperties
                  }
                >
                  囍
                </div>
              ))}
            </div>
          )}

          <div
            className="relative"
            style={{
              zIndex: 10,
              animation: envelopeState === "away" ? "song-hy-envelope-away 0.8s ease-in forwards" : undefined,
            }}
          >
            <div className="relative w-[310px] sm:w-[340px] md:w-[520px] lg:w-[600px]">
              {/* Cream Gold Wax Seal with Double Happiness Mask */}
              <div
                className="absolute left-1/2 flex items-center justify-center rounded-full"
                style={
                  {
                    top: 50,
                    width: 56,
                    height: 56,
                    transform: "translate(-50%, -50%)",
                    background: "radial-gradient(circle at 30% 30%, #ffeed2, rgb(225, 208, 180))",
                    "--shadow-color": "rgba(255, 238, 210, 0.5)",
                    boxShadow: "0 4px 20px rgba(255, 238, 210, 0.5), inset 0 2px 4px rgba(255,255,255,0.3)",
                    zIndex: 30,
                    animation:
                      envelopeState === "idle"
                        ? "song-hy-seal-pulse 2s ease-in-out infinite"
                        : "song-hy-seal-break 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards",
                  } as React.CSSProperties
                }
              >
                <div
                  className="h-8 w-8"
                  style={{
                    backgroundColor: THEME.primary,
                    opacity: 0.9,
                    WebkitMaskImage: `url('${ASSETS.sealMask}')`,
                    WebkitMaskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskImage: `url('${ASSETS.sealMask}')`,
                    maskSize: "contain",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                  }}
                />
              </div>

              {(envelopeState === "opening" || envelopeState === "away") && (
                <div
                  className="pointer-events-none absolute left-1/2 rounded-full"
                  style={{
                    top: 50,
                    width: 56,
                    height: 56,
                    transform: "translate(-50%, -50%)",
                    border: `3px solid ${THEME.cream}`,
                    zIndex: 29,
                    animation: "song-hy-seal-ring 0.6s ease-out forwards",
                  }}
                  aria-hidden="true"
                />
              )}

              <div
                className="relative rounded-lg"
                style={{
                  boxShadow:
                    "0 25px 60px -12px rgba(0, 0, 0, 0.45), 0 8px 24px rgba(0, 0, 0, 0.2), 0 0 40px rgba(255, 238, 210, 0.15)",
                }}
              >
                <div
                  className="absolute inset-0 overflow-hidden rounded-lg"
                  style={{
                    background: THEME.primary,
                    border: "1px solid rgba(255, 238, 210, 0.15)",
                    clipPath: "inset(0 round 8px)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ASSETS.chuHy}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute w-[220px] md:w-[300px] -left-[124px] -top-[65px] md:-left-[130px] md:-top-[104px] rotate-[30deg] opacity-[0.15]"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ASSETS.chuHy}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute w-[220px] md:w-[300px] -bottom-[39px] -right-[156px] md:-bottom-[104px] md:-right-[143px] -rotate-[30deg] opacity-[0.15]"
                  />
                </div>

                <div className="relative z-10 px-6 pb-14 pt-28 text-center md:pb-8 md:pt-24">
                  <h1
                    className="mb-2 flex flex-col items-center text-3xl leading-tight sm:text-4xl"
                    style={{ color: THEME.cream, fontFamily: 'var(--font-wg-display), "Cormorant Garamond", Georgia, serif' }}
                  >
                    <span className="block w-full text-center font-semibold">{groomShort}</span>
                    <span className="block w-full text-center text-lg leading-none sm:text-xl my-1">&amp;</span>
                    <span className="block w-full text-center font-semibold">{brideShort}</span>
                  </h1>

                  <div className="mb-2 flex items-center justify-center gap-3">
                    <div className="h-px w-10" style={{ background: `linear-gradient(to right, transparent, ${THEME.cream})` }} />
                    <span style={{ color: THEME.cream, opacity: 0.7 }} className="text-sm">
                      ❦
                    </span>
                    <div className="h-px w-10" style={{ background: `linear-gradient(to left, transparent, ${THEME.cream})` }} />
                  </div>

                  <div
                    className="mb-4 flex flex-col items-center text-[16px]"
                    style={{ color: "rgba(255, 238, 210, 0.85)", fontFamily: 'Baskerville, "Times New Roman", serif' }}
                  >
                    {`${String(partyDate.day).padStart(2, "0")}.${String(partyDate.month).padStart(2, "0")}.${partyDate.year}`}
                  </div>

                  <div className="mb-6 mx-auto max-w-[300px]">
                    <p className="text-xs uppercase tracking-widest opacity-80" style={{ color: THEME.cream }}>
                      {guestSalutation || "Thân Mời"}
                    </p>
                    <p
                      className="mt-1 inline-block rounded-md px-4 py-1 text-base font-semibold"
                      style={{ backgroundColor: "rgba(255, 238, 210, 0.12)", color: THEME.cream }}
                    >
                      {guestName || "Quý Khách"}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleOpenEnvelope}
                    disabled={envelopeState !== "idle"}
                    className="relative mx-auto flex w-fit cursor-pointer items-center justify-center overflow-hidden rounded-full px-8 py-2.5 text-lg font-semibold shadow-lg transition-transform hover:scale-105"
                    style={{
                      backgroundColor: THEME.cream,
                      color: THEME.primary,
                      boxShadow: "0 4px 14px rgba(255, 238, 210, 0.35)",
                      fontFamily: 'Baskerville, "Times New Roman", serif',
                    }}
                  >
                    <span>Mở thiệp</span>
                    <div
                      className="pointer-events-none absolute top-0 h-full w-8"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                        animation: "song-hy-shine 3s ease-in-out infinite",
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. FLOATING MUSIC PLAYER (1:1 from is in song-hy-red-template-CuQ4CoIY.js) */}
      <audio ref={audioRef} src={musicSrc} loop preload="none" className="hidden" />
      <div className="fixed bottom-14 right-4 z-40">
        {showMusicHint && !playing && (
          <div className="song-hy-music-bounce absolute bottom-14 right-0" style={{ animationDuration: "2s" }}>
            <div
              className="relative whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-white shadow-lg"
              style={{ backgroundColor: THEME.primaryHex }}
            >
              <span>Chạm để phát nhạc</span>
              <div
                className="absolute -bottom-2 right-4 h-0 w-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent"
                style={{ borderTopColor: THEME.primaryHex }}
              />
            </div>
          </div>
        )}
        {!playing && (
          <div
            className="song-hy-music-ping absolute inset-0 rounded-full opacity-60"
            style={{ backgroundColor: THEME.primaryHex }}
          />
        )}
        <button
          type="button"
          aria-label={playing ? "Tạm dừng nhạc" : "Phát nhạc"}
          onClick={toggleMusic}
          className="relative h-12 w-12 cursor-pointer rounded-full shadow-lg transition-all hover:scale-110 hover:shadow-xl focus:outline-none active:scale-95"
        >
          <div
            className={`absolute inset-0 rounded-full ${playing ? "song-hy-music-spin" : ""}`}
            style={{
              background: `linear-gradient(to right bottom, ${THEME.primaryHex}cc, ${THEME.primaryHex}, ${THEME.primaryHex}dd)`,
            }}
          >
            <div className="absolute inset-1 rounded-full border border-white/20" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/30 via-transparent to-transparent" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            {playing ? (
              <div className="flex h-4 items-end gap-0.5">
                <div className="song-hy-music-dance-1 w-1 rounded-full bg-white" style={{ height: "60%" }} />
                <div className="song-hy-music-dance-2 w-1 rounded-full bg-white" style={{ height: "100%" }} />
                <div className="song-hy-music-dance-3 w-1 rounded-full bg-white" style={{ height: "40%" }} />
                <div className="song-hy-music-dance-4 w-1 rounded-full bg-white" style={{ height: "80%" }} />
              </div>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
            )}
          </div>
        </button>
      </div>

      {/* 3. MAIN INVITATION CANVAS */}
      <div className="min-h-screen w-full bg-white">
        <main className="min-h-screen w-full">
          <div className="flex w-full justify-center overflow-x-clip overflow-x-hidden bg-white">
            <div
              className="relative isolate flex w-full max-w-[480px] flex-col overflow-hidden overflow-x-clip md:mx-auto md:max-w-[900px] md:border md:border-[#80000022]"
              style={{ backgroundColor: THEME.bg }}
            >
              {/* HEADER: Sunburst SVG + Chữ Hỷ + Arched Couple Photo with LOVE NEVER FAILS */}
              <header
                className="relative w-full overflow-hidden pb-[90px] md:pb-[120px]"
                style={{ backgroundColor: THEME.bg }}
              >
                <div
                  className="pointer-events-none absolute left-1/2 top-0 aspect-square w-[min(671px,130vw)] -translate-x-1/2 -translate-y-1/2 md:w-[min(872px,100%)]"
                  aria-hidden="true"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" className="h-full w-full" src={ASSETS.sunburst} />
                </div>

                <p
                  className="relative z-10 whitespace-pre-line px-4 pt-10 text-center text-[11px] uppercase tracking-[0.35em] md:pt-[52px] md:text-[14px]"
                  style={{ color: THEME.cream, fontFamily: '"Cormorant Garamond", "Times New Roman", serif' }}
                >
                  THIỆP MỜI CƯỚI
                </p>

                <div className="relative z-10 mx-auto mt-3 flex w-full max-w-[872px] items-center justify-center gap-4 px-4 md:mt-4 md:gap-5 md:px-10">
                  <div className="min-w-0 flex-1 text-center">
                    <p className="mb-1 text-[11px] md:text-[14px]" style={{ color: THEME.cream }}>
                      ÚT NAM
                    </p>
                    <p
                      className="whitespace-nowrap uppercase text-[20px] md:text-[24px] font-semibold"
                      style={{ color: THEME.cream, fontFamily: 'Baskerville, "Times New Roman", serif' }}
                    >
                      {groomShort}
                    </p>
                  </div>

                  <div className="flex w-[64px] shrink-0 items-center justify-center md:w-[83px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt="Song Hỷ"
                      className="h-[64px] w-[64px] object-contain md:h-[83px] md:w-[83px]"
                      src={ASSETS.chuHy}
                    />
                  </div>

                  <div className="min-w-0 flex-1 text-center">
                    <p className="mb-1 text-[11px] md:text-[14px]" style={{ color: THEME.cream }}>
                      ÚT NỮ
                    </p>
                    <p
                      className="whitespace-nowrap uppercase text-[20px] md:text-[24px] font-semibold"
                      style={{ color: THEME.cream, fontFamily: 'Baskerville, "Times New Roman", serif' }}
                    >
                      {brideShort}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 mt-2 flex justify-center px-6 md:mt-3">
                  <div className="relative mx-auto w-full max-w-[286px] md:max-w-[372px]">
                    <div className="relative w-full translate-y-[50px] md:translate-y-[73px]">
                      <div className="relative aspect-[286/481] w-full">
                        <div className="absolute inset-0 overflow-hidden rounded-t-full bg-[#d9d9d9] shadow-xl">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img alt={`${groomShort} & ${brideShort}`} className="h-full w-full object-cover" src={heroPhoto} />
                        </div>
                        <ArchedLoveBanner />
                      </div>
                    </div>
                  </div>
                </div>
              </header>

              {/* BANNER 1: THÔNG TIN LỄ CƯỚI */}
              <CrimsonBanner>THÔNG TIN LỄ CƯỚI</CrimsonBanner>
              <div className="relative w-full overflow-hidden" style={{ backgroundColor: THEME.bg }}>
                <div className="relative z-10">
                  <div
                    className="mt-6 grid w-full grid-cols-[1fr_auto_1fr] items-start justify-center gap-x-4 px-4 md:gap-x-8"
                    style={{ color: THEME.primary, fontFamily: 'Baskerville, "Times New Roman", serif' }}
                  >
                    <div className="flex flex-col items-center text-center">
                      <span className="text-[14px] md:text-[15px]" style={{ color: THEME.textMuted }}>
                        Ông Bà
                      </span>
                      {groomParents.father && (
                        <span className="font-semibold text-[15px]" style={{ color: THEME.primary }}>
                          {groomParents.father}
                        </span>
                      )}
                      {groomParents.mother && (
                        <span className="font-semibold text-[15px]" style={{ color: THEME.primary }}>
                          {groomParents.mother}
                        </span>
                      )}
                      <span className="mt-1 text-[12px] leading-tight md:text-[13px]" style={{ color: THEME.textMuted }}>
                        {groomCeremony.address}
                      </span>
                    </div>

                    <div className="h-[60px] w-[1px] self-center" style={{ backgroundColor: THEME.primary }} />

                    <div className="flex flex-col items-center text-center">
                      <span className="text-[14px] md:text-[15px]" style={{ color: THEME.textMuted }}>
                        Ông Bà
                      </span>
                      {brideParents.father && (
                        <span className="font-semibold text-[15px]" style={{ color: THEME.primary }}>
                          {brideParents.father}
                        </span>
                      )}
                      {brideParents.mother && (
                        <span className="font-semibold text-[15px]" style={{ color: THEME.primary }}>
                          {brideParents.mother}
                        </span>
                      )}
                      <span className="mt-1 text-[12px] leading-tight md:text-[13px]" style={{ color: THEME.textMuted }}>
                        {brideCeremony.address}
                      </span>
                    </div>
                  </div>

                  <div
                    className="mx-auto mt-8 flex flex-col gap-2 px-4 text-center text-[16px] uppercase tracking-wider md:max-w-[560px] md:text-[20px]"
                    style={{ whiteSpace: "pre-line", color: THEME.primary, fontFamily: 'Baskerville, "Times New Roman", serif' }}
                  >
                    {"TRÂN TRỌNG BÁO TIN\nLỄ THÀNH HÔN CỦA CON CHÚNG TÔI"}
                  </div>

                  <div className="relative mb-6 mt-4 flex flex-col items-center gap-2 text-center md:gap-3">
                    <h3
                      className="text-[34px] md:text-[44px] italic font-semibold leading-tight"
                      style={{ color: THEME.primary, fontFamily: 'var(--font-wg-display), "Cormorant Garamond", Georgia, serif' }}
                    >
                      {groomFull}
                    </h3>
                    <div
                      className="text-[12px] uppercase tracking-[0.2em] md:text-[13px]"
                      style={{ color: THEME.textMuted, fontFamily: 'Baskerville, "Times New Roman", serif' }}
                    >
                      ÚT NAM
                    </div>
                    <div className="text-[30px] md:text-[35px]" style={{ color: THEME.textMuted }}>
                      &amp;
                    </div>
                    <h3
                      className="text-[34px] md:text-[44px] italic font-semibold leading-tight"
                      style={{ color: THEME.primary, fontFamily: 'var(--font-wg-display), "Cormorant Garamond", Georgia, serif' }}
                    >
                      {brideFull}
                    </h3>
                    <div
                      className="text-[12px] uppercase tracking-[0.2em] md:text-[13px]"
                      style={{ color: THEME.textMuted, fontFamily: 'Baskerville, "Times New Roman", serif' }}
                    >
                      ÚT NỮ
                    </div>
                  </div>

                  {/* Ceremony Date Block */}
                  <div
                    className="flex w-full flex-col items-center justify-center px-4 py-8 sm:px-6"
                    style={{ color: THEME.textMuted, fontFamily: 'Baskerville, "Times New Roman", serif' }}
                  >
                    <div style={{ color: THEME.primary }}>
                      <span className="flex flex-col items-center whitespace-pre-line text-center text-[16px] font-semibold leading-relaxed md:text-[20px]">
                        LỄ THÀNH HÔN
                      </span>
                    </div>
                    <p className="mt-2 text-center text-[14px] uppercase md:text-[15px]" style={{ color: THEME.textMuted }}>
                      VÀO LÚC {groomCeremony.ceremonyTime || "09:00"}
                    </p>
                    <div className="mt-5 flex items-center justify-center" style={{ color: THEME.primary }}>
                      <span
                        className="w-[75px] whitespace-nowrap text-[14px] uppercase md:w-[90px] md:text-[15px] text-right"
                        style={{ color: THEME.textMuted }}
                      >
                        {ceremonyDate.dayOfWeek}
                      </span>
                      <span className="mx-3 h-[25px] w-[1px] self-center opacity-50 md:mx-4" style={{ backgroundColor: THEME.textMuted }} />
                      <span className="text-[32px] font-bold md:text-[38px]" style={{ color: THEME.primary }}>
                        {String(ceremonyDate.day).padStart(2, "0")}
                      </span>
                      <span className="mx-3 h-[25px] w-[1px] self-center opacity-50 md:mx-4" style={{ backgroundColor: THEME.textMuted }} />
                      <span
                        className="w-[75px] whitespace-nowrap text-[14px] uppercase md:w-[90px] md:text-[15px] text-left"
                        style={{ color: THEME.textMuted }}
                      >
                        THÁNG {String(ceremonyDate.month).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="mt-2 text-center text-[20px] md:text-[22px]" style={{ color: THEME.textMuted }}>
                      {ceremonyDate.year}
                    </div>
                    {groomCeremony.lunarDate && (
                      <div className="mt-2 text-center text-[13px] uppercase tracking-wide md:text-[14px]" style={{ color: THEME.textMuted }}>
                        {groomCeremony.lunarDate}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* BANNER 2: ALBUM ẢNH */}
              <CrimsonBanner stack>Album Ảnh</CrimsonBanner>
              <div className="relative w-full overflow-hidden py-6" style={{ backgroundColor: THEME.bg }}>
                <div className="relative z-10 mx-auto w-full max-w-lg px-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {galleryPhotos.map((src, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setLightboxIndex(idx)}
                        className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-[#800000]/15 bg-white shadow-md"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt={`Album ${idx + 1}`}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* BANNER 3: THÔNG TIN TIỆC CƯỚI */}
              <CrimsonBanner>THÔNG TIN TIỆC CƯỚI</CrimsonBanner>
              <div className="relative w-full overflow-hidden" style={{ backgroundColor: THEME.bg }}>
                <div
                  className="relative z-10 -mt-px flex w-full flex-col items-center justify-center px-4 pb-8 pt-6"
                  style={{ fontFamily: 'Baskerville, "Times New Roman", serif' }}
                >
                  <h3 className="flex flex-col items-center text-center text-[16px] uppercase md:text-[20px]" style={{ color: THEME.primary }}>
                    Tiệc cưới sẽ diễn ra vào lúc:
                  </h3>
                  <div className="mt-2 text-center text-[20px] font-semibold md:text-[24px]" style={{ color: THEME.primary }}>
                    {brideCeremony.receptionTime || "10:30"}
                  </div>

                  <div className="mt-5 flex items-center justify-center" style={{ color: THEME.textMuted }}>
                    <span className="w-[75px] whitespace-nowrap text-right text-[14px] uppercase md:w-[90px] md:text-[15px]">
                      {partyDate.dayOfWeek}
                    </span>
                    <span className="mx-3 h-[25px] w-px self-center opacity-50 md:mx-4" style={{ backgroundColor: THEME.textMuted }} />
                    <span className="text-[32px] font-bold md:text-[38px]" style={{ color: THEME.primary }}>
                      {String(partyDate.day).padStart(2, "0")}
                    </span>
                    <span className="mx-3 h-[25px] w-px self-center opacity-50 md:mx-4" style={{ backgroundColor: THEME.textMuted }} />
                    <span className="w-[75px] whitespace-nowrap text-left text-[14px] uppercase md:w-[90px] md:text-[15px]">
                      THÁNG {String(partyDate.month).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="mt-2 text-center text-[20px] md:text-[22px]" style={{ color: THEME.textMuted }}>
                    {partyDate.year}
                  </div>
                  {(brideCeremony.lunarDate || groomCeremony.lunarDate) && (
                    <div className="mt-2 text-center text-[13px] md:text-[14px]" style={{ color: THEME.textMuted }}>
                      {brideCeremony.lunarDate || groomCeremony.lunarDate}
                    </div>
                  )}

                  <div className="mt-4 flex items-center justify-center gap-8">
                    <div className="flex flex-col items-center">
                      <span className="text-[11px] uppercase" style={{ color: THEME.textMuted }}>
                        Khai tiệc
                      </span>
                      <span className="mt-1 text-[20px] font-semibold" style={{ color: THEME.primary }}>
                        {brideCeremony.receptionTime || "10:30"}
                      </span>
                    </div>
                  </div>

                  {/* Countdown */}
                  <div className="mt-4 flex flex-col items-center justify-center">
                    <h2 className="text-center text-[18px] uppercase" style={{ color: THEME.textMuted }}>
                      Cùng đếm ngược
                    </h2>
                    <div suppressHydrationWarning className="mt-1.5 text-center text-[18px] font-semibold" style={{ color: THEME.primary }}>
                      {`${countdown.days} ngày ${countdown.hours} giờ ${countdown.minutes} phút ${countdown.seconds} giây`}
                    </div>
                  </div>

                  {/* Month Calendar (ms in song-hy-red-template-CuQ4CoIY.js) */}
                  <div className="mx-auto mt-4 w-[296px] max-w-full md:w-[352px]">
                    <div
                      className="mx-auto w-full overflow-hidden rounded-lg border"
                      style={{
                        borderColor: "rgba(128, 0, 0, 0.27)",
                        color: THEME.primary,
                      }}
                    >
                      <div
                        className="border-b py-2.5 text-center text-[13px] font-semibold tracking-wide md:text-[14px]"
                        style={{ borderColor: "rgba(128, 0, 0, 0.27)" }}
                      >
                        {`Tháng ${partyDate.month} / ${partyDate.year}`}
                      </div>
                      <div className="grid grid-cols-7 border-b-2" style={{ borderColor: THEME.primary }}>
                        {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((d) => (
                          <div key={d} className="py-1.5 text-center text-[10px] font-medium opacity-60 md:text-[11px]">
                            {d}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-y-0.5 px-1 py-2">
                        {Array.from({ length: firstDayOffset }).map((_, idx) => (
                          <div key={`empty-${idx}`} className="flex h-[30px] items-center justify-center md:h-[34px]" />
                        ))}
                        {calendarDays.map((d) => (
                          <div key={d} className="flex h-[30px] items-center justify-center md:h-[34px]">
                            {d === partyDate.day ? (
                              <div className="relative flex h-[24px] w-[26px] items-center justify-center md:h-[28px] md:w-[30px]">
                                <svg viewBox="0 0 24 22" className="absolute inset-0 h-full w-full drop-shadow-sm" fill="#800000">
                                  <path d="M12 21C12 21 1.5 13.5 1.5 7.5C1.5 4.46 3.96 2 7 2C8.76 2 10.35 2.81 11.4 4.09L12 4.8L12.6 4.09C13.65 2.81 15.24 2 17 2C20.04 2 22.5 4.46 22.5 7.5C22.5 13.5 12 21 12 21Z" />
                                </svg>
                                <span className="relative z-10 text-[11px] font-bold text-white md:text-[12px]">{d}</span>
                              </div>
                            ) : (
                              <span className="text-[12px] md:text-[13px]">{d}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 flex w-full flex-col items-center justify-center pb-8 pt-2">
                  <button
                    type="button"
                    onClick={() => setRsvpOpen(true)}
                    className="inline-flex cursor-pointer items-center justify-center rounded-[10px] px-5 py-2.5 text-sm font-semibold tracking-wider transition-transform hover:scale-[1.03] md:text-base"
                    style={{
                      backgroundColor: THEME.primary,
                      color: THEME.cream,
                      fontFamily: 'Baskerville, "Times New Roman", serif',
                    }}
                  >
                    XÁC NHẬN THAM DỰ
                  </button>
                </div>
              </div>

              {/* BANNER 4: ĐỊA ĐIỂM TỔ CHỨC & BẢN ĐỒ */}
              <div className="relative w-full overflow-hidden" style={{ backgroundColor: THEME.bg }}>
                <section className="relative z-10 flex w-full flex-col items-center pb-8">
                  <CrimsonBanner as="h3" stack className="px-2">
                    Tiệc cưới sẽ tổ chức tại
                  </CrimsonBanner>
                  <div
                    className="mt-6 w-[92%] max-w-3xl break-words rounded-lg p-4 text-center text-sm font-medium whitespace-pre-line md:text-base"
                    style={{
                      backgroundColor: THEME.bg,
                      color: THEME.textMuted,
                      fontFamily: 'Baskerville, "Times New Roman", serif',
                    }}
                  >
                    <strong style={{ color: THEME.primary }}>{brideCeremony.venue}</strong>
                    {"\n"}
                    {brideCeremony.address}
                  </div>
                  <div className="relative flex w-full flex-col items-center gap-4 md:gap-5">
                    <iframe
                      className="mt-2 h-[320px] w-[92%] max-w-3xl overflow-hidden rounded-xl border md:h-[420px]"
                      src={mapEmbedSrc}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      style={{ borderColor: THEME.textMuted }}
                      title="Bản đồ địa điểm tiệc cưới"
                    />
                    <a
                      href={brideCeremony.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-wider transition hover:opacity-80"
                      style={{ borderColor: THEME.primary, color: THEME.primary }}
                    >
                      <MapPin className="h-3.5 w-3.5" /> Xem chỉ đường Google Maps
                    </a>
                  </div>
                </section>
              </div>

              {/* DRESS CODE & SCHEDULE TIMELINE */}
              <div className="relative z-10 flex flex-col items-center gap-4 px-6 py-8">
                <h2
                  className="text-center text-[20px] font-bold uppercase tracking-wide md:text-[24px]"
                  style={{ color: THEME.primary, fontFamily: '"Times New Roman", serif' }}
                >
                  DRESS CODE
                </h2>
                <div className="flex flex-wrap justify-center gap-4">
                  {dressCodeColors.map((hex) => (
                    <div
                      key={hex}
                      className="h-10 w-10 rounded-full border border-black/15 shadow-md md:h-12 md:w-12"
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                </div>
              </div>

              <div className="relative z-10 mb-10 mt-6 flex flex-col gap-6 px-4 md:mb-12 md:mt-8 md:gap-8">
                <h2
                  className="flex flex-col items-center text-center text-[20px] font-bold uppercase tracking-wide md:text-[24px]"
                  style={{ color: THEME.primary, fontFamily: '"Times New Roman", serif' }}
                >
                  LỊCH TRÌNH NGÀY CƯỚI
                </h2>
                <ol
                  className="relative mx-auto grid w-full max-w-[460px] grid-cols-[minmax(0,1fr)_16px_minmax(0,1fr)] items-center gap-x-6 gap-y-8 md:gap-x-8 md:gap-y-10"
                  style={{ fontFamily: 'Baskerville, "Times New Roman", serif' }}
                >
                  {scheduleItems.map((item, idx) => (
                    <li key={idx} className="contents">
                      <span
                        className="pt-0.5 text-right text-[16px] tabular-nums leading-snug tracking-wide md:text-[17px] font-semibold"
                        style={{ color: THEME.primary }}
                      >
                        {item.time}
                      </span>
                      <span aria-hidden="true" className="relative flex items-center justify-center self-stretch">
                        <span
                          className={`absolute left-1/2 w-px -translate-x-1/2 ${
                            idx === 0
                              ? "top-1/2 -bottom-8 md:-bottom-10"
                              : idx === scheduleItems.length - 1
                              ? "-top-8 bottom-1/2 md:-top-10"
                              : "-top-8 -bottom-8 md:-top-10 md:-bottom-10"
                          }`}
                          style={{ backgroundColor: "rgba(128, 0, 0, 0.4)" }}
                        />
                        <span
                          className="relative block h-2.5 w-2.5 rounded-full"
                          style={{
                            backgroundColor: THEME.primary,
                            boxShadow: "rgba(128, 0, 0, 0.15) 0px 0px 0px 3px",
                          }}
                        />
                      </span>
                      <span className="pt-0.5 text-start text-[16px] font-medium leading-snug md:text-[18px]" style={{ color: THEME.textMuted }}>
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* BANNER 5: SỔ LƯU BÚT */}
              <CrimsonBanner stack>Sổ lưu bút</CrimsonBanner>
              <div className="relative w-full overflow-hidden" style={{ backgroundColor: THEME.bg }}>
                <section
                  className="relative z-10 flex w-full flex-col items-center justify-center px-4 py-8"
                  style={{ color: THEME.textMuted }}
                >
                  <form className="mx-auto mt-2 w-full max-w-full md:max-w-[600px]" onSubmit={handleWishSubmit}>
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
                      <div className="mb-4">
                        <input
                          placeholder="Nhập tên của bạn*"
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-800"
                          required
                          type="text"
                          value={wishName}
                          onChange={(e) => setWishName(e.target.value)}
                          disabled={wishSubmitting}
                        />
                      </div>
                      <textarea
                        placeholder="Nhập lời chúc của bạn*"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-800"
                        rows={4}
                        required
                        value={wishMessage}
                        onChange={(e) => setWishMessage(e.target.value)}
                        disabled={wishSubmitting}
                        style={{ resize: "none" }}
                      />
                      <div className="mt-4 flex items-center justify-between text-xs">
                        <button
                          type="button"
                          className="rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200 hover:scale-105"
                          title="Tạo lời chúc bằng AI"
                          onClick={() => {
                            const randomWish = AI_WISH_SUGGESTIONS[Math.floor(Math.random() * AI_WISH_SUGGESTIONS.length)];
                            setWishMessage(randomWish);
                          }}
                          style={{ backgroundColor: "rgba(128, 0, 0, 0.1)", color: THEME.primary }}
                        >
                          🪄 Gợi ý lời chúc
                        </button>
                        <button
                          type="submit"
                          disabled={wishSubmitting}
                          className="cursor-pointer rounded-full px-6 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:scale-105 disabled:opacity-50"
                          style={{ backgroundColor: THEME.primary }}
                        >
                          {wishSubmitting ? "ĐANG GỬI..." : "GỬI LỜI CHÚC"}
                        </button>
                      </div>
                    </div>
                  </form>

                  {wishSubmitted && (
                    <p
                      role="status"
                      className="song-hy-guestbook-success-message mx-auto mt-4 w-full max-w-full rounded-lg px-4 py-2.5 text-center text-sm font-medium md:max-w-[600px]"
                      style={{ backgroundColor: THEME.primary, color: THEME.cream }}
                    >
                      Cảm ơn bạn lời chúc đã được lưu.
                    </p>
                  )}

                  <div className="mx-auto mt-8 max-h-[500px] w-full max-w-full space-y-3 overflow-y-auto pr-2 md:max-w-[600px]">
                    {wishes.map((w) => (
                      <div key={w.id} className="rounded-lg border border-gray-100 bg-white p-4 shadow-md">
                        <div className="flex items-start justify-between">
                          <span className="text-lg font-semibold" style={{ color: THEME.primary, fontFamily: '"Times New Roman", serif' }}>
                            {w.name}
                          </span>
                          <span className="text-xs opacity-70">{w.time}</span>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed">{w.message}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* GIFT BOX & THANK YOU FOOTER */}
              <div className="relative w-full overflow-hidden" style={{ backgroundColor: THEME.bg }}>
                <div className="relative z-10 flex flex-col items-center justify-center py-8 text-center">
                  <h2
                    className="mb-4 text-[20px] font-bold uppercase tracking-wide md:text-[24px]"
                    style={{ color: THEME.primary, fontFamily: 'Baskerville, "Times New Roman", serif' }}
                  >
                    Hộp Quà Mừng
                  </h2>
                  <button
                    type="button"
                    onClick={() => setGiftOpen(true)}
                    className="group relative cursor-pointer transition-transform duration-300 hover:scale-105 focus:outline-none"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={ASSETS.giftEnvelope}
                      alt="Hộp Quà Mừng"
                      className="h-36 w-auto object-contain drop-shadow-xl md:h-44"
                    />
                    <span className="mt-2 block text-xs uppercase tracking-widest" style={{ color: THEME.textDark }}>
                      Chạm vào phong bì để mở QR mừng cưới
                    </span>
                  </button>
                </div>

                <div className="relative z-10 mx-auto max-w-4xl px-4 py-8 text-center">
                  <span
                    className="mx-auto flex max-w-none flex-col items-center gap-1 whitespace-pre-line text-lg italic md:max-w-[560px]"
                    style={{ color: THEME.textMuted, fontFamily: 'Baskerville, "Times New Roman", serif' }}
                  >
                    {wedding.quote || "Gia đình xin chân thành cảm ơn quý khách đã đến chung vui."}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((lightboxIndex - 1 + galleryPhotos.length) % galleryPhotos.length);
            }}
            className="absolute left-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={galleryPhotos[lightboxIndex]}
            alt=""
            className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((lightboxIndex + 1) % galleryPhotos.length);
            }}
            className="absolute right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}

      {/* RSVP MODAL */}
      {rsvpOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
          onClick={() => setRsvpOpen(false)}
        >
          <div
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-[#fff7eb] p-6 shadow-2xl"
            style={{ color: THEME.primary }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setRsvpOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1 hover:bg-black/5"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-center font-serif text-xl font-bold uppercase">Xác Nhận Tham Dự</h3>
            {rsvpDone ? (
              <div className="py-8 text-center">
                <p className="font-medium">Cảm ơn bạn đã xác nhận tham dự!</p>
                <button
                  type="button"
                  onClick={() => {
                    setRsvpDone(false);
                    setRsvpOpen(false);
                  }}
                  className="mt-4 rounded-full px-6 py-2 text-xs font-semibold text-white"
                  style={{ backgroundColor: THEME.primary }}
                >
                  Đóng
                </button>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="mt-4 space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase">Tên của bạn *</label>
                  <input
                    type="text"
                    required
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    placeholder="Nhập họ và tên..."
                    className="w-full rounded-lg border px-3 py-2 text-sm"
                    style={{ borderColor: THEME.primary }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRsvpAttend("YES")}
                    className="rounded-lg border py-2 text-xs font-semibold transition"
                    style={{
                      borderColor: THEME.primary,
                      backgroundColor: rsvpAttend === "YES" ? THEME.primary : "transparent",
                      color: rsvpAttend === "YES" ? "#fff" : THEME.primary,
                    }}
                  >
                    Sẽ tham dự
                  </button>
                  <button
                    type="button"
                    onClick={() => setRsvpAttend("NO")}
                    className="rounded-lg border py-2 text-xs font-semibold transition"
                    style={{
                      borderColor: THEME.primary,
                      backgroundColor: rsvpAttend === "NO" ? THEME.primary : "transparent",
                      color: rsvpAttend === "NO" ? "#fff" : THEME.primary,
                    }}
                  >
                    Rất tiếc không thể đến
                  </button>
                </div>
                {rsvpAttend === "YES" && (
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase">Số lượng khách</label>
                    <select
                      value={rsvpGuests}
                      onChange={(e) => setRsvpGuests(e.target.value)}
                      className="w-full rounded-lg border px-3 py-2 text-sm bg-white"
                      style={{ borderColor: THEME.primary }}
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {n} người
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase">Lời nhắn / Ghi chú</label>
                  <textarea
                    rows={2}
                    value={rsvpNote}
                    onChange={(e) => setRsvpNote(e.target.value)}
                    className="w-full rounded-lg border px-3 py-2 text-sm"
                    style={{ borderColor: THEME.primary }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={rsvpSubmitting}
                  className="w-full cursor-pointer rounded-full py-2.5 text-sm font-semibold text-white"
                  style={{ backgroundColor: THEME.primary }}
                >
                  {rsvpSubmitting ? "ĐANG GỬI..." : "GỬI XÁC NHẬN"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* VIETQR GIFTBOX MODAL */}
      {giftOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-xs"
          onClick={() => setGiftOpen(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl shadow-2xl"
            style={{ backgroundColor: THEME.modalBg }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-between px-6 py-4 text-white"
              style={{ backgroundColor: THEME.primary }}
            >
              <h3 className="font-serif text-lg font-bold uppercase tracking-wider">Hộp Quà Mừng Cưới</h3>
              <button type="button" onClick={() => setGiftOpen(false)} className="rounded-full p-1 hover:bg-white/10">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
              {[
                { key: "groom", title: "Mừng Chú Rể", bank: groomBank },
                { key: "bride", title: "Mừng Cô Dâu", bank: brideBank },
              ].map(({ key, title, bank }) => {
                const qrUrl = buildVietQrUrl({
                  bankName: bank.bankName,
                  accountNumber: bank.accountNumber,
                  accountHolder: bank.accountHolder,
                });
                return (
                  <div key={key} className="flex flex-col items-center rounded-xl bg-white p-4 text-center shadow-sm">
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: THEME.primary }}>
                      {title}
                    </span>
                    <div className="my-3 aspect-square w-40 overflow-hidden rounded-lg border p-1">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={qrUrl || undefined} alt={title} className="h-full w-full object-contain" />
                    </div>
                    <p className="text-xs font-bold text-gray-800">{bank.bankName}</p>
                    <p className="mt-0.5 text-xs text-gray-600">{bank.accountHolder}</p>
                    <div className="mt-2 flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-mono">
                      <span>{bank.accountNumber}</span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(bank.accountNumber);
                          setCopiedKey(key);
                          setTimeout(() => setCopiedKey(null), 2000);
                        }}
                        className="text-gray-500 hover:text-gray-900"
                      >
                        {copiedKey === key ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
