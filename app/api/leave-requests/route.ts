import { supabaseClient } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";
import RequestValidator from "../validator";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {

  
  // Define all request parameters, these are used for validating
  const requestParams = [
    {
      name: "reason",
      required: true,
      type: "string"
    },
    {
      name: "explanation",
      required: true,
      type: "string"
    },
    {
      name: "start-date",
      required: true,
      type: "date"
    },
    {
      name: "end-date",
      required: true,
      type: "date"
    }
  ]


  const validator = new RequestValidator(request, requestParams);
  const params = new URL(request.url).searchParams;
  let message_txt: string = "Something went wrong";
  let errors_txt: string[] = [];

  // check if params are valid
  const { success, errors } = validator.valid();
  if (!success) {
    errors_txt = errors_txt.concat(errors);
  }

  // get the auth-session
  const supabase = createClient();
  const currentUser = await supabase.auth.getUser();
  // check if the caller is a logged in user
  if (!currentUser.data.user) {
    errors_txt.push("No auth-session");
  }
  else
  {    
    // insert the request
    const { error } = await supabaseClient.from('leave_requests').insert({ 
      user_id: currentUser.data.user., 
      reason: params.get("reason"),
      explanation: params.get("explanation"),
      start_date: params.get("start-date"), 
      end_date: params.get("end-date"), 
      
    })
    
    // check if insert was successful
    if (error) {
      errors_txt.push(error.message);
    }
    else {
      message_txt = "Success!"
    }
  }

  const response = NextResponse.json({
    message: message_txt,
    errors: errors_txt
  })
  return response;
}

export async function GET(request: Request) {
  return NextResponse.json({ message: "This is a GET request to /api/leave-requests" });
}
