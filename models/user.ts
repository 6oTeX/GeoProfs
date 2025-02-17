import { createClient } from "@/utils/supabase/server";
import { LeaveRequest, LeaveRequestData } from "./leave_request";
import { Department, DepartmentData } from "./department";

export interface UserData {
  id: string;
  avatar_url: string;
  updated_at: Date;
  username: string;
  full_name: string;
  saldo: number;
  email: string;
  leave_requests: LeaveRequestData[];
  department_id: string | null;
}

export class User {
  private m_data: UserData;
  private m_leave_requests: LeaveRequest[];
  private m_department: Department | null;

  public constructor(id: string | null = null) {
    this.m_data = User.getDefaultData();
    this.m_data.id = id ? id : "UNDEFINED";
    this.m_leave_requests = [];
    this.m_department = null;
  }

  public async pull(recursive = true): Promise<boolean> {
    // clear the leave requests
    this.m_leave_requests = [];

    const supabase = await createClient();

    if (this.m_data.id == "UNDEFINED") {
      const tmp_user = await supabase.auth.getUser();
      if (tmp_user.error) {
        return false;
      }
      this.m_data.id = tmp_user.data.user.id;
      await this.pull(recursive);
      return true;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", this.m_data.id)
      .single();
    if (error) {
      return false;
    }
    if (data) {
      // Map the fetched data to m_data
      this.m_data = {
        id: data.id,
        avatar_url: data.avatar_url,
        updated_at: new Date(data.updated_at),
        username: data.username,
        full_name: data.full_name,
        saldo: data.saldo,
        email: data.email,
        leave_requests: [],
        department_id: data.department_id,
      };

      if (recursive) {
        await this.pullLeaveRequests();

        if (this.m_data.department_id) {
          this.m_department = new Department(this.m_data.department_id);
          await this.m_department.pull(false);
        }
      }
    }
    return true;
  }

  public async pullLeaveRequests(): Promise<boolean> {
    const supabase = await createClient();
    // fetch all leave request belonging to this user
    const requests = await supabase
      .from("leave_requests")
      .select("id")
      .eq("user_id", this.m_data.id);
    if (requests.error) {
      return false;
    }
    if (requests.data) {
      for (let i = 0; i < requests.data.length; ++i) {
        const request = new LeaveRequest(requests.data[i].id);
        await request.pull();
        this.m_leave_requests.push(request);
      }
    }
    return true;
  }

  public async push(): Promise<boolean> {
    const supabase = await createClient();
    const response = await supabase
      .from("profiles")
      .update(this.m_data)
      .eq("id", this.m_data.id);
    return !response.error;
  }

  public get(): UserData {
    this.m_data.leave_requests = this.m_leave_requests.map((request) =>
      request.get(),
    );
    return this.m_data;
  }

  public set(data: UserData) {
    this.m_data = data;
  }

  public getLeaveRequests(): LeaveRequest[] {
    return this.m_leave_requests;
  }

  public getDepartment(): DepartmentData | null {
    return this.m_department ? this.m_department.get() : null;
  }

  public async isManagerOf(user: User): Promise<boolean> {
    const supabase = await createClient();

    await user.pull();
    const department_id = user.get().department_id;
    if (department_id != null) {
      // fetch department data
      const department = new Department(department_id);
      await department.pull();

      const manager = await department.getManager();
      if (manager) {
        await manager.pull();
        if (manager.get().id == this.m_data.id) {
          return true;
        }
      }
    }
    return false;
  }

  public async isManagedBy(user: User): Promise<boolean> {
    return !(await user.isManagerOf(this));
  }

  public async getManagedDepartments(): Promise<Department[]>
  {
    const departments: Department[] = [];

    const supabase = await createClient();
    if (!this.m_data.department_id)
    {
      return [];
    }
    const {data, error} = await supabase.from("departments").select("id").eq("manager",this.m_data.id);

    if (error)
    {
      console.error(error.message);
      return [];
    }

    for (let i = 0; i < data.length; ++i)
    {
      const department = new Department(data[i].id);
      await department.pull(true);
      departments.push(department);
    }

    return departments;
  }

  public static async getAll(): Promise<User[]> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("profiles").select("*");

    let users: User[] = [];
    if (error) {
      console.error(error.message);
      return users;
    }

    data.forEach((data) => {
      users.push(new User(data.id));
    });

    return users;
  }

  public static getDefaultData(): UserData {
    return {
      id: "",
      avatar_url: "",
      updated_at: new Date(),
      username: "",
      full_name: "",
      saldo: 0,
      email: "",
      leave_requests: [],
      department_id: null,
    };
  }
}
