import { createClient } from "@/utils/supabase/server";
import { User } from "./user";

export interface DepartmentData {
    id: string,
    name: string,
    manager: string,
}

export class Department {

    private m_data: DepartmentData;
    private m_manager: User | null;

    public constructor(id: string)
    {
        this.m_data = {
            id: id,
            name: "",
            manager: ""
        }
        this.m_manager = null;
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

    public getManager(): User | null
    {
        return this.m_manager;
    }


};