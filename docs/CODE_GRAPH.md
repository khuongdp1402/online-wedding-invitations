# Code Graph & Kiến Trúc Hệ Thống (Architecture & Code Graph)

Tài liệu này cung cấp sơ đồ trực quan hóa toàn diện kiến trúc mã nguồn (Code Graph), quan hệ thực thể dữ liệu (ERD), cơ chế Template Engine và các luồng dữ liệu cốt lõi (Data Flow) của hệ thống **Online Wedding Invitations (Thiệp Cưới Online)**.

---

## 1. Sơ Đồ Phân Tầng Kiến Trúc Tổng Thể (System Architecture Graph)

Hệ thống được thiết kế theo mô hình **Phân tầng hướng mô-đun (Modular Layered Architecture)** trên nền tảng Next.js 14 App Router, kết hợp Server Components và Client Components:

```mermaid
flowchart TB
    %% Client Layer
    subgraph ClientLayer ["1. Tầng Khách Hàng & Trình Duyệt (Client Layer)"]
        GuestUser["Khách Mời (Guest)\n/w/[slug]?guest=..."]
        CoupleUser["Cặp Đôi (Couple)\n/dashboard, /dashboard/weddings/[id]/edit"]
        AdminUser["Quản Trị Viên (Admin)\n/admin, /admin/templates, /admin/coupons"]
        PublicUser["Khách Vãng Lai (Visitor)\n/, /templates, /pricing"]
    end

    %% Security & Edge Layer
    subgraph EdgeLayer ["2. Tầng Bảo Mật & Routing (Edge & Middleware)"]
        MW["middleware.ts\n- Session Check (NextAuth)\n- RBAC (Role: ADMIN / USER)\n- Public Route Pass-through"]
    end

    %% Presentation Layer
    subgraph PresentationLayer ["3. Tầng Giao Diện & Điều Hướng (Next.js App Router)"]
        direction TB
        subgraph RouteGroups ["Route Groups (app/)"]
            AuthRoutes["app/(auth)\n/login, /register"]
            MarketingRoutes["app/(marketing)\n/, /pricing, /templates"]
            DashboardRoutes["app/dashboard\nOverview, Editor, Guests, RSVP, Analytics"]
            AdminRoutes["app/admin\nPayments, Templates, Coupons, Contacts"]
            PublicWedding["app/w/[slug]\nPublic Wedding Page (SSR + Dynamic Metadata)"]
            PreviewIframe["app/w/preview\nLive Preview Sandbox (postMessage listener)"]
        end
        subgraph CoreComponents ["Thành Phần Giao Diện (components/)"]
            UIComp["components/ui/\nRadix UI, Tailwind, Lucide Icons"]
            DashComp["components/dashboard/\nEditWeddingForm, Live Preview, Media Upload"]
            MktComp["components/marketing/\nHero, Features, PricingCards, TemplateShowcase"]
        end
    end

    %% Template Engine Layer
    subgraph TemplateEngine ["4. Hệ Thống Template Engine Độc Lập"]
        Renderer["TemplateRenderer.tsx\n(Dynamic Component Loader)"]
        Registry["lib/template-registry.ts\n(Template Registry Singleton)"]
        T_Burgundy["classic-burgundy\n(Cổ Điển Burgundy)"]
        T_Korean["minimal-korean\n(Hàn Quốc Tối Giản)"]
        T_Modern["template1\n(Hiện Đại Sắc Nét)"]
        T_Cinematic["template2\n(Cinematic 3D Album)"]
    end

    %% Business & Service Layer
    subgraph BusinessLayer ["5. Tầng Nghiệp Vụ & Dịch Vụ (lib/)"]
        AuthService["lib/auth.ts\nNextAuth Handler & Callbacks"]
        PaymentService["lib/payment.ts & payment-complete.ts\nCú pháp TC<shortId>, Idempotency"]
        VietQRService["lib/vietqr.ts\nSinh VietQR chuẩn Napas 247"]
        UploadService["lib/upload-client.ts & s3-client.ts\nPresigned S3 / Local Storage"]
        WeddingDataService["lib/wedding-data.ts\nDTO Serializer, Normalizer"]
        FontService["lib/template-fonts.ts\nDynamic Google Fonts Loader"]
    end

    %% API Route Handlers
    subgraph APILayer ["6. Tầng API Endpoints (app/api/)"]
        AuthAPI["/api/auth/*\nNextAuth, Register"]
        WeddingAPI["/api/weddings/*\nCRUD, Publish, Upload Presign, Export"]
        GuestAPI["/api/guests/* & /api/rsvp/*\nQuản lý khách mời, Xác nhận RSVP"]
        WishAPI["/api/wishes/*\nGửi & Duyệt lời chúc"]
        PaymentAPI["/api/payment/* & /api/webhooks/casso\nTạo đơn & Casso Banking Webhook"]
        AdminAPI["/api/admin/*\nQuản trị template, Sync, Coupon"]
    end

    %% Persistence & Storage Layer
    subgraph DataLayer ["7. Tầng Dữ Liệu & Hạ Tầng (Storage & External Services)"]
        PrismaClient["lib/prisma.ts\nPrisma ORM Client Singleton"]
        PostgreSQL[("PostgreSQL Database\n(ACID Relational Storage)")]
        S3Storage[("S3 / MinIO Object Storage\n(Ảnh cưới, Nhạc nền, QR)")]
        CassoService["Casso API\n(Biến động số dư ngân hàng)"]
        TelegramService["Telegram Bot API\n(Thông báo giao dịch tức thì)"]
    end

    %% Connectors
    GuestUser --> MW
    CoupleUser --> MW
    AdminUser --> MW
    PublicUser --> MW

    MW --> RouteGroups
    DashboardRoutes --> DashComp
    PublicWedding --> Renderer
    PreviewIframe --> Renderer
    Renderer --> Registry
    Registry --> T_Burgundy & T_Korean & T_Modern & T_Cinematic

    DashComp -.->|"Gửi state tức thì qua postMessage"| PreviewIframe
    DashComp --> WeddingAPI
    DashComp --> UploadService

    RouteGroups --> BusinessLayer
    APILayer --> BusinessLayer
    BusinessLayer --> PrismaClient
    PrismaClient --> PostgreSQL

    UploadService --> S3Storage
    PaymentService --> VietQRService
    PaymentAPI --> PaymentService
    CassoService -->|Webhook POST| PaymentAPI
    PaymentService --> TelegramService
```

