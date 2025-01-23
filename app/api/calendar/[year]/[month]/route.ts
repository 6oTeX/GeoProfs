import { LeaveRequest } from "@/models/leave_request";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  // select all requests
  const supabase = createClient();
  const {data, error} = await supabase.from("leave_requests").select("id");
  if (error)
  {
    console.error(error.message);
    return NextResponse.json({success: false,errors: [error.message]});
  }
 
  let ret: any[] = [];

  for (let i = 0; i < data.length; ++i)
  {
    const request = new LeaveRequest(data[i].id);
    await request.pull();
    ret.push(request.get());
  }

  return NextResponse.json({success: true, data: ret});
}
