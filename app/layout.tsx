import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://thiepcuoi.online"),
  title: {
    default: "Thiệp Cưới Online - Tạo Thiệp Cưới Đẹp & Chuyên Nghiệp",
    template: "%s | Thiệp Cưới Online",
  },
  description:
    "Nền tảng tạo thiệp cưới online đẹp và chuyên nghiệp. Thiết kế thiệp cưới, quản lý khách mời, theo dõi RSVP và nhận lời chúc - tất cả trong một.",
  keywords: [
    "thiệp cưới online",
    "thiệp cưới",
    "wedding invitation",
    "tạo thiệp cưới",
    "thiệp mời đám cưới",
  ],
  openGraph: {
    title: "Thiệp Cưới Online - Tạo Thiệp Cưới Đẹp & Chuyên Nghiệp",
    description:
      "Nền tảng tạo thiệp cưới online đẹp và chuyên nghiệp. Thiết kế thiệp, quản lý khách mời, theo dõi RSVP.",
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
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
