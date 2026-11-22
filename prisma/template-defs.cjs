/**
 * Định nghĩa template dùng chung cho cả hai seeder:
 *   - `prisma/seed.ts`      (npm run db:seed)
 *   - `scripts/seed-docker.cjs` (chạy khi start container)
 *
 * Bao gồm:
 *   - 2 mẫu có sẵn trên Hero Banner: `classic-elegance`, `modern-cinematic`
 *   - Toàn bộ 123 mẫu thiệp từ thieponline.app
 */
const TEMPLATE_DEFS = [
  {
    "name": "Classic Elegance",
    "slug": "classic-elegance",
    "description": "Thiệp cưới mang phong cách truyền thống Việt Nam, tông màu đỏ burgundy & vàng gold thanh lịch.",
    "thumbnail": "/templates/template1-preview.png",
    "category": "classic",
    "isPremium": false,
    "minPlan": "FREE",
    "price": 500000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "quote",
        "gallery",
        "location",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
      "defaultColors": {
        "primary": "#800020",
        "accent": "#d4a853",
        "background": "#faf8f5"
      },
      "tags": [
        "Truyền thống",
        "Chữ Hỷ",
        "Sang trọng",
        "Cổ điển"
      ],
      "colors": [
        "Đỏ",
        "Vàng"
      ],
      "badges": [
        "Hot",
        "Mẫu Gốc"
      ],
      "occasion": "wedding",
      "trendingScore": 20,
      "isHot": true,
      "isNew": false,
      "isFeatured": true
    }
  },
  {
    "name": "Modern Cinematic",
    "slug": "modern-cinematic",
    "description": "Thiệp cưới cuộn 3D hiện đại, hiệu ứng điện ảnh và kể chuyện tinh tế.",
    "thumbnail": "/templates/template2-preview.png",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 1000000,
    "config": {
      "sections": [
        "hero",
        "story",
        "journey",
        "invitation",
        "mousetrail",
        "carousel",
        "rsvp"
      ],
      "defaultColors": {
        "primary": "#111111",
        "accent": "#f5f1ea",
        "background": "#000000"
      },
      "tags": [
        "Hiện đại",
        "Có ảnh",
        "Tối giản",
        "Lãng mạn"
      ],
      "colors": [
        "Trắng",
        "Vàng"
      ],
      "badges": [
        "Hot",
        "Mẫu Gốc"
      ],
      "occasion": "wedding",
      "trendingScore": 19,
      "isHot": true,
      "isNew": false,
      "isFeatured": true
    }
  },
  {
    "name": "Minimalism - Đỏ Đậm",
    "slug": "minimalism-do-dam",
    "description": "Tối giản sang trọng với nền kem, tông đỏ đô, hoa mẫu đơn và dấu sáp trái tim",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/minimalism_darkred.webp",
    "category": "minimal",
    "isPremium": false,
    "minPlan": "FREE",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-26T06:45:43.930179+00:00"
    }
  },
  {
    "name": "Mẫu Đơn - Đỏ",
    "slug": "mau-don-do",
    "description": "Nền giấy thạch cao trắng, chữ đỏ rượu, hoa mẫu đơn đỏ có bướm đậu, phong bì đỏ kẹp lịch tháng trên giấy xé, cô dâu chú rể trên nền thạch cao tối, timeline biểu tượng nét đỏ và đồng hồ đếm ngược trên ảnh cưới",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/peony_red.webp",
    "category": "modern",
    "isPremium": false,
    "minPlan": "FREE",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-20T14:47:25.641505+00:00"
    }
  },
  {
    "name": "Ngọc Trai - Be",
    "slug": "ngoc-trai-be",
    "description": "Nền lụa trắng ngọc trai, chữ lồng tên trong vòng lá vàng, thẻ mời viền lượn sóng có hoa lan trắng, lưới ảnh kẹp thẻ Save the date, ảnh polaroid Love Forever, timeline nửa ảnh nửa nền be và album Endless Romance",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/pearl_satin_beige.webp",
    "category": "modern",
    "isPremium": false,
    "minPlan": "FREE",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-18T17:02:39.776864+00:00"
    }
  },
  {
    "name": "Minimalism - Nâu",
    "slug": "minimalism-nau",
    "description": "Tối giản thanh lịch với nền kem trắng và sắc nâu trầm ấm áp",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/minimalism_brown.webp",
    "category": "minimal",
    "isPremium": false,
    "minPlan": "FREE",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-25T02:33:14.744271+00:00"
    }
  },
  {
    "name": "Tơ Duyên - Tím",
    "slug": "to-duyen-tim",
    "description": "Hoa sen tím tử đinh hương nở trên nền giấy trắng tinh, dải lụa tím mềm mại uốn quanh từng phần nội dung cùng những nét cong mảnh như sợi tơ; chữ tím amethyst, bố cục so le trái phải, gợi vẻ thanh lịch và trầm tĩnh.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/silk_ribbon_purple.webp",
    "category": "minimal",
    "isPremium": false,
    "minPlan": "FREE",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-09-21T06:20:07.368958+00:00"
    }
  },
  {
    "name": "Song Hỷ - Xanh",
    "slug": "song-hy-xanh",
    "description": "Chữ Hỷ nền xanh lá, khung ảnh cung, phong bì 囍",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/song_hy_green.webp",
    "category": "classic",
    "isPremium": false,
    "minPlan": "FREE",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-25T16:22:02.154984+00:00"
    }
  },
  {
    "name": "Hoa Khô V2 - Lam",
    "slug": "hoa-kho-v2-lam",
    "description": "Hoa khô vẽ màu nước tông lam và vàng đất trên nền giấy kem, điểm những cánh bướm nhạt xuyên suốt tấm thiệp.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/hoa_kho_v2_blue.webp",
    "category": "vintage",
    "isPremium": false,
    "minPlan": "FREE",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-03T12:46:15.590409+00:00"
    }
  },
  {
    "name": "Long Phụng V3 - Đỏ",
    "slug": "long-phung-v3-do",
    "description": "Nền đỏ thẫm cổ điển, khung ảnh vòm rồng phượng và họa tiết chim én tinh tế",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/dragon_phoenix_v3_red.webp",
    "category": "classic",
    "isPremium": false,
    "minPlan": "FREE",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-24T18:41:29.839079+00:00"
    }
  },
  {
    "name": "Florence - Nâu",
    "slug": "florence-nau",
    "description": "Tranh màu nước vẽ thành Florence, mái vòm gạch đỏ của nhà thờ Duomo soi bóng xuống sông Arno, cầu đá phủ hoa hồng và hàng bách Tuscany trong sắc nâu ấm",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/florence_brown.webp",
    "category": "vintage",
    "isPremium": false,
    "minPlan": "FREE",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-07T01:14:34.592432+00:00"
    }
  },
  {
    "name": "Hoa Mộc - Xanh",
    "slug": "hoa-moc-xanh",
    "description": "Hoa mộc watercolor với tông xanh lá thanh nhã trên nền kem trắng",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/boho_floral_green.webp",
    "category": "vintage",
    "isPremium": false,
    "minPlan": "FREE",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-23T15:24:07.864218+00:00"
    }
  },
  {
    "name": "Hạc Sen - Đỏ",
    "slug": "hac-sen-do",
    "description": "Thiệp nền giấy chữ đỏ đô: ảnh cưới chuyển dần sang đỏ, đôi hạc, hoa sen và chữ Hỷ, khối \"Câu chuyện chúng mình\", lịch Save the date và lịch trình có biểu tượng — trang trọng và ấm áp.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/crane_lotus_red.webp",
    "category": "classic",
    "isPremium": false,
    "minPlan": "FREE",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-09-30T09:20:17.388121+00:00"
    }
  },
  {
    "name": "Minimalism - Xanh",
    "slug": "minimalism-xanh",
    "description": "Tối giản thanh lịch với nền giấy trắng và sắc xanh lá cây thảo mộc",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/minimalism_green.webp",
    "category": "minimal",
    "isPremium": false,
    "minPlan": "FREE",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-25T04:09:53.402684+00:00"
    }
  },
  {
    "name": "San Miguel - Vàng",
    "slug": "san-miguel-vang",
    "description": "Tranh màu nước vẽ thị trấn thuộc địa Mexico, nhà thờ mái vòm vàng ochre, đài phun nước đá và hoa giấy hồng đổ xuống hai bên",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/san_miguel_yellow.webp",
    "category": "vintage",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-04T12:25:49.855502+00:00"
    }
  },
  {
    "name": "Song Hỷ - Đỏ",
    "slug": "song-hy-do",
    "description": "Chữ Hỷ trang trọng, khung ảnh cung, phong bì 囍",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/song_hy_red.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-23T15:20:07.480805+00:00"
    }
  },
  {
    "name": "Hoàng Cung - Đỏ",
    "slug": "hoang-cung-do",
    "description": "Bìa rèm lụa và phong bì đỏ, cuộn trang để bước qua cổng cung điện, rồng phượng ánh vàng, đèn lồng và cánh hoa đào rơi, khung vòm ảnh cô dâu chú rể, đếm ngược và chuyện tình dạng dòng thời gian",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/royal_crimson_red.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-13T06:48:36.351764+00:00"
    }
  },
  {
    "name": "Neel Bagh - Lam",
    "slug": "neel-bagh-lam",
    "description": "Tranh màu nước vòm đá phủ hoa trắng xanh bên hồ, thuyền buồm và tháp chuông, các lễ in trên thẻ hình vòm viền vàng",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/neel_bagh_blue.webp",
    "category": "vintage",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-06T13:48:08.658042+00:00"
    }
  },
  {
    "name": "Vườn Kính - Hồng",
    "slug": "vuonkinh-hong",
    "description": "Nền hoa mềm mại phủ kín thiệp, hai tên trong khung kính bầu dục trong suốt và tấm kính lớn ôm trọn nội dung; tông hồng phấn trên lá hồng ánh vàng, gợi vẻ ngọt ngào, lãng mạn kiểu khu vườn mùa xuân.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/glass_garden_pink.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-25T18:32:22.63493+00:00"
    }
  },
  {
    "name": "Nhà Có Hỷ - Đỏ",
    "slug": "nha-co-hy-do",
    "description": "Thiệp đỏ son trên giấy kem dập hoa sen: hai cánh cửa hoa sen mở ra chữ Nhà có Hỷ và tranh cô dâu chú rể, hai nhà, tên cô dâu chú rể quanh trái tim, giờ ngày cưới, địa chỉ có nút chỉ đường, tranh áo dài, lịch tháng, đếm ngược, cụm ảnh hình trái tim, timeline, dress code và album ảnh.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/joyful_home_red.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-02T06:00:37.076774+00:00"
    }
  },
  {
    "name": "Vườn Kính - Xanh",
    "slug": "vuonkinh-xanh",
    "description": "Nền hoa mềm mại phủ kín thiệp, hai tên trong khung kính bầu dục trong suốt và tấm kính lớn ôm trọn nội dung; tông xanh vườn trên hoa trắng, gợi vẻ trong trẻo, lãng mạn kiểu khu vườn mùa xuân.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/glass_garden_green.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-24T19:38:34.326858+00:00"
    }
  },
  {
    "name": "Hoa Tulip - Xanh Rêu",
    "slug": "hoa-tulip-xanh-reu",
    "description": "Thiệp tulip trắng và ngọc trai trên nền lụa kem: Save the Date giữa khung hoa, hai nhà, dải xanh rêu kính mời, giờ ngày tiệc và âm lịch, địa điểm có nút chỉ đường, polaroid và lịch tháng, timeline, đếm ngược, cụm ảnh và album trượt.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/tulip_olive.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-02T04:40:11.386592+00:00"
    }
  },
  {
    "name": "Nhật Bình - Đỏ",
    "slug": "nhat-binh-do",
    "description": "Giấy kem ấm, chữ nâu cổ điển và điểm nhấn đỏ son; mây, hoa và đèn lồng có parallax. Phong bì nâu, thẻ kem, con dấu 囍 — gợi áo Nhật Bình và thiệp cổ trang hiện đại.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/nhat_binh_red.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-23T15:24:07.864218+00:00"
    }
  },
  {
    "name": "Hoa Xanh - Lam",
    "slug": "hoa-xanh-lam",
    "description": "Tranh màu nước trời xanh nhạt và hoa xanh navy, ảnh cưới trong khung hoa tròn, đồng hồ đếm ngược ô vuông xanh đậm",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/blue_flowers.webp",
    "category": "vintage",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-06T15:15:48.957302+00:00"
    }
  },
  {
    "name": "Hoa Màu - Lam",
    "slug": "hoa-mau-lam",
    "description": "Hoa thêu dân gian châu Âu rực rỡ viền quanh tấm thiệp ngà, chữ xanh than đậm điểm đỏ son; phong bao mừng cưới cùng một bộ hoa thêu, vui tươi và ấm áp như một tấm khăn tay thủ công",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/folk_floral_blue.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-26T07:52:01.403586+00:00"
    }
  },
  {
    "name": "Song Long - Đỏ",
    "slug": "song-long-do",
    "description": "Phong cách truyền thống với họa tiết rồng đôi",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/double_dragon_red.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-23T15:24:07.864218+00:00"
    }
  },
  {
    "name": "Chuyến Bay - Nâu",
    "slug": "chuyen-bay-nau",
    "description": "Thiệp chủ đề du lịch tông nâu vàng: ảnh cưới \"Getting Married!\", phong bì kẹp vé máy bay \"Our Love Flight\" và hộ chiếu, khung lời mời có huy hiệu chữ lồng, lịch cưới trên ảnh nền, lịch trình dọc, dòng thời gian chuyện tình và album ảnh.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/love_flight_brown.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-09-30T18:17:48.324813+00:00"
    }
  },
  {
    "name": "Long Phụng - Đỏ",
    "slug": "long-phung-do",
    "description": "Cổ điển với họa tiết rồng phượng truyền thống",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/dragon_phoenix_red.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-23T15:24:07.864218+00:00"
    }
  },
  {
    "name": "Anthurium - Đỏ",
    "slug": "hong-mon-do",
    "description": "Chữ đỏ rượu trên nền kem, phong bì đỏ rượu kẹp ảnh cưới giữa hoa rum trắng và bó hồng môn, trái tim ren in ngày cưới, thẻ nhung đỏ thông tin lễ cưới và tiệc cưới, đếm ngược, lịch tháng, bản đồ, dress code và lịch trình có biểu tượng",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/anthurium_red.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-18T14:10:05.55123+00:00"
    }
  },
  {
    "name": "Cẩm Tú Cầu - Tím",
    "slug": "cam-tu-cau-tim",
    "description": "Thiệp navy trên giấy trắng vân đá: thẻ Save the Date giữa hoa cẩm tú cầu tím lam, hai nhà, tên đầy đủ cô dâu chú rể, hôn lễ trong khung lượn sóng, lời mời có tên khách, giờ ngày tiệc và âm lịch, địa chỉ có nút chỉ đường, lời nhắn viết tay, lịch tháng trên ảnh cưới, đếm ngược và album hai cột.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/hydrangea_purple.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-02T05:40:36.170468+00:00"
    }
  },
  {
    "name": "Long Phụng V2 - Đỏ",
    "slug": "long-phung-v2-do",
    "description": "Cổ điển hiện đại với họa tiết rồng phượng tinh tế",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/dragon_phoenix_v2_red.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-23T15:24:07.864218+00:00"
    }
  },
  {
    "name": "Minimalism - Nâu Đậm",
    "slug": "minimalism-nau-dam",
    "description": "Tối giản trên nền giấy ngà, tông nâu đậm với hoa nâu vẽ tay và một tấm ảnh polaroid lồng trong phong bì",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/minimalism_darkbrown.webp",
    "category": "minimal",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-09-28T10:35:41.523754+00:00"
    }
  },
  {
    "name": "Song Phụng - Đỏ",
    "slug": "song-phung-do",
    "description": "Thanh lịch với họa tiết đôi phụng hoàng",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/double_phoenix_red.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-23T15:24:07.864218+00:00"
    }
  },
  {
    "name": "Cẩm Tú Cầu - Lam",
    "slug": "cam-tu-cau-lam",
    "description": "Nền giấy trắng vân với hoa cẩm tú cầu giấy nổi khối, chữ xanh tím than, ảnh cưới mép giấy xé, phong bì kẹp hai ảnh, \"Save the date\", chuyện tình dạng dòng thời gian và lịch trình bốn biểu tượng nét",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/paper_hydrangea_blue.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-18T11:14:44.202993+00:00"
    }
  },
  {
    "name": "Mai Lan - Trắng",
    "slug": "mai-lan-trang",
    "description": "Tối giản hiện đại với nền kem trắng và sắc xanh olive",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/jasmine_white.webp",
    "category": "minimal",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-23T15:24:07.864218+00:00"
    }
  },
  {
    "name": "Happy Flowers - Nâu",
    "slug": "happy-flowers-nau",
    "description": "Giấy trắng vân với lá xanh màu nước đung đưa, sóng nâu đất ngăn từng mục, tên viết tay và lịch trình trên trục xanh lá",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/happy_flowers_brown.webp",
    "category": "vintage",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-06T18:16:12.030656+00:00"
    }
  },
  {
    "name": "Thanh Diệp - Xanh",
    "slug": "thanh-diep-xanh",
    "description": "Thanh lịch với tông xanh lá thanh diệp",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/elegant_leaf_green.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-23T15:24:07.864218+00:00"
    }
  },
  {
    "name": "Thước Phim - Be",
    "slug": "thuoc-phim-be",
    "description": "Thiệp nâu be trên nền giấy hoa chìm: ảnh cưới \"We get married!\", đếm ngược và phong bì kẹp ảnh, ảnh Save the Date, ảnh polaroid cô dâu chú rể, cuộn phim và album ảnh ghép, lịch tháng cưới, lịch trình trên ảnh nền — mộc mạc và ấm áp.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/film_beige.webp",
    "category": "vintage",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-09-30T17:50:22.380699+00:00"
    }
  },
  {
    "name": "Minimalism - Đỏ",
    "slug": "minimalism-do",
    "description": "Tối giản thanh lịch với nền trắng tinh tế và sắc đỏ chủ đạo",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/minimalism_red.webp",
    "category": "minimal",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-23T15:24:07.864218+00:00"
    }
  },
  {
    "name": "Minimalism - Hồng Trà",
    "slug": "minimalism-hong-tra",
    "description": "Phong bì mauve mở ra khoe ảnh cưới, hoa hồng trà và mẫu đơn trắng kem rủ quanh từng thẻ giấy dập nổi trên nền toà lâu đài mờ — lãng mạn, trầm ấm và rất nữ tính.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/minimalism_tearose.webp",
    "category": "minimal",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-09-22T02:51:54.957455+00:00"
    }
  },
  {
    "name": "Song Long - Xanh",
    "slug": "song-long-xanh",
    "description": "Thanh lịch với tông màu xanh lá tự nhiên",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/double_dragon_green.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-23T15:24:07.864218+00:00"
    }
  },
  {
    "name": "Cổ Phục - Nâu",
    "slug": "co-phuc-nau",
    "description": "Ảnh cưới tràn khổ với tên viết tay, nền giấy thạch cao trắng, vòng hạc mây ôm ấn đỏ son in ngày cưới, thiệp mời giấy xé có góc hoa văn và ấn song hỷ, đếm ngược, ảnh cô dâu chú rể, lịch trình biểu tượng khắc nét và album ảnh ghép",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/heritage_brown.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-18T15:42:46.045979+00:00"
    }
  },
  {
    "name": "Chibi - Đỏ",
    "slug": "chibi-red",
    "description": "Dễ thương với phong cách chibi minh họa",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/chibi_red.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-23T15:24:07.864218+00:00"
    }
  },
  {
    "name": "Thư Tình - Đỏ",
    "slug": "thu-tinh-do",
    "description": "Thiệp chữ đỏ rượu trên nền màu nước hồng: chữ lồng hai tên, phong bì đỏ rượu có hai ảnh polaroid và thẻ tên giữa hoa hồng, lời mời, hai nhà, ảnh cưới lớn, giờ ngày tiệc và âm lịch, địa điểm có nút chỉ đường, lịch Save our Date, album trượt, đếm ngược và ảnh kết.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/love_letter_red.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-02T06:23:49.941193+00:00"
    }
  },
  {
    "name": "Hoa Lụa - Nâu",
    "slug": "hoa-lua-nau",
    "description": "Thiệp cưới tối giản tông ấm, nhấn vào typography và nội dung, phù hợp phong cách thanh lịch hiện đại",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/silk_flora_brown.webp",
    "category": "minimal",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-23T15:24:07.864218+00:00"
    }
  },
  {
    "name": "Ren Thêu - Trắng",
    "slug": "ren-theu-trang",
    "description": "Nền lụa đen mềm mại ôm lấy những tấm giấy trắng viền ren thêu nổi, ảnh cưới đen trắng nghiêng nhẹ trong phong bì ren, điểm thêm hoa mẫu đơn trắng và nhành khô màu be",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/applique_lace_white.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-26T13:54:47.50255+00:00"
    }
  },
  {
    "name": "Vườn Xuân - Đỏ",
    "slug": "vuon-xuan-do",
    "description": "Thiên nhiên ấm áp với sắc đỏ tươi tắn",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/spring_garden_red.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-23T15:24:07.864218+00:00"
    }
  },
  {
    "name": "Hoa Khô - Đỏ",
    "slug": "hoa-kho-do",
    "description": "Thược dược, cúc khô và lá thu vẽ màu nước tông đỏ tươi ôm lấy khung hình học mạ vàng, tên cô dâu chú rể viết tay giữa khung — rực rỡ mà vẫn mộc.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/hoa_kho_red.webp",
    "category": "vintage",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-09-22T08:05:33.382509+00:00"
    }
  },
  {
    "name": "Hoa Mộc - Nâu",
    "slug": "hoa-moc-nau",
    "description": "Hoa mộc watercolor với tông nâu ấm áp, thanh nhã",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/boho_floral_brown.webp",
    "category": "vintage",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-23T15:24:07.864218+00:00"
    }
  },
  {
    "name": "Thiên Nga - Đỏ",
    "slug": "thien-nga-do",
    "description": "Thiệp nền giấy mỹ thuật chữ đỏ đô: ảnh cưới chuyển dần sang đỏ, đôi thiên nga và hoa vẽ nét, mỗi buổi tiệc nhà trai, nhà gái một địa điểm và nút chỉ đường riêng — hiện đại và ấm cúng.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/swan_red.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-09-30T07:49:22.153521+00:00"
    }
  },
  {
    "name": "Long Phụng - Xanh",
    "slug": "long-phung-xanh",
    "description": "Cổ điển với họa tiết rồng phượng truyền thống",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/dragon_phoenix_green.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-23T15:24:07.864218+00:00"
    }
  },
  {
    "name": "Hoa Khô - Nâu Đất",
    "slug": "hoa-kho-nau-dat",
    "description": "Thược dược, cúc khô và lá thu vẽ màu nước tông gạch nung phủ quanh khung vòm giấy kem — ấm, mộc và rất boho.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/hoa_kho_terracotta.webp",
    "category": "vintage",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-09-22T04:10:05.558337+00:00"
    }
  },
  {
    "name": "Vườn Xuân - Xanh",
    "slug": "vuon-xuan-xanh",
    "description": "Thiên nhiên tươi mát với họa tiết lá cây",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/spring_garden_green.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-23T15:24:07.864218+00:00"
    }
  },
  {
    "name": "Thanh Cung - Lam",
    "slug": "thanhcung-lam",
    "description": "Cung điện mái vòm lam ngọc soi bóng giữa rặng cọ, rèm lụa buông hai bên cùng đèn lồng đồng treo lơ lửng; nền giấy ngà ấm điểm hoa nhài trắng và những đường viền vàng tinh xảo, gợi vẻ vương giả dịu dàng của một đám cưới phương Đông",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/qasr_blue.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-26T13:21:32.329978+00:00"
    }
  },
  {
    "name": "Lâu Đài - Xanh",
    "slug": "lau-dai-xanh",
    "description": "Phong cách lâu đài châu Âu phiên bản vườn xanh, biệt thự nước màu watercolor với cây cối, vòi phun và hoa nhỏ; tông xanh lá rừng trên nền trắng, cảm giác lãng mạn, gần gũi thiên nhiên.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/chateau_green.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-25T10:26:44.674472+00:00"
    }
  },
  {
    "name": "Lâu Đài Hoa - Xanh",
    "slug": "lau-dai-hoa-xanh",
    "description": "Vòm cung viền vàng giữa vườn hoa và thánh đường dưới trời xanh, khung vòm ảnh cô dâu chú rể, đếm ngược Save The Date, thẻ lễ có tranh vườn làm khung và chuyện tình dạng dòng thời gian",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/lau_dai_hoa_green.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-09T02:13:45.309105+00:00"
    }
  },
  {
    "name": "Vườn Mộng - Lam",
    "slug": "vuon-mong-lam",
    "description": "Vườn hồ thiên nga màu nước rợp cẩm tú cầu xanh lam, nền hoa lá liền mạch, khung lục giác vàng và thẻ vòm hồng phấn viền vàng",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/garden_dream_slate.webp",
    "category": "vintage",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-08T17:31:29.610806+00:00"
    }
  },
  {
    "name": "Baroque V2 - Đỏ Đậm",
    "slug": "baroque-v2-do-dam",
    "description": "Nền đỏ đậm gần đen phủ hoa văn damask, khung tranh Baroque mạ vàng ôm ảnh cưới cùng hoa mẫu đơn đỏ rượu và kem; đường viền vàng, chữ Times New Roman và Cormorant Garamond, gợi vẻ cổ điển sang trọng kiểu châu Âu.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/baroque_v2_darkred.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-08-29T16:50:27.973362+00:00"
    }
  },
  {
    "name": "Riviera - Lam",
    "slug": "riviera-lam",
    "description": "Tranh màu nước vẽ ngôi làng bên hồ dưới chân núi kiểu Riviera, tông xanh lam và những nhánh hoa nở rực, nhẹ nhàng và thơ mộng",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/riviera_blue.webp",
    "category": "vintage",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-09-30T04:57:20.771752+00:00"
    }
  },
  {
    "name": "Santorini - Lam",
    "slug": "santorini-lam",
    "description": "Tranh màu nước vẽ đảo Hy Lạp, những ngôi nhà trắng mái vòm xanh lam nối nhau xuống bậc đá, biển Aegean trong vắt và hoa giấy hồng rủ bên vách đá",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/santorini_blue.webp",
    "category": "vintage",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-26T02:13:23.701833+00:00"
    }
  },
  {
    "name": "Anh Đào - Hồng",
    "slug": "anh-dao-hong",
    "description": "Lãng mạn với sắc hồng hoa anh đào",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/cherry_blossom_pink.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-23T15:24:07.864218+00:00"
    }
  },
  {
    "name": "Minimalism - Lam Đậm",
    "slug": "minimalism-xanh-dam",
    "description": "Tối giản trên nền giấy ngà, tông xanh navy với hoa xanh vẽ tay và hai tấm ảnh polaroid",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/minimalism_darkblue.webp",
    "category": "minimal",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-09-08T01:08:22.423442+00:00"
    }
  },
  {
    "name": "Sóng Biển - Lam",
    "slug": "song-bien-lam",
    "description": "Nền giấy trắng, chữ navy và vàng đồng, khối giấy màu nước lam nối bằng mép giấy xé, phong bì navy lót tranh sóng biển kẹp hai ảnh, lịch tháng Save the Date, timeline đường cong và cụm ảnh The Album",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/ocean_wave_blue.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-21T10:14:49.375564+00:00"
    }
  },
  {
    "name": "Hoa Hồng - Đỏ Rượu",
    "slug": "hoa-hong-do-ruou",
    "description": "Hồng phấn và hồng đỏ rượu trên nền thẻ nhung kẻ chỉ vàng, tên cô dâu chú rể viết tay mạ vàng, mở ra từ chiếc phong bì đỏ rượu niêm xi vàng.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/rose_burgundy.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-09-22T17:44:17.336965+00:00"
    }
  },
  {
    "name": "Hoa Mộc - Hồng",
    "slug": "hoa-moc-hong",
    "description": "Hoa mộc watercolor với tông hồng ấm lãng mạn trên nền kem trắng",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/boho_floral_pink.webp",
    "category": "vintage",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-23T15:24:07.864218+00:00"
    }
  },
  {
    "name": "Baroque - Lam",
    "slug": "baroque-lam",
    "description": "Khung chạm rococo mạ vàng điểm xanh lam phấn nổi trên nền ngà phủ hoa văn damask; hai bên là cuộn lá acanthus và cột trụ cổ điển, khép lại bằng vòng hoa vỏ sò",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/baroque_blue.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-26T12:28:36.203879+00:00"
    }
  },
  {
    "name": "Baroque - Vàng",
    "slug": "hoang-gia-vang",
    "description": "Cảm hứng kiến trúc Baroque châu Âu: khung hoa văn mạ vàng cầu kỳ, hai cột trụ La Mã và nền damask kem; tông vàng đồng ấm điểm xanh ô-liu, gợi vẻ cổ điển xa hoa và lãng mạn.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/baroque_gold.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-25T17:18:42.023873+00:00"
    }
  },
  {
    "name": "Vân Đá - Vàng",
    "slug": "van-da-vang",
    "description": "Nền đá cẩm thạch trắng ngà vân vàng óng, những nhành lá mạ vàng vươn vào từ hai mép thiệp, ảnh cưới nghiêng nhẹ trong khung chỉ vàng mảnh và chữ serif nâu đồng sang trọng",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/marble_yellow.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-26T06:39:28.955152+00:00"
    }
  },
  {
    "name": "Hoàng Kim - Đỏ",
    "slug": "hoang-kim-do",
    "description": "Sang trọng hoàng gia với nền đỏ thẫm và điểm nhấn vàng kim",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/royal_red.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-23T15:24:07.864218+00:00"
    }
  },
  {
    "name": "Đĩa Than - Nâu",
    "slug": "dia-than-nau",
    "description": "Thiệp chữ nâu hổ phách trên nền kem: đĩa than, hai ảnh polaroid, dấu sáp vàng, phù điêu ngày cưới và tem tên giữa hoa kem, ảnh cưới lớn, hai nhà, chữ lồng, ngày giờ tiệc và âm lịch, địa điểm có nút chỉ đường, cụm bốn ảnh, timeline, dress code, đếm ngược, lịch tháng, album trượt và ảnh kết Thank You.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/vinyl_brown.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-02T06:48:05.479108+00:00"
    }
  },
  {
    "name": "Song Phụng - Xanh",
    "slug": "song-phung-xanh",
    "description": "Thanh lịch với họa tiết đôi phụng hoàng, tông xanh lá",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/double_phoenix_green.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-23T15:24:07.864218+00:00"
    }
  },
  {
    "name": "Vườn Xuân - Lam",
    "slug": "vuon-xuan-lam",
    "description": "Thiên nhiên thanh lịch với sắc xanh lam dịu mát",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/spring_garden_blue.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-23T15:24:07.864218+00:00"
    }
  },
  {
    "name": "Song Hỷ V2 - Đỏ",
    "slug": "song-hy-v2-do",
    "description": "Thiệp giấy kem chữ Hỷ, ảnh khung vòm, hoa văn sóng nước",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/song_hy_v2_red.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-02T03:44:35.392651+00:00"
    }
  },
  {
    "name": "Hoa Thuỷ Tinh - Lam",
    "slug": "hoa-thuy-tinh-lam",
    "description": "Hoa văn pha lê tinh xảo và khung hoa màu xanh sứ trên nền kem ấm, điểm tông xanh sứ đậm; cảm giác châu Âu thanh lịch, trong trẻo và lãng mạn.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/crystal_floral_blue.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-25T05:42:02.815088+00:00"
    }
  },
  {
    "name": "Dấu Yêu - Vàng",
    "slug": "dau-yeu-vang",
    "description": "Thiệp kem vàng truyền thống: Save the date với ảnh khung kem trên vòm hoa, cha mẹ hai bên, trái tim vân tay, ảnh cô dâu chú rể, thiệp mời ba ảnh, lịch cưới có tranh cô dâu chú rể, đếm ngược, bản đồ địa điểm và album ảnh trượt.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/fingerprint_gold.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-01T01:52:31.515075+00:00"
    }
  },
  {
    "name": "Liên Hoa - Hồng",
    "slug": "lien-hoa-hong",
    "description": "Sắc hồng phấn dịu dàng của hoa sen: khung mạ vàng tinh tế cùng những đóa sen vẽ màu nước, tông hồng blush trên nền trắng ngà; chữ EB Garamond và Beau Rivage viết tay, gợi vẻ thanh khiết, lãng mạn và đậm nét truyền thống Á Đông.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/lien_hoa_pink.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-08-30T01:44:14.281389+00:00"
    }
  },
  {
    "name": "Long Phụng - Lam",
    "slug": "long-phung-lam",
    "description": "Cổ điển với họa tiết rồng phượng truyền thống",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/dragon_phoenix_blue.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-23T15:24:07.864218+00:00"
    }
  },
  {
    "name": "Giấy Dập Nổi - Nâu",
    "slug": "giay-dap-noi-nau",
    "description": "Nền giấy dập nổi hoạ tiết lá trắng ngà, các mục để trơn trên thẻ viền chìm; chữ mực nâu sepia điểm vàng đồng, tên cô dâu chú rể viết tay giữa thẻ viền sò chạm nổi.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/rose_terracotta.webp",
    "category": "minimal",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-09-22T11:47:15.457645+00:00"
    }
  },
  {
    "name": "Baroque V2 - Lam Đậm",
    "slug": "baroque-v2-lam-dam",
    "description": "Nền lam đậm gần đen phủ hoa văn damask, khung gương Baroque mạ vàng hình bầu dục ôm ảnh cưới cùng hoa mẫu đơn xanh navy và kem; đường viền vàng, chữ Times New Roman và EB Garamond, gợi vẻ cổ điển sang trọng kiểu châu Âu.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/baroque_v2_darkblue.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-09-10T18:13:03.742688+00:00"
    }
  },
  {
    "name": "Lâu Đài - Lam",
    "slug": "lau-dai-lam",
    "description": "Phong cách lâu đài châu Âu với biệt thự lớn, vòi phun nước và cây bách Ý; tông xanh lam sâu trên nền trắng, font script lãng mạn.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/chateau_blue.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-23T15:24:07.864218+00:00"
    }
  },
  {
    "name": "Mộc Thảo - Xanh",
    "slug": "moc-thao-xanh",
    "description": "Thiệp xanh rêu trên nền giấy: ảnh cưới \"Save our date\", ảnh và lời giới thiệu cô dâu chú rể giữa hoa nét mảnh, ảnh Just Married, lịch tháng cưới, lịch trình trên ảnh nền và album ảnh ghép — nhẹ nhàng và hiện đại.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/botanical_green.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-09-30T10:11:32.045863+00:00"
    }
  },
  {
    "name": "Song Long - Lam",
    "slug": "song-long-lam",
    "description": "Lãng mạn với sắc xanh dương nhẹ nhàng",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/double_dragon_blue.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-23T15:24:07.864218+00:00"
    }
  },
  {
    "name": "Cô Ba - Đỏ",
    "slug": "co-ba-do",
    "description": "Giấy kem ấm, chữ nâu cổ điển và điểm nhấn đỏ son; mây, hoa và đèn lồng có parallax. Phong bì nâu, thẻ kem, con dấu 囍 — gợi áo Nhật Bình và thiệp cổ trang hiện đại.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/co_ba_red.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-23T15:24:07.864218+00:00"
    }
  },
  {
    "name": "Vỏ Sò - Lam",
    "slug": "vo-so-lam",
    "description": "Thiệp xanh biển: phong bì lam và ảnh polaroid trên nền cát, Save The Date, đếm ngược trên dải giấy lam, hai nhà, địa điểm có nút chỉ đường, lịch trình, lịch tháng, chuyện tình trên thẻ vỏ sò và album ảnh.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/seashell_blue.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-02T01:43:01.815173+00:00"
    }
  },
  {
    "name": "Hoạ Tình - Đỏ",
    "slug": "hoa-tinh-do",
    "description": "Phong cách comic nghệ thuật với nền trắng tinh khôi và điểm nhấn đỏ tươi. Hoạ tiết hoa tim lãng mạn, font chữ handwritten độc đáo. Phong bì đỏ son hiện đại.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/hoa_tinh_red.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-23T15:24:07.864218+00:00"
    }
  },
  {
    "name": "Hoàng Kim II - Xanh",
    "slug": "hoang-kim-ii-xanh",
    "description": "Hoàng gia xanh lục thẫm với khung vàng kim và hoa hồng trắng sang trọng",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/royal_v2_green.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-25T19:13:45.587381+00:00"
    }
  },
  {
    "name": "Thanh Nhã - Đỏ",
    "slug": "thanh-nha-do",
    "description": "Thiệp tối giản tông đỏ đô: ảnh cưới khung bầu dục trên nền ảnh mờ, lời ngỏ, ảnh tròn cô dâu chú rể kèm cha mẹ, lịch và đếm ngược, album, dòng thời gian chuyện tình và thẻ ảnh cho từng sự kiện cưới.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/graceful_red.webp",
    "category": "minimal",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-01T02:05:18.90784+00:00"
    }
  },
  {
    "name": "Minimalism - Tím",
    "slug": "minimalism-tim",
    "description": "Tối giản dịu dàng trên nền giấy trắng, hoa hồng tím lavender và dấu sáp trái tim mạ vàng",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/minimalism_purple.webp",
    "category": "minimal",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-08-29T14:16:21.209985+00:00"
    }
  },
  {
    "name": "Hoa Thuỷ Tinh - Xanh",
    "slug": "hoa-thuy-tinh-xanh",
    "description": "Hoa văn pha lê tinh xảo và khung hoa xanh lục ánh vàng trên nền kem ấm, điểm tông xanh ngọc lục đậm; cảm giác châu Âu thanh lịch, trong trẻo và tươi mát.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/crystal_floral_green.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-08-30T00:26:08.822345+00:00"
    }
  },
  {
    "name": "Long Phụng - Huyền",
    "slug": "long-phung-huyen",
    "description": "Cổ điển sang trọng với tông đen huyền bí",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/dragon_phoenix_black.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-23T15:24:07.864218+00:00"
    }
  },
  {
    "name": "Tơ Duyên - Đỏ Đậm",
    "slug": "to-duyen-do-dam",
    "description": "Hoa phong quỳ đỏ rượu vang nở trên nền giấy trắng tinh, dải lụa đỏ thẫm uốn quanh từng phần nội dung cùng những nét cong mảnh như sợi tơ; chữ đỏ đô, bố cục so le trái phải, gợi vẻ lãng mạn và sang trọng.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/silk_ribbon_darkred.webp",
    "category": "minimal",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-09-21T01:29:34.945261+00:00"
    }
  },
  {
    "name": "Bạch Sứ V2 - Xanh",
    "slug": "bach-su-v2-xanh",
    "description": "Hoa trắng vẽ tay trên nền lá xanh ô liu, thẻ bo tròn viền xanh rêu và khối lịch cưới xanh trầm",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/porcelain_v2_green.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-09-03T11:30:04.08844+00:00"
    }
  },
  {
    "name": "Bạch Sứ V2 - Hồng",
    "slug": "bach-su-v2-hong",
    "description": "Hoa mẫu đơn hồng vẽ tay phủ khắp nền sứ kem, thẻ bờ bo tròn viền vàng ô liu và khối lịch cưới hồng phấn",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/porcelain_v2_pink.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-08-29T17:46:57.78471+00:00"
    }
  },
  {
    "name": "Hoài Niệm - Đỏ",
    "slug": "hoai-niem-do",
    "description": "Thiệp truyền thống hoài cổ trên nền giấy cũ: tranh cô dâu áo dài bên xe máy cổ, hai nhà, lời báo tin quanh chữ Hỷ, giờ ngày lễ và âm lịch, tranh rước dâu, địa điểm có nút chỉ đường, lịch tháng, đếm ngược, mâm quả cưới và lưới ảnh.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/nostalgia_red.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-02T02:11:46.841515+00:00"
    }
  },
  {
    "name": "Hoàng Kim - Lam",
    "slug": "hoang-kim-lam",
    "description": "Sang trọng hoàng gia với nền xanh lam thẫm và điểm nhấn vàng kim",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/royal_blue.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-23T15:24:07.864218+00:00"
    }
  },
  {
    "name": "Hoa Dại - Hồng",
    "slug": "hoa-dai-hong",
    "description": "Giấy màu nước hồng với vòng hoa dại thắt nơ quanh tên, cánh hoa rơi lơ lửng, chữ hồng đất và xanh lá, lịch trình có bánh cưới và bồ câu",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/hoa_dai_pink.webp",
    "category": "vintage",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-08T17:56:55.064744+00:00"
    }
  },
  {
    "name": "Hoàng Kim - Xanh",
    "slug": "hoang-kim-xanh",
    "description": "Sang trọng hoàng gia với nền xanh lục thẫm và điểm nhấn vàng kim",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/royal_green.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-07-23T15:24:07.864218+00:00"
    }
  },
  {
    "name": "Hoàng Hôn - Lam",
    "slug": "hoang-hon-lam",
    "description": "Thiệp navy trên giấy hồng đào: phong bì navy và thẻ Save the Date giữa hoa mẫu đơn xanh, hai nhà, ảnh tròn cô dâu chú rể, giờ ngày tiệc và âm lịch, địa điểm có nút chỉ đường, ảnh cưới lớn với tuần lễ cưới, love quote, đếm ngược, lưới ảnh và album trượt.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/sunset_navy.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-02T05:14:06.090731+00:00"
    }
  },
  {
    "name": "Baroque V2 - Xanh Đậm",
    "slug": "baroque-v2-xanh-dam",
    "description": "Nền xanh rừng gần đen phủ hoa văn damask, khung tranh Baroque chạm trổ mạ vàng ôm ảnh cưới cùng hoa mẫu đơn xanh thẫm và kem; đường viền vàng, chữ Times New Roman và EB Garamond, gợi vẻ cổ điển sang trọng kiểu châu Âu.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/baroque_v2_darkgreen.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-09-05T21:50:58.73594+00:00"
    }
  },
  {
    "name": "Bạch Sứ II - Đỏ",
    "slug": "bach-su-v2-do",
    "description": "Hoa đỏ vẽ tay phủ khắp nền sứ kem, thẻ bo tròn viền đỏ mảnh và khối lịch cưới đỏ trầm",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/porcelain_v2_red.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-08-30T03:49:08.586407+00:00"
    }
  },
  {
    "name": "Hoa Khô - Cam",
    "slug": "hoa-kho-cam",
    "description": "Hoa khô cúc vạn thọ vẽ màu nước viền quanh những khung thiệp kem, chữ cam đất trên nền giấy ấm",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/hoa_kho_orange.webp",
    "category": "vintage",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-08-31T14:08:05.311659+00:00"
    }
  },
  {
    "name": "Long Phụng v4 - Đỏ",
    "slug": "long-phung-v4-do",
    "description": "Nền đỏ son rực rỡ, khung ảnh tròn mạ vàng cùng rồng phượng và mây ngũ sắc thêu nổi.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/dragon_phoenix_v4_red.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-09-23T04:08:47.121825+00:00"
    }
  },
  {
    "name": "Liên Hoa V2 - Xanh",
    "slug": "lien-hoa-v2-xanh",
    "description": "Phiên bản thứ hai của dòng Liên Hoa: sen hồng phấn vẽ màu nước cùng những tàu lá sen xanh ngọc tràn vào từ hai bên mép thiệp, trên nền giấy kem ấm; ảnh cưới đặt trong khung bo cánh sen và mọi tiêu đề đều nằm gọn trong viền hoa văn thanh mảnh.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/lien_hoa_v2_green.webp",
    "category": "vintage",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-09-12T10:00:34.956444+00:00"
    }
  },
  {
    "name": "Bạch Sứ - Lam",
    "slug": "bach-su-lam",
    "description": "Hoa văn xanh lam vẽ nét trên nền sứ kem, khung viền chạm cổ điển và khối lịch cưới xanh navy",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/porcelain_blue.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-08-30T02:52:57.75824+00:00"
    }
  },
  {
    "name": "Song Hạc - Đỏ",
    "slug": "song-hac-do",
    "description": "Nền đỏ son phủ vân giấy, đôi hạc bay qua vầng trăng son cùng mây xanh và mẫu đơn thêu nổi",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/song_hac_red.webp",
    "category": "classic",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-09-25T04:49:23.772447+00:00"
    }
  },
  {
    "name": "Vườn Kính - Lam",
    "slug": "vuonkinh-lam",
    "description": "Nền hoa cẩm tú cầu xanh lam phủ kín thiệp, hai tên trong khung kính vòm trong suốt và tấm kính lớn ôm trọn nội dung; tông xanh lam mát cùng chữ trắng, gợi vẻ trong trẻo, mộng mơ kiểu khu vườn.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/glass_garden_blue.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-08-29T15:14:27.205465+00:00"
    }
  },
  {
    "name": "Vườn Kính - Xanh Nhạt",
    "slug": "vuonkinh-xanh-nhat",
    "description": "Nền màu nước trắng ngà điểm nhành lá bạch đàn gân vàng, hai tên trong khung kính vòm và tấm kính lớn ôm trọn nội dung; tông xanh rêu nhạt thanh nhã, nhẹ nhàng kiểu khu vườn lá xanh.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/glass_garden_light_green.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-25T15:00:12.021727+00:00"
    }
  },
  {
    "name": "Tơ Duyên - Hồng",
    "slug": "to-duyen-hong",
    "description": "Hoa sen hồng phớt nở trên nền giấy trắng tinh, dải lụa hồng mềm mại uốn quanh từng phần nội dung cùng những nét cong mảnh như sợi tơ; chữ hồng phấn, bố cục so le trái phải, gợi vẻ dịu dàng và tinh khôi.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/silk_ribbon_pink.webp",
    "category": "minimal",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-09-21T01:53:56.245003+00:00"
    }
  },
  {
    "name": "Hoa Thuỷ Tinh - Đỏ",
    "slug": "hoa-thuy-tinh-do",
    "description": "Hoa văn pha lê tinh xảo và khung hoa đỏ ánh vàng trên nền kem ấm, điểm tông đỏ thắm sang trọng; cảm giác châu Âu thanh lịch, ấm áp và rực rỡ.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/crystal_floral_red.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-08-30T00:59:51.371445+00:00"
    }
  },
  {
    "name": "Mahal - Vàng",
    "slug": "mahal-vang",
    "description": "Cung điện sa thạch Rajasthan soi bóng bên hồ, voi trang trí lễ hội và giàn hoa giấy đỏ hồng buông dọc hai mép thiệp; khung vòm vàng kim cùng dải hoa văn tinh xảo trên nền kem ấm, gợi vẻ hoàng gia lộng lẫy của một đám cưới Ấn Độ.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/mahal_gold.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-08-29T14:48:47.8115+00:00"
    }
  },
  {
    "name": "Tơ Duyên - Xanh",
    "slug": "to-duyen-xanh",
    "description": "Hoa rum trắng nở trên nền giấy trắng tinh, dải lụa xanh rêu mềm mại uốn quanh từng phần nội dung cùng những nét cong mảnh như sợi tơ; chữ xanh ô liu, bố cục so le trái phải, gợi vẻ tinh giản và thanh lịch.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/silk_ribbon_green.webp",
    "category": "minimal",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-09-20T16:17:46.9372+00:00"
    }
  },
  {
    "name": "Hoàng Kim II - Tím",
    "slug": "hoang-kim-ii-tim",
    "description": "Nền tím hoàng gia với khung vàng kim và hoa mẫu đơn tím sang trọng",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/royal_v2_purple.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-08-29T18:48:00.681354+00:00"
    }
  },
  {
    "name": "Bạch Sứ - Nâu",
    "slug": "bach-su-nau",
    "description": "Hoa văn vàng nâu vẽ nét trên nền sứ kem, khung vòm cổ điển và khối lịch cưới vàng đồng ấm",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/porcelain_brown.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-08-30T03:29:10.654217+00:00"
    }
  },
  {
    "name": "Hoa Lan - Xanh Rêu",
    "slug": "hoa-lan-xanh-reu",
    "description": "Thiệp chữ xanh rêu trên nền trắng: ảnh cưới trong khung Wedding Day, phong bì xanh rêu có ba ảnh polaroid giữa hai bó lan trắng, chữ lồng, hai nhà, lời mời, giờ ngày tiệc và âm lịch, địa điểm có nút chỉ đường, lịch tháng, timeline, dress code, đếm ngược, cụm ảnh, album trượt và lời cảm ơn.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/orchid_olive.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-02T07:07:34.125132+00:00"
    }
  },
  {
    "name": "Bạch Sứ - Đỏ",
    "slug": "bach-su-do",
    "description": "Hoa văn đỏ vẽ nét trên nền sứ kem, khung viền chạm cổ điển và khối lịch cưới đỏ trầm",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/porcelain_red.webp",
    "category": "luxury",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-08-30T02:42:47.947724+00:00"
    }
  },
  {
    "name": "Hải Âu - Lam",
    "slug": "hai-au-lam",
    "description": "Thiệp xanh lam navy chủ đề biển trên nền giấy: tên cô dâu chú rể chữ hoa lớn trên ảnh cưới, Save the date, lịch cưới trên nền lam, hai ảnh polaroid, lịch trình có biểu tượng, tranh sóng biển và hải âu, album ảnh.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/seagull_blue.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-01T01:07:34.750326+00:00"
    }
  },
  {
    "name": "Hoa Hướng Dương",
    "slug": "hoa-huong-duong",
    "description": "Hoa hướng dương vẽ màu nước trên nền kem ấm, tiêu đề tông hổ phách và chữ xanh ô liu, rực rỡ mà vẫn dịu mắt",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/sunflower_yellow.webp",
    "category": "vintage",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-08-29T16:15:38.399287+00:00"
    }
  },
  {
    "name": "Phiêu Lưu - Xanh",
    "slug": "sinh-nhat-phieu-luu-xanh",
    "description": "Giấy kem trong khung viền xanh bo tròn, tranh màu nước khinh khí cầu, máy bay giấy, biển chỉ đường và xe jeep; tinh nghịch cho tiệc thôi nôi và sinh nhật bé trai.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/sinh-nhat-phieu-luu-xanh.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-09-29T09:58:56.208167+00:00"
    }
  },
  {
    "name": "Polaroid - Kem",
    "slug": "sinh-nhat-polaroid-kem",
    "description": "Ảnh nhân vật chính trong khung polaroid dán băng dính, cờ đuôi nheo và máy ảnh trên giấy kem lấm tấm; lịch, bản đồ, đếm ngược, album ghép và hộp quà — nhẹ nhàng cho tiệc sinh nhật tuổi mới.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/sinh-nhat-polaroid-kem.webp",
    "category": "minimal",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-09-30T12:30:55.143575+00:00"
    }
  },
  {
    "name": "Khát Vọng - Xanh",
    "slug": "sinh-nhat-khat-vong-xanh",
    "description": "Bìa xanh đêm có gáy \"Hành trình khát vọng\", ảnh nhân vật chính trong khung lục giác kèm ô tuổi; bảng giờ khai tiệc, đếm ngược, lịch, bản đồ, album xếp lớp, phong bao mừng và câu hỏi thường gặp — cá tính cho tuổi mới.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/sinh-nhat-khat-vong-xanh.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-09-30T15:58:09.820618+00:00"
    }
  },
  {
    "name": "Công Chúa - Hồng",
    "slug": "sinh-nhat-cong-chua-hong",
    "description": "Giấy hồng phấn trong khung viền bo tròn, tranh màu nước vương miện, lâu đài, xe bí ngô và hoa anh đào; ngọt ngào cho tiệc thôi nôi và sinh nhật bé gái.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/sinh-nhat-cong-chua-hong.webp",
    "category": "minimal",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-09-28T14:55:29.512871+00:00"
    }
  },
  {
    "name": "Ruby - Đỏ",
    "slug": "sinh-nhat-ruby-do",
    "description": "Giấy kem điểm đỏ ruby, nơ satin, vương miện, chùm bóng bay và bánh kem số 1 quanh ảnh bé; lịch, bản đồ, đếm ngược, album và hộp quà — rực rỡ cho ngày thôi nôi.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/sinh-nhat-ruby-do.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-22T15:36:46.008611+00:00"
    }
  },
  {
    "name": "Sương Xanh",
    "slug": "tot-nghiep-suong-xanh",
    "description": "Giấy màu nước xanh sương, sticker mũ cử nhân và máy ảnh quanh ảnh tân cử nhân; lịch, bản đồ, đếm ngược, album \"Khoảnh khắc thanh xuân\", sổ lưu bút và xác nhận tham dự — trong trẻo cho ngày tốt nghiệp.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/tot-nghiep-suong-xanh.webp",
    "category": "vintage",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-22T16:06:10.771018+00:00"
    }
  },
  {
    "name": "Nơ Đỏ",
    "slug": "su-kien-no-do",
    "description": "Nơ satin đỏ vắt ngang tờ thiệp kem, tên sự kiện tô gradient đỏ và ảnh khung vòm viền vàng; lịch, bản đồ, lịch trình, đếm ngược, album, lời chúc và xác nhận tham dự — cho tiệc tân gia, khai trương, tất niên.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/su-kien-no-do.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-23T05:37:41.570261+00:00"
    }
  },
  {
    "name": "Champagne Vàng",
    "slug": "su-kien-champagne-vang",
    "description": "Giấy ngà loang màu nước vàng trong viền kép vàng đồng, tên sự kiện tô gradient champagne và ảnh khung vàng lệch; lịch, bản đồ, lịch trình, đếm ngược, album, lời chúc và xác nhận tham dự — cho tiệc tất niên, kỷ niệm thành lập, tri ân khách hàng.",
    "thumbnail": "https://cdn.thieponline.app/images/template-previews/listing/su-kien-champagne-vang.webp",
    "category": "modern",
    "isPremium": true,
    "minPlan": "BASIC",
    "price": 239000,
    "config": {
      "sections": [
        "header",
        "wedding-info",
        "countdown",
        "calendar",
        "gallery",
        "location",
        "dresscode",
        "timeline",
        "rsvp",
        "wishes",
        "gifting",
        "footer"
      ],
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
      "releasedAt": "2026-10-25T16:42:58.408081+00:00"
    }
  }
];

module.exports = { TEMPLATE_DEFS };
