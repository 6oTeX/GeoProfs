"use server";
import { createClient } from "@/utils/supabase/server";
import UserController from "./user-controller";

/**
 * @brief A controller which has access to the leave requests.
 *
 * @param reason the given reason
 *
 * @file leave-request-controller.ts
 * @author N.Janssen
 */
interface BlankResponse {
  success: boolean,
  errors: string[]
}

interface DataResponse {
  success: boolean,
  errors: string[],
  data: any
}

class LeaveRequestController {
  public static async createRequest(
    reason: string,
    explanation: string,
    start_date: Date,
    end_date: Date,
  ) {
    let response: BlankResponse = {success: true, errors: []};

    const current_date = new Date();
    if (start_date < current_date || end_date < current_date || start_date > end_date)
    {
      response.errors.push("Invalid date range");
      response.success = false;
      return response;
    }

    // get the auth-session
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      response.errors.push("No auth-session");
      response.success = false;
    } else {
      // insert the request
      const { error } = await supabase.from("leave_requests").insert({
        user_id: user.id,
        reason: reason,
        explanation: explanation,
        start_date: start_date.toDateString(),
        end_date: end_date.toDateString(),
      });

      // check if insert was successful
      if (error) {
        response.errors.push(error.message);
        response.success = false;
      }
    }
    return response;
  }

  /**
   * @brief get all requests of the logged in user
   *
   * @returns success
   * @returns data
   * @returns errors
   */
  public static async getMyRequests() {
    let response: DataResponse = {success: true,errors: [],data: {}};

    // get the auth-session
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      response.errors.push("No auth-session");
      response.success = false;
    } else {
      // insert the request
      const { data, error } = await supabase
        .from("leave_requests")
        .select("*")
        .eq("user_id", user.id);
      // check if fetch was successful
      if (data) {
        response.data = data;
      } else if (error) {
        response.errors.push(error.message);
        response.success = false;
      }
    }

    // get user data
    for (let i = 0; i < response.data.length; ++i)
    {
      const user = await supabase.from("profiles").select("*").eq("id",response.data[i].user_id);
      if (user.error)
      {
        response.errors.push(user.error.message);
        response.errors.push("Could not fetch user data");
        response.success = false;
      }
      else
      {
        response.data[i].userData = user.data[0];
      }
      if (response.data[i].reviewed_by)
      {
        const reviewByUser = await supabase.from("profiles").select('*').eq("id",response.data[i].reviewed_by);
        if (reviewByUser.error)
        {
          response.errors.push(reviewByUser.error.message);
          response.errors.push("Could not fetch reviewer user data");
          response.success = false;
        }
        else
        {
          delete reviewByUser.data[0].saldo;
          response.data[i].reviewByUser = reviewByUser.data[0];
        }
      }
      else
      {
        response.data[i].reviewByUser = {};
      }
    }
    console.log(response.data);
    return response;
  }

  public static async getMyRequestsFiltered(state: string) {
    let success = true;
    let errors_txt: string[] = [];
    let returnData = {};

    // get the auth-session
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      errors_txt.push("No auth-session");
      success = false;
    } else {
      // insert the request
      const { data, error } = await supabase
        .from("leave_requests")
        .select("*")
        .eq("user_id", user.id)
        .eq("state", state);
      // check if fetch was successful
      if (data) {
        returnData = data;
      } else if (error) {
        errors_txt.push(error.message);
        success = false;
      }
    }

    return { success, returnData, errors_txt };
  }

  public static async respond(id: string,to: string, response_text: string) : Promise<BlankResponse>
  {
    let response: BlankResponse = {success: true, errors: []};

    // get userdata
    const supabase = createClient();
    
    // get leave_request to accept
    const request = await supabase.from("leave_requests").select("*").eq("id",id);
    if (request.error)
    {
      response.success = false;
      response.errors.push(request.error.message);
      return response;
    }
    if (request.data.length <= 0)
    {
      response.success = false
      response.errors.push(`Could not find leave request with id: ${id}`);
      return response;
    }

    // check if user is manager of the user from the request
    if (await !UserController.isManagerOf(request.data[0].user_id))
    {
      response.success = false;
      response.errors.push(`You do not have permission to accept or decline this request`)
      return response;
    }

    // update the request
    await supabase.from("leave_requests").update({state: to,response: response_text}).eq("id",id);
    
    return response;
  }
}

export default LeaveRequestController;