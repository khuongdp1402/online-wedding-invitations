# Wedding Template Development Guide

Tài liệu này mô tả chuẩn để thêm một mẫu thiệp cưới (template) mới vào hệ thống,
sao cho nó tương thích với dashboard editor kiểu Canva/Shopify (click-to-edit,
multi-upload, kéo thả sắp xếp, theming font/màu động).

## 1. Tổng quan kiến trúc

- `WeddingTemplateProps` (`types/template.ts`) là interface chuẩn mọi template
  component phải nhận: `wedding`, `mode`, `isDemo`, `guestName`,
  `guestSalutation`, `editOverlay`, `onRSVPSubmit`, `onWishSubmit`.
- `TemplateRenderer` (`components/templates/TemplateRenderer.tsx`) là nơi
  duy nhất load Google Fonts động và set CSS variables theming
  (`--font-heading`, `--font-body`, `--font-script`, `--text-color`) trước khi
  render component template thực tế. Mọi route (preview trong dashboard lẫn
  trang public `/w/[slug]`) đều đi qua `TemplateRenderer` — không cần tự xử lý
  font/theme trong component template.
- Dashboard editor (`EditWeddingForm.tsx`) preview qua iframe `/w/preview`,
  giao tiếp bằng `postMessage`: cha gửi `UPDATE_DRAFT` (kèm `wedding`,
  `templateSlug`, `mode`, `highlightSlot`), iframe gửi lại `PREVIEW_READY` và
  `SLOT_CLICK` (kèm `slotKey`). Việc này đã có sẵn — template mới không cần
  đụng vào phần này.

## 2. Slot Model (`lib/wedding-slots.ts`, `lib/wedding-image-slots.ts`)

Có 2 loại slot:

- **`WeddingImageSlot`** (`lib/wedding-image-slots.ts`): `{ key, galleryIndex, label, hint }`.
  Ánh xạ 1 vị trí ảnh cố định trên thiệp ↔ 1 chỉ số trong mảng `wedding.gallery`.
- **`WeddingTextSlot`** (`lib/wedding-slots.ts`): `{ kind: "text", key, label, hint, field, section, inputType }`.
  Ánh xạ 1 vùng text click được ↔ 1 field cụ thể trong `WeddingData` (khai báo
  đóng trong union `WeddingTextField`, ví dụ `"groomName"`, `"quote"`,
  `"groomCeremony.venue"`...).

**Quy ước đặt tên slot key**: `<template-prefix>-<vùng>-<field>`, ví dụ
`cb-hero`, `cb-groom-name`, `cb-groom-venue`. Prefix dùng để tránh đụng độ khi
2 template chia sẻ chung 1 bộ slot (classic-elegance và classic-burgundy hiện
dùng chung `CLASSIC_TEXT_SLOTS`/`CLASSIC_BURGUNDY_STRUCTURE_SLOTS` vì bố cục
tương đương).

**Album/gallery mở rộng**: ảnh từ `albumStartIndex` trở đi không có slot cố
định — dùng `albumSlotKey(i)` (dạng `album-{i}`) và được `EditWeddingMediaSection`
tự động xử lý upload nhiều ảnh + kéo thả sắp xếp lại, không cần code gì thêm ở
phía template.

## 3. Đăng ký Template mới vào Registry (`lib/template-registry.ts`)

Checklist bắt buộc khi thêm 1 entry mới vào `templates`:

- [ ] `id`, `slug` — trùng nhau, dùng làm khóa tra cứu và tên thư mục component.
- [ ] `name`, `description`, `thumbnail`, `category`.
- [ ] `isPremium`, `minPlan` — quyết định gói nào được dùng template này.
- [ ] `component` — dynamic import với `{ ssr: false }` (component dùng nhiều
      hiệu ứng client-side, animation, canvas... không nên SSR).
- [ ] `defaultColors` — `{ primary, accent, background }`.
- [ ] `sections: string[]` — danh sách section theo đúng thứ tự mặc định, dùng
      để hiển thị trong `SortableSectionList` (sidebar dashboard) và làm khóa
      `sectionOrder` lưu trong DB.
