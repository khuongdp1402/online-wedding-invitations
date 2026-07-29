import { NextResponse } from "next/server";

const LEGACY_MSG =
  "Endpoint cũ đã ngừng dùng. Upload ảnh theo thiệp: POST /api/weddings/{weddingId}/upload (multipart, field file + slotKey).";

export async function GET() {
  return NextResponse.json(
    { error: "Gone", message: LEGACY_MSG },
    { status: 410 }
  );
}

export async function POST() {
  return NextResponse.json(
    { error: "Gone", message: LEGACY_MSG },
    { status: 410 }
  );
}
