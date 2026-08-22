"use client";

import { useEffect } from "react";

/**
 * Lưới an toàn cuối cùng — bắt lỗi ở cả root layout.
 * Phải tự render <html>/<body> vì nó thay thế toàn bộ layout gốc.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Lỗi nghiêm trọng:", error);
  }, [error]);

  return (
    <html lang="vi">
      <body>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "system-ui, sans-serif",
            padding: "1rem",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "28rem" }}>
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                marginBottom: "1rem",
              }}
            >
              Đã có lỗi xảy ra
            </h1>
            <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
              Hệ thống gặp sự cố ngoài dự kiến. Bạn vui lòng thử lại.
            </p>
            <button
              onClick={reset}
              style={{
                padding: "0.75rem 1.5rem",
                background: "#e11d48",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Thử lại
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
