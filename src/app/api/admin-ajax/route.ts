import { NextResponse } from "next/server";

/** Placeholder for WordPress admin-ajax (static clone – no backend). */
export async function POST() {
  return NextResponse.json({ success: false }, { status: 501 });
}

export async function GET() {
  return NextResponse.json({ success: false }, { status: 501 });
}
