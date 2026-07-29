# Yêu cầu dự án (Requirements)

## 1. Kiến trúc & Hệ thống (Architecture)
- [ ] Xây dựng Layer Service cho business logic (`lib/services`).
- [ ] Module hóa các tích hợp bên thứ 3 (`lib/integrations`).
- [ ] Hoàn thiện hệ thống Authorization (Role: Admin, User).
- [ ] Dark Mode hỗ trợ toàn bộ Admin UI.

## 2. Hệ thống Template (Template Engine)
- [ ] Định nghĩa Interface Standard cho Template.
- [ ] Hỗ trợ Dynamic Import template từ thư mục cấu hình.
- [ ] Personalization: Tự động trích xuất `name` và `salutation` từ URL.
- [ ] Visual standard: Hiệu ứng mở thiệp, lá rơi, heart, bling-bling.
- [ ] Khối nội dung phổ biến: Banner, Wedding Info, Countdown, Lịch tháng, Gửi lời chúc, RSVP, Gifting.

## 3. Trình soạn thảo (Editor)
- [ ] Giao diện Form (trái) - Live Preview (phải).
- [ ] Kéo thả/Sắp xếp thứ tự các Section.
- [ ] Component Upload ảnh chuẩn hóa theo vị trí.
- [ ] Tùy chỉnh Quote/Lời mời linh hoạt.

## 4. Thanh toán & Thông báo (Payment & Notification)
- [ ] Tích hợp Casso/payOS (Webhook tự động).
- [ ] Trạng thái thanh toán: Draft, Waiting Approval, Paid, Expired.
- [ ] Thông báo đơn hàng & thanh toán thành công qua Telegram Bot.

## 5. Quản trị (Admin)
- [ ] Dashboard quản lý thiệp, người dùng và template.
- [ ] Quản lý giao dịch thanh toán chi tiết.
