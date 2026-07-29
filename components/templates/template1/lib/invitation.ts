export type InvitationData = {
  groom: {
    name: string;
    parents: {
      father: string;
      mother: string;
    };
  };
  bride: {
    name: string;
    parents: {
      father: string;
      mother: string;
    };
  };
  ceremony: {
    title: string;
    solarDateLabel: string;
    lunarDateLabel: string;
    timeLabel: string;
    receptionTimeLabel: string;
    venueName: string;
    address: string;
    googleMapsUrl: string;
    googleMapsEmbedUrl: string;
    startsAtISO: string;
  };
  quote: string;
  gallery: Array<{
    src: string;
    alt: string;
    className: string;
    parallax: number;
  }>;
  gifting?: {
    groom: {
      accountName: string;
      accountNumber: string;
      bankName: string;
      address: string;
      phone: string;
    };
    bride: {
      accountName: string;
      accountNumber: string;
      bankName: string;
      address: string;
      phone: string;
    };
  };
};

export const invitation: InvitationData = {
  groom: {
    name: "Thanh Tùng",
    parents: {
      father: "Ông Đặng Công Tí",
      mother: "Bà Đỗ Thị Bạch Tuyết"
    }
  },
  bride: {
    name: "Hương Giang",
    parents: {
      father: "Ông Nguyễn Văn Quý",
      mother: "Bà Lê Thị Gái"
    }
  },
  ceremony: {
    title: "Lễ Tân Hôn",
    solarDateLabel: "Thứ Sáu, 13/02/2026",
    lunarDateLabel: "Nhằm ngày 26 tháng 12 năm Ất Tỵ",
    timeLabel: "11:00",
    receptionTimeLabel: "12:30",
    venueName: "Tư Gia Nhà Trai",
    address: "Khu phố Lại Khánh Nam, phường Bồng Sơn, tỉnh Gia Lai",
    googleMapsUrl: "https://maps.app.goo.gl/JFYVdwMC6nBeyviS7",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15545.922444634283!2d109.012586!3d14.484214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x316f456c8025547d%3A0x6b490f2095cc606!2zQuG7k25nIFPGoW4sIEhv4aSBOaMahbiwgQsOsbmggxJDhu4tuaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1700000000000",
    startsAtISO: "2026-02-13T11:00:00+07:00"
  },
  quote: "Hạnh phúc là có bạn bên cạnh trong ngày trọng đại.",
  gallery: [
    {
      src: "/images/z7481582511962_d0a5400d7e259c9b2a1336e691af4db3.jpg",
      alt: "Ảnh cưới 01",
      className: "col-span-12 md:col-span-7 row-span-2",
      parallax: 18
    },
    {
      src: "/images/z7481583509453_9b098e98c846243154f64e1e5eb8e430.jpg",
      alt: "Ảnh cưới 02",
      className: "col-span-12 md:col-span-5 row-span-1",
      parallax: 10
    },
    {
      src: "/images/z7481585541533_11d8b7ae067a0149ffec4e57e96fe90b.jpg",
      alt: "Ảnh cưới 03",
      className: "col-span-12 md:col-span-5 row-span-2",
      parallax: 22
    },
    {
      src: "/images/z7481582613439_16c30431fffa815671cd2b055b48ce0e.jpg",
      alt: "Ảnh cưới 04",
      className: "col-span-12 md:col-span-7 row-span-1",
      parallax: 12
    },
    {
      src: "/images/z7481584990162_737432ce6ed364dd589a63b91f2193ae.jpg",
      alt: "Ảnh cưới 05",
      className: "col-span-12 md:col-span-4 row-span-1",
      parallax: 14
    },
    {
      src: "/images/z7481584153902_19ed7361dfab2dbb2b00a9f41a441842.jpg",
      alt: "Ảnh cưới 06",
      className: "col-span-12 md:col-span-8 row-span-1",
      parallax: 8
    }
  ],
  gifting: {
    groom: {
      accountName: "Đặng Thanh Tùng",
      accountNumber: "123456789",
      bankName: "Vietcombank",
      address: "Khu phố Lại Khánh Nam, phường Bồng Sơn, TX Hoài Nhơn, Bình Định",
      phone: "0987 654 321"
    },
    bride: {
      accountName: "Nguyễn Hương Giang",
      accountNumber: "987654321",
      bankName: "Techcombank",
      address: "Phường Bồng Sơn, TX Hoài Nhơn, Bình Định",
      phone: "0123 456 789"
    }
  }
};
