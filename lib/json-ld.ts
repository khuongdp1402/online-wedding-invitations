/**
 * Serialize object thành JSON an toàn để nhúng vào `<script type="application/ld+json">`.
 *
 * `JSON.stringify` không escape `<`, nên dữ liệu người dùng như
 * `</script><script>alert(1)</script>` sẽ thoát khỏi thẻ script (stored XSS).
 * Escape `<`, `>`, `&`, U+2028, U+2029 thành `\uXXXX` — vẫn là JSON hợp lệ,
 * parser JSON-LD đọc ra đúng giá trị gốc.
 */
const UNSAFE_CHARS_RE = new RegExp(
  "[<>&" + String.fromCharCode(0x2028, 0x2029) + "]",
  "g"
);

export function safeJsonLd(obj: unknown): string {
  return (JSON.stringify(obj) ?? "null").replace(
    UNSAFE_CHARS_RE,
    (ch) => "\\u" + ch.charCodeAt(0).toString(16).padStart(4, "0")
  );
}
