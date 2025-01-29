"use server";
import { createClient } from "@/utils/supabase/server";
import UserController from "./user-controller";

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

  /**
   * @brief get all requests of the logged in user
   *
   * @returns success
   * @returns data
   * @returns errors
   */
  public static async getMyRequests() {
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
    for (let i = 0; i < response.data.length; ++i) {
      const user = await supabase
        .from("profiles")
        .select("*")
        .eq("id", response.data[i].user_id);
      if (user.error) {
        response.errors.push(user.error.message);
        response.errors.push("Could not fetch user data");
        response.success = false;
      } else {
        response.data[i].userData = user.data[0];
      }
      if (response.data[i].reviewed_by) {
        const reviewByUser = await supabase
          .from("profiles")
          .select("*")
          .eq("id", response.data[i].reviewed_by);
        if (reviewByUser.error) {
          response.errors.push(reviewByUser.error.message);
          response.errors.push("Could not fetch reviewer user data");
          response.success = false;
        } else {
          delete reviewByUser.data[0].saldo;
          response.data[i].reviewByUser = reviewByUser.data[0];
        }
      } else {
        response.data[i].reviewByUser = {};
      }
    }
    return response;
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

  public static async getMyManagedRequests(): Promise<DataResponse> {
    const supabase = await createClient();
    let response: DataResponse = { success: false, errors: [], data: {} };

    // get user information
    const { user, error } = await UserController.getUser();
    if (error) {
      response.errors.push(error.message);
      response.success = false;
      return response;
    }
    if (!user) {
      response.success = false;
      response.errors.push("No auth-session");
      return response;
    }

    // get the departments you are managing
    const department = await supabase
      .from("departments")
      .select("*")
      .eq("manager_id", user.id);
    if (department.error) {
      response.success = false;
      response.errors.push(department.error.message);
      return response;
    }

    for (let i = 0; i < department.data.length; ++i) {
      // get the users you are managing
      const users = await supabase
        .from("profiles")
        .select("*")
        .eq("department_id", department.data[i].id);
      if (users.error) {
        response.success = false;
        response.errors.push(users.error.message);
      } else {
        for (let j = 0; j < users.data.length; ++i) {
          const requests = await supabase
            .from("leave_requests")
            .select("*")
            .eq("user_id", users.data[j].id);
          if (requests.error) {
            response.errors.push(requests.error.message);
            response.success = false;
          } else {
          }
        }
      }
    }

    return response;
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
      console.log("Editing saldo");
      const diff =
        (new Date(request.data[0].start_date).getTime() -
          new Date(request.data[0].end_date).getTime()) /
        (60 * 60 * 1000 * 3);
      console.log(diff);
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
