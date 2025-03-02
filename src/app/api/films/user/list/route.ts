import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const authToken = req.headers.get("authorization"); 
    if (!authToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    if (!body.id) {
      return NextResponse.json({ error: "Movie ID is required" }, { status: 400 });
    }

    const response = await fetch("https://kata.conducerevel.com/films/user/list/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken, 
      },
      body: JSON.stringify({ id: body.id }),
    });

    if (!response.ok) {
      throw new Error("Failed to add movie to user list");
    }

    const responseData = await response.json();
    return NextResponse.json(responseData, { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}