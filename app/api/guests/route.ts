import { NextResponse } from "next/server";

export async function GET() {
  // TODO: Implement in Phase 3
  return NextResponse.json({ guests: [] });
}

export async function POST() {
  // TODO: Implement in Phase 3
  return NextResponse.json({ message: "Not implemented yet" }, { status: 501 });
}
