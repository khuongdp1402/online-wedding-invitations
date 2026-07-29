"use client";

import { createContext, useContext } from "react";

export type EditOverlayValue = {
  highlightSlot: string | null;
  onSlotClick?: (slotKey: string) => void;
};

export const EditOverlayContext = createContext<EditOverlayValue | null>(null);

export function useEditOverlay() {
  return useContext(EditOverlayContext);
}

export function editSlotClass(
  ctx: EditOverlayValue | null,
  slotKey: string,
  base: string
): string {
  if (!ctx?.onSlotClick) return base;
  const active = ctx.highlightSlot === slotKey;
  return [
    base,
    "relative transition-shadow cursor-pointer",
    active ? "ring-4 ring-rose-500 ring-offset-2 ring-offset-transparent z-[5]" : "",
    "hover:ring-2 hover:ring-rose-400/70",
  ]
    .filter(Boolean)
    .join(" ");
}
