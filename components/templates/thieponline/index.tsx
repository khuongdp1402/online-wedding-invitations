import * as React from "react";
import dynamic from "next/dynamic";
import type { WeddingTemplateProps } from "@/types/template";
import type { ThiepOnlineCatalogItem } from "@/lib/thieponline-catalog";
import type { ThiepOnlineClientProps } from "./ThiepOnlineClient";

const DynamicThiepOnlineClient = dynamic<ThiepOnlineClientProps>(
  () => import("./ThiepOnlineClient"),
  { ssr: false }
);

export function createThiepOnlineTemplate(
  item: ThiepOnlineCatalogItem
): React.ComponentType<WeddingTemplateProps> {
  function ThiepOnlineTemplateWrapper(props: WeddingTemplateProps) {
    return <DynamicThiepOnlineClient {...props} item={item} />;
  }

  ThiepOnlineTemplateWrapper.displayName = `ThiepOnline_${item.exportName}`;
  return ThiepOnlineTemplateWrapper;
}
