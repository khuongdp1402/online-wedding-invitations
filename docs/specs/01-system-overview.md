# Đặc Tả 01: Tổng Quan Kiến Trúc Hệ Thống (System Overview)

## 1. Tầm Nhìn & Mục Tiêu Dự Án

Dự án **Online Wedding Invitations (Thiệp Cưới Online)** là một nền tảng SaaS hiện đại, cung cấp giải pháp tạo, tùy biến và chia sẻ thiệp cưới điện tử cao cấp với trải nghiệm tương tác trực quan, hiệu ứng thị giác ấn tượng và quy trình thanh toán tự động thông qua ngân hàng Việt Nam.

### Mục Tiêu Cốt Lõi:
1. **Trải nghiệm thị giác Wow**: Thiệp cưới sinh động với hoạt cảnh phong bì mở thiệp, nhạc nền, gallery ảnh nghệ thuật, album cuộn 3D, hiệu ứng đếm ngược, chúc mừng và bản đồ chỉ đường.
2. **Kiến trúc Clean & Modularity**: Tách biệt rõ ràng tầng nghiệp vụ, tầng lưu trữ và các template độc lập. Template có thể mở rộng mà không làm ảnh hưởng đến cấu trúc lõi của hệ thống.
3. **Quy trình người dùng mượt mà (Seamless Flow)**:
   - Khám phá mẫu & trải nghiệm demo trực quan.
   - Tạo thiệp nhanh chóng với dữ liệu mẫu gợi ý.
   - Bộ tùy biến thời gian thực (Form - Live Preview).
   - Xuất bản thiệp & thanh toán tự động qua VietQR/Casso.
   - Chia sẻ thiệp cá nhân hóa tới từng vị khách mời.

---

## 2. Công Nghệ Sử Dụng (Tech Stack)

| Thành Phần | Công Nghệ | Phiên Bản | Ghi Chú |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | 14.2.35 | Server Components, Route Handlers, SSR |
| **Ngôn Ngữ** | TypeScript | 5.x | Type safety nghiêm ngặt |
| **Cơ Sở Dữ Liệu** | PostgreSQL | 15+ | Lưu trữ quan hệ ACID |
| **ORM** | Prisma ORM | 5.22.0 | Schema migration, query builder an toàn kiểu |
| **Xác Thực (Auth)**| NextAuth.js (Auth.js) | v5 beta | Session cookie, JWT, Role-based (USER, ADMIN) |
| **Styling** | Tailwind CSS | 3.4.1 | Utility-first CSS, Custom design tokens |
| **Animation** | Framer Motion & GSAP | 12.x & 3.15 | Hoạt cảnh cuộn, micro-interactions, story scrolling |
| **Lưu Trữ Tệp** | S3 / MinIO / UploadThing | SDK v3 | Upload ảnh cưới, nhạc nền, QR code |
| **Thanh Toán** | Casso Webhook & VietQR | Chuẩn Napas 247 | Nhận biến động số dư tự động, sinh VietQR động |
| **Thông Báo** | Telegram Bot API | Long polling / Webhook | Báo đơn hàng, xác nhận thanh toán tự động |
| **Testing** | Vitest | 3.0.5 | Unit test cho logic giá, VietQR, section config |

---

## 3. Kiến Trúc Ứng Dụng (Layered Architecture)

```
online-wedding-invitations/
├── app/                      # Next.js App Router (Routing & Presentation)
│   ├── (auth)/               # Đăng nhập, đăng ký
│   ├── (marketing)/          # Trang chủ, giới thiệu mẫu (/templates), bảng giá (/pricing)
│   ├── dashboard/            # Khu vực quản lý của người dùng (tạo, sửa, xem, publish thiệp)
│   ├── admin/                # Khu vực quản trị hệ thống (mẫu thiệp, coupons, thống kê)
│   ├── api/                  # REST API Route Handlers
│   └── w/                    # Trang thiệp công khai (/w/[slug]) và preview iframe (/w/preview)
├── components/               # React Components
│   ├── templates/            # Các gói Template thiệp cưới (Classic, Modern, Autumn, Burgundy)
│   ├── dashboard/            # Component cho giao diện Dashboard (Wizard, Editor, PublishPage)
│   ├── marketing/            # Navbar, Footer, TemplateShowcase
│   └── ui/                   # Thành phần UI cơ bản (Button, Dialog, Input, Card, Popover...)
├── lib/                      # Business Logic & Infrastructure Layer
│   ├── prisma.ts             # Prisma Client singleton
│   ├── auth.ts               # Cấu hình NextAuth & callbacks
│   ├── template-registry.ts  # Registry trung tâm quản lý các mẫu thiệp
│   ├── template-pricing.ts   # Công thức tính giá mẫu, giảm giá khuyến mãi
│   ├── payment.ts            # Logic thanh toán, định dạng cú pháp TC<shortId>
│   ├── payment-complete.ts   # Xử lý hoàn tất giao dịch, kích hoạt thiệp an toàn
│   └── vietqr.ts             # Sinh URL ảnh mã QR chuẩn ngân hàng Việt Nam
└── prisma/                   # Lược đồ cơ sở dữ liệu & Seed script
    ├── schema.prisma         # Định nghĩa các Model & Enum
    ├── seed.ts               # Script khởi tạo tài khoản Admin & Template ban đầu
    └── template-defs.cjs     # Nguồn chân lý duy nhất cho danh mục template
```

---

## 4. Bảo Mật & Quy Chuẩn Xử Lý

1. **Bảo vệ Route & Phân Quyền**:
   - `middleware.ts`: Kiểm tra phiên làm việc (Session Token) cho toàn bộ route `/dashboard/*` (yêu cầu đăng nhập) và `/admin/*` (yêu cầu role `ADMIN`).
   - Rate limiting cho các endpoint xác thực (`/api/auth/*`) để phòng chống tấn công brute-force.
2. **Bảo mật Webhook Thanh Toán**:
   - Route `/api/webhooks/casso` yêu cầu header `x-api-key` khớp chính xác với `CASSO_WEBHOOK_SECRET`. Nếu chưa cấu hình, từ chối toàn bộ request với mã lỗi 503.
   - So khớp chính xác cú pháp chuyển khoản `TC<8 ký tự cuối weddingId>` và kiểm tra số tiền `paidAmount >= payment.amount` trước khi xử lý.
3. **Toàn Vẹn Dữ Liệu Thanh Toán (Idempotency)**:
   - Sử dụng Prisma Transaction (`$transaction`) với điều kiện `status: "PENDING"` để ngăn chặn trường hợp cùng một giao dịch bị ghi nhận hai lần nếu Casso retry webhook.
4. **Kiểm Soát Quyền Sở Hữu (Tenancy Isolation)**:
   - Mọi thao tác truy vấn, cập nhật hoặc xóa thiệp đều bắt buộc gắn kèm điều kiện `userId: session.user.id` để đảm bảo người dùng chỉ thao tác trên thiệp của chính mình.
