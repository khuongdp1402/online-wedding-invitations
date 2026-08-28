# Thiết lập thanh toán QR + thông báo Telegram

Hệ thống dùng chuyển khoản ngân hàng (QR VietQR) làm phương thức thanh toán
duy nhất, đối soát tự động qua **Casso**, và báo kết quả qua **Telegram**.

## 1. Tài khoản ngân hàng nhận tiền

Điền vào `.env`:

```
BANK_NAME="Vietcombank"
BANK_ACCOUNT_NUMBER="0123456789"
BANK_ACCOUNT_HOLDER="NGUYEN VAN A"
```

Đây phải là **tài khoản thật**, đúng tên ngân hàng chuẩn (ví dụ
"Vietcombank", "VPBank", "Techcombank" — không viết tắt lạ) để hệ thống
nhận diện đúng mã ngân hàng và sinh được mã QR. Đây cũng phải là tài khoản
bạn sẽ kết nối với Casso ở bước 2.

## 2. Đăng ký Casso (đối soát tự động)

1. Vào [casso.vn](https://casso.vn), đăng ký tài khoản — gói cá nhân miễn
   phí, không cần đăng ký kinh doanh.
2. Kết nối tài khoản ngân hàng (Casso hỗ trợ đọc SMS Banking hoặc đồng bộ
   trực tiếp tuỳ ngân hàng — làm theo hướng dẫn trên Casso).
3. Vào phần cấu hình **Webhook**, trỏ tới:
   ```
   https://<domain-cua-ban>/api/webhooks/casso
   ```
4. Đặt header xác thực `x-api-key` — tự chọn 1 chuỗi bí mật bất kỳ, rồi
   copy đúng giá trị đó vào `.env`:
   ```
   CASSO_WEBHOOK_SECRET="chuoi-bi-mat-tu-chon"
   ```

Khi có tiền vào đúng tài khoản với đúng nội dung chuyển khoản (mã đơn hệ
thống tự sinh, dạng `TCxxxxxxxx`), Casso sẽ gọi webhook và hệ thống tự động
xác nhận thanh toán + xuất bản thiệp — không cần thao tác gì thêm.

## 3. Tạo Telegram Bot (thông báo)

1. Mở Telegram, chat với **@BotFather**, gõ `/newbot`, đặt tên bot theo
   hướng dẫn. Nhận về 1 chuỗi token — đó là `TELEGRAM_BOT_TOKEN`.
2. Lấy `TELEGRAM_CHAT_ID` bằng 1 trong 2 cách:
   - **Chat riêng với chính bot bạn vừa tạo** (bấm Start), sau đó mở
     `https://api.telegram.org/bot<TOKEN>/getUpdates` trên trình duyệt —
     tìm giá trị `chat.id` trong JSON trả về.
   - Hoặc chat với bot **@userinfobot** để lấy ID Telegram cá nhân của bạn.
3. Điền vào `.env`:
   ```
   TELEGRAM_BOT_TOKEN="123456:ABC-DEF..."
   TELEGRAM_CHAT_ID="123456789"
   ```

Nếu bỏ trống 2 biến này, hệ thống vẫn hoạt động bình thường (chỉ ghi log ra
console thay vì gửi Telegram) — không bắt buộc, nhưng nên bật để biết ngay
khi có giao dịch thành công hoặc cần xử lý tay.

## Khi nào nhận được thông báo Telegram

- ✅ **Xác nhận tự động thành công** — Casso đối soát khớp đúng payment,
  hệ thống tự xuất bản thiệp.
- ⚠️ **Thiếu tiền** — có giao dịch khớp mã đơn nhưng số tiền chưa đủ, cần
  kiểm tra tay.
- ⚠️ **Không khớp payment nào** — có tiền vào tài khoản nhưng nội dung
  chuyển khoản không khớp mã đơn nào đang chờ, cần kiểm tra tay.

Không gửi thông báo khi khách hàng mới bấm "Tiếp tục" để xem mã QR (chưa
chắc đã chuyển tiền) — tránh gây nhiễu.
