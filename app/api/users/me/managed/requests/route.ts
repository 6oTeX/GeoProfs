import { Department, DepartmentData } from "@/models/department";
import { LeaveRequest } from "@/models/leave_request";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export async function GET() {
 
    const user = new User();
    await user.pull();
    const departments = await user.getManagedDepartments();

    let requests: LeaveRequest[] = [];
    for (let i = 0; i < departments.length; ++i)
    {
        requests = requests.concat(departments[i].getRequests());
    }

    const data = requests.map(request => request.get());

    return NextResponse.json({success: true, errors: [], data: data});

}
