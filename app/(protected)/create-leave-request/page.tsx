import EmployeeRequestList from "@/components/cards/employee-request-list";
import DashboardMetrics from "@/components/dashboard-metrics";
import LeaveRequestForm from "@/components/forms/leave-request-form";
import RecentApplications, {
  Application,
} from "@/components/recent-applications";
import LeaveRequestController from "@/controllers/leave-request-controller";

export default async function CreateRequest() {
  const test = async () => {
    LeaveRequestController.getMyRequests();
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

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="grid flex-1 items-start gap-4 p-4 pt-28 sm:px-6 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <DashboardMetrics />

          <LeaveRequestForm />
          <EmployeeRequestList />
        </div>
        <div>
          <RecentApplications />
        </div>
      </main>
    </div>
  );
}
