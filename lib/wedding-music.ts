export type WeddingMusicTrack = {
  id: string;
  title: string;
  artist: string;
  duration: string;
  url: string;
};

export const POPULAR_WEDDING_TRACKS: WeddingMusicTrack[] = [
  {
    id: "beautiful-in-white",
    title: "Beautiful In White",
    artist: "Shane Filan",
    duration: "3:54",
    url: "/music/beautiful-in-white.mp3",
  },
  {
    id: "em-dong-y",
    title: "Em Đồng Ý (I Do)",
    artist: "Đức Phúc x 911",
    duration: "3:35",
    url: "/music/em-dong-y-i-do.mp3",
  },
  {
    id: "perfect",
    title: "Perfect",
    artist: "Ed Sheeran",
    duration: "4:23",
    url: "/music/perfect-ed-sheeran.mp3",
  },
  {
    id: "hon-ca-yeu",
    title: "Hơn Cả Yêu",
    artist: "Đức Phúc",
    duration: "4:08",
    url: "/music/hon-ca-yeu-duc-phuc.mp3",
  },
  {
    id: "marry-you",
    title: "Marry You",
    artist: "Bruno Mars",
    duration: "3:40",
    url: "/Marry%20You.mp3",
  },
  {
    id: "le-duong",
    title: "Lễ Đường",
    artist: "Kai Đinh",
    duration: "4:09",
    url: "/music/le-duong.mp3",
  },
  {
    // Thay "Đám Cưới Nha" (file gốc không còn tồn tại) bằng bài có sẵn.
    id: "cuoi-thoi",
    title: "Cưới Thôi",
    artist: "Masew x B Ray",
    duration: "3:01",
    url: "/music/cuoi-thoi-masew.mp3",
  },
  {
    // Thay "Ngày Đầu Tiên" (file gốc không còn tồn tại) bằng bài có sẵn.
    id: "ngay-minh-chung-doi",
    title: "Ngày Mình Chung Đôi",
    artist: "Nhạc cưới",
    duration: "4:54",
    url: "/music/ngay-minh-chung-doi.mp3",
  },
];
