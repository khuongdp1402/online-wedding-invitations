"use client";

import {
  getTemplate,
  type WeddingData,
  type WeddingTemplateProps,
} from "@/lib/template-registry";
import { resolveTemplateFonts } from "@/lib/template-fonts";
import { DemoWatermark } from "@/components/templates/shared/DemoWatermark";

type TemplateRendererProps = {
  templateSlug: string;
  wedding: WeddingData;
  mode: "bride" | "groom";
  isDemo: boolean;
  guestName?: string;
  guestSalutation?: string;
  editOverlay?: WeddingTemplateProps["editOverlay"];
};

export function TemplateRenderer({
  templateSlug,
  wedding,
  mode,
  isDemo,
  guestName,
  guestSalutation,
  editOverlay,
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

  const { headingFont, bodyFont, scriptFont, googleFontsUrl } =
    resolveTemplateFonts(wedding);

  return (
    <div 
      className="w-full h-full"
      style={{
        '--font-heading': headingFont,
        '--font-body': bodyFont,
        '--font-script': scriptFont,
        '--text-color': wedding.textColor || '#4A4A4A',
      } as React.CSSProperties}
    >
      {googleFontsUrl && (
        <link href={googleFontsUrl} rel="stylesheet" />
      )}
      <Component
      wedding={wedding}
      mode={mode}
      isDemo={isDemo}
      guestName={guestName}
      guestSalutation={guestSalutation}
      editOverlay={editOverlay}
    />
    {isDemo && <DemoWatermark />}
    </div>
  );
}
