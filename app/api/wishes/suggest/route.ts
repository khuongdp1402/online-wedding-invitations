import { NextResponse } from "next/server";

const WEDDING_WISHES = [
  "Chúc hai bạn trăm năm hạnh phúc, mãi yêu thương và đồng hành cùng nhau như ngày đầu tiên!",
  "Mừng ngày trọng đại của hai bạn! Chúc gia đình nhỏ luôn tràn ngập tiếng cười và sớm có tin vui nhé.",
  "Trăm năm tình viên mãn, bạc đầu nghĩa phu thê. Chúc mừng hạnh phúc hai bạn!",
  "Chúc cô dâu chú rể mãi nắm chặt tay nhau đi hết chặng đường dài phía trước, luôn ấm êm và viên mãn.",
  "Chúc hai bạn một đời bình an, hạnh phúc trọn vẹn và luôn là điểm tựa vững chắc của nhau.",
];

export async function POST() {
  return NextResponse.json({
    success: true,
    wishes: WEDDING_WISHES,
  });
}
