import { LeaveRequest } from "@/models/leave_request";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export async function GET() {
  
  const user = new User();
  await user.pull();
  
  // create a new, empty request object
  const req = new LeaveRequest();
  const data = req.get();

  // set the new data
  data.start_date = new Date();
  data.end_date = new Date();
  data.explanation = "test request!";
  data.user_id = user.get().id;

  // push the data to the db
  req.set(data);
  await req.push();

  return NextResponse.json(req.get());
}
