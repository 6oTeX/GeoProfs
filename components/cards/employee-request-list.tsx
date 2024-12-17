import LeaveRequestController from "@/controllers/leave-request-controller";
import { Card } from '../ui/card';
import { Separator } from "@/components/ui/separator"


export default async function EmployeeRequestList() {
    const employeeRequestList = await LeaveRequestController.getMyRequests();
    const currentDate = new Date();

    console.log(employeeRequestList.returnData);

    const parsedRequests = employeeRequestList.returnData.map((element) => ({
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
    const sortedRequests = [
        activeRequests.length > 0 ? { ...separator, type: 'active' } : null,
        ...activeRequests,
        activeRequests.length > 0 && upcomingRequests.length > 0 ? { ...separator, type: 'upcoming' } : null,
        ...upcomingRequests,
        upcomingRequests.length > 0 && pastRequests.length > 0 ? { ...separator, type: 'past' } : null,
        ...pastRequests,
    ].filter(Boolean);

    // Render the requests and separators.
    return (
        <div className="flex flex-col gap-2">
            {sortedRequests.length > 0 ? (
                sortedRequests.map((element, index) => {
                    // Render separators based on type.
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

                    // Render the request card.
                    return (
                        <Card
                            key={element.id}
                            className={`flex items-center justify-between w-full max-w-md p-3 border rounded-lg ${
                                    currentDate < element.endDate
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
                                    className={`px-2.5 py-0.1 text-xs font-medium rounded-lg flex items-center ${
                                        element.state === 'accepted'
                                            ? 'text-green-500'
                                            : element.state === 'submitted'
                                            ? 'text-orange-500'
                                            : element.state === 'declined'
                                            ? 'text-red-500'
                                            : 'text-gray-700'
                                    }`}
                                >
                                    {element.state}
                                </div>
                            </div>
                        </Card>
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

