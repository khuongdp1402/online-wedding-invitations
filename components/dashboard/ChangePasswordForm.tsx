"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "ok" | "err";
    text: string;
  } | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      const res = await fetch("/api/account/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };
      if (!res.ok) {
        setMessage({ type: "err", text: data.error ?? "Có lỗi xảy ra" });
        return;
      }
      setCurrentPassword("");
      setNewPassword("");
      setMessage({ type: "ok", text: "Đã cập nhật mật khẩu." });
    } catch {
      setMessage({ type: "err", text: "Lỗi mạng. Thử lại." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-md">
      <div className="space-y-2">
        <label htmlFor="current-password" className="text-sm font-medium">
          Mật khẩu hiện tại
        </label>
        <Input
          id="current-password"
          type="password"
          autoComplete="current-password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="new-password" className="text-sm font-medium">
          Mật khẩu mới
        </label>
        <Input
          id="new-password"
          type="password"
          autoComplete="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>
      {message && (
        <p
          className={
            message.type === "ok" ? "text-sm text-green-700" : "text-sm text-red-600"
          }
        >
          {message.text}
        </p>
      )}
      <Button type="submit" disabled={loading}>
        {loading ? "Đang lưu…" : "Đổi mật khẩu"}
      </Button>
    </form>
  );
}