---

## 2. Sơ Đồ Phụ Thuộc Thư Mục & Module (Directory & Module Graph)

Sơ đồ thể hiện liên kết import giữa các thư mục chính trong dự án:

```mermaid
graph LR
    subgraph AppDir ["app/ (Pages & Routes)"]
        AppLayout["app/layout.tsx"]
        AppW["app/w/[slug]/page.tsx"]
        AppDash["app/dashboard/*"]
        AppAdmin["app/admin/*"]
        AppApi["app/api/*"]
    end

    subgraph ComponentsDir ["components/"]
        CompUI["components/ui/*\n(shadcn components)"]
        CompDash["components/dashboard/*"]
        CompMkt["components/marketing/*"]
        CompTpl["components/templates/*"]
    end

    subgraph LibDir ["lib/"]
        LibPrisma["lib/prisma.ts"]
        LibAuth["lib/auth.ts"]
        LibPay["lib/payment.ts"]
        LibTplReg["lib/template-registry.ts"]
        LibData["lib/wedding-data.ts"]
        LibS3["lib/s3-client.ts"]
        LibUtils["lib/utils.ts"]
    end

    subgraph PrismaDir ["prisma/"]
        PrismaSchema["prisma/schema.prisma"]
        PrismaSeed["prisma/seed.ts"]
        PrismaTplDefs["prisma/template-defs.cjs"]
    end

    subgraph TypesDir ["types/"]
        TypesWedding["types/wedding.ts"]
        TypesNextAuth["types/next-auth.d.ts"]
    end

    AppW --> CompTpl
    AppW --> LibPrisma
    AppW --> LibData
    AppDash --> CompDash
    AppDash --> LibPrisma
    AppDash --> LibAuth
    AppAdmin --> LibPrisma
    AppApi --> LibPrisma
    AppApi --> LibAuth
    AppApi --> LibPay
    AppApi --> LibS3

    CompDash --> CompUI
    CompDash --> LibUtils
    CompTpl --> CompUI
    CompTpl --> LibUtils
    CompTpl --> TypesWedding

    LibPrisma --> PrismaSchema
    LibTplReg --> PrismaTplDefs
    LibTplReg --> CompTpl
    PrismaSeed --> PrismaTplDefs
```

---

## 3. Sơ Đồ Thực Thể Cơ Sở Dữ Liệu (Database ERD Code Graph)

Toàn bộ 12 Model của Prisma Schema và mối quan hệ giữa chúng:

