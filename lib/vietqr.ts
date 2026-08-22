/**
 * Sinh link ảnh QR chuyển khoản theo chuẩn VietQR (img.vietqr.io).
 *
 * Trước đây các template dùng `api.qrserver.com` với nội dung dạng
 * `STK:xxx|Bank:yyy` — đó chỉ là QR chứa chữ thường, **app ngân hàng Việt Nam
 * không quét chuyển khoản được**. VietQR trả về mã theo chuẩn NAPAS nên quét
 * bằng app ngân hàng sẽ tự điền số tài khoản và tên người nhận.
 */

/**
 * Mã ngân hàng (BIN) theo NAPAS, khớp tên ngân hàng người dùng nhập.
 * Danh sách rút gọn cho các ngân hàng phổ biến ở Việt Nam.
 */
const BANK_BINS: { bin: string; keywords: string[] }[] = [
  { bin: "970436", keywords: ["vietcombank", "vcb", "ngoai thuong", "ngoại thương"] },
  { bin: "970415", keywords: ["vietinbank", "viettinbank", "ctg", "cong thuong", "công thương"] },
  { bin: "970418", keywords: ["bidv", "dau tu", "đầu tư"] },
  { bin: "970405", keywords: ["agribank", "agri", "nong nghiep", "nông nghiệp"] },
  { bin: "970422", keywords: ["mbbank", "mb bank", "quan doi", "quân đội", "mb"] },
  { bin: "970407", keywords: ["techcombank", "tcb", "ky thuong", "kỹ thương"] },
  { bin: "970416", keywords: ["acb", "a chau", "á châu"] },
  { bin: "970432", keywords: ["vpbank", "vp bank", "vpb"] },
  { bin: "970423", keywords: ["tpbank", "tp bank", "tien phong", "tiên phong"] },
  { bin: "970403", keywords: ["sacombank", "stb"] },
  { bin: "970443", keywords: ["shb"] },
  { bin: "970441", keywords: ["vib"] },
  { bin: "970426", keywords: ["msb", "maritime", "hang hai", "hàng hải"] },
  { bin: "970437", keywords: ["hdbank", "hd bank"] },
  { bin: "970431", keywords: ["eximbank", "eib"] },
  { bin: "970414", keywords: ["oceanbank", "ocean"] },
  { bin: "970429", keywords: ["scb"] },
  { bin: "970448", keywords: ["ocb", "phuong dong", "phương đông"] },
  { bin: "970454", keywords: ["vietcapital", "bvbank", "ban viet", "bản việt"] },
  { bin: "970440", keywords: ["seabank", "sea bank"] },
  { bin: "970419", keywords: ["ncb", "quoc dan", "quốc dân"] },
  { bin: "970438", keywords: ["baovietbank", "bao viet", "bảo việt"] },
  { bin: "970400", keywords: ["saigonbank", "sgb"] },
  { bin: "970409", keywords: ["bacabank", "bac a", "bắc á"] },
  { bin: "970425", keywords: ["abbank", "an binh", "an bình"] },
  { bin: "970427", keywords: ["vietabank", "viet a", "việt á"] },
  { bin: "970430", keywords: ["pgbank", "pg bank"] },
  { bin: "970434", keywords: ["indovina", "ivb"] },
  { bin: "970452", keywords: ["kienlongbank", "kien long", "kiên long"] },
  { bin: "546034", keywords: ["cake"] },
  { bin: "963388", keywords: ["timo"] },
];

/** Tìm mã BIN từ tên ngân hàng người dùng nhập tự do. */
export function resolveBankBin(bankName: string): string | null {
  const normalized = bankName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // bỏ dấu tiếng Việt để khớp rộng hơn
    .replace(/\s+/g, " ")
    .trim();
  if (!normalized) return null;

  // Khớp theo RANH GIỚI TỪ, không dùng includes() thuần: viết tắt ngắn như
  // "mb" là chuỗi con của "techcombank" nên includes() sẽ nhận nhầm ngân hàng.
  // Ưu tiên từ khoá dài nhất để "mb bank" thắng "mb".
  const candidates = BANK_BINS.flatMap((bank) =>
    bank.keywords.map((keyword) => ({
      bin: bank.bin,
      keyword: keyword.normalize("NFD").replace(/[̀-ͯ]/g, ""),
    }))
  ).sort((a, b) => b.keyword.length - a.keyword.length);

  for (const { bin, keyword } of candidates) {
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`).test(normalized)) {
      return bin;
    }
  }
  return null;
}

export type VietQrOptions = {
  bankName: string;
  accountNumber: string;
  accountHolder?: string;
  /** Nội dung chuyển khoản gợi ý, ví dụ "Mung cuoi Tung Giang". */
  message?: string;
};

/**
 * Trả về URL ảnh QR quét được bằng app ngân hàng, hoặc `null` nếu thiếu dữ liệu
 * / không nhận diện được ngân hàng (khi đó template nên ẩn phần QR đi thay vì
 * hiện một mã không dùng được).
 */
export function buildVietQrUrl({
  bankName,
  accountNumber,
  accountHolder,
  message,
}: VietQrOptions): string | null {
  const account = accountNumber?.trim();
  if (!account || !bankName?.trim()) return null;

  const bin = resolveBankBin(bankName);
  if (!bin) return null;

  // Định dạng: https://img.vietqr.io/image/{BIN}-{STK}-{template}.png
  const url = new URL(`https://img.vietqr.io/image/${bin}-${account}-compact2.png`);
  if (message?.trim()) url.searchParams.set("addInfo", message.trim());
  if (accountHolder?.trim())
    url.searchParams.set("accountName", accountHolder.trim());

  return url.toString();
}
