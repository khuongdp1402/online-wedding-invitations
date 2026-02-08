import { Cormorant_Garamond, Great_Vibes } from "next/font/google";

const serif = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const script = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

export default function WeddingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${serif.variable} ${script.variable}`}>
      {children}
    </div>
  );
}
