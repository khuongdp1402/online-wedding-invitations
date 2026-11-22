import type { Metadata } from "next";
import { UserGuideContent } from "@/components/guide/UserGuideContent";

export const metadata: Metadata = {
  title: "Hướng Dẫn Sử Dụng | Bảng Điều Khiển Winglove",
};

export default function DashboardGuidePage() {
  return (
    <div className="max-w-6xl mx-auto pb-12">
      <UserGuideContent isDashboard={true} />
    </div>
  );
}
