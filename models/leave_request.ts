import { createClient } from "@/utils/supabase/server";
import { User, UserData } from "./user";
import { calculateWorkingHours } from "@/utils/workhours";

export interface LeaveRequestData {
    id: string;
    created_at: Date;
    start_date: Date;
    end_date: Date;
    explanation: string;
    state: string;
    reviewed_by: UserData | null;
    user_id: string;
    reason: string;
};

export class LeaveRequest 
{
    private m_data: LeaveRequestData;
    private m_reviewer: User | null;

    public constructor(id: string | null = null)
    {
        this.m_data = LeaveRequest.getDefaultData();
        this.m_data.id = id ? id : "UNDEFINED";
        this.m_reviewer = null;
    }

    public async pull(recursive = true): Promise<boolean>
    {
        if (this.m_data.id != "UNDEFINED")
        {
            return false;
        }
        const supabase = createClient();

        const {data, error} = await supabase.from("leave_requests").select("*").eq("id",this.m_data.id).single();
        
        if (error)
        {
            return false;
        }
        if (data) {
            // Map the fetched data to m_data
            this.m_data = {
                id: data.id,
                created_at: new Date(data.created_at),
                start_date: new Date(data.start_date),
                end_date: new Date(data.end_date),
                explanation: data.explanation,
                state: data.state,
                reviewed_by: null,
                user_id: data.user_id,
                reason: data.reason
            };

            if (this.m_data.state == "accepted" && data.reviewed_by)
            {
                await this.pullReviewer(data.reviewed_by);
            }
        }
        return true;
    }

    private async pullReviewer(reviewer_id: string)
    {
        this.m_reviewer = new User(reviewer_id);
        await this.m_reviewer.pull(false);
    }

    public async push(): Promise<boolean>
    {
        const supabase = createClient();
        if (this.m_data.id != "UNDEFINED")
        {
            const response = await supabase.from("leave_requests").update(this.m_data).eq("id",this.m_data.id);
            return (!response.error);
        }
        else
        {
            const insert_data = {
                start_date: this.m_data.start_date,
                end_date: this.m_data.end_date,
                explanation: this.m_data.explanation,
                reason: this.m_data.reason,
                state: 'submitted',
                reviewed_by: null,
                user_id: this.m_data.user_id
            };

            console.log({insert_data});
            
            const response = await supabase.from('leave_requests').insert(insert_data);
            if (response.error)
            {
                console.log(response.error.message);
            }
            return true;
        }
    }

    public async accept(reason: string): Promise<boolean>
    {
        // update users saldo
        const user = new User(this.m_data.user_id);
        await user.pull();
        let data = user.get();
        data.saldo -= calculateWorkingHours(this.m_data.start_date,this.m_data.end_date,9,17);
        user.set(data);
        await user.push();

        // update and push the request
        this.m_data.state = "accepted";
        await this.push();
        return true;
    }

    public async decline(reason: string): Promise<boolean>
    {
        // update and push the request
        this.m_data.state = "declined";
        return true;
    }

    public get(): LeaveRequestData
    {
        if (this.m_reviewer)
        {
            this.m_data.reviewed_by = this.m_reviewer.get();
        }
        return this.m_data;
    }

    public set(data: LeaveRequestData)
    {
        this.m_data = data;
    }

    public static getDefaultData(): LeaveRequestData
    {
        return {
            id: "",
            created_at: new Date(),
            start_date: new Date(),
            end_date: new Date(),
            explanation: "",
            state: "submitted",
            reviewed_by: User.getDefaultData(),
            user_id: "",
            reason: ""
        }
    }
};
