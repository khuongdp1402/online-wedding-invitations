# Prompt Giai đoạn 2: port `classic-elegance` (template1) + `autumn-watercolor` sang Astro

Tài liệu này gồm 2 prompt độc lập, dùng lại đúng pattern đã xác minh chạy được ở Giai đoạn 1 (`classic-burgundy` — xem `astro-templates/src/components/ClassicBurgundyPage.astro` làm tham chiếu). Chạy prompt A trước, verify xong mới chạy prompt B (khuyến nghị — rủi ro thấp hơn làm song song).

## Bối cảnh chung (đọc trước khi chạy prompt nào)

- Hạ tầng `astro-templates/`, `lib/static-site/*`, route `app/w/[slug]/route.ts`, `middleware.ts` đã có sẵn từ Giai đoạn 1 — **không tạo lại**, chỉ mở rộng.
- Cách port đã xác minh đúng: mỗi section tĩnh (không cần JS tương tác) → 1 file `.astro` trong `astro-templates/src/static/`; mỗi phần cần state/tương tác thật (form, đếm ngược, lightbox, mở phong bì...) → 1 React island trong `astro-templates/src/islands/`, giữ nguyên code React gốc (kể cả framer-motion), chỉ bỏ `useEditOverlay`/`editSlotClass` (không cần ở public) và đổi `next/image` → `<img>` thường.
- Animation reveal-on-scroll của phần tĩnh (`<Reveal>` wrapper dùng `framer-motion whileInView` ở bản gốc) → thay bằng `Reveal.astro` + `reveal.css` + `reveal-observer.js` đã có sẵn trong `astro-templates/src/static/` (dùng lại nguyên văn, không viết lại) — cho hiệu ứng mờ dần + trượt nhẹ giống hệt bằng mắt, không cần tải framer-motion cho phần tĩnh.
- `guestName`/`guestSalutation` là cá nhân hoá theo URL (`?name=`/`?guest=`, `?salutation=`/`?xung_ho=`) — **không** được truyền qua props build-time (HTML build 1 lần dùng chung cho mọi khách). Đọc bằng `window.location.search` ở client-side (island tự đọc trong `useEffect`, hoặc 1 script nhỏ thay placeholder tĩnh — xem `guest-personalize.js` mẫu ở Giai đoạn 1).
- Sau khi viết xong 1 template: thêm slug của nó vào whitelist trong `lib/static-site/eligibility.ts` (`ASTRO_ELIGIBLE_TEMPLATE_SLUGS`).
- Build test bằng: ghi 1 `StaticSiteInput` mẫu ra JSON, chạy `ASTRO_STATIC_INPUT_PATH=<path> node node_modules/astro/astro.js build --outDir <dir>` trong `astro-templates/` (gọi thẳng `astro.js`, KHÔNG qua `node_modules/.bin/astro` — trên Windows đó là bash script, `node` không parse được).
- Test end-to-end thật: dùng `generateStaticWeddingSite(weddingId)` (import từ `lib/static-site/generate.ts`) với 1 wedding thật trong DB dev, rồi mở `/w/<slug>` trên trình duyệt — không chỉ đọc code.

---

## Prompt A — Port `autumn-watercolor` sang Astro

