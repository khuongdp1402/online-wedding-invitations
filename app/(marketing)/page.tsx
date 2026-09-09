import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { HeroSection } from "@/components/marketing/winglove/HeroSection";
import { FeaturedTemplatesSection } from "@/components/marketing/winglove/FeaturedTemplatesSection";
import { TemplatesSection } from "@/components/marketing/winglove/TemplatesSection";
import { StatsBand } from "@/components/marketing/winglove/StatsBand";
import { Testimonials } from "@/components/marketing/winglove/Testimonials";
import { FaqSection } from "@/components/marketing/winglove/FaqSection";
import { CtaBand } from "@/components/marketing/winglove/CtaBand";
import { RailTimeline } from "@/components/marketing/winglove/RailTimeline";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Winglove",
  url: "https://winglove.vn",
  logo: "https://winglove.vn/winglove-mark.svg",
  description:
    "Winglove là nền tảng tạo thiệp cưới online với 10 phong cách thiệp, quản lý khách mời, RSVP, lời chúc và mừng cưới QR — thuộc hệ sinh thái KWings.",
  sameAs: [],
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-winglove-ivory font-wg-body text-winglove-ink">
      <Navbar />

      <div className="pt-16">
        <HeroSection />

        <RailTimeline
          items={[
            { icon: "▶", content: <FeaturedTemplatesSection /> },
            { icon: "♡", content: <TemplatesSection /> },
            { icon: "✦", content: <StatsBand /> },
            { icon: "❝", content: <Testimonials /> },
            { icon: "?", content: <FaqSection /> },
          ]}
        />

        <CtaBand />
      </div>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </div>
  );
}
