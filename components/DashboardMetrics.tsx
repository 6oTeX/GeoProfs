import { Calendar, Clock, Activity, PersonStanding } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import LeaveRequestController from "@/controllers/leave-request-controller";
import UserController from "@/controllers/user-controller";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

// Card component for the metrics on the dashboard
function MetricCard({ title, value, change, icon }: MetricCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{change}</p>
      </CardContent>
    </Card>
  );
}

export default async function DashboardMetrics() {
  // Grab the user data and profile info
  const userData = await UserController.getUser();
  const profileInfo = await UserController.getProfile(
    (userData.user?.id as string) || "",
  );

  // Calculate the days until the new
  const untilNewPeriod =
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() -
    new Date().getDate();

  const { data, success } =
    await LeaveRequestController.getCurrentPresentUsers();

  // Define the metrics
  const metrics = [
    {
      title: "Welkom terug",
      value: success ? profileInfo.full_name : "Laden...",
      change: "Hoe gaat het vandaag?",
      icon: <PersonStanding className="h-4 w-4" />,
    },
    {
      title: "Datum",
      value: new Date().toLocaleDateString("nl-NL", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      change: new Date().toLocaleTimeString("nl-NL", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      title: "Huidig saldo",
      value: success ? profileInfo.saldo + " uur" : "Laden...",
      change: `Dagen tot nieuwe periode: ${untilNewPeriod}`,
      icon: <Clock className="h-4 w-4" />,
    },
    {
      title: "Status personeel",
      value: success
        ? data
          ? data.present.length +
            " Aanwezig, " +
            data.absent.length +
            " afwezig"
          : "Laden..."
        : "Laden...",
      change: "Vandaag",
      icon: <Activity className="h-4 w-4" />,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard
          key={metric.title}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          icon={metric.icon}
        />
      ))}
    </div>
  );
}