- [ ] `imageSlots: WeddingImageSlot[]` — bắt buộc, kể cả khi rỗng `[]`.
- [ ] `textSlots: WeddingTextSlot[]` — bắt buộc, kể cả khi rỗng `[]` (template
      chưa hỗ trợ click-to-edit text thì để `[]`, không bỏ field).
- [ ] `albumStartIndex: number` — chỉ số bắt đầu của ảnh "album mở rộng"
      trong `wedding.gallery`.

Cũng cần thêm 1 dòng `prisma.template.upsert(...)` tương ứng trong
`prisma/seed.ts` (dùng `upsert` theo `slug`, KHÔNG dùng `deleteMany` — các
`Wedding` đang tồn tại tham chiếu `templateId` sẽ vỡ foreign key nếu xóa
template đang được dùng).

## 4. Click-to-edit wiring (bắt buộc cho mọi template mới)

Dùng chung `components/templates/shared/EditOverlayContext.tsx`
(`EditOverlayContext`, `useEditOverlay()`, `editSlotClass()`):

- Component gốc của template (`index.tsx`) nhận `editOverlay` từ
  `WeddingTemplateProps`, và nếu `editOverlay?.onSlotClick` tồn tại, bọc toàn
  bộ cây render trong `<EditOverlayContext.Provider value={editOverlay}>`.
- Mỗi section con dùng `const edit = useEditOverlay()` để lấy context, rồi:
  - **Vùng ảnh**: bọc `<div>` chứa ảnh bằng
    `className={editSlotClass(edit, "slot-key", "...class gốc...")}`,
    thêm `onClick={() => edit?.onSlotClick?.("slot-key")}` và
    `role={edit?.onSlotClick ? "button" : undefined}`.
  - **Vùng text**: bọc thẳng thẻ hiển thị text (`<h1>`, `<p>`, `<span>`) bằng
    cùng `editSlotClass()`, `onClick={(e) => { e.stopPropagation(); edit?.onSlotClick?.("slot-key"); }}`.
    **Bắt buộc `stopPropagation()`** khi vùng text nằm lồng trong 1 vùng ảnh
    cha cũng đang clickable — nếu không, click vào tên sẽ trigger luôn cả 2
    slot (ảnh + text) cùng lúc.
- Nếu ảnh hero chiếm toàn màn hình và vùng text nằm đè lên (absolute overlay),
  container overlay cần `pointer-events-none` khi `edit?.onSlotClick` tồn tại,
  còn khối con chứa text cần `pointer-events-auto` để click xuyên qua được.

**Checklist tự-test**: mỗi section liệt kê trong `sections[]` của registry
phải có ít nhất 1 slot (ảnh hoặc text) click được — nếu 1 section hoàn toàn
tĩnh (ví dụ "Lời chúc" lấy dữ liệu động từ guest, không phải nội dung do
cô dâu chú rể nhập), không cần wiring, nhưng nên ghi chú trong code vì sao.

## 5. Font & Color theming (bắt buộc)

- **Font**: CHỈ dùng Tailwind utility `font-heading` / `font-body` /
  `font-script` (map tới `var(--font-heading)`, `var(--font-body)`,
  `var(--font-script)` trong `tailwind.config.ts`). Các biến này do
  `TemplateRenderer` set tự động từ `wedding.typography`. **Cấm** dùng
  `font-serif` (biến legacy đã bị xóa) hoặc `@import`/hardcode font-family
  riêng trong CSS của template — nếu làm vậy, dropdown chọn font trong
  dashboard sẽ không có tác dụng gì trên template đó.
