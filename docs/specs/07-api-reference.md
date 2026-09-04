# Đặc Tả 07: Danh Mục REST API Reference (API Endpoints)

Tất cả các API route handlers trong dự án được tổ chức tại thư mục `app/api/`. Định dạng trao đổi dữ liệu chuẩn là **JSON**.

---

## 1. Authentication (`/api/auth`)

| Phương Thức | Endpoint | Mô Tả | Yêu Cầu Header / Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Đăng ký tài khoản mới bằng email và mật khẩu | Public (Có Rate Limiting theo IP) |
| `ALL` | `/api/auth/[...nextauth]` | Điểm tích hợp phiên đăng nhập NextAuth (Credentials, Session, SignOut) | Cookie Session |

---

## 2. Weddings (`/api/weddings`)

### `POST /api/weddings`
Tạo một bản ghi thiệp cưới mới ở trạng thái `DRAFT`.
- **Auth**: Bắt buộc đăng nhập.
- **Request Body**:
  ```json
  {
    "templateId": "cm5k...",
    "slug": "thanhtung-huonggiang",
    "groomName": "Thanh Tùng",
    "brideName": "Hương Giang",
    "groomParents": { "father": "Ông Nguyễn Văn A", "mother": "Bà Trần Thị B" },
    "brideParents": { "father": "Ông Lê Văn C", "mother": "Bà Phạm Thị D" },
    "groomCeremony": {
      "date": "Chủ nhật, 22/11/2026",
      "lunarDate": "13 tháng 10 năm Bính Ngọ",
      "ceremonyTime": "10:30",
      "receptionTime": "11:30",
      "venue": "Trung Tâm Hội Nghị Ánh Dương",
      "address": "120 Nguyễn Văn Linh, Quận 7, TP. HCM",
      "googleMapsUrl": "https://maps.google.com/..."
    },
    "brideCeremony": { ... },
    "quote": "Hạnh phúc là có bạn bên cạnh trong ngày trọng đại.",
    "gallery": []
  }
  ```
- **Response (200)**: `{ "wedding": { "id": "...", "slug": "..." } }`

### `GET /api/weddings/[id]`
Lấy toàn bộ thông tin chi tiết của thiệp cưới (chỉ chủ sở hữu).

### `PATCH /api/weddings/[id]`
Cập nhật thông tin thiệp cưới (thông tin cặp đôi, màu sắc, phông chữ, thứ tự section, nhạc nền, SEO). Lưu ý: trường `status` không nhận từ client để ngăn chặn việc tự ý publish trái phép.

### `DELETE /api/weddings/[id]`
Xóa thiệp cưới và tự động dọn dẹp các tệp ảnh đính kèm trên storage.

### `GET /api/weddings/[id]/publish-quote?coupon={code}`
Tính toán giá xuất bản hoặc gia hạn cho thiệp cưới:
- **Response (200)**:
  ```json
  {
    "templatePrice": 500000,
    "effectivePrice": 500000,
    "isOnSale": false,
    "saleEndsAt": null,
    "isRenewal": false,
    "currentExpiresAt": null,
    "couponPreview": {
      "valid": true,
      "discount": 50000,
      "finalAmount": 450000
    }
  }
  ```

---

## 3. Template Catalog (`/api/templates`)

### `GET /api/templates`
Lấy danh sách các mẫu thiệp cưới đang hoạt động trên hệ thống kèm giá bán hiện tại và thông tin khuyến mãi (nếu có).
- **Auth**: Public.

---

## 4. Payments (`/api/payment` & `/api/webhooks`)

### `POST /api/payment/create`
Khởi tạo đơn thanh toán xuất bản / gia hạn thiệp.
- **Request Body**:
  ```json
  {
    "weddingId": "cm5k...",
    "method": "bank_transfer",
    "couponCode": "DISCOUNT50"
  }
  ```
- **Response (200)**:
  ```json
  {
    "payment": { "id": "pm_123", "amount": 450000, "status": "PENDING" },
    "bankInfo": {
      "bankName": "MBBank",
      "accountNumber": "0987654321",
      "accountHolder": "NGUYEN VAN A",
      "amount": 450000,
      "transferContent": "TC12345678 PUBLISH",
      "qrUrl": "https://img.vietqr.io/image/..."
    }
  }
  ```

### `GET /api/payment/[paymentId]/status`
Kiểm tra trạng thái của đơn thanh toán (dành cho client polling 10s/lần).
- **Response (200)**: `{ "status": "PENDING" | "COMPLETED" | "FAILED" }`

### `POST /api/webhooks/casso`
Nhận thông báo biến động số dư ngân hàng từ Casso.
- **Header**: `x-api-key: <CASSO_WEBHOOK_SECRET>`
- **Response (200)**: `{ "success": true, "processed": 1, "skipped": [] }`

### `POST /api/payment/webhook`
Route hỗ trợ môi trường dev / admin để xác nhận thanh toán thủ công mà không cần chuyển khoản tiền thật.
- **Auth**: Role `ADMIN` hoặc Header `x-api-key: <ADMIN_API_KEY>`.

---

## 5. Public Interactions (`/api/rsvp` & `/api/wishes`)

### `POST /api/rsvp`
Khách mời gửi phản hồi tham dự từ trang thiệp `/w/[slug]`.
- **Request Body**:
  ```json
  {
    "weddingId": "cm5k...",
    "guestId": "optional_id",
    "name": "Hoàng Long",
    "phone": "0901234567",
    "side": "GROOM",
    "rsvpStatus": "ACCEPTED",
    "numberOfGuests": 2
  }
  ```

### `POST /api/wishes`
Khách mời gửi lời chúc mừng trăm năm hạnh phúc.
- **Request Body**:
  ```json
  {
    "weddingId": "cm5k...",
    "name": "Hoàng Long",
    "message": "Chúc hai bạn trăm năm hạnh phúc, sớm có quý tử!",
    "attendance": "Tham dự"
  }
  ```

---

## 6. File Upload (`/api/upload` & `/api/weddings/[id]/upload`)

Xử lý tải tệp ảnh cưới, ảnh đại diện và file âm thanh lên hệ thống lưu trữ S3/MinIO. Trả về `publicUrl` để gắn vào album hoặc trường âm nhạc của thiệp.