```mermaid
erDiagram
    User ||--o{ Account : "có"
    User ||--o{ Session : "sở hữu"
    User ||--o{ Wedding : "tạo và quản lý"
    User ||--o{ FileManagement : "tải lên"
    User ||--o{ ContactRequest : "gửi yêu cầu"

    Template ||--o{ Wedding : "được áp dụng vào"
    Template ||--o{ Coupon : "áp dụng cho"

    Wedding ||--o{ Guest : "chứa danh sách"
    Wedding ||--o{ Wish : "nhận được"
    Wedding ||--o{ Payment : "có các giao dịch"
    Wedding ||--o{ FileManagement : "chứa tệp tài nguyên"
    Wedding ||--o{ ContactRequest : "đính kèm ngữ cảnh"

    Coupon ||--o{ Payment : "áp dụng giảm giá"

    User {
        String id PK "cuid"
        String email "unique"
        String name
        String phone
        String password "bcrypt hash"
        Role role "USER | ADMIN"
        DateTime createdAt
        DateTime updatedAt
    }

    Account {
        String id PK "cuid"
        String userId FK
        String type
        String provider
        String providerAccountId
        String refresh_token
        String access_token
    }

    Session {
        String id PK "cuid"
        String sessionToken UK
        String userId FK
        DateTime expires
    }

    VerificationToken {
        String identifier
        String token UK
        DateTime expires
    }

    Wedding {
        String id PK "cuid"
        String slug UK "URL /w/[slug]"
        String userId FK
        String templateId FK
        WeddingStatus status "DRAFT | DEMO | PUBLISHED | EXPIRED"
        Plan plan "FREE | BASIC | STANDARD | PREMIUM"
        DateTime paidAt
        DateTime expiresAt
        Int purchasePrice "VND đã thanh toán"
        String groomName
        String brideName
        Json groomParents "{ father, mother }"
        Json brideParents "{ father, mother }"
        Json groomCeremony "CeremonyEvent"
        Json brideCeremony "CeremonyEvent"
        String quote
        Json gallery "Array of URLs"
        Json gifting "Bank account info"
        String primaryColor
        String accentColor
        String backgroundColor
        String textColor
        String fontFamily
        Json typography "{ heading, body, script }"
        Json sectionOrder "Array of section keys"
        String backgroundMusic
        String metaTitle
        String metaDescription
        String ogImage
        Int viewCount
        DateTime createdAt
        DateTime updatedAt
    }

    FileManagement {
        String id PK "cuid"
        String weddingId FK
        String userId FK
        String slotKey "cb-hero, gallery-0, qr-groom..."
        String publicUrl
        String storageKey
        String originalName
        String mimeType
        Int sizeBytes
        DateTime createdAt
    }

    Template {
        String id PK "cuid"
        String name
        String slug UK
        String description
        String thumbnail
        String previewUrl
        String category "classic | modern | minimal | luxury"
        Boolean isPremium
        Plan minPlan
        Json config "Template-specific config"
        Int price "VND giá gốc"
        Int salePrice "VND giá khuyến mãi"
        DateTime saleStartsAt
        DateTime saleEndsAt
        DateTime createdAt
        DateTime updatedAt
    }

    Guest {
        String id PK "cuid"
        String weddingId FK
        String name
        String salutation "Anh, Chị, Em, Cô, Chú..."
        String phone
        String email
        Side side "GROOM | BRIDE"
        String group "Bạn đại học, Đồng nghiệp..."
        RSVPStatus rsvpStatus "PENDING | ACCEPTED | DECLINED"
        DateTime rsvpAt
        Int numberOfGuests "Mặc định 1"
        String inviteLink UK "Link riêng từng khách"
        Boolean linkOpened
        DateTime linkOpenedAt
        DateTime createdAt
    }

    Wish {
        String id PK "cuid"
        String weddingId FK
        String guestId
        String name
        String message
        String attendance "Tham dự | Rất tiếc không thể"
        Boolean isApproved "Mặc định true"
        DateTime createdAt
    }

    Payment {
        String id PK "cuid"
        String weddingId FK
        PaymentType type "PUBLISH | RENEW | TEMPLATE_CHANGE"
        Int amount "VND thực thu"
        Int basePrice "Giá gốc của template"
        String couponId FK
        Int couponDiscount "VND giảm giá"
        String targetTemplateId
        String method "bank_transfer | vnpay | momo"
        String transactionId
        PaymentStatus status "PENDING | COMPLETED | FAILED | REFUNDED"
        DateTime paidAt
        DateTime createdAt
    }

    Coupon {
        String id PK "cuid"
        String code UK
        CouponDiscountType discountType "FIXED | PERCENT"
        Int discountValue
        String templateId FK
        Int maxRedemptions
        Int redemptionCount
        DateTime startsAt
        DateTime endsAt
        Boolean isActive
        DateTime createdAt
    }

    ContactRequest {
        String id PK "cuid"
        String userId FK
        String weddingId FK
        String name
        String phone
        String message
        Json context "{ templateSlug, enabledSections, plan }"
        ContactStatus status "NEW | CONTACTED | CLOSED"
        DateTime createdAt
    }
```

