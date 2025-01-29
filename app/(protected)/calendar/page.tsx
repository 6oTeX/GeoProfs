import Calender from "@/components/Calender";
import DashboardMetrics from "@/components/DashboardMetrics";
import RecentApplications, {
  Application,
} from "@/components/RecentApplications";
import { LeaveRequest, LeaveRequestData } from "@/models/leave_request";

interface UserData {
  id: string;
  name: string;
  team: string;
}

type EventData = Record<string, { team: string; furloughNames: string[]; sickNames: string[] }[]>;

function transformLeaveRequests(leaveRequests: LeaveRequestData[]): EventData {
  const events: EventData = {};


  leaveRequests.forEach((request) => {
    if (!request.user) {
      console.log("ALPHA");
      return;
    }

    const startDate = new Date(request.start_date);
    const endDate = new Date(request.end_date);

    for (
      let date = new Date(startDate);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      const dateString = date.toISOString().split("T")[0]; // Format as YYYY-MM-DD

      if (!events[dateString]) {
        events[dateString] = [];
      }

      let teamEntry = events[dateString].find((entry) => entry.team === request.user!.department_id);
      if (!teamEntry) {
        teamEntry = { team: request.user.department_id ? request.user.department_id : "Algemeen", furloughNames: [], sickNames: [] };
        events[dateString].push(teamEntry);
      }

      if (request.state === "accepted") {
        teamEntry.furloughNames.push(request.user.full_name);
      } else if (request.state === "submitted") {
        teamEntry.sickNames.push(request.user.full_name);
      }
    }
  });
  return events;
}

export default async function CalenderPage() {


  const requests = await LeaveRequest.getAll();

  const events = transformLeaveRequests(requests.map(req => req.get()));

  const applications: Application[] = [
    {
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      status: "approved",
    },
    {
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      status: "rejected",
    },
    {
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      status: "pending",
    },
  ];

  // Dynamically calculate the counts
  const processedEvents = Object.fromEntries(
    Object.entries(events).map(([date, eventArray]) => [
      date,
      eventArray.map(({ furloughNames, sickNames, team }) => ({
        furlough: furloughNames.length,
        sick: sickNames.length,
        furloughNames,
        sickNames,
        team,
      })),
    ]),
  );

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="grid flex-1 items-start gap-4 p-4 pt-28 sm:px-6 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <DashboardMetrics />

          <Calender events={processedEvents} />
        </div>
        <div>
          <RecentApplications />
        </div>
      </main>
    </div>
  );
}
