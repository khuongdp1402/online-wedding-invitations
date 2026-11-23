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

**Đăng nhập admin (sau seed):** email `ADMIN_EMAIL` (mặc định `admin@example.com`), mật khẩu lấy từ biến `ADMIN_PASSWORD` trong `.env`. Nếu không đặt `ADMIN_PASSWORD`, seed sinh mật khẩu ngẫu nhiên và **in ra log một lần duy nhất** khi tạo admin (xem `docker compose logs app`) — hãy lưu lại. Seed không bao giờ ghi đè mật khẩu của admin đã tồn tại. Vào `/admin`.  
**`NEXTAUTH_SECRET` bắt buộc ở production** — thiếu thì app dừng khi khởi động (không còn secret mặc định).  
User thường: đăng ký tại `/register`, đăng nhập `/login`.

### MinIO (S3 tự host, tùy chọn)

```bash
docker compose --profile storage up -d
```

- API S3: http://localhost:9000  
- Console: http://localhost:9001 (user/pass trong `docker-compose.yml`)  
- Service `createbuckets` tự tạo bucket `wedding-uploads` với policy anonymous `download` (chỉ đọc file theo URL, không cho liệt kê danh sách ảnh). Không dùng policy `public` vì cho phép bất kỳ ai liệt kê toàn bộ ảnh cưới đã upload.

Nếu **không** cấu hình S3, ảnh upload ghi vào `public/uploads/...` (trong container **không có volume** mặc định — recreate container có thể mất file; production nên dùng S3 hoặc gắn volume).

### Asset template trên MinIO (ảnh theme, nhạc, font)

> Hướng dẫn đầy đủ (upload lần đầu, deploy trên máy khác, thêm asset, xử lý sự cố): **[docs/MINIO_ASSETS.md](docs/MINIO_ASSETS.md)**.

Asset template (~550 MB, ~2.700 file) nằm trong `public/`: `images/themes`, `images/template-previews`, `images/giftbox`, `images/envelope`, `music`, `font`, `assets`, `thieponline-assets` (danh sách gốc: [`lib/asset-dirs.json`](lib/asset-dirs.json)). Code và bundle chỉ dùng đường dẫn tương đối (`/images/themes/...`, `/music/...`, `/font/...`), nên có thể chuyển sang MinIO mà không sửa code/DB.

Bucket riêng cho asset (mặc định `wedding-assets`), tách khỏi bucket ảnh người dùng `wedding-uploads`.

**Các bước:**

1. Điền vào `.env` (không commit file này):

   ```bash
   ASSETS_S3_ENDPOINT="https://winglove.phukhuong.io.vn"
   ASSETS_S3_REGION="us-east-1"
   ASSETS_S3_ACCESS_KEY_ID="..."
   ASSETS_S3_SECRET_ACCESS_KEY="..."
   ASSETS_S3_BUCKET="wedding-assets"
   ```

   Access key chỉ cần quyền trên bucket này (CreateBucket nếu để script tự tạo, PutBucketPolicy, PutBucketCors, HeadObject, PutObject).

2. Xem trước (không cần credentials, không gọi mạng):

   ```bash
   node scripts/upload-assets-to-minio.cjs --dry-run
   ```

3. Upload — script tự tạo bucket nếu chưa có, đặt policy anonymous **chỉ `s3:GetObject`** (không cho liệt kê bucket), đặt CORS GET/HEAD cho mọi origin (font tải cross-origin cần CORS), rồi upload song song (8 luồng, có retry) với `Content-Type` đúng và `Cache-Control: public, max-age=31536000, immutable`. File đã tồn tại cùng kích thước sẽ được bỏ qua, nên chạy lại bao nhiêu lần cũng được:

   ```bash
   node scripts/upload-assets-to-minio.cjs
   # tuỳ chọn: --concurrency=16  --force (upload lại tất cả)  --skip-setup (bỏ qua bucket/policy/CORS)
   ```

   Nếu MinIO báo không hỗ trợ `PutBucketCors`, script in ra lệnh `mc` tương đương (`mc admin config set <alias> api cors_allow_origin="*"`). MinIO mặc định đã cho phép mọi origin.

4. Kiểm tra một file: mở `https://winglove.phukhuong.io.vn/wedding-assets/images/themes/song-hy-red/couple.webp` trên trình duyệt.

5. Bật chuyển hướng trong app: thêm vào `.env` của server rồi **restart** (không cần build lại image):

   ```bash
   ASSETS_BASE_URL="https://winglove.phukhuong.io.vn/wedding-assets"
   docker compose up -d app   # hoặc restart process `next start`
   ```

   Cơ chế: `middleware.ts` đọc `ASSETS_BASE_URL` **lúc runtime** (Edge sandbox của `next start`/standalone dùng `process.env` thật của process), và với request có prefix asset sẽ trả **307** sang `ASSETS_BASE_URL + path` (giữ nguyên query). Không dùng `rewrites` trong `next.config.mjs` vì chúng bị “đóng băng” vào `routes-manifest.json` lúc build, mà image Docker build không có `.env`.

