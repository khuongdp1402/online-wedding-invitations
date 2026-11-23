/** Hiển thị giá mẫu cho khách: 0đ → "Miễn phí", còn lại "199.000đ". */
export function formatTemplatePrice(amount: number): string {
  return amount <= 0 ? "Miễn phí" : `${amount.toLocaleString("vi-VN")}đ`;
}
