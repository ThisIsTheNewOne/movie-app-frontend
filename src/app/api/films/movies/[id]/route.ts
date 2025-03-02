/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authToken = req.headers.get("authorization"); 

    if (!authToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params; 
    if (!id) {
      return NextResponse.json({ error: "Movie ID is required" }, { status: 400 });
    }

    const response = await fetch(`https://kata.conducerevel.com/films/movies/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken, 
      },
    }); 

    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }

    const movieDetails = await response.json();
    return NextResponse.json(movieDetails, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
