import LeaveRequestController from "@/controllers/leave-request-controller";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();

  const response = await LeaveRequestController.createRequest(data.reason,data.comments,new Date(data.dateStart),new Date(data.dateEnd));

  return NextResponse.json({
    success: response.success,
    errors: response.errors_txt,
  });
}

export async function GET() {
  return NextResponse.json({ message: "This is a GET request to /api/dump" });
}