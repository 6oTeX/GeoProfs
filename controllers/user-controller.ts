"use server";
import translate from "translate";
import { createClient } from "@/utils/supabase/server";
import { AuthError, User } from "@supabase/supabase-js";

class UserController {

    public static async getUser(): Promise<{user: User | null, error: AuthError | null}>
    {
        const supabase = createClient();
        const user = await supabase.auth.getUser();            
        return {
            user: user.data.user,
            error: user.error
        }
    }

    public static async updateSaldo(userId: string,addition: number): Promise<boolean>
    {
        const supabase = createClient();
        const user = await supabase.from("profiles").select("*").eq("id",userId);
        if (user.error)
        {
            return false;
        }

        const update = await supabase.from("profiles").update({saldo: user.data[0].saldo + addition});

        return true;
    }

    public static async isManagerOf(userId: string): Promise<boolean>
    {
        const supabase = createClient();
        const me = await this.getUser();

        // get the user information of the user
        const user = await supabase.from("profiles").select("*").eq("id",userId);
        if (user.error)
        {
            console.error(user.error);
            return false;
        }

        if (!user.data)
        {
            return false;
        }

        // check if user is manager of other users department
        const department = await supabase.from("departments").select("*").eq("id",user.data[0].department_id);
        if (department.error)
        {
            console.error(department.error);
            return false;
        }

        return (department.data[0].manager_id == me.user?.aud)
    }
}

export default UserController;