---

## 4. Sơ Đồ Kiến Trúc Template Engine (Template Engine & Registry)

Cơ chế phân tách template độc lập giúp mở rộng thêm mẫu mới mà không ảnh hưởng đến hệ thống lõi:

```mermaid
flowchart TD
    subgraph DataContract ["1. Chuẩn Giao Tiếp Dữ Liệu (Data Contract)"]
        WeddingData["WeddingData Interface\n- id, slug, status\n- groomName, brideName\n- groomParents, brideParents\n- groomCeremony, brideCeremony\n- gallery, gifting, typography\n- customSections, enabledSections"]
    end

    subgraph RegistrySystem ["2. Quản Lý Đăng Ký (Template Registry)"]
        DefsFile["prisma/template-defs.cjs\n(Source of Truth về Metadata, Giá, Slug)"]
        RegistryFile["lib/template-registry.ts\n(Registry ánh xạ Slug -> Dynamic React Component)"]
        DefsFile -->|Đồng bộ lúc Seed/Migrate| RegistryFile
    end

    subgraph RendererLayer ["3. Bộ Nạp Động (TemplateRenderer)"]
        RendererComp["TemplateRenderer.tsx\n- Nhận wedding: WeddingData\n- Đọc template.slug\n- Dynamic import tương ứng\n- Fallback về Classic Burgundy nếu không tìm thấy"]
    end

    subgraph TemplatesPack ["4. Các Gói Mẫu Hiện Hữu (components/templates/)"]
        T1["classic-burgundy\n- Burgundy, Gold Accent\n- Phong bì mở thiệp\n- Countdown, Audio, Gallery"]
        T2["minimal-korean\n- Minimalist Editorial\n- Typography cao cấp\n- Lineage & Ceremony Ticket"]
        T3["template1 (Modern Elegance)\n- Card hiện đại\n- Tròn trịa, hoa lá nhẹ nhàng\n- RSVP nổi bật"]
        T4["template2 (Cinematic 3D)\n- Album xoay Coverflow 3D\n- Story Timeline\n- Hiệu ứng pháo hoa Confetti"]
    end

    subgraph CustomizationEngine ["5. Tùy Biến Trực Tiếp (Live Customizer)"]
        FontEngine["lib/template-fonts.ts\nTính CSS Variables + Nạp Google Fonts động"]
        ColorEngine["CSS Vars (--primary-color, --accent-color)"]
        SectionEngine["Thứ tự & Trạng thái bật/tắt Section"]
    end

    WeddingData --> RendererComp
    RegistryFile --> RendererComp
    RendererComp --> T1
    RendererComp --> T2
    RendererComp --> T3
    RendererComp --> T4

    CustomizationEngine --> T1 & T2 & T3 & T4
```

---

## 5. Sơ Đồ Luồng Biên Tập Trực Quan Thời Gian Thực (Live Customizer Flow)

Luồng tương tác giữa Trình biên tập cha (`EditWeddingForm`) và Khung xem trước iframe (`/w/preview`):

```mermaid
sequenceDiagram
    autonumber
    actor User as Cặp Đôi (Người Dùng)
    participant Parent as EditWeddingForm (Dashboard)
    participant Iframe as Iframe Preview (/w/preview)
    participant API as API Server (/api/weddings/[id])
    participant S3 as Object Storage (S3/MinIO)

    Note over User, Parent: Người dùng chỉnh sửa thông tin hoặc upload ảnh
    User->>Parent: Thay đổi họ tên / màu sắc / thứ tự khối
    Parent->>Iframe: window.postMessage({ type: "UPDATE_PREVIEW", data: weddingData })
    Note over Iframe: Cập nhật state nội bộ ngay lập tức (Không cần reload iframe)
    Iframe-->>User: Giao diện thiệp phản ánh thay đổi tức thì (0ms trễ)

    Note over Parent, API: Cơ chế Autosave (Debounced)
    Parent->>API: PATCH /api/weddings/[id] (Payload: thay đổi gần nhất)
    API-->>Parent: 200 OK (Đã lưu vào PostgreSQL)

    alt Upload ảnh bìa / Album cưới
        User->>Parent: Chọn tệp ảnh mới
        Parent->>API: POST /api/weddings/[id]/upload/presign (slotKey, fileName)
        API-->>Parent: Presigned S3 Upload URL + Public URL
        Parent->>S3: PUT tệp trực tiếp lên S3/MinIO (Bypass Next.js server)
        S3-->>Parent: 200 OK
        Parent->>API: Ghi nhận FileManagement (slotKey, publicUrl)
        Parent->>Iframe: postMessage cập nhật ảnh mới trên thiệp
    end
```

