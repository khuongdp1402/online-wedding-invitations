import type { Metadata } from "next";
import localFont from "next/font/local";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Font riêng cho trang chủ mới (Winglove landing) — chỉ dùng qua class
// `font-wg-display` / `font-wg-body`, không đổi font mặc định toàn site.
const wgDisplay = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-wg-display",
  display: "swap",
});
const wgBody = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-wg-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://thiepcuoi.online"),
  title: {
    default: "Winglove - Tạo Thiệp Cưới Đẹp & Chuyên Nghiệp",
    template: "%s | Winglove",
  },
  description:
    "Winglove - nền tảng tạo thiệp cưới online đẹp và chuyên nghiệp. Thiết kế thiệp cưới, quản lý khách mời, theo dõi RSVP và nhận lời chúc - tất cả trong một.",
  keywords: [
    "winglove",
    "thiệp cưới online",
    "thiệp cưới",
    "wedding invitation",
    "tạo thiệp cưới",
    "thiệp mời đám cưới",
  ],
  openGraph: {
    title: "Winglove - Tạo Thiệp Cưới Đẹp & Chuyên Nghiệp",
    description:
      "Winglove - nền tảng tạo thiệp cưới online đẹp và chuyên nghiệp. Thiết kế thiệp, quản lý khách mời, theo dõi RSVP.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${wgDisplay.variable} ${wgBody.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
