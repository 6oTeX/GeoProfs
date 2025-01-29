import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  MoreVertical,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { User, UsersTable } from "@/components/UsersTable";
import DashboardMetrics from "@/components/dashboard-metrics";
import RecentApplications from "@/components/recent-applications";

export default async function Dashboard() {
  const sampleUsers: User[] = [
    {
      id: "1",
      balance: 316,
      employee: {
        firstName: "Alice",
        lastName: "Smith",
        email: "alice@example.com",
      },
      status: "Aanwezig",
      section: {
        team: "ICT",
        role: "Manager",
      },
    },
    {
      id: "2",
      balance: 242,
      employee: {
        firstName: "Bob",
        lastName: "Johnson",
        email: "bob@example.com",
      },
      status: "Afwezig",
      section: {
        team: "Financier",
        role: "employee",
      },
    },
    {
      id: "3",
      balance: 500,
      employee: {
        firstName: "Charlie",
        lastName: "Brown",
        email: "charlie@example.com",
      },
      status: "Aanwezig",
      section: {
        team: "HRM",
        role: "Beheerder",
      },
    },
  ];

  interface Application {
    name: string;
    email: string;
    status: "approved" | "rejected" | "pending";
  }

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
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <main className="grid flex-1 items-start gap-4 p-4 pt-28 sm:px-6 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">

          <DashboardMetrics />
          <UsersTable users={sampleUsers} />
        </div>
        <div>
          <RecentApplications
            applications={applications}
          />
        </div>
      </main>
    </div>
  );
}
