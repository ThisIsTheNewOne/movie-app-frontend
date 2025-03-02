/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const authToken = req.headers.get("authorization");
    if (!authToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch("https://kata.conducerevel.com/films/auth/sign-out", {
      method: "GET",
      headers: {
        Authorization: authToken, 
      },
    });

    if (!response.ok) {
      throw new Error("Failed to sign out");
    }

    return NextResponse.json({ message: "Successfully signed out" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}