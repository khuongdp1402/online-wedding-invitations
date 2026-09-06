import type { Metadata } from "next";
import { PreviewClient } from "./PreviewClient";

type PageProps = {
  params: { slug: string };
};

// Trang xem thử KHÔNG phải link publish của khách — không cho search engine
// lập chỉ mục để tránh nhầm với thiệp thật của bất kỳ ai.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function FullscreenTemplatePreviewPage({ params }: PageProps) {
  return <PreviewClient slug={params.slug} />;
}
