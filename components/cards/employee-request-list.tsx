import LeaveRequestController from "@/controllers/leave-request-controller";
import { Card } from '../ui/card';

    export default function EmployeeRequestList()
    {
        console.log(LeaveRequestController.getMyRequests())
        return(

            // Map the getMyRequests into cards.
            <Card>
                
            </Card>
        
        )
    }