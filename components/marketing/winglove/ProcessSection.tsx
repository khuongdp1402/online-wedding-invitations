import { Eyebrow } from "@/components/marketing/winglove/Eyebrow";
import { Reveal } from "@/components/marketing/winglove/Reveal";

const steps = [
  {
    num: "01",
    title: "Chọn phong cách",
    body: "10 mẫu thiệp có sẵn — từ cổ điển Á Đông, điện ảnh hiện đại, tối giản Hàn Quốc đến hoàng gia dát vàng.",
  },
  {
    num: "02",
    title: "Kể câu chuyện của hai bạn",
    body: "Điền tên, ngày giờ, địa điểm hai bên và tải lên những tấm ảnh cưới đẹp nhất.",
  },
  {
    num: "03",
    title: "Gửi & theo dõi",
    body: "Có ngay đường link riêng để gửi khách mời, theo dõi RSVP, lời chúc và mừng cưới về một mối.",
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="py-[88px] pb-10">
      <div className="mx-auto max-w-[1180px] px-8">
        <Reveal className="mb-14 max-w-[640px]">
          <Eyebrow>Từ ý tưởng đến lời mời</Eyebrow>
          <h2 className="font-wg-display text-[clamp(1.8rem,3.2vw,2.5rem)] font-semibold text-winglove-ink">
            Có thiệp cưới riêng chỉ trong{" "}
            <em className="font-wg-display italic text-winglove-red">
              5 phút
            </em>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.num} delayMs={index * 80}>
              <div className="h-full rounded-3xl border border-winglove-line bg-white p-7">
                <span
                  className="mb-3.5 block font-wg-display text-[2.6rem] font-semibold leading-none text-transparent"
                  style={{ WebkitTextStroke: "1.5px #C99A44" }}
                >
                  {step.num}
                </span>
                <h3 className="mb-2.5 font-wg-display text-[1.3rem] font-semibold text-winglove-ink">
                  {step.title}
                </h3>
                <p className="m-0 text-[0.93rem] text-winglove-ink-soft">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
