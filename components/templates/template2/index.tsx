import React from "react";
import type { WeddingTemplateProps } from "@/types/template";
import StoryEngine from "./StoryEngine";
import { weddingData as staticWeddingData } from "./config/weddingData";
import { visibleSectionKeys } from "@/lib/section-config";
import { EditOverlayContext } from "@/components/templates/shared/EditOverlayContext";

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
    storyChapters: [
      {
        id: "chapter-0-hero",
        title: "The Beginning",
        theme: wedding.backgroundColor || "#000000",
        layoutType: "hero",
        images: wedding.gallery?.length ? [wedding.gallery[0]] : ["/images/banner.jpg"],
        quote: "Every love story begins with a single moment.",
      },
      {
        id: "chapter-1-meet",
        title: "The First Glance",
        theme: "#FFF8F0",
        layoutType: "asymmetric-left",
        images: wedding.gallery && wedding.gallery.length > 2
          ? wedding.gallery.slice(1, 10)
          : staticWeddingData.storyChapters?.find(c => c.id === "chapter-1-meet")?.images || [],
        parallaxSpeed: [0.8, 1.2, 0.9, 1.1, 0.85, 1.15],
        quote: wedding.quote || "Ánh mắt chạm nhau, và thế giới như dừng lại.",
      },
      {
        id: "chapter-2-journey",
        title: "Our Journey",
        theme: "#FFF8F0",
        layoutType: "coverflow-journey",
        images: wedding.gallery && wedding.gallery.length > 5
          ? wedding.gallery.slice(0, 8)
          : staticWeddingData.storyChapters?.find(c => c.id === "chapter-2-journey")?.images || [],
        quote: "Mỗi khoảnh khắc bên nhau là một trang truyện đẹp.",
      },
      {
        id: "chapter-3-invitation",
        title: "Lời Mời Trân Trọng",
        theme: "#FDFCF8",
        layoutType: "editorial-invitation",
        images: wedding.gallery && wedding.gallery.length > 2
          ? wedding.gallery.slice(0, 2)
          : staticWeddingData.storyChapters?.find(c => c.id === "chapter-3-invitation")?.images || [],
      },
      {
        id: "chapter-6-1-mousetrail",
        title: "Lễ Hằng Thuận",
        theme: "#FDFDFD",
        layoutType: "mousetrail-gallery",
        images: wedding.gallery && wedding.gallery.length > 10
          ? wedding.gallery.slice(10, 20)
          : staticWeddingData.storyChapters?.find(c => c.id === "chapter-6-1-mousetrail")?.images || [],
        quote: "Sự thiêng liêng trong ngày Hằng Thuận",
      },
      {
        id: "chapter-6-2-carousel",
        title: "Khoảnh khắc",
        quote: "Chút tình gửi gió ngàn mây",
        theme: "#E8E4DB",
        layoutType: "horizontal-marquee",
        images: wedding.gallery && wedding.gallery.length > 15
          ? wedding.gallery.slice(15, 30)
          : staticWeddingData.storyChapters?.find(c => c.id === "chapter-6-2-carousel")?.images || [],
      },
      {
        id: "chapter-6-rsvp",
        title: "Hồi Âm & Lời Chúc",
        theme: "#111111",
        layoutType: "editorial-rsvp",
        images: wedding.gallery?.length
          ? [wedding.gallery[wedding.gallery.length - 1]]
          : staticWeddingData.storyChapters.find(c => c.id === "chapter-6-rsvp")?.images || [],
      }
    ]
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
    <div className="w-full h-full bg-black font-sans text-white/90 overflow-hidden"
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
