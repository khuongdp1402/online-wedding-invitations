/**
 * Gửi thông báo qua Telegram Bot API — dùng để báo admin (chủ dự án) khi có
 * giao dịch thanh toán cần biết (đã tự xác nhận, hoặc cần xem tay).
 *
 * Fail-safe: KHÔNG throw nếu thiếu cấu hình hoặc gọi Telegram lỗi — chỉ log.
 * Luồng thanh toán (đặc biệt webhook Casso) không được phép vỡ vì Telegram
 * gặp sự cố.
 */
export async function sendTelegramMessage(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn(
      "[Telegram] Chưa cấu hình TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID — bỏ qua thông báo."
    );
    return;
  }

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
        }),
        // Webhook Casso cần trả response nhanh — không để 1 lần gọi Telegram
        // chậm làm treo cả webhook.
        signal: AbortSignal.timeout(5000),
      }
    );
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(`[Telegram] Gửi thất bại (${res.status}): ${body}`);
    }
  } catch (err) {
    console.error("[Telegram] Gửi thông báo lỗi:", err);
  }
}
