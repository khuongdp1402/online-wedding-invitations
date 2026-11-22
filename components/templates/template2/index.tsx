import React from "react";
import type { WeddingTemplateProps } from "@/types/template";
import StoryEngine from "./StoryEngine";
import { weddingData as staticWeddingData } from "./config/weddingData";
import { visibleSectionKeys } from "@/lib/section-config";
import { EditOverlayContext } from "@/components/templates/shared/EditOverlayContext";

// Tỉ lệ số ảnh mỗi chương nên nhận, phỏng theo bộ ảnh gốc (tham khảo
// components/templates/template2/config/weddingData.ts): chapter-1-meet=14,
// chapter-2-journey=8, chapter-3-invitation=2, chapter-6-1-mousetrail=20,
// chapter-6-2-carousel=26. Ảnh của khách được chia theo đúng tỉ lệ này,
// KHÔNG chồng lấn giữa các chương — tránh lặp ảnh và tránh phải fallback
// về ảnh cứng của cặp đôi mẫu khác khi khách chưa upload đủ ảnh.
const CHAPTER_IMAGE_WEIGHTS: Record<string, number> = {
  "chapter-1-meet": 14,
  "chapter-2-journey": 8,
  "chapter-3-invitation": 2,
  "chapter-6-1-mousetrail": 20,
  "chapter-6-2-carousel": 26,
};
const CHAPTER_IMAGE_ORDER = Object.keys(CHAPTER_IMAGE_WEIGHTS);

function allocateGalleryToChapters(gallery: string[] | undefined) {
  const clean = (gallery || []).filter(Boolean);
  const empty: Record<string, string[]> = {};
  CHAPTER_IMAGE_ORDER.forEach((key) => (empty[key] = []));
  if (clean.length === 0) {
    return { hero: undefined, rsvp: undefined, byChapter: empty };
  }

  const hero = clean[0];
  const rsvp = clean.length > 1 ? clean[clean.length - 1] : clean[0];
  // Phần ảnh còn lại (loại bỏ ảnh hero/ảnh đóng) dùng để chia theo tỉ lệ.
  const pool =
    clean.length > 2 ? clean.slice(1, clean.length - 1) : clean.slice(0);

  const byChapter: Record<string, string[]> = {};
  let cursor = 0;
  CHAPTER_IMAGE_ORDER.forEach((key, i) => {
    const remainingWeight = CHAPTER_IMAGE_ORDER.slice(i).reduce(
      (sum, k) => sum + CHAPTER_IMAGE_WEIGHTS[k],
      0
    );
    const remainingPool = pool.length - cursor;
    const isLast = i === CHAPTER_IMAGE_ORDER.length - 1;
    const take = isLast
      ? remainingPool
      : Math.min(
          remainingPool,
          Math.round((CHAPTER_IMAGE_WEIGHTS[key] / remainingWeight) * remainingPool)
        );
    const slice = pool.slice(cursor, cursor + take);
    // Gallery quá ít ảnh (chỉ đủ cho hero/rsvp) — vẫn hiển thị ảnh của
    // chính cặp đôi (hero) thay vì để trống hoặc mượn ảnh người khác.
    byChapter[key] = slice.length > 0 ? slice : [hero];
    cursor += take;
  });

  return { hero, rsvp, byChapter };
}

