import { createClient } from "@/utils/supabase/server";
import { User } from "./user";
import { LeaveRequest } from "./leave_request";

export interface DepartmentData {
    id: string,
    name: string,
    manager: string,
}

export class Department {

    private m_data: DepartmentData;
    private m_manager: User | null;
    private m_users: User[];

    public constructor(id: string)
    {
        this.m_data = {
            id: id,
            name: "",
            manager: ""
        }
        this.m_manager = null;
        this.m_users = [];
    }

    public async pull(recursive = false): Promise<boolean>
    {
        const supabase = await createClient();

        const {data, error} = await supabase.from("departments").select("*").eq("id",this.m_data.id).single();

        if (error)
        {
            console.log(error.message);
            return false;
        }
        if (data)
        {
            this.m_data = data;
        }

        if (recursive)
        {
            await this.pullUsers();
        }

        return true;
    }

    public async push() : Promise<boolean>
    {
        const supabase = await createClient();
        
        const {error} = await supabase.from("departments").update(this.m_data).eq("id",this.m_data.id);
        if (error)
        {
            console.log(error.message);
            return false;
        }
        return true;
    }

    public get()
    {
        return this.m_data;
    }
    
    public set(data: DepartmentData)
    {
        this.m_data = data;
    }

    public getUsers()
    {
        return this.m_users;
    }

    public getRequests()
    {
        let requests: LeaveRequest[] = [];
        this.m_users.forEach(user => {
            requests = requests.concat(user.getLeaveRequests());
        });
        return requests;
    }

    public getManager(): User | null
    {
        return this.m_manager;
    }

    private async pullUsers()
    {
        const supabase = await createClient();
        const {data, error} = await supabase.from("profiles").select("id").eq("department_id",this.m_data.id);
        if (error)
        {
            console.error(error);
            return;
        }

        for (let i = 0; i < data.length; ++i)
        {
            const user = new User(data[i].id);
            await user.pull(true);
            this.m_users.push(user);
        }
    }
};