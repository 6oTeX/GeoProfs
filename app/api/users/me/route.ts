import { LeaveRequest } from "@/models/leave_request";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export async function GET() {
  const user = new User();
  await user.pull();
 
  return NextResponse.json(user.get());
}
