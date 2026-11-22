"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { type WeddingTemplateProps } from "@/lib/template-registry";
import { buildVietQrUrl } from "@/lib/vietqr";
import { X, Copy, Check, MapPin, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

const THEME = {
  primary: "#511419",
  eyebrow: "#590310",
  cardFill: "#511419",
  lightText: "#ece4d8",
  softText: "rgba(236, 228, 216, 0.7)",
  divider: "rgba(236, 228, 216, 0.4)",
  dressSub: "rgba(81, 20, 25, 0.8)",
  dateDivider: "rgba(236, 228, 216, 0.45)",
  calendarBg: "#ece4d8",
  pageBg: "#fff7eb",
};

const ASSETS = {
  paper: "/images/themes/minimalism-dark-red/paper.webp",
  castle: "/images/themes/minimalism-dark-red/castle-background.webp",
  flower: "/images/themes/minimalism-dark-red/flower2-decoration.webp",
  envBg: "/images/themes/minimalism-dark-red/envelope-background.webp",
  envCover: "/images/themes/minimalism-dark-red/envelope-cover.webp",
  papernote: "/images/themes/minimalism-dark-red/papernote-background.webp",
  camera: "/images/themes/minimalism-dark-red/camera.webp",
  cake: "/images/themes/minimalism-dark-red/cake.webp",
  cook: "/images/themes/minimalism-dark-red/cook.webp",
  defaultHero: "/images/themes/minimalism-dark-red/hero.webp",
  defaultGallery: [
    "/images/themes/minimalism-dark-red/gallery_1.webp",
    "/images/themes/minimalism-dark-red/gallery_2.webp",
    "/images/themes/minimalism-dark-red/gallery_3.webp",
    "/images/themes/minimalism-dark-red/gallery_4.webp",
    "/images/themes/minimalism-dark-red/gallery_5.webp",
    "/images/themes/minimalism-dark-red/gallery_6.webp",
  ],
  giftEnvelope: "/images/envelope/minimalism_darkred.webp",
  giftBox: "/images/giftbox/minimalism_darkred.webp",
  defaultMusic: "/music/em-dong-y-i-do.mp3",
};

const HEART_PATH =
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

const AMBIENT_HEARTS = [
  { left: 26.85, color: "#ece4d8", fontSize: 18.48, sway: -0.7, duration: 8.87, delay: 2.17 },
  { left: 41.51, color: "#c9a24a", fontSize: 17.56, sway: 8.33, duration: 8.25, delay: 2.49 },
  { left: 91.68, color: "#c9a24a", fontSize: 20.86, sway: 20.43, duration: 12.72, delay: 0.89 },
  { left: 41.88, color: "#7a1f26", fontSize: 14.56, sway: 26.77, duration: 9.27, delay: 2.18 },
  { left: 65.13, color: "#7a1f26", fontSize: 14.01, sway: 6.9, duration: 12.2, delay: 1.36 },
  { left: 57.52, color: "#7a1f26", fontSize: 19.37, sway: -13.64, duration: 9.94, delay: 0.57 },
  { left: 16.33, color: "#e5c3c6", fontSize: 14.14, sway: 10.47, duration: 12.4, delay: 1.23 },
  { left: 74.81, color: "#7a1f26", fontSize: 17.63, sway: -29.65, duration: 10.93, delay: 0.76 },
  { left: 69.29, color: "#ece4d8", fontSize: 10.84, sway: -4.67, duration: 9.08, delay: 0.04 },
  { left: 12.75, color: "#e5c3c6", fontSize: 16.54, sway: 4.92, duration: 9.47, delay: 1.0 },
  { left: 6.94, color: "#e5c3c6", fontSize: 12.02, sway: 25.61, duration: 10.26, delay: 0.3 },
  { left: 34.3, color: "#7a1f26", fontSize: 15.61, sway: -11.79, duration: 12.26, delay: 2.39 },
  { left: 66.22, color: "#e5c3c6", fontSize: 14.79, sway: -13.86, duration: 11.83, delay: 2.0 },
  { left: 72.18, color: "#ece4d8", fontSize: 17.16, sway: -14.71, duration: 9.3, delay: 1.07 },
  { left: 5.17, color: "#c9a24a", fontSize: 12.32, sway: -15.57, duration: 11.91, delay: 0.09 },
  { left: 28.24, color: "#ece4d8", fontSize: 20.33, sway: -11.36, duration: 8.92, delay: 0.05 },
];

const BURST_COLORS = ["#ece4d8", "#c9a24a", "#7a1f26", "#e5c3c6"];

const AI_WISH_SUGGESTIONS = [
  "Chúc hai bạn trăm năm hạnh phúc, luôn yêu thương và đồng hành cùng nhau suốt chặng đường dài!",
  "Chúc mừng ngày trọng đại của hai bạn! Chúc gia đình nhỏ luôn ngập tràn tiếng cười và ấm áp.",
  "Trăm năm tình viên mãn, bạc đầu nghĩa phu thê. Chúc mừng hạnh phúc cô dâu chú rể!",
  "Nhìn hai bạn thật đẹp đôi! Chúc cuộc sống hôn nhân luôn ngọt ngào như ngày đầu mới yêu.",
];

const DEMO_WISHES = [
  { id: "1", name: "Gia đình chú Hùng", time: "10:30 20/10/2026", message: "Chúc hai cháu trăm năm hạnh phúc, sớm sinh quý tử!" },
  { id: "2", name: "Hội bạn thân đại học", time: "09:15 19/10/2026", message: "Chúc mừng hai bạn về chung một nhà. Luôn yêu thương nhau như ngày đầu nhé!" },
  { id: "3", name: "Anh Minh & Chị Lan", time: "20:45 18/10/2026", message: "Thiệp cưới đẹp quá! Chúc đám cưới của hai em thật trọn vẹn và đáng nhớ." },
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
    // Ignore audio context restrictions
  }
}

