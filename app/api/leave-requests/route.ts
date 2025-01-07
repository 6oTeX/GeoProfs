import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();

  return NextResponse.json({
    message: "Data received successfully",
    receivedData: data,
  });
}

export async function GET() {
  return NextResponse.json({ message: "This is a GET request to /api/dump" });
}
