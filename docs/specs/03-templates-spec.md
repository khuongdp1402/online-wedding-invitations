# Đặc Tả 03: Hệ Thống Template Độc Lập (Templates Specification)

Hệ thống Template trong dự án được thiết kế theo nguyên tắc **Pluggable & Independent**: mỗi template là một module giao diện biệt lập, tuân thủ chặt chẽ hợp đồng dữ liệu chuẩn `WeddingTemplateProps`.

---

## 1. Hợp Đồng Giao Tiếp Chuẩn (Standard Props Contract)

Mọi template component đều nhận cùng một tập thuộc tính chuẩn:

```typescript
export type WeddingTemplateProps = {
  wedding: WeddingData;          // Toàn bộ dữ liệu đám cưới đã được chuẩn hoá
  mode: "bride" | "groom";       // Hiển thị thông tin theo Lễ Vu Quy (nhà gái) hay Lễ Tân Hôn (nhà trai)
  isDemo: boolean;               // Có phải bản xem trước/dùng thử (hiện watermark nếu chưa publish)
  guestName?: string;            // Tên khách mời riêng (nếu có từ URL)
  guestSalutation?: string;      // Xưng hô riêng (Anh, Chị, Bạn...)
  editOverlay?: {                // Truyền khi xem trong Live Editor để hỗ trợ tương tác trực tiếp
    highlightSlot: string | null;
    onSlotClick: (slotKey: string, el?: HTMLElement) => void;
  };
};
```

---

## 2. Template Registry (`lib/template-registry.ts`)

Tất cả các template được đăng ký tập trung tại `lib/template-registry.ts` và nạp động thông qua `next/dynamic` (`{ ssr: false }` hoặc SSR tùy chọn) để tối ưu dung lượng gói bundle tải trang:

```typescript
export type TemplateConfig = {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  category: "classic" | "modern" | "minimal" | "luxury" | "vintage";
  isPremium: boolean;
  minPlan: "FREE" | "BASIC" | "STANDARD" | "PREMIUM";
  component: ComponentType<WeddingTemplateProps>;
  defaultColors: {
    primary: string;
    accent: string;
    background: string;
  };
  sections: string[];
  imageSlots: WeddingImageSlot[];
  textSlots: WeddingTextSlot[];
  albumStartIndex: number;
};
```

---

## 3. Đặc Tả Chi Tiết 4 Mẫu Thiệp Hiện Hữu

### 3.1. `classic-elegance` (Mã slug: `classic-elegance`, Thư mục: `components/templates/template1`)
- **Phong Cách**: Truyền thống Á Đông phối hợp phong cách hoàng gia hiện đại.
- **Tông Màu Mặc Định**: Đỏ Burgundy (`#800020`), Vàng Gold (`#d4a853`), Nền kem giấy điệp (`#faf8f5`).
- **Khối Hiển Thị (Sections)**:
  1. `header`: Phong bì mở thiệp truyền thống với dấu sáp đỏ niêm phong, hiệu ứng mở nắp bao thư.
  2. `wedding-info`: Bảng thông tin hai họ, tên cô dâu chú rể, đính kèm 2 khung ảnh chân dung nghiêng.
  3. `countdown`: Đồng hồ đếm ngược từng giây đến ngày cưới trên nền ảnh lớn.
  4. `quote`: Trích dẫn câu nói tình yêu & kỷ niệm.
  5. `gallery`: Album ảnh cưới phong cách Masonry Grid với hiệu ứng Parallax nhẹ.
  6. `location`: Thông tin nhà hàng, bản đồ chỉ đường Google Maps nhúng.
  7. `rsvp`: Form xác nhận tham dự online thời gian thực.
  8. `wishes`: Sổ lưu bút gửi lời chúc và danh sách lời chúc hiển thị sinh động.
  9. `gifting`: Hộp mừng cưới kèm mã VietQR tự động và số tài khoản ngân hàng.
  10. `footer`: Chữ ký cảm ơn và lời chào từ cô dâu chú rể.

