"use server";
import { createClient } from "@/utils/supabase/server";
import { AuthError, User } from "@supabase/supabase-js";

class UserController {
  public static async getUser(): Promise<{
    user: User | null;
    error: AuthError | null;
  }> {
    const supabase = await createClient();
    const user = await supabase.auth.getUser();
    return {
      user: user.data.user,
      error: user.error,
    };
  }

  public static async updateSaldo(
    userId: string,
    addition: number
  ): Promise<boolean> {
    const supabase = await createClient();
    const user = await supabase.from("profiles").select("*").eq("id", userId);
    if (user.error) {
      return false;
    }

    const update = await supabase
      .from("profiles")
      .update({ saldo: user.data[0].saldo + addition });

    return true;
  }

  public static async getProfile(userId: string): Promise<{
    full_name: string;
    username: string;
    saldo: number;
    avatar_url: string;
  }> {
    const supabase = await createClient();
    const user = await supabase.from("profiles").select("*").eq("id", userId);
    if (user.error) {
      return {
        saldo: 0,
        full_name: "",
        username: "",
        avatar_url: "",
      };
    }

    return {
      saldo: user.data[0].saldo,
      full_name: user.data[0].full_name,
      username: user.data[0].username,
      avatar_url: user.data[0].avatar_url,
    };
  }

  public static async isManagerOf(userId: string): Promise<boolean> {
    const supabase = await createClient();
    const me = await this.getUser();

    // get the user information of the user
    const user = await supabase.from("profiles").select("*").eq("id", userId);
    if (user.error) {
      console.error(user.error);
      return false;
    }

    if (!user.data) {
      return false;
    }

    // check if user is manager of other users department
    const department = await supabase
      .from("departments")
      .select("*")
      .eq("id", user.data[0].department_id);
    if (department.error) {
      console.error(department.error);
      return false;
    }

    return department.data[0].manager_id == me.user?.aud;
  }
}

export default UserController;
