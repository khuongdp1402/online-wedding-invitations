"use client";

import { motion } from "framer-motion";
import {
  Palette,
  Users,
  MessageSquareHeart,
  BarChart3,
  Send,
  Shield,
  Smartphone,
  Music,
} from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "Mẫu Thiệp Đa Dạng",
    description:
      "Nhiều mẫu thiệp cưới đẹp từ cổ điển đến hiện đại, dễ dàng tùy chỉnh màu sắc và nội dung.",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    icon: Send,
    title: "Link Cá Nhân Hóa",
    description:
      "Tạo link mời riêng cho từng khách, hiển thị tên và xưng hô phù hợp trên thiệp.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Users,
    title: "Quản Lý Khách Mời",
    description:
      "Quản lý danh sách khách mời, import từ Excel, theo dõi trạng thái xác nhận tham dự.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: MessageSquareHeart,
    title: "Lời Chúc & RSVP",
    description:
      "Khách mời gửi lời chúc và xác nhận tham dự trực tiếp trên thiệp. Duyệt và quản lý dễ dàng.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: BarChart3,
    title: "Thống Kê Chi Tiết",
    description:
      "Theo dõi lượt xem, tỷ lệ RSVP, số lời chúc và nhiều chỉ số hữu ích khác.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: Smartphone,
    title: "Responsive Hoàn Hảo",
    description:
      "Thiệp cưới hiển thị đẹp trên mọi thiết bị: điện thoại, máy tính bảng và desktop.",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
  },
  {
    icon: Music,
    title: "Nhạc Nền Tùy Chỉnh",
    description:
      "Thêm nhạc nền yêu thích vào thiệp cưới, tạo không gian lãng mạn cho khách mời.",
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
  {
    icon: Shield,
    title: "Bảo Mật & Tin Cậy",
    description:
      "Dữ liệu được bảo mật an toàn. Hệ thống ổn định, đảm bảo thiệp luôn sẵn sàng.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tất Cả Bạn Cần Cho{" "}
            <span className="text-rose-600">Ngày Trọng Đại</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Một nền tảng hoàn chỉnh giúp bạn tạo thiệp cưới online, quản lý
            khách mời và lời chúc một cách dễ dàng.
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div
                className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
