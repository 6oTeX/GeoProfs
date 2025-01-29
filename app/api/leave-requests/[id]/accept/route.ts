import { LeaveRequest } from "@/models/leave_request";
import { NextRequest, NextResponse } from "next/server";

interface ContextParams {
  params: {
    id: string;
  };
}

export async function PUT(request: NextRequest, context: ContextParams) {
  const {id} = await context.params;
  const {requestId,status,response} = await request.json();

  console.log(response);

  // get the leave request in question
  const leave_request = new LeaveRequest(id);
  await leave_request.pull();
  await leave_request.accept(response);


  return NextResponse.json({success: true, errors: []});
}
