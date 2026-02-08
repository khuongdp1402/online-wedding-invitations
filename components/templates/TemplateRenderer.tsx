"use client";

import {
  getTemplate,
  type WeddingData,
} from "@/lib/template-registry";

type TemplateRendererProps = {
  templateSlug: string;
  wedding: WeddingData;
  mode: "bride" | "groom";
  isDemo: boolean;
  guestName?: string;
  guestSalutation?: string;
};

export function TemplateRenderer({
  templateSlug,
  wedding,
  mode,
  isDemo,
  guestName,
  guestSalutation,
}: TemplateRendererProps) {
  const template = getTemplate(templateSlug);

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Template không tồn tại
          </h1>
          <p className="text-gray-500">
            Không tìm thấy template &quot;{templateSlug}&quot;
          </p>
        </div>
      </div>
    );
  }

  const Component = template.component;

  return (
    <Component
      wedding={wedding}
      mode={mode}
      isDemo={isDemo}
      guestName={guestName}
      guestSalutation={guestSalutation}
    />
  );
}
