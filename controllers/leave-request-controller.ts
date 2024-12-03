import { createClient } from "@/utils/supabase/server";

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
}

export default LeaveRequestController;