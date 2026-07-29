"use client";

import React from "react";
import type { WeddingTemplateProps } from "@/types/template";
import StoryEngine from "./StoryEngine";

export default function Template2Wrapper({ wedding, mode }: WeddingTemplateProps) {
  const side = mode === "bride" ? "nhagai" : "nhatrai";
  
  // Convert standard WeddingData to the deeply nested structure expected by StoryEngine
  const mappedWeddingData = {
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
    [side]: {
      meta: {
        title: `Thiệp Cưới - ${wedding.groomName} & ${wedding.brideName}`
      },
      parents: {
        father: mode === "bride" ? wedding.brideParents?.father : wedding.groomParents?.father,
        mother: mode === "bride" ? wedding.brideParents?.mother : wedding.groomParents?.mother,
        address: mode === "bride" ? wedding.brideCeremony?.address : wedding.groomCeremony?.address
      },
      displayOrder: mode === "bride" ? ["bride", "groom"] : ["groom", "bride"],
      ceremony: {
        type: mode === "bride" ? "Lễ Vu Quy" : "Lễ Tân Hôn",
        dateSolar: new Date(mode === "bride" ? wedding.brideCeremony?.date : wedding.groomCeremony?.date || Date.now()).toLocaleDateString('vi-VN'),
        dateLunar: mode === "bride" ? wedding.brideCeremony?.lunarDate : wedding.groomCeremony?.lunarDate,
        time: mode === "bride" ? wedding.brideCeremony?.ceremonyTime : wedding.groomCeremony?.ceremonyTime,
        address: mode === "bride" ? wedding.brideCeremony?.venue : wedding.groomCeremony?.venue
      },
      party: {
        title: mode === "bride" ? "Tiệc Cưới Nhà Gái" : "Tiệc Cưới Nhà Trai",
        time: mode === "bride" ? wedding.brideCeremony?.receptionTime : wedding.groomCeremony?.receptionTime,
        address: mode === "bride" ? wedding.brideCeremony?.address : wedding.groomCeremony?.address
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
        images: wedding.gallery?.slice(1, 10) || [],
        parallaxSpeed: [0.8, 1.2, 0.9, 1.1, 0.85, 1.15],
        quote: wedding.quote || "Ánh mắt chạm nhau, và thế giới như dừng lại.",
      },
      {
        id: "chapter-2-journey",
        title: "Our Journey",
        theme: "#FFF8F0",
        layoutType: "coverflow-journey",
        images: wedding.gallery?.slice(0, 8) || [],
        quote: "Mỗi khoảnh khắc bên nhau là một trang truyện đẹp.",
      },
      {
        id: "chapter-3-invitation",
        title: "Lời Mời Trân Trọng",
        theme: "#FDFCF8",
        layoutType: "editorial-invitation",
        images: wedding.gallery?.slice(0, 2) || [],
      },
      {
        id: "chapter-6-rsvp",
        title: "Hồi Âm & Lời Chúc",
        theme: "#111111",
        layoutType: "editorial-rsvp",
        images: wedding.gallery?.length ? [wedding.gallery[wedding.gallery.length - 1]] : [],
      }
    ]
  };

  return <StoryEngine side={side} weddingData={mappedWeddingData} />;
}
