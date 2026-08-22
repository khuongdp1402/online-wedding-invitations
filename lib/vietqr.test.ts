import { describe, it, expect } from "vitest";
import { buildVietQrUrl, resolveBankBin } from "@/lib/vietqr";

describe("VietQR", () => {
  it("nhận diện ngân hàng có dấu và không dấu", () => {
    expect(resolveBankBin("Vietcombank")).toBe("970436");
    expect(resolveBankBin("NH TMCP Ngoại Thương")).toBe("970436");
    expect(resolveBankBin("MB Bank")).toBe("970422");
    expect(resolveBankBin("ngân hàng Quân Đội")).toBe("970422");
    expect(resolveBankBin("Techcombank")).toBe("970407");
  });
  it("trả null khi không nhận ra ngân hàng", () => {
    expect(resolveBankBin("Ngân hàng Không Tồn Tại")).toBeNull();
    expect(resolveBankBin("")).toBeNull();
  });
  it("dựng URL VietQR đúng chuẩn", () => {
    const url = buildVietQrUrl({ bankName: "Vietcombank", accountNumber: "1234567890", accountHolder: "NGUYEN VAN A", message: "Mung cuoi" });
    console.log("  URL:", url);
    expect(url).toContain("img.vietqr.io/image/970436-1234567890-compact2.png");
    expect(url).toContain("addInfo=Mung+cuoi");
  });
  it("trả null khi thiếu dữ liệu", () => {
    expect(buildVietQrUrl({ bankName: "Vietcombank", accountNumber: "" })).toBeNull();
    expect(buildVietQrUrl({ bankName: "", accountNumber: "123" })).toBeNull();
  });
});

describe("VietQR - ranh giới từ", () => {
  it("không nhận nhầm viết tắt là chuỗi con", () => {
    expect(resolveBankBin("Techcombank")).toBe("970407"); // không phải MB
    expect(resolveBankBin("Sacombank")).toBe("970403");
    expect(resolveBankBin("VPBank")).toBe("970432");
  });
});
