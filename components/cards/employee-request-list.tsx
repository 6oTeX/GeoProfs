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
            {sortedRequests.length > 0 ? (
                sortedRequests.map((element) => (
                    // The single request card.
                    <Card
                        key={element.id}
                        className={`flex items-center justify-between w-full max-w-md p-3 border rounded-lg ${
                            // Check if a leave request is active.
                            element.startDate <= currentDate && currentDate <= element.endDate
                                ? 'bg-accent hover:border-white hover:shadow-lg transition'
                                : currentDate < element.startDate
                                ? 'hover:bg-accent hover:shadow-md transition' 
                                : 'bg-inactive'
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
                                        ? 'text-green-800 bg-green-500'
                                        : element.state === 'submitted'
                                        ? 'text-orange-800 bg-orange-500'
                                        : element.state === 'declined'
                                        ? 'text-red-800 bg-red-500'
                                        : 'text-gray-700 bg-gray-500'
                                }`}
                            >
                                {element.state}
                            </div>
                        </div>
                    </Card>
                ))
            ) : (
                <div className="text-center text-sm text-muted-foreground">
                    Geen verlofaanvragen.
                </div>
            )}
        </div>
    );
}
