import LeaveRequestController from "@/controllers/leave-request-controller";
import { Separator } from "@/components/ui/separator"
import EmployeeRequestCard from "./employee-request-card";

export default async function EmployeeRequestList() {
    const employeeRequestList = await LeaveRequestController.getMyRequests();
    const currentDate = new Date();
    let sortedRequests: any[] = [];
    if (Array.isArray(employeeRequestList.data))
    {
        const parsedRequests = employeeRequestList.data.map((element) => ({
            ...element,
            // Parse dates from returnData into Date objects.
            startDate: new Date(element.start_date),
            endDate: new Date(element.end_date),
        }));
    
        // Separate into active, upcoming, and past requests.
        const activeRequests = parsedRequests.filter(
            (element) => element.startDate <= currentDate && element.endDate >= currentDate
        );
        const upcomingRequests = parsedRequests.filter(
            (element) => element.startDate > currentDate
        );
        const pastRequests = parsedRequests.filter(
            (element) => element.endDate < currentDate
        );
    
        // Sort each list by startDate.
        activeRequests.sort((a, b) => a.startDate - b.startDate);
        upcomingRequests.sort((a, b) => a.startDate - b.startDate);
        pastRequests.sort((a, b) => a.startDate - b.startDate);
    
        const separator = { isSeparator: true, type: null };
    
        // Place all in one list with seperators between if there is a request in each group
        sortedRequests = [
            activeRequests.length > 0 ? { ...separator, type: 'active' } : null,
            ...activeRequests,
            activeRequests.length > 0 && upcomingRequests.length > 0 ? { ...separator, type: 'upcoming' } : null,
            ...upcomingRequests,
            upcomingRequests.length > 0 && pastRequests.length > 0 ? { ...separator, type: 'past' } : null,
            ...pastRequests,
        ].filter(Boolean);
    }

    const parsedRequests = employeeRequestList.returnData.map((element) => ({
        ...element,
        // Parse dates from returnData into Date objects.
        startDate: new Date(element.start_date),
        endDate: new Date(element.end_date),
        createdAtDate: new Date(element.created_at),
    }));

    // Separate into active, upcoming, and past requests.
    const activeRequests = parsedRequests.filter(
        (element) => element.startDate <= currentDate && element.endDate >= currentDate
    );
    const upcomingRequests = parsedRequests.filter(
        (element) => element.startDate > currentDate
    );
    const pastRequests = parsedRequests.filter(
        (element) => element.endDate < currentDate
    );

    // Sort each list by startDate.
    activeRequests.sort((a, b) => a.startDate - b.startDate);
    upcomingRequests.sort((a, b) => a.startDate - b.startDate);
    pastRequests.sort((a, b) => a.startDate - b.startDate);

    const separator = { isSeparator: true, type: null };

    // Place all in one list with seperators between if there is a request in each group
    const sortedRequests = [
        activeRequests.length > 0 ? { ...separator, type: 'active' } : null,
        ...activeRequests,
        upcomingRequests.length > 0 ? { ...separator, type: 'upcoming' } : null,
        ...upcomingRequests,
        pastRequests.length > 0 ? { ...separator, type: 'past' } : null,
        ...pastRequests,
    ].filter(Boolean);

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
                        <EmployeeRequestCard
                            key={element.id}
                            element={element}
                            currentDate={currentDate}
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