6. **Rollback:** xoá/để trống `ASSETS_BASE_URL` rồi restart → app phục vụ lại file trong `public/` như cũ (redirect là 307 nên trình duyệt không lưu vĩnh viễn; cache redirect tối đa 1 giờ).

**Production nên dùng reverse proxy (khuyến nghị):** cho nginx/Caddy trước app chuyển thẳng các prefix asset sang bucket. Trình duyệt vẫn ở cùng origin → không mất một vòng redirect, không cần CORS. Khi đã cấu hình proxy thì không cần đặt `ASSETS_BASE_URL` (request không còn tới Next). Ví dụ nginx:

```nginx
# Asset template -> MinIO bucket wedding-assets (đặt trước location / proxy tới Next)
location ~ ^/(images/themes|images/template-previews|images/giftbox|images/envelope|music|font|assets|thieponline-assets)/ {
    # /images/themes/x.webp -> /wedding-assets/images/themes/x.webp trên MinIO
    rewrite ^(.*)$ /wedding-assets$1 break;
    proxy_pass https://winglove.phukhuong.io.vn;
    proxy_set_header Host winglove.phukhuong.io.vn;
    proxy_ssl_server_name on;
    proxy_http_version 1.1;
    proxy_set_header Authorization "";
    proxy_set_header Cookie "";
    proxy_hide_header Set-Cookie;
    # Tuỳ chọn: cache tại nginx (cần khai báo proxy_cache_path ... keys_zone=assets:10m)
    # proxy_cache assets; proxy_cache_valid 200 30d;
}
```

(Object đã có sẵn `Cache-Control: public, max-age=31536000, immutable` do script đặt khi upload. Nếu MinIO chạy cùng máy, có thể thay `proxy_pass` bằng `http://127.0.0.1:9000` và `Host` tương ứng.)

Caddy tương đương: `handle_path` không dùng được vì cần giữ path, dùng `@assets path_regexp ...` + `rewrite * /wedding-assets{uri}` + `reverse_proxy https://winglove.phukhuong.io.vn { header_up Host {upstream_hostport} }`.

**Git / Docker:** các thư mục asset mới đã được thêm vào `.gitignore` (trừ những file đã được commit từ trước). Khi upload MinIO **thành công 100%**, script `upload-assets-to-minio.cjs` **tự thêm** các thư mục dưới đây vào `.dockerignore` (tắt bằng `--no-dockerignore`) — nhớ commit `.dockerignore` và đặt `ASSETS_BASE_URL` (hoặc proxy) trên server trước khi build lại image, nếu không thiệp sẽ thiếu ảnh/nhạc/font:

```
public/images/themes
public/images/template-previews
public/images/giftbox
public/images/envelope
public/music
public/font
public/assets
public/thieponline-assets
```

Lưu ý: máy/CI clone repo mới sẽ **không có** các file đã ignore — build từ clone sạch bắt buộc phải bật `ASSETS_BASE_URL` (hoặc proxy), hoặc tải lại asset vào `public/` trước khi chạy.

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
| `node scripts/migrate-thieponline-urls.cjs [--apply]` | Đổi URL `*.thieponline.app` đã lưu trong DB (Wedding, Template) sang đường dẫn local trong `public/`. Mặc định dry-run; thêm `--apply` để ghi (backup DB trước). Chạy lại nhiều lần không sao. |
| `node scripts/upload-assets-to-minio.cjs [--dry-run]` | Upload asset template trong `public/` lên bucket MinIO (`ASSETS_S3_*`). Xem mục “Asset template trên MinIO”. |
| `node scripts/download-assets-from-minio.cjs [--dry-run]` | Tải asset template từ bucket MinIO về `public/` (dùng trên máy mới clone, vì asset không có trong git). |

## Tài liệu kiến trúc & agent

- **[Sơ đồ Code Graph & Kiến trúc hệ thống (Mermaid)](docs/CODE_GRAPH.md)**
- [Bộ tài liệu đặc tả kỹ thuật (Specs)](docs/specs/README.md)
- [Hướng dẫn phát triển Template](docs/TEMPLATE_GUIDE.md)
- [Lưu trữ asset template trên MinIO](docs/MINIO_ASSETS.md)
- [AGENTS.md](AGENTS.md)
- [docs/standards/CODE_STYLE.md](docs/standards/CODE_STYLE.md)
