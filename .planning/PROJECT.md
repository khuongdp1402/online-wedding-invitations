# Project: Thiệp Cưới Online

Nền tảng tạo và quản lý thiệp cưới online cao cấp, linh hoạt và dễ dàng mở rộng.

## Tầm nhìn (Vision)
Xây dựng một hệ thống SaaS cho phép người dùng tạo thiệp cưới cá nhân hóa với trải nghiệm thị giác xuất sắc, kiến trúc code sạch và quy trình thanh toán tự động.

## Mục tiêu chính
- **Cấu trúc Clean Architecture**: Tách biệt logic business và giao diện.
- **Hệ thống Template độc lập**: Cho phép thêm mới template mà không cần redeploy toàn bộ hệ thống.
- **Tích hợp bên thứ 3**: Thanh toán Casso, thông báo Telegram, lưu trữ S3/MinIO.
- **Trình soạn thảo trực quan**: Giao diện Form-Preview (Config trái, View phải).

## Công nghệ sử dụng
- **Frontend/Backend**: Next.js 14 (App Router).
- **ORM**: Prisma.
- **Database**: PostgreSQL.
- **Storage**: MinIO/S3.
- **Auth**: NextAuth v5.
- **Styling**: Tailwind CSS, Framer Motion.

## Tiêu chuẩn chất lượng
- Code tuân thủ TypeScript nghiêm ngặt.
- Template đảm bảo hiệu ứng "Wow" (mở thiệp, falling effects, v.v.).
- Responsive 100% (Mobile first).
