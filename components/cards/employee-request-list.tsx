import LeaveRequestController from "@/controllers/leave-request-controller";
import { Separator } from "@/components/ui/separator";
import EmployeeRequestCard from "./employee-request-card";

export default async function EmployeeRequestList() {
  const { data, errors, success } =
    await LeaveRequestController.getMyRequests();
  const currentDate = new Date();

  const parsedRequests = data.map(
    (element: {
      start_date: string | number | Date;
      end_date: string | number | Date;
    }) => ({
      ...element,
      // Parse dates from returnData into Date objects.
      startDate: new Date(element.start_date),
      endDate: new Date(element.end_date),
    }),
  );

  // Separate into active, upcoming, and past requests.
  const activeRequests = parsedRequests.filter(
    (element: { startDate: Date; endDate: Date }) =>
      element.startDate <= currentDate && element.endDate >= currentDate,
  );
  const upcomingRequests = parsedRequests.filter(
    (element: { startDate: Date }) => element.startDate > currentDate,
  );
  const pastRequests = parsedRequests.filter(
    (element: { endDate: Date }) => element.endDate < currentDate,
  );

  // Sort each list by startDate.
  activeRequests.sort(
    (a: { startDate: Date }, b: { startDate: Date }) =>
      a.startDate.getTime() - b.startDate.getTime(),
  );
  upcomingRequests.sort(
    (a: { startDate: Date }, b: { startDate: Date }) =>
      a.startDate.getTime() - b.startDate.getTime(),
  );
  pastRequests.sort(
    (a: { startDate: Date }, b: { startDate: Date }) =>
      a.startDate.getTime() - b.startDate.getTime(),
  );

  const separator = { isSeparator: true, type: null };

  // Place all in one list with seperators between if there is a request in each group
  const sortedRequests = [
    activeRequests.length > 0 ? { ...separator, type: "active" } : null,
    ...activeRequests,
    activeRequests.length > 0 && upcomingRequests.length > 0
      ? { ...separator, type: "upcoming" }
      : null,
    ...upcomingRequests,
    upcomingRequests.length > 0 && pastRequests.length > 0
      ? { ...separator, type: "past" }
      : null,
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
                  element.type === "active"
                    ? "Huidige Verloven"
                    : element.type === "upcoming"
                      ? "Toekomstige Verloven"
                      : element.type === "past"
                        ? "Afgelopen Verloven"
                        : ""
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
