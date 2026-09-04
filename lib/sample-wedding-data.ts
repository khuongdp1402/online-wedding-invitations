import type { WeddingData } from "@/types/template";
import { getTemplate } from "@/lib/template-registry";

export const SAMPLE_WEDDING_DATA: WeddingData = {
  id: "sample-demo-wedding-id",
  slug: "thanh-tung-huong-giang",
  groomName: "Thanh Tùng",
  brideName: "Hương Giang",
  groomParents: {
    father: "Ông Nguyễn Văn Minh",
    mother: "Bà Trần Thị Lan",
  },
  brideParents: {
    father: "Ông Lê Văn Hòa",
    mother: "Bà Phạm Thị Hạnh",
  },
  groomCeremony: {
    date: "Chủ nhật, 22/11/2026",
    lunarDate: "13 tháng 10 năm Bính Ngọ",
    ceremonyTime: "10:30",
    receptionTime: "11:30",
    venue: "Trung Tâm Hội Nghị Ánh Dương",
    address: "120 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh",
    googleMapsUrl: "https://maps.google.com/?q=10.7308,106.7218",
  },
  brideCeremony: {
    date: "Thứ bảy, 21/11/2026",
    lunarDate: "12 tháng 10 năm Bính Ngọ",
    ceremonyTime: "08:00",
    receptionTime: "10:30",
    venue: "Tư Gia Nhà Gái",
    address: "25 Lê Lợi, TP. Biên Hòa, Đồng Nai",
    googleMapsUrl: "https://maps.google.com/?q=10.9509,106.8241",
  },
  quote: "Cảm ơn bạn đã đến và chứng kiến khoảnh khắc hạnh phúc nhất của Thanh Tùng & Hương Giang.",
  gallery: [
    "/templates/classic-burgundy/samples/01.jpg",
    "/templates/classic-burgundy/samples/02.jpg",
    "/templates/classic-burgundy/samples/03.jpg",
    "/templates/classic-burgundy/samples/04.jpg",
    "/templates/classic-burgundy/samples/01.jpg",
    "/templates/classic-burgundy/samples/02.jpg",
    "/templates/classic-burgundy/samples/03.jpg",
    "/templates/classic-burgundy/samples/04.jpg",
  ],
  gifting: {
    groom: {
      bankName: "MBBank",
      accountNumber: "0987654321",
      accountHolder: "NGUYEN THANH TUNG",
    },
    bride: {
      bankName: "Techcombank",
      accountNumber: "1903456789",
      accountHolder: "LE HUONG GIANG",
    },
  },
  primaryColor: "#800020",
  accentColor: "#d4a853",
  backgroundColor: "#faf8f5",
  textColor: "#4A4A4A",
  backgroundMusic: "/background-music.mp3",
  status: "DEMO",
};

export function getSampleWeddingForTemplate(templateSlug: string): WeddingData {
  const config = getTemplate(templateSlug);
  return {
    ...SAMPLE_WEDDING_DATA,
    primaryColor: config?.defaultColors?.primary || SAMPLE_WEDDING_DATA.primaryColor,
    accentColor: config?.defaultColors?.accent || SAMPLE_WEDDING_DATA.accentColor,
    backgroundColor: config?.defaultColors?.background || SAMPLE_WEDDING_DATA.backgroundColor,
  };
}