### 3.2. `modern-cinematic` (Mã slug: `modern-cinematic`, Thư mục: `components/templates/template2`)
- **Phong Cách**: Điện ảnh 3D, cuộn theo mạch truyện (Storytelling Scroll), phong cách Typography tạp chí Vogue/Kinfolk.
- **Tông Màu Mặc Định**: Nền đen huyền bí (`#000000`), Chữ trắng sữa (`#f5f1ea`), Điểm nhấn vàng đồng (`#D4AF37`).
- **Điểm Đặc Trưng**:
  - Tích hợp động cơ cuộn mượt mà Lenis Scroll (`@studio-freight/lenis`) kết hợp GSAP ScrollTrigger.
  - Hiệu ứng vệt chuột ảnh (Mouse Trail Gallery).
  - Băng chuyền ảnh chạy ngang vô tận (Horizontal Marquee Gallery).
  - Câu chuyện tình yêu chia theo từng chương (Chapters): The Beginning -> The First Glance -> Our Journey -> Lời Mời Trân Trọng -> Hồi Âm & Lời Chúc.

### 3.3. `classic-burgundy` (Mã slug: `classic-burgundy`, Thư mục: `components/templates/classic-burgundy`)
- **Phong Cách**: Cổ điển phương Tây thanh lịch, tối giản nhưng đậm chất nghệ thuật.
- **Tông Màu Mặc Định**: Đỏ rượu vang (`#800020`), Vàng nghệ thuật (`#d4a853`), Nền giấy linen (`#FDFBF7`).
- **Điểm Đặc Trưng**:
  - Bố cục khung ảnh nghiêng nghệ thuật (Artistic Tilted Frames).
  - Thanh chuyển đổi nhanh chế độ Nhà Trai / Nhà Gái tiện lợi ngay trên đầu trang.
  - Tối ưu tải trang cực nhanh, hỗ trợ đầy đủ các khối: Mở thiệp, Đếm ngược, Quote, Album, Địa điểm, Lưu bút.

### 3.4. `autumn-watercolor` (Mã slug: `autumn-watercolor`, Thư mục: `components/templates/autumn-watercolor`)
- **Phong Cách**: Màu nước mùa thu lãng mạn, ấm áp, phong cách ảnh Polaroid & Vintage Film.
- **Tông Màu Mặc Định**: Nâu đất Terracotta (`#b9856f`), Nâu đậm cổ điển (`#422114`), Nền kem ấm (`#f7f1eb`).
- **Điểm Đặc Trưng**:
  - Họa tiết màu nước loang (Watercolor brush decor SVG).
  - Khung ảnh dạng Polaroid dán băng dính nghệ thuật.
  - Dòng thời gian lịch trình tiệc cưới (Timeline) vẽ tay sinh động: Đón khách -> Làm lễ -> Khai tiệc -> Giao lưu & Khiêu vũ.

### 3.5. `minimal-korean` (Mã slug: `minimal-korean`, Thư mục: `components/templates/minimal-korean`)
- **Phong Cách**: Tối giản Hàn Quốc (Seoul Modern Minimalist), tạp chí editorial cao cấp với typography tinh tế.
- **Tông Màu Mặc Định**: Xanh than Slate (`#2C3E50`), Nâu be cát ấm (`#B39D82`), Nền giấy mỹ thuật be (`#FAF9F5`).
- **Điểm Đặc Trưng & Bố Cục**:
  - **Editorial Header**: Bố cục bìa tạp chí nghệ thuật với con dấu dọc phong cách Hàn Quốc ("결혼합니다"), khung ảnh chân dung thanh tao với linen shadow.
  - **Lịch D-Day Tương Tác (`Calendar.tsx`)**: Lưới lịch tháng hiển thị trực quan ngày cưới được khoanh tròn cùng bộ đếm D-Day độc đáo ("Tháng Ngày Hạnh Phúc").
  - **Timeline Tối Giản (`Timeline.tsx`)**: Lịch trình tiệc dạng dot timeline tối giản với icon tinh gọn.
  - **Asymmetric Magazine Gallery (`Gallery.tsx`)**: Khung ảnh so le bất đối xứng đánh số thứ tự `#01`, `#02`, `#03` như lookbook thời trang.

