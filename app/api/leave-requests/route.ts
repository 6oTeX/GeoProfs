import LeaveRequestController from "@/controllers/leave-request-controller";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();

  let reason: string;
  if (data.reason == "Anders")
  {
    reason = data.customReason;
  }
  else
  {
    reason = data.reason;
  }

  const response = await LeaveRequestController.createRequest(reason,data.comments,new Date(data.dateStart),new Date(data.dateEnd));

  return NextResponse.json({
    success: response.success,
    errors: response.errors_txt,
  });
}

export async function GET() {

  const response = await LeaveRequestController.getMyRequests();
  return NextResponse.json(response);
}