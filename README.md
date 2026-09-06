# Thiệp cưới online

Ứng dụng Next.js (App Router) + PostgreSQL + Prisma + NextAuth: tạo thiệp, khách, RSVP, thanh toán, template tùy chỉnh.

## Chạy bằng Docker (khuyến nghị)

```bash
cp .env.example .env
# Điền NEXTAUTH_SECRET (và các biến khác nếu cần)

docker compose up --build -d
```

- **App:** http://localhost:3001  
- **PostgreSQL (từ máy host):** `localhost:5433` — user `wedding`, password `wedding_secret`, database `wedding_db`  
- **Connection string trong container:** đã set sẵn trong `docker-compose.yml` (`DATABASE_URL` trỏ tới service `db`)

Khi container `app` khởi động: chạy **`prisma migrate deploy`** (an toàn cho production), seed admin + template, rồi Next.js.  
Nếu cần đồng bộ schema nhanh như cũ (rủi ro mất dữ liệu khi schema đổi): set `PRISMA_USE_DB_PUSH=true` cho service `app` trong compose hoặc khi chạy container.

**Đăng nhập admin (sau seed):** `admin@example.com` / `Admin@123` — vào `/admin`.  
User thường: đăng ký tại `/register`, đăng nhập `/login`.

### MinIO (S3 tự host, tùy chọn)

```bash
docker compose --profile storage up -d
```

- API S3: http://localhost:9000  
- Console: http://localhost:9001 (user/pass trong `docker-compose.yml`)  
- Tạo bucket trùng tên `S3_BUCKET` trong `.env`, cấu hình policy đọc public nếu cần.

Nếu **không** cấu hình S3, ảnh upload ghi vào `public/uploads/...` (trong container **không có volume** mặc định — recreate container có thể mất file; production nên dùng S3 hoặc gắn volume).

### Biến môi trường quan trọng

Xem [.env.example](.env.example): `NEXTAUTH_URL` / `NEXT_PUBLIC_APP_URL` phải trùng URL bạn mở trình duyệt (Docker mặc định `http://localhost:3001`).

## Chạy local (không Docker)

Cần PostgreSQL (ví dụ port `5433` nếu trùng với compose):

```bash
# .env
DATABASE_URL="postgresql://wedding:wedding_secret@localhost:5433/wedding_db"

npm ci
npx prisma generate
npx prisma migrate dev
npm run dev
```

Mở http://localhost:3000 (hoặc port Next in báo).

## Script hữu ích

| Lệnh | Mô tả |
|------|--------|
| `npm run build` | Build production |
| `npm run db:push` | Đồng bộ schema nhanh (dev) |
| `npm run db:migrate` | Migration dev |
| `npm run db:seed` | Seed TypeScript |
| `npm test` | Chạy test (Vitest) |

## Tài liệu kiến trúc & agent

- **[Sơ đồ Code Graph & Kiến trúc hệ thống (Mermaid)](docs/CODE_GRAPH.md)**
- [Bộ tài liệu đặc tả kỹ thuật (Specs)](docs/specs/README.md)
- [Hướng dẫn phát triển Template](docs/TEMPLATE_GUIDE.md)
- [AGENTS.md](AGENTS.md)
- [docs/standards/CODE_STYLE.md](docs/standards/CODE_STYLE.md)
