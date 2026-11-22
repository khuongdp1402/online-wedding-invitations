import { Eyebrow } from "@/components/marketing/winglove/Eyebrow";
import { Reveal } from "@/components/marketing/winglove/Reveal";
import { TemplateShowcase } from "@/components/marketing/TemplateShowcase";

/**
 * Section "Mẫu thiệp nổi bật" — phần đầu (eyebrow + tiêu đề + lede) port
 * mới theo mockup, phần lưới mẫu thiệp tái dùng `TemplateShowcase` hiện có
 * (đã tự fetch dữ liệu thật từ `/api/templates` + có modal xem trước riêng).
 */
export function TemplatesSection() {
  return (
    <section id="templates" className="py-14 pb-8 md:py-16">
      <div className="mx-auto max-w-[1180px] px-8">
        <Reveal className="mb-9 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Kho mẫu thiệp</Eyebrow>
            <h2 className="max-w-[20ch] font-wg-display text-[clamp(1.8rem,3.2vw,2.5rem)] font-semibold text-winglove-ink">
              Hơn 120 phong cách độc bản, hoàn thiện từng chi tiết
            </h2>
          </div>
          <p className="mt-4 max-w-[52ch] text-[1.08rem] leading-[1.7] text-winglove-ink-soft">
            Mỗi mẫu một bố cục, một trải nghiệm tương tác riêng: từ Classic Elegance, Modern Cinematic đến trọn bộ sưu tập Minimalism, Song Hỷ, Long Phụng, Hoàng Gia và Boho.
          </p>
        </Reveal>

        <Reveal>
          <TemplateShowcase />
        </Reveal>
      </div>
    </section>
  );
}
