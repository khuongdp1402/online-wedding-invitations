import crypto from "crypto";

// ==================== VNPay Configuration ====================

const VNPAY_TMN_CODE = process.env.VNPAY_TMN_CODE || "";
const VNPAY_HASH_SECRET = process.env.VNPAY_HASH_SECRET || "";
const VNPAY_URL =
  process.env.VNPAY_URL ||
  "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
const VNPAY_RETURN_URL =
  process.env.VNPAY_RETURN_URL ||
  "http://localhost:3000/api/payment/vnpay/callback";

// ==================== Plan Pricing ====================

export const PLAN_PRICES: Record<string, number> = {
  BASIC: 500000,
  STANDARD: 1000000,
  PREMIUM: 2000000,
};

export const PLAN_DURATION_DAYS: Record<string, number | null> = {
  FREE: 7,
  BASIC: 180, // 6 months
  STANDARD: 365, // 1 year
  PREMIUM: null, // forever
};

export const PLAN_LABELS: Record<string, string> = {
  FREE: "Miễn phí",
  BASIC: "Cơ bản",
  STANDARD: "Tiêu chuẩn",
  PREMIUM: "Cao cấp",
};

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

/**
 * Calculate expiry date based on plan
 */
export function calculateExpiryDate(plan: string): Date | null {
  const days = PLAN_DURATION_DAYS[plan];
  if (days === null || days === undefined) return null; // PREMIUM = forever
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
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
export function generateTransferContent(weddingId: string, plan: string): string {
  const shortId = weddingId.slice(-8).toUpperCase();
  return `TC${shortId} ${plan}`;
}
