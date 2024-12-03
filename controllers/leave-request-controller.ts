import { createClient } from "@/utils/supabase/server";

/**
 * @brief A controller which has access to the leave requests.
 * 
 * @file leave-request-controller.ts
 * @author N.Janssen
 */
class LeaveRequestController {
    public static async createRequest(reason: string, explanation: string, start_date: Date, end_date: Date) {
        let success = true;
        let errors_txt: string[] = [];

        // get the auth-session
        const supabase = createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
            errors_txt.push("No auth-session");
            success = false;
        }
        else {
            // insert the request
            const { error } = await supabase.from('leave_requests').insert({
                user_id: user.id,
                reason: reason,
                explanation: explanation,
                start_date: start_date.toDateString(),
                end_date: end_date.toDateString()
            })

            // check if insert was successful
            if (error) {
                errors_txt.push(error.message);
                success = false;
            }
        }

        console.log(errors_txt);
        return {success, errors_txt};
    }

    /**
     * @brief get all requests of the logged in user
     * 
     * @returns success 
     * @returns data
     * @returns errors
     */
    public static async getMyRequests() {
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
        }
        else {
            // insert the request
            const { data, error } = await supabase.from('leave_requests').select("*").eq("user_id",user.id)
            // check if fetch was successful
            if (data) {
                returnData = data;
            }
            else if (error)
            {
                errors_txt.push(error.message);
                success = false;
            }
        }
        return {success, returnData, errors_txt};
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
         }
         else {
             // insert the request
             const { data, error } = await supabase.from('leave_requests').select("*").eq("user_id",user.id).eq("state", state);
             // check if fetch was successful
             if (data) {
                 returnData = data;
             }
             else if (error)
             {
                 errors_txt.push(error.message);
                 success = false;
             }
         }
    
        return {success, returnData, errors_txt};

    }
}

export default LeaveRequestController;