---

## 6. Sơ Đồ Luồng Thanh Toán Tự Động VietQR & Casso (Automated Payment Flow)

Luồng thanh toán không cần can thiệp thủ công, sử dụng chuẩn VietQR và webhook Casso:

```mermaid
sequenceDiagram
    autonumber
    actor User as Cặp Đôi (Chủ Thiệp)
    participant App as Dashboard (/weddings/[id]/publish)
    participant PayAPI as API (/api/payment/create)
    participant VietQR as Dịch vụ VietQR (lib/vietqr.ts)
    participant Casso as Casso Webhook
    participant WebhookAPI as API (/api/webhooks/casso)
    participant DB as PostgreSQL (Prisma)
    participant Tele as Telegram Notification Bot

    User->>App: Bấm "Xuất bản thiệp" / "Gia hạn"
    App->>PayAPI: POST /api/payment/create (weddingId, couponCode)
    PayAPI->>DB: Tạo bản ghi Payment (Status: PENDING, Cú pháp: TC<shortId>)
    PayAPI->>VietQR: Sinh link ảnh VietQR với số tài khoản + số tiền + nội dung TC<shortId>
    VietQR-->>PayAPI: QR Code Image URL
    PayAPI-->>App: Trả về Payment ID + VietQR URL + Hướng dẫn CK
    App-->>User: Hiển thị mã QR ngân hàng trên màn hình

    Note over User, Casso: Người dùng quét mã VietQR và chuyển khoản bằng Mobile Banking
    Casso->>WebhookAPI: POST /api/webhooks/casso (Headers: x-api-key)
    Note over WebhookAPI: Xác thực API Key bảo mật

    WebhookAPI->>DB: Tìm Payment PENDING có transactionId khớp TC<shortId>
    alt Khớp mã giao dịch và số tiền hợp lệ (paidAmount >= amount)
        WebhookAPI->>DB: Chạy Prisma Transaction ($transaction):
        Note over DB: 1. Đổi Payment status -> COMPLETED<br/>2. Cập nhật Wedding status -> PUBLISHED<br/>3. Cập nhật expiresAt (+6 tháng / +1 năm)<br/>4. Tăng redemptionCount của Coupon (nếu có)
        WebhookAPI->>Tele: Gửi thông báo đơn hàng thành công vào Telegram Admin
        WebhookAPI-->>Casso: 200 OK (Ghi nhận thành công)
    else Sai số tiền hoặc mã đã xử lý trước đó (Idempotency)
        WebhookAPI-->>Casso: 200 OK (Bỏ qua xử lý lặp lại)
    end

    User->>App: Màn hình tự động polling / kiểm tra trạng thái
    App->>DB: GET /api/payment/[paymentId]/status
    DB-->>App: Status: COMPLETED
    App-->>User: Hiển thị màn hình chúc mừng & Link thiệp chính thức
```

---

## 7. Sơ Đồ Luồng Khách Mời & Tương Tác RSVP (Guest Experience Flow)

Luồng khách mời nhận thiệp mời cá nhân hóa, xem thiệp và xác nhận tham dự:

