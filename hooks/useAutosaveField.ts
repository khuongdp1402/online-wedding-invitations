"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

/** Sau khoảng thời gian này, trạng thái "saved" tự lùi về "idle" (không giữ mãi trên UI). */
const SAVED_RESET_MS = 2000;

/**
 * Autosave 1 field (hoặc 1 nhóm field cùng cột JSON) của thiệp — debounce rồi
 * PATCH qua `PUT /api/weddings/[id]` (route đã hỗ trợ partial body sẵn).
 *
 * `buildPatch(value)` phải trả về đúng phần body cần gửi cho field/nhóm này,
 * ví dụ `(v) => ({ groomName: v })`. Với field thuộc cột JSON lồng nhau
 * (groomParents, groomCeremony...), `value` nên là CẢ object hiện tại (không
 * chỉ leaf vừa đổi) để 2 leaf cùng cột không debounce lệch nhau ghi đè nhau —
 * gọi nơi dùng hook chịu trách nhiệm gộp object trước khi gọi `save()`.
 */
export function useAutosaveField<T>(
  weddingId: string,
  buildPatch: (value: T) => Record<string, unknown>,
  debounceMs = 800
): {
  status: SaveStatus;
  /** Có thay đổi đang chờ gửi (debounce chưa bắn hoặc request đang bay). */
  hasPending: boolean;
  save: (value: T) => void;
  flush: () => void;
} {
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [hasPending, setHasPending] = useState(false);

  const latestValueRef = useRef<T | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const buildPatchRef = useRef(buildPatch);
  buildPatchRef.current = buildPatch;

  const commit = useCallback(
    async (value: T) => {
      setStatus("saving");
      try {
        const res = await fetch(`/api/weddings/${weddingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(buildPatchRef.current(value)),
        });
        if (!res.ok) throw new Error("save failed");
        setStatus("saved");
        setHasPending(false);
        if (savedResetRef.current) clearTimeout(savedResetRef.current);
        savedResetRef.current = setTimeout(() => setStatus("idle"), SAVED_RESET_MS);
      } catch {
        setStatus("error");
        // Giữ hasPending=true khi lỗi — người dùng vẫn còn thay đổi chưa
        // thực sự lưu được, cảnh báo beforeunload cần biết điều này.
      }
    },
    [weddingId]
  );

  const flush = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (latestValueRef.current !== null) {
      const value = latestValueRef.current;
      latestValueRef.current = null;
      void commit(value);
    }
  }, [commit]);

  const save = useCallback(
    (value: T) => {
      latestValueRef.current = value;
      setHasPending(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        const pending = latestValueRef.current;
        latestValueRef.current = null;
        if (pending !== null) void commit(pending);
      }, debounceMs);
    },
    [commit, debounceMs]
  );

  // Flush khi unmount — không mất thay đổi cuối cùng khi rời trang qua route
  // Next.js (không phải đóng tab hẳn, đó là phần beforeunload lo).
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        if (latestValueRef.current !== null) {
          // Gửi nốt bằng navigator.sendBeacon-like best-effort fetch — không
          // await được trong cleanup, chấp nhận best-effort.
          void commit(latestValueRef.current);
        }
      }
      if (savedResetRef.current) clearTimeout(savedResetRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { status, hasPending, save, flush };
}
