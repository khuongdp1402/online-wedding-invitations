// ==================== Giới hạn khi chưa xuất bản ====================

/**
 * Thiệp đã PUBLISHED dùng được toàn bộ section của template, không giới hạn
 * số ảnh/khách mời nữa — giá đã trả đúng theo template, không theo gói.
 * Giới hạn dưới đây chỉ áp dụng khi thiệp còn ở trạng thái DRAFT/DEMO, để
 * tránh lạm dụng lúc chưa trả phí.
 */
export const DRAFT_MAX_PHOTOS = 3;
export const DRAFT_MAX_GUESTS = 10;

// ==================== Hiệu lực & gia hạn ====================

/** Số ngày hiệu lực mỗi lần xuất bản/gia hạn — đồng nhất cho mọi template. */
export const WEDDING_VALIDITY_DAYS = 30;

/**
 * Tính hạn sử dụng mới, cộng `WEDDING_VALIDITY_DAYS` ngày kể từ mốc `from`.
 *
 * Gia hạn trước khi hết hạn: truyền `wedding.expiresAt` làm `from` để cộng
 * dồn, không mất phần thời gian còn lại. Gia hạn sau khi đã hết hạn (hoặc
 * xuất bản lần đầu): dùng mặc định `now`.
 */
export function calculateExpiryDate(from: Date = new Date()): Date {
  const date = new Date(from);
  date.setDate(date.getDate() + WEDDING_VALIDITY_DAYS);
  return date;
}

/**
 * `Wedding.status` chỉ được set "EXPIRED" khi có thanh toán mới xảy ra
 * (xem `applyCompletedPayment`) — không có cron nào tự chuyển "PUBLISHED"
 * sang "EXPIRED" khi `expiresAt` trôi qua. Vì vậy mọi nơi cần biết một
 * thiệp có còn hiệu lực hay không phải tính trạng thái "hiệu lực" (effective)
 * on-the-fly qua hàm này, thay vì đọc thẳng `wedding.status`.
 */
export function isWeddingExpired(wedding: {
  status: string;
  expiresAt: Date | string | null;
}): boolean {
  if (wedding.status !== "PUBLISHED") return false;
  if (!wedding.expiresAt) return false;
  return new Date(wedding.expiresAt).getTime() < Date.now();
}

/**
 * Trạng thái hiệu lực thực tế của thiệp, tính cả trường hợp đã quá
 * `expiresAt` nhưng DB chưa (và có thể sẽ không bao giờ) được cập nhật
 * thành "EXPIRED". Dùng hàm này ở mọi nơi cần gate truy cập/hiển thị
 * theo hạn sử dụng thay vì so sánh `status` trực tiếp.
 */
export function getEffectiveWeddingStatus(wedding: {
  status: string;
  expiresAt: Date | string | null;
}): string {
  return isWeddingExpired(wedding) ? "EXPIRED" : wedding.status;
}

// ==================== Bank Transfer Info ====================

/**
 * Tài khoản ngân hàng nhận tiền — đọc từ biến môi trường (chủ dự án tự cấu
 * hình tài khoản cá nhân/doanh nghiệp thật của họ, không hardcode trong
 * code). Cần khớp đúng tài khoản đã kết nối Casso để đối soát tự động hoạt
 * động — xem docs/setup-payment-notify.md.
 */
export const BANK_TRANSFER_INFO = {
  bankName: process.env.BANK_NAME || "MBBank",
  accountNumber: process.env.BANK_ACCOUNT_NUMBER || "0987654321",
  accountHolder:
    process.env.BANK_ACCOUNT_HOLDER || "CONG TY THIEP CUOI WINGLOVE",
};

/**
 * Generate bank transfer content for identification
 */
export function generateTransferContent(
  weddingId: string,
  type: "PUBLISH" | "RENEW" | "TEMPLATE_CHANGE"
): string {
  const shortId = weddingId.slice(-8).toUpperCase();
  return `TC${shortId} ${type}`;
}
