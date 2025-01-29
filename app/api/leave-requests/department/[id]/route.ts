import { Department } from "@/models/department";
import { LeaveRequestData } from "@/models/leave_request";
import { NextRequest, NextResponse } from "next/server";

interface ContextParams {
    params: {
      id: string;
    };
  }

export async function GET(request: NextRequest, context: ContextParams) {

    // get the id
    const {id} = await context.params;

    // get the department
    const department = new Department(id);
    await department.pull(true);

    // get all requests from the department
    const requests = department.getRequests();
    const ret: LeaveRequestData[] = requests.map(request => request.get());

    // return the requests
    if (ret.length)
    {
        return NextResponse.json(ret);
    }
    else
    {
        return NextResponse.json({
            errors: ["No requests found"]
        })
    }
}