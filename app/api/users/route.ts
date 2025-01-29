import { LeaveRequest } from "@/models/leave_request";
import { User, UserData } from "@/models/user";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await User.getAll();
  let userData: UserData[] = [];

  // users.forEach(async user => {
  //   const result = await user.pull();
  //   if (result)
  //   {
  //     userData.push(user.get());
  //   }
  // });

  for (let i = 0; i < users.length; ++i) {
    await users[i].pull(false);
    userData.push(users[i].get());
  }

  console.log(userData);

  return NextResponse.json({ success: true, data: userData });
}
