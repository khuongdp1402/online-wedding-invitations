import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params: _params }: { params: { id: string } }
) {
  // TODO: Implement in Phase 2
  return NextResponse.json({ message: "Not implemented yet" }, { status: 501 });
}

export async function PUT(
  _request: Request,
  { params: _params }: { params: { id: string } }
) {
  // TODO: Implement in Phase 2
  return NextResponse.json({ message: "Not implemented yet" }, { status: 501 });
}

export async function DELETE(
  _request: Request,
  { params: _params }: { params: { id: string } }
) {
  // TODO: Implement in Phase 2
  return NextResponse.json({ message: "Not implemented yet" }, { status: 501 });
}
