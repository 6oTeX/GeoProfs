import LeaveRequestController from "@/controllers/leave-request-controller";
import { NextRequest, NextResponse } from "next/server";
import translate from "translate";

interface ContextParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, context: ContextParams) {
  const { id } = context.params;

  const response = await LeaveRequestController.respond(
    id,
    "accepted",
    "Of course my friend",
  );
  return NextResponse.json(response);
}
