import LeaveRequestController from "@/controllers/leave-request-controller";
import { Card } from '../ui/card';
import Image from 'next/image'

    export default async function EmployeeRequestList()
    {
        
        const employeeRequestList = await LeaveRequestController.getMyRequests();

        console.log(employeeRequestList.returnData)
        return(
            // List with cards.
            <div className="flex flex-col gap-3">
                {employeeRequestList.returnData.map((element) => (
                    // The single request card.
                      <Card key={element.id} className="flex items-center justify-between w-full max-w-md p-3 border rounded-lg">
                        
                        <div className="flex items-center gap-3">
                            {/* <Image 
                            src={element.user_avatar_url} 
                            alt="User image" 
                            width={40} 
                            height={40}
                            className="rounded-full"    
                            /> */}
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">{element.reason}</span>
                                <span className="text-xs text-muted-foreground">{element.user_name}</span>
                                <span className="text-xs text-muted-foreground">{element.user_mail}</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex ">
                                <span className="text-sm font-medium flex justify-end">
                                    {new Intl.DateTimeFormat('en-GB').format(new Date(element.start_date))} - {new Intl.DateTimeFormat('en-GB').format(new Date(element.end_date))}
                                </span>
                            </div>
                            <div
                                className={`px-2.5 py-0.5 text-xs font-medium rounded-full flex items-center ${
                                element.state === 'accepted'
                                ? 'text-green-500 bg-green-50'
                                : element.state === 'submitted'
                                ? 'text-orange-500 bg-orange-50'
                                : element.state === 'declined'
                                ? 'text-red-500 bg-red-50'
                                : 'text-gray-500 bg-gray-50'
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