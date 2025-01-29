import Calender from "@/components/Calender";
import DashboardMetrics from "@/components/dashboard-metrics";
import RecentApplications, {
  Application,
} from "@/components/recent-applications";

export default async function CalenderPage() {
  const events = {
    "2025-01-02": [
      {
        team: "ICT",
        furloughNames: ["David"],
        sickNames: ["Eve", "Frank"],
      },
      {
        team: "Finance",
        furloughNames: ["Alice", "Jane"],
        sickNames: ["Bob"],
      },
    ],
    "2025-01-03": [
      {
        furloughNames: ["Alice", "Bob"],
        sickNames: ["Charlie"],
        team: "HRM",
      },
    ],
    "2025-01-05": [
      {
        furloughNames: ["David", "Eve", "Frank", "Alice", "Bob", "Charlie"],
        sickNames: ["Dave", "Jake"],
        team: "Finance",
      },
    ],
    "2025-01-07": [
      {
        furloughNames: ["David", "Eve"],
        sickNames: ["Dave", "Jake"],
        team: "Finance",
      },
    ],
    "2025-01-08": [
      {
        furloughNames: ["David", "Bob", "Charlie"],
        sickNames: ["Dave", "Jake"],
        team: "ICT",
      },
    ],
  };

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
