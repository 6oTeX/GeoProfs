import LeaveRequestController from "@/controllers/leave-request-controller";
import { NextRequest, NextResponse } from "next/server";

interface ContextParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, context: ContextParams) {
  const { id } = context.params;

  const response = {
    text: `Declined request: ${id}`,
  };
  return NextResponse.json(response);
}