### 3.6. `luxury-royal-gold` (Mã slug: `luxury-royal-gold`, Thư mục: `components/templates/luxury-royal-gold`)
- **Phong Cách**: Hoàng gia quý phái (Luxury Royal Gala), quyền quý với hoa văn vàng gold và đỏ ruby thượng lưu.
- **Tông Màu Mặc Định**: Đỏ Ruby Hoàng Gia (`#8B0000`), Nhũ Vàng Kim (`#E5A93C`), Nền ngà cao cấp (`#FFFDF9`).
- **Điểm Đặc Trưng & Bố Cục**:
  - **Hiệu Ứng Bụi Vàng (`<GoldenSparklesOverlay />`)**: Bụi vàng nhũ lấp lánh bay nhẹ nhàng trên toàn bộ thiệp.
  - **Chiếu Báo Hỷ Hoàng Gia (`Proclamation.tsx`)**: Tấm thiệp gấm hoàng gia hoa văn viền baroque uốn lượn trang trọng công bố hôn sự.
  - **Lịch Trình Dạ Yến (`Timeline.tsx`)**: Bố cục timeline quý tộc với biểu tượng vương miện (Crown), ly vang (Wine) và nhạc thính phòng (Music).
  - Khung ảnh đôi viền kim loại kép mạ vàng sang trọng và hiệu ứng ánh sáng quý phái.

### 3.7. `vintage-botanical` (Mã slug: `vintage-botanical`, Thư mục: `components/templates/vintage-botanical`)
- **Phong Cách**: Thảo mộc tự nhiên cổ điển (Sage Green Botanical), hòa hợp với cỏ cây, thiên nhiên trong lành.
- **Tông Màu Mặc Định**: Xanh rêu cổ điển (`#3D5A45`), Xanh Olive Sage (`#8A9A5B`), Nền giấy thảo mộc (`#F8FAF6`).
- **Điểm Đặc Trưng & Bố Cục**:
  - **Hiệu Ứng Lá Cây Rơi (`<BotanicalLeavesOverlay />`)**: Những chiếc lá thảo mộc xanh biếc đung đưa xoay lượn tự nhiên.
  - **Garden Ceremony Timeline (`Timeline.tsx`)**: Bố cục thời gian tiệc cưới sân vườn với biểu tượng hoa lá và tiệc trà.
  - **Bảng Dress Code Tinh Tế (`DressCode.tsx`)**: Swatches màu gợi ý trang phục cho khách mời: Sage Green, Forest Olive, Warm Cream, Sand Beige.
  - **Polaroid Washi Tape Gallery (`Gallery.tsx`)**: Các bức ảnh kẹp băng dính washi tape nghiêng tự nhiên (`-rotate-1`, `rotate-2`).

### 3.8. `boho-terracotta` (Mã slug: `boho-terracotta`, Thư mục: `components/templates/boho-terracotta`)
- **Phong Cách**: Bohemian sa mạc tự do (Boho Sun & Terracotta Arch), ấm áp hoàng hôn và cỏ lau.
- **Tông Màu Mặc Định**: Đất nung Terracotta (`#C25E42`), Hổ phách hoàng hôn (`#DDA15E`), Nền cát sa mạc ấm (`#FDF8F5`).
- **Điểm Đặc Trưng & Bố Cục**:
  - **Mái Vòm Boho Love Journey (`LoveJourney.tsx`)**: Hành trình tình yêu dạng thẻ vòm cung nghệ thuật (Cái nhìn đầu tiên, Cầu hôn, Ngày chung đôi).
  - **Bảng Màu Trang Phục Sa Mạc (`DressCode.tsx`)**: Gợi ý tông màu Terracotta, Sunset Gold, Pampas Sand, Warm Rust.
  - Khung ảnh vòm mềm mại kết hợp họa tiết mặt trời sa mạc ấm áp.

### 3.9. `sweet-sakura` (Mã slug: `sweet-sakura`, Thư mục: `components/templates/sweet-sakura`)
- **Phong Cách**: Hoa anh đào ngọt ngào (Pastel Blossom Romance), thơ mộng và lãng mạn như mùa xuân xứ Phù Tang.
- **Tông Màu Mặc Định**: Hồng thắm Sakura (`#E05A7A`), Hồng phấn Pastel (`#F8B4C4`), Nền tuyết hồng (`#FFF7F9`).
- **Điểm Đặc Trưng & Bố Cục**:
  - **Hiệu Ứng Mưa Cánh Hoa Anh Đào (`<SakuraPetalsOverlay />`)**: Cánh hoa anh đào rơi chao nghiêng tự nhiên tạo cảm giác bồng bềnh lãng mạn.
  - **Chương Hồi Kể Chuyện Tình Yêu (`LoveStory.tsx`)**: Bố cục các chương truyện ("Chương I: Định Mệnh", "Chương II: Gắn Kết", "Chương III: Trọn Đời") dạng thẻ kính mờ glassmorphism.
  - Khung ảnh và huy hiệu bo tròn mềm mại bọc viền hồng pastel ngọt ngào.

