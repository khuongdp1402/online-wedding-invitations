import crypto from "crypto";

// ==================== VNPay Configuration ====================

const VNPAY_TMN_CODE = process.env.VNPAY_TMN_CODE || "";
const VNPAY_HASH_SECRET = process.env.VNPAY_HASH_SECRET || "";
const VNPAY_URL =
  process.env.VNPAY_URL ||
  "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
/** Phải trùng route GET thực tế: /api/payment/vnpay (không có /callback). */
const VNPAY_RETURN_URL =
  process.env.VNPAY_RETURN_URL ||
  (() => {
    const base =
      process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
      "http://localhost:3001";
    return `${base}/api/payment/vnpay`;
  })();

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

// ==================== Bank Transfer Info ====================

export const BANK_TRANSFER_INFO = {
  bankName: "Vietcombank",
  accountNumber: "1234567890",
  accountHolder: "NGUYEN VAN A",
  branch: "Chi nhánh Hà Nội",
};

// ==================== VNPay Helpers ====================

function sortObject(obj: Record<string, string>): Record<string, string> {
  const sorted: Record<string, string> = {};
  const keys = Object.keys(obj).sort();
  for (const key of keys) {
    sorted[key] = obj[key];
  }
  return sorted;
}

export type CreateVNPayUrlParams = {
  orderId: string; // Payment ID
  amount: number; // VND
  orderInfo: string; // Description
  ipAddr: string;
  locale?: "vn" | "en";
};

/**
 * Create a VNPay payment URL for redirect
 */
export function createVNPayUrl({
  orderId,
  amount,
  orderInfo,
  ipAddr,
  locale = "vn",
}: CreateVNPayUrlParams): string {
  const date = new Date();
  const createDate = formatDate(date);
  const expireDate = formatDate(new Date(date.getTime() + 15 * 60 * 1000)); // +15 min

  let vnpParams: Record<string, string> = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: VNPAY_TMN_CODE,
    vnp_Locale: locale,
    vnp_CurrCode: "VND",
    vnp_TxnRef: orderId,
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: "other",
    vnp_Amount: String(amount * 100), // VNPay expects amount * 100
    vnp_ReturnUrl: VNPAY_RETURN_URL,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: createDate,
    vnp_ExpireDate: expireDate,
  };

  vnpParams = sortObject(vnpParams);

  const signData = new URLSearchParams(vnpParams).toString();
  const hmac = crypto.createHmac("sha512", VNPAY_HASH_SECRET);
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  vnpParams["vnp_SecureHash"] = signed;

  return `${VNPAY_URL}?${new URLSearchParams(vnpParams).toString()}`;
}

/**
 * Verify VNPay return/IPN callback data
 */
/**
 * VNPay IPN thường gửi application/x-www-form-urlencoded; một số môi trường dùng JSON.
 */
export async function parseVNPayIpnBody(
  request: Request
): Promise<Record<string, string>> {
  const ct = (request.headers.get("content-type") || "").toLowerCase();
  if (ct.includes("application/json")) {
    try {
      const body = (await request.json()) as unknown;
      if (body && typeof body === "object" && !Array.isArray(body)) {
        return body as Record<string, string>;
      }
    } catch {
      /* empty */
    }
    return {};
  }
  const text = await request.text().catch(() => "");
  if (text.trim().startsWith("{")) {
    try {
      return JSON.parse(text) as Record<string, string>;
    } catch {
      return {};
    }
  }
  const params = new URLSearchParams(text);
  const out: Record<string, string> = {};
  params.forEach((v, k) => {
    out[k] = v;
  });
  return out;
}

export function verifyVNPayReturn(
  query: Record<string, string>
): { isValid: boolean; responseCode: string; transactionId: string; orderId: string } {
  const secureHash = query["vnp_SecureHash"];

  // Remove hash fields
  const verifyParams = { ...query };
  delete verifyParams["vnp_SecureHash"];
  delete verifyParams["vnp_SecureHashType"];

  const sorted = sortObject(verifyParams);
  const signData = new URLSearchParams(sorted).toString();
  const hmac = crypto.createHmac("sha512", VNPAY_HASH_SECRET);
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  const isValid = secureHash === signed;
  const responseCode = query["vnp_ResponseCode"] || "";
  const transactionId = query["vnp_TransactionNo"] || "";
  const orderId = query["vnp_TxnRef"] || "";

  return { isValid, responseCode, transactionId, orderId };
}

// ==================== Utilities ====================

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const h = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const s = String(date.getSeconds()).padStart(2, "0");
  return `${y}${m}${d}${h}${min}${s}`;
}

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
