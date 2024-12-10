import LeaveRequestController from "@/controllers/leave-request-controller";
import { Card } from '../ui/card';
import Image from 'next/image'
import { date } from "zod";

    export default async function EmployeeRequestList()
    {
        const employeeRequestList = await LeaveRequestController.getMyRequests();

        console.log(employeeRequestList.returnData)
        return(
            // List with cards.
            <div className="flex flex-col gap-2">
                {employeeRequestList.returnData.map((element) => (
                    // The single request card.
                    <Card 
                        key={element.id} 
                        className={`flex items-center justify-between w-full max-w-md p-3 border rounded-lg ${
                            //element.reason === 'Vakantie'
                            element.dateStart < new Date() && new Date() < element.dateEnd
                            ? 'border-white'
                            : ''
                        }`}
                    >   
                        
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">{element.reason}</span>
                                <span className="text-xs text-muted-foreground">{element.user_name}</span>
                                <span className="text-xs text-muted-foreground">{element.user_mail}</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex ">
                                <span className="text-sm font-medium flex justify-start">
                                    {new Intl.DateTimeFormat('en-GB').format(new Date(element.start_date))} - {new Intl.DateTimeFormat('en-GB').format(new Date(element.end_date))}
                                </span>
                            </div>
                            <div
                                className={`px-2.5 py-0.1 text-xs font-medium rounded-lg flex items-center ${
                                element.state === 'accepted'
                                ? 'text-green-500 bg-green-200'
                                : element.state === 'submitted'
                                ? 'text-orange-500 bg-orange-200'
                                : element.state === 'declined'
                                ? 'text-red-500 bg-red-200'
                                : 'text-gray-500 bg-gray-200'
                                }`}
                            >
                                {element.state}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        )
    }