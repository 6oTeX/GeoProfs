import { LeaveRequest } from "@/models/leave_request";
import { NextRequest, NextResponse } from "next/server";

interface ContextParams {
  params: {
    id: string;
  };
}

export async function PUT(request: NextRequest, context: ContextParams) {
  const { id } = context.params;
  const body = await request.json();

  // get the leave request in question
  const leave_request = new LeaveRequest(id);
  await leave_request.pull();

  // decline the request
  leave_request.decline(body.response);

  // push the new request state to supabase
  await leave_request.push();

  return NextResponse.json({ success: true, errors: [] });
}