### 3.10. `emerald-glamour` (Mã slug: `emerald-glamour`, Thư mục: `components/templates/emerald-glamour`)
- **Phong Cách**: Ngọc lục bảo quý phái (Art Deco Great Gatsby), kiêu sa, lộng lẫy cho tiệc đêm dạ vũ.
- **Tông Màu Mặc Định**: Ngọc lục bảo sâu thẳm (`#0E3B2E`), Hoàng kim Art Deco (`#D4AF37`), Nền sương ngọc (`#F7FAF8`).
- **Điểm Đặc Trưng & Bố Cục**:
  - **Hiệu Ứng Hào Quang Kim Tuyến (`<GoldenSparklesOverlay />`)**: Ánh sáng lấp lánh phản chiếu sự hoa lệ của tiệc đêm.
  - **Chương Trình Dạ Tiệc VIP (`Programme.tsx`)**: Khung chương trình Art Deco sắc nét (Welcome Cocktail, Gala Ceremony, Wine Banquet, Champagne Toast).
  - **Art Deco Black-Tie Dress Code (`DressCode.tsx`)**: Bảng gợi ý trang phục kim cương xoay 45° viền vàng gold (Emerald Deep, Art Deco Gold, Midnight Black, Champagne Ivory).


---

## 4. Hệ Thống Dynamic Typography & Colors

Mọi template đều được điều khiển màu sắc và font chữ tập trung thông qua biến CSS:
- `--font-heading`: Phông chữ tiêu đề chính (như *Playfair Display*, *Cinzel*, *Cormorant Garamond*).
- `--font-body`: Phông chữ nội dung đọc (như *Inter*, *Montserrat*, *Plus Jakarta Sans*).
- `--font-script`: Phông chữ viết tay nghệ thuật (như *Great Vibes*, *Alex Brush*, *Dancing Script*).
- `--primary`: Màu chủ đạo.
- `--accent`: Màu điểm nhấn.

Hàm `resolveTemplateFonts(wedding)` tự động kiểm tra font người dùng đã cấu hình trong DB và tự động inject thẻ `<link rel="stylesheet">` Google Fonts tương ứng khi render.

---

## 5. Quy Chuẩn Thêm Mới Template (Standard Template Protocol)

Khi bổ sung thêm một mẫu thiệp mới vào hệ thống:
1. **Tạo thư mục**: `components/templates/<slug>/index.tsx` nhận `WeddingTemplateProps`.
2. **Khai báo Image Slots**: Cấu hình vị trí các ảnh cố định (hero, countdown, portraits) và chỉ số bắt đầu của album tự do tại `lib/wedding-image-slots.ts`.
3. **Đăng ký Registry**: Thêm cấu hình template vào `lib/template-registry.ts`.
4. **Đăng ký Database Seeder**: Khai báo thông tin vào `prisma/template-defs.cjs` (nguồn chân lý duy nhất cho giá và cấu hình DB).
5. **Đồng bộ Database**: Chạy lệnh `npm run db:seed` để cập nhật record vào PostgreSQL.

---

## 6. Hệ Thống Demo & Preview Đa Kích Thước (Responsive Preview Architecture)

Nhằm giải quyết vấn đề demo quá nhỏ, hệ thống hỗ trợ 2 chế độ xem trước toàn diện:
1. **Enlarged Preview Modal (`TemplatePreviewModal.tsx`)**:
   - Mở rộng kích thước đạt **98vw x 95vh**.
   - Hỗ trợ chuyển đổi trực quan 3 viewport thiết bị: **Mobile** (430px có viền điện thoại), **Tablet** (768px), và **Desktop** (100% full width).
   - Tích hợp nút **"Mở Tab Mới"** mở ra URL preview độc lập toàn màn hình.
   - Nút chuyển đổi góc nhìn quan khách: **Nhà Trai** / **Nhà Gái**.
2. **Dedicated Fullscreen Preview Route (`/templates/preview/[slug]`)**:
   - Trang xem trước toàn màn hình với thanh điều khiển dính nổi (Sticky Floating Toolbar).
   - Tích hợp đầy đủ nút đổi giao diện Nhà Trai / Nhà Gái, bộ chuyển Viewport thiết bị, nút quay lại Thư viện và CTA "Dùng Mẫu Này" dẫn trực tiếp vào wizard tạo thiệp cưới.