```mermaid
flowchart TD
    StartGuest([Khách mời mở link:\n/w/thanhtung-huonggiang?guest=Anh+Hoang&side=groom]) --> SSRFetch[Next.js Server SSR:\nFetch Wedding + Guest info]

    SSRFetch --> GenMeta[generateMetadata:\nSinh Title, Description, Open Graph Image chuẩn SEO]
    GenMeta --> TrackOpen{Có query guestId?}

    TrackOpen -->|Có| MarkLinkOpened[Ghi nhận linkOpened: true\nCập nhật linkOpenedAt vào DB]
    TrackOpen -->|Không| RenderPage[Tải giao diện Thiệp Cưới]
    MarkLinkOpened --> RenderPage

    RenderPage --> EnvelopeScene[1. Hoạt Cảnh Mở Phong Bì\nHiệu ứng sáp niêm phong & lời chào cá nhân]
    EnvelopeScene --> PlayMusic[2. Phát Nhạc Nền\n(Tự động hoặc tương tác bật âm thanh)]
    PlayMusic --> HeroCountdown[3. Thông Tin Cặp Đôi & Countdown Đếm Ngược]
    HeroCountdown --> GalleryCoverflow[4. Album Ảnh Cưới 3D & Chuyện Tình Yêu]
    HeroCountdown --> FamilyInfo[5. Lễ Cưới Nhà Trai / Nhà Gái & Bản Đồ Google Maps]

    FamilyInfo --> RSVPAction{Khách mời tương tác}

    RSVPAction -->|Xác nhận tham dự| SubmitRSVP[Gửi Form RSVP:\n- Họ tên, SĐT, Số người đi cùng\n- Trạng thái: ACCEPTED / DECLINED]
    SubmitRSVP --> PostRSVP[POST /api/rsvp]
    PostRSVP --> UpdateGuestDB[(Cập nhật Guest.rsvpStatus)]

    RSVPAction -->|Gửi lời chúc| SubmitWish[Nhập lời chúc phúc cho cặp đôi]
    SubmitWish --> PostWish[POST /api/wishes]
    PostWish --> SaveWishDB[(Lưu Wish vào DB)]

    RSVPAction -->|Mừng cưới| OpenQR[Xem mã QR mừng cưới Nhà Trai / Nhà Gái]
    OpenQR --> BankApp[Mở App Ngân Hàng chuyển khoản trực tiếp]
```

---

## 8. Sơ Đồ Luồng Upload Tài Nguyên Đa Phương Tiện (Asset Storage Flow)

Quy trình tải ảnh cưới và nhạc nền với kiến trúc Presigned URL an toàn:

```mermaid
sequenceDiagram
    autonumber
    actor User as Cặp Đôi / Quản Trị Viên
    participant Client as Web Client (EditWeddingMediaSection)
    participant Route as API Route (/api/weddings/[id]/upload/presign)
    participant S3Client as S3 / MinIO Client (lib/s3-client.ts)
    participant Storage as S3 / MinIO Storage Server
    participant DB as PostgreSQL (FileManagement Table)

    User->>Client: Chọn tệp ảnh cưới (JPEG/PNG/WebP) hoặc nhạc (MP3)
    Client->>Client: Kiểm tra dung lượng & định dạng file (Client-side validation)
    Client->>Route: POST /api/weddings/[id]/upload/presign { fileName, fileType, slotKey }
    Route->>S3Client: Tạo PutObjectCommand với bucket & key duy nhất
    S3Client->>Storage: Yêu cầu Presigned URL (Hết hạn sau 15 phút)
    Storage-->>S3Client: Trả về Signed URL
    S3Client-->>Route: URL ký danh
    Route-->>Client: { uploadUrl, publicUrl, storageKey }

    Note over Client, Storage: Client đẩy thẳng file lên Storage (Không qua Next.js Server)
    Client->>Storage: PUT uploadUrl (Binary Data)
    Storage-->>Client: 200 OK (Upload thành công)

    Client->>Route: POST /api/weddings/[id]/upload (Xác nhận lưu DB)
    Route->>DB: Upsert FileManagement:\n{ weddingId, slotKey, publicUrl, storageKey, sizeBytes }
    DB-->>Route: Record saved
    Route-->>Client: 200 OK (Hoàn tất)
    Client-->>User: Hiển thị ảnh xem trước trên giao diện
```

---

## 9. Hướng Dẫn Mở Rộng Dành Cho Lập Trình Viên (Developer Guide)

### Thêm Mẫu Thiệp Mới (New Template)
Khi phát triển template mới, cần tuân thủ đúng 3 bước theo quy chuẩn hệ thống:
1. **Định nghĩa Metadata**: Khai báo tại `prisma/template-defs.cjs` (gồm slug, tên, giá, các section hỗ trợ).
2. **Xây dựng Component**: Tạo thư mục tại `components/templates/[slug]/`, tuân thủ nhận prop chuẩn `WeddingData`.
3. **Đăng ký vào Registry**: Khai báo dynamic import tại `lib/template-registry.ts`.
4. **Chạy kiểm thử & build**: `npm test` và `npm run build` để đảm bảo tương thích type-safety 100%.
