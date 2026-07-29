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

import type { InvitationData } from "./lib/invitation";

export default function Template1Wrapper({ wedding, mode }: WeddingTemplateProps) {
  // Determine which ceremony to use based on mode
  const ceremony = mode === "bride" ? wedding.brideCeremony : wedding.groomCeremony;
  
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
    gallery: wedding.gallery?.map((src, idx) => {
      // Create some masonry-like class distribution
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

  // Section rendering loop based on wedding.sectionOrder
  const defaultOrder = [
    "header", "wedding-info", "countdown", "quote", "gallery", "location", "rsvp", "wishes", "gifting", "footer"
  ];
  const order = wedding.sectionOrder?.length ? wedding.sectionOrder : defaultOrder;

  return (
    <main className="bg-paper min-h-screen">
      {order.map((sectionKey) => {
        switch (sectionKey) {
          case "header":
          case "card-opening":
            return (
              <Suspense key={sectionKey} fallback={null}>
                <InvitationHeaderSection data={mappedData} />
              </Suspense>
            );
          case "wedding-info":
            return <WeddingInfoSection key={sectionKey} data={mappedData} />;
          case "countdown":
            return <CountdownSection key={sectionKey} data={mappedData} />;
          case "quote":
            return (
              <Suspense key={sectionKey} fallback={null}>
                <QuoteSection data={mappedData} />
              </Suspense>
            );
          case "gallery":
            if (!wedding.gallery?.length) return null;
            return <GallerySection key={sectionKey} data={mappedData} />;
          case "location":
            return <LocationSection key={sectionKey} data={mappedData} />;
          case "rsvp":
            return <RSVPSection key={sectionKey} />;
          case "wishes":
            return <WishesSection key={sectionKey} />;
          case "gifting":
            return <GiftingSection key={sectionKey} data={mappedData} />;
          case "footer":
            return <FooterSection key={sectionKey} data={mappedData} />;
          default:
            return null;
        }
      })}
      {wedding.backgroundMusic && <BackgroundMusic url={wedding.backgroundMusic} />}
    </main>
  );
}