export default function Template2Wrapper({ wedding, mode, editOverlay }: WeddingTemplateProps) {
  const side = mode === "bride" ? "nhagai" : "nhatrai";
  
  // Convert standard WeddingData to the deeply nested structure expected by StoryEngine
  const formatSolarDate = (dateStr?: string) => {
    if (!dateStr) return "";
    const dateObj = new Date(dateStr);
    if (!isNaN(dateObj.getTime())) {
      return dateObj.toLocaleDateString('vi-VN');
    }
    return dateStr;
  };

  const mappedWeddingData = {
    // Chỉ dùng để hiện watermark khi thiệp chưa xuất bản — không còn khoá
    // section theo gói (xem lib/section-config.ts).
    isPublished: wedding.status === "PUBLISHED",
    audio: {
      bgmUrl: wedding.backgroundMusic || "/Give Me Everything - (Cover by Archer Marsh) [Bridgerton Season 3 (Netflix Series)].mp3",
      autoplay: false,
    },
    couple: {
      groom: {
        name: wedding.groomName,
        firstName: wedding.groomName?.split(' ').pop() || "Chú Rể",
        title: "Quý Nam"
      },
      bride: {
        name: wedding.brideName,
        firstName: wedding.brideName?.split(' ').pop() || "Cô Dâu",
        title: "Thứ Nữ"
      },
      weddingDate: wedding.groomCeremony?.date || new Date().toISOString()
    },
    nhatrai: {
      meta: {
        title: `Thiệp Cưới Tân Hôn - ${wedding.groomName} & ${wedding.brideName}`
      },
      parents: {
        father: wedding.groomParents?.father || "",
        mother: wedding.groomParents?.mother || "",
        address: wedding.groomCeremony?.address || ""
      },
      displayOrder: ["groom", "bride"],
      ceremony: {
        type: "Lễ Tân Hôn",
        dateSolar: formatSolarDate(wedding.groomCeremony?.date),
        dateLunar: wedding.groomCeremony?.lunarDate || "",
        time: wedding.groomCeremony?.ceremonyTime || "",
        address: wedding.groomCeremony?.venue || wedding.groomCeremony?.address || ""
      },
      party: {
        title: "Tiệc Cưới Nhà Trai",
        time: wedding.groomCeremony?.receptionTime || "",
        address: wedding.groomCeremony?.address || ""
      }
    },
    nhagai: {
      meta: {
        title: `Thiệp Cưới Vu Quy - ${wedding.brideName} & ${wedding.groomName}`
      },
      parents: {
        father: wedding.brideParents?.father || "",
        mother: wedding.brideParents?.mother || "",
        address: wedding.brideCeremony?.address || ""
      },
      displayOrder: ["bride", "groom"],
      ceremony: {
        type: "Lễ Vu Quy",
        dateSolar: formatSolarDate(wedding.brideCeremony?.date),
        dateLunar: wedding.brideCeremony?.lunarDate || "",
        time: wedding.brideCeremony?.ceremonyTime || "",
        address: wedding.brideCeremony?.venue || wedding.brideCeremony?.address || ""
      },
      party: {
        title: "Tiệc Cưới Nhà Gái",
        time: wedding.brideCeremony?.receptionTime || "",
        address: wedding.brideCeremony?.address || ""
      }
    },
    gallery: wedding.gallery || [],
    storyChapters: (() => {
      const { hero, rsvp, byChapter } = allocateGalleryToChapters(wedding.gallery);
      const fallback = (id: string) =>
        staticWeddingData.storyChapters?.find((c) => c.id === id)?.images || [];
      return [
        {
          id: "chapter-0-hero",
          title: "The Beginning",
          theme: wedding.backgroundColor || "#000000",
          layoutType: "hero",
          images: hero ? [hero] : ["/images/banner.jpg"],
          quote: "Every love story begins with a single moment.",
        },
        {
          id: "chapter-1-meet",
          title: "The First Glance",
          theme: "#FFF8F0",
          layoutType: "asymmetric-left",
          images: byChapter["chapter-1-meet"].length
            ? byChapter["chapter-1-meet"]
            : fallback("chapter-1-meet"),
          parallaxSpeed: [0.8, 1.2, 0.9, 1.1, 0.85, 1.15],
          quote: wedding.quote || "Ánh mắt chạm nhau, và thế giới như dừng lại.",
        },
        {
          id: "chapter-2-journey",
          title: "Our Journey",
          theme: "#FFF8F0",
          layoutType: "coverflow-journey",
          images: byChapter["chapter-2-journey"].length
            ? byChapter["chapter-2-journey"]
            : fallback("chapter-2-journey"),
          quote: "Mỗi khoảnh khắc bên nhau là một trang truyện đẹp.",
        },
        {
          id: "chapter-3-invitation",
          title: "Lời Mời Trân Trọng",
          theme: "#FDFCF8",
          layoutType: "editorial-invitation",
          images: byChapter["chapter-3-invitation"].length
            ? byChapter["chapter-3-invitation"]
            : fallback("chapter-3-invitation"),
        },
        {
          id: "chapter-6-1-mousetrail",
          title: "Lễ Hằng Thuận",
          theme: "#FDFDFD",
          layoutType: "mousetrail-gallery",
          images: byChapter["chapter-6-1-mousetrail"].length
            ? byChapter["chapter-6-1-mousetrail"]
            : fallback("chapter-6-1-mousetrail"),
          quote: "Sự thiêng liêng trong ngày Hằng Thuận",
        },
        {
          id: "chapter-6-2-carousel",
          title: "Khoảnh khắc",
          quote: "Chút tình gửi gió ngàn mây",
          theme: "#E8E4DB",
          layoutType: "horizontal-marquee",
          images: byChapter["chapter-6-2-carousel"].length
            ? byChapter["chapter-6-2-carousel"]
            : fallback("chapter-6-2-carousel"),
        },
        {
          id: "chapter-6-rsvp",
          title: "Hồi Âm & Lời Chúc",
          theme: "#111111",
          layoutType: "editorial-rsvp",
          images: rsvp ? [rsvp] : fallback("chapter-6-rsvp"),
        },
      ];
    })(),
  };

  // Lọc chương theo khối đang bật + gói. Template này dùng mô hình
  // storyChapters/layoutType riêng, nên map id chương sang key section.
  const CHAPTER_SECTION_KEY: Record<string, string> = {
    "chapter-0-hero": "hero",
    "chapter-1-meet": "story",
    "chapter-2-journey": "journey",
    "chapter-3-invitation": "invitation",
    "chapter-6-1-mousetrail": "mousetrail",
    "chapter-6-2-carousel": "carousel",
    "chapter-6-rsvp": "rsvp",
  };
  const enabledKeys = new Set(
    visibleSectionKeys(
      wedding.sectionOrder,
      ["hero", "story", "journey", "invitation", "mousetrail", "carousel", "rsvp"]
    )
  );
  mappedWeddingData.storyChapters = mappedWeddingData.storyChapters.filter(
    (chapter) => enabledKeys.has(CHAPTER_SECTION_KEY[chapter.id] ?? chapter.id)
  );

  const inner = (
    <div className="w-full h-full bg-black font-sans text-white/90 relative isolate overflow-hidden [transform:translateZ(0)]"
      style={{
        '--font-calligraphy': 'var(--font-script)',
        '--font-serif-display': 'var(--font-heading)',
        fontFamily: 'var(--font-body)',
        // Ghi đè biến màu toàn cục (app/globals.css) bằng combo màu người dùng
        // chọn, để bảng chọn màu có tác dụng với mẫu này.
        '--color-gold': wedding.accentColor ?? '#D4AF37',
        '--color-text-primary': wedding.textColor ?? '#1A1A1A',
        ...(wedding.primaryColor && { '--color-primary': wedding.primaryColor }),
      } as React.CSSProperties}
    >
      <StoryEngine side={side} weddingData={mappedWeddingData} />
    </div>
  );

  // Chỉ bọc Context khi thực sự ở chế độ soạn thảo (preview trong dashboard)
  // — trang công khai /w/[slug] không truyền editOverlay nên không bọc gì,
  // giữ nguyên hành vi hiển thị thường.
  if (editOverlay?.onSlotClick) {
    return (
      <EditOverlayContext.Provider value={editOverlay}>
        {inner}
      </EditOverlayContext.Provider>
    );
  }
  return inner;
}
