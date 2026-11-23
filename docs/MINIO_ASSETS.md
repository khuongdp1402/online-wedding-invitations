# Lưu trữ asset template trên MinIO

Tài liệu này mô tả cách lưu ảnh, nhạc, font của các mẫu thiệp trên MinIO, cách upload, và cách triển khai lại trên một máy khác.

## 1. Tổng quan

| Thành phần | Nằm ở đâu | Có trong git? |
|---|---|---|
| Code, bundle mẫu (`public/thieponline-bundles/`), ảnh nhỏ của web | Repo git | Có |
| Asset template (~550 MB, ~2.700 file): ảnh theme, ảnh xem trước, nhạc, font | MinIO, bucket `wedding-assets` | **Không** (đã `.gitignore`) |
| Ảnh khách upload (thiệp của từng cặp đôi) | MinIO, bucket `wedding-uploads` (biến `S3_*`) | Không |

Asset template và ảnh khách upload nằm ở **hai bucket riêng**. Bucket `wedding-assets` chỉ chứa file tĩnh của mẫu thiệp, không chứa dữ liệu khách hàng.

Các thư mục asset (danh sách gốc nằm ở [`lib/asset-dirs.json`](../lib/asset-dirs.json)):

```
public/images/themes/            ảnh nền, hoạ tiết từng mẫu
public/images/template-previews/ ảnh xem trước trong danh sách mẫu
public/images/giftbox/           ảnh hộp quà mừng cưới
public/images/envelope/          ảnh phong bì
public/music/                    nhạc nền
public/font/                     font của các mẫu
public/assets/                   font SVN
public/thieponline-assets/       ảnh demo và file lẻ
```

**Quy tắc ánh xạ:** object key trên MinIO là đường dẫn tương đối so với `public/`.

```
public/images/themes/song-hy-red/couple.webp
  → key:  images/themes/song-hy-red/couple.webp
  → URL:  https://winglove.phukhuong.io.vn/wedding-assets/images/themes/song-hy-red/couple.webp
```

Code và database chỉ lưu đường dẫn tương đối như `/images/themes/...`, `/music/...`, `/font/...`. Vì vậy đổi nơi lưu trữ không cần sửa code hay dữ liệu.

**Bucket `wedding-assets` được cấu hình:**
- Ai cũng tải được từng file (`s3:GetObject`), nhưng **không ai liệt kê được** danh sách file.
- Cho phép CORS GET/HEAD, để trình duyệt tải được font từ domain khác.
- Mỗi file có header `Cache-Control: public, max-age=31536000, immutable`, nên trình duyệt cache 1 năm.

## 2. Biến môi trường

Đặt trong `.env` của máy chạy script hoặc của server. **Không commit `.env`.**

```env
# Dùng cho script upload/download (cần access key)
ASSETS_S3_ENDPOINT="https://winglove.phukhuong.io.vn"   # S3 API endpoint, không phải trang console
ASSETS_S3_REGION="us-east-1"
ASSETS_S3_ACCESS_KEY_ID="..."
ASSETS_S3_SECRET_ACCESS_KEY="..."
ASSETS_S3_BUCKET="wedding-assets"

# Dùng cho app khi chạy (không cần access key)
ASSETS_BASE_URL="https://winglove.phukhuong.io.vn/wedding-assets"
```

- **`ASSETS_S3_*`:** chỉ cần trên máy chạy script upload hoặc download.
- **`ASSETS_BASE_URL`:** chỉ cần trên server chạy app. App đọc biến này **lúc chạy**, không phải lúc build, nên image Docker build ở đâu cũng dùng được.

> **Lưu ý về endpoint:** MinIO thường có hai cổng, một cho S3 API (mặc định 9000) và một cho trang console (mặc định 9001). `ASSETS_S3_ENDPOINT` phải là địa chỉ **S3 API**. Nếu `winglove.phukhuong.io.vn` đang trỏ vào trang console thì cần dùng subdomain hoặc cổng của API.

Access key cần các quyền: `CreateBucket`, `PutBucketPolicy`, `PutBucketCors`, `HeadBucket`, `ListBucket`, `GetObject`, `HeadObject`, `PutObject`.

## 3. Upload lần đầu (bắt buộc làm trên máy đang có đủ asset)

Vì asset không có trong git, **lần upload đầu tiên phải chạy trên máy đang có thư mục `public/` đầy đủ**. Đó là máy đã clone asset về (máy dev hiện tại). Sau lần đầu, MinIO trở thành nơi lưu bản gốc.

```bash
npm ci

# 1. Điền ASSETS_S3_* vào .env

# 2. Xem trước: không cần mạng, không upload
node scripts/upload-assets-to-minio.cjs --dry-run
#    → khoảng 2.702 file, 551 MB

# 3. Upload: tự tạo bucket, đặt quyền, CORS; file đã có cùng kích thước thì bỏ qua
node scripts/upload-assets-to-minio.cjs

# 4. Kiểm tra một file
curl -I https://winglove.phukhuong.io.vn/wedding-assets/images/themes/song-hy-red/couple.webp
#    → HTTP 200, Content-Type: image/webp
```

Upload bị ngắt giữa chừng thì chạy lại lệnh ở bước 3, script chỉ upload phần còn thiếu.

**Các tham số khác:**
- `--concurrency=N`: số file upload cùng lúc (mặc định 8).
- `--force`: upload lại toàn bộ.
- `--skip-setup`: bỏ qua bước tạo bucket, policy và CORS.

## 4. Bật MinIO cho app

Trên server, thêm vào `.env` rồi restart app hoặc container:

