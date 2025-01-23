import LeaveRequestController from "@/controllers/leave-request-controller";
import { LeaveRequest } from "@/models/leave_request";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const submitData = await request.json();

  let reason: string;
  if (submitData.reason == "Anders") {
    reason = submitData.customReason;
  } else {
    reason = submitData.reason;
  }
  

  const user = new User();
  await user.pull();
  
  // create a new, empty request object
  const req = new LeaveRequest();
  const data = req.get();

  // set the new data
  data.start_date = submitData.dateStart;
  data.end_date = submitData.dateEnd;
  data.reason = reason;
  data.explanation = submitData.comments;
  data.user_id = user.get().id;

  // push the data to the db
  req.set(data);
  await req.push();

  console.log("REQUEST MADE");

  return NextResponse.json({
    success: true,
    errors: [],
  });
}

export async function GET() {
  const response = await LeaveRequestController.getMyRequests();
  return NextResponse.json(response);
}
