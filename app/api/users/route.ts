import { LeaveRequest } from "@/models/leave_request";
import { User, UserData } from "@/models/user";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

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



  for (let i = 0; i < users.length; ++i)
  {
    await users[i].pull(false);
    userData.push(users[i].get());
  }

  console.log(userData);

  return NextResponse.json({success: true, data: userData});
}

export async function PUT(request: NextRequest) {
  const {department,username,full_name,saldo,email} = await request.json();

  const user = new User();
  await user.pull(true);
  let data = user.get();
  if (department)
  {
    data.department_id = department;
  }
  if (username)
  {
    data.username = username;
  }
  if (full_name)
  {
    data.full_name = full_name;
  }
  if (saldo)
  {
    data.saldo = saldo;
  }
  if (email)
  {
    data.email = email;
  }
  data.department_id = department;
  user.set(data);
  await user.push();

  return NextResponse.json({success: true, data: user.get()});
}