"use client";

import { motion } from "framer-motion";
import { MousePointerClick, Paintbrush, Share2, PartyPopper } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: MousePointerClick,
    title: "Chọn Mẫu Thiệp",
    description:
      "Duyệt qua bộ sưu tập mẫu thiệp đa dạng và chọn phong cách phù hợp với bạn.",
    color: "rose",
  },
  {
    step: "02",
    icon: Paintbrush,
    title: "Nhập Thông Tin",
    description:
      "Điền thông tin đám cưới: tên cô dâu chú rể, ngày giờ, địa điểm, ảnh cưới.",
    color: "blue",
  },
  {
    step: "03",
    icon: Share2,
    title: "Chia Sẻ Link",
    description:
      "Tạo link cá nhân hóa cho từng khách mời và gửi qua Zalo, Messenger.",
    color: "emerald",
  },
  {
    step: "04",
    icon: PartyPopper,
    title: "Nhận Lời Chúc",
    description:
      "Khách mời xem thiệp, gửi lời chúc và xác nhận tham dự trực tiếp.",
    color: "amber",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-gray-50">
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
            Chỉ <span className="text-rose-600">4 Bước</span> Đơn Giản
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tạo thiệp cưới online chỉ trong vài phút, không cần kỹ năng thiết kế.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative text-center"
            >
              {/* Connector line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-gray-200 to-gray-200" />
              )}

              {/* Step number */}
              <div className="relative z-10 mx-auto mb-4">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto border border-gray-100">
                  <step.icon
                    className={`w-10 h-10 ${
                      step.color === "rose"
                        ? "text-rose-500"
                        : step.color === "blue"
                        ? "text-blue-500"
                        : step.color === "emerald"
                        ? "text-emerald-500"
                        : "text-amber-500"
                    }`}
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {step.step}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-500">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
