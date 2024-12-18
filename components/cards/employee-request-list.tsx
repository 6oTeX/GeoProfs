import LeaveRequestController from "@/controllers/leave-request-controller";
import { Separator } from "@/components/ui/separator"
import EmployeeRequestCard from "./employee-request-card";

export default async function EmployeeRequestList() {
    const employeeRequestList = await LeaveRequestController.getMyRequests();
    const currentDate = new Date();

    const parsedRequests = employeeRequestList.returnData.map((element) => ({
        ...element,
        startDate: new Date(element.start_date),
        endDate: new Date(element.end_date),
    }));

    const activeRequests = parsedRequests.filter(
        (element) => element.startDate <= currentDate && element.endDate >= currentDate
    );
    const upcomingRequests = parsedRequests.filter(
        (element) => element.startDate > currentDate
    );
    const pastRequests = parsedRequests.filter(
        (element) => element.endDate < currentDate
    );

    activeRequests.sort((a, b) => a.startDate - b.startDate);
    upcomingRequests.sort((a, b) => a.startDate - b.startDate);
    pastRequests.sort((a, b) => a.startDate - b.startDate);

    const separator = { isSeparator: true, type: null };

    const sortedRequests = [
        activeRequests.length > 0 ? { ...separator, type: 'active' } : null,
        ...activeRequests,
        activeRequests.length > 0 && upcomingRequests.length > 0 ? { ...separator, type: 'upcoming' } : null,
        ...upcomingRequests,
        upcomingRequests.length > 0 && pastRequests.length > 0 ? { ...separator, type: 'past' } : null,
        ...pastRequests,
    ].filter(Boolean);

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

