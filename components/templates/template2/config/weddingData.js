export const weddingData = {
  // Array of events for TimelineSection.jsx
  events: [
    {
      id: 'vuquy',
      name: 'Lễ Vu Quy',
      date: '18/07/2026',
      time: '09:00 AM',
      location: "Thôn 1b, Xã Ea M' Droh(Ea M'nang cũ), Tỉnh Đắk Lắk",
      side: 'nhagai'
    },
    {
      id: 'tanhon',
      name: 'Lễ Tân Hôn',
      date: '19/07/2026',
      time: '09:00 AM',
      location: "195 Thôn 4A, Xã Quảng Phú(Cư Suê cũ), Tỉnh Đắk Lắk",
      side: 'nhatrai'
    }
  ],

  // Link ảnh cho phần Gallery.
  gallery: [
    "/images/z7974179647046_c0ea8bbbabb1002beb2d7fbaef09ddde.jpg",
    "/images/z7974179649764_4be2c032860731744781ff25a84415e5.jpg",
    "/images/z7974179656581_b9e1062c585bedc28ab1c640cfecce11.jpg",
    "/images/z7974179663138_96009eccd733980cb3d5f8efaa6711f1.jpg",
    "/images/z7974179666520_e6e2ccf46662d623ffa969ec32d4431b.jpg",
    "/images/z7974179671203_0fe40cf1e0ad9b6d6f2ed64c9246ed34.jpg",
    "/images/z7974179677199_aae30dafd89c8b5af79516e11e3569b1.jpg",
    "/images/z7974179682525_17fc2a2f8b2a859ba087eecbe34768ee.jpg",
    "/images/z7974179685104_53ba5217490af1ce5752cdcc90556e1f.jpg",
    "/images/z7974179695774_d47b800141b4ad811794602b2925c565.jpg",
    "/images/z7974179703025_e749d94cbdda06a7d4d4e56c9b599db7.jpg",
    "/images/z7974179703332_9093b3f1e4a18c99665f815021c7af60.jpg"
  ],

  // Link ảnh riêng cho phần Magic Touch (tránh trùng lặp với gallery chính)
  magicTouchGallery: [
    "/images/z7974179712797_3b336e8f15e7c34fb0c5e56bb4912a34.jpg",
    "/images/z7974179717841_dc76e4fae500560249e21340aa45cb3a.jpg",
    "/images/z7974179722562_5e595f09b9a541bec01d5ffceee0aefe.jpg",
    "/images/z7974179733015_9d85117db4b5913a6dcf0f395bf51648.jpg",
    "/images/z7974179733402_d7e1f3ce3ae6ab42aaa492f4ecffc398.jpg",
    "/images/z7974179737111_d58e8bb81254cb1dd071572b736cf5b5.jpg",
    "/images/z7974179746274_0b7ea351b9b2e0b5eccddf3170fdd916.jpg",
    "/images/z7974179748837_da4d5c83a0890f8e3b38b58dacfce16c.jpg",
    "/images/z7974179759081_76fdea264281169d13a97a3261f1145c.jpg",
    "/images/z7974179761525_0b2ce344228ededd538a3a05c5880994.jpg",
    "/images/z7974179766500_9459762d6d7f9b6b54e5b91653e9b571.jpg",
    "/images/z7974179779092_fd77a62695ea1ee84f4d34df18789f7b.jpg"
  ],

  // Thông tin dùng chung cho cả 2 bên (Tránh lặp code)
  couple: {
    groom: {
      name: "Đỗ Phú Khương",
      firstName: "Phú Khương",
      title: "Quý Nam"
    },
    bride: {
      name: "Hoàng Thị Cẩm Hiền",
      firstName: "Cẩm Hiền",
      title: "Thứ Nữ"
    }
  },

  // Cấu hình Dynamic Content thay đổi theo Mode URL (?side=...)
  nhatrai: {
    meta: {
      title: "Thiệp Cưới Tân Hôn - Phú Khương & Cẩm Hiền",
      themeColor: "#0A1128"
    },
    parents: {
      father: "Đỗ Phú Nhẫn",
      mother: "Nguyễn Thị Liễu",
      address: "195 Thôn 4A, Xã Quảng Phú(Cư Suê cũ), Tỉnh Đắk Lắk"
    },
    // Hiển thị ưu tiên thứ tự Tên Chú Rể trước cho Mode Nhà Trai
    displayOrder: ["groom", "bride"],

    // Thông tin buổi lễ chính
    ceremony: {
      type: "Lễ Tân Hôn",
      dateLunar: "06/06 năm Bính Ngọ",
      dateSolar: "19/07/2026",
      time: "09:00",
      address: "195 Thôn 4A, Xã Quảng Phú(Cư Suê cũ), Tỉnh Đắk Lắk"
    },

    // Thông tin tiệc cưới để khách nhà trai đến dự
    party: {
      title: "Tiệc Cưới Nhà Trai",
      time: "11:00 ngày 19/07/2026",
      address: "TƯ GIA NHÀ TRAI - 195 Thôn 4A, Xã Quảng Phú(Cư Suê cũ), Tỉnh Đắk Lắk",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!..."
    }
  },

  nhagai: {
    meta: {
      title: "Thiệp Cưới Vu Quy - Cẩm Hiền & Phú Khương",
      themeColor: "#0A1128"
    },
    parents: {
      father: "Hoàng Đình Du",
      mother: "Nguyễn Thị Thuý Nga",
      address: "Thôn 1b, Xã Ea M' Droh(Ea M'nang cũ), Tỉnh Đắk Lắk"
    },
    // Hiển thị ưu tiên thứ tự Tên Cô Dâu trước cho Mode Nhà Gái
    displayOrder: ["bride", "groom"],

    // Thông tin buổi lễ chính
    ceremony: {
      type: "Lễ Vu Quy",
      dateLunar: "05/06 năm Bính Ngọ",
      dateSolar: "18/07/2026",
      time: "09:00",
      address: "Thôn 1b, Xã Ea M' Droh(Ea M'nang cũ), Tỉnh Đắk Lắk"
    },

    // Thông tin tiệc cưới để khách nhà gái đến dự
    party: {
      title: "Tiệc Cưới Nhà Gái",
      time: "11:00 ngày 18/07/2026",
      address: "TƯ GIA NHÀ GÁI - Thôn 1b, Xã Ea M' Droh(Ea M'nang cũ), Tỉnh Đắk Lắk",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!..."
    }
  }
};
