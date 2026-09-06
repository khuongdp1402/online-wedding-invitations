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
    <section id="templates" className="py-[88px] pb-10">
      <div className="mx-auto max-w-[1180px] px-8">
        <Reveal className="mb-11 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Mẫu thiệp nổi bật</Eyebrow>
            <h2 className="max-w-[16ch] font-wg-display text-[clamp(1.8rem,3.2vw,2.5rem)] font-semibold text-winglove-ink">
              10 phong cách, không mẫu nào giống mẫu nào
            </h2>
          </div>
          <p className="mt-4 max-w-[52ch] text-[1.08rem] leading-[1.7] text-winglove-ink-soft">
            Mỗi mẫu một bố cục, một hiệu ứng riêng — không phải chỉnh màu từ
            cùng một khuôn.
          </p>
        </Reveal>

        <Reveal>
          <TemplateShowcase />
        </Reveal>
      </div>
    </section>
  );
}
