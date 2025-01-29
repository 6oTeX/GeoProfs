import { User, UserData } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

interface ContextParams {
    params: {
      id: string;
    };
  }
export async function GET(request: NextRequest, context: ContextParams) {
  const {id} = context.params;

  const user = new User(id);

  await user.pull(true);

  return NextResponse.json({success: true, data: user.get()});
}

export async function PUT(request: NextRequest, context: ContextParams) {
  const {id} = context.params;
  const {department,username,full_name,saldo,email} = await request.json();

  const user = new User(id);
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