function parseWeddingDate(dateStr?: string) {
  if (!dateStr) return { day: 3, month: 1, year: 2026, dayOfWeek: "THỨ BẢY" };
  const cleaned = dateStr.replace(/^[^0-9]*/, "").trim();
  const parts = cleaned.split(/[\/\-]/);
  let d = 3, m = 1, y = 2026;
  if (parts.length === 3) {
    if (parts[0].length === 4) {
      y = Number(parts[0]) || 2026;
      m = Number(parts[1]) || 1;
      d = Number(parts[2]) || 3;
    } else {
      d = Number(parts[0]) || 3;
      m = Number(parts[1]) || 1;
      y = Number(parts[2]) || 2026;
    }
  }
  const dt = new Date(y, m - 1, d);
  const days = ["CHỦ NHẬT", "THỨ HAI", "THỨ BA", "THỨ TƯ", "THỨ NĂM", "THỨ SÁU", "THỨ BẢY"];
  return {
    day: d,
    month: m,
    year: y,
    dayOfWeek: Number.isNaN(dt.getTime()) ? "THỨ BẢY" : days[dt.getDay()],
  };
}

function getShortName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  return parts.length >= 2 ? parts.slice(-2).join(" ") : fullName;
}

function isLightHex(hex: string) {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return false;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return (299 * r + 587 * g + 114 * b) / 1000 > 200;
}

function CardSurface({ radiusClass }: { radiusClass: string }) {
  return (
    <>
      <div
        aria-hidden="true"
        className={`absolute inset-0 ${radiusClass}`}
        style={{ backgroundColor: THEME.cardFill }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ASSETS.paper}
        alt=""
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 size-full max-w-none object-cover mix-blend-multiply opacity-40 ${radiusClass}`}
      />
    </>
  );
}

function FloatingFlower({
  className,
  inner = "",
  dur = 5.5,
  delay = 0,
}: {
  className: string;
  inner?: string;
  dur?: number;
  delay?: number;
}) {
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute block ${className}`}>
      <span
        className="block"
        style={{
          animation: `drFloat ${dur}s ease-in-out infinite`,
          animationDelay: `${delay}s`,
          willChange: "transform",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ASSETS.flower}
          alt=""
          className={`block w-full max-w-none object-contain drop-shadow-[3px_4px_3px_rgba(0,0,0,0.3)] ${inner}`}
        />
      </span>
    </span>
  );
}

