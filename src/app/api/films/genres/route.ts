/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const authToken = req.headers.get("authorization"); 

    if (!authToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch("https://kata.conducerevel.com/films/genres", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken, 
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch genres");
    }

    const genres = await response.json();
    return NextResponse.json(genres, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}