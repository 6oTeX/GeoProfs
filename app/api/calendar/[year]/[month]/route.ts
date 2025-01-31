import { LeaveRequest } from "@/models/leave_request";
import { isDateRangeInMonth } from "@/utils/month-overlap";
import { NextRequest, NextResponse } from "next/server";

interface ContextParams {
  params: {
    year: number;
    month: number;
  };
}

export async function GET(request: NextRequest, context: ContextParams) {
  // url params
  const { year, month } = context.params;

  // fetch all requests
  const requests = await LeaveRequest.getAll(true);

  // filter the data
  const data = requests
    .map((requests) => requests.get())
    .filter((data) => {
      return isDateRangeInMonth(data.start_date, data.end_date, year, month);
    });

  return NextResponse.json({ success: true, data: data });
}