- **Màu**: đọc `wedding.primaryColor` / `accentColor` / `backgroundColor` /
  `textColor`, set thành CSS custom properties riêng của template (theo pattern
  `--cb-primary`, `--cb-accent`, `--cb-bg`, `--cb-text` của classic-burgundy),
  rồi dùng `color-mix()`/utility class dựa trên các biến đó. **Cấm** hardcode
  mã màu hex trực tiếp trong JSX/CSS cho các phần tử đại diện theme chính
  (nền, tiêu đề, điểm nhấn) — chỉ hardcode cho chi tiết trang trí không liên
  quan đến theme (ví dụ icon, hiệu ứng particle).
- Danh sách font hỗ trợ khai báo tại `lib/font-catalog.ts`
  (`HEADING_FONTS`, `BODY_FONTS`, `SCRIPT_FONTS`) — nếu cần thêm font mới,
  thêm vào đây (không hardcode `<option>` trong `EditWeddingForm.tsx`).

## 6. Multi-upload & Album reorder

Không cần code gì thêm ở phía component template — miễn khai đúng
`imageSlots`/`albumStartIndex` trong registry, `EditWeddingMediaSection` tự:

- Cho phép upload từng ảnh vào 1 structure slot cụ thể.
- Cho phép chọn nhiều file cùng lúc để thêm vào album (tuần tự upload qua
  `uploadFilesPresigned`, tránh race condition ghi đè `gallery`).
- Cho phép kéo thả sắp xếp lại thứ tự ảnh trong album (`@dnd-kit`), tự động
  lưu lại qua `persistGalleryReorder` (PUT `/api/weddings/{id}` với
  `{ gallery }`).

## 7. Testing checklist trước khi merge template mới

- [ ] Chạy `npm run dev`, mở `/dashboard/weddings/{id}` với 1 wedding dùng
      template mới, vào trang edit.
- [ ] Click từng vùng ảnh trên preview → đúng slot highlight (viền đỏ) + đúng
      ô upload mở tương ứng ở cột giữa.
- [ ] Click từng vùng text trên preview → đúng field mở, gõ thử → preview cập
      nhật real-time.
- [ ] Đổi từng dropdown font (Heading/Body/Script) → preview đổi font ngay,
      không cần reload.
- [ ] Đổi color picker (kể cả `textColor` mới) → preview đổi màu ngay.
- [ ] Upload nhiều ảnh cùng lúc vào album → thứ tự đúng theo thứ tự chọn file
      trong file picker.
- [ ] Kéo thả sắp xếp lại album → F5 reload vẫn giữ thứ tự mới (đã persist).
- [ ] Test cả 2 mode `groom`/`bride` (nếu template phân biệt nhà trai/nhà gái).
- [ ] Test route public `/w/{slug}` (không chỉ preview trong dashboard) hiển
      thị đúng font/màu/ảnh/text đã lưu.
- [ ] Test giới hạn `PLAN_MAX_PHOTOS` (`lib/payment.ts`) khi multi-upload vượt
      hạn mức gói hiện tại — phải dừng đúng lúc, báo lỗi rõ ràng.

## 8. Known limitations / TODO

- `modern-cinematic` (template2) dùng model dữ liệu hoàn toàn khác
  (`storyChapters` array với `layoutType`, gallery slice theo range số thay vì
  named-slot cố định) — **chưa** áp dụng slot model/click-to-edit này. Nếu cần
  wiring, phải thiết kế lại cách map `storyChapters` sang `WeddingImageSlot`/
  `WeddingTextSlot` trước.
- `autumn-watercolor` mới chỉ wiring click-to-edit cho ảnh ở Header/Gallery;
  Info/Timeline/Gifting/Footer chưa nhận `editOverlay` từ `index.tsx` — cần bổ
  sung tương tự cách đã làm cho classic-elegance/classic-burgundy nếu muốn
  hoàn thiện.
- Text slot hiện chỉ cover các field tĩnh cơ bản (tên, cha mẹ, ngày giờ, địa
  điểm, quote) — không cover các field lặp/dynamic (danh sách khách mời, lời
  chúc) vì các phần đó vốn không phải nội dung "template" mà là dữ liệu vận
  hành (guest/wish), quản lý qua tab riêng trong dashboard (`GuestsTab`,
  `WishesTab`), không qua slot editor.
