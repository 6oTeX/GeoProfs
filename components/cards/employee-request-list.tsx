import LeaveRequestController from "@/controllers/leave-request-controller";
import { Separator } from "@/components/ui/separator"
import EmployeeRequestCard from "./employee-request-card";
import axios from "axios";

export default async function EmployeeRequestList() {
    // Check if user is a manager.
    const isManager = true;
    var requestsToGather;
    if (isManager)  {
        requestsToGather = await LeaveRequestController.getMyManagedRequests();
    } else {
        requestsToGather = await LeaveRequestController.getMyRequests();
    }
    const employeeRequestList = requestsToGather;
    const currentDate = new Date();
    let sortedRequests: any[] = [];
    if (Array.isArray(employeeRequestList))
    {
        const parsedRequests = employeeRequestList;
    
        // Separate into active, upcoming, and past requests.
        const activeRequests = parsedRequests.filter(
            (element) => element.start_date <= currentDate && element.end_date >= currentDate
        );
        const upcomingRequests = parsedRequests.filter(
            (element) => element.start_date > currentDate
        );
        const pastRequests = parsedRequests.filter(
            (element) => element.end_date < currentDate
        );
    
        // Sort each list by startDate.
        // activeRequests.sort((a, b) => a.start_date - b.start_date);
        // upcomingRequests.sort((a, b) => a.startDate - b.startDate);
        // pastRequests.sort((a, b) => a.startDate - b.startDate);
    
        const separator = { isSeparator: true, type: null };
    
        // Place all in one list with seperators between if there is a request in each group
        sortedRequests = [
            activeRequests.length > 0 ? { ...separator, type: 'active' } : null,
            ...activeRequests,
            upcomingRequests.length > 0 ? { ...separator, type: 'upcoming' } : null,
            ...upcomingRequests,
            pastRequests.length > 0 ? { ...separator, type: 'past' } : null,
            ...pastRequests,
        ].filter(Boolean);
        
    }
    // Render the requests and separators.
    return (
        <div className="flex flex-col gap-2">
            {sortedRequests.length > 0 ? (
                sortedRequests.map((element, index) => {
                    if (element.isSeparator) {
                        return (
                            <Separator
                                key={`separator-${index}`}
                                className="my-4 border-t-2"
                                // Label based on type of separator.
                                label={
                                    element.type === 'active'
                                    ? 'Huidige Verloven'
                                    : element.type === 'upcoming'
                                    ? 'Toekomstige Verloven'
                                    : element.type === 'past'
                                    ? 'Afgelopen Verloven'
                                    : ''
                                }
                            />
                        );
                    }

                    return (
                        // Render the request card.
                        <EmployeeRequestCard
                            key={element.id}
                            element={element}
                            currentDate={currentDate}
                            isManager={isManager}
                        />
                    );
                })
            ) : (
                <div className="text-center text-sm text-muted-foreground">
                    Geen verlofaanvragen.
                    <Separator />
                </div>
            )}
        </div>
    );
}