```
Port template autumn-watercolor (components/templates/autumn-watercolor/) sang Astro,
theo đúng pattern đã làm ở classic-burgundy (Giai đoạn 1, xem
astro-templates/src/components/ClassicBurgundyPage.astro làm tham chiếu kiến trúc).

Đọc trước khi viết code:
- components/templates/autumn-watercolor/index.tsx — cấu trúc section, DEFAULT_SECTIONS,
  themeVars (--primary từ accentColor, --secondary từ primaryColor, --bg-cream từ
  backgroundColor — LƯU Ý: tên biến đảo ngược so với field, giữ đúng logic này).
- components/templates/autumn-watercolor/autumn-watercolor.css — copy nguyên văn,
  không sửa (đã viết đúng cách dùng biến CSS, không hardcode màu/font).
- Toàn bộ 10 file component trong components/templates/autumn-watercolor/.

Phân loại port (đã xác nhận từ đọc code):

TĨNH (viết .astro trong astro-templates/src/static/, dùng <Reveal> thay whileInView,
bỏ next/image -> <img>, bỏ editOverlay):
- Header.tsx -> InvitationHeaderStatic.astro (polaroid 2 ảnh nghiêng — bản gốc dùng
  framer-motion whileInView cho rotate/x của mỗi ảnh; giữ hiệu ứng bằng CSS transition
  + class .is-visible thêm qua reveal-observer.js, hoặc chấp nhận polaroid hiện thẳng
  không animate xoay nếu quá phức tạp để tái tạo bằng CSS thuần — ưu tiên đơn giản,
  không bắt buộc pixel-perfect cho hiệu ứng trang trí nhỏ này)
- Info.tsx -> WeddingInfoStatic.astro (thuần text, không có tương tác)
- Timeline.tsx -> TimelineStatic.astro (LƯU Ý: dữ liệu 3 mốc giờ "08:00/10:00/11:00"
  trong bản gốc là HARDCODE, không đọc từ wedding — giữ nguyên hardcode khi port,
  đây không phải bug cần sửa, chỉ là port đúng như đang chạy)
- Gifting.tsx -> GiftingStatic.astro (chỉ hiển thị QR + số TK, không có state — ẩn
  hẳn khối nếu cả 2 bên đều chưa nhập accountNumber, giữ đúng logic `if (cards.length
  === 0) return null` của bản gốc)
- Footer.tsx -> FooterStatic.astro (WatermarkBadge inline y hệt cách đã làm ở
  FooterStatic.astro của classic-burgundy)

ISLAND (giữ nguyên code React + framer-motion, .tsx trong astro-templates/src/islands/):
- Opening.tsx -> WeddingCardOpeningIslandAW.tsx (mở phong bì, khoá scroll body,
  falling leaves CSS đã có sẵn trong .css nên không cần đổi. guestName/guestSalutation:
  ĐỔI sang tự đọc window.location.search trong useEffect, giống cách đã làm ở
  astro-templates/src/islands/WeddingCardOpeningIsland.tsx của classic-burgundy —
  KHÔNG nhận qua props build-time)
- Gallery.tsx -> GalleryIslandAW.tsx (grid ảnh, có animate scale/opacity khi vào
  viewport qua framer-motion whileInView — giữ nguyên vì đây là 1 phần của chính
  logic hiển thị ảnh, không tách riêng heading tĩnh khỏi grid vì component gốc không
  tách; đổi next/image -> <img>)
- Wishes.tsx (WishesSlider) -> WishesSliderIslandAW.tsx (form + slider, gọi
  GET/POST /api/wishes — giữ nguyên contract API y hệt WishesIsland.tsx của
  classic-burgundy)
- BackgroundMusic.tsx -> BackgroundMusicIslandAW.tsx (giữ nguyên toggle play/pause)
- 1 island nhỏ mới GuestViewTrackerIsland (TÁI SỬ DỤNG file
  astro-templates/src/islands/GuestViewTrackerIsland.tsx đã có sẵn từ Giai đoạn 1,
  không viết lại — component này không đặc thù theo template)

Trang chính:
- Tạo astro-templates/src/components/AutumnWatercolorPage.astro, cấu trúc tương tự
  ClassicBurgundyPage.astro: đọc StaticSiteInput qua Astro.props, tính themeVars,
  tính `order` qua visibleSectionKeys(wedding.sectionOrder, DEFAULT_SECTIONS) với
  DEFAULT_SECTIONS = ["header","info","gallery","timeline","wishes","gifting","footer"]
  (copy đúng từ index.tsx gốc), switch-case render section theo key, import
  "../static/autumn-watercolor.css" (copy nguyên file .css gốc vào
  astro-templates/src/static/), đặt <WeddingCardOpeningIslandAW client:load>,
  <BackgroundMusicIslandAW client:load> (chỉ render nếu wedding.backgroundMusic hoặc
  dùng default URL y hệt logic `wedding.backgroundMusic || "https://..."` của bản gốc),
  <GuestViewTrackerIsland client:load> cuối trang.
- Root wrapper giữ class "autumn-watercolor-root" + style themeVars, và cấu trúc
  <main class="max-w-[500px] mx-auto ..."> bọc các section — đây là layout đặc thù
  (thiệp dạng "thẻ hẹp" căn giữa màn hình, khác classic-burgundy full-width), PHẢI
  giữ đúng class/style này để không vỡ layout.
- Watercolor decor SVG (khối trang trí góc trên bên trái, xem index.tsx dòng
  113-118) là tĩnh, copy y nguyên vào AutumnWatercolorPage.astro.

Cập nhật:
- lib/static-site/generate.ts: hàm generateStaticWeddingSite hiện chỉ build
  ClassicBurgundyPage — sửa để chọn đúng entry point .astro theo template slug
  (thêm 1 map slug -> tên trang, hoặc nhánh if/else đơn giản) thay vì hardcode
  ClassicBurgundyPage. Import cả 2 (ClassicBurgundyPage, AutumnWatercolorPage)
  trong src/pages/index.astro và chọn theo biến môi trường/field trong input JSON
  (thêm field "templateSlug" vào StaticSiteInput nếu chưa có, dùng để switch).
- lib/static-site/eligibility.ts: thêm "autumn-watercolor" vào
  ASTRO_ELIGIBLE_TEMPLATE_SLUGS.

Verify bắt buộc trước khi coi là xong:
1. Build thử bằng StaticSiteInput mẫu (wedding.gallery ít nhất 8 ảnh để test đủ
   gallery + polaroid), xác nhận không lỗi TypeScript/Astro compile.
2. Dùng generateStaticWeddingSite() với 1 wedding thật (PUBLISHED, templateId trỏ
   template "autumn-watercolor") trong DB dev, mở /w/<slug> trên trình duyệt thật:
   - Xác nhận layout "thẻ hẹp giữa màn hình" (max-w-500px) hiển thị đúng, không
     bị full-width như classic-burgundy.
   - Mở phong bì (tap vào card) hoạt động, khoá scroll đúng lúc chưa mở.
   - Cuộn xuống thấy hiệu ứng reveal (mờ dần) ở các section.
   - Gallery hiển thị ảnh, không vỡ layout khi gallery rỗng (< 8 ảnh).
   - Gifting: xác nhận ẨN hẳn khối nếu cả 2 bên chưa có accountNumber (test bằng
     wedding có gifting rỗng).
   - Wishes slider: gửi 1 wish thật qua form, xác nhận nó xuất hiện trong slider
     sau khi refetch.
   - Nhạc nền: bấm nút play/pause hoạt động.
3. npx tsc --noEmit ở root project — không có lỗi.
4. npx vitest run — 43 test hiện có vẫn pass (không có test nào assert riêng cho
   template này, chỉ cần không phá vỡ test khác).
```

