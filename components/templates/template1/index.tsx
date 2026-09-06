"use client";

import React, { Suspense } from "react";
import type { WeddingTemplateProps } from "@/types/template";
import { InvitationHeaderSection } from "./InvitationHeaderSection";
import { WeddingInfoSection } from "./WeddingInfoSection";
import { CountdownSection } from "./CountdownSection";
import { QuoteSection } from "./QuoteSection";
import { GallerySection } from "./GallerySection";
import { LocationSection } from "./LocationSection";
import { WishesSection } from "./WishesSection";
import { FooterSection } from "./FooterSection";
import { BackgroundMusic } from "./BackgroundMusic";
import { RSVPSection } from "./RSVPSection";
import { GiftingSection } from "./GiftingSection";
import { EditOverlayContext } from "@/components/templates/shared/EditOverlayContext";
import { visibleSectionKeys } from "@/lib/section-config";
import { CLASSIC_BURGUNDY_ALBUM_START_INDEX } from "@/lib/wedding-image-slots";

import { TraditionalCeremonySection } from "./TraditionalCeremonySection";
import { WeddingCardOpening } from "./WeddingCardOpening";
import AnimatedBackground from "./AnimatedBackground";
import { WeddingRibbon } from "./WeddingRibbon";

import type { InvitationData } from "./lib/invitation";

