import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authToken = req.cookies.get("authToken");

  if (!authToken) {
    return NextResponse.json({ user: null, token: null }, { status: 401 });
  }

  return NextResponse.json({ user: true, token: authToken.value }, { status: 200 });
}
