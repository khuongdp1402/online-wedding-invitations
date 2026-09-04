# Đặc Tả 08: Quản Trị Hệ Thống & Vận Hành (Admin & Operations)

Tài liệu hướng dẫn quản trị dành cho ban quản trị (Role `ADMIN`) và quy chuẩn vận hành Docker production.

---

## 1. Phân Quyền & Quản Trị Hệ Thống

Hệ thống hỗ trợ 2 vai trò:
- `USER`: Người dùng thông thường (cô dâu, chú rể). Chỉ có quyền thao tác trên thiệp cưới và dữ liệu do chính mình tạo ra.
- `ADMIN`: Quản trị viên toàn hệ thống. Có quyền truy cập khu vực `/admin`:
  - Xem tổng quan doanh thu, số lượng thiệp đã tạo và đang hoạt động.
  - **Quản lý kho mẫu thiệp (`/admin/templates`)**:
    - Kiểm tra trạng thái mapping mã nguồn Component: Đảm bảo mọi mẫu trong cơ sở dữ liệu đều có component tương ứng trong Registry (`lib/template-registry.ts`), báo cảnh báo nếu thiếu component.
    - Thống kê số lượng thiệp cưới đang sử dụng cho từng mẫu.
    - Chỉnh sửa thông tin chi tiết: Tên hiển thị, mô tả, danh mục (Category: `classic`, `modern`, `minimal`, `luxury`, `vintage`), đường dẫn thumbnail, bảng màu mặc định (`primary`, `accent`, `background`).
    - Cập nhật giá bán gốc và giá khuyến mãi theo khoảng thời gian (`salePrice`, `saleStartsAt`, `saleEndsAt`) mà không cần build lại code.
  - **Đồng bộ 1-Click (`/api/admin/templates/sync`)**: Tự động đối chiếu và upsert toàn bộ 10 mẫu thiệp chuẩn từ `prisma/template-defs.cjs` vào database một cách an toàn.
  - Quản lý mã ưu đãi (Coupons): Tạo mã giảm giá, thiết lập số lượt sử dụng tối đa, thời hạn áp dụng và gán cho từng mẫu cụ thể hoặc toàn sàn.
  - Xem log và xác nhận thủ công các giao dịch thanh toán nếu phát sinh trường hợp khách chuyển thiếu tiền hoặc sai cú pháp.

---

## 2. Quy Trình Vận Hành Docker (Docker-First Workflow)

Hệ thống được đóng gói container hóa theo chuẩn production:

```bash
# Khởi động toàn bộ dịch vụ (App, PostgreSQL, MinIO)
docker compose up -d

# Xem log thời gian thực
docker compose logs -f app

# Chạy seed database trong môi trường Docker
docker compose exec app node scripts/seed-docker.cjs
```

---

## 3. Quản Lý Cơ Sở Dữ Liệu (Database Migration & Backup)

- **Cập nhật Schema**:
  ```bash
  # Khi thay đổi prisma/schema.prisma
  npx prisma db push
  # hoặc tạo migration chính thức
  npx prisma migrate dev --name <ten_thay_doi>
  ```
- **Sinh lại Prisma Client**:
  ```bash
  npx prisma generate
  ```
- **Khởi tạo dữ liệu mẫu (Seeding)**:
  ```bash
  npm run db:seed
  ```
  *Lưu ý: Mọi slug template trong `prisma/template-defs.cjs` phải đồng bộ 1:1 với `lib/template-registry.ts`.*

---

## 4. Xử Lý Sự Cố Thường Gặp (Troubleshooting)

1. **Khách đã chuyển tiền nhưng thiệp chưa chuyển PUBLISHED**:
   - Kiểm tra log tại `/api/webhooks/casso`.
   - Kiểm tra xem nội dung chuyển khoản có chứa đúng `TC<8 ký tự cuối weddingId>` không.
   - Kiểm tra số tiền chuyển có đủ với số tiền của đơn hàng không.
   - Nếu khách chuyển đúng nhưng Casso không gọi webhook: Admin truy cập trang thanh toán của thiệp và bấm nút *"Xác nhận thủ công (admin)"* để kích hoạt ngay cho khách.
2. **Ảnh upload không hiển thị**:
   - Kiểm tra cấu hình S3 / MinIO trong file `.env` (`S3_ENDPOINT`, `S3_BUCKET_NAME`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`).
   - Đảm bảo bucket ở chế độ Public Read cho thư mục ảnh thiệp.