```env
ASSETS_BASE_URL="https://winglove.phukhuong.io.vn/wedding-assets"
```

**Cách hoạt động:** với các request có đường dẫn bắt đầu bằng thư mục asset (ví dụ `/images/themes/...`, `/music/...`), `middleware.ts` trả về redirect 307 sang `ASSETS_BASE_URL` cộng đường dẫn đó. Các request khác vẫn do app phục vụ bình thường.

**Rollback:** xoá hoặc để trống `ASSETS_BASE_URL` rồi restart. App sẽ phục vụ lại file trong `public/` (nếu server có file).

**Cách tốt hơn cho production:** cấu hình nginx chuyển tiếp các đường dẫn asset sang MinIO. Trình duyệt vẫn ở cùng domain, nên không mất một bước redirect và không cần CORS. Mẫu cấu hình nằm trong [README.md](../README.md), mục "Asset template trên MinIO". Đã dùng nginx thì không cần đặt `ASSETS_BASE_URL`.

## 5. Triển khai trên máy khác

### Trường hợp A: chỉ deploy app, dùng MinIO đã có asset

Đây là trường hợp thường gặp nhất, và **chạy được**. Server **không cần** có file asset.

```bash
git clone https://github.com/khuongdp1402/online-wedding-invitations.git
cd online-wedding-invitations
cp .env.example .env
# Điền NEXTAUTH_SECRET, ADMIN_PASSWORD, DATABASE_URL..., và:
#   ASSETS_BASE_URL="https://winglove.phukhuong.io.vn/wedding-assets"
docker compose up --build -d
```

Điều kiện: bucket `wedding-assets` đã được upload (mục 3).

### Trường hợp B: máy khác cần upload lên một MinIO hoặc bucket khác

Máy mới clone repo sẽ **không có** file asset, nên phải lấy file về trước khi upload. Có hai cách:

**Cách 1: tải từ MinIO hiện tại về** (khi MinIO cũ đã có asset):

```bash
# .env trỏ vào MinIO CŨ
node scripts/download-assets-from-minio.cjs --dry-run
node scripts/download-assets-from-minio.cjs          # tải về public/

# Đổi .env sang MinIO MỚI (ASSETS_S3_ENDPOINT / key / bucket), rồi:
node scripts/upload-assets-to-minio.cjs
```

**Cách 2: chép thư mục từ máy đang có asset** (khi chưa từng upload lên MinIO nào):

```bash
# Trên máy có asset (chạy trong thư mục repo)
tar -czf wedding-assets.tar.gz -C public images/themes images/template-previews \
  images/giftbox images/envelope music font assets thieponline-assets

# Chép file .tar.gz sang máy mới, giải nén vào public/
tar -xzf wedding-assets.tar.gz -C public
node scripts/upload-assets-to-minio.cjs
```

### Trường hợp C: chạy dev trên máy mới mà không bật MinIO

Chạy `node scripts/download-assets-from-minio.cjs` để có file trong `public/`, rồi chạy `npm run dev` như bình thường. Cách khác là đặt `ASSETS_BASE_URL` trong `.env` để dev dùng thẳng MinIO.

## 6. Thêm hoặc sửa asset

1. Đặt file mới vào đúng thư mục trong `public/`, ví dụ `public/images/themes/<mau-moi>/`.
2. Chạy `node scripts/upload-assets-to-minio.cjs`. Script chỉ upload file mới hoặc file có kích thước khác.
3. **Sửa nội dung một file mà giữ nguyên tên:** trình duyệt đang cache file cũ 1 năm, nên tốt nhất là **đổi tên file**. Nếu bắt buộc giữ tên thì chạy với `--force`, rồi thêm `?v=2` vào đường dẫn trong code.
4. Thư mục asset mới (ngoài danh sách ở mục 1) phải được thêm vào [`lib/asset-dirs.json`](../lib/asset-dirs.json) và `.gitignore`.

## 7. Xử lý sự cố

| Triệu chứng | Nguyên nhân / cách xử lý |
|---|---|
| Ảnh lỗi 404 sau khi bật `ASSETS_BASE_URL` | File chưa được upload, chạy lại script upload. Kiểm tra URL bằng `curl -I`. |
| 403 Forbidden khi mở URL file | Bucket chưa có quyền đọc công khai. Chạy lại script upload, không dùng `--skip-setup`. |
| Font hiển thị sai, console báo lỗi CORS | MinIO chưa cho phép CORS. Chạy lệnh `mc` mà script in ra, hoặc chuyển sang dùng nginx. |
| Script báo thiếu biến môi trường | Điền `ASSETS_S3_*` vào `.env`. |
| Script báo `SignatureDoesNotMatch` hoặc lỗi kết nối | Endpoint đang trỏ vào trang console thay vì S3 API, hoặc key sai. |
| Thiệp cũ trong DB vẫn trỏ về link thieponline.app | Chạy `node scripts/migrate-thieponline-urls.cjs` (xem trước), rồi thêm `--apply`. |

## 8. Checklist khi deploy

- [ ] Bucket `wedding-assets` đã upload đủ (`--dry-run` của script download báo "Can tai: 0" trên máy có đủ file)
- [ ] `curl -I` một file asset trả về 200
- [ ] Server có `ASSETS_BASE_URL` (hoặc đã cấu hình nginx)
- [ ] `.env` của server có `NEXTAUTH_SECRET`, `ADMIN_PASSWORD`
- [ ] Đã chạy seed để cập nhật giá mẫu (`npm run db:seed` hoặc restart container)
- [ ] (Nếu DB có dữ liệu cũ) đã chạy `scripts/migrate-thieponline-urls.cjs --apply`