export default function Template1Wrapper({ wedding, mode, guestName, editOverlay }: WeddingTemplateProps) {
  // Determine which ceremony to use based on mode
  const ceremony = mode === "bride" ? wedding.brideCeremony : wedding.groomCeremony;
  const isBrideMode = mode === "bride";
  
  // Format date helper (simple approximation, could use date-fns if needed)
  const ceremonyDate = new Date(ceremony.date);
  const formattedDate = !isNaN(ceremonyDate.getTime()) 
    ? ceremonyDate.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })
    : ceremony.date;

  const mappedData: InvitationData = {
    groom: {
      name: wedding.groomName || "Tên Chú Rể",
      parents: {
        father: wedding.groomParents?.father || "",
        mother: wedding.groomParents?.mother || ""
      }
    },
    bride: {
      name: wedding.brideName || "Tên Cô Dâu",
      parents: {
        father: wedding.brideParents?.father || "",
        mother: wedding.brideParents?.mother || ""
      }
    },
    ceremony: {
      title: mode === "bride" ? "Lễ Vu Quy" : "Lễ Tân Hôn",
      solarDateLabel: formattedDate,
      lunarDateLabel: ceremony.lunarDate || "",
      timeLabel: ceremony.ceremonyTime || "09:00",
      receptionTimeLabel: ceremony.receptionTime || "11:00",
      venueName: ceremony.venue || "Tư Gia",
      address: ceremony.address || "",
      googleMapsUrl: ceremony.googleMapsUrl || "",
      googleMapsEmbedUrl: ceremony.googleMapsUrl || "",
      startsAtISO: ceremony.date || new Date().toISOString()
    },
    quote: wedding.quote || "Hạnh phúc là có bạn bên cạnh trong ngày trọng đại.",
    // gallery[0..5] đã dùng riêng cho hero/countdown/wedding-info/quote (xem
    // structureImages bên dưới) — lưới "Bộ ảnh kỷ niệm" chỉ lấy ảnh từ
    // albumStartIndex trở đi để không lặp lại đúng những ảnh đã hiển thị.
    gallery: wedding.gallery?.slice(CLASSIC_BURGUNDY_ALBUM_START_INDEX).map((src, idx) => {
      const classes = [
        "col-span-12 md:col-span-7 row-span-2",
        "col-span-12 md:col-span-5 row-span-1",
        "col-span-12 md:col-span-5 row-span-2",
        "col-span-12 md:col-span-7 row-span-1",
        "col-span-12 md:col-span-4 row-span-1",
        "col-span-12 md:col-span-8 row-span-1"
      ];
      const parallaxes = [18, 10, 22, 12, 14, 8];
      
      return {
        src,
        alt: `Gallery image ${idx + 1}`,
        className: classes[idx % classes.length],
        parallax: parallaxes[idx % parallaxes.length]
      };
    }) || [],
    gifting: {
      groom: {
        accountName: wedding.gifting?.groom?.accountHolder || "",
        accountNumber: wedding.gifting?.groom?.accountNumber || "",
        bankName: wedding.gifting?.groom?.bankName || "",
        address: wedding.groomCeremony?.address || "",
        phone: ""
      },
      bride: {
        accountName: wedding.gifting?.bride?.accountHolder || "",
        accountNumber: wedding.gifting?.bride?.accountNumber || "",
        bankName: wedding.gifting?.bride?.bankName || "",
        address: wedding.brideCeremony?.address || "",
        phone: ""
      }
    }
  };

  const structureImages = {
    hero: wedding.gallery?.[0] || "",
    countdown: wedding.gallery?.[1] || "",
    weddingA: wedding.gallery?.[2] || "",
    weddingB: wedding.gallery?.[3] || "",
    quoteA: wedding.gallery?.[4] || "",
    quoteB: wedding.gallery?.[5] || "",
  };

  const defaultOrder = [
    "header", "wedding-info", "ceremony-rituals", "countdown", "quote", "gallery", "location", "rsvp", "wishes", "gifting", "footer"
  ];
  const order = visibleSectionKeys(wedding.sectionOrder, defaultOrder);

  const inner = (
    // Chrome toàn site như bản gốc: màn mở phong bì (WeddingCardOpening), nền
    // sparkle bay (AnimatedBackground), dải ruy băng cuộn trang (WeddingRibbon)
    // — trước đây 3 component này tồn tại trong thư mục nhưng không được gắn
    // vào render nên hoàn toàn không xuất hiện trên trang thật.
    <div className="relative overflow-hidden min-h-screen min-h-[100dvh]">
      <Suspense fallback={null}>
        <WeddingCardOpening groomName={wedding.groomName} brideName={wedding.brideName} />
      </Suspense>
      <AnimatedBackground />
      <WeddingRibbon
        groomName={wedding.groomName}
        brideName={wedding.brideName}
        dateLabel={mappedData.ceremony.solarDateLabel}
      />
      <main className="relative z-10 bg-paper min-h-screen">
      {order.map((sectionKey) => {
        let content = null;
        switch (sectionKey) {
          case "header":
          case "card-opening":
            content = (
              <Suspense fallback={null}>
                <InvitationHeaderSection data={mappedData} heroImage={structureImages.hero} isBrideMode={isBrideMode} />
              </Suspense>
            );
            break;
          case "wedding-info":
            content = (
              <WeddingInfoSection
                data={mappedData}
                photo1={structureImages.weddingA}
                photo2={structureImages.weddingB}
                isBrideMode={isBrideMode}
              />
            );
            break;
          case "ceremony-rituals":
            content = <TraditionalCeremonySection />;
            break;
          case "countdown":
            content = <CountdownSection data={mappedData} image={structureImages.countdown} />;
            break;
          case "quote":
            content = (
              <Suspense fallback={null}>
                <QuoteSection data={mappedData} photo1={structureImages.quoteA} photo2={structureImages.quoteB} isBrideMode={isBrideMode} />
              </Suspense>
            );
            break;
          case "gallery":
            if (mappedData.gallery?.length) {
              content = <GallerySection data={mappedData} />;
            }
            break;
          case "location":
            content = <LocationSection data={mappedData} isBrideMode={isBrideMode} />;
            break;
          case "rsvp":
            content = (
              <RSVPSection
                weddingId={wedding.id}
                guestName={guestName}
              />
            );
            break;
          case "wishes":
            content = (
              <WishesSection
                weddingId={wedding.id}
                guestName={guestName}
              />
            );
            break;
          case "gifting":
            content = <GiftingSection data={mappedData} />;
            break;
          case "footer":
            content = (
              <FooterSection
                data={mappedData}
                isFreePlan={wedding.status !== "PUBLISHED"}
              />
            );
            break;
          default:
            content = null;
        }
        if (!content) return null;
        return (
          <div key={sectionKey} data-section={sectionKey}>
            {content}
          </div>
        );
      })}
      {wedding.backgroundMusic && <BackgroundMusic url={wedding.backgroundMusic} />}
      </main>
    </div>
  );

  if (editOverlay?.onSlotClick) {
    return (
      <EditOverlayContext.Provider value={editOverlay}>
        {inner}
      </EditOverlayContext.Provider>
    );
  }

  return inner;
}
