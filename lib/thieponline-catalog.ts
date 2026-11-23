/**
 * Toàn bộ danh mục 123 mẫu thiệp trích xuất từ thieponline.app
 * (bao gồm metadata chủ đề, dịp sự kiện, điểm Hot/Trending, tag, màu sắc và ảnh mặc định).
 */

export type ThiepOnlineOccasion = "wedding" | "birthday" | "graduation" | "event";

export type ThiepOnlineCatalogItem = {
  slug: string;
  name: string;
  description: string;
  thumbnail: string;
  preview: string;
  category: "classic" | "modern" | "minimal" | "luxury" | "vintage";
  isPremium: boolean;
  minPlan: "FREE" | "BASIC" | "STANDARD" | "PREMIUM";
  defaultColors: {
    primary: string;
    accent: string;
    background: string;
  };
  tags: string[];
  colors: string[];
  badges: string[];
  occasion: ThiepOnlineOccasion;
  trendingScore: number;
  isHot: boolean;
  isNew: boolean;
  releasedAt: string;
  jsFile: string;
  exportName: string;
  cssFiles: string[];
  defaultImages: string[];
};

export const THIEPONLINE_CATALOG: ThiepOnlineCatalogItem[] = [
  {
    "slug": "minimalism-do-dam",
    "name": "Minimalism - Đỏ Đậm",
    "description": "Tối giản sang trọng với nền kem, tông đỏ đô, hoa mẫu đơn và dấu sáp trái tim",
    "thumbnail": "/images/template-previews/listing/minimalism_darkred.webp",
    "preview": "/images/template-previews/full/minimalism_darkred.webp",
    "category": "minimal",
    "isPremium": false,
    "minPlan": "FREE",
    "defaultColors": {
      "primary": "#511419",
      "accent": "#c9a24a",
      "background": "#fff7eb"
    },
    "tags": [
      "Truyền thống",
      "Tối giản",
      "Hoa lá",
      "Sang trọng"
    ],
    "colors": [
      "Đỏ"
    ],
    "badges": [
      "Hot"
    ],
    "occasion": "wedding",
    "trendingScore": 6.7,
    "isHot": true,
    "isNew": false,
    "releasedAt": "2026-07-26T06:45:43.930179+00:00",
    "jsFile": "minimalism-do-dam-template-qMmsDy4_.js",
    "exportName": "MinimalismDoDamTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "minimalism-do-dam-DZpkChSH.css"
    ],
    "defaultImages": [
      "/images/themes/minimalism-dark-red/hero.jpg",
      "/images/themes/minimalism-dark-red/gallery_1.jpg",
      "/images/themes/minimalism-dark-red/gallery_2.jpg",
      "/images/themes/minimalism-dark-red/gallery_3.jpg",
      "/images/themes/minimalism-dark-red/gallery_4.jpg",
      "/images/themes/minimalism-dark-red/gallery_5.jpg",
      "/images/themes/minimalism-dark-red/gallery_6.jpg",
      "/images/themes/minimalism-dark-red/gallery_7.jpg"
    ]
  },
  {
    "slug": "mau-don-do",
    "name": "Mẫu Đơn - Đỏ",
    "description": "Nền giấy thạch cao trắng, chữ đỏ rượu, hoa mẫu đơn đỏ có bướm đậu, phong bì đỏ kẹp lịch tháng trên giấy xé, cô dâu chú rể trên nền thạch cao tối, timeline biểu tượng nét đỏ và đồng hồ đếm ngược trên ảnh cưới",
    "thumbnail": "/images/template-previews/listing/peony_red.webp",
    "preview": "/images/template-previews/full/peony_red.webp",
    "category": "modern",
    "isPremium": false,
    "minPlan": "FREE",
    "defaultColors": {
      "primary": "#790606",
      "accent": "#d4af37",
      "background": "#fff7eb"
    },
    "tags": [
      "Hoa mẫu đơn",
      "Áo dài",
      "Có ảnh"
    ],
    "colors": [
      "Đỏ"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 2,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-10-20T14:47:25.641505+00:00",
    "jsFile": "peony-red-template-CyDI_fYc.js",
    "exportName": "PeonyRedTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "peony-red-CRdVHMBi.css"
    ],
    "defaultImages": [
      "/images/themes/longphung-v3-red/gallery_6.jpg",
      "/images/themes/longphung-v3-red/gallery_2.jpg",
      "/images/themes/longphung-v3-red/gallery_9.jpg",
      "/images/themes/longphung-v3-red/gallery_1.jpg",
      "/images/themes/longphung-v3-red/gallery_8.jpg",
      "/images/themes/longphung-v3-red/gallery_4.jpg",
      "/images/themes/longphung-v3-red/gallery_3.jpg",
      "/images/themes/longphung-v3-red/gallery_7.jpg",
      "/images/themes/longphung-v3-red/gallery_10.jpg",
      "/images/themes/longphung-v3-red/gallery_5.jpg"
    ]
  },
  {
    "slug": "ngoc-trai-be",
    "name": "Ngọc Trai - Be",
    "description": "Nền lụa trắng ngọc trai, chữ lồng tên trong vòng lá vàng, thẻ mời viền lượn sóng có hoa lan trắng, lưới ảnh kẹp thẻ Save the date, ảnh polaroid Love Forever, timeline nửa ảnh nửa nền be và album Endless Romance",
    "thumbnail": "/images/template-previews/listing/pearl_satin_beige.webp",
    "preview": "/images/template-previews/full/pearl_satin_beige.webp",
    "category": "modern",
    "isPremium": false,
    "minPlan": "FREE",
    "defaultColors": {
      "primary": "#790606",
      "accent": "#d4af37",
      "background": "#fff7eb"
    },
    "tags": [
      "Ngọc trai",
      "Lụa",
      "Có ảnh"
    ],
    "colors": [
      "Nâu"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-10-18T17:02:39.776864+00:00",
    "jsFile": "pearl-satin-beige-template-DuJ98CvB.js",
    "exportName": "PearlSatinBeigeTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "pearl-satin-beige-BMn2T4Ki.css"
    ],
    "defaultImages": [
      "/images/themes/minimalism-brown/gallery_4.jpg",
      "/images/themes/minimalism-brown/gallery_5.jpg",
      "/images/themes/silkflora-brown/gallery_3.webp",
      "/images/themes/silkflora-brown/gallery_4.webp",
      "/images/themes/minimalism-brown/gallery_1.jpg",
      "/images/themes/minimalism-brown/gallery_2.jpg",
      "/images/themes/silkflora-brown/gallery_2.webp",
      "/images/themes/minimalism-brown/gallery_6.jpg",
      "/images/themes/silkflora-brown/gallery_6.webp",
      "/images/themes/silkflora-brown/gallery_1.webp"
    ]
  },
  {
    "slug": "minimalism-nau",
    "name": "Minimalism - Nâu",
    "description": "Tối giản thanh lịch với nền kem trắng và sắc nâu trầm ấm áp",
    "thumbnail": "/images/template-previews/listing/minimalism_brown.webp",
    "preview": "/images/template-previews/full/minimalism_brown.webp",
    "category": "minimal",
    "isPremium": false,
    "minPlan": "FREE",
    "defaultColors": {
      "primary": "#5c4033",
      "accent": "#c5a165",
      "background": "#fbf8f3"
    },
    "tags": [
      "Tối giản",
      "Thanh lịch"
    ],
    "colors": [
      "Nâu"
    ],
    "badges": [
      "Hot"
    ],
    "occasion": "wedding",
    "trendingScore": 9,
    "isHot": true,
    "isNew": false,
    "releasedAt": "2026-07-25T02:33:14.744271+00:00",
    "jsFile": "minimalism-nau-template-qj2OsBV8.js",
    "exportName": "MinimalismNauTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "minimalism-nau-CkNvy_Gh.css"
    ],
    "defaultImages": [
      "/images/themes/minimalism-brown/hero.jpg",
      "/images/themes/minimalism-brown/gallery_1.jpg",
      "/images/themes/minimalism-brown/gallery_2.jpg",
      "/images/themes/minimalism-brown/gallery_3.jpg",
      "/images/themes/minimalism-brown/gallery_4.jpg",
      "/images/themes/minimalism-brown/gallery_5.jpg",
      "/images/themes/minimalism-brown/gallery_6.jpg"
    ]
  },
  {
    "slug": "to-duyen-tim",
    "name": "Tơ Duyên - Tím",
    "description": "Hoa sen tím tử đinh hương nở trên nền giấy trắng tinh, dải lụa tím mềm mại uốn quanh từng phần nội dung cùng những nét cong mảnh như sợi tơ; chữ tím amethyst, bố cục so le trái phải, gợi vẻ thanh lịch và trầm tĩnh.",
    "thumbnail": "/images/template-previews/listing/silk_ribbon_purple.webp",
    "preview": "/images/template-previews/full/silk_ribbon_purple.webp",
    "category": "minimal",
    "isPremium": false,
    "minPlan": "FREE",
    "defaultColors": {
      "primary": "#432a5c",
      "accent": "#bda3d6",
      "background": "#f9f6fc"
    },
    "tags": [
      "Tối giản",
      "Hoa lá",
      "Hoa sen",
      "Lụa",
      "Thanh lịch"
    ],
    "colors": [
      "Tím",
      "Trắng"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-09-21T06:20:07.368958+00:00",
    "jsFile": "silk-ribbon-purple-template-CI57RB5W.js",
    "exportName": "SilkRibbonPurpleTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "silk-ribbon-purple-Cc9DspAY.css"
    ],
    "defaultImages": [
      "/images/themes/silk-ribbon-purple/groom.webp",
      "/images/themes/silk-ribbon-purple/bride.webp",
      "/images/themes/silk-ribbon-purple/gallery_1.webp",
      "/images/themes/silk-ribbon-purple/gallery_2.webp",
      "/images/themes/silk-ribbon-purple/gallery_3.webp",
      "/images/themes/silk-ribbon-purple/gallery_4.webp",
      "/images/themes/silk-ribbon-purple/gallery_5.webp",
      "/images/themes/silk-ribbon-purple/gallery_6.webp",
      "/images/themes/silk-ribbon-purple/gallery_7.webp",
      "/images/themes/silk-ribbon-purple/gallery_8.webp"
    ]
  },
  {
    "slug": "song-hy-xanh",
    "name": "Song Hỷ - Xanh",
    "description": "Chữ Hỷ nền xanh lá, khung ảnh cung, phong bì 囍",
    "thumbnail": "/images/template-previews/listing/song_hy_green.webp",
    "preview": "/images/template-previews/full/song_hy_green.webp",
    "category": "classic",
    "isPremium": false,
    "minPlan": "FREE",
    "defaultColors": {
      "primary": "#2e5a36",
      "accent": "#8bc34a",
      "background": "#f6faf6"
    },
    "tags": [
      "Truyền thống",
      "Chữ Hỷ"
    ],
    "colors": [
      "Xanh lá"
    ],
    "badges": [
      "Hot"
    ],
    "occasion": "wedding",
    "trendingScore": 3,
    "isHot": true,
    "isNew": false,
    "releasedAt": "2026-07-25T16:22:02.154984+00:00",
    "jsFile": "song-hy-green-template-DUrWVYgy.js",
    "exportName": "SongHyGreenTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "song-hy-green-3mVb7g-O.css"
    ],
    "defaultImages": [
      "/images/themes/song-hy-green/couple.webp",
      "/images/themes/song-hy-green/gallery_1.webp",
      "/images/themes/song-hy-green/gallery_2.webp",
      "/images/themes/song-hy-green/gallery_3.webp",
      "/images/themes/song-hy-green/gallery_4.webp",
      "/images/themes/song-hy-green/gallery_5.webp",
      "/images/themes/song-hy-green/gallery_6.webp"
    ]
  },
  {
    "slug": "hoa-kho-v2-lam",
    "name": "Hoa Khô V2 - Lam",
    "description": "Hoa khô vẽ màu nước tông lam và vàng đất trên nền giấy kem, điểm những cánh bướm nhạt xuyên suốt tấm thiệp.",
    "thumbnail": "/images/template-previews/listing/hoa_kho_v2_blue.webp",
    "preview": "/images/template-previews/full/hoa_kho_v2_blue.webp",
    "category": "vintage",
    "isPremium": false,
    "minPlan": "FREE",
    "defaultColors": {
      "primary": "#1e4b7a",
      "accent": "#64b5f6",
      "background": "#f5f9fd"
    },
    "tags": [
      "Boho",
      "Hoa lá",
      "Hoa khô",
      "Bướm",
      "Màu nước"
    ],
    "colors": [
      "Xanh dương"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 1,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-10-03T12:46:15.590409+00:00",
    "jsFile": "hoa-kho-v2-blue-template-BBHEiIDQ.js",
    "exportName": "HoaKhoV2BlueTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "hoa-kho-v2-blue-CyA4Jc6v.css"
    ],
    "defaultImages": [
      "/images/themes/hoa-kho-v2-blue/gallery_1.webp",
      "/images/themes/hoa-kho-v2-blue/gallery_2.webp",
      "/images/themes/hoa-kho-v2-blue/gallery_3.webp",
      "/images/themes/hoa-kho-v2-blue/gallery_4.webp",
      "/images/themes/hoa-kho-v2-blue/gallery_5.webp",
      "/images/themes/hoa-kho-v2-blue/gallery_6.webp",
      "/images/themes/hoa-kho-v2-blue/gallery_7.webp",
      "/images/themes/hoa-kho-v2-blue/gallery_8.webp",
      "/images/themes/hoa-kho-v2-blue/gallery_9.webp",
      "/images/themes/hoa-kho-v2-blue/gallery_10.webp"
    ]
  },
  {
    "slug": "long-phung-v3-do",
    "name": "Long Phụng V3 - Đỏ",
    "description": "Nền đỏ thẫm cổ điển, khung ảnh vòm rồng phượng và họa tiết chim én tinh tế",
    "thumbnail": "/images/template-previews/listing/dragon_phoenix_v3_red.webp",
    "preview": "/images/template-previews/full/dragon_phoenix_v3_red.webp",
    "category": "classic",
    "isPremium": false,
    "minPlan": "FREE",
    "defaultColors": {
      "primary": "#790606",
      "accent": "#d4af37",
      "background": "#fff7eb"
    },
    "tags": [
      "Truyền thống",
      "Rồng phượng",
      "Cổ điển"
    ],
    "colors": [
      "Đỏ"
    ],
    "badges": [],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": false,
    "releasedAt": "2026-07-24T18:41:29.839079+00:00",
    "jsFile": "longphung-v3-red-template-DP-JSNyw.js",
    "exportName": "LongPhungV3RedTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "longphung-v3-red-DdH1lI9A.css"
    ],
    "defaultImages": [
      "/images/themes/longphung-v3-red/hero.jpg",
      "/images/themes/longphung-v3-red/gallery_1.jpg",
      "/images/themes/longphung-v3-red/gallery_2.jpg",
      "/images/themes/longphung-v3-red/gallery_3.jpg",
      "/images/themes/longphung-v3-red/gallery_4.jpg",
      "/images/themes/longphung-v3-red/gallery_5.jpg",
      "/images/themes/longphung-v3-red/gallery_6.jpg",
      "/images/themes/longphung-v3-red/gallery_7.jpg",
      "/images/themes/longphung-v3-red/gallery_8.jpg",
      "/images/themes/longphung-v3-red/gallery_9.jpg"
    ]
  },
  {
    "slug": "florence-nau",
    "name": "Florence - Nâu",
    "description": "Tranh màu nước vẽ thành Florence, mái vòm gạch đỏ của nhà thờ Duomo soi bóng xuống sông Arno, cầu đá phủ hoa hồng và hàng bách Tuscany trong sắc nâu ấm",
    "thumbnail": "/images/template-previews/listing/florence_brown.webp",
    "preview": "/images/template-previews/full/florence_brown.webp",
    "category": "vintage",
    "isPremium": false,
    "minPlan": "FREE",
    "defaultColors": {
      "primary": "#5c4033",
      "accent": "#c5a165",
      "background": "#fbf8f3"
    },
    "tags": [
      "Sân vườn",
      "Florence",
      "Màu nước",
      "Phong cảnh"
    ],
    "colors": [
      "Nâu"
    ],
    "badges": [
      "Hot",
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 8,
    "isHot": true,
    "isNew": true,
    "releasedAt": "2026-10-07T01:14:34.592432+00:00",
    "jsFile": "florence-brown-template-BMba6Df7.js",
    "exportName": "FlorenceBrownTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "florence-brown-Cc0A_x6M.css"
    ],
    "defaultImages": [
      "/images/template-previews/full/florence_brown.webp"
    ]
  },
  {
    "slug": "hoa-moc-xanh",
    "name": "Hoa Mộc - Xanh",
    "description": "Hoa mộc watercolor với tông xanh lá thanh nhã trên nền kem trắng",
    "thumbnail": "/images/template-previews/listing/boho_floral_green.webp",
    "preview": "/images/template-previews/full/boho_floral_green.webp",
    "category": "vintage",
    "isPremium": false,
    "minPlan": "FREE",
    "defaultColors": {
      "primary": "#2e5a36",
      "accent": "#8bc34a",
      "background": "#f6faf6"
    },
    "tags": [
      "Boho",
      "Hoa lá",
      "Hoa Mộc",
      "Rustic"
    ],
    "colors": [
      "Xanh lá"
    ],
    "badges": [],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": false,
    "releasedAt": "2026-07-23T15:24:07.864218+00:00",
    "jsFile": "boho-floral-green-template-g8Ms1ZrU.js",
    "exportName": "BohoFloralGreenTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "boho-floral-green-auhAhShs.css"
    ],
    "defaultImages": [
      "/images/themes/boho-floral-green/groom.webp",
      "/images/themes/boho-floral-green/bride.webp",
      "/images/themes/boho-floral-green/gallery_1.webp",
      "/images/themes/boho-floral-green/gallery_2.webp",
      "/images/themes/boho-floral-green/gallery_3.webp",
      "/images/themes/boho-floral-green/gallery_4.webp",
      "/images/themes/boho-floral-green/gallery_5.webp",
      "/images/themes/boho-floral-green/gallery_6.webp",
      "/images/themes/boho-floral-green/gallery_7.webp",
      "/images/themes/boho-floral-green/gallery_8.webp"
    ]
  },
  {
    "slug": "hac-sen-do",
    "name": "Hạc Sen - Đỏ",
    "description": "Thiệp nền giấy chữ đỏ đô: ảnh cưới chuyển dần sang đỏ, đôi hạc, hoa sen và chữ Hỷ, khối \"Câu chuyện chúng mình\", lịch Save the date và lịch trình có biểu tượng — trang trọng và ấm áp.",
    "thumbnail": "/images/template-previews/listing/crane_lotus_red.webp",
    "preview": "/images/template-previews/full/crane_lotus_red.webp",
    "category": "classic",
    "isPremium": false,
    "minPlan": "FREE",
    "defaultColors": {
      "primary": "#790606",
      "accent": "#d4af37",
      "background": "#fff7eb"
    },
    "tags": [
      "Truyền thống",
      "Có ảnh",
      "Hạc sen",
      "Chữ Hỷ",
      "Hoa lá",
      "Câu chuyện",
      "Hoa sen"
    ],
    "colors": [
      "Đỏ"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 2,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-09-30T09:20:17.388121+00:00",
    "jsFile": "crane-lotus-red-template-B3Vemcul.js",
    "exportName": "CraneLotusRedTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "crane-lotus-red-Bc_QvMZc.css"
    ],
    "defaultImages": [
      "/images/themes/songlong-red/gallery_6.jpg",
      "/images/themes/songlong-red/gallery_10.jpg",
      "/images/themes/songlong-red/gallery_8.jpg",
      "/images/themes/songlong-red/gallery_13.jpg",
      "/images/themes/songlong-red/gallery_1.jpg",
      "/images/themes/songlong-red/gallery_2.jpg",
      "/images/themes/songlong-red/gallery_3.jpg",
      "/images/themes/songlong-red/gallery_4.jpg",
      "/images/themes/songlong-red/gallery_5.jpg",
      "/images/themes/songlong-red/gallery_7.jpg"
    ]
  },
  {
    "slug": "minimalism-xanh",
    "name": "Minimalism - Xanh",
    "description": "Tối giản thanh lịch với nền giấy trắng và sắc xanh lá cây thảo mộc",
    "thumbnail": "/images/template-previews/listing/minimalism_green.webp",
    "preview": "/images/template-previews/full/minimalism_green.webp",
    "category": "minimal",
    "isPremium": false,
    "minPlan": "FREE",
    "defaultColors": {
      "primary": "#2e5a36",
      "accent": "#8bc34a",
      "background": "#f6faf6"
    },
    "tags": [
      "Tối giản",
      "Thanh lịch"
    ],
    "colors": [
      "Xanh lá"
    ],
    "badges": [
      "Hot"
    ],
    "occasion": "wedding",
    "trendingScore": 5.3,
    "isHot": true,
    "isNew": false,
    "releasedAt": "2026-07-25T04:09:53.402684+00:00",
    "jsFile": "minimalism-xanh-template-DVyc_VB3.js",
    "exportName": "MinimalismXanhTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "minimalism-xanh-BGeyThvG.css"
    ],
    "defaultImages": [
      "/images/themes/minimalism-green/groom.webp",
      "/images/themes/minimalism-green/bride.webp",
      "/images/themes/minimalism-green/gallery_1.webp",
      "/images/themes/minimalism-green/gallery_2.webp",
      "/images/themes/minimalism-green/gallery_3.webp",
      "/images/themes/minimalism-green/gallery_4.webp",
      "/images/themes/minimalism-green/gallery_5.webp",
      "/images/themes/minimalism-green/gallery_6.webp",
      "/images/themes/minimalism-green/gallery_7.webp"
    ]
  },
  {
    "slug": "san-miguel-vang",
    "name": "San Miguel - Vàng",
    "description": "Tranh màu nước vẽ thị trấn thuộc địa Mexico, nhà thờ mái vòm vàng ochre, đài phun nước đá và hoa giấy hồng đổ xuống hai bên",
    "thumbnail": "/images/template-previews/listing/san_miguel_yellow.webp",
    "preview": "/images/template-previews/full/san_miguel_yellow.webp",
    "category": "vintage",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#8c6d23",
      "accent": "#d4af37",
      "background": "#fdfbf5"
    },
    "tags": [
      "Sân vườn",
      "Hoa lá",
      "San Miguel",
      "Màu nước",
      "Hoa giấy"
    ],
    "colors": [
      "Vàng"
    ],
    "badges": [
      "Hot",
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 8,
    "isHot": true,
    "isNew": true,
    "releasedAt": "2026-10-04T12:25:49.855502+00:00",
    "jsFile": "san-miguel-yellow-template-B5YdRZk-.js",
    "exportName": "SanMiguelYellowTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "san-miguel-yellow-UGUhMTzU.css"
    ],
    "defaultImages": [
      "/images/themes/san-miguel-yellow/gallery_1.webp",
      "/images/themes/san-miguel-yellow/gallery_2.webp",
      "/images/themes/san-miguel-yellow/gallery_3.webp",
      "/images/themes/san-miguel-yellow/gallery_4.webp",
      "/images/themes/san-miguel-yellow/gallery_5.webp",
      "/images/themes/san-miguel-yellow/gallery_6.webp",
      "/images/themes/san-miguel-yellow/gallery_7.webp"
    ]
  },
  {
    "slug": "song-hy-do",
    "name": "Song Hỷ - Đỏ",
    "description": "Chữ Hỷ trang trọng, khung ảnh cung, phong bì 囍",
    "thumbnail": "/images/template-previews/listing/song_hy_red.webp",
    "preview": "/images/template-previews/full/song_hy_red.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#800000",
      "accent": "#fbbf24",
      "background": "#fff7eb"
    },
    "tags": [
      "Truyền thống",
      "Chữ Hỷ"
    ],
    "colors": [
      "Đỏ"
    ],
    "badges": [
      "Hot"
    ],
    "occasion": "wedding",
    "trendingScore": 3,
    "isHot": true,
    "isNew": false,
    "releasedAt": "2026-07-23T15:20:07.480805+00:00",
    "jsFile": "song-hy-red-template-p97aMuXQ.js",
    "exportName": "SongHyRedTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "song-hy-red-C_iDqOPZ.css"
    ],
    "defaultImages": [
      "/images/themes/song-hy-red/couple.webp",
      "/images/themes/song-hy-red/gallery_1.webp",
      "/images/themes/song-hy-red/gallery_2.webp",
      "/images/themes/song-hy-red/gallery_3.webp",
      "/images/themes/song-hy-red/gallery_4.webp",
      "/images/themes/song-hy-red/gallery_5.webp",
      "/images/themes/song-hy-red/gallery_6.webp",
      "/images/themes/song-hy-red/gallery_7.webp"
    ]
  },
  {
    "slug": "hoang-cung-do",
    "name": "Hoàng Cung - Đỏ",
    "description": "Bìa rèm lụa và phong bì đỏ, cuộn trang để bước qua cổng cung điện, rồng phượng ánh vàng, đèn lồng và cánh hoa đào rơi, khung vòm ảnh cô dâu chú rể, đếm ngược và chuyện tình dạng dòng thời gian",
    "thumbnail": "/images/template-previews/listing/royal_crimson_red.webp",
    "preview": "/images/template-previews/full/royal_crimson_red.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#790606",
      "accent": "#d4af37",
      "background": "#fff7eb"
    },
    "tags": [
      "Truyền thống",
      "Có ảnh",
      "Rồng phượng",
      "Chữ Hỷ",
      "Hoàng Cung"
    ],
    "colors": [
      "Đỏ",
      "Vàng"
    ],
    "badges": [
      "Hot",
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 3,
    "isHot": true,
    "isNew": true,
    "releasedAt": "2026-10-13T06:48:36.351764+00:00",
    "jsFile": "royal-crimson-red-template-DAs-KBaX.js",
    "exportName": "RoyalCrimsonRedTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "royal-crimson-red-DQQ4NvYm.css"
    ],
    "defaultImages": [
      "/images/themes/nhat-binh-red/gallery_8.webp",
      "/images/themes/nhat-binh-red/gallery_3.webp",
      "/images/themes/nhat-binh-red/gallery_1.webp",
      "/images/themes/nhat-binh-red/gallery_4.webp",
      "/images/themes/nhat-binh-red/gallery_5.webp",
      "/images/themes/nhat-binh-red/gallery_6.webp",
      "/images/themes/nhat-binh-red/gallery_9.webp",
      "/images/themes/nhat-binh-red/gallery_10.webp"
    ]
  },
  {
    "slug": "neel-bagh-lam",
    "name": "Neel Bagh - Lam",
    "description": "Tranh màu nước vòm đá phủ hoa trắng xanh bên hồ, thuyền buồm và tháp chuông, các lễ in trên thẻ hình vòm viền vàng",
    "thumbnail": "/images/template-previews/listing/neel_bagh_blue.webp",
    "preview": "/images/template-previews/full/neel_bagh_blue.webp",
    "category": "vintage",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#1e4b7a",
      "accent": "#64b5f6",
      "background": "#f5f9fd"
    },
    "tags": [
      "Sân vườn",
      "Hoa lá",
      "Neel Bagh",
      "Màu nước",
      "Bên hồ"
    ],
    "colors": [
      "Xanh dương"
    ],
    "badges": [
      "Hot",
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 8,
    "isHot": true,
    "isNew": true,
    "releasedAt": "2026-10-06T13:48:08.658042+00:00",
    "jsFile": "neel-bagh-blue-template-B3TTIUEU.js",
    "exportName": "NeelBaghBlueTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "neel-bagh-blue-CebIhRMY.css"
    ],
    "defaultImages": [
      "/images/themes/neel-bagh-blue/hero-sky.webp",
      "/images/themes/neel-bagh-blue/hero-mid.webp",
      "/images/themes/neel-bagh-blue/hero-front.webp",
      "/images/themes/neel-bagh-blue/gallery-bg.webp",
      "/images/themes/riviera-blue/gallery_1.webp",
      "/images/themes/riviera-blue/gallery_2.webp",
      "/images/themes/riviera-blue/gallery_3.webp",
      "/images/themes/riviera-blue/gallery_4.webp",
      "/images/themes/riviera-blue/gallery_5.webp"
    ]
  },
  {
    "slug": "vuonkinh-hong",
    "name": "Vườn Kính - Hồng",
    "description": "Nền hoa mềm mại phủ kín thiệp, hai tên trong khung kính bầu dục trong suốt và tấm kính lớn ôm trọn nội dung; tông hồng phấn trên lá hồng ánh vàng, gợi vẻ ngọt ngào, lãng mạn kiểu khu vườn mùa xuân.",
    "thumbnail": "/images/template-previews/listing/glass_garden_pink.webp",
    "preview": "/images/template-previews/full/glass_garden_pink.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#c25975",
      "accent": "#f48fb1",
      "background": "#fff8fa"
    },
    "tags": [
      "Sân vườn",
      "Hoa lá",
      "Kính",
      "Lãng mạn"
    ],
    "colors": [
      "Hồng"
    ],
    "badges": [],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": false,
    "releasedAt": "2026-07-25T18:32:22.63493+00:00",
    "jsFile": "glass-garden-pink-template-oeOTzWF7.js",
    "exportName": "GlassGardenPinkTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "glass-garden-pink-BONd2N9P.css"
    ],
    "defaultImages": [
      "/images/themes/glass-garden-pink/gallery_1.jpg",
      "/images/themes/glass-garden-pink/gallery_2.jpg",
      "/images/themes/glass-garden-pink/gallery_3.jpg",
      "/images/themes/glass-garden-pink/gallery_4.jpg",
      "/images/themes/glass-garden-pink/gallery_5.jpg",
      "/images/themes/glass-garden-pink/gallery_6.jpg",
      "/images/themes/glass-garden-pink/gallery_7.jpg",
      "/images/themes/glass-garden-pink/gallery_8.jpg",
      "/images/themes/glass-garden-pink/gallery_9.jpg"
    ]
  },
  {
    "slug": "nha-co-hy-do",
    "name": "Nhà Có Hỷ - Đỏ",
    "description": "Thiệp đỏ son trên giấy kem dập hoa sen: hai cánh cửa hoa sen mở ra chữ Nhà có Hỷ và tranh cô dâu chú rể, hai nhà, tên cô dâu chú rể quanh trái tim, giờ ngày cưới, địa chỉ có nút chỉ đường, tranh áo dài, lịch tháng, đếm ngược, cụm ảnh hình trái tim, timeline, dress code và album ảnh.",
    "thumbnail": "/images/template-previews/listing/joyful_home_red.webp",
    "preview": "/images/template-previews/full/joyful_home_red.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#790606",
      "accent": "#d4af37",
      "background": "#fff7eb"
    },
    "tags": [
      "Truyền thống",
      "Có ảnh",
      "Chữ Hỷ",
      "Hoa lá",
      "Hoa sen"
    ],
    "colors": [
      "Đỏ"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 2,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-10-02T06:00:37.076774+00:00",
    "jsFile": "joyful-home-red-template-B-LkhUbu.js",
    "exportName": "JoyfulHomeRedTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "joyful-home-red-B3yD1Zx_.css"
    ],
    "defaultImages": [
      "/images/themes/joyful-home-red/hero-couple.webp",
      "/images/themes/joyful-home-red/couple-art.webp",
      "/images/themes/song-hy-v2-red/gallery_10.webp",
      "/images/themes/song-hy-v2-red/gallery_11.webp",
      "/images/themes/song-hy-v2-red/hero.webp",
      "/images/themes/song-hy-v2-red/gallery_5.webp",
      "/images/themes/song-hy-v2-red/gallery_7.webp",
      "/images/themes/song-hy-v2-red/gallery_3.webp",
      "/images/themes/song-hy-v2-red/gallery_4.webp",
      "/images/themes/song-hy-v2-red/gallery_6.webp"
    ]
  },
  {
    "slug": "vuonkinh-xanh",
    "name": "Vườn Kính - Xanh",
    "description": "Nền hoa mềm mại phủ kín thiệp, hai tên trong khung kính bầu dục trong suốt và tấm kính lớn ôm trọn nội dung; tông xanh vườn trên hoa trắng, gợi vẻ trong trẻo, lãng mạn kiểu khu vườn mùa xuân.",
    "thumbnail": "/images/template-previews/listing/glass_garden_green.webp",
    "preview": "/images/template-previews/full/glass_garden_green.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#2e5a36",
      "accent": "#8bc34a",
      "background": "#f6faf6"
    },
    "tags": [
      "Sân vườn",
      "Hoa lá",
      "Kính",
      "Lãng mạn"
    ],
    "colors": [
      "Xanh lá"
    ],
    "badges": [],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": false,
    "releasedAt": "2026-07-24T19:38:34.326858+00:00",
    "jsFile": "glass-garden-green-template-DKtQg8xs.js",
    "exportName": "GlassGardenGreenTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "glass-garden-green-DhobMCBa.css"
    ],
    "defaultImages": [
      "/images/themes/glass-garden-green/gallery_1.webp",
      "/images/themes/glass-garden-green/gallery_2.webp",
      "/images/themes/glass-garden-green/gallery_3.webp",
      "/images/themes/glass-garden-green/gallery_4.webp",
      "/images/themes/glass-garden-green/gallery_5.webp",
      "/images/themes/glass-garden-green/gallery_6.webp",
      "/images/themes/glass-garden-green/gallery_7.webp",
      "/images/themes/glass-garden-green/gallery_8.webp",
      "/images/themes/glass-garden-green/gallery_9.webp"
    ]
  },
  {
    "slug": "hoa-tulip-xanh-reu",
    "name": "Hoa Tulip - Xanh Rêu",
    "description": "Thiệp tulip trắng và ngọc trai trên nền lụa kem: Save the Date giữa khung hoa, hai nhà, dải xanh rêu kính mời, giờ ngày tiệc và âm lịch, địa điểm có nút chỉ đường, polaroid và lịch tháng, timeline, đếm ngược, cụm ảnh và album trượt.",
    "thumbnail": "/images/template-previews/listing/tulip_olive.webp",
    "preview": "/images/template-previews/full/tulip_olive.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#2e5a36",
      "accent": "#8bc34a",
      "background": "#f6faf6"
    },
    "tags": [
      "Có ảnh",
      "Hiện đại",
      "Hoa lá",
      "Hoa tulip",
      "Ngọc trai"
    ],
    "colors": [
      "Xanh lá"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 2,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-10-02T04:40:11.386592+00:00",
    "jsFile": "tulip-olive-template-wsF2yErU.js",
    "exportName": "TulipOliveTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "tulip-olive-DGNe6Zdo.css"
    ],
    "defaultImages": [
      "/images/themes/tulip-olive/hero-bg.webp",
      "/images/themes/thanhdiep-green/groom.jpg",
      "/images/themes/thanhdiep-green/bride.jpg",
      "/images/themes/thanhdiep-green/gallery_4.jpg",
      "/images/themes/thanhdiep-green/gallery_1.jpg",
      "/images/themes/thanhdiep-green/gallery_7.jpg",
      "/images/themes/thanhdiep-green/gallery_5.jpg",
      "/images/themes/thanhdiep-green/gallery_3.jpg",
      "/images/themes/thanhdiep-green/gallery_8.jpg",
      "/images/themes/thanhdiep-green/gallery_6.jpg"
    ]
  },
  {
    "slug": "nhat-binh-do",
    "name": "Nhật Bình - Đỏ",
    "description": "Giấy kem ấm, chữ nâu cổ điển và điểm nhấn đỏ son; mây, hoa và đèn lồng có parallax. Phong bì nâu, thẻ kem, con dấu 囍 — gợi áo Nhật Bình và thiệp cổ trang hiện đại.",
    "thumbnail": "/images/template-previews/listing/nhat_binh_red.webp",
    "preview": "/images/template-previews/full/nhat_binh_red.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#790606",
      "accent": "#d4af37",
      "background": "#fff7eb"
    },
    "tags": [
      "Truyền thống",
      "Cổ phục",
      "Giấy kem"
    ],
    "colors": [
      "Đỏ"
    ],
    "badges": [
      "Hot"
    ],
    "occasion": "wedding",
    "trendingScore": 6,
    "isHot": true,
    "isNew": false,
    "releasedAt": "2026-07-23T15:24:07.864218+00:00",
    "jsFile": "nhat-binh-red-template-BrZBCRaw.js",
    "exportName": "NhatBinhRedTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "nhat-binh-red-CoVjeAcv.css"
    ],
    "defaultImages": [
      "/images/themes/nhat-binh-red/gallery_1.webp",
      "/images/themes/nhat-binh-red/gallery_2.webp",
      "/images/themes/nhat-binh-red/gallery_3.webp",
      "/images/themes/nhat-binh-red/gallery_4.webp",
      "/images/themes/nhat-binh-red/gallery_5.webp",
      "/images/themes/nhat-binh-red/gallery_6.webp",
      "/images/themes/nhat-binh-red/gallery_7.webp",
      "/images/themes/nhat-binh-red/gallery_8.webp",
      "/images/themes/nhat-binh-red/gallery_9.webp",
      "/images/themes/nhat-binh-red/gallery_10.webp"
    ]
  },
  {
    "slug": "hoa-xanh-lam",
    "name": "Hoa Xanh - Lam",
    "description": "Tranh màu nước trời xanh nhạt và hoa xanh navy, ảnh cưới trong khung hoa tròn, đồng hồ đếm ngược ô vuông xanh đậm",
    "thumbnail": "/images/template-previews/listing/blue_flowers.webp",
    "preview": "/images/template-previews/full/blue_flowers.webp",
    "category": "vintage",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#1e4b7a",
      "accent": "#64b5f6",
      "background": "#f5f9fd"
    },
    "tags": [
      "Hoa lá",
      "Hoa Xanh",
      "Màu nước",
      "Khung hoa"
    ],
    "colors": [
      "Xanh dương"
    ],
    "badges": [
      "Hot",
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 3,
    "isHot": true,
    "isNew": true,
    "releasedAt": "2026-10-06T15:15:48.957302+00:00",
    "jsFile": "blue-flowers-template-rvzsu3Ph.js",
    "exportName": "BlueFlowersTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "blue-flowers-BmXBJRsp.css"
    ],
    "defaultImages": [
      "/images/themes/blue-flowers/wreath-hero.webp",
      "/images/themes/blue-v1/gallery_1.webp",
      "/images/themes/blue-v1/gallery_2.webp",
      "/images/themes/blue-v1/gallery_3.webp",
      "/images/themes/blue-v1/gallery_4.webp",
      "/images/themes/blue-v1/gallery_5.webp",
      "/images/themes/blue-v1/gallery_6.webp",
      "/images/themes/blue-v1/gallery_7.webp",
      "/images/themes/blue-v1/gallery_8.webp"
    ]
  },
  {
    "slug": "hoa-mau-lam",
    "name": "Hoa Màu - Lam",
    "description": "Hoa thêu dân gian châu Âu rực rỡ viền quanh tấm thiệp ngà, chữ xanh than đậm điểm đỏ son; phong bao mừng cưới cùng một bộ hoa thêu, vui tươi và ấm áp như một tấm khăn tay thủ công",
    "thumbnail": "/images/template-previews/listing/folk_floral_blue.webp",
    "preview": "/images/template-previews/full/folk_floral_blue.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#1e4b7a",
      "accent": "#64b5f6",
      "background": "#f5f9fd"
    },
    "tags": [
      "Truyền thống",
      "Hoa lá",
      "Dân gian",
      "Thêu",
      "Rực rỡ"
    ],
    "colors": [
      "Xanh dương"
    ],
    "badges": [
      "Hot",
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 8,
    "isHot": true,
    "isNew": true,
    "releasedAt": "2026-10-26T07:52:01.403586+00:00",
    "jsFile": "folk-floral-blue-template-DXtySWGg.js",
    "exportName": "FolkFloralBlueTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "folk-floral-blue-BjCHPqik.css"
    ],
    "defaultImages": [
      "/images/themes/folk-floral-blue/gallery_1.webp",
      "/images/themes/folk-floral-blue/gallery_2.webp",
      "/images/themes/folk-floral-blue/gallery_3.webp",
      "/images/themes/folk-floral-blue/gallery_4.webp",
      "/images/themes/folk-floral-blue/gallery_5.webp",
      "/images/themes/folk-floral-blue/gallery_6.webp",
      "/images/themes/folk-floral-blue/gallery_7.webp",
      "/images/themes/folk-floral-blue/gallery_8.webp",
      "/images/themes/folk-floral-blue/gallery_9.webp",
      "/images/themes/folk-floral-blue/gallery_10.webp"
    ]
  },
  {
    "slug": "song-long-do",
    "name": "Song Long - Đỏ",
    "description": "Phong cách truyền thống với họa tiết rồng đôi",
    "thumbnail": "/images/template-previews/listing/double_dragon_red.webp",
    "preview": "/images/template-previews/full/double_dragon_red.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#790606",
      "accent": "#d4af37",
      "background": "#fff7eb"
    },
    "tags": [
      "Truyền thống",
      "Rồng phượng",
      "Trang trọng"
    ],
    "colors": [
      "Đỏ"
    ],
    "badges": [],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": false,
    "releasedAt": "2026-07-23T15:24:07.864218+00:00",
    "jsFile": "song-long-do-template-B5ck2vkd.js",
    "exportName": "SongLongDoTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "song-long-do-ocjjjWbP.css"
    ],
    "defaultImages": [
      "/images/themes/songlong-red/groom.jpg",
      "/images/themes/songlong-red/bride.jpg",
      "/images/themes/songlong-red/gallery_1.jpg",
      "/images/themes/songlong-red/gallery_2.jpg",
      "/images/themes/songlong-red/gallery_3.jpg",
      "/images/themes/songlong-red/gallery_4.jpg",
      "/images/themes/songlong-red/gallery_5.jpg",
      "/images/themes/songlong-red/gallery_6.jpg",
      "/images/themes/songlong-red/gallery_7.jpg",
      "/images/themes/songlong-red/gallery_8.jpg"
    ]
  },
  {
    "slug": "chuyen-bay-nau",
    "name": "Chuyến Bay - Nâu",
    "description": "Thiệp chủ đề du lịch tông nâu vàng: ảnh cưới \"Getting Married!\", phong bì kẹp vé máy bay \"Our Love Flight\" và hộ chiếu, khung lời mời có huy hiệu chữ lồng, lịch cưới trên ảnh nền, lịch trình dọc, dòng thời gian chuyện tình và album ảnh.",
    "thumbnail": "/images/template-previews/listing/love_flight_brown.webp",
    "preview": "/images/template-previews/full/love_flight_brown.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#5c4033",
      "accent": "#c5a165",
      "background": "#fbf8f3"
    },
    "tags": [
      "Hiện đại",
      "Có ảnh",
      "Du lịch",
      "Vé máy bay",
      "Chuyện tình"
    ],
    "colors": [
      "Nâu",
      "Vàng"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 2,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-09-30T18:17:48.324813+00:00",
    "jsFile": "love-flight-brown-template-BGpybOmt.js",
    "exportName": "LoveFlightBrownTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "love-flight-brown-CHQm-9ey.css"
    ],
    "defaultImages": [
      "/images/template-previews/full/love_flight_brown.webp"
    ]
  },
  {
    "slug": "long-phung-do",
    "name": "Long Phụng - Đỏ",
    "description": "Cổ điển với họa tiết rồng phượng truyền thống",
    "thumbnail": "/images/template-previews/listing/dragon_phoenix_red.webp",
    "preview": "/images/template-previews/full/dragon_phoenix_red.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#790606",
      "accent": "#d4af37",
      "background": "#fff7eb"
    },
    "tags": [
      "Truyền thống",
      "Rồng phượng",
      "Cổ điển"
    ],
    "colors": [
      "Đỏ"
    ],
    "badges": [],
    "occasion": "wedding",
    "trendingScore": 2,
    "isHot": false,
    "isNew": false,
    "releasedAt": "2026-07-23T15:24:07.864218+00:00",
    "jsFile": "longphung-red-template-BJPeVKEF.js",
    "exportName": "LongPhungRedTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "red-v1-XzUKfCfL.css"
    ],
    "defaultImages": [
      "/images/themes/red-v1/gallery_1.jpg",
      "/images/themes/red-v1/gallery_2.jpg",
      "/images/themes/red-v1/gallery_3.jpg",
      "/images/themes/red-v1/gallery_4.jpg",
      "/images/themes/red-v1/gallery_5.jpg"
    ]
  },
  {
    "slug": "hong-mon-do",
    "name": "Anthurium - Đỏ",
    "description": "Chữ đỏ rượu trên nền kem, phong bì đỏ rượu kẹp ảnh cưới giữa hoa rum trắng và bó hồng môn, trái tim ren in ngày cưới, thẻ nhung đỏ thông tin lễ cưới và tiệc cưới, đếm ngược, lịch tháng, bản đồ, dress code và lịch trình có biểu tượng",
    "thumbnail": "/images/template-previews/listing/anthurium_red.webp",
    "preview": "/images/template-previews/full/anthurium_red.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#790606",
      "accent": "#d4af37",
      "background": "#fff7eb"
    },
    "tags": [
      "Có ảnh",
      "Hiện đại",
      "Hoa lá",
      "Hồng Môn",
      "Phong bì"
    ],
    "colors": [
      "Đỏ"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 2,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-10-18T14:10:05.55123+00:00",
    "jsFile": "anthurium-red-template-CUD8g2e_.js",
    "exportName": "AnthuriumRedTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "anthurium-red-C6y3Lahg.css"
    ],
    "defaultImages": [
      "/images/themes/silk-ribbon-darkred/gallery_3.webp",
      "/images/themes/silk-ribbon-darkred/gallery_1.webp",
      "/images/themes/silk-ribbon-darkred/gallery_4.webp",
      "/images/themes/silk-ribbon-darkred/gallery_6.webp",
      "/images/themes/silk-ribbon-darkred/gallery_5.webp",
      "/images/themes/silk-ribbon-darkred/gallery_7.webp",
      "/images/themes/silk-ribbon-darkred/gallery_2.webp"
    ]
  },
  {
    "slug": "cam-tu-cau-tim",
    "name": "Cẩm Tú Cầu - Tím",
    "description": "Thiệp navy trên giấy trắng vân đá: thẻ Save the Date giữa hoa cẩm tú cầu tím lam, hai nhà, tên đầy đủ cô dâu chú rể, hôn lễ trong khung lượn sóng, lời mời có tên khách, giờ ngày tiệc và âm lịch, địa chỉ có nút chỉ đường, lời nhắn viết tay, lịch tháng trên ảnh cưới, đếm ngược và album hai cột.",
    "thumbnail": "/images/template-previews/listing/hydrangea_purple.webp",
    "preview": "/images/template-previews/full/hydrangea_purple.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#432a5c",
      "accent": "#bda3d6",
      "background": "#f9f6fc"
    },
    "tags": [
      "Có ảnh",
      "Hiện đại",
      "Hoa lá",
      "Cẩm tú cầu"
    ],
    "colors": [
      "Tím",
      "Xanh dương"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 2,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-10-02T05:40:36.170468+00:00",
    "jsFile": "hydrangea-purple-template-Bsuw6DvZ.js",
    "exportName": "HydrangeaPurpleTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "hydrangea-purple-BrbcB_jm.css"
    ],
    "defaultImages": [
      "/images/themes/hydrangea-purple/hero.webp",
      "/images/themes/blue-v1/gallery_5.webp",
      "/images/themes/blue-v1/gallery_2.webp",
      "/images/themes/blue-v1/gallery_3.webp",
      "/images/themes/blue-v1/gallery_4.webp",
      "/images/themes/blue-v1/gallery_7.webp",
      "/images/themes/blue-v1/gallery_12.webp",
      "/images/themes/blue-v1/gallery_8.webp",
      "/images/themes/blue-v1/gallery_9.webp",
      "/images/themes/blue-v1/gallery_6.webp"
    ]
  },
  {
    "slug": "long-phung-v2-do",
    "name": "Long Phụng V2 - Đỏ",
    "description": "Cổ điển hiện đại với họa tiết rồng phượng tinh tế",
    "thumbnail": "/images/template-previews/listing/dragon_phoenix_v2_red.webp",
    "preview": "/images/template-previews/full/dragon_phoenix_v2_red.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#790606",
      "accent": "#d4af37",
      "background": "#fff7eb"
    },
    "tags": [
      "Truyền thống",
      "Rồng phượng",
      "Cổ điển"
    ],
    "colors": [
      "Đỏ"
    ],
    "badges": [
      "Hot"
    ],
    "occasion": "wedding",
    "trendingScore": 12,
    "isHot": true,
    "isNew": false,
    "releasedAt": "2026-07-23T15:24:07.864218+00:00",
    "jsFile": "longphung-v2-red-template-ByV-rYGF.js",
    "exportName": "LongPhungV2RedTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "longphung-v2-red-DHfmkFA_.css"
    ],
    "defaultImages": [
      "/images/themes/longphung-v2-red/gallery_1.jpg",
      "/images/themes/longphung-v2-red/gallery_2.jpg",
      "/images/themes/longphung-v2-red/gallery_3.jpg",
      "/images/themes/longphung-v2-red/gallery_4.jpg"
    ]
  },
  {
    "slug": "minimalism-nau-dam",
    "name": "Minimalism - Nâu Đậm",
    "description": "Tối giản trên nền giấy ngà, tông nâu đậm với hoa nâu vẽ tay và một tấm ảnh polaroid lồng trong phong bì",
    "thumbnail": "/images/template-previews/listing/minimalism_darkbrown.webp",
    "preview": "/images/template-previews/full/minimalism_darkbrown.webp",
    "category": "minimal",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#5c4033",
      "accent": "#c5a165",
      "background": "#fbf8f3"
    },
    "tags": [
      "Tối giản",
      "Hoa lá",
      "Thanh lịch"
    ],
    "colors": [
      "Nâu"
    ],
    "badges": [
      "Hot",
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 6.7,
    "isHot": true,
    "isNew": true,
    "releasedAt": "2026-09-28T10:35:41.523754+00:00",
    "jsFile": "minimalism-nau-dam-template-FhhZaFvY.js",
    "exportName": "MinimalismNauDamTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "minimalism-nau-dam-ClBQRmlb.css"
    ],
    "defaultImages": [
      "/images/template-previews/full/minimalism_darkbrown.webp"
    ]
  },
  {
    "slug": "song-phung-do",
    "name": "Song Phụng - Đỏ",
    "description": "Thanh lịch với họa tiết đôi phụng hoàng",
    "thumbnail": "/images/template-previews/listing/double_phoenix_red.webp",
    "preview": "/images/template-previews/full/double_phoenix_red.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#790606",
      "accent": "#d4af37",
      "background": "#fff7eb"
    },
    "tags": [
      "Truyền thống",
      "Rồng phượng",
      "Thanh lịch"
    ],
    "colors": [
      "Đỏ"
    ],
    "badges": [
      "Hot"
    ],
    "occasion": "wedding",
    "trendingScore": 5,
    "isHot": true,
    "isNew": false,
    "releasedAt": "2026-07-23T15:24:07.864218+00:00",
    "jsFile": "songphung-red-template-B-fD931r.js",
    "exportName": "SongPhungRedTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "songphung-red-BpGOTki8.css"
    ],
    "defaultImages": [
      "/images/themes/songphung-red/gallery_1.jpg",
      "/images/themes/songphung-red/gallery_2.jpg",
      "/images/themes/songphung-red/gallery_3.jpg",
      "/images/themes/songphung-red/gallery_4.jpg",
      "/images/themes/songphung-red/gallery_5.jpg",
      "/images/themes/songphung-red/gallery_6.jpg"
    ]
  },
  {
    "slug": "cam-tu-cau-lam",
    "name": "Cẩm Tú Cầu - Lam",
    "description": "Nền giấy trắng vân với hoa cẩm tú cầu giấy nổi khối, chữ xanh tím than, ảnh cưới mép giấy xé, phong bì kẹp hai ảnh, \"Save the date\", chuyện tình dạng dòng thời gian và lịch trình bốn biểu tượng nét",
    "thumbnail": "/images/template-previews/listing/paper_hydrangea_blue.webp",
    "preview": "/images/template-previews/full/paper_hydrangea_blue.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#790606",
      "accent": "#d4af37",
      "background": "#fff7eb"
    },
    "tags": [
      "Cẩm tú cầu",
      "Hoa giấy",
      "Giấy xé"
    ],
    "colors": [
      "Xanh dương"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 2,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-10-18T11:14:44.202993+00:00",
    "jsFile": "paper-hydrangea-blue-template-DoRugxIe.js",
    "exportName": "PaperHydrangeaBlueTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "paper-hydrangea-blue-BdlXa3rM.css"
    ],
    "defaultImages": [
      "/images/themes/paper-hydrangea-blue/hero-flowers.webp",
      "/images/themes/crystal-floral-blue/gallery_3.webp",
      "/images/themes/crystal-floral-blue/gallery_5.webp",
      "/images/themes/crystal-floral-blue/gallery_4.webp",
      "/images/themes/crystal-floral-blue/gallery_2.webp",
      "/images/themes/crystal-floral-blue/gallery_6.webp",
      "/images/themes/crystal-floral-blue/gallery_8.webp",
      "/images/themes/crystal-floral-blue/gallery_7.webp",
      "/images/themes/crystal-floral-blue/gallery_1.webp"
    ]
  },
  {
    "slug": "mai-lan-trang",
    "name": "Mai Lan - Trắng",
    "description": "Tối giản hiện đại với nền kem trắng và sắc xanh olive",
    "thumbnail": "/images/template-previews/listing/jasmine_white.webp",
    "preview": "/images/template-previews/full/jasmine_white.webp",
    "category": "minimal",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#4a403a",
      "accent": "#c5a165",
      "background": "#ffffff"
    },
    "tags": [
      "Tối giản",
      "Hoa lá",
      "Thanh lịch"
    ],
    "colors": [
      "Trắng"
    ],
    "badges": [
      "Hot"
    ],
    "occasion": "wedding",
    "trendingScore": 8,
    "isHot": true,
    "isNew": false,
    "releasedAt": "2026-07-23T15:24:07.864218+00:00",
    "jsFile": "mai-lan-trang-template-Bo5wfAdm.js",
    "exportName": "MaiLanTrangTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "mai-lan-trang-DsY6BnFg.css"
    ],
    "defaultImages": [
      "/images/themes/moclan-white/gallery_1.webp",
      "/images/themes/moclan-white/gallery_2.webp",
      "/images/themes/moclan-white/gallery_3.webp",
      "/images/themes/moclan-white/gallery_4.webp",
      "/images/themes/moclan-white/gallery_5.webp",
      "/images/themes/moclan-white/gallery_6.webp",
      "/images/themes/moclan-white/gallery_7.webp"
    ]
  },
  {
    "slug": "happy-flowers-nau",
    "name": "Happy Flowers - Nâu",
    "description": "Giấy trắng vân với lá xanh màu nước đung đưa, sóng nâu đất ngăn từng mục, tên viết tay và lịch trình trên trục xanh lá",
    "thumbnail": "/images/template-previews/listing/happy_flowers_brown.webp",
    "preview": "/images/template-previews/full/happy_flowers_brown.webp",
    "category": "vintage",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#5c4033",
      "accent": "#c5a165",
      "background": "#fbf8f3"
    },
    "tags": [
      "Sân vườn",
      "Happy Flowers",
      "Lá xanh",
      "Màu nước"
    ],
    "colors": [
      "Nâu",
      "Xanh lá"
    ],
    "badges": [
      "Hot",
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 3,
    "isHot": true,
    "isNew": true,
    "releasedAt": "2026-10-06T18:16:12.030656+00:00",
    "jsFile": "happy-flowers-brown-template-FqbyGAae.js",
    "exportName": "HappyFlowersBrownTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "happy-flowers-brown-BvcnjWnT.css"
    ],
    "defaultImages": [
      "/images/themes/boho-floral-green/gallery_2.webp",
      "/images/themes/boho-floral-green/gallery_8.webp",
      "/images/themes/boho-floral-green/gallery_3.webp",
      "/images/themes/boho-floral-green/gallery_4.webp",
      "/images/themes/boho-floral-green/gallery_1.webp",
      "/images/themes/boho-floral-green/gallery_6.webp",
      "/images/themes/boho-floral-green/gallery_7.webp",
      "/images/themes/boho-floral-green/gallery_5.webp"
    ]
  },
  {
    "slug": "thanh-diep-xanh",
    "name": "Thanh Diệp - Xanh",
    "description": "Thanh lịch với tông xanh lá thanh diệp",
    "thumbnail": "/images/template-previews/listing/elegant_leaf_green.webp",
    "preview": "/images/template-previews/full/elegant_leaf_green.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#2e5a36",
      "accent": "#8bc34a",
      "background": "#f6faf6"
    },
    "tags": [
      "Sân vườn",
      "Thanh lịch",
      "Hiện đại"
    ],
    "colors": [
      "Xanh lá"
    ],
    "badges": [
      "Hot"
    ],
    "occasion": "wedding",
    "trendingScore": 13,
    "isHot": true,
    "isNew": false,
    "releasedAt": "2026-07-23T15:24:07.864218+00:00",
    "jsFile": "thanhdiep-green-template-dp08j-Oc.js",
    "exportName": "ThanhDiepGreenTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "thanhdiep-green-hlfX-dNI.css"
    ],
    "defaultImages": [
      "/images/themes/thanhdiep-green/groom.jpg",
      "/images/themes/thanhdiep-green/bride.jpg",
      "/images/themes/thanhdiep-green/gallery_1.jpg",
      "/images/themes/thanhdiep-green/gallery_2.jpg",
      "/images/themes/thanhdiep-green/gallery_3.jpg",
      "/images/themes/thanhdiep-green/gallery_4.jpg",
      "/images/themes/thanhdiep-green/gallery_5.jpg",
      "/images/themes/thanhdiep-green/gallery_6.jpg",
      "/images/themes/thanhdiep-green/gallery_7.jpg",
      "/images/themes/thanhdiep-green/gallery_8.jpg"
    ]
  },
  {
    "slug": "thuoc-phim-be",
    "name": "Thước Phim - Be",
    "description": "Thiệp nâu be trên nền giấy hoa chìm: ảnh cưới \"We get married!\", đếm ngược và phong bì kẹp ảnh, ảnh Save the Date, ảnh polaroid cô dâu chú rể, cuộn phim và album ảnh ghép, lịch tháng cưới, lịch trình trên ảnh nền — mộc mạc và ấm áp.",
    "thumbnail": "/images/template-previews/listing/film_beige.webp",
    "preview": "/images/template-previews/full/film_beige.webp",
    "category": "vintage",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#5c4033",
      "accent": "#c5a165",
      "background": "#fbf8f3"
    },
    "tags": [
      "Hiện đại",
      "Có ảnh",
      "Hoa lá",
      "Polaroid",
      "Cuộn phim",
      "Nền giấy"
    ],
    "colors": [
      "Nâu",
      "Trắng"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 2,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-09-30T17:50:22.380699+00:00",
    "jsFile": "film-beige-template-C06xi1f0.js",
    "exportName": "FilmBeigeTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "film-beige-DzTxhXUd.css"
    ],
    "defaultImages": [
      "/images/themes/minimalism-brown/gallery_2.jpg",
      "/images/themes/minimalism-brown/gallery_5.jpg",
      "/images/themes/silkflora-brown/gallery_4.webp",
      "/images/themes/minimalism-brown/gallery_3.jpg",
      "/images/themes/minimalism-brown/gallery_6.jpg",
      "/images/themes/silkflora-brown/gallery_2.webp",
      "/images/themes/minimalism-brown/hero.jpg",
      "/images/themes/film-beige/groom.webp",
      "/images/themes/film-beige/bride.webp",
      "/images/themes/silkflora-brown/gallery_1.webp"
    ]
  },
  {
    "slug": "minimalism-do",
    "name": "Minimalism - Đỏ",
    "description": "Tối giản thanh lịch với nền trắng tinh tế và sắc đỏ chủ đạo",
    "thumbnail": "/images/template-previews/listing/minimalism_red.webp",
    "preview": "/images/template-previews/full/minimalism_red.webp",
    "category": "minimal",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#790606",
      "accent": "#d4af37",
      "background": "#fff7eb"
    },
    "tags": [
      "Tối giản",
      "Thanh lịch"
    ],
    "colors": [
      "Đỏ"
    ],
    "badges": [
      "Hot"
    ],
    "occasion": "wedding",
    "trendingScore": 5.8,
    "isHot": true,
    "isNew": false,
    "releasedAt": "2026-07-23T15:24:07.864218+00:00",
    "jsFile": "minimalism-do-template-pEEPXXwN.js",
    "exportName": "MinimalismDoTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "minimalism-do-BFNciJDF.css"
    ],
    "defaultImages": [
      "/images/themes/minimalism-red/gallery_1.webp",
      "/images/themes/minimalism-red/gallery_2.webp",
      "/images/themes/minimalism-red/gallery_3.webp",
      "/images/themes/minimalism-red/gallery_4.webp",
      "/images/themes/minimalism-red/gallery_5.webp",
      "/images/themes/minimalism-red/gallery_6.webp",
      "/images/themes/minimalism-red/gallery_7.webp",
      "/images/themes/minimalism-red/gallery_8.webp"
    ]
  },
  {
    "slug": "minimalism-hong-tra",
    "name": "Minimalism - Hồng Trà",
    "description": "Phong bì mauve mở ra khoe ảnh cưới, hoa hồng trà và mẫu đơn trắng kem rủ quanh từng thẻ giấy dập nổi trên nền toà lâu đài mờ — lãng mạn, trầm ấm và rất nữ tính.",
    "thumbnail": "/images/template-previews/listing/minimalism_tearose.webp",
    "preview": "/images/template-previews/full/minimalism_tearose.webp",
    "category": "minimal",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#c25975",
      "accent": "#f48fb1",
      "background": "#fff8fa"
    },
    "tags": [
      "Tối giản",
      "Hoa lá",
      "Hoa hồng",
      "Mauve",
      "Phong bì",
      "Lãng mạn"
    ],
    "colors": [
      "Hồng",
      "Trắng"
    ],
    "badges": [
      "Hot",
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 6.7,
    "isHot": true,
    "isNew": true,
    "releasedAt": "2026-09-22T02:51:54.957455+00:00",
    "jsFile": "minimalism-hong-tra-template-BOb2ewDE.js",
    "exportName": "MinimalismHongTraTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "minimalism-hong-tra-B7p_wnJ2.css"
    ],
    "defaultImages": [
      "/images/themes/minimalism-tea-rose/hero.webp",
      "/images/themes/minimalism-tea-rose/gallery_1.webp",
      "/images/themes/minimalism-tea-rose/gallery_2.webp",
      "/images/themes/minimalism-tea-rose/gallery_3.webp",
      "/images/themes/minimalism-tea-rose/gallery_4.webp",
      "/images/themes/minimalism-tea-rose/gallery_5.webp",
      "/images/themes/minimalism-tea-rose/gallery_6.webp",
      "/images/themes/minimalism-tea-rose/gallery_7.webp"
    ]
  },
  {
    "slug": "song-long-xanh",
    "name": "Song Long - Xanh",
    "description": "Thanh lịch với tông màu xanh lá tự nhiên",
    "thumbnail": "/images/template-previews/listing/double_dragon_green.webp",
    "preview": "/images/template-previews/full/double_dragon_green.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#2e5a36",
      "accent": "#8bc34a",
      "background": "#f6faf6"
    },
    "tags": [
      "Truyền thống",
      "Rồng phượng",
      "Thanh lịch"
    ],
    "colors": [
      "Xanh lá"
    ],
    "badges": [],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": false,
    "releasedAt": "2026-07-23T15:24:07.864218+00:00",
    "jsFile": "song-long-xanh-template-BRKmUWS8.js",
    "exportName": "SongLongXanhTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "song-long-xanh-Dp0MAGnb.css"
    ],
    "defaultImages": [
      "/images/themes/songlong-green/groom.jpg",
      "/images/themes/songlong-green/bride.jpg",
      "/images/themes/songlong-green/gallery_1.jpg",
      "/images/themes/songlong-green/gallery_2.jpg",
      "/images/themes/songlong-green/gallery_3.jpg",
      "/images/themes/songlong-green/gallery_4.jpg",
      "/images/themes/songlong-green/gallery_5.jpg",
      "/images/themes/songlong-green/gallery_6.jpg"
    ]
  },
  {
    "slug": "co-phuc-nau",
    "name": "Cổ Phục - Nâu",
    "description": "Ảnh cưới tràn khổ với tên viết tay, nền giấy thạch cao trắng, vòng hạc mây ôm ấn đỏ son in ngày cưới, thiệp mời giấy xé có góc hoa văn và ấn song hỷ, đếm ngược, ảnh cô dâu chú rể, lịch trình biểu tượng khắc nét và album ảnh ghép",
    "thumbnail": "/images/template-previews/listing/heritage_brown.webp",
    "preview": "/images/template-previews/full/heritage_brown.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#5c4033",
      "accent": "#c5a165",
      "background": "#fbf8f3"
    },
    "tags": [
      "Truyền thống",
      "Có ảnh",
      "Cổ phục",
      "Chữ Hỷ",
      "Hạc sen"
    ],
    "colors": [
      "Nâu"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-10-18T15:42:46.045979+00:00",
    "jsFile": "heritage-brown-template-Dsd0Z4BR.js",
    "exportName": "HeritageBrownTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "heritage-brown-BhyIBPa-.css"
    ],
    "defaultImages": [
      "/images/themes/nhat-binh-red/gallery_8.webp",
      "/images/themes/nhat-binh-red/gallery_4.webp",
      "/images/themes/nhat-binh-red/gallery_6.webp",
      "/images/themes/nhat-binh-red/gallery_3.webp",
      "/images/themes/nhat-binh-red/gallery_9.webp",
      "/images/themes/nhat-binh-red/gallery_1.webp",
      "/images/themes/nhat-binh-red/gallery_2.webp",
      "/images/themes/nhat-binh-red/gallery_5.webp",
      "/images/themes/nhat-binh-red/gallery_7.webp",
      "/images/themes/nhat-binh-red/gallery_10.webp"
    ]
  },
  {
    "slug": "chibi-red",
    "name": "Chibi - Đỏ",
    "description": "Dễ thương với phong cách chibi minh họa",
    "thumbnail": "/images/template-previews/listing/chibi_red.webp",
    "preview": "/images/template-previews/full/chibi_red.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#790606",
      "accent": "#d4af37",
      "background": "#fff7eb"
    },
    "tags": [
      "Dễ thương",
      "Hiện đại",
      "Chibi",
      "Minh họa"
    ],
    "colors": [
      "Đỏ"
    ],
    "badges": [
      "Hot"
    ],
    "occasion": "wedding",
    "trendingScore": 3.5,
    "isHot": true,
    "isNew": false,
    "releasedAt": "2026-07-23T15:24:07.864218+00:00",
    "jsFile": "chibi-red-template-Bhdb6v9Y.js",
    "exportName": "ChibiRedTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "chibi-red-BYMGske7.css"
    ],
    "defaultImages": [
      "/images/themes/chibi_red/couple-main.webp",
      "/images/themes/chibi_red/gallery_1.jpg",
      "/images/themes/chibi_red/gallery_2.jpg",
      "/images/themes/chibi_red/gallery_3.jpg",
      "/images/themes/chibi_red/gallery_4.jpg",
      "/images/themes/chibi_red/gallery_5.jpg",
      "/images/themes/chibi_red/gallery_6.jpg",
      "/images/themes/chibi_red/gallery_7.jpg",
      "/images/themes/chibi_red/gallery_8.jpg",
      "/images/themes/chibi_red/gallery_9.jpg"
    ]
  },
  {
    "slug": "thu-tinh-do",
    "name": "Thư Tình - Đỏ",
    "description": "Thiệp chữ đỏ rượu trên nền màu nước hồng: chữ lồng hai tên, phong bì đỏ rượu có hai ảnh polaroid và thẻ tên giữa hoa hồng, lời mời, hai nhà, ảnh cưới lớn, giờ ngày tiệc và âm lịch, địa điểm có nút chỉ đường, lịch Save our Date, album trượt, đếm ngược và ảnh kết.",
    "thumbnail": "/images/template-previews/listing/love_letter_red.webp",
    "preview": "/images/template-previews/full/love_letter_red.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#790606",
      "accent": "#d4af37",
      "background": "#fff7eb"
    },
    "tags": [
      "Có ảnh",
      "Hiện đại",
      "Hoa lá",
      "Hoa hồng",
      "Phong bì"
    ],
    "colors": [
      "Đỏ",
      "Hồng"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 2,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-10-02T06:23:49.941193+00:00",
    "jsFile": "love-letter-red-template-DUOUptnt.js",
    "exportName": "LoveLetterRedTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "love-letter-red-D0cghqo5.css"
    ],
    "defaultImages": [
      "/images/themes/love-letter-red/hero-flowers-back.webp",
      "/images/themes/love-letter-red/hero-flowers-left.webp",
      "/images/themes/love-letter-red/hero-flowers-right.webp",
      "/images/themes/love-letter-red/album-flourish.webp",
      "/images/themes/royal-red/gallery_4.webp",
      "/images/themes/royal-red/gallery_8.webp",
      "/images/themes/royal-red/gallery_6.webp",
      "/images/themes/royal-red/gallery_7.webp",
      "/images/themes/royal-red/gallery_10.webp",
      "/images/themes/royal-red/gallery_2.webp"
    ]
  },
  {
    "slug": "hoa-lua-nau",
    "name": "Hoa Lụa - Nâu",
    "description": "Thiệp cưới tối giản tông ấm, nhấn vào typography và nội dung, phù hợp phong cách thanh lịch hiện đại",
    "thumbnail": "/images/template-previews/listing/silk_flora_brown.webp",
    "preview": "/images/template-previews/full/silk_flora_brown.webp",
    "category": "minimal",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#5c4033",
      "accent": "#c5a165",
      "background": "#fbf8f3"
    },
    "tags": [
      "Tối giản",
      "Boho",
      "Typography",
      "Warm"
    ],
    "colors": [
      "Nâu"
    ],
    "badges": [
      "Hot"
    ],
    "occasion": "wedding",
    "trendingScore": 3,
    "isHot": true,
    "isNew": false,
    "releasedAt": "2026-07-23T15:24:07.864218+00:00",
    "jsFile": "silk-flora-brown-template-CtwOFdOD.js",
    "exportName": "SilkFloraBrownTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "silk-flora-brown-DfeVh_aX.css"
    ],
    "defaultImages": [
      "/images/template-previews/full/silk_flora_brown.webp"
    ]
  },
  {
    "slug": "ren-theu-trang",
    "name": "Ren Thêu - Trắng",
    "description": "Nền lụa đen mềm mại ôm lấy những tấm giấy trắng viền ren thêu nổi, ảnh cưới đen trắng nghiêng nhẹ trong phong bì ren, điểm thêm hoa mẫu đơn trắng và nhành khô màu be",
    "thumbnail": "/images/template-previews/listing/applique_lace_white.webp",
    "preview": "/images/template-previews/full/applique_lace_white.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#4a403a",
      "accent": "#c5a165",
      "background": "#ffffff"
    },
    "tags": [
      "Lãng mạn",
      "Hoa lá",
      "Ren",
      "Đen trắng",
      "Có ảnh"
    ],
    "colors": [
      "Trắng"
    ],
    "badges": [
      "Hot",
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 7.3,
    "isHot": true,
    "isNew": true,
    "releasedAt": "2026-10-26T13:54:47.50255+00:00",
    "jsFile": "applique-lace-white-template-BhfkLM1R.js",
    "exportName": "AppliqueLaceWhiteTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "applique-lace-white-CWPbyLPj.css"
    ],
    "defaultImages": [
      "/images/template-previews/full/applique_lace_white.webp"
    ]
  },
  {
    "slug": "vuon-xuan-do",
    "name": "Vườn Xuân - Đỏ",
    "description": "Thiên nhiên ấm áp với sắc đỏ tươi tắn",
    "thumbnail": "/images/template-previews/listing/spring_garden_red.webp",
    "preview": "/images/template-previews/full/spring_garden_red.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#790606",
      "accent": "#d4af37",
      "background": "#fff7eb"
    },
    "tags": [
      "Sân vườn",
      "Thiên nhiên",
      "Ấm áp"
    ],
    "colors": [
      "Đỏ"
    ],
    "badges": [],
    "occasion": "wedding",
    "trendingScore": 1,
    "isHot": false,
    "isNew": false,
    "releasedAt": "2026-07-23T15:24:07.864218+00:00",
    "jsFile": "spring-garden-red-template-BeMw6tWa.js",
    "exportName": "SpringGardenRedTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "spring-garden-red-CrxBivys.css"
    ],
    "defaultImages": [
      "/images/themes/vuon xuan red/gallery_1.webp",
      "/images/themes/vuon xuan red/gallery_2.webp",
      "/images/themes/vuon xuan red/gallery_3.webp",
      "/images/themes/vuon xuan red/gallery_4.webp",
      "/images/themes/vuon xuan red/gallery_5.webp"
    ]
  },
  {
    "slug": "hoa-kho-do",
    "name": "Hoa Khô - Đỏ",
    "description": "Thược dược, cúc khô và lá thu vẽ màu nước tông đỏ tươi ôm lấy khung hình học mạ vàng, tên cô dâu chú rể viết tay giữa khung — rực rỡ mà vẫn mộc.",
    "thumbnail": "/images/template-previews/listing/hoa_kho_red.webp",
    "preview": "/images/template-previews/full/hoa_kho_red.webp",
    "category": "vintage",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#790606",
      "accent": "#d4af37",
      "background": "#fff7eb"
    },
    "tags": [
      "Boho",
      "Hoa lá",
      "Hoa khô",
      "Đỏ tươi",
      "Mạ vàng"
    ],
    "colors": [
      "Đỏ"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 2,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-09-22T08:05:33.382509+00:00",
    "jsFile": "hoa-kho-red-template-UMfpxC9p.js",
    "exportName": "HoaKhoRedTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "hoa-kho-red-CYH05h_y.css"
    ],
    "defaultImages": [
      "/images/themes/hoa-kho-red/gallery_1.webp",
      "/images/themes/hoa-kho-red/gallery_2.webp",
      "/images/themes/hoa-kho-red/gallery_3.webp",
      "/images/themes/hoa-kho-red/gallery_4.webp",
      "/images/themes/hoa-kho-red/gallery_5.webp",
      "/images/themes/hoa-kho-red/gallery_6.webp",
      "/images/themes/hoa-kho-red/gallery_7.webp",
      "/images/themes/hoa-kho-red/gallery_8.webp"
    ]
  },
  {
    "slug": "hoa-moc-nau",
    "name": "Hoa Mộc - Nâu",
    "description": "Hoa mộc watercolor với tông nâu ấm áp, thanh nhã",
    "thumbnail": "/images/template-previews/listing/boho_floral_brown.webp",
    "preview": "/images/template-previews/full/boho_floral_brown.webp",
    "category": "vintage",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#5c4033",
      "accent": "#c5a165",
      "background": "#fbf8f3"
    },
    "tags": [
      "Boho",
      "Hoa lá",
      "Hoa Mộc",
      "Rustic"
    ],
    "colors": [
      "Nâu"
    ],
    "badges": [],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": false,
    "releasedAt": "2026-07-23T15:24:07.864218+00:00",
    "jsFile": "boho-floral-brown-template-BH-Dn9Mm.js",
    "exportName": "BohoFloralBrownTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "boho-floral-brown-Cuo4iEkF.css"
    ],
    "defaultImages": [
      "/images/template-previews/full/boho_floral_brown.webp"
    ]
  },
  {
    "slug": "thien-nga-do",
    "name": "Thiên Nga - Đỏ",
    "description": "Thiệp nền giấy mỹ thuật chữ đỏ đô: ảnh cưới chuyển dần sang đỏ, đôi thiên nga và hoa vẽ nét, mỗi buổi tiệc nhà trai, nhà gái một địa điểm và nút chỉ đường riêng — hiện đại và ấm cúng.",
    "thumbnail": "/images/template-previews/listing/swan_red.webp",
    "preview": "/images/template-previews/full/swan_red.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#790606",
      "accent": "#d4af37",
      "background": "#fff7eb"
    },
    "tags": [
      "Hiện đại",
      "Có ảnh",
      "Hoa lá",
      "Thiên nga",
      "Nền giấy"
    ],
    "colors": [
      "Đỏ"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 2,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-09-30T07:49:22.153521+00:00",
    "jsFile": "swan-red-template-CZJ62Nu6.js",
    "exportName": "SwanRedTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "swan-red-BBSXBcQg.css"
    ],
    "defaultImages": [
      "/images/themes/porcelain-v2-red/gallery_5.webp",
      "/images/themes/porcelain-v2-red/gallery_1.webp",
      "/images/themes/porcelain-v2-red/gallery_8.webp",
      "/images/themes/porcelain-v2-red/gallery_3.webp",
      "/images/themes/porcelain-v2-red/gallery_4.webp",
      "/images/themes/porcelain-v2-red/gallery_2.webp",
      "/images/themes/porcelain-v2-red/gallery_6.webp",
      "/images/themes/porcelain-v2-red/gallery_7.webp"
    ]
  },
  {
    "slug": "long-phung-xanh",
    "name": "Long Phụng - Xanh",
    "description": "Cổ điển với họa tiết rồng phượng truyền thống",
    "thumbnail": "/images/template-previews/listing/dragon_phoenix_green.webp",
    "preview": "/images/template-previews/full/dragon_phoenix_green.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#2e5a36",
      "accent": "#8bc34a",
      "background": "#f6faf6"
    },
    "tags": [
      "Truyền thống",
      "Rồng phượng",
      "Cổ điển"
    ],
    "colors": [
      "Xanh lá"
    ],
    "badges": [],
    "occasion": "wedding",
    "trendingScore": 2,
    "isHot": false,
    "isNew": false,
    "releasedAt": "2026-07-23T15:24:07.864218+00:00",
    "jsFile": "longphung-green-template-JDwgx7HR.js",
    "exportName": "LongPhungGreenTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "green-v1-Dfa5c-IQ.css"
    ],
    "defaultImages": [
      "/images/themes/green-v1/gallery_1.jpg",
      "/images/themes/green-v1/gallery_2.jpg",
      "/images/themes/green-v1/gallery_3.jpg",
      "/images/themes/green-v1/gallery_4.jpg"
    ]
  },
  {
    "slug": "hoa-kho-nau-dat",
    "name": "Hoa Khô - Nâu Đất",
    "description": "Thược dược, cúc khô và lá thu vẽ màu nước tông gạch nung phủ quanh khung vòm giấy kem — ấm, mộc và rất boho.",
    "thumbnail": "/images/template-previews/listing/hoa_kho_terracotta.webp",
    "preview": "/images/template-previews/full/hoa_kho_terracotta.webp",
    "category": "vintage",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#5c4033",
      "accent": "#c5a165",
      "background": "#fbf8f3"
    },
    "tags": [
      "Boho",
      "Hoa lá",
      "Hoa khô",
      "Nâu đất",
      "Gạch nung",
      "Mùa thu"
    ],
    "colors": [
      "Nâu",
      "Cam"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 2,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-09-22T04:10:05.558337+00:00",
    "jsFile": "hoa-kho-terracotta-template-DLG_4lnT.js",
    "exportName": "HoaKhoTerracottaTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "hoa-kho-terracotta-DOMyTIhM.css"
    ],
    "defaultImages": [
      "/images/themes/hoa-kho-terracotta/gallery_1.webp",
      "/images/themes/hoa-kho-terracotta/gallery_2.webp",
      "/images/themes/hoa-kho-terracotta/gallery_3.webp",
      "/images/themes/hoa-kho-terracotta/gallery_4.webp",
      "/images/themes/hoa-kho-terracotta/gallery_5.webp",
      "/images/themes/hoa-kho-terracotta/gallery_6.webp",
      "/images/themes/hoa-kho-terracotta/gallery_7.webp",
      "/images/themes/hoa-kho-terracotta/gallery_8.webp"
    ]
  },
  {
    "slug": "vuon-xuan-xanh",
    "name": "Vườn Xuân - Xanh",
    "description": "Thiên nhiên tươi mát với họa tiết lá cây",
    "thumbnail": "/images/template-previews/listing/spring_garden_green.webp",
    "preview": "/images/template-previews/full/spring_garden_green.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#2e5a36",
      "accent": "#8bc34a",
      "background": "#f6faf6"
    },
    "tags": [
      "Sân vườn",
      "Thiên nhiên",
      "Thanh bình"
    ],
    "colors": [
      "Xanh lá"
    ],
    "badges": [],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": false,
    "releasedAt": "2026-07-23T15:24:07.864218+00:00",
    "jsFile": "spring-garden-green-template-Dv011MCC.js",
    "exportName": "SpringGardenGreenTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "spring-garden-green-B5FeUdsA.css"
    ],
    "defaultImages": [
      "/images/themes/nature/gallery_1.webp",
      "/images/themes/nature/gallery_2.webp",
      "/images/themes/nature/gallery_3.webp",
      "/images/themes/nature/gallery_4.webp",
      "/images/themes/nature/gallery_5.webp",
      "/images/themes/nature/gallery_6.webp",
      "/images/themes/nature/gallery_7.webp",
      "/images/themes/nature/gallery_8.webp",
      "/images/themes/nature/gallery_9.webp",
      "/images/themes/nature/gallery_10.webp"
    ]
  },
  {
    "slug": "thanhcung-lam",
    "name": "Thanh Cung - Lam",
    "description": "Cung điện mái vòm lam ngọc soi bóng giữa rặng cọ, rèm lụa buông hai bên cùng đèn lồng đồng treo lơ lửng; nền giấy ngà ấm điểm hoa nhài trắng và những đường viền vàng tinh xảo, gợi vẻ vương giả dịu dàng của một đám cưới phương Đông",
    "thumbnail": "/images/template-previews/listing/qasr_blue.webp",
    "preview": "/images/template-previews/full/qasr_blue.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#1e4b7a",
      "accent": "#64b5f6",
      "background": "#f5f9fd"
    },
    "tags": [
      "Sang trọng",
      "Lâu đài",
      "Cung điện",
      "Phương Đông"
    ],
    "colors": [
      "Xanh dương"
    ],
    "badges": [
      "Hot",
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 8,
    "isHot": true,
    "isNew": true,
    "releasedAt": "2026-10-26T13:21:32.329978+00:00",
    "jsFile": "qasr-blue-template-Cj4e6qmO.js",
    "exportName": "QasrBlueTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "qasr-blue-C003kONe.css"
    ],
    "defaultImages": [
      "/images/themes/qasr-blue/gallery_1.webp",
      "/images/themes/qasr-blue/gallery_2.webp",
      "/images/themes/qasr-blue/gallery_3.webp",
      "/images/themes/qasr-blue/gallery_4.webp",
      "/images/themes/qasr-blue/gallery_5.webp",
      "/images/themes/qasr-blue/gallery_6.webp",
      "/images/themes/qasr-blue/gallery_7.webp",
      "/images/themes/qasr-blue/gallery_8.webp",
      "/images/themes/qasr-blue/gallery_9.webp",
      "/images/themes/qasr-blue/gallery_10.webp"
    ]
  },
  {
    "slug": "lau-dai-xanh",
    "name": "Lâu Đài - Xanh",
    "description": "Phong cách lâu đài châu Âu phiên bản vườn xanh, biệt thự nước màu watercolor với cây cối, vòi phun và hoa nhỏ; tông xanh lá rừng trên nền trắng, cảm giác lãng mạn, gần gũi thiên nhiên.",
    "thumbnail": "/images/template-previews/listing/chateau_green.webp",
    "preview": "/images/template-previews/full/chateau_green.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#2e5a36",
      "accent": "#8bc34a",
      "background": "#f6faf6"
    },
    "tags": [
      "Sang trọng",
      "Lâu đài",
      "Sân vườn",
      "Châu Âu",
      "Watercolor"
    ],
    "colors": [
      "Xanh lá"
    ],
    "badges": [
      "Hot"
    ],
    "occasion": "wedding",
    "trendingScore": 8,
    "isHot": true,
    "isNew": false,
    "releasedAt": "2026-07-25T10:26:44.674472+00:00",
    "jsFile": "chateau-green-template-BlZEoLDI.js",
    "exportName": "ChateauGreenTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "chateau-green-KlDvRx9F.css"
    ],
    "defaultImages": [
      "/images/themes/chateau-green/gallery_1.jpg",
      "/images/themes/chateau-green/gallery_2.jpg",
      "/images/themes/chateau-green/gallery_3.jpg",
      "/images/themes/chateau-green/gallery_4.jpg",
      "/images/themes/chateau-green/gallery_5.jpg",
      "/images/themes/chateau-green/gallery_6.jpg",
      "/images/themes/chateau-green/gallery_7.jpg",
      "/images/themes/chateau-green/gallery_8.jpg"
    ]
  },
  {
    "slug": "lau-dai-hoa-xanh",
    "name": "Lâu Đài Hoa - Xanh",
    "description": "Vòm cung viền vàng giữa vườn hoa và thánh đường dưới trời xanh, khung vòm ảnh cô dâu chú rể, đếm ngược Save The Date, thẻ lễ có tranh vườn làm khung và chuyện tình dạng dòng thời gian",
    "thumbnail": "/images/template-previews/listing/lau_dai_hoa_green.webp",
    "preview": "/images/template-previews/full/lau_dai_hoa_green.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#c25975",
      "accent": "#f48fb1",
      "background": "#fff8fa"
    },
    "tags": [
      "Có ảnh",
      "Hoa lá",
      "Lâu Đài Hoa",
      "Vòm cung",
      "Màu nước"
    ],
    "colors": [
      "Hồng",
      "Vàng",
      "Xanh lá"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 2,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-10-09T02:13:45.309105+00:00",
    "jsFile": "lau-dai-hoa-green-template-CyoDmMpW.js",
    "exportName": "LauDaiHoaGreenTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "lau-dai-hoa-green-CTG6zJOQ.css"
    ],
    "defaultImages": [
      "/images/themes/silk-ribbon-pink/gallery_5.webp",
      "/images/themes/silk-ribbon-pink/gallery_2.webp",
      "/images/themes/silk-ribbon-pink/gallery_8.webp",
      "/images/themes/silk-ribbon-pink/gallery_9.webp",
      "/images/themes/silk-ribbon-pink/gallery_1.webp",
      "/images/themes/silk-ribbon-pink/gallery_3.webp",
      "/images/themes/silk-ribbon-pink/gallery_4.webp",
      "/images/themes/silk-ribbon-pink/gallery_6.webp",
      "/images/themes/silk-ribbon-pink/gallery_10.webp"
    ]
  },
  {
    "slug": "vuon-mong-lam",
    "name": "Vườn Mộng - Lam",
    "description": "Vườn hồ thiên nga màu nước rợp cẩm tú cầu xanh lam, nền hoa lá liền mạch, khung lục giác vàng và thẻ vòm hồng phấn viền vàng",
    "thumbnail": "/images/template-previews/listing/garden_dream_slate.webp",
    "preview": "/images/template-previews/full/garden_dream_slate.webp",
    "category": "vintage",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#1e4b7a",
      "accent": "#64b5f6",
      "background": "#f5f9fd"
    },
    "tags": [
      "Sân vườn",
      "Hoa lá",
      "Vườn Mộng",
      "Cẩm tú cầu",
      "Màu nước"
    ],
    "colors": [
      "Xanh dương",
      "Hồng"
    ],
    "badges": [
      "Hot",
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 3,
    "isHot": true,
    "isNew": true,
    "releasedAt": "2026-10-08T17:31:29.610806+00:00",
    "jsFile": "garden-dream-slate-template-CHbEswpb.js",
    "exportName": "GardenDreamSlateTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "garden-dream-slate-DRjXuJbE.css"
    ],
    "defaultImages": [
      "/images/themes/glass-garden-blue/gallery_4.webp",
      "/images/themes/glass-garden-blue/gallery_1.webp",
      "/images/themes/glass-garden-blue/gallery_3.webp",
      "/images/themes/glass-garden-blue/gallery_8.webp",
      "/images/themes/glass-garden-blue/gallery_7.webp",
      "/images/themes/glass-garden-blue/gallery_5.webp",
      "/images/themes/glass-garden-blue/gallery_6.webp",
      "/images/themes/glass-garden-blue/gallery_2.webp"
    ]
  },
  {
    "slug": "baroque-v2-do-dam",
    "name": "Baroque V2 - Đỏ Đậm",
    "description": "Nền đỏ đậm gần đen phủ hoa văn damask, khung tranh Baroque mạ vàng ôm ảnh cưới cùng hoa mẫu đơn đỏ rượu và kem; đường viền vàng, chữ Times New Roman và Cormorant Garamond, gợi vẻ cổ điển sang trọng kiểu châu Âu.",
    "thumbnail": "/images/template-previews/listing/baroque_v2_darkred.webp",
    "preview": "/images/template-previews/full/baroque_v2_darkred.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#790606",
      "accent": "#d4af37",
      "background": "#fff7eb"
    },
    "tags": [
      "Sang trọng",
      "Mạ vàng",
      "Hoa lá",
      "Baroque",
      "Châu Âu"
    ],
    "colors": [
      "Đỏ"
    ],
    "badges": [
      "Hot",
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 9.5,
    "isHot": true,
    "isNew": true,
    "releasedAt": "2026-08-29T16:50:27.973362+00:00",
    "jsFile": "baroque-v2-dark-red-template-rebArFKg.js",
    "exportName": "BaroqueV2DarkRedTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "baroque-v2-dark-red-CNM2Ra0e.css"
    ],
    "defaultImages": [
      "/images/themes/baroque-v2-dark-red/hero.webp",
      "/images/themes/baroque-v2-dark-red/gallery_1.webp",
      "/images/themes/baroque-v2-dark-red/gallery_2.webp",
      "/images/themes/baroque-v2-dark-red/gallery_3.webp",
      "/images/themes/baroque-v2-dark-red/gallery_4.webp",
      "/images/themes/baroque-v2-dark-red/gallery_5.webp",
      "/images/themes/baroque-v2-dark-red/gallery_6.webp",
      "/images/themes/baroque-v2-dark-red/gallery_7.webp"
    ]
  },
  {
    "slug": "riviera-lam",
    "name": "Riviera - Lam",
    "description": "Tranh màu nước vẽ ngôi làng bên hồ dưới chân núi kiểu Riviera, tông xanh lam và những nhánh hoa nở rực, nhẹ nhàng và thơ mộng",
    "thumbnail": "/images/template-previews/listing/riviera_blue.webp",
    "preview": "/images/template-previews/full/riviera_blue.webp",
    "category": "vintage",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#1e4b7a",
      "accent": "#64b5f6",
      "background": "#f5f9fd"
    },
    "tags": [
      "Sân vườn",
      "Hoa lá",
      "Riviera",
      "Màu nước",
      "Phong cảnh"
    ],
    "colors": [
      "Xanh dương"
    ],
    "badges": [
      "Hot",
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 8,
    "isHot": true,
    "isNew": true,
    "releasedAt": "2026-09-30T04:57:20.771752+00:00",
    "jsFile": "riviera-lam-template-CVhLON9L.js",
    "exportName": "RivieraLamTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "riviera-lam-CmYqV-QO.css"
    ],
    "defaultImages": [
      "/images/themes/riviera-blue/flower-hero.webp",
      "/images/themes/riviera-blue/gallery_1.webp",
      "/images/themes/riviera-blue/gallery_3.webp",
      "/images/themes/riviera-blue/gallery_2.webp",
      "/images/themes/riviera-blue/gallery_4.webp",
      "/images/themes/riviera-blue/gallery_5.webp"
    ]
  },
  {
    "slug": "santorini-lam",
    "name": "Santorini - Lam",
    "description": "Tranh màu nước vẽ đảo Hy Lạp, những ngôi nhà trắng mái vòm xanh lam nối nhau xuống bậc đá, biển Aegean trong vắt và hoa giấy hồng rủ bên vách đá",
    "thumbnail": "/images/template-previews/listing/santorini_blue.webp",
    "preview": "/images/template-previews/full/santorini_blue.webp",
    "category": "vintage",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#1e4b7a",
      "accent": "#64b5f6",
      "background": "#f5f9fd"
    },
    "tags": [
      "Hoa lá",
      "Santorini",
      "Màu nước",
      "Biển"
    ],
    "colors": [
      "Xanh dương"
    ],
    "badges": [
      "Hot",
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 8,
    "isHot": true,
    "isNew": true,
    "releasedAt": "2026-10-26T02:13:23.701833+00:00",
    "jsFile": "santorini-blue-template-CxbrIk9D.js",
    "exportName": "SantoriniBlueTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "santorini-blue-D8qcD9B6.css"
    ],
    "defaultImages": [
      "/images/themes/chateau-green/gallery_1.jpg",
      "/images/themes/chateau-green/gallery_2.jpg",
      "/images/themes/chateau-green/gallery_3.jpg",
      "/images/themes/chateau-green/gallery_5.jpg",
      "/images/themes/chateau-green/gallery_8.jpg",
      "/images/themes/chateau-green/gallery_4.jpg",
      "/images/themes/chateau-green/gallery_6.jpg",
      "/images/themes/chateau-green/gallery_7.jpg"
    ]
  },
  {
    "slug": "anh-dao-hong",
    "name": "Anh Đào - Hồng",
    "description": "Lãng mạn với sắc hồng hoa anh đào",
    "thumbnail": "/images/template-previews/listing/cherry_blossom_pink.webp",
    "preview": "/images/template-previews/full/cherry_blossom_pink.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#c25975",
      "accent": "#f48fb1",
      "background": "#fff8fa"
    },
    "tags": [
      "Hoa anh đào",
      "Hoa lá",
      "Lãng mạn",
      "Hiện đại"
    ],
    "colors": [
      "Hồng"
    ],
    "badges": [],
    "occasion": "wedding",
    "trendingScore": 1,
    "isHot": false,
    "isNew": false,
    "releasedAt": "2026-07-23T15:24:07.864218+00:00",
    "jsFile": "anhdao-pink-template-CHPaCRy8.js",
    "exportName": "AnhDaoPinkTemplate",
    "cssFiles": [
      "intro-overlay-CesT6cso.css",
      "bank-gift-display-CaEfMy_m.css"
    ],
    "defaultImages": [
      "/images/template-previews/full/cherry_blossom_pink.webp"
    ]
  },
  {
    "slug": "minimalism-xanh-dam",
    "name": "Minimalism - Lam Đậm",
    "description": "Tối giản trên nền giấy ngà, tông xanh navy với hoa xanh vẽ tay và hai tấm ảnh polaroid",
    "thumbnail": "/images/template-previews/listing/minimalism_darkblue.webp",
    "preview": "/images/template-previews/full/minimalism_darkblue.webp",
    "category": "minimal",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#1e4b7a",
      "accent": "#64b5f6",
      "background": "#f5f9fd"
    },
    "tags": [
      "Tối giản",
      "Hoa lá",
      "Thanh lịch"
    ],
    "colors": [
      "Xanh dương"
    ],
    "badges": [
      "Hot",
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 6.7,
    "isHot": true,
    "isNew": true,
    "releasedAt": "2026-09-08T01:08:22.423442+00:00",
    "jsFile": "minimalism-xanh-dam-template-DyvG5Vif.js",
    "exportName": "MinimalismXanhDamTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "minimalism-xanh-dam-B28igFIQ.css"
    ],
    "defaultImages": [
      "/images/themes/minimalism-dark-blue/groom.jpg",
      "/images/themes/minimalism-dark-blue/bride.jpg",
      "/images/themes/minimalism-dark-blue/gallery_1.webp",
      "/images/themes/minimalism-dark-blue/gallery_2.webp",
      "/images/themes/minimalism-dark-blue/gallery_3.webp",
      "/images/themes/minimalism-dark-blue/gallery_4.webp",
      "/images/themes/minimalism-dark-blue/gallery_5.webp",
      "/images/themes/minimalism-dark-blue/gallery_6.webp",
      "/images/themes/minimalism-dark-blue/gallery_7.webp",
      "/images/themes/minimalism-dark-blue/gallery_8.webp"
    ]
  },
  {
    "slug": "song-bien-lam",
    "name": "Sóng Biển - Lam",
    "description": "Nền giấy trắng, chữ navy và vàng đồng, khối giấy màu nước lam nối bằng mép giấy xé, phong bì navy lót tranh sóng biển kẹp hai ảnh, lịch tháng Save the Date, timeline đường cong và cụm ảnh The Album",
    "thumbnail": "/images/template-previews/listing/ocean_wave_blue.webp",
    "preview": "/images/template-previews/full/ocean_wave_blue.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#790606",
      "accent": "#d4af37",
      "background": "#fff7eb"
    },
    "tags": [
      "Biển",
      "Xanh lam",
      "Giấy xé",
      "Có ảnh"
    ],
    "colors": [],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-10-21T10:14:49.375564+00:00",
    "jsFile": "ocean-wave-blue-template-D8LGVt4o.js",
    "exportName": "OceanWaveBlueTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "ocean-wave-blue-QrGZpuk6.css"
    ],
    "defaultImages": [
      "/images/themes/blue-v1/gallery_8.webp",
      "/images/themes/blue-v1/gallery_6.webp",
      "/images/themes/blue-v1/gallery_4.webp",
      "/images/themes/blue-v1/gallery_2.webp",
      "/images/themes/blue-v1/gallery_5.webp",
      "/images/themes/blue-v1/gallery_7.webp",
      "/images/themes/blue-v1/gallery_11.webp",
      "/images/themes/blue-v1/gallery_3.webp",
      "/images/themes/blue-v1/gallery_9.webp",
      "/images/themes/blue-v1/gallery_1.webp"
    ]
  },
  {
    "slug": "hoa-hong-do-ruou",
    "name": "Hoa Hồng - Đỏ Rượu",
    "description": "Hồng phấn và hồng đỏ rượu trên nền thẻ nhung kẻ chỉ vàng, tên cô dâu chú rể viết tay mạ vàng, mở ra từ chiếc phong bì đỏ rượu niêm xi vàng.",
    "thumbnail": "/images/template-previews/listing/rose_burgundy.webp",
    "preview": "/images/template-previews/full/rose_burgundy.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#790606",
      "accent": "#d4af37",
      "background": "#fff7eb"
    },
    "tags": [
      "Sang trọng",
      "Hoa lá",
      "Hoa hồng",
      "Đỏ rượu",
      "Mạ vàng"
    ],
    "colors": [
      "Đỏ",
      "Hồng",
      "Vàng"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 2,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-09-22T17:44:17.336965+00:00",
    "jsFile": "hoa-hong-do-ruou-template-CnGkOxTJ.js",
    "exportName": "HoaHongDoRuouTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "hoa-hong-do-ruou-DP8vQ3vJ.css"
    ],
    "defaultImages": [
      "/images/themes/hoa-hong-do-ruou/gallery_1.webp",
      "/images/themes/hoa-hong-do-ruou/gallery_2.webp",
      "/images/themes/hoa-hong-do-ruou/gallery_3.webp",
      "/images/themes/hoa-hong-do-ruou/gallery_4.webp",
      "/images/themes/hoa-hong-do-ruou/gallery_5.webp",
      "/images/themes/hoa-hong-do-ruou/gallery_6.webp",
      "/images/themes/hoa-hong-do-ruou/gallery_7.webp",
      "/images/themes/hoa-hong-do-ruou/gallery_8.webp",
      "/images/themes/hoa-hong-do-ruou/hero.webp"
    ]
  },
  {
    "slug": "hoa-moc-hong",
    "name": "Hoa Mộc - Hồng",
    "description": "Hoa mộc watercolor với tông hồng ấm lãng mạn trên nền kem trắng",
    "thumbnail": "/images/template-previews/listing/boho_floral_pink.webp",
    "preview": "/images/template-previews/full/boho_floral_pink.webp",
    "category": "vintage",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#c25975",
      "accent": "#f48fb1",
      "background": "#fff8fa"
    },
    "tags": [
      "Boho",
      "Hoa lá",
      "Hoa Mộc",
      "Rustic"
    ],
    "colors": [
      "Hồng"
    ],
    "badges": [],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": false,
    "releasedAt": "2026-07-23T15:24:07.864218+00:00",
    "jsFile": "boho-floral-pink-template-C79ttAD3.js",
    "exportName": "BohoFloralPinkTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "boho-floral-pink-CxNZBaGF.css"
    ],
    "defaultImages": [
      "/images/themes/boho-floral-pink/groom.webp",
      "/images/themes/boho-floral-pink/bride.webp",
      "/images/themes/boho-floral-pink/gallery_1.webp",
      "/images/themes/boho-floral-pink/gallery_2.webp",
      "/images/themes/boho-floral-pink/gallery_3.webp",
      "/images/themes/boho-floral-pink/gallery_4.webp",
      "/images/themes/boho-floral-pink/gallery_5.webp"
    ]
  },
  {
    "slug": "baroque-lam",
    "name": "Baroque - Lam",
    "description": "Khung chạm rococo mạ vàng điểm xanh lam phấn nổi trên nền ngà phủ hoa văn damask; hai bên là cuộn lá acanthus và cột trụ cổ điển, khép lại bằng vòng hoa vỏ sò",
    "thumbnail": "/images/template-previews/listing/baroque_blue.webp",
    "preview": "/images/template-previews/full/baroque_blue.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#1e4b7a",
      "accent": "#64b5f6",
      "background": "#f5f9fd"
    },
    "tags": [
      "Sang trọng",
      "Mạ vàng",
      "Châu Âu",
      "Baroque",
      "Thanh lịch"
    ],
    "colors": [
      "Xanh dương"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 2.3,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-10-26T12:28:36.203879+00:00",
    "jsFile": "baroque-blue-template-3aIY5A9k.js",
    "exportName": "BaroqueBlueTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "baroque-blue-DYt0Hoac.css"
    ],
    "defaultImages": [
      "/images/template-previews/full/baroque_blue.webp"
    ]
  },
  {
    "slug": "hoang-gia-vang",
    "name": "Baroque - Vàng",
    "description": "Cảm hứng kiến trúc Baroque châu Âu: khung hoa văn mạ vàng cầu kỳ, hai cột trụ La Mã và nền damask kem; tông vàng đồng ấm điểm xanh ô-liu, gợi vẻ cổ điển xa hoa và lãng mạn.",
    "thumbnail": "/images/template-previews/listing/baroque_gold.webp",
    "preview": "/images/template-previews/full/baroque_gold.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#8c6d23",
      "accent": "#d4af37",
      "background": "#fdfbf5"
    },
    "tags": [
      "Sang trọng",
      "Mạ vàng",
      "Baroque",
      "Châu Âu",
      "Cổ điển"
    ],
    "colors": [
      "Vàng"
    ],
    "badges": [],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": false,
    "releasedAt": "2026-07-25T17:18:42.023873+00:00",
    "jsFile": "baroque-gold-template-gxxQ-Ba9.js",
    "exportName": "BaroqueGoldTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "baroque-gold-BJIx3UEF.css"
    ],
    "defaultImages": [
      "/images/themes/baroque-gold/gallery_1.jpg",
      "/images/themes/baroque-gold/gallery_2.jpg",
      "/images/themes/baroque-gold/gallery_3.jpg",
      "/images/themes/baroque-gold/gallery_4.jpg",
      "/images/themes/baroque-gold/gallery_5.jpg",
      "/images/themes/baroque-gold/gallery_6.jpg"
    ]
  },
  {
    "slug": "van-da-vang",
    "name": "Vân Đá - Vàng",
    "description": "Nền đá cẩm thạch trắng ngà vân vàng óng, những nhành lá mạ vàng vươn vào từ hai mép thiệp, ảnh cưới nghiêng nhẹ trong khung chỉ vàng mảnh và chữ serif nâu đồng sang trọng",
    "thumbnail": "/images/template-previews/listing/marble_yellow.webp",
    "preview": "/images/template-previews/full/marble_yellow.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#8c6d23",
      "accent": "#d4af37",
      "background": "#fdfbf5"
    },
    "tags": [
      "Sang trọng",
      "Mạ vàng",
      "Cẩm thạch",
      "Châu Âu"
    ],
    "colors": [
      "Vàng",
      "Trắng"
    ],
    "badges": [
      "Hot",
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 10,
    "isHot": true,
    "isNew": true,
    "releasedAt": "2026-10-26T06:39:28.955152+00:00",
    "jsFile": "marble-yellow-template-BArNv8w5.js",
    "exportName": "MarbleYellowTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "marble-yellow-Bi6-_p1p.css"
    ],
    "defaultImages": [
      "/images/themes/marble-yellow/groom.webp",
      "/images/themes/marble-yellow/bride.webp",
      "/images/themes/marble-yellow/gallery_1.webp",
      "/images/themes/marble-yellow/gallery_2.webp",
      "/images/themes/marble-yellow/gallery_3.webp",
      "/images/themes/marble-yellow/gallery_4.webp",
      "/images/themes/marble-yellow/gallery_5.webp",
      "/images/themes/marble-yellow/gallery_6.webp",
      "/images/themes/marble-yellow/gallery_7.webp",
      "/images/themes/marble-yellow/gallery_8.webp"
    ]
  },
  {
    "slug": "hoang-kim-do",
    "name": "Hoàng Kim - Đỏ",
    "description": "Sang trọng hoàng gia với nền đỏ thẫm và điểm nhấn vàng kim",
    "thumbnail": "/images/template-previews/listing/royal_red.webp",
    "preview": "/images/template-previews/full/royal_red.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#790606",
      "accent": "#d4af37",
      "background": "#fff7eb"
    },
    "tags": [
      "Sang trọng",
      "Mạ vàng"
    ],
    "colors": [
      "Đỏ",
      "Vàng"
    ],
    "badges": [],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": false,
    "releasedAt": "2026-07-23T15:24:07.864218+00:00",
    "jsFile": "royal-red-template-C_ki0IsL.js",
    "exportName": "RoyalRedTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "royal-red-COz9YWqZ.css"
    ],
    "defaultImages": [
      "/images/themes/royal-red/gallery_1.webp",
      "/images/themes/royal-red/gallery_2.webp",
      "/images/themes/royal-red/gallery_3.webp",
      "/images/themes/royal-red/gallery_4.webp",
      "/images/themes/royal-red/gallery_5.webp",
      "/images/themes/royal-red/gallery_6.webp",
      "/images/themes/royal-red/gallery_7.webp",
      "/images/themes/royal-red/gallery_8.webp",
      "/images/themes/royal-red/gallery_9.webp",
      "/images/themes/royal-red/gallery_10.webp"
    ]
  },
  {
    "slug": "dia-than-nau",
    "name": "Đĩa Than - Nâu",
    "description": "Thiệp chữ nâu hổ phách trên nền kem: đĩa than, hai ảnh polaroid, dấu sáp vàng, phù điêu ngày cưới và tem tên giữa hoa kem, ảnh cưới lớn, hai nhà, chữ lồng, ngày giờ tiệc và âm lịch, địa điểm có nút chỉ đường, cụm bốn ảnh, timeline, dress code, đếm ngược, lịch tháng, album trượt và ảnh kết Thank You.",
    "thumbnail": "/images/template-previews/listing/vinyl_brown.webp",
    "preview": "/images/template-previews/full/vinyl_brown.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#5c4033",
      "accent": "#c5a165",
      "background": "#fbf8f3"
    },
    "tags": [
      "Có ảnh",
      "Hiện đại",
      "Hoa lá",
      "Vintage",
      "Polaroid"
    ],
    "colors": [
      "Nâu"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 2,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-10-02T06:48:05.479108+00:00",
    "jsFile": "vinyl-brown-template-8mQvC5-W.js",
    "exportName": "VinylBrownTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "vinyl-brown-B8MJaiVl.css"
    ],
    "defaultImages": [
      "/images/themes/minimalism-dark-brown/gallery_6.webp",
      "/images/themes/minimalism-dark-brown/gallery_5.webp",
      "/images/themes/minimalism-dark-brown/gallery_4.webp",
      "/images/themes/minimalism-dark-brown/gallery_8.webp",
      "/images/themes/minimalism-dark-brown/gallery_3.webp",
      "/images/themes/minimalism-dark-brown/gallery_10.webp",
      "/images/themes/minimalism-dark-brown/gallery_2.webp",
      "/images/themes/minimalism-dark-brown/gallery_7.webp"
    ]
  },
  {
    "slug": "song-phung-xanh",
    "name": "Song Phụng - Xanh",
    "description": "Thanh lịch với họa tiết đôi phụng hoàng, tông xanh lá",
    "thumbnail": "/images/template-previews/listing/double_phoenix_green.webp",
    "preview": "/images/template-previews/full/double_phoenix_green.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#2e5a36",
      "accent": "#8bc34a",
      "background": "#f6faf6"
    },
    "tags": [
      "Truyền thống",
      "Rồng phượng",
      "Thanh lịch"
    ],
    "colors": [
      "Xanh lá"
    ],
    "badges": [
      "Hot"
    ],
    "occasion": "wedding",
    "trendingScore": 6.2,
    "isHot": true,
    "isNew": false,
    "releasedAt": "2026-07-23T15:24:07.864218+00:00",
    "jsFile": "songphung-green-template-CVfXcN0x.js",
    "exportName": "SongPhungGreenTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "songphung-green-CeS47JUP.css"
    ],
    "defaultImages": [
      "/images/themes/songphung-green/gallery_1.webp",
      "/images/themes/songphung-green/gallery_2.webp",
      "/images/themes/songphung-green/gallery_3.webp",
      "/images/themes/songphung-green/gallery_4.webp",
      "/images/themes/songphung-green/gallery_5.webp",
      "/images/themes/songphung-green/gallery_6.webp",
      "/images/themes/songphung-green/gallery_7.webp",
      "/images/themes/songphung-green/gallery_8.webp",
      "/images/themes/songphung-green/gallery_9.webp",
      "/images/themes/songphung-green/gallery_10.webp"
    ]
  },
  {
    "slug": "vuon-xuan-lam",
    "name": "Vườn Xuân - Lam",
    "description": "Thiên nhiên thanh lịch với sắc xanh lam dịu mát",
    "thumbnail": "/images/template-previews/listing/spring_garden_blue.webp",
    "preview": "/images/template-previews/full/spring_garden_blue.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#1e4b7a",
      "accent": "#64b5f6",
      "background": "#f5f9fd"
    },
    "tags": [
      "Sân vườn",
      "Thiên nhiên",
      "Thanh lịch"
    ],
    "colors": [
      "Xanh dương"
    ],
    "badges": [],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": false,
    "releasedAt": "2026-07-23T15:24:07.864218+00:00",
    "jsFile": "spring-garden-blue-template-tCj8i5IK.js",
    "exportName": "SpringGardenBlueTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "spring-garden-blue-DhaQFfEi.css"
    ],
    "defaultImages": [
      "/images/themes/vuon xuan blue/gallery_1.webp",
      "/images/themes/vuon xuan blue/gallery_2.webp",
      "/images/themes/vuon xuan blue/gallery_3.webp",
      "/images/themes/vuon xuan blue/gallery_4.webp",
      "/images/themes/vuon xuan blue/gallery_5.webp"
    ]
  },
  {
    "slug": "song-hy-v2-do",
    "name": "Song Hỷ V2 - Đỏ",
    "description": "Thiệp giấy kem chữ Hỷ, ảnh khung vòm, hoa văn sóng nước",
    "thumbnail": "/images/template-previews/listing/song_hy_v2_red.webp",
    "preview": "/images/template-previews/full/song_hy_v2_red.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#790606",
      "accent": "#d4af37",
      "background": "#fff7eb"
    },
    "tags": [
      "Truyền thống",
      "Có ảnh",
      "Chữ Hỷ"
    ],
    "colors": [
      "Đỏ"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 2,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-10-02T03:44:35.392651+00:00",
    "jsFile": "song-hy-v2-red-template-C7LJPvR3.js",
    "exportName": "SongHyV2RedTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "song-hy-v2-red-iB_egMd-.css"
    ],
    "defaultImages": [
      "/images/themes/song-hy-v2-red/hero.webp",
      "/images/themes/song-hy-v2-red/gallery_1.webp",
      "/images/themes/song-hy-v2-red/gallery_2.webp",
      "/images/themes/song-hy-v2-red/gallery_3.webp",
      "/images/themes/song-hy-v2-red/gallery_4.webp",
      "/images/themes/song-hy-v2-red/gallery_5.webp",
      "/images/themes/song-hy-v2-red/gallery_6.webp",
      "/images/themes/song-hy-v2-red/gallery_7.webp",
      "/images/themes/song-hy-v2-red/gallery_8.webp",
      "/images/themes/song-hy-v2-red/gallery_9.webp"
    ]
  },
  {
    "slug": "hoa-thuy-tinh-lam",
    "name": "Hoa Thuỷ Tinh - Lam",
    "description": "Hoa văn pha lê tinh xảo và khung hoa màu xanh sứ trên nền kem ấm, điểm tông xanh sứ đậm; cảm giác châu Âu thanh lịch, trong trẻo và lãng mạn.",
    "thumbnail": "/images/template-previews/listing/crystal_floral_blue.webp",
    "preview": "/images/template-previews/full/crystal_floral_blue.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#1e4b7a",
      "accent": "#64b5f6",
      "background": "#f5f9fd"
    },
    "tags": [
      "Sang trọng",
      "Hoa lá",
      "Hoa pha lê",
      "Châu Âu",
      "Thanh lịch"
    ],
    "colors": [
      "Xanh dương"
    ],
    "badges": [],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": false,
    "releasedAt": "2026-07-25T05:42:02.815088+00:00",
    "jsFile": "crystal-floral-blue-template-9RXF7QVD.js",
    "exportName": "CrystalFloralBlueTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "crystal-floral-blue-BS0V8Kdo.css"
    ],
    "defaultImages": [
      "/images/themes/crystal-floral-blue/gallery_1.webp",
      "/images/themes/crystal-floral-blue/gallery_2.webp",
      "/images/themes/crystal-floral-blue/gallery_3.webp",
      "/images/themes/crystal-floral-blue/gallery_4.webp",
      "/images/themes/crystal-floral-blue/gallery_5.webp",
      "/images/themes/crystal-floral-blue/gallery_6.webp",
      "/images/themes/crystal-floral-blue/gallery_7.webp",
      "/images/themes/crystal-floral-blue/gallery_8.webp"
    ]
  },
  {
    "slug": "dau-yeu-vang",
    "name": "Dấu Yêu - Vàng",
    "description": "Thiệp kem vàng truyền thống: Save the date với ảnh khung kem trên vòm hoa, cha mẹ hai bên, trái tim vân tay, ảnh cô dâu chú rể, thiệp mời ba ảnh, lịch cưới có tranh cô dâu chú rể, đếm ngược, bản đồ địa điểm và album ảnh trượt.",
    "thumbnail": "/images/template-previews/listing/fingerprint_gold.webp",
    "preview": "/images/template-previews/full/fingerprint_gold.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#8c6d23",
      "accent": "#d4af37",
      "background": "#fdfbf5"
    },
    "tags": [
      "Truyền thống",
      "Có ảnh",
      "Chữ Hỷ",
      "Bản đồ",
      "Vân tay"
    ],
    "colors": [
      "Vàng",
      "Đỏ"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 2,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-10-01T01:52:31.515075+00:00",
    "jsFile": "fingerprint-gold-template-Jhgnq01N.js",
    "exportName": "FingerprintGoldTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "fingerprint-gold-Be0-Cp_n.css"
    ],
    "defaultImages": [
      "/images/themes/love-art/gallery_4.jpg",
      "/images/themes/love-art/gallery_2.jpg",
      "/images/themes/love-art/gallery_5.jpg",
      "/images/themes/love-art/gallery_6.jpg",
      "/images/themes/love-art/gallery_7.jpg",
      "/images/themes/love-art/groom.jpg",
      "/images/themes/love-art/bride.jpg",
      "/images/themes/love-art/gallery_1.jpg",
      "/images/themes/love-art/gallery_3.jpg",
      "/images/themes/love-art/gallery_8.jpg"
    ]
  },
  {
    "slug": "lien-hoa-hong",
    "name": "Liên Hoa - Hồng",
    "description": "Sắc hồng phấn dịu dàng của hoa sen: khung mạ vàng tinh tế cùng những đóa sen vẽ màu nước, tông hồng blush trên nền trắng ngà; chữ EB Garamond và Beau Rivage viết tay, gợi vẻ thanh khiết, lãng mạn và đậm nét truyền thống Á Đông.",
    "thumbnail": "/images/template-previews/listing/lien_hoa_pink.webp",
    "preview": "/images/template-previews/full/lien_hoa_pink.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#c25975",
      "accent": "#f48fb1",
      "background": "#fff8fa"
    },
    "tags": [
      "Truyền thống",
      "Hoa lá",
      "Mạ vàng",
      "Hoa sen",
      "Thanh lịch"
    ],
    "colors": [
      "Hồng"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-08-30T01:44:14.281389+00:00",
    "jsFile": "lien-hoa-pink-template-A-ymZH00.js",
    "exportName": "LienHoaPinkTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "lien-hoa-pink-CM_khklB.css"
    ],
    "defaultImages": [
      "/images/themes/lien-hoa-pink/gallery_1.webp",
      "/images/themes/lien-hoa-pink/gallery_2.webp",
      "/images/themes/lien-hoa-pink/gallery_3.webp",
      "/images/themes/lien-hoa-pink/gallery_4.webp",
      "/images/themes/lien-hoa-pink/gallery_5.webp"
    ]
  },
  {
    "slug": "long-phung-lam",
    "name": "Long Phụng - Lam",
    "description": "Cổ điển với họa tiết rồng phượng truyền thống",
    "thumbnail": "/images/template-previews/listing/dragon_phoenix_blue.webp",
    "preview": "/images/template-previews/full/dragon_phoenix_blue.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#1e4b7a",
      "accent": "#64b5f6",
      "background": "#f5f9fd"
    },
    "tags": [
      "Truyền thống",
      "Rồng phượng",
      "Cổ điển"
    ],
    "colors": [
      "Xanh dương"
    ],
    "badges": [],
    "occasion": "wedding",
    "trendingScore": 2,
    "isHot": false,
    "isNew": false,
    "releasedAt": "2026-07-23T15:24:07.864218+00:00",
    "jsFile": "longphung-blue-template-DPnrDg3L.js",
    "exportName": "LongPhungBlueTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "blue-v1-Du1M57hC.css"
    ],
    "defaultImages": [
      "/images/themes/blue-v1/gallery_1.webp",
      "/images/themes/blue-v1/gallery_2.webp",
      "/images/themes/blue-v1/gallery_3.webp",
      "/images/themes/blue-v1/gallery_4.webp",
      "/images/themes/blue-v1/gallery_5.webp",
      "/images/themes/blue-v1/gallery_6.webp",
      "/images/themes/blue-v1/gallery_7.webp",
      "/images/themes/blue-v1/gallery_8.webp",
      "/images/themes/blue-v1/gallery_9.webp",
      "/images/themes/blue-v1/gallery_10.webp"
    ]
  },
  {
    "slug": "giay-dap-noi-nau",
    "name": "Giấy Dập Nổi - Nâu",
    "description": "Nền giấy dập nổi hoạ tiết lá trắng ngà, các mục để trơn trên thẻ viền chìm; chữ mực nâu sepia điểm vàng đồng, tên cô dâu chú rể viết tay giữa thẻ viền sò chạm nổi.",
    "thumbnail": "/images/template-previews/listing/rose_terracotta.webp",
    "preview": "/images/template-previews/full/rose_terracotta.webp",
    "category": "minimal",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#5c4033",
      "accent": "#c5a165",
      "background": "#fbf8f3"
    },
    "tags": [
      "Tối giản",
      "Boho",
      "Cổ điển",
      "Dập nổi"
    ],
    "colors": [
      "Nâu"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 2,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-09-22T11:47:15.457645+00:00",
    "jsFile": "giay-dap-noi-nau-template-D1UIPXj_.js",
    "exportName": "GiayDapNoiNauTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "giay-dap-noi-nau-B8UeR3tn.css"
    ],
    "defaultImages": [
      "/images/themes/giay-dap-noi-nau/gallery_1.webp",
      "/images/themes/giay-dap-noi-nau/gallery_2.webp",
      "/images/themes/giay-dap-noi-nau/gallery_3.webp",
      "/images/themes/giay-dap-noi-nau/gallery_4.webp",
      "/images/themes/giay-dap-noi-nau/gallery_5.webp",
      "/images/themes/giay-dap-noi-nau/gallery_6.webp",
      "/images/themes/giay-dap-noi-nau/gallery_7.webp",
      "/images/themes/giay-dap-noi-nau/gallery_8.webp"
    ]
  },
  {
    "slug": "baroque-v2-lam-dam",
    "name": "Baroque V2 - Lam Đậm",
    "description": "Nền lam đậm gần đen phủ hoa văn damask, khung gương Baroque mạ vàng hình bầu dục ôm ảnh cưới cùng hoa mẫu đơn xanh navy và kem; đường viền vàng, chữ Times New Roman và EB Garamond, gợi vẻ cổ điển sang trọng kiểu châu Âu.",
    "thumbnail": "/images/template-previews/listing/baroque_v2_darkblue.webp",
    "preview": "/images/template-previews/full/baroque_v2_darkblue.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#1e4b7a",
      "accent": "#64b5f6",
      "background": "#f5f9fd"
    },
    "tags": [
      "Sang trọng",
      "Mạ vàng",
      "Hoa lá",
      "Baroque",
      "Lam đậm",
      "Châu Âu"
    ],
    "colors": [
      "Xanh dương"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-09-10T18:13:03.742688+00:00",
    "jsFile": "baroque-v2-dark-blue-template-Di_Jw8mw.js",
    "exportName": "BaroqueV2DarkBlueTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "baroque-v2-dark-blue-DsVDHK11.css"
    ],
    "defaultImages": [
      "/images/themes/baroque-v2-dark-blue/hero.webp",
      "/images/themes/baroque-v2-dark-blue/gallery_1.webp",
      "/images/themes/baroque-v2-dark-blue/gallery_2.webp",
      "/images/themes/baroque-v2-dark-blue/gallery_3.webp",
      "/images/themes/baroque-v2-dark-blue/gallery_4.webp",
      "/images/themes/baroque-v2-dark-blue/gallery_5.webp",
      "/images/themes/baroque-v2-dark-blue/gallery_6.webp",
      "/images/themes/baroque-v2-dark-blue/gallery_7.webp",
      "/images/themes/baroque-v2-dark-blue/gallery_8.webp",
      "/images/themes/baroque-v2-dark-blue/gallery_9.webp"
    ]
  },
  {
    "slug": "lau-dai-lam",
    "name": "Lâu Đài - Lam",
    "description": "Phong cách lâu đài châu Âu với biệt thự lớn, vòi phun nước và cây bách Ý; tông xanh lam sâu trên nền trắng, font script lãng mạn.",
    "thumbnail": "/images/template-previews/listing/chateau_blue.webp",
    "preview": "/images/template-previews/full/chateau_blue.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#1e4b7a",
      "accent": "#64b5f6",
      "background": "#f5f9fd"
    },
    "tags": [
      "Sang trọng",
      "Lâu đài",
      "Châu Âu"
    ],
    "colors": [
      "Xanh dương"
    ],
    "badges": [
      "Hot"
    ],
    "occasion": "wedding",
    "trendingScore": 8.5,
    "isHot": true,
    "isNew": false,
    "releasedAt": "2026-07-23T15:24:07.864218+00:00",
    "jsFile": "chateau-blue-template-B5UcXT6k.js",
    "exportName": "ChateauBlueTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "chateau-blue-rr9BjQIO.css"
    ],
    "defaultImages": [
      "/images/themes/chateau-blue/gallery_1.jpg",
      "/images/themes/chateau-blue/gallery_2.jpg",
      "/images/themes/chateau-blue/gallery_3.jpg",
      "/images/themes/chateau-blue/gallery_4.jpg",
      "/images/themes/chateau-blue/gallery_5.jpg"
    ]
  },
  {
    "slug": "moc-thao-xanh",
    "name": "Mộc Thảo - Xanh",
    "description": "Thiệp xanh rêu trên nền giấy: ảnh cưới \"Save our date\", ảnh và lời giới thiệu cô dâu chú rể giữa hoa nét mảnh, ảnh Just Married, lịch tháng cưới, lịch trình trên ảnh nền và album ảnh ghép — nhẹ nhàng và hiện đại.",
    "thumbnail": "/images/template-previews/listing/botanical_green.webp",
    "preview": "/images/template-previews/full/botanical_green.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#2e5a36",
      "accent": "#8bc34a",
      "background": "#f6faf6"
    },
    "tags": [
      "Hiện đại",
      "Có ảnh",
      "Hoa lá",
      "Just Married",
      "Nền giấy"
    ],
    "colors": [
      "Xanh lá"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 2,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-09-30T10:11:32.045863+00:00",
    "jsFile": "botanical-green-template-DyFSANKW.js",
    "exportName": "BotanicalGreenTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "botanical-green-oS9G7TRQ.css"
    ],
    "defaultImages": [
      "/images/themes/boho-floral-green/gallery_2.webp",
      "/images/themes/boho-floral-green/gallery_1.webp",
      "/images/themes/boho-floral-green/gallery_7.webp",
      "/images/themes/boho-floral-green/gallery_5.webp",
      "/images/themes/boho-floral-green/gallery_8.webp",
      "/images/themes/boho-floral-green/groom.webp",
      "/images/themes/boho-floral-green/bride.webp",
      "/images/themes/boho-floral-green/gallery_3.webp",
      "/images/themes/boho-floral-green/gallery_4.webp",
      "/images/themes/boho-floral-green/gallery_6.webp"
    ]
  },
  {
    "slug": "song-long-lam",
    "name": "Song Long - Lam",
    "description": "Lãng mạn với sắc xanh dương nhẹ nhàng",
    "thumbnail": "/images/template-previews/listing/double_dragon_blue.webp",
    "preview": "/images/template-previews/full/double_dragon_blue.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#1e4b7a",
      "accent": "#64b5f6",
      "background": "#f5f9fd"
    },
    "tags": [
      "Truyền thống",
      "Rồng phượng",
      "Lãng mạn"
    ],
    "colors": [
      "Xanh dương"
    ],
    "badges": [],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": false,
    "releasedAt": "2026-07-23T15:24:07.864218+00:00",
    "jsFile": "song-long-lam-template-_aRieLr6.js",
    "exportName": "SongLongLamTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "song-long-lam-BNfb1nvn.css"
    ],
    "defaultImages": [
      "/images/themes/songlong-blue/groom.jpg",
      "/images/themes/songlong-blue/bride.jpg",
      "/images/themes/songlong-blue/gallery_1.jpg",
      "/images/themes/songlong-blue/gallery_2.jpg",
      "/images/themes/songlong-blue/gallery_3.jpg",
      "/images/themes/songlong-blue/gallery_4.jpg",
      "/images/themes/songlong-blue/gallery_5.jpg",
      "/images/themes/songlong-blue/gallery_6.jpg",
      "/images/themes/songlong-blue/gallery_7.jpg",
      "/images/themes/songlong-blue/gallery_8.jpg"
    ]
  },
  {
    "slug": "co-ba-do",
    "name": "Cô Ba - Đỏ",
    "description": "Giấy kem ấm, chữ nâu cổ điển và điểm nhấn đỏ son; mây, hoa và đèn lồng có parallax. Phong bì nâu, thẻ kem, con dấu 囍 — gợi áo Nhật Bình và thiệp cổ trang hiện đại.",
    "thumbnail": "/images/template-previews/listing/co_ba_red.webp",
    "preview": "/images/template-previews/full/co_ba_red.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#790606",
      "accent": "#d4af37",
      "background": "#fff7eb"
    },
    "tags": [
      "Truyền thống",
      "Cổ phục",
      "Giấy kem"
    ],
    "colors": [
      "Đỏ"
    ],
    "badges": [
      "Hot"
    ],
    "occasion": "wedding",
    "trendingScore": 7,
    "isHot": true,
    "isNew": false,
    "releasedAt": "2026-07-23T15:24:07.864218+00:00",
    "jsFile": "coba-red-template-WTSOU3ja.js",
    "exportName": "CoBaRedTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "coba-red-DwpQorrA.css"
    ],
    "defaultImages": [
      "/images/themes/coba-red/gallery_1.webp",
      "/images/themes/coba-red/gallery_2.webp",
      "/images/themes/coba-red/gallery_3.webp",
      "/images/themes/coba-red/gallery_4.webp",
      "/images/themes/coba-red/gallery_5.webp",
      "/images/themes/coba-red/gallery_6.webp",
      "/images/themes/coba-red/gallery_7.webp"
    ]
  },
  {
    "slug": "vo-so-lam",
    "name": "Vỏ Sò - Lam",
    "description": "Thiệp xanh biển: phong bì lam và ảnh polaroid trên nền cát, Save The Date, đếm ngược trên dải giấy lam, hai nhà, địa điểm có nút chỉ đường, lịch trình, lịch tháng, chuyện tình trên thẻ vỏ sò và album ảnh.",
    "thumbnail": "/images/template-previews/listing/seashell_blue.webp",
    "preview": "/images/template-previews/full/seashell_blue.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#1e4b7a",
      "accent": "#64b5f6",
      "background": "#f5f9fd"
    },
    "tags": [
      "Hiện đại",
      "Có ảnh",
      "Biển",
      "Vỏ sò"
    ],
    "colors": [
      "Xanh dương",
      "Trắng"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 2,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-10-02T01:43:01.815173+00:00",
    "jsFile": "seashell-blue-template-BlYZZibJ.js",
    "exportName": "SeashellBlueTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "seashell-blue-BiChzxN9.css"
    ],
    "defaultImages": [
      "/images/themes/seashell-blue/hero-bg.webp",
      "/images/themes/crystal-floral-blue/gallery_4.webp",
      "/images/themes/crystal-floral-blue/gallery_1.webp",
      "/images/themes/crystal-floral-blue/gallery_7.webp",
      "/images/themes/crystal-floral-blue/gallery_3.webp",
      "/images/themes/crystal-floral-blue/gallery_6.webp",
      "/images/themes/crystal-floral-blue/gallery_8.webp",
      "/images/themes/crystal-floral-blue/gallery_5.webp",
      "/images/themes/crystal-floral-blue/gallery_2.webp"
    ]
  },
  {
    "slug": "hoa-tinh-do",
    "name": "Hoạ Tình - Đỏ",
    "description": "Phong cách comic nghệ thuật với nền trắng tinh khôi và điểm nhấn đỏ tươi. Hoạ tiết hoa tim lãng mạn, font chữ handwritten độc đáo. Phong bì đỏ son hiện đại.",
    "thumbnail": "/images/template-previews/listing/hoa_tinh_red.webp",
    "preview": "/images/template-previews/full/hoa_tinh_red.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#790606",
      "accent": "#d4af37",
      "background": "#fff7eb"
    },
    "tags": [
      "Hiện đại",
      "Nghệ thuật",
      "Comic"
    ],
    "colors": [
      "Đỏ"
    ],
    "badges": [],
    "occasion": "wedding",
    "trendingScore": 1,
    "isHot": false,
    "isNew": false,
    "releasedAt": "2026-07-23T15:24:07.864218+00:00",
    "jsFile": "hoa-tinh-red-template-BSsqNB4J.js",
    "exportName": "HoaTinhRedTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "hoa-tinh-red-Dkmkp-KS.css"
    ],
    "defaultImages": [
      "/images/themes/love-art/bride frame.webp",
      "/images/themes/love-art/groom frame.webp",
      "/images/themes/love-art/groom.jpg",
      "/images/themes/love-art/bride.jpg",
      "/images/themes/love-art/gallery_1.jpg",
      "/images/themes/love-art/gallery_2.jpg",
      "/images/themes/love-art/gallery_3.jpg",
      "/images/themes/love-art/gallery_4.jpg",
      "/images/themes/love-art/gallery_5.jpg",
      "/images/themes/love-art/gallery_6.jpg"
    ]
  },
  {
    "slug": "hoang-kim-ii-xanh",
    "name": "Hoàng Kim II - Xanh",
    "description": "Hoàng gia xanh lục thẫm với khung vàng kim và hoa hồng trắng sang trọng",
    "thumbnail": "/images/template-previews/listing/royal_v2_green.webp",
    "preview": "/images/template-previews/full/royal_v2_green.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#2e5a36",
      "accent": "#8bc34a",
      "background": "#f6faf6"
    },
    "tags": [
      "Sang trọng",
      "Mạ vàng",
      "Hoa hồng trắng"
    ],
    "colors": [
      "Xanh lá"
    ],
    "badges": [],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": false,
    "releasedAt": "2026-07-25T19:13:45.587381+00:00",
    "jsFile": "royal-v2-green-template-Ds2bz_y4.js",
    "exportName": "RoyalV2GreenTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "royal-v2-green-Dfkfh_JC.css"
    ],
    "defaultImages": [
      "/images/themes/royal-v2-green/gallery_1.webp",
      "/images/themes/royal-v2-green/gallery_2.webp",
      "/images/themes/royal-v2-green/gallery_3.webp",
      "/images/themes/royal-v2-green/gallery_4.webp",
      "/images/themes/royal-v2-green/gallery_5.webp",
      "/images/themes/royal-v2-green/gallery_6.webp",
      "/images/themes/royal-v2-green/gallery_7.webp"
    ]
  },
  {
    "slug": "thanh-nha-do",
    "name": "Thanh Nhã - Đỏ",
    "description": "Thiệp tối giản tông đỏ đô: ảnh cưới khung bầu dục trên nền ảnh mờ, lời ngỏ, ảnh tròn cô dâu chú rể kèm cha mẹ, lịch và đếm ngược, album, dòng thời gian chuyện tình và thẻ ảnh cho từng sự kiện cưới.",
    "thumbnail": "/images/template-previews/listing/graceful_red.webp",
    "preview": "/images/template-previews/full/graceful_red.webp",
    "category": "minimal",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#790606",
      "accent": "#d4af37",
      "background": "#fff7eb"
    },
    "tags": [
      "Tối giản",
      "Có ảnh",
      "Hoa lá",
      "Nhiều sự kiện",
      "Chuyện tình"
    ],
    "colors": [
      "Đỏ"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-10-01T02:05:18.90784+00:00",
    "jsFile": "graceful-red-template-CwjJADML.js",
    "exportName": "GracefulRedTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "graceful-red-B-0qkIwj.css"
    ],
    "defaultImages": [
      "/images/themes/minimalism-dark-blue/gallery_1.webp",
      "/images/themes/minimalism-dark-blue/gallery_5.webp",
      "/images/themes/minimalism-dark-blue/groom.jpg",
      "/images/themes/minimalism-dark-blue/bride.jpg",
      "/images/themes/minimalism-dark-blue/gallery_3.webp",
      "/images/themes/minimalism-dark-blue/gallery_4.webp",
      "/images/themes/minimalism-dark-blue/gallery_6.webp",
      "/images/themes/minimalism-dark-blue/hero.webp"
    ]
  },
  {
    "slug": "minimalism-tim",
    "name": "Minimalism - Tím",
    "description": "Tối giản dịu dàng trên nền giấy trắng, hoa hồng tím lavender và dấu sáp trái tim mạ vàng",
    "thumbnail": "/images/template-previews/listing/minimalism_purple.webp",
    "preview": "/images/template-previews/full/minimalism_purple.webp",
    "category": "minimal",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#432a5c",
      "accent": "#bda3d6",
      "background": "#f9f6fc"
    },
    "tags": [
      "Tối giản",
      "Hoa lá",
      "Lavender",
      "Thanh lịch"
    ],
    "colors": [
      "Tím"
    ],
    "badges": [
      "Hot",
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 6.7,
    "isHot": true,
    "isNew": true,
    "releasedAt": "2026-08-29T14:16:21.209985+00:00",
    "jsFile": "minimalism-tim-template-CvbcFVd0.js",
    "exportName": "MinimalismTimTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "minimalism-tim-Cb_lIY3L.css"
    ],
    "defaultImages": [
      "/images/themes/minimalism-purple/gallery_6.jpg",
      "/images/themes/minimalism-purple/gallery_1.jpg",
      "/images/themes/minimalism-purple/gallery_2.jpg",
      "/images/themes/minimalism-purple/gallery_3.jpg",
      "/images/themes/minimalism-purple/gallery_4.jpg",
      "/images/themes/minimalism-purple/gallery_5.jpg",
      "/images/themes/minimalism-purple/gallery_7.jpg",
      "/images/themes/minimalism-purple/gallery_8.jpg"
    ]
  },
  {
    "slug": "hoa-thuy-tinh-xanh",
    "name": "Hoa Thuỷ Tinh - Xanh",
    "description": "Hoa văn pha lê tinh xảo và khung hoa xanh lục ánh vàng trên nền kem ấm, điểm tông xanh ngọc lục đậm; cảm giác châu Âu thanh lịch, trong trẻo và tươi mát.",
    "thumbnail": "/images/template-previews/listing/crystal_floral_green.webp",
    "preview": "/images/template-previews/full/crystal_floral_green.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#2e5a36",
      "accent": "#8bc34a",
      "background": "#f6faf6"
    },
    "tags": [
      "Sang trọng",
      "Hoa lá",
      "Hoa pha lê",
      "Châu Âu",
      "Thanh lịch"
    ],
    "colors": [
      "Xanh lá"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-08-30T00:26:08.822345+00:00",
    "jsFile": "crystal-floral-green-template-DFOP8oQg.js",
    "exportName": "CrystalFloralGreenTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "crystal-floral-green-8SrHZEM4.css"
    ],
    "defaultImages": [
      "/images/themes/crystal-floral-green/gallery_1.webp",
      "/images/themes/crystal-floral-green/gallery_2.webp",
      "/images/themes/crystal-floral-green/gallery_3.webp",
      "/images/themes/crystal-floral-green/gallery_4.webp",
      "/images/themes/crystal-floral-green/gallery_5.webp",
      "/images/themes/crystal-floral-green/gallery_6.webp",
      "/images/themes/crystal-floral-green/gallery_7.webp"
    ]
  },
  {
    "slug": "long-phung-huyen",
    "name": "Long Phụng - Huyền",
    "description": "Cổ điển sang trọng với tông đen huyền bí",
    "thumbnail": "/images/template-previews/listing/dragon_phoenix_black.webp",
    "preview": "/images/template-previews/full/dragon_phoenix_black.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#1f1f1f",
      "accent": "#d4af37",
      "background": "#f8f7f4"
    },
    "tags": [
      "Truyền thống",
      "Rồng phượng",
      "Cổ điển",
      "Huyền"
    ],
    "colors": [
      "Đen"
    ],
    "badges": [],
    "occasion": "wedding",
    "trendingScore": 2,
    "isHot": false,
    "isNew": false,
    "releasedAt": "2026-07-23T15:24:07.864218+00:00",
    "jsFile": "longphung-black-template-BefXs1pt.js",
    "exportName": "LongPhungBlackTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "black-v1-CBw6xIvu.css"
    ],
    "defaultImages": [
      "/images/themes/black-v1/gallery_1.jpg",
      "/images/themes/black-v1/gallery_2.jpg",
      "/images/themes/black-v1/gallery_3.jpg",
      "/images/themes/black-v1/gallery_4.jpg"
    ]
  },
  {
    "slug": "to-duyen-do-dam",
    "name": "Tơ Duyên - Đỏ Đậm",
    "description": "Hoa phong quỳ đỏ rượu vang nở trên nền giấy trắng tinh, dải lụa đỏ thẫm uốn quanh từng phần nội dung cùng những nét cong mảnh như sợi tơ; chữ đỏ đô, bố cục so le trái phải, gợi vẻ lãng mạn và sang trọng.",
    "thumbnail": "/images/template-previews/listing/silk_ribbon_darkred.webp",
    "preview": "/images/template-previews/full/silk_ribbon_darkred.webp",
    "category": "minimal",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#790606",
      "accent": "#d4af37",
      "background": "#fff7eb"
    },
    "tags": [
      "Tối giản",
      "Hoa lá",
      "Hoa phong quỳ",
      "Lụa",
      "Thanh lịch"
    ],
    "colors": [
      "Đỏ",
      "Trắng"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-09-21T01:29:34.945261+00:00",
    "jsFile": "silk-ribbon-darkred-template-CYjMG5Yx.js",
    "exportName": "SilkRibbonDarkRedTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "silk-ribbon-darkred-DW6pCZpy.css"
    ],
    "defaultImages": [
      "/images/themes/silk-ribbon-darkred/groom.jpg",
      "/images/themes/silk-ribbon-darkred/bride.jpg",
      "/images/themes/silk-ribbon-darkred/gallery_1.webp",
      "/images/themes/silk-ribbon-darkred/gallery_2.webp",
      "/images/themes/silk-ribbon-darkred/gallery_3.webp",
      "/images/themes/silk-ribbon-darkred/gallery_4.webp",
      "/images/themes/silk-ribbon-darkred/gallery_5.webp",
      "/images/themes/silk-ribbon-darkred/gallery_6.webp",
      "/images/themes/silk-ribbon-darkred/gallery_7.webp"
    ]
  },
  {
    "slug": "bach-su-v2-xanh",
    "name": "Bạch Sứ V2 - Xanh",
    "description": "Hoa trắng vẽ tay trên nền lá xanh ô liu, thẻ bo tròn viền xanh rêu và khối lịch cưới xanh trầm",
    "thumbnail": "/images/template-previews/listing/porcelain_v2_green.webp",
    "preview": "/images/template-previews/full/porcelain_v2_green.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#2e5a36",
      "accent": "#8bc34a",
      "background": "#f6faf6"
    },
    "tags": [
      "Sang trọng",
      "Hoa lá",
      "Hoa trắng",
      "Xanh ô liu",
      "Cổ điển",
      "Trang nhã"
    ],
    "colors": [
      "Xanh lá",
      "Trắng"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-09-03T11:30:04.08844+00:00",
    "jsFile": "porcelain-v2-green-template-CJJPYb3w.js",
    "exportName": "PorcelainV2GreenTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "porcelain-v2-green-Cy9sWvl3.css"
    ],
    "defaultImages": [
      "/images/themes/porcelain-v2-green/gallery_1.webp",
      "/images/themes/porcelain-v2-green/gallery_2.webp",
      "/images/themes/porcelain-v2-green/gallery_3.webp",
      "/images/themes/porcelain-v2-green/gallery_4.webp",
      "/images/themes/porcelain-v2-green/gallery_5.webp",
      "/images/themes/porcelain-v2-green/gallery_6.webp",
      "/images/themes/porcelain-v2-green/gallery_7.webp",
      "/images/themes/porcelain-v2-green/gallery_8.webp",
      "/images/themes/porcelain-v2-green/hero-frame.webp"
    ]
  },
  {
    "slug": "bach-su-v2-hong",
    "name": "Bạch Sứ V2 - Hồng",
    "description": "Hoa mẫu đơn hồng vẽ tay phủ khắp nền sứ kem, thẻ bờ bo tròn viền vàng ô liu và khối lịch cưới hồng phấn",
    "thumbnail": "/images/template-previews/listing/porcelain_v2_pink.webp",
    "preview": "/images/template-previews/full/porcelain_v2_pink.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#c25975",
      "accent": "#f48fb1",
      "background": "#fff8fa"
    },
    "tags": [
      "Sang trọng",
      "Hoa lá",
      "Hoa mẫu đơn",
      "Cổ điển",
      "Lãng mạn"
    ],
    "colors": [
      "Hồng",
      "Trắng"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-08-29T17:46:57.78471+00:00",
    "jsFile": "porcelain-v2-pink-template-CuYsztVw.js",
    "exportName": "PorcelainV2PinkTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "porcelain-v2-green-Cy9sWvl3.css"
    ],
    "defaultImages": [
      "/images/themes/porcelain-v2-pink/gallery_1.webp",
      "/images/themes/porcelain-v2-pink/gallery_2.webp",
      "/images/themes/porcelain-v2-pink/gallery_3.webp",
      "/images/themes/porcelain-v2-pink/gallery_4.webp",
      "/images/themes/porcelain-v2-pink/gallery_5.webp",
      "/images/themes/porcelain-v2-pink/gallery_6.webp",
      "/images/themes/porcelain-v2-pink/hero-frame.webp"
    ]
  },
  {
    "slug": "hoai-niem-do",
    "name": "Hoài Niệm - Đỏ",
    "description": "Thiệp truyền thống hoài cổ trên nền giấy cũ: tranh cô dâu áo dài bên xe máy cổ, hai nhà, lời báo tin quanh chữ Hỷ, giờ ngày lễ và âm lịch, tranh rước dâu, địa điểm có nút chỉ đường, lịch tháng, đếm ngược, mâm quả cưới và lưới ảnh.",
    "thumbnail": "/images/template-previews/listing/nostalgia_red.webp",
    "preview": "/images/template-previews/full/nostalgia_red.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#790606",
      "accent": "#d4af37",
      "background": "#fff7eb"
    },
    "tags": [
      "Truyền thống",
      "Chữ Hỷ",
      "Có ảnh",
      "Hoài cổ"
    ],
    "colors": [
      "Đỏ"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 2,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-10-02T02:11:46.841515+00:00",
    "jsFile": "nostalgia-red-template-B8C48TUS.js",
    "exportName": "NostalgiaRedTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "nostalgia-red-Cely11aZ.css"
    ],
    "defaultImages": [
      "/images/themes/nostalgia-red/couple.webp",
      "/images/themes/coba-red/gallery_3.webp",
      "/images/themes/coba-red/gallery_4.webp",
      "/images/themes/coba-red/gallery_2.webp",
      "/images/themes/coba-red/gallery_6.webp",
      "/images/themes/coba-red/gallery_5.webp",
      "/images/themes/coba-red/gallery_1.webp",
      "/images/themes/coba-red/gallery_7.webp"
    ]
  },
  {
    "slug": "hoang-kim-lam",
    "name": "Hoàng Kim - Lam",
    "description": "Sang trọng hoàng gia với nền xanh lam thẫm và điểm nhấn vàng kim",
    "thumbnail": "/images/template-previews/listing/royal_blue.webp",
    "preview": "/images/template-previews/full/royal_blue.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#1e4b7a",
      "accent": "#64b5f6",
      "background": "#f5f9fd"
    },
    "tags": [
      "Sang trọng",
      "Mạ vàng"
    ],
    "colors": [
      "Xanh dương",
      "Vàng"
    ],
    "badges": [],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": false,
    "releasedAt": "2026-07-23T15:24:07.864218+00:00",
    "jsFile": "royal-blue-template-DFtJcsFp.js",
    "exportName": "RoyalBlueTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "royal-blue-DMLS6mYS.css"
    ],
    "defaultImages": [
      "/images/themes/royal-blue/gallery_1.webp",
      "/images/themes/royal-blue/gallery_2.webp",
      "/images/themes/royal-blue/gallery_3.webp",
      "/images/themes/royal-blue/gallery_4.webp",
      "/images/themes/royal-blue/gallery_5.webp",
      "/images/themes/royal-blue/gallery_6.webp",
      "/images/themes/royal-blue/gallery_7.webp",
      "/images/themes/royal-blue/gallery_8.webp",
      "/images/themes/royal-blue/gallery_9.webp"
    ]
  },
  {
    "slug": "hoa-dai-hong",
    "name": "Hoa Dại - Hồng",
    "description": "Giấy màu nước hồng với vòng hoa dại thắt nơ quanh tên, cánh hoa rơi lơ lửng, chữ hồng đất và xanh lá, lịch trình có bánh cưới và bồ câu",
    "thumbnail": "/images/template-previews/listing/hoa_dai_pink.webp",
    "preview": "/images/template-previews/full/hoa_dai_pink.webp",
    "category": "vintage",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#c25975",
      "accent": "#f48fb1",
      "background": "#fff8fa"
    },
    "tags": [
      "Hiện đại",
      "Hoa lá",
      "Hoa Dại",
      "Vòng hoa",
      "Màu nước"
    ],
    "colors": [
      "Hồng",
      "Xanh lá"
    ],
    "badges": [
      "Hot",
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 3,
    "isHot": true,
    "isNew": true,
    "releasedAt": "2026-10-08T17:56:55.064744+00:00",
    "jsFile": "hoa-dai-pink-template-BklloWg9.js",
    "exportName": "HoaDaiPinkTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "hoa-dai-pink-BWbj8x_q.css"
    ],
    "defaultImages": [
      "/images/themes/longphung-v3-red/gallery_1.jpg",
      "/images/themes/longphung-v3-red/hero.jpg",
      "/images/themes/longphung-v3-red/gallery_2.jpg",
      "/images/themes/longphung-v3-red/gallery_3.jpg",
      "/images/themes/longphung-v3-red/gallery_4.jpg",
      "/images/themes/longphung-v3-red/gallery_5.jpg",
      "/images/themes/longphung-v3-red/gallery_6.jpg",
      "/images/themes/longphung-v3-red/gallery_7.jpg",
      "/images/themes/longphung-v3-red/gallery_8.jpg",
      "/images/themes/longphung-v3-red/gallery_9.jpg"
    ]
  },
  {
    "slug": "hoang-kim-xanh",
    "name": "Hoàng Kim - Xanh",
    "description": "Sang trọng hoàng gia với nền xanh lục thẫm và điểm nhấn vàng kim",
    "thumbnail": "/images/template-previews/listing/royal_green.webp",
    "preview": "/images/template-previews/full/royal_green.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#2e5a36",
      "accent": "#8bc34a",
      "background": "#f6faf6"
    },
    "tags": [
      "Sang trọng",
      "Mạ vàng"
    ],
    "colors": [
      "Xanh lá",
      "Vàng"
    ],
    "badges": [],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": false,
    "releasedAt": "2026-07-23T15:24:07.864218+00:00",
    "jsFile": "royal-green-template-BE8Kmsqo.js",
    "exportName": "RoyalGreenTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "royal-green-BbWsPHmt.css"
    ],
    "defaultImages": [
      "/images/themes/royal-green/gallery_1.webp",
      "/images/themes/royal-green/gallery_2.webp",
      "/images/themes/royal-green/gallery_3.webp",
      "/images/themes/royal-green/gallery_4.webp",
      "/images/themes/royal-green/gallery_5.webp",
      "/images/themes/royal-green/gallery_6.webp",
      "/images/themes/royal-green/gallery_7.webp",
      "/images/themes/royal-green/gallery_8.webp",
      "/images/themes/royal-green/gallery_9.webp",
      "/images/themes/royal-green/gallery_10.webp"
    ]
  },
  {
    "slug": "hoang-hon-lam",
    "name": "Hoàng Hôn - Lam",
    "description": "Thiệp navy trên giấy hồng đào: phong bì navy và thẻ Save the Date giữa hoa mẫu đơn xanh, hai nhà, ảnh tròn cô dâu chú rể, giờ ngày tiệc và âm lịch, địa điểm có nút chỉ đường, ảnh cưới lớn với tuần lễ cưới, love quote, đếm ngược, lưới ảnh và album trượt.",
    "thumbnail": "/images/template-previews/listing/sunset_navy.webp",
    "preview": "/images/template-previews/full/sunset_navy.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#1e4b7a",
      "accent": "#64b5f6",
      "background": "#f5f9fd"
    },
    "tags": [
      "Có ảnh",
      "Hiện đại",
      "Hoa lá",
      "Phong bì",
      "Biển"
    ],
    "colors": [
      "Xanh dương"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 2,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-10-02T05:14:06.090731+00:00",
    "jsFile": "sunset-navy-template-BmLW7kFt.js",
    "exportName": "SunsetNavyTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "sunset-navy-CMJDHc99.css"
    ],
    "defaultImages": [
      "/images/template-previews/full/sunset_navy.webp"
    ]
  },
  {
    "slug": "baroque-v2-xanh-dam",
    "name": "Baroque V2 - Xanh Đậm",
    "description": "Nền xanh rừng gần đen phủ hoa văn damask, khung tranh Baroque chạm trổ mạ vàng ôm ảnh cưới cùng hoa mẫu đơn xanh thẫm và kem; đường viền vàng, chữ Times New Roman và EB Garamond, gợi vẻ cổ điển sang trọng kiểu châu Âu.",
    "thumbnail": "/images/template-previews/listing/baroque_v2_darkgreen.webp",
    "preview": "/images/template-previews/full/baroque_v2_darkgreen.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#2e5a36",
      "accent": "#8bc34a",
      "background": "#f6faf6"
    },
    "tags": [
      "Sang trọng",
      "Mạ vàng",
      "Hoa lá",
      "Baroque",
      "Xanh đậm",
      "Châu Âu"
    ],
    "colors": [
      "Xanh lá"
    ],
    "badges": [
      "Hot",
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 11,
    "isHot": true,
    "isNew": true,
    "releasedAt": "2026-09-05T21:50:58.73594+00:00",
    "jsFile": "baroque-v2-dark-green-template-DxWBBXgC.js",
    "exportName": "BaroqueV2DarkGreenTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "baroque-v2-dark-green-DxmKPVYH.css"
    ],
    "defaultImages": [
      "/images/themes/baroque-v2-dark-green/hero.webp",
      "/images/themes/baroque-v2-dark-green/gallery_1.webp",
      "/images/themes/baroque-v2-dark-green/gallery_2.webp",
      "/images/themes/baroque-v2-dark-green/gallery_3.webp",
      "/images/themes/baroque-v2-dark-green/gallery_4.webp",
      "/images/themes/baroque-v2-dark-green/gallery_5.webp",
      "/images/themes/baroque-v2-dark-green/gallery_6.webp",
      "/images/themes/baroque-v2-dark-green/gallery_7.webp",
      "/images/themes/baroque-v2-dark-green/bride-broom.webp"
    ]
  },
  {
    "slug": "bach-su-v2-do",
    "name": "Bạch Sứ II - Đỏ",
    "description": "Hoa đỏ vẽ tay phủ khắp nền sứ kem, thẻ bo tròn viền đỏ mảnh và khối lịch cưới đỏ trầm",
    "thumbnail": "/images/template-previews/listing/porcelain_v2_red.webp",
    "preview": "/images/template-previews/full/porcelain_v2_red.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#790606",
      "accent": "#d4af37",
      "background": "#fff7eb"
    },
    "tags": [
      "Sang trọng",
      "Hoa lá",
      "Hoa đỏ",
      "Sứ kem",
      "Cổ điển"
    ],
    "colors": [
      "Đỏ",
      "Trắng"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-08-30T03:49:08.586407+00:00",
    "jsFile": "porcelain-v2-red-template-CUThv4Kb.js",
    "exportName": "PorcelainV2RedTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "porcelain-v2-green-Cy9sWvl3.css"
    ],
    "defaultImages": [
      "/images/themes/porcelain-v2-red/gallery_1.webp",
      "/images/themes/porcelain-v2-red/gallery_2.webp",
      "/images/themes/porcelain-v2-red/gallery_3.webp",
      "/images/themes/porcelain-v2-red/gallery_4.webp",
      "/images/themes/porcelain-v2-red/gallery_5.webp",
      "/images/themes/porcelain-v2-red/gallery_6.webp",
      "/images/themes/porcelain-v2-red/gallery_7.webp",
      "/images/themes/porcelain-v2-red/gallery_8.webp",
      "/images/themes/porcelain-v2-red/hero-frame.webp"
    ]
  },
  {
    "slug": "hoa-kho-cam",
    "name": "Hoa Khô - Cam",
    "description": "Hoa khô cúc vạn thọ vẽ màu nước viền quanh những khung thiệp kem, chữ cam đất trên nền giấy ấm",
    "thumbnail": "/images/template-previews/listing/hoa_kho_orange.webp",
    "preview": "/images/template-previews/full/hoa_kho_orange.webp",
    "category": "vintage",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#b85c2b",
      "accent": "#fb8c00",
      "background": "#fff9f5"
    },
    "tags": [
      "Boho",
      "Hoa lá",
      "Hoa khô",
      "Màu nước"
    ],
    "colors": [
      "Cam"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-08-31T14:08:05.311659+00:00",
    "jsFile": "hoa-kho-orange-template-BDRTeNkC.js",
    "exportName": "HoaKhoOrangeTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "hoa-kho-orange-D0cSDKBz.css"
    ],
    "defaultImages": [
      "/images/themes/hoa-kho-orange/gallery_1.webp",
      "/images/themes/hoa-kho-orange/gallery_2.webp",
      "/images/themes/hoa-kho-orange/gallery_3.webp",
      "/images/themes/hoa-kho-orange/gallery_4.webp",
      "/images/themes/hoa-kho-orange/gallery_5.webp",
      "/images/themes/hoa-kho-orange/gallery_6.webp",
      "/images/themes/hoa-kho-orange/gallery_7.webp",
      "/images/themes/hoa-kho-orange/gallery_8.webp"
    ]
  },
  {
    "slug": "long-phung-v4-do",
    "name": "Long Phụng v4 - Đỏ",
    "description": "Nền đỏ son rực rỡ, khung ảnh tròn mạ vàng cùng rồng phượng và mây ngũ sắc thêu nổi.",
    "thumbnail": "/images/template-previews/listing/dragon_phoenix_v4_red.webp",
    "preview": "/images/template-previews/full/dragon_phoenix_v4_red.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#790606",
      "accent": "#d4af37",
      "background": "#fff7eb"
    },
    "tags": [
      "Truyền thống",
      "Rồng phượng",
      "Cổ điển"
    ],
    "colors": [
      "Đỏ"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 1.67,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-09-23T04:08:47.121825+00:00",
    "jsFile": "longphung-v4-red-template-DpmW_uUu.js",
    "exportName": "LongPhungV4RedTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "longphung-v4-red-DMdowuuB.css"
    ],
    "defaultImages": [
      "/images/themes/longphung-v4-red/hero.webp",
      "/images/themes/longphung-v4-red/gallery_1.webp",
      "/images/themes/longphung-v4-red/gallery_2.webp",
      "/images/themes/longphung-v4-red/gallery_3.webp",
      "/images/themes/longphung-v4-red/gallery_4.webp",
      "/images/themes/longphung-v4-red/gallery_5.webp",
      "/images/themes/longphung-v4-red/gallery_6.webp",
      "/images/themes/longphung-v4-red/gallery_7.webp"
    ]
  },
  {
    "slug": "lien-hoa-v2-xanh",
    "name": "Liên Hoa V2 - Xanh",
    "description": "Phiên bản thứ hai của dòng Liên Hoa: sen hồng phấn vẽ màu nước cùng những tàu lá sen xanh ngọc tràn vào từ hai bên mép thiệp, trên nền giấy kem ấm; ảnh cưới đặt trong khung bo cánh sen và mọi tiêu đề đều nằm gọn trong viền hoa văn thanh mảnh.",
    "thumbnail": "/images/template-previews/listing/lien_hoa_v2_green.webp",
    "preview": "/images/template-previews/full/lien_hoa_v2_green.webp",
    "category": "vintage",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#2e5a36",
      "accent": "#8bc34a",
      "background": "#f6faf6"
    },
    "tags": [
      "Truyền thống",
      "Hoa lá",
      "Hoa sen",
      "Màu nước"
    ],
    "colors": [
      "Xanh lá",
      "Hồng"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-09-12T10:00:34.956444+00:00",
    "jsFile": "lien-hoa-v2-green-template-CQczqgHH.js",
    "exportName": "LienHoaV2GreenTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "lien-hoa-v2-green-Dza4Gsoe.css"
    ],
    "defaultImages": [
      "/images/themes/lien-hoa-v2-green/hero.webp",
      "/images/themes/lien-hoa-v2-green/gallery_1.webp",
      "/images/themes/lien-hoa-v2-green/gallery_2.webp",
      "/images/themes/lien-hoa-v2-green/gallery_3.webp",
      "/images/themes/lien-hoa-v2-green/gallery_4.webp",
      "/images/themes/lien-hoa-v2-green/gallery_5.webp",
      "/images/themes/lien-hoa-v2-green/gallery_6.webp"
    ]
  },
  {
    "slug": "bach-su-lam",
    "name": "Bạch Sứ - Lam",
    "description": "Hoa văn xanh lam vẽ nét trên nền sứ kem, khung viền chạm cổ điển và khối lịch cưới xanh navy",
    "thumbnail": "/images/template-previews/listing/porcelain_blue.webp",
    "preview": "/images/template-previews/full/porcelain_blue.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#1e4b7a",
      "accent": "#64b5f6",
      "background": "#f5f9fd"
    },
    "tags": [
      "Sang trọng",
      "Hoa lá",
      "Hoa văn xanh",
      "Trắng lam",
      "Cổ điển"
    ],
    "colors": [
      "Xanh dương",
      "Trắng"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-08-30T02:52:57.75824+00:00",
    "jsFile": "porcelain-blue-template-BDVzqjgz.js",
    "exportName": "PorcelainBlueTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "porcelain-blue-ZTccF2eh.css"
    ],
    "defaultImages": [
      "/images/themes/porcelain-blue/gallery_1.webp",
      "/images/themes/porcelain-blue/gallery_2.webp",
      "/images/themes/porcelain-blue/gallery_3.webp",
      "/images/themes/porcelain-blue/gallery_4.webp",
      "/images/themes/porcelain-blue/gallery_5.webp",
      "/images/themes/porcelain-blue/gallery_6.webp",
      "/images/themes/porcelain-blue/gallery_7.webp",
      "/images/themes/porcelain-blue/gallery_8.webp",
      "/images/themes/porcelain-blue/gallery_9.webp"
    ]
  },
  {
    "slug": "song-hac-do",
    "name": "Song Hạc - Đỏ",
    "description": "Nền đỏ son phủ vân giấy, đôi hạc bay qua vầng trăng son cùng mây xanh và mẫu đơn thêu nổi",
    "thumbnail": "/images/template-previews/listing/song_hac_red.webp",
    "preview": "/images/template-previews/full/song_hac_red.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#790606",
      "accent": "#d4af37",
      "background": "#fff7eb"
    },
    "tags": [
      "Truyền thống",
      "Hạc sen",
      "Cổ điển"
    ],
    "colors": [
      "Đỏ"
    ],
    "badges": [
      "Hot",
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 7,
    "isHot": true,
    "isNew": true,
    "releasedAt": "2026-09-25T04:49:23.772447+00:00",
    "jsFile": "song-hac-red-template-FVyX4u5L.js",
    "exportName": "SongHacRedTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "song-hac-red-CuC6SBsb.css"
    ],
    "defaultImages": [
      "/images/themes/song-hac-red/gallery_1.webp",
      "/images/themes/song-hac-red/gallery_2.webp",
      "/images/themes/song-hac-red/gallery_3.webp",
      "/images/themes/song-hac-red/gallery_4.webp",
      "/images/themes/song-hac-red/gallery_5.webp",
      "/images/themes/song-hac-red/gallery_6.webp",
      "/images/themes/song-hac-red/gallery_7.webp"
    ]
  },
  {
    "slug": "vuonkinh-lam",
    "name": "Vườn Kính - Lam",
    "description": "Nền hoa cẩm tú cầu xanh lam phủ kín thiệp, hai tên trong khung kính vòm trong suốt và tấm kính lớn ôm trọn nội dung; tông xanh lam mát cùng chữ trắng, gợi vẻ trong trẻo, mộng mơ kiểu khu vườn.",
    "thumbnail": "/images/template-previews/listing/glass_garden_blue.webp",
    "preview": "/images/template-previews/full/glass_garden_blue.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#1e4b7a",
      "accent": "#64b5f6",
      "background": "#f5f9fd"
    },
    "tags": [
      "Sân vườn",
      "Hoa lá",
      "Kính",
      "Lãng mạn"
    ],
    "colors": [
      "Xanh dương"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-08-29T15:14:27.205465+00:00",
    "jsFile": "glass-garden-blue-template-DcimYgpp.js",
    "exportName": "GlassGardenBlueTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "glass-garden-blue-BS-taJIe.css"
    ],
    "defaultImages": [
      "/images/themes/glass-garden-blue/gallery_1.webp",
      "/images/themes/glass-garden-blue/gallery_2.webp",
      "/images/themes/glass-garden-blue/gallery_3.webp",
      "/images/themes/glass-garden-blue/gallery_4.webp",
      "/images/themes/glass-garden-blue/gallery_5.webp",
      "/images/themes/glass-garden-blue/gallery_6.webp",
      "/images/themes/glass-garden-blue/gallery_7.webp",
      "/images/themes/glass-garden-blue/gallery_8.webp"
    ]
  },
  {
    "slug": "vuonkinh-xanh-nhat",
    "name": "Vườn Kính - Xanh Nhạt",
    "description": "Nền màu nước trắng ngà điểm nhành lá bạch đàn gân vàng, hai tên trong khung kính vòm và tấm kính lớn ôm trọn nội dung; tông xanh rêu nhạt thanh nhã, nhẹ nhàng kiểu khu vườn lá xanh.",
    "thumbnail": "/images/template-previews/listing/glass_garden_light_green.webp",
    "preview": "/images/template-previews/full/glass_garden_light_green.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#2e5a36",
      "accent": "#8bc34a",
      "background": "#f6faf6"
    },
    "tags": [
      "Lãng mạn",
      "Sân vườn",
      "Hoa lá",
      "Lá",
      "Kính"
    ],
    "colors": [
      "Xanh lá"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-10-25T15:00:12.021727+00:00",
    "jsFile": "glass-garden-light-green-template-BCq5SWIl.js",
    "exportName": "GlassGardenLightGreenTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "glass-garden-light-green-BcH6nKTP.css"
    ],
    "defaultImages": [
      "/images/themes/glass-garden-light-green/gallery_1.webp",
      "/images/themes/glass-garden-light-green/gallery_2.webp",
      "/images/themes/glass-garden-light-green/gallery_3.webp",
      "/images/themes/glass-garden-light-green/gallery_4.webp",
      "/images/themes/glass-garden-light-green/gallery_5.webp",
      "/images/themes/glass-garden-light-green/gallery_6.webp",
      "/images/themes/glass-garden-light-green/gallery_7.webp"
    ]
  },
  {
    "slug": "to-duyen-hong",
    "name": "Tơ Duyên - Hồng",
    "description": "Hoa sen hồng phớt nở trên nền giấy trắng tinh, dải lụa hồng mềm mại uốn quanh từng phần nội dung cùng những nét cong mảnh như sợi tơ; chữ hồng phấn, bố cục so le trái phải, gợi vẻ dịu dàng và tinh khôi.",
    "thumbnail": "/images/template-previews/listing/silk_ribbon_pink.webp",
    "preview": "/images/template-previews/full/silk_ribbon_pink.webp",
    "category": "minimal",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#c25975",
      "accent": "#f48fb1",
      "background": "#fff8fa"
    },
    "tags": [
      "Tối giản",
      "Hoa lá",
      "Hoa sen",
      "Lụa",
      "Dịu dàng"
    ],
    "colors": [
      "Hồng",
      "Trắng"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-09-21T01:53:56.245003+00:00",
    "jsFile": "silk-ribbon-pink-template-Xh4a5nS3.js",
    "exportName": "SilkRibbonPinkTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "silk-ribbon-pink-DNFXgzcm.css"
    ],
    "defaultImages": [
      "/images/themes/silk-ribbon-pink/groom.webp",
      "/images/themes/silk-ribbon-pink/bride.webp",
      "/images/themes/silk-ribbon-pink/gallery_1.webp",
      "/images/themes/silk-ribbon-pink/gallery_2.webp",
      "/images/themes/silk-ribbon-pink/gallery_3.webp",
      "/images/themes/silk-ribbon-pink/gallery_4.webp",
      "/images/themes/silk-ribbon-pink/gallery_5.webp",
      "/images/themes/silk-ribbon-pink/gallery_6.webp",
      "/images/themes/silk-ribbon-pink/gallery_7.webp",
      "/images/themes/silk-ribbon-pink/gallery_8.webp"
    ]
  },
  {
    "slug": "hoa-thuy-tinh-do",
    "name": "Hoa Thuỷ Tinh - Đỏ",
    "description": "Hoa văn pha lê tinh xảo và khung hoa đỏ ánh vàng trên nền kem ấm, điểm tông đỏ thắm sang trọng; cảm giác châu Âu thanh lịch, ấm áp và rực rỡ.",
    "thumbnail": "/images/template-previews/listing/crystal_floral_red.webp",
    "preview": "/images/template-previews/full/crystal_floral_red.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#790606",
      "accent": "#d4af37",
      "background": "#fff7eb"
    },
    "tags": [
      "Sang trọng",
      "Hoa lá",
      "Hoa pha lê",
      "Châu Âu",
      "Thanh lịch"
    ],
    "colors": [
      "Đỏ"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-08-30T00:59:51.371445+00:00",
    "jsFile": "crystal-floral-red-template-BBCsTO-M.js",
    "exportName": "CrystalFloralRedTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "crystal-floral-red-DXFbMamh.css"
    ],
    "defaultImages": [
      "/images/themes/crystal-floral-red/gallery_1.webp",
      "/images/themes/crystal-floral-red/gallery_2.webp",
      "/images/themes/crystal-floral-red/gallery_3.webp",
      "/images/themes/crystal-floral-red/gallery_4.webp",
      "/images/themes/crystal-floral-red/gallery_5.webp",
      "/images/themes/crystal-floral-red/gallery_6.webp",
      "/images/themes/crystal-floral-red/gallery_7.webp"
    ]
  },
  {
    "slug": "mahal-vang",
    "name": "Mahal - Vàng",
    "description": "Cung điện sa thạch Rajasthan soi bóng bên hồ, voi trang trí lễ hội và giàn hoa giấy đỏ hồng buông dọc hai mép thiệp; khung vòm vàng kim cùng dải hoa văn tinh xảo trên nền kem ấm, gợi vẻ hoàng gia lộng lẫy của một đám cưới Ấn Độ.",
    "thumbnail": "/images/template-previews/listing/mahal_gold.webp",
    "preview": "/images/template-previews/full/mahal_gold.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#8c6d23",
      "accent": "#d4af37",
      "background": "#fdfbf5"
    },
    "tags": [
      "Sang trọng",
      "Lâu đài",
      "Hoa lá",
      "Cung điện",
      "Ấn Độ",
      "Hoa giấy",
      "Hoàng gia"
    ],
    "colors": [
      "Vàng",
      "Đỏ"
    ],
    "badges": [
      "Hot",
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 10,
    "isHot": true,
    "isNew": true,
    "releasedAt": "2026-08-29T14:48:47.8115+00:00",
    "jsFile": "mahal-gold-template-D6uo3jGZ.js",
    "exportName": "MahalGoldTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "mahal-gold-QqtxX6xO.css"
    ],
    "defaultImages": [
      "/images/themes/mahal-gold/gallery_1.webp",
      "/images/themes/mahal-gold/gallery_2.webp",
      "/images/themes/mahal-gold/gallery_3.webp",
      "/images/themes/mahal-gold/gallery_4.webp",
      "/images/themes/mahal-gold/gallery_5.webp",
      "/images/themes/mahal-gold/gallery_6.webp",
      "/images/themes/mahal-gold/gallery_7.webp",
      "/images/themes/mahal-gold/gallery_8.webp",
      "/images/themes/mahal-gold/gallery_9.webp"
    ]
  },
  {
    "slug": "to-duyen-xanh",
    "name": "Tơ Duyên - Xanh",
    "description": "Hoa rum trắng nở trên nền giấy trắng tinh, dải lụa xanh rêu mềm mại uốn quanh từng phần nội dung cùng những nét cong mảnh như sợi tơ; chữ xanh ô liu, bố cục so le trái phải, gợi vẻ tinh giản và thanh lịch.",
    "thumbnail": "/images/template-previews/listing/silk_ribbon_green.webp",
    "preview": "/images/template-previews/full/silk_ribbon_green.webp",
    "category": "minimal",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#2e5a36",
      "accent": "#8bc34a",
      "background": "#f6faf6"
    },
    "tags": [
      "Tối giản",
      "Hoa lá",
      "Hoa rum",
      "Lụa",
      "Thanh lịch"
    ],
    "colors": [
      "Xanh lá",
      "Trắng"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-09-20T16:17:46.9372+00:00",
    "jsFile": "silk-ribbon-green-template-CwUNVwg7.js",
    "exportName": "SilkRibbonGreenTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "silk-ribbon-green-CNzTszbJ.css"
    ],
    "defaultImages": [
      "/images/themes/silk-ribbon-green/groom.jpg",
      "/images/themes/silk-ribbon-green/bride.jpg",
      "/images/themes/silk-ribbon-green/gallery_1.webp",
      "/images/themes/silk-ribbon-green/gallery_2.webp",
      "/images/themes/silk-ribbon-green/gallery_3.webp",
      "/images/themes/silk-ribbon-green/gallery_4.webp",
      "/images/themes/silk-ribbon-green/gallery_5.webp",
      "/images/themes/silk-ribbon-green/gallery_6.webp",
      "/images/themes/silk-ribbon-green/gallery_7.webp"
    ]
  },
  {
    "slug": "hoang-kim-ii-tim",
    "name": "Hoàng Kim II - Tím",
    "description": "Nền tím hoàng gia với khung vàng kim và hoa mẫu đơn tím sang trọng",
    "thumbnail": "/images/template-previews/listing/royal_v2_purple.webp",
    "preview": "/images/template-previews/full/royal_v2_purple.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#432a5c",
      "accent": "#bda3d6",
      "background": "#f9f6fc"
    },
    "tags": [
      "Sang trọng",
      "Mạ vàng",
      "Hoa lá",
      "Hoa mẫu đơn"
    ],
    "colors": [
      "Tím"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-08-29T18:48:00.681354+00:00",
    "jsFile": "royal-v2-purple-template-CKCgA4Gi.js",
    "exportName": "RoyalV2PurpleTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "royal-v2-purple-BvQQ-E4X.css"
    ],
    "defaultImages": [
      "/images/themes/royal-v2-purple/gallery_1.webp",
      "/images/themes/royal-v2-purple/gallery_2.webp",
      "/images/themes/royal-v2-purple/gallery_3.webp",
      "/images/themes/royal-v2-purple/gallery_4.webp",
      "/images/themes/royal-v2-purple/gallery_5.webp",
      "/images/themes/royal-v2-purple/gallery_6.webp"
    ]
  },
  {
    "slug": "bach-su-nau",
    "name": "Bạch Sứ - Nâu",
    "description": "Hoa văn vàng nâu vẽ nét trên nền sứ kem, khung vòm cổ điển và khối lịch cưới vàng đồng ấm",
    "thumbnail": "/images/template-previews/listing/porcelain_brown.webp",
    "preview": "/images/template-previews/full/porcelain_brown.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#5c4033",
      "accent": "#c5a165",
      "background": "#fbf8f3"
    },
    "tags": [
      "Sang trọng",
      "Hoa lá",
      "Hoa văn vàng",
      "Nâu kem",
      "Cổ điển"
    ],
    "colors": [
      "Nâu",
      "Vàng",
      "Trắng"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-08-30T03:29:10.654217+00:00",
    "jsFile": "porcelain-brown-template-C5RpX5LW.js",
    "exportName": "PorcelainBrownTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "porcelain-blue-ZTccF2eh.css"
    ],
    "defaultImages": [
      "/images/themes/porcelain-brown/gallery_1.webp",
      "/images/themes/porcelain-brown/gallery_2.webp",
      "/images/themes/porcelain-brown/gallery_3.webp",
      "/images/themes/porcelain-brown/gallery_4.webp",
      "/images/themes/porcelain-brown/gallery_5.webp",
      "/images/themes/porcelain-brown/gallery_6.webp"
    ]
  },
  {
    "slug": "hoa-lan-xanh-reu",
    "name": "Hoa Lan - Xanh Rêu",
    "description": "Thiệp chữ xanh rêu trên nền trắng: ảnh cưới trong khung Wedding Day, phong bì xanh rêu có ba ảnh polaroid giữa hai bó lan trắng, chữ lồng, hai nhà, lời mời, giờ ngày tiệc và âm lịch, địa điểm có nút chỉ đường, lịch tháng, timeline, dress code, đếm ngược, cụm ảnh, album trượt và lời cảm ơn.",
    "thumbnail": "/images/template-previews/listing/orchid_olive.webp",
    "preview": "/images/template-previews/full/orchid_olive.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#2e5a36",
      "accent": "#8bc34a",
      "background": "#f6faf6"
    },
    "tags": [
      "Có ảnh",
      "Hiện đại",
      "Hoa lá",
      "Hoa lan",
      "Phong bì"
    ],
    "colors": [
      "Xanh lá"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 2,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-10-02T07:07:34.125132+00:00",
    "jsFile": "orchid-olive-template-gWm8XaLC.js",
    "exportName": "OrchidOliveTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "orchid-olive-CR28lvbA.css"
    ],
    "defaultImages": [
      "/images/themes/orchid-olive/hero-bg.webp",
      "/images/themes/boho-floral-green/gallery_2.webp",
      "/images/themes/boho-floral-green/gallery_4.webp",
      "/images/themes/boho-floral-green/gallery_7.webp",
      "/images/themes/boho-floral-green/gallery_6.webp",
      "/images/themes/boho-floral-green/gallery_8.webp",
      "/images/themes/boho-floral-green/gallery_5.webp",
      "/images/themes/boho-floral-green/gallery_1.webp",
      "/images/themes/boho-floral-green/gallery_3.webp"
    ]
  },
  {
    "slug": "bach-su-do",
    "name": "Bạch Sứ - Đỏ",
    "description": "Hoa văn đỏ vẽ nét trên nền sứ kem, khung viền chạm cổ điển và khối lịch cưới đỏ trầm",
    "thumbnail": "/images/template-previews/listing/porcelain_red.webp",
    "preview": "/images/template-previews/full/porcelain_red.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#790606",
      "accent": "#d4af37",
      "background": "#fff7eb"
    },
    "tags": [
      "Sang trọng",
      "Hoa lá",
      "Hoa văn đỏ",
      "Trắng đỏ",
      "Cổ điển"
    ],
    "colors": [
      "Đỏ",
      "Trắng"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 0,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-08-30T02:42:47.947724+00:00",
    "jsFile": "porcelain-red-template-BXLEUr0H.js",
    "exportName": "PorcelainRedTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "porcelain-blue-ZTccF2eh.css"
    ],
    "defaultImages": [
      "/images/themes/porcelain-red/gallery_1.webp",
      "/images/themes/porcelain-red/gallery_2.webp",
      "/images/themes/porcelain-red/gallery_3.webp",
      "/images/themes/porcelain-red/gallery_4.webp",
      "/images/themes/porcelain-red/gallery_5.webp",
      "/images/themes/porcelain-red/gallery_6.webp",
      "/images/themes/porcelain-red/gallery_7.webp"
    ]
  },
  {
    "slug": "hai-au-lam",
    "name": "Hải Âu - Lam",
    "description": "Thiệp xanh lam navy chủ đề biển trên nền giấy: tên cô dâu chú rể chữ hoa lớn trên ảnh cưới, Save the date, lịch cưới trên nền lam, hai ảnh polaroid, lịch trình có biểu tượng, tranh sóng biển và hải âu, album ảnh.",
    "thumbnail": "/images/template-previews/listing/seagull_blue.webp",
    "preview": "/images/template-previews/full/seagull_blue.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#1e4b7a",
      "accent": "#64b5f6",
      "background": "#f5f9fd"
    },
    "tags": [
      "Hiện đại",
      "Có ảnh",
      "Hoa lá",
      "Biển",
      "Polaroid",
      "Nền giấy"
    ],
    "colors": [
      "Xanh dương"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 2,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-10-01T01:07:34.750326+00:00",
    "jsFile": "seagull-blue-template-DVJ7x3kJ.js",
    "exportName": "SeagullBlueTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "seagull-blue-DwM1Z_TG.css"
    ],
    "defaultImages": [
      "/images/themes/crystal-floral-blue/gallery_1.webp",
      "/images/themes/crystal-floral-blue/gallery_4.webp",
      "/images/themes/crystal-floral-blue/gallery_3.webp",
      "/images/themes/crystal-floral-blue/gallery_8.webp",
      "/images/themes/crystal-floral-blue/gallery_6.webp",
      "/images/themes/crystal-floral-blue/gallery_5.webp",
      "/images/themes/crystal-floral-blue/gallery_7.webp"
    ]
  },
  {
    "slug": "hoa-huong-duong",
    "name": "Hoa Hướng Dương",
    "description": "Hoa hướng dương vẽ màu nước trên nền kem ấm, tiêu đề tông hổ phách và chữ xanh ô liu, rực rỡ mà vẫn dịu mắt",
    "thumbnail": "/images/template-previews/listing/sunflower_yellow.webp",
    "preview": "/images/template-previews/full/sunflower_yellow.webp",
    "category": "vintage",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#8c6d23",
      "accent": "#d4af37",
      "background": "#fdfbf5"
    },
    "tags": [
      "Hoa lá",
      "Sân vườn",
      "Hướng dương",
      "Màu nước",
      "Ấm áp"
    ],
    "colors": [
      "Vàng"
    ],
    "badges": [
      "Hot",
      "Mới"
    ],
    "occasion": "wedding",
    "trendingScore": 10,
    "isHot": true,
    "isNew": true,
    "releasedAt": "2026-08-29T16:15:38.399287+00:00",
    "jsFile": "sunflower-yellow-template-CM9VwAfr.js",
    "exportName": "SunflowerYellowTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "sunflower-yellow-DyWzMzy-.css"
    ],
    "defaultImages": [
      "/images/themes/sunflower/gallery_1.webp",
      "/images/themes/sunflower/gallery_2.webp",
      "/images/themes/sunflower/gallery_3.webp",
      "/images/themes/sunflower/gallery_4.webp",
      "/images/themes/sunflower/gallery_5.webp",
      "/images/themes/sunflower/gallery_6.webp"
    ]
  },
  {
    "slug": "sinh-nhat-phieu-luu-xanh",
    "name": "Phiêu Lưu - Xanh",
    "description": "Giấy kem trong khung viền xanh bo tròn, tranh màu nước khinh khí cầu, máy bay giấy, biển chỉ đường và xe jeep; tinh nghịch cho tiệc thôi nôi và sinh nhật bé trai.",
    "thumbnail": "/images/template-previews/listing/sinh-nhat-phieu-luu-xanh.webp",
    "preview": "/images/template-previews/full/sinh-nhat-phieu-luu-xanh.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#1e4b7a",
      "accent": "#64b5f6",
      "background": "#f5f9fd"
    },
    "tags": [
      "Dễ thương",
      "Sân vườn",
      "Phiêu lưu",
      "Thôi nôi",
      "Bé trai"
    ],
    "colors": [
      "Xanh dương"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "birthday",
    "trendingScore": 0,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-09-29T09:58:56.208167+00:00",
    "jsFile": "adventure-blue-template-7f5jUkGV.js",
    "exportName": "AdventureBlueTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "adventure-blue-cG5rElMb.css"
    ],
    "defaultImages": [
      "/images/themes/sinh-nhat-phieu-luu-xanh/demo-baby.webp",
      "/images/themes/sinh-nhat-phieu-luu-xanh/demo-baby-album-1.webp",
      "/images/themes/sinh-nhat-phieu-luu-xanh/demo-baby-album-2.webp",
      "/images/themes/sinh-nhat-phieu-luu-xanh/demo-baby-album-3.webp",
      "/images/themes/sinh-nhat-phieu-luu-xanh/demo-baby-album-4.webp",
      "/images/themes/sinh-nhat-phieu-luu-xanh/demo-baby-album-5.webp"
    ]
  },
  {
    "slug": "sinh-nhat-polaroid-kem",
    "name": "Polaroid - Kem",
    "description": "Ảnh nhân vật chính trong khung polaroid dán băng dính, cờ đuôi nheo và máy ảnh trên giấy kem lấm tấm; lịch, bản đồ, đếm ngược, album ghép và hộp quà — nhẹ nhàng cho tiệc sinh nhật tuổi mới.",
    "thumbnail": "/images/template-previews/listing/sinh-nhat-polaroid-kem.webp",
    "preview": "/images/template-previews/full/sinh-nhat-polaroid-kem.webp",
    "category": "minimal",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#4a403a",
      "accent": "#c5a165",
      "background": "#ffffff"
    },
    "tags": [
      "Tối giản",
      "Có ảnh",
      "Sinh nhật",
      "Polaroid",
      "Kem"
    ],
    "colors": [
      "Trắng"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "birthday",
    "trendingScore": 0,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-09-30T12:30:55.143575+00:00",
    "jsFile": "polaroid-cream-template-BSd7XABg.js",
    "exportName": "PolaroidCreamTemplate",
    "cssFiles": [
      "polaroid-cream-Be0Hl2Ga.css"
    ],
    "defaultImages": [
      "/images/themes/sinh-nhat-polaroid-kem/demo-hero.webp",
      "/images/themes/sinh-nhat-polaroid-kem/demo-album-1.webp",
      "/images/themes/sinh-nhat-polaroid-kem/demo-album-2.webp",
      "/images/themes/sinh-nhat-polaroid-kem/demo-album-3.webp",
      "/images/themes/sinh-nhat-polaroid-kem/demo-album-4.webp",
      "/images/themes/sinh-nhat-polaroid-kem/demo-album-5.webp"
    ]
  },
  {
    "slug": "sinh-nhat-khat-vong-xanh",
    "name": "Khát Vọng - Xanh",
    "description": "Bìa xanh đêm có gáy \"Hành trình khát vọng\", ảnh nhân vật chính trong khung lục giác kèm ô tuổi; bảng giờ khai tiệc, đếm ngược, lịch, bản đồ, album xếp lớp, phong bao mừng và câu hỏi thường gặp — cá tính cho tuổi mới.",
    "thumbnail": "/images/template-previews/listing/sinh-nhat-khat-vong-xanh.webp",
    "preview": "/images/template-previews/full/sinh-nhat-khat-vong-xanh.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#1e4b7a",
      "accent": "#64b5f6",
      "background": "#f5f9fd"
    },
    "tags": [
      "Hiện đại",
      "Có ảnh",
      "Sinh nhật"
    ],
    "colors": [
      "Xanh dương",
      "Xanh lá"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "birthday",
    "trendingScore": 0,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-09-30T15:58:09.820618+00:00",
    "jsFile": "aspiration-blue-template-B7U7z5Zt.js",
    "exportName": "AspirationBlueTemplate",
    "cssFiles": [
      "aspiration-blue-CPSw47Qv.css"
    ],
    "defaultImages": [
      "/images/template-previews/full/sinh-nhat-khat-vong-xanh.webp"
    ]
  },
  {
    "slug": "sinh-nhat-cong-chua-hong",
    "name": "Công Chúa - Hồng",
    "description": "Giấy hồng phấn trong khung viền bo tròn, tranh màu nước vương miện, lâu đài, xe bí ngô và hoa anh đào; ngọt ngào cho tiệc thôi nôi và sinh nhật bé gái.",
    "thumbnail": "/images/template-previews/listing/sinh-nhat-cong-chua-hong.webp",
    "preview": "/images/template-previews/full/sinh-nhat-cong-chua-hong.webp",
    "category": "minimal",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#c25975",
      "accent": "#f48fb1",
      "background": "#fff8fa"
    },
    "tags": [
      "Tối giản",
      "Hoa lá",
      "Công chúa",
      "Thôi nôi",
      "Bé gái"
    ],
    "colors": [
      "Hồng"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "birthday",
    "trendingScore": 0,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-09-28T14:55:29.512871+00:00",
    "jsFile": "princess-pink-template-CSUPsKR0.js",
    "exportName": "PrincessPinkTemplate",
    "cssFiles": [
      "bank-gift-display-CaEfMy_m.css",
      "princess-pink-Zdeb4vrF.css"
    ],
    "defaultImages": [
      "/images/themes/sinh-nhat-cong-chua-hong/demo-baby-hero.webp",
      "/images/themes/sinh-nhat-cong-chua-hong/demo-baby-album-1.webp",
      "/images/themes/sinh-nhat-cong-chua-hong/demo-baby-album-2.webp",
      "/images/themes/sinh-nhat-cong-chua-hong/demo-baby-album-3.webp",
      "/images/themes/sinh-nhat-cong-chua-hong/demo-baby-album-4.webp",
      "/images/themes/sinh-nhat-cong-chua-hong/demo-baby-album-5.webp"
    ]
  },
  {
    "slug": "sinh-nhat-ruby-do",
    "name": "Ruby - Đỏ",
    "description": "Giấy kem điểm đỏ ruby, nơ satin, vương miện, chùm bóng bay và bánh kem số 1 quanh ảnh bé; lịch, bản đồ, đếm ngược, album và hộp quà — rực rỡ cho ngày thôi nôi.",
    "thumbnail": "/images/template-previews/listing/sinh-nhat-ruby-do.webp",
    "preview": "/images/template-previews/full/sinh-nhat-ruby-do.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#790606",
      "accent": "#d4af37",
      "background": "#fff7eb"
    },
    "tags": [
      "Dễ thương",
      "Có ảnh",
      "Thôi nôi"
    ],
    "colors": [
      "Đỏ"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "birthday",
    "trendingScore": 0,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-10-22T15:36:46.008611+00:00",
    "jsFile": "boutique-ruby-template-B-1XidTY.js",
    "exportName": "BoutiqueRubyTemplate",
    "cssFiles": [
      "boutique-ruby-DWkm9tHB.css"
    ],
    "defaultImages": [
      "/images/template-previews/full/sinh-nhat-ruby-do.webp"
    ]
  },
  {
    "slug": "tot-nghiep-suong-xanh",
    "name": "Sương Xanh",
    "description": "Giấy màu nước xanh sương, sticker mũ cử nhân và máy ảnh quanh ảnh tân cử nhân; lịch, bản đồ, đếm ngược, album \"Khoảnh khắc thanh xuân\", sổ lưu bút và xác nhận tham dự — trong trẻo cho ngày tốt nghiệp.",
    "thumbnail": "/images/template-previews/listing/tot-nghiep-suong-xanh.webp",
    "preview": "/images/template-previews/full/tot-nghiep-suong-xanh.webp",
    "category": "vintage",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#1e4b7a",
      "accent": "#64b5f6",
      "background": "#f5f9fd"
    },
    "tags": [
      "Hiện đại",
      "Có ảnh",
      "Tốt nghiệp",
      "Màu nước"
    ],
    "colors": [
      "Xanh dương"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "graduation",
    "trendingScore": 0,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-10-22T16:06:10.771018+00:00",
    "jsFile": "sky-blue-mist-template-D1vYdvon.js",
    "exportName": "SkyBlueMistTemplate",
    "cssFiles": [
      "sky-blue-mist-s_Hc-9A4.css"
    ],
    "defaultImages": [
      "/images/themes/tot-nghiep-suong-xanh/demo-hero.webp",
      "/images/themes/tot-nghiep-suong-xanh/demo-album-1.webp",
      "/images/themes/tot-nghiep-suong-xanh/demo-album-2.webp",
      "/images/themes/tot-nghiep-suong-xanh/demo-album-3.webp",
      "/images/themes/tot-nghiep-suong-xanh/demo-album-4.webp",
      "/images/themes/tot-nghiep-suong-xanh/demo-album-5.webp"
    ]
  },
  {
    "slug": "su-kien-no-do",
    "name": "Nơ Đỏ",
    "description": "Nơ satin đỏ vắt ngang tờ thiệp kem, tên sự kiện tô gradient đỏ và ảnh khung vòm viền vàng; lịch, bản đồ, lịch trình, đếm ngược, album, lời chúc và xác nhận tham dự — cho tiệc tân gia, khai trương, tất niên.",
    "thumbnail": "/images/template-previews/listing/su-kien-no-do.webp",
    "preview": "/images/template-previews/full/su-kien-no-do.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#790606",
      "accent": "#d4af37",
      "background": "#fff7eb"
    },
    "tags": [
      "Hiện đại",
      "Có ảnh",
      "Sự kiện",
      "Tân gia"
    ],
    "colors": [
      "Đỏ"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "event",
    "trendingScore": 0,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-10-23T05:37:41.570261+00:00",
    "jsFile": "modern-ribbon-red-template-7gh5NTwN.js",
    "exportName": "ModernRibbonRedTemplate",
    "cssFiles": [
      "modern-ribbon-red-BglC3Fjp.css"
    ],
    "defaultImages": [
      "/images/themes/su-kien-no-do/demo-hero.webp",
      "/images/themes/su-kien-no-do/demo-album-1.webp",
      "/images/themes/su-kien-no-do/demo-album-2.webp",
      "/images/themes/su-kien-no-do/demo-album-3.webp",
      "/images/themes/su-kien-no-do/demo-album-4.webp",
      "/images/themes/su-kien-no-do/demo-album-5.webp"
    ]
  },
  {
    "slug": "su-kien-champagne-vang",
    "name": "Champagne Vàng",
    "description": "Giấy ngà loang màu nước vàng trong viền kép vàng đồng, tên sự kiện tô gradient champagne và ảnh khung vàng lệch; lịch, bản đồ, lịch trình, đếm ngược, album, lời chúc và xác nhận tham dự — cho tiệc tất niên, kỷ niệm thành lập, tri ân khách hàng.",
    "thumbnail": "/images/template-previews/listing/su-kien-champagne-vang.webp",
    "preview": "/images/template-previews/full/su-kien-champagne-vang.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "defaultColors": {
      "primary": "#8c6d23",
      "accent": "#d4af37",
      "background": "#fdfbf5"
    },
    "tags": [
      "Hiện đại",
      "Có ảnh",
      "Sự kiện",
      "Tất niên"
    ],
    "colors": [
      "Vàng"
    ],
    "badges": [
      "Mới"
    ],
    "occasion": "event",
    "trendingScore": 0,
    "isHot": false,
    "isNew": true,
    "releasedAt": "2026-10-25T16:42:58.408081+00:00",
    "jsFile": "champagne-gold-template-CVWM7o1g.js",
    "exportName": "ChampagneGoldTemplate",
    "cssFiles": [
      "champagne-gold-DhFfNIJK.css"
    ],
    "defaultImages": [
      "/images/themes/su-kien-champagne-vang/demo-hero.webp",
      "/images/themes/su-kien-champagne-vang/demo-album-1.webp",
      "/images/themes/su-kien-champagne-vang/demo-album-2.webp",
      "/images/themes/su-kien-champagne-vang/demo-album-3.webp",
      "/images/themes/su-kien-champagne-vang/demo-album-4.webp",
      "/images/themes/su-kien-champagne-vang/demo-album-5.webp"
    ]
  }
];

export const THIEPONLINE_BY_SLUG: Record<string, ThiepOnlineCatalogItem> = Object.fromEntries(
  THIEPONLINE_CATALOG.map((item) => [item.slug, item])
);