---

## Prompt B — Port `classic-elegance` (template1) sang Astro

```
Port template1 (components/templates/template1/, slug đăng ký là "classic-elegance"
trong lib/template-registry.ts) sang Astro, theo đúng pattern đã làm ở
classic-burgundy (Giai đoạn 1) VÀ autumn-watercolor (nếu đã làm Prompt A trước —
tham khảo cách generate.ts chọn entry point theo template slug).

Đọc trước khi viết code:
- components/templates/template1/index.tsx — cấu trúc section, DEFAULT order:
  ["header","wedding-info","countdown","quote","gallery","location","rsvp","wishes",
  "gifting","footer"] (10 khối, nhiều hơn 2 template kia — có thêm "rsvp" riêng biệt
  với "wishes", khác classic-burgundy dùng chung 1 khối).
- LƯU Ý QUAN TRỌNG: 4 file AnimatedBackground.tsx, MobileRedSeal.tsx,
  WeddingRibbon.tsx, PhotoStorySection.tsx trong thư mục này là DEAD CODE — KHÔNG
  được import ở đâu trong index.tsx hay bất kỳ section nào khác (đã xác nhận bằng
  grep). BỎ QUA, không port 4 file này.
- Toàn bộ các file còn lại: HeroSection.tsx (không dùng — index.tsx dùng
  InvitationHeaderSection.tsx thay thế, kiểm tra lại xem HeroSection có được dùng
  không trước khi port, nếu không dùng thì bỏ qua luôn), InvitationHeaderSection.tsx,
  WeddingInfoSection.tsx, CountdownSection.tsx, QuoteSection.tsx, GallerySection.tsx,
  LocationSection.tsx, RSVPSection.tsx, WishesSection.tsx, GiftingSection.tsx,
  FooterSection.tsx, WeddingCardOpening.tsx, BackgroundMusic.tsx, Section.tsx,
  ImageWithFallback.tsx, Reveal.tsx, lib/invitation.ts, lib/invitee.ts.

Khác biệt quan trọng so với classic-burgundy cần xử lý đúng:

1. Data shape khác: template1 dùng type `InvitationData` riêng (lib/invitation.ts),
   KHÔNG dùng thẳng `WeddingData`. index.tsx hiện tại tự map wedding -> InvitationData
   (xem index.tsx dòng ~32-95 — đã đọc trong phiên trước, có logic format ngày,
   mapping gallery thành mảng {src, alt, className, parallax}, mapping gifting).
   PHẢI viết lại đúng logic mapping này trong AstroPage (hoặc 1 hàm dùng chung
   lib/static-site/mapToInvitationData.ts) — đây là điểm dễ sai nhất, so sánh kỹ
   với index.tsx gốc để không lệch dữ liệu hiển thị.

2. QuoteSection.tsx và WeddingCardOpening.tsx dùng `useSearchParams()` (Next-only
   hook) trực tiếp qua `lib/invitee.ts` (hàm getInviteeFromSearchParams nhận
   URLSearchParams thuần — hàm này KHÔNG phụ thuộc Next, chỉ component gọi nó mới
   phụ thuộc). Khi port sang island: đổi chỗ gọi `useSearchParams()` (Next hook)
   thành `new URLSearchParams(window.location.search)` (Web API thuần) trong
   useEffect — hàm getInviteeFromSearchParams giữ nguyên, chỉ đổi nguồn lấy params.
   QuoteSection có 1 phần TĨNH (câu "trân trọng kính mời") cần hiện placeholder
   "quý khách" trong .astro rồi thay bằng script (giống guest-personalize.js của
   classic-burgundy — TÁI SỬ DỤNG file này nếu format text giống, hoặc viết biến thể
   nếu khác câu chữ).

3. ImageWithFallback.tsx ở đây dùng <img> thường (KHÔNG dùng next/image, khác
   classic-burgundy) — port thẳng, đơn giản hơn, không cần đổi next/image.

4. RSVPSection.tsx là 1 khối RIÊNG với WishesSection.tsx (khác classic-burgundy gộp
   chung) — giữ 2 island riêng biệt: RSVPIslandT1.tsx (gọi POST /api/rsvp, contract
   giống hệt lib RSVP đã dùng ở app/api/rsvp/route.ts) và WishesIslandT1.tsx (gọi
   GET/POST /api/wishes).

Phân loại port:

TĨNH (.astro trong astro-templates/src/static/):
- InvitationHeaderSection.tsx -> InvitationHeaderStaticT1.astro
- WeddingInfoSection.tsx -> WeddingInfoStaticT1.astro
- LocationSection.tsx -> LocationStaticT1.astro (motion.a whileHover/whileTap ->
  CSS .cb-scale-btn class, đã có pattern này ở LocationStatic.astro của
  classic-burgundy, copy cách làm)
- FooterSection.tsx -> FooterStaticT1.astro
- Phần tĩnh của QuoteSection.tsx (bố cục ảnh + text, trừ chỗ cần
  personalize qua script)

ISLAND (.tsx trong astro-templates/src/islands/, giữ nguyên framer-motion):
- WeddingCardOpening.tsx -> WeddingCardOpeningIslandT1.tsx (đổi useSearchParams
  như mục 2 ở trên)
- CountdownSection.tsx -> CountdownIslandT1.tsx (setInterval mỗi giây, giữ nguyên
  NumberFlip animation)
- GallerySection.tsx -> GalleryIslandT1.tsx (lightbox + parallax, giữ nguyên
  useScroll/useTransform)
- RSVPSection.tsx -> RSVPIslandT1.tsx (giữ nguyên toàn bộ form state)
- WishesSection.tsx -> WishesIslandT1.tsx (giữ nguyên toàn bộ, gần giống
  WishesIsland.tsx của classic-burgundy — có thể copy cấu trúc, chỉ đổi class
  Tailwind theo theme burgundy/gold của template1: bg-burgundy, text-gold, v.v.
  thay vì cb-text-primary/--cb-accent)
- GiftingSection.tsx -> GiftingIslandT1.tsx (dùng buildVietQrUrl từ lib/vietqr —
  import được thẳng, hàm này không phụ thuộc Next, chỉ cần path alias @/lib/vietqr
  đã cấu hình sẵn trong astro-templates/astro.config.mjs)
- BackgroundMusic.tsx -> BackgroundMusicIslandT1.tsx
- Tái sử dụng GuestViewTrackerIsland.tsx đã có sẵn

Lưu ý CSS: template1 dùng class Tailwind thuần với màu đặt tên trong
tailwind.config.ts gốc (burgundy, burgundy-dark, gold, cream-light, ink, ink-dark,
paper — xem tailwind.config.ts ở root project mục theme.extend.colors). Các class
này KHÔNG tự có trong astro-templates/tailwind.config.mjs hiện tại (chỉ có
fontFamily). PHẢI bổ sung đúng các màu này vào theme.extend.colors của
astro-templates/tailwind.config.mjs, copy giá trị từ root tailwind.config.ts, nếu
không toàn bộ class như `bg-burgundy`, `text-gold` sẽ không có CSS rule tương ứng
(lỗi y hệt vấn đề Tailwind content-path đã gặp ở Giai đoạn 1 — nhưng lần này là
thiếu color token, không phải thiếu content path).

Trang chính:
- Tạo astro-templates/src/components/ClassicEleganceePage.astro (chú ý: KHÔNG cần
  file .css riêng như 2 template kia — template1 không có file .css riêng, chỉ dùng
  Tailwind + font variables trực tiếp qua style attribute, xem cách TemplateRenderer
  set --font-heading/--font-body/--font-script/--text-color).
- Cấu trúc root: `<main className="bg-paper min-h-screen">` (xem index.tsx dòng 115),
  set CSS var --text-color từ wedding.textColor.
- order = visibleSectionKeys(wedding.sectionOrder, DEFAULT_ORDER) với DEFAULT_ORDER
  10 khối như liệt kê ở trên.
- Đặc biệt: khối "card-opening" trong switch-case gốc (index.tsx dòng 120) là
  ALIAS của "header" (cùng render InvitationHeaderSection) — giữ đúng 2 case cùng
  trỏ 1 nhánh khi viết switch trong Astro.

Cập nhật:
- lib/static-site/generate.ts và eligibility.ts: thêm "classic-elegance" giống
  cách đã thêm "autumn-watercolor" ở Prompt A.

Verify bắt buộc trước khi coi là xong:
1. Build thử với StaticSiteInput mẫu có đủ gallery (ít nhất 6 ảnh để có RSVP +
   Wishes + Gifting cùng lúc), build cả 2 mode groom/bride.
2. generateStaticWeddingSite() với 1 wedding thật PUBLISHED templateId trỏ
   "classic-elegance", mở /w/<slug> thật trên trình duyệt:
   - Xác nhận card-opening/header hiển thị đúng ảnh hero + tên.
   - Đếm ngược chạy đúng, cập nhật mỗi giây.
   - Gallery lightbox mở/đóng đúng khi click ảnh.
   - RSVP: chọn "sẽ tham dự", nhập tên, gửi — xác nhận ghi vào DB qua
     GET /api/weddings (hoặc prisma studio) đúng attendance "accept".
   - Wishes: gửi 1 wish, xác nhận hiện trong danh sách sau khi refetch.
   - Gifting: bấm "Xem thông tin gửi quà", xác nhận QR + số TK hiện đúng, ẩn nếu
     rỗng.
   - Cá nhân hoá: thêm ?guest=TestName&salutation=Anh vào URL, xác nhận
     WeddingCardOpening hiện "Kính gửi: Anh TestName" VÀ QuoteSection hiện đúng tên
     (không còn "quý khách" mặc định).
3. npx tsc --noEmit — sạch.
4. npx vitest run — 43 test vẫn pass.
5. So sánh trực quan (screenshot cạnh nhau) bản Astro mới vs bản React cũ
   (/w/<slug>/react) của cùng 1 wedding để phát hiện lệch màu/font/spacing.
```

---

## Sau khi cả 2 template xong

Cập nhật `lib/static-site/eligibility.ts` sẽ có 3 template eligible
(`classic-burgundy`, `autumn-watercolor`, `classic-elegance`) — chỉ còn
`modern-cinematic` giữ nguyên đường React (lý do: kiến trúc GSAP ScrollTrigger +
Lenis scroll-driven toàn trang với 3 Context xuyên suốt, không decompose được
thành island độc lập — xem giải thích chi tiết đã trao đổi trong hội thoại).

Cập nhật known issue trong plan (`C:\Users\ShueiHCM\.claude\plans\rippling-inventing-locket.md`)
nếu phát sinh thêm vấn đề mới khi port 2 template này, theo đúng format đã ghi
cho `classic-burgundy` ở Giai đoạn 1.
