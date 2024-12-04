import LeaveRequestController from "@/controllers/leave-request-controller";
import { Card } from '../ui/card';
import Image from 'next/image'

    export default function EmployeeRequestList()
    {
        
        const employeeRequestList = LeaveRequestController.getMyRequests();

        console.log(employeeRequestList)
        return(
            <div className="flex flex-col gap-3">
                <Card className="flex items-center justify-between w-full max-w-md p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                        <Image 
                        src="/placeholder.svg?height=40&width=40" 
                        alt="User image" 
                        width={40} 
                        height={40}
                        className="rounded-full"
                        />
                        <div className="flex flex-col">
                        <span className="text-sm font-medium">Olivia Martin</span>
                        <span className="text-xs text-muted-foreground">olivia.martin@email.com</span>
                        </div>
                    </div>
                    <div className="px-2.5 py-0.5 text-xs font-medium text-emerald-500 bg-emerald-50 rounded-full">
                        Status
                    </div>
                </Card>
                <Card className="flex items-center justify-between w-full max-w-md p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                        <Image 
                        src="/placeholder.svg?height=40&width=40" 
                        alt="User image" 
                        width={40} 
                        height={40}
                        className="rounded-full"
                        />
                        <div className="flex flex-col">
                        <span className="text-sm font-medium">Olivia Martin</span>
                        <span className="text-xs text-muted-foreground">olivia.martin@email.com</span>
                        </div>
                    </div>
                    <div className="px-2.5 py-0.5 text-xs font-medium text-orange-500 bg-orange-50 rounded-full">
                        Status
                    </div>
                </Card>
                <Card className="flex items-center justify-between w-full max-w-md p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                        <Image 
                        src="/placeholder.svg?height=40&width=40" 
                        alt="User image" 
                        width={40} 
                        height={40}
                        className="rounded-full"
                        />
                        <div className="flex flex-col">
                        <span className="text-sm font-medium">Olivia Martin</span>
                        <span className="text-xs text-muted-foreground">olivia.martin@email.com</span>
                        </div>
                    </div>
                    <div className="px-2.5 py-0.5 text-xs font-medium text-red-500 bg-red-50 rounded-full">
                        Status
                    </div>
                </Card>
            </div>
        )
    }