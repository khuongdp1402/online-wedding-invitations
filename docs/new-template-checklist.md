# Checklist: thêm 1 template mới

## Bước 1 — Chạy script scaffold

```
npm run new-template -- <slug> "<Tên hiển thị>"
```

Ví dụ:

```
npm run new-template -- luxury-rose "Luxury Rose"
```

Script tự động làm:

- ✅ Tạo `components/templates/<slug>/` (copy cấu trúc từ `autumn-watercolor`
  — template đơn giản nhất hiện có), mỗi file `.tsx` có comment `TODO` ở đầu
  đánh dấu cần tuỳ chỉnh nội dung/màu sắc thật.
- ✅ Đăng ký entry trong `lib/template-registry.ts` (dynamic import + object
  cấu hình, có `TODO` ở các field cần điền giá trị thật).
- ✅ Đăng ký entry trong `prisma/template-defs.cjs` (dùng để seed DB).

Script **không** tự ghi đè nếu slug đã tồn tại hoặc thư mục đích đã có —
sẽ báo lỗi rõ ràng và dừng lại thay vì âm thầm ghi đè code đang dở.

## Bước 2 — Việc bắt buộc làm tay

- [ ] Sửa nội dung/màu sắc/text thật trong từng file `.tsx` vừa sinh (Header,
      Info, Gallery, Timeline, Wishes, Gifting, Footer, Opening,
      BackgroundMusic, Section, `index.tsx`) — script chỉ tạo đúng cấu trúc,
      không tự thiết kế nội dung.
- [ ] Thêm ảnh preview vào `public/templates/<slug>-preview.png`.
- [ ] **⚠️ Nếu template có gallery/ảnh theo vị trí cố định**: tự sửa
      `lib/wedding-image-slots.ts` — thêm hằng số `<SLUG>_STRUCTURE_SLOTS` +
      `<SLUG>_ALBUM_START_INDEX`, và thêm nhánh mới trong hàm
      `galleryIndexForSlotKey`. **Đây là bước KHÔNG được script tự sinh** vì
      cấu trúc slot phụ thuộc thiết kế cụ thể của từng template — cấu hình
      sai sẽ khó phát hiện bằng mắt thường (ảnh hiển thị sai vị trí mà không
      có lỗi runtime rõ ràng).
- [ ] Sửa lại `sections`, `imageSlots`, `defaultColors` trong cả 2 file đã
      đăng ký (`lib/template-registry.ts` và `prisma/template-defs.cjs`) cho
      khớp đúng thiết kế thật — script chỉ điền giá trị placeholder.
- [ ] Chạy `npm run db:seed` để upsert record `Template` vào DB.
- [ ] (Tuỳ chọn) Kiểm tra `lib/section-config.ts` và
      `lib/static-site/eligibility.ts` nếu template có yêu cầu đặc biệt —
      thường không cần đụng vì Astro đang tắt, mọi template mặc định chạy
      React (xem `lib/static-site/eligibility.ts`).

## Lưu ý quan trọng — lỗi đã từng xảy ra trong dự án

Comment gốc trong `prisma/template-defs.cjs` ghi rõ:

> Trước đây hai file (seed thường và seed Docker) tự khai riêng và đã lệch
> nhau: bản Docker seed 5 mẫu KHÔNG tồn tại trong `lib/template-registry.ts`
> (chọn vào là vỡ trang) và thiếu 3 mẫu đang chạy tốt.

**QUY TẮC bắt buộc:** mọi slug trong `prisma/template-defs.cjs` PHẢI có
đúng slug tương ứng trong `lib/template-registry.ts`, và ngược lại. Sau khi
chạy script và sửa tay, luôn kiểm tra lại bằng `git diff` ở cả 2 file này
trước khi chạy `npm run db:seed` hoặc commit — script dùng string insertion
đơn giản (không phải AST parser), nên nếu cấu trúc 2 file từng bị sửa tay
theo cách khác lạ, script có thể chèn sai vị trí (nó sẽ báo lỗi rõ ràng nếu
không tìm thấy đúng vị trí chèn, không âm thầm bỏ qua).
