"use server";
import { createClient } from "@/utils/supabase/server";
import UserController from "./user-controller";
import { LeaveRequest } from "@/models/leave_request";
import { User } from "@/models/user";

// helper function to calculate the amount of workhours in a set date range
function calculateWorkHours(startDate: string, endDate: string) {
  // Parse the input dates
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (!start || !end || start > end) {
    return -1;
  }

  let totalWorkHours = 0;

  for (
    let date = new Date(start);
    date <= end;
    date.setDate(date.getDate() + 1)
  ) {
    const day = date.getDay();
    // Monday to Friday are workdays (1 to 5)
    if (day >= 1 && day <= 5) {
      totalWorkHours += 8;
    }
  }

  return totalWorkHours;
}

/**
 * @brief A controller which has access to the leave requests.
 *
 * @param reason the given reason
 *
 * @file leave-request-controller.ts
 * @author N.Janssen
 */
interface BlankResponse {
  success: boolean;
  errors: string[];
}

interface DataResponse {
  success: boolean;
  errors: string[];
  data: any;
}

class LeaveRequestController {
  public static async createRequest(
    reason: string,
    explanation: string,
    start_date: Date,
    end_date: Date,
  ) {
    let response: BlankResponse = { success: true, errors: [] };

    // check if the date range is valid
    const current_date = new Date();
    if (
      start_date < current_date ||
      end_date < current_date ||
      start_date > end_date
    ) {
      response.errors.push("Invalid date range");
      response.success = false;
      return response;
    }

    // get the auth-session
    const supabase = await createClient();
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

  public static async getRequestsByDepartment(
    department_id: string,
  ): Promise<DataResponse> {
    let response: DataResponse = { success: true, errors: [], data: {} };

    const supabase = createClient();

    return response;
  }

  public static async getMyManagedRequests()
  {
        const user = new User();
        await user.pull();
        const departments = await user.getManagedDepartments();
    
        let requests: LeaveRequest[] = [];
        for (let i = 0; i < departments.length; ++i)
        {
            requests = requests.concat(departments[i].getRequests());
        }
    
        const data = requests.map(request => request.get());

        return data;
  }

  /**
   * @brief get all requests of the logged in user
   *
   * @returns success
   * @returns data
   * @returns errors
   */
  public static async getMyRequests() {
    const user = new User();
    await user.pull(true);
    return user.getLeaveRequests().map(request => request.get());
  }

  public static async getMyRequestsFiltered(state: string) {
    let success = true;
    let errors_txt: string[] = [];
    let returnData = {};

    // get the auth-session
    const supabase = await createClient();
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

  public static async respond(
    id: string,
    to: string,
    response_text: string,
  ): Promise<BlankResponse> {
    let response: BlankResponse = { success: true, errors: [] };

    // get userdata
    const supabase = await createClient();

    // get leave_request to accept
    const request = await supabase
      .from("leave_requests")
      .select("*")
      .eq("id", id);
    if (request.error) {
      response.success = false;
      response.errors.push(request.error.message);
      return response;
    }
    if (request.data.length <= 0) {
      response.success = false;
      response.errors.push(`Could not find leave request with id: ${id}`);
      return response;
    }

    // check if user is manager of the user from the request
    if (await !UserController.isManagerOf(request.data[0].user_id)) {
      response.success = false;
      response.errors.push(
        `You do not have permission to accept or decline this request`,
      );
      return response;
    }

    // update the request
    await supabase
      .from("leave_requests")
      .update({ state: to, response: response_text })
      .eq("id", id);

    // update saldo
    if (to == "accepted") {
      // calculate saldo
      const diff =
        (new Date(request.data[0].start_date).getTime() -
          new Date(request.data[0].end_date).getTime()) /
        (60 * 60 * 1000 * 3);
    }

    return response;
  }

  public static async getCurrentPresentUsers(): Promise<{
    success: boolean;
    errors: string[];
    data: any;
  }> {
    let response: DataResponse = { success: true, errors: [], data: [] };

    // get the auth-session
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      response.errors.push("No auth-session");
      response.success = false;
    } else {
      // get all leave requests
      const { data, error } = await supabase.from("leave_requests").select("*");
      if (error) {
        response.errors.push(error.message);
        response.success = false;
      } else {
        // get all users
        const users = await supabase.from("profiles").select("*");
        if (users.error) {
          response.errors.push(users.error.message);
          response.success = false;
        } else {
          let presentUsers: any[] = [];
          let absentUsers: any[] = [];
          // filter out the users who are not present
          for (let i = 0; i < users.data.length; ++i) {
            let isOnLeave = false;
            for (let j = 0; j < data.length; ++j) {
              if (
                data[j].user_id == users.data[i].id &&
                data[j].state == "accepted"
              ) {
                isOnLeave = true;
              }
            }
            if (isOnLeave) {
              absentUsers.push(users.data[i]);
            } else {
              presentUsers.push(users.data[i]);
            }
          }
          response.data = { present: presentUsers, absent: absentUsers };
        }
      }
    }

    return response;
  }
}

export default LeaveRequestController;
