"use client";

import { Check, AlertCircle, Loader2 } from "lucide-react";
import type { SaveStatus } from "@/hooks/useAutosaveField";

type Props = {
  status: SaveStatus;
  className?: string;
};

/** Trạng thái tệ nhất thắng — 1 pill duy nhất thay cho việc hiện N chỉ báo riêng lẻ. */
export function worstSaveStatus(statuses: SaveStatus[]): SaveStatus {
  if (statuses.includes("error")) return "error";
  if (statuses.includes("saving")) return "saving";
  if (statuses.includes("saved")) return "saved";
  return "idle";
}

export function SaveStatusIndicator({ status, className }: Props) {
  if (status === "idle") return null;

  const content =
    status === "saving" ? (
      <>
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
        <span>Đang lưu...</span>
      </>
    ) : status === "saved" ? (
      <>
        <Check className="w-3.5 h-3.5" />
        <span>Đã lưu</span>
      </>
    ) : (
      <>
        <AlertCircle className="w-3.5 h-3.5" />
        <span>Lưu lỗi, thử lại</span>
      </>
    );

  const color =
    status === "error"
      ? "text-red-600"
      : status === "saving"
        ? "text-gray-500"
        : "text-emerald-600";

  return (
    <div className={`flex items-center gap-1.5 text-xs font-medium ${color} ${className ?? ""}`}>
      {content}
    </div>
  );
}
