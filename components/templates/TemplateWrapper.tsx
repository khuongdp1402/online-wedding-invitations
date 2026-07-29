"use client";

import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { getTemplate, WeddingData } from "@/lib/template-registry";
import { WeddingTemplateProps } from "@/types/template";
import { Wedding, Template } from "@prisma/client";

interface TemplateWrapperProps {
  templateSlug: string;
  wedding: Wedding;
  template: Template;
  isPreview?: boolean;
}

/**
 * TemplateWrapper - Higher Order Component để wrap các template.
 * Xử lý:
 * 1. Personalization từ URL (?name=...&salutation=...)
 * 2. Cung cấp data chuẩn cho template.
 * 3. Fallback khi template không tồn tại.
 */
export const TemplateWrapper: React.FC<TemplateWrapperProps> = ({
  templateSlug,
  wedding,
  template,
  isPreview = false,
}) => {
  const searchParams = useSearchParams();

  // Lấy thông tin cá nhân hóa từ URL
  const guestName = useMemo(() => {
    return searchParams.get("name") || searchParams.get("guest") || "";
  }, [searchParams]);

  const salutation = useMemo(() => {
    return searchParams.get("salutation") || searchParams.get("xung_ho") || "";
  }, [searchParams]);

  const config = useMemo(() => getTemplate(templateSlug), [templateSlug]);

  if (!config) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-rose-50 p-4 text-center">
        <h1 className="text-2xl font-serif text-rose-900 mb-2">Oops!</h1>
        <p className="text-rose-700">Giao diện mẫu &quot;{templateSlug}&quot; không tồn tại hoặc đã bị gỡ bỏ.</p>
      </div>
    );
  }

  const TemplateComponent = config.component;

  const props: WeddingTemplateProps = {
    wedding: wedding as unknown as WeddingData,
    template: template,
    guestName,
    guestSalutation: salutation,
    isPreview,
  };

  return <TemplateComponent {...props} />;
};
