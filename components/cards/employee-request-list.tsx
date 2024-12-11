import LeaveRequestController from "@/controllers/leave-request-controller";
import { Card } from '../ui/card';
import Image from 'next/image';

export default async function EmployeeRequestList() {
    const employeeRequestList = await LeaveRequestController.getMyRequests();
    const currentDate = new Date();

    console.log(employeeRequestList.returnData);

    const parsedRequests = employeeRequestList.returnData.map((element) => ({
        ...element,
        // Dates from returnData parsed into Date types.
        startDate: new Date(element.start_date),
        endDate: new Date(element.end_date),
    }));

    // Sort the requests based on if they have passed or not.
    const upcomingOrActiveRequests = parsedRequests.filter(
        (element) => element.endDate >= currentDate
    );
    const pastRequests = parsedRequests.filter(
        (element) => element.endDate < currentDate
    );

    // Sort each group by startDate.
    upcomingOrActiveRequests.sort((a, b) => a.startDate - b.startDate);
    pastRequests.sort((a, b) => a.startDate - b.startDate);

    // Combine into one array.
    const sortedRequests = [...upcomingOrActiveRequests, ...pastRequests];

    return (
        <div className="flex flex-col gap-2">
            {sortedRequests.map((element) => (
                // The single request card.
                <Card
                    key={element.id}
                    className={`flex items-center justify-between w-full max-w-md p-3 border rounded-lg ${
                        // Check if a leave request is active.
                        element.startDate <= currentDate && currentDate <= element.endDate
                        ? 'border-white hover:opacity-80 hover:shadow-lg transition'
                        : currentDate < element.startDate
                        ? 'hover:opacity-75 hover:shadow-md transition' 
                        : 'opacity-50'
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
                        <div className="flex">
                            <span className="text-sm font-medium flex justify-start">
                                {new Intl.DateTimeFormat('en-GB').format(element.startDate)} - {new Intl.DateTimeFormat('en-GB').format(element.endDate)}
                            </span>
                        </div>
                        <div
                        // Changing the color based on the state.
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
    );
}