export default function MinimalismDoDamTemplate({
  wedding,
  guestName,
  guestSalutation,
  isDemo,
}: WeddingTemplateProps) {
  const [envelopeState, setEnvelopeState] = useState<"idle" | "opening" | "away" | "closed">("idle");
  const [particles, setParticles] = useState<
    Array<{ id: number; color: string; size: number; dx: number; dy: number; rotStart: number; rotEnd: number; delay: number }>
  >([]);

  // Music player state
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [showMusicHint, setShowMusicHint] = useState(true);
  const musicSrc = wedding.backgroundMusic || ASSETS.defaultMusic;

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Modals state
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // RSVP state
  const [rsvpName, setRsvpName] = useState(guestName || "");
  const [rsvpAttend, setRsvpAttend] = useState<"YES" | "NO">("YES");
  const [rsvpGuests, setRsvpGuests] = useState("1");
  const [rsvpNote, setRsvpNote] = useState("");
  const [rsvpSubmitting, setRsvpSubmitting] = useState(false);
  const [rsvpDone, setRsvpDone] = useState(false);

  // Guestbook state
  const [wishes, setWishes] = useState<Array<{ id: string; name: string; time: string; message: string }>>(DEMO_WISHES);
  const [wishName, setWishName] = useState(guestName || "");
  const [wishMessage, setWishMessage] = useState("");
  const [wishSubmitting, setWishSubmitting] = useState(false);
  const [wishSubmitted, setWishSubmitted] = useState(false);

  // Couple & Family data
  const groomFull = wedding.groomName || "Đặng Hoàng Long";
  const brideFull = wedding.brideName || "Vũ Bảo Ngọc";
  const groomShort = getShortName(groomFull);
  const brideShort = getShortName(brideFull);

  const groomParents = wedding.groomParents || {
    father: "Đặng Văn Thắng",
    mother: "Bùi Thị Mai",
    address: "Quận 1, TP. Hồ Chí Minh",
  };
  const brideParents = wedding.brideParents || {
    father: "Vũ Đức Trung",
    mother: "Ngô Thị Hạnh",
    address: "Quận 7, TP. Hồ Chí Minh",
  };

  const groomCeremony = wedding.groomCeremony || {
    date: "03/01/2026",
    lunarDate: "(Tức ngày 15 tháng 11 năm Ất Tỵ)",
    ceremonyTime: "09:00",
    receptionTime: "18:00",
    venue: "Tư Gia Nhà Trai",
    address: "Quận 1, TP. Hồ Chí Minh",
  };

  const brideCeremony = wedding.brideCeremony || {
    date: "03/01/2026",
    lunarDate: "(Tức ngày 15 tháng 11 năm Ất Tỵ)",
    ceremonyTime: "17:30",
    receptionTime: "18:00",
    venue: "Trung Tâm Hội Nghị White Palace",
    address: "194 Hoàng Văn Thụ, Phường 9, Quận Phú Nhuận, TP. Hồ Chí Minh",
    googleMapsUrl: "https://maps.google.com/?q=White+Palace+194+Hoang+Van+Thu",
  };

  const ceremonyDate = parseWeddingDate(groomCeremony.date);
  const partyDate = parseWeddingDate(brideCeremony.date || groomCeremony.date);

  const heroPhoto = wedding.gallery?.[0] || ASSETS.defaultHero;
  const galleryPhotos =
    wedding.gallery && wedding.gallery.length > 1
      ? wedding.gallery.slice(1)
      : ASSETS.defaultGallery;

  const scheduleItems = [
    { time: brideCeremony.ceremonyTime || "17:30", label: "Đón khách & chụp ảnh", icon: ASSETS.camera },
    { time: brideCeremony.receptionTime || "18:00", label: "Tuyên bố lý do, làm lễ cưới", icon: ASSETS.cake },
    { time: "18:45", label: "Khai tiệc mừng hạnh phúc", icon: ASSETS.cook },
  ];

  const dressCodeColors = ["#511419", "#8C3A3F", "#C9A24A", "#ECE4D8"];

  // Load real wishes if wedding.id is a real DB ID
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
    const [hh = 18, mm = 0] = (brideCeremony.receptionTime || "18:00").split(":").map(Number);
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
          size: 10 + 16 * Math.random(),
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

  // Month Calendar grid calculation
  const daysInMonth = new Date(partyDate.year, partyDate.month, 0).getDate();
  const firstDayOffset = (new Date(partyDate.year, partyDate.month - 1, 1).getDay() + 6) % 7;
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const mapQuery = encodeURIComponent(`${brideCeremony.venue}, ${brideCeremony.address}`);
  const mapEmbedSrc = `https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  const groomBank = wedding.gifting?.groom?.bankName
    ? wedding.gifting.groom
    : { bankName: "Vietcombank", accountNumber: "0123456789", accountHolder: groomFull.toUpperCase() };
  const brideBank = wedding.gifting?.bride?.bankName
    ? wedding.gifting.bride
    : { bankName: "Techcombank", accountNumber: "9876543210", accountHolder: brideFull.toUpperCase() };

  return (
    <div className="demo-page relative" data-testid="minimalism-do-dam-template">
      {/* 1. ENVELOPE INTRO OVERLAY (1:1 from Ca in minimalism-do-dam-template-CtnKm4vC.js) */}
      {envelopeState !== "closed" && (
        <div
          data-landing-screenshot-id="invite-envelope"
          className={`mdd-intro-overlay fixed inset-0 z-50 flex items-center justify-center overflow-hidden ${
            envelopeState === "opening" || envelopeState === "away" ? "mdd-intro-opening" : ""
          }`}
          style={{
            background: "linear-gradient(to bottom right, #6e1a20, #511419, #380a0e)",
          }}
        >
          {envelopeState === "idle" && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
              {AMBIENT_HEARTS.map((h, idx) => (
                <div
                  key={idx}
                  className="absolute"
                  style={
                    {
                      left: `${h.left}%`,
                      top: -30,
                      color: h.color,
                      fontSize: h.fontSize,
                      "--sway": `${h.sway}px`,
                      animation: `mdd-ambient-fall ${h.duration}s ease-in-out ${h.delay}s infinite`,
                    } as React.CSSProperties
                  }
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
                    <path d={HEART_PATH} />
                  </svg>
                </div>
              ))}
            </div>
          )}

          {particles.length > 0 && (
            <div className="pointer-events-none absolute inset-0" style={{ zIndex: 100 }} aria-hidden="true">
              {particles.map((p) => (
                <div
                  key={p.id}
                  className="absolute left-1/2 top-1/2"
                  style={
                    {
                      color: p.color,
                      fontSize: p.size,
                      textShadow: `0 0 10px ${p.color}`,
                      "--dx": `${p.dx}px`,
                      "--dy": `${p.dy}px`,
                      "--rot-start": `${p.rotStart}deg`,
                      "--rot-end": `${p.rotEnd}deg`,
                      animation: `mdd-particle-burst 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${p.delay}s forwards`,
                    } as React.CSSProperties
                  }
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
                    <path d={HEART_PATH} />
                  </svg>
                </div>
              ))}
            </div>
          )}

          <div
            className="relative"
            style={{
              zIndex: 10,
              animation: envelopeState === "away" ? "mdd-envelope-away 0.8s ease-in forwards" : undefined,
            }}
          >
            <div className="relative w-[310px] sm:w-[340px] md:w-[520px] lg:w-[600px]">
              {/* Wax Seal */}
              <div
                className="absolute left-1/2 flex items-center justify-center rounded-full"
                style={
                  {
                    top: 50,
                    width: 56,
                    height: 56,
                    transform: "translate(-50%, -50%)",
                    background: "radial-gradient(circle at 30% 30%, #511419, rgb(51, 0, 0))",
                    "--shadow-color": "rgba(81, 20, 25, 0.5)",
                    boxShadow: "0 4px 20px rgba(81, 20, 25, 0.5), inset 0 2px 4px rgba(255,255,255,0.3)",
                    zIndex: 30,
                    animation:
                      envelopeState === "idle"
                        ? "mdd-seal-pulse 2s ease-in-out infinite"
                        : "mdd-seal-break 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards",
                  } as React.CSSProperties
                }
              >
                <svg viewBox="0 0 24 24" className="h-7 w-7" style={{ fill: "#f3e8de" }}>
                  <path d={HEART_PATH} />
                </svg>
              </div>

              {(envelopeState === "opening" || envelopeState === "away") && (
                <div
                  className="pointer-events-none absolute left-1/2 rounded-full"
                  style={{
                    top: 50,
                    width: 56,
                    height: 56,
                    transform: "translate(-50%, -50%)",
                    border: `3px solid ${THEME.primary}`,
                    zIndex: 29,
                    animation: "mdd-seal-ring 0.6s ease-out forwards",
                  }}
                  aria-hidden="true"
                />
              )}

              <div
                className="relative rounded-lg"
                style={{
                  boxShadow:
                    "0 25px 60px -12px rgba(0, 0, 0, 0.45), 0 8px 24px rgba(0, 0, 0, 0.2), 0 0 40px rgba(81, 20, 25, 0.15)",
                }}
              >
                <div
                  className="absolute inset-0 overflow-hidden rounded-lg"
                  style={{
                    background: "rgba(255, 250, 243, 0.96)",
                    border: "1px solid rgba(81, 20, 25, 0.15)",
                    clipPath: "inset(0 round 8px)",
                  }}
                >
                  <span
                    className="pointer-events-none absolute block top-[-5%] md:top-[-2%] left-[-10px] -translate-x-[6%] md:-translate-x-[11%]"
                    aria-hidden="true"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={ASSETS.flower}
                      alt=""
                      className="pointer-events-none block h-36 md:h-64 w-auto max-w-none object-contain opacity-80 rotate-[25deg]"
                    />
                  </span>
                  <span
                    className="pointer-events-none absolute block bottom-[-5%] md:bottom-[35%] right-[-10px] translate-x-[6%] md:translate-x-[11%]"
                    aria-hidden="true"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={ASSETS.flower}
                      alt=""
                      className="pointer-events-none block h-36 md:h-64 w-auto max-w-none object-contain opacity-80 -rotate-[25deg] -scale-x-100"
                    />
                  </span>
                </div>

                <div className="relative z-10 px-6 pt-28 pb-14 text-center md:pt-24 md:pb-8">
                  <h1
                    className="mb-2 flex flex-col items-center text-3xl leading-tight sm:text-4xl"
                    style={{ color: THEME.primary, fontFamily: 'var(--font-wg-display), "Cormorant Garamond", Georgia, serif' }}
                  >
                    <span className="block w-full text-center font-semibold">{groomShort}</span>
                    <span className="block w-full text-center text-lg leading-none sm:text-xl my-1">&amp;</span>
                    <span className="block w-full text-center font-semibold">{brideShort}</span>
                  </h1>

                  <div className="mb-2 flex items-center justify-center gap-3">
                    <div className="h-px w-10" style={{ background: "linear-gradient(to right, transparent, #511419)" }} />
                    <span style={{ color: THEME.primary, opacity: 0.7 }} className="text-sm">
                      ❦
                    </span>
                    <div className="h-px w-10" style={{ background: "linear-gradient(to left, transparent, #511419)" }} />
                  </div>

                  <div
                    className="mb-4 flex flex-col items-center text-[16px]"
                    style={{ color: "rgba(81, 20, 25, 0.72)", fontFamily: 'Baskerville, "Times New Roman", serif' }}
                  >
                    {`${String(partyDate.day).padStart(2, "0")}.${String(partyDate.month).padStart(2, "0")}.${partyDate.year}`}
                  </div>

                  <div className="mb-6 mx-auto max-w-[300px]">
                    <p className="text-xs uppercase tracking-widest opacity-70" style={{ color: THEME.primary }}>
                      {guestSalutation || "Thân Mời"}
                    </p>
                    <p
                      className="mt-1 inline-block rounded-md px-4 py-1 text-base font-semibold"
                      style={{ backgroundColor: "rgba(81, 20, 25, 0.1)", color: THEME.primary }}
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
                      backgroundColor: THEME.primary,
                      color: "#f3e8de",
                      boxShadow: "0 4px 14px rgba(81, 20, 25, 0.35)",
                      fontFamily: 'Baskerville, "Times New Roman", serif',
                    }}
                  >
                    <span>Mở thiệp</span>
                    <div
                      className="pointer-events-none absolute top-0 h-full w-8"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
                        animation: "mdd-shine 3s ease-in-out infinite",
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. FLOATING MUSIC PLAYER (1:1 from Sa in minimalism-do-dam-template-CtnKm4vC.js) */}
      <audio ref={audioRef} src={musicSrc} loop preload="none" className="hidden" />
      <div className="fixed bottom-14 right-4 z-40">
        {showMusicHint && !playing && (
          <div className="mdd-music-bounce absolute bottom-14 right-0" style={{ animationDuration: "2s" }}>
            <div
              className="relative whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-white shadow-lg"
              style={{ backgroundColor: THEME.primary }}
            >
              <span>Chạm để phát nhạc</span>
              <div
                className="absolute -bottom-2 right-4 h-0 w-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent"
                style={{ borderTopColor: THEME.primary }}
              />
            </div>
          </div>
        )}
        {!playing && (
          <div className="mdd-music-ping absolute inset-0 rounded-full opacity-60" style={{ backgroundColor: THEME.primary }} />
        )}
        <button
          type="button"
          aria-label={playing ? "Tạm dừng nhạc" : "Phát nhạc"}
          onClick={toggleMusic}
          className="relative h-12 w-12 cursor-pointer rounded-full shadow-lg transition-all hover:scale-110 hover:shadow-xl focus:outline-none active:scale-95"
        >
          <div
            className={`absolute inset-0 rounded-full ${playing ? "mdd-music-spin" : ""}`}
            style={{
              background: `linear-gradient(to right bottom, ${THEME.primary}cc, ${THEME.primary}, ${THEME.primary}dd)`,
            }}
          >
            <div className="absolute inset-1 rounded-full border border-white/20" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/30 via-transparent to-transparent" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            {playing ? (
              <div className="flex h-4 items-end gap-0.5">
                <div className="mdd-music-dance-1 w-1 rounded-full bg-white" style={{ height: "60%" }} />
                <div className="mdd-music-dance-2 w-1 rounded-full bg-white" style={{ height: "100%" }} />
                <div className="mdd-music-dance-3 w-1 rounded-full bg-white" style={{ height: "40%" }} />
                <div className="mdd-music-dance-4 w-1 rounded-full bg-white" style={{ height: "80%" }} />
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
      <div className="min-h-screen w-full" style={{ backgroundColor: THEME.pageBg }}>
        <main className="min-h-screen w-full">
          <div className="flex w-full justify-center overflow-x-clip bg-white">
            <div
              className="relative w-full max-w-[480px] md:max-w-[900px] md:mx-auto overflow-hidden md:border md:border-[#51141922] isolate"
              style={{ backgroundColor: THEME.pageBg, color: THEME.primary }}
            >
              {/* Global paper texture multiply overlay */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                  backgroundImage: `url(${ASSETS.paper})`,
                  backgroundSize: "cover",
                  backgroundPosition: "top center",
                  mixBlendMode: "multiply",
                  opacity: 0.4,
                }}
              />

              {/* HEADER: Castle Watermark + 3D Envelope Hero Photo + Stacked Couple Names */}
              <header className="relative z-10 flex flex-col items-center overflow-x-clip px-9 pt-14 pb-14 text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ASSETS.castle}
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-[26%] w-[170%] max-w-none -translate-x-1/2 object-contain opacity-[0.1]"
                />
                <p
                  data-testid="event-heading"
                  className="relative z-10 whitespace-pre-line text-[15px] uppercase md:text-[18px]"
                  style={{
                    fontFamily: 'Baskerville, "Times New Roman", serif',
                    color: THEME.eyebrow,
                    letterSpacing: "0.16em",
                    fontWeight: 600,
                  }}
                >
                  SAVE THE DATE
                </p>

                {/* 3D Envelope + Tilted Photo + Flower */}
                <div className="relative z-10 mt-20 w-[82%] max-w-[330px] md:mt-24 md:max-w-[420px]">
                  <div className="relative aspect-[333/384]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={ASSETS.envBg}
                      alt=""
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 z-10 w-full max-w-none"
                    />
                    <div
                      className="absolute left-[33%] top-[-2%] z-20 w-[64%]"
                      style={{
                        animation: "drFloat 6.5s ease-in-out infinite",
                        animationDelay: "0.4s",
                        willChange: "transform",
                      }}
                    >
                      <div className="aspect-[221/309] rotate-[12deg] border-[7px] border-white bg-white shadow-[2px_2px_4px_rgba(0,0,0,0.25)]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={heroPhoto} alt={`${groomShort} & ${brideShort}`} className="h-full w-full object-cover" />
                      </div>
                    </div>
                    <FloatingFlower
                      className="-left-[2%] -top-[12%] z-[25] w-[42%]"
                      inner="rotate-[-17deg]"
                      dur={5}
                      delay={0}
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={ASSETS.envCover}
                      alt=""
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-0 left-0 z-30 w-full max-w-none"
                    />
                  </div>
                </div>

                {/* Couple Names with Giant '&' Watermark */}
                <div className="relative z-10 mt-14 flex flex-col items-center gap-[22px] md:mt-18">
                  <p
                    className="text-[clamp(36px,10vw,46px)] leading-none md:text-[54px] italic"
                    style={{ fontFamily: 'var(--font-wg-display), "Cormorant Garamond", Georgia, serif', color: THEME.primary }}
                  >
                    {groomShort}
                  </p>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 -translate-y-1/2 text-[92px] leading-none md:text-[120px]"
                    style={{ fontFamily: 'Baskerville, "Times New Roman", serif', color: "rgba(81,20,25,0.15)" }}
                  >
                    &amp;
                  </span>
                  <p
                    className="text-[clamp(36px,10vw,46px)] leading-none md:text-[54px] italic"
                    style={{ fontFamily: 'var(--font-wg-display), "Cormorant Garamond", Georgia, serif', color: THEME.primary }}
                  >
                    {brideShort}
                  </p>
                </div>
              </header>

              {/* SECTION 1: DARK BURGUNDY FAMILY & CEREMONY CARD */}
              <section className="relative z-10 mx-auto w-[88%] max-w-[420px] md:max-w-[560px]">
                <FloatingFlower className="-right-[22%] bottom-[30%] z-20 w-[40%]" dur={5.5} delay={0.6} />
                <div className="relative overflow-hidden rounded-[13px] px-5 pb-10 pt-9 text-center shadow-[4px_4px_10px_rgba(0,0,0,0.25)]">
                  <CardSurface radiusClass="rounded-[13px]" />
                  <div className="relative z-10 flex flex-col items-center gap-6">
                    <h2
                      className="uppercase text-center relative z-10 text-[20px] font-bold tracking-wider"
                      style={{ color: THEME.lightText, fontFamily: 'Baskerville, "Times New Roman", serif' }}
                    >
                      THÔNG TIN LỄ CƯỚI
                    </h2>

                    {/* 2-Column Family Grid */}
                    <div
                      className="relative grid w-full grid-cols-[1fr_auto_1fr] items-start justify-center gap-x-6 text-center"
                      style={{ color: THEME.lightText, fontFamily: 'Baskerville, "Times New Roman", serif' }}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-[12px] uppercase tracking-wider" style={{ color: THEME.softText }}>
                          Nhà Trai
                        </span>
                        {groomParents.father && (
                          <span className="text-[13px] font-semibold" style={{ color: THEME.lightText }}>
                            {groomParents.father}
                          </span>
                        )}
                        {groomParents.mother && (
                          <span className="text-[13px] font-semibold" style={{ color: THEME.lightText }}>
                            {groomParents.mother}
                          </span>
                        )}
                        <span className="mt-1 text-[11px] leading-tight" style={{ color: THEME.softText }}>
                          {groomCeremony.address}
                        </span>
                      </div>

                      <div className="h-[56px] w-[1px] shrink-0 self-center" style={{ backgroundColor: THEME.divider }} />

                      <div className="flex flex-col items-center gap-1">
                        <span className="text-[12px] uppercase tracking-wider" style={{ color: THEME.softText }}>
                          Nhà Gái
                        </span>
                        {brideParents.father && (
                          <span className="text-[13px] font-semibold" style={{ color: THEME.lightText }}>
                            {brideParents.father}
                          </span>
                        )}
                        {brideParents.mother && (
                          <span className="text-[13px] font-semibold" style={{ color: THEME.lightText }}>
                            {brideParents.mother}
                          </span>
                        )}
                        <span className="mt-1 text-[11px] leading-tight" style={{ color: THEME.softText }}>
                          {brideCeremony.address}
                        </span>
                      </div>
                    </div>

                    {/* Intro Announcement */}
                    <div
                      className="relative mx-auto flex flex-col gap-1 text-center text-[12px] md:max-w-[560px] md:text-[13px] uppercase tracking-wider"
                      style={{ whiteSpace: "pre-line", fontFamily: 'Baskerville, "Times New Roman", serif', color: THEME.lightText }}
                    >
                      {"TRÂN TRỌNG BÁO TIN\nLỄ THÀNH HÔN CỦA CON CHÚNG TÔI"}
                    </div>

                    {/* Couple Full Names */}
                    <div className="relative flex w-full min-w-0 flex-col items-center gap-2 text-center">
                      <h3
                        className="text-[34px] md:text-[42px] italic leading-tight"
                        style={{ fontFamily: 'var(--font-wg-display), "Cormorant Garamond", Georgia, serif', color: THEME.lightText }}
                      >
                        {groomFull}
                      </h3>
                      <div className="text-[10px] uppercase tracking-[0.14em]" style={{ color: THEME.softText }}>
                        THỨ NAM
                      </div>
                      <div className="text-[28px] italic" style={{ color: THEME.lightText }}>
                        &amp;
                      </div>
                      <h3
                        className="text-[34px] md:text-[42px] italic leading-tight"
                        style={{ fontFamily: 'var(--font-wg-display), "Cormorant Garamond", Georgia, serif', color: THEME.lightText }}
                      >
                        {brideFull}
                      </h3>
                      <div className="text-[10px] uppercase tracking-[0.14em]" style={{ color: THEME.softText }}>
                        THỨ NỮ
                      </div>
                    </div>

                    {/* Ceremony Date Block */}
                    <div
                      className="relative flex flex-col items-center gap-3 text-center"
                      style={{ fontFamily: 'Baskerville, "Times New Roman", serif' }}
                    >
                      <div className="text-[16px] uppercase tracking-wider" style={{ color: THEME.softText }}>
                        LỄ THÀNH HÔN
                      </div>
                      <div
                        className="flex w-full max-w-[200px] items-center justify-between gap-4 text-[13px] uppercase"
                        style={{ color: THEME.softText }}
                      >
                        <span>VÀO LÚC {groomCeremony.ceremonyTime || "09:00"}</span>
                        <span>|</span>
                        <span>{ceremonyDate.dayOfWeek}</span>
                      </div>
                      <div className="flex items-center justify-center gap-4" style={{ color: THEME.lightText }}>
                        <span className="text-[40px] leading-none md:text-[46px] font-bold">
                          {String(ceremonyDate.day).padStart(2, "0")}
                        </span>
                        <div className="h-[46px] w-px" style={{ backgroundColor: THEME.dateDivider }} />
                        <div className="flex flex-col items-start justify-center gap-1 text-left">
                          <span className="text-[14px] uppercase md:text-[16px]">
                            THÁNG {String(ceremonyDate.month).padStart(2, "0")}
                          </span>
                          <span className="text-[16px] uppercase md:text-[18px] font-semibold">
                            {ceremonyDate.year}
                          </span>
                        </div>
                      </div>
                      {groomCeremony.lunarDate && (
                        <div className="text-xs uppercase tracking-[0.12em]" style={{ color: THEME.softText }}>
                          {groomCeremony.lunarDate}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 2: WEDDING ALBUM (ga in minimalism-do-dam-template-CtnKm4vC.js) */}
              <div className="relative z-10 overflow-x-clip">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ASSETS.castle}
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-[23%] w-[158%] max-w-none -translate-x-1/2 object-contain opacity-[0.1]"
                />
                <section className="relative z-10 mx-auto max-w-4xl px-5 pb-14 pt-12">
                  <div className="mb-8 text-center">
                    <h2
                      className="uppercase text-center relative z-10 text-[20px] font-bold tracking-wider"
                      style={{ color: THEME.primary, fontFamily: 'Baskerville, "Times New Roman", serif' }}
                    >
                      ALBUM ẢNH CƯỚI
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {galleryPhotos.map((src, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setLightboxIndex(idx)}
                        className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-[#511419]/15 bg-white/50 shadow-md"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt={`Ảnh cưới ${idx + 1}`}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </button>
                    ))}
                  </div>
                </section>
              </div>

              {/* SECTION 3: DARK BURGUNDY RECEPTION, COUNTDOWN & MONTH CALENDAR CARD */}
              <section className="relative z-10 mx-auto mb-4 w-[88%] max-w-[420px] md:max-w-[560px]">
                <FloatingFlower className="-left-[16%] top-[10%] z-20 w-[32%]" dur={6} delay={0.3} />
                <div className="relative overflow-hidden rounded-[10px] px-5 py-9 text-center shadow-[4px_4px_10px_rgba(0,0,0,0.25)]">
                  <CardSurface radiusClass="rounded-[10px]" />
                  <div className="relative z-10 flex flex-col items-center gap-6">
                    <h2
                      className="uppercase text-center relative z-10 text-[20px] font-bold tracking-wider"
                      style={{ color: THEME.lightText, fontFamily: 'Baskerville, "Times New Roman", serif' }}
                    >
                      THÔNG TIN TIỆC CƯỚI
                    </h2>

                    <div
                      className="flex flex-col items-center gap-4 text-center md:gap-5"
                      style={{ fontFamily: 'Baskerville, "Times New Roman", serif', color: THEME.lightText }}
                    >
                      <h3 className="text-[18px] font-normal uppercase md:text-[22px]">
                        Tiệc cưới sẽ diễn ra vào lúc:
                      </h3>
                      <div
                        className="flex w-full max-w-[160px] items-center justify-between text-[13px] uppercase md:text-[15px]"
                        style={{ color: THEME.softText }}
                      >
                        <span>{partyDate.dayOfWeek}</span>
                        <span>|</span>
                        <span>{brideCeremony.receptionTime || "18:00"}</span>
                      </div>

                      <div className="flex items-center justify-center gap-4">
                        <span className="text-[40px] leading-none md:text-[46px] font-bold">
                          {String(partyDate.day).padStart(2, "0")}
                        </span>
                        <div className="h-[46px] w-px" style={{ backgroundColor: THEME.dateDivider }} />
                        <div className="flex flex-col items-start justify-center gap-1 text-left">
                          <span className="text-[12px] uppercase md:text-[15px]">
                            THÁNG {String(partyDate.month).padStart(2, "0")}
                          </span>
                          <span className="text-[18px] md:text-[22px] font-semibold">{partyDate.year}</span>
                        </div>
                      </div>

                      {(brideCeremony.lunarDate || groomCeremony.lunarDate) && (
                        <div className="text-xs uppercase tracking-[0.12em]" style={{ color: THEME.softText }}>
                          {brideCeremony.lunarDate || groomCeremony.lunarDate}
                        </div>
                      )}

                      <div className="mt-2 flex items-center justify-center gap-8">
                        <div className="flex flex-col items-center">
                          <span className="text-xs uppercase tracking-wider" style={{ color: THEME.softText }}>
                            Đón khách
                          </span>
                          <span className="mt-1 text-lg font-medium md:text-xl" style={{ color: THEME.lightText }}>
                            {brideCeremony.ceremonyTime || "17:30"}
                          </span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-xs uppercase tracking-wider" style={{ color: THEME.softText }}>
                            Khai tiệc
                          </span>
                          <span className="mt-1 text-lg font-medium md:text-xl" style={{ color: THEME.lightText }}>
                            {brideCeremony.receptionTime || "18:00"}
                          </span>
                        </div>
                      </div>

                      {/* Countdown */}
                      <div className="mt-2 flex flex-col items-center justify-center">
                        <h4 className="text-xs uppercase tracking-widest" style={{ color: THEME.softText }}>
                          Cùng đếm ngược
                        </h4>
                        <p
                          suppressHydrationWarning
                          className="mt-1.5 text-center text-sm md:text-base font-medium"
                          style={{ color: THEME.lightText }}
                        >
                          {`${countdown.days} ngày ${countdown.hours} giờ ${countdown.minutes} phút ${countdown.seconds} giây`}
                        </p>
                      </div>

                      {/* Month Calendar (za in minimalism-do-dam-template-CtnKm4vC.js) */}
                      <div
                        className="mx-auto mt-3 w-fit max-w-full overflow-hidden rounded-[10px] px-4 pb-4 pt-2"
                        style={{ backgroundColor: THEME.calendarBg }}
                      >
                        <div className="mx-auto w-[260px] max-w-none overflow-hidden rounded-lg md:w-[310px]" style={{ color: THEME.primary }}>
                          <div
                            className="border-b py-2 text-center tracking-wide"
                            style={{
                              borderColor: "rgba(81, 20, 25, 0.25)",
                              fontFamily: 'Baskerville, "Times New Roman", serif',
                              color: THEME.primary,
                              fontSize: 20,
                            }}
                          >
                            {`Tháng ${partyDate.month} / ${partyDate.year}`}
                          </div>
                          <div className="grid grid-cols-7 border-b-2" style={{ borderColor: THEME.primary }}>
                            {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((d) => (
                              <div key={d} className="py-1.5 text-center text-[10px] font-semibold opacity-70 md:text-[11px]">
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
                                    <svg
                                      viewBox="0 0 24 22"
                                      className="absolute inset-0 h-full w-full drop-shadow-sm"
                                      fill={THEME.primary}
                                    >
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

                    {/* RSVP Trigger Button */}
                    <div className="relative z-10 mt-1 flex w-full flex-col items-center justify-center">
                      <button
                        type="button"
                        onClick={() => setRsvpOpen(true)}
                        className="inline-flex cursor-pointer items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold tracking-wide transition-transform hover:scale-[1.03]"
                        style={{
                          backgroundColor: THEME.lightText,
                          color: THEME.primary,
                          fontFamily: 'Baskerville, "Times New Roman", serif',
                        }}
                      >
                        XÁC NHẬN THAM DỰ
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 4: VENUE & GOOGLE MAPS */}
              <div className="relative z-10 overflow-x-clip">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ASSETS.castle}
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-[-1%] w-[158%] max-w-none -translate-x-1/2 object-contain opacity-[0.1]"
                />
                <section className="relative z-10 flex w-full flex-col items-center px-6 pb-8 pt-8">
                  <div className="relative text-center">
                    <h3
                      className="uppercase text-center text-[18px] md:text-[20px] font-bold"
                      style={{ color: THEME.primary, fontFamily: 'Baskerville, "Times New Roman", serif' }}
                    >
                      Tiệc cưới sẽ tổ chức tại
                    </h3>
                    <div
                      className="mx-auto mt-2 max-w-[300px] whitespace-pre-line text-center text-[13px] leading-relaxed md:max-w-[440px] md:text-[14px]"
                      style={{ color: THEME.dressSub, fontFamily: 'Baskerville, "Times New Roman", serif' }}
                    >
                      <strong>{brideCeremony.venue}</strong>
                      {"\n"}
                      {brideCeremony.address}
                    </div>
                  </div>

                  <div className="relative flex w-full flex-col items-center gap-4 md:gap-5">
                    <iframe
                      className="mt-3 h-[268px] w-full max-w-[338px] overflow-hidden rounded-[15px] border md:h-[360px] md:max-w-[560px]"
                      src={mapEmbedSrc}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      style={{ borderColor: THEME.primary }}
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

              {/* SECTION 5: DRESS CODE */}
              <div className="relative z-10 flex flex-col items-center gap-5 px-6 py-10 md:px-10 md:py-12">
                <div className="flex flex-col items-center gap-1">
                  <h2
                    className="text-center text-[20px] font-bold uppercase md:text-[24px]"
                    style={{ color: THEME.primary, fontFamily: 'Baskerville, "Times New Roman", serif' }}
                  >
                    DRESS CODE
                  </h2>
                  <p
                    className="whitespace-pre-line text-center text-sm md:text-base"
                    style={{ color: THEME.dressSub, fontFamily: 'Baskerville, "Times New Roman", serif' }}
                  >
                    Trang phục dự tiệc
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                  {dressCodeColors.map((hex) => (
                    <div
                      key={hex}
                      className="h-10 w-10 rounded-full shadow-md md:h-12 md:w-12"
                      style={{
                        backgroundColor: hex,
                        border: isLightHex(hex) ? `1.5px solid ${THEME.primary}30` : "none",
                      }}
                      title={hex}
                    />
                  ))}
                </div>
              </div>

              {/* SECTION 6: DARK BURGUNDY SCHEDULE TIMELINE CARD WITH CAMERA / CAKE / COOK ICONS */}
              <section className="relative z-10 mx-auto my-4 w-[88%] max-w-[420px] md:max-w-[560px]">
                <FloatingFlower className="-right-[16%] -top-[12%] z-20 w-[30%]" dur={5.2} delay={0.9} />
                <div className="relative overflow-hidden rounded-[10px] px-6 py-9 shadow-[4px_4px_10px_rgba(0,0,0,0.25)]">
                  <CardSurface radiusClass="rounded-[10px]" />
                  <div className="relative z-10 flex flex-col gap-5 px-2">
                    <h2
                      className="uppercase text-center text-[20px] font-bold tracking-[0.03em]"
                      style={{ color: THEME.lightText, fontFamily: 'Baskerville, "Times New Roman", serif' }}
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
                            className="pt-0.5 text-right text-[16px] tabular-nums leading-snug tracking-wide md:text-[17px]"
                            style={{ color: THEME.lightText }}
                          >
                            <span className="relative inline-block">
                              <span
                                aria-hidden="true"
                                className="absolute top-1/2 right-full flex -translate-y-1/2 items-center justify-center"
                                style={{ marginRight: 20 }}
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={item.icon} alt="" className="block h-9 w-9 shrink-0 object-contain" />
                              </span>
                              {item.time}
                            </span>
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
                              style={{ backgroundColor: "rgba(236, 228, 216, 0.4)" }}
                            />
                            <span
                              className="relative block h-2.5 w-2.5 rounded-full"
                              style={{
                                backgroundColor: THEME.lightText,
                                boxShadow: "rgba(236, 228, 216, 0.2) 0px 0px 0px 3px",
                              }}
                            />
                          </span>
                          <span className="text-left text-[13px] md:text-[15px]" style={{ color: THEME.softText }}>
                            {item.label}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </section>

              {/* SECTION 7: GUESTBOOK WITH PAPERNOTE-BACKGROUND.WEBP */}
              <div className="relative z-10 overflow-x-clip">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ASSETS.papernote}
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-[-15px] md:top-[-30px] w-[120%] max-w-[650px] -translate-x-1/2 object-contain opacity-95 drop-shadow-[4px_4px_4px_rgba(0,0,0,0.25)]"
                />
                <section
                  className="relative z-10 px-6 pb-8 pt-[74px] md:pt-[120px]"
                  style={{ color: THEME.primary, fontFamily: 'Baskerville, "Times New Roman", serif' }}
                >
                  <div className="text-center">
                    <h2 className="relative text-[20px] font-bold uppercase md:text-[24px]" style={{ color: THEME.primary }}>
                      Sổ lưu bút
                    </h2>
                  </div>

                  <form className="mx-auto mt-6 w-full max-w-[300px] md:max-w-[380px]" onSubmit={handleWishSubmit}>
                    <div className="rounded-[8px] p-4">
                      <div className="mb-3">
                        <input
                          placeholder="Nhập tên của bạn*"
                          className="w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none"
                          required
                          type="text"
                          value={wishName}
                          onChange={(e) => setWishName(e.target.value)}
                          disabled={wishSubmitting}
                          style={{ borderColor: THEME.primary, color: THEME.primary, backgroundColor: "rgba(255,255,255,0.6)" }}
                        />
                      </div>
                      <textarea
                        placeholder="Nhập lời chúc của bạn*"
                        className="w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none"
                        rows={3}
                        required
                        value={wishMessage}
                        onChange={(e) => setWishMessage(e.target.value)}
                        disabled={wishSubmitting}
                        style={{
                          borderColor: THEME.primary,
                          color: THEME.primary,
                          backgroundColor: "rgba(255,255,255,0.6)",
                          resize: "none",
                        }}
                      />
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-transform hover:scale-105"
                          title="Gợi ý lời chúc hay"
                          onClick={() => {
                            const randomWish = AI_WISH_SUGGESTIONS[Math.floor(Math.random() * AI_WISH_SUGGESTIONS.length)];
                            setWishMessage(randomWish);
                          }}
                          style={{ backgroundColor: "rgba(81, 20, 25, 0.1)", color: THEME.primary }}
                        >
                          <Sparkles className="h-3.5 w-3.5" /> Gợi ý lời chúc
                        </button>
                        <button
                          type="submit"
                          disabled={wishSubmitting}
                          className="cursor-pointer rounded-full px-6 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-transform hover:scale-105 disabled:opacity-60"
                          style={{ backgroundColor: THEME.primary, color: "#ded9d7" }}
                        >
                          {wishSubmitting ? "ĐANG GỬI..." : "GỬI LỜI CHÚC"}
                        </button>
                      </div>
                    </div>
                  </form>

                  {wishSubmitted && (
                    <div
                      className="mx-auto mt-3 max-w-[360px] rounded-lg border px-4 py-2.5 text-center text-sm shadow"
                      style={{ borderColor: `${THEME.primary}99`, backgroundColor: "#f3e8de", color: THEME.primary }}
                    >
                      Cảm ơn bạn! Lời chúc đã được lưu.
                    </div>
                  )}

                  <div className="mx-auto mt-10 max-h-[420px] w-full max-w-[520px] space-y-3 overflow-y-auto pr-1">
                    {wishes.map((w) => (
                      <div
                        key={w.id}
                        className="rounded-[8px] border p-4 text-sm"
                        style={{ borderColor: `${THEME.primary}55`, backgroundColor: "rgba(255, 255, 255, 0.65)" }}
                      >
                        <div className="flex items-start justify-between">
                          <span className="font-semibold" style={{ color: THEME.primary }}>
                            {w.name}
                          </span>
                          <span className="text-xs opacity-70">{w.time}</span>
                        </div>
                        <p className="mt-1.5 leading-relaxed">{w.message}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* SECTION 8: GIFT BOX (wa in minimalism-do-dam-template-CtnKm4vC.js) */}
              <div className="relative z-10 overflow-x-clip">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ASSETS.castle}
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-[6%] w-[155%] max-w-none -translate-x-1/2 object-contain opacity-[0.1]"
                />
                <div className="relative z-10 flex flex-col items-center justify-center py-10 text-center">
                  <h2
                    className="mb-4 text-[20px] font-bold uppercase tracking-wider md:text-[24px]"
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
                    <span className="mt-2 block text-xs uppercase tracking-widest opacity-75">
                      Chạm vào phong bì để mở QR mừng cưới
                    </span>
                  </button>
                </div>
              </div>

              {/* FOOTER */}
              <footer className="relative z-10 flex flex-col items-center px-6 pb-10 text-center">
                <span
                  className="mx-auto flex flex-col items-center gap-1 whitespace-pre-line text-[13px] italic md:max-w-[560px] md:text-[15px]"
                  style={{ fontFamily: 'Baskerville, "Times New Roman", serif', color: THEME.primary }}
                >
                  {wedding.quote || "Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!"}
                </span>
              </footer>
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
            style={{ backgroundColor: "#ecdfd6" }}
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
