/**
 * VOLUME 5: TheWeddingData - Single Source of Truth
 * Merged from weddingData.js (full data) + WSDD storyChapters
 */

export const weddingData = {
  couple: {
    groom: {
      name: "Đỗ Phú Khương",
      firstName: "Phú Khương",
      title: "Quý Nam",
    },
    bride: {
      name: "Hoàng Thị Cẩm Hiền",
      firstName: "Cẩm Hiền",
      title: "Thứ Nữ",
    },
    weddingDate: "2026-07-19T00:00:00.000Z",
  },

  audio: {
    bgmUrl: "/Give Me Everything - (Cover by Archer Marsh) [Bridgerton Season 3 (Netflix Series)].mp3",
    autoplay: false,
  },

  rsvpConfig: {
    deadline: "2026-07-10T00:00:00.000Z",
    googleFormUrl: "https://forms.gle/example",
  },

  // Dynamic Content theo Mode URL (?side=nhatrai / ?side=nhagai)
  nhatrai: {
    meta: {
      title: "Thiệp Cưới Tân Hôn - Phú Khương & Cẩm Hiền",
    },
    parents: {
      father: "Đỗ Phú Nhẫn",
      mother: "Nguyễn Thị Liễu",
      address: "195 Thôn 4A, Xã Quảng Phú(Cư Suê cũ), Tỉnh Đắk Lắk",
    },
    displayOrder: ["groom", "bride"],
    ceremony: {
      type: "Lễ Tân Hôn",
      dateLunar: "06/06 năm Bính Ngọ",
      dateSolar: "19/07/2026",
      time: "09:00",
      address: "195 Thôn 4A, Xã Quảng Phú(Cư Suê cũ), Tỉnh Đắk Lắk",
    },
    party: {
      title: "Tiệc Cưới Nhà Trai",
      time: "11:00 ngày 19/07/2026",
      address: "TƯ GIA NHÀ TRAI - 195 Thôn 4A, Xã Quảng Phú(Cư Suê cũ), Tỉnh Đắk Lắk",
    },
  },

  nhagai: {
    meta: {
      title: "Thiệp Cưới Vu Quy - Cẩm Hiền & Phú Khương",
    },
    parents: {
      father: "Hoàng Đình Du",
      mother: "Nguyễn Thị Thuý Nga",
      address: "Thôn 1b, Xã Ea M' Droh(Ea M'nang cũ), Tỉnh Đắk Lắk",
    },
    displayOrder: ["bride", "groom"],
    ceremony: {
      type: "Lễ Vu Quy",
      dateLunar: "05/06 năm Bính Ngọ",
      dateSolar: "18/07/2026",
      time: "09:00",
      address: "Thôn 1b, Xã Ea M' Droh(Ea M'nang cũ), Tỉnh Đắk Lắk",
    },
    party: {
      title: "Tiệc Cưới Nhà Gái",
      time: "11:00 ngày 18/07/2026",
      address: "TƯ GIA NHÀ GÁI - Thôn 1b, Xã Ea M' Droh(Ea M'nang cũ), Tỉnh Đắk Lắk",
    },
  },

  // Ảnh banner ngang (SAVE THE DATE)
  bannerImage: "/images/banner.jpg",
  bannerTitle: "Sự Kiện Trọng Đại",
  // Collapse images — ảnh ghép sẵn, hiển thị độc lập full-width
  collapseImages: [
    "/images/collapse_images/z7974179666520_e6e2ccf46662d623ffa969ec32d4431b.jpg",
    "/images/collapse_images/z7974179682525_17fc2a2f8b2a859ba087eecbe34768ee.jpg",
    "/images/collapse_images/z7974179703332_9093b3f1e4a18c99665f815021c7af60.jpg",
    "/images/collapse_images/z7974179717841_dc76e4fae500560249e21340aa45cb3a.jpg",
    "/images/collapse_images/z7974179826859_eacb1dc461b5b4adc780f7999330858c.jpg",
    "/images/collapse_images/z7974179833482_2aa4d6c6709079610314d21abe13f231.jpg",
    "/images/collapse_images/z7974179863480_a538e90f55916894247e45618066abcf.jpg",
  ],

  // Gallery ảnh đơn dọc
  gallery: [
    "/images/z7974179647046_c0ea8bbbabb1002beb2d7fbaef09ddde.jpg",
    "/images/z7974179649764_4be2c032860731744781ff25a84415e5.jpg",
    "/images/z7974179663138_96009eccd733980cb3d5f8efaa6711f1.jpg",
    "/images/z7974179671203_0fe40cf1e0ad9b6d6f2ed64c9246ed34.jpg",
    "/images/codau/z7974179677199_aae30dafd89c8b5af79516e11e3569b1.jpg",
    "/images/codau/z7974179685104_53ba5217490af1ce5752cdcc90556e1f.jpg",
    "/images/z7974179695774_d47b800141b4ad811794602b2925c565.jpg",
    "/images/codau/z7974179703025_e749d94cbdda06a7d4d4e56c9b599db7.jpg",
    "/images/codau/z7974179712797_3b336e8f15e7c34fb0c5e56bb4912a34.jpg",
    "/images/z7974179722562_5e595f09b9a541bec01d5ffceee0aefe.jpg",
    "/images/z7974179733015_9d85117db4b5913a6dcf0f395bf51648.jpg",
    "/images/z7974179737111_d58e8bb81254cb1dd071572b736cf5b5.jpg",
  ],

  storyChapters: [
    {
      id: "chapter-0-hero",
      title: "The Beginning",
      theme: "#000000",
      layoutType: "hero",
      images: ["/images/banner.jpg"],
      quote: "Every love story begins with a single moment.",
    },
    {
      id: "chapter-1-meet",
      title: "The First Glance",
      theme: "#FFF8F0",
      layoutType: "asymmetric-left",
      images: [
        // Chú rể (Column 3)
        "/images/chure/z7974179647046_c0ea8bbbabb1002beb2d7fbaef09ddde.jpg",
        "/images/chure/z7974179759081_76fdea264281169d13a97a3261f1145c.jpg",
        "/images/chure/z7974179845732_1738987ada60243dda32181b00050284.jpg",

        // The First (Column 2)
        "/images/the-first/z7974179649764_4be2c032860731744781ff25a84415e5.jpg",
        "/images/the-first/z7974179663138_96009eccd733980cb3d5f8efaa6711f1.jpg",
        "/images/the-first/z7974179671203_0fe40cf1e0ad9b6d6f2ed64c9246ed34.jpg",
        "/images/the-first/z7974179695774_d47b800141b4ad811794602b2925c565.jpg",
        "/images/the-first/z7974179722562_5e595f09b9a541bec01d5ffceee0aefe.jpg",

        // Cô dâu (Column 1)
        "/images/codau/z7974179677199_aae30dafd89c8b5af79516e11e3569b1.jpg",
        "/images/codau/z7974179685104_53ba5217490af1ce5752cdcc90556e1f.jpg",
        "/images/codau/z7974179703025_e749d94cbdda06a7d4d4e56c9b599db7.jpg",
        "/images/codau/z7974179712797_3b336e8f15e7c34fb0c5e56bb4912a34.jpg",
        "/images/codau/z7974179733402_d7e1f3ce3ae6ab42aaa492f4ecffc398.jpg",
        "/images/codau/z7974179836029_9ddf921938122298b9b5a7ccb7f87a0f.jpg"
      ],
      parallaxSpeed: [0.8, 1.2, 0.9, 1.1, 0.85, 1.15],
      quote: "Ánh mắt chạm nhau, và thế giới như dừng lại.",
    },
    {
      id: "chapter-2-journey",
      title: "Our Journey",
      theme: "#FFF8F0",
      layoutType: "coverflow-journey",
      images: [
        "/images/our-journey/z7974179733015_9d85117db4b5913a6dcf0f395bf51648.jpg",
        "/images/our-journey/z7974179737111_d58e8bb81254cb1dd071572b736cf5b5.jpg",
        "/images/our-journey/z7974179748837_da4d5c83a0890f8e3b38b58dacfce16c.jpg",
        "/images/our-journey/z7974179761525_0b2ce344228ededd538a3a05c5880994.jpg",
        "/images/our-journey/z7974179779092_fd77a62695ea1ee84f4d34df18789f7b.jpg",
        "/images/our-journey/z7974179782876_16f0b4c620fd7ffb9b16f13b4d69e029.jpg",
        "/images/our-journey/z7974179784860_ccd60dd47e4d3a54981a147a08794354.jpg",
        "/images/our-journey/z7974179787511_a04dd40cc7af2f8b0b344075de37ba00.jpg",
      ],
      quote: "Mỗi khoảnh khắc bên nhau là một trang truyện đẹp. ",
    },
    {
      id: "chapter-3-invitation",
      title: "Lời Mời Trân Trọng",
      theme: "#FDFCF8",
      layoutType: "editorial-invitation",
      images: [
        "/images/anh-gia-dinh2.JPG", // Family photo
        "/images/banner.jpg", // Close up parallax
      ],
    },

    {
      id: "chapter-6-1-mousetrail",
      title: "Lễ Hằng Thuận",
      theme: "#FDFDFD",
      layoutType: "mousetrail-gallery",
      images: [
        "/images/hangthuan/4M8A2155.jpg",
        "/images/hangthuan/4M8A2175.jpg",
        "/images/hangthuan/4M8A2237.jpg",
        "/images/hangthuan/4M8A2240.jpg",
        "/images/hangthuan/4M8A2380.jpg",
        "/images/hangthuan/4M8A2404.jpg",
        "/images/hangthuan/4M8A2462.jpg",
        "/images/hangthuan/4M8A2569.jpg",
        "/images/hangthuan/4M8A2621.jpg",
        "/images/hangthuan/4M8A2674.jpg",
        "/images/hangthuan/4M8A2696.jpg",
        "/images/hangthuan/4M8A2713.jpg",
        "/images/hangthuan/4M8A2733.jpg",
        "/images/hangthuan/4M8A2749.jpg",
        "/images/hangthuan/4M8A2800.jpg",
        "/images/hangthuan/4M8A2813.jpg",
        "/images/hangthuan/4M8A2833.jpg",
        "/images/hangthuan/4M8A2880.jpg",
        "/images/hangthuan/4M8A2948.jpg",
        "/images/hangthuan/4M8A2952.jpg",
        "/images/hangthuan/4M8A2968.jpg",
      ],
      quote: "Sự thiêng liêng trong ngày Hằng Thuận",
    },
    {
      id: "chapter-6-2-carousel",
      title: "Khoảnh khắc",
      quote: "Chút tình gửi gió ngàn mây",
      theme: "#E8E4DB",
      layoutType: "horizontal-marquee",
      images: [
        "/images/lecuoi/QL_02961.jpg",
        "/images/lecuoi/QL_02996.jpg",
        "/images/lecuoi/QL_03065.jpg",
        "/images/lecuoi/QL_03116.jpg",
        "/images/lecuoi/QL_03140.jpg",
        "/images/lecuoi/QL_03152.jpg",
        "/images/lecuoi/QL_03213.jpg",
        "/images/lecuoi/QL_03277.jpg",
        "/images/lecuoi/QL_03371.jpg",
        "/images/lecuoi/QL_03461.jpg",
        "/images/lecuoi/QL_03507.jpg",
        "/images/lecuoi/QL_03616.jpg",
        "/images/lecuoi/QL_03658.jpg",
        "/images/lecuoi/QL_03688.jpg",
        "/images/lecuoi/QL_03784.jpg",
        "/images/lecuoi/QL_03973.jpg",
        "/images/lecuoi/QL_04124.jpg",
        "/images/lecuoi/QL_04131.jpg",
        "/images/lecuoi/QL_04143.jpg",
        "/images/lecuoi/QL_04201.jpg",
        "/images/lecuoi/QL_04216.jpg",
        "/images/lecuoi/QL_04247.jpg",
        "/images/lecuoi/QL_04274.jpg",
        "/images/lecuoi/QL_04282.jpg",
        "/images/lecuoi/QL_04284.jpg",
        "/images/lecuoi/QL_04406.jpg"
      ],
    },
    {
      id: "chapter-6-rsvp",
      title: "Hồi Âm & Lời Chúc",
      theme: "#111111",
      layoutType: "editorial-rsvp",
      images: ["/images/collapse_images/z7974179833482_2aa4d6c6709079610314d21abe13f231.jpg"],
    },
  ],
};
