import { User, UserData } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

interface ContextParams {
  params: {
    id: string;
  };
}
export async function GET(request: NextRequest, context: ContextParams) {
  const { id } = context.params;

  const user = new User(id);

  await user.pull(true);

  return NextResponse.json({ success: true, data: user.get() });
}
