import { User, UsersTable } from "@/components/UsersTable";
import DashboardMetrics from "@/components/DashboardMetrics";
import RecentApplications, {
  Application,
} from "@/components/RecentApplications";
import * as models from "@/models/user";

export default async function Dashboard() {
  const users = await models.User.getAll();

  for (let i = 0; i < users.length; ++i) {
    await users[i].pull();
  }

  const userData = users.map((user) => {
    const data = user.get();
    const department = user.getDepartment();

    return {
      id: data.id,
      balance: data.saldo,
      employee: {
        firstName: data.full_name,
        lastName: "",
        email: data.email,
      },
      status: "Aanwezig",
      section: {
        team: department ? department.name : "Algemeen",
        role: "Werknemer",
      },
    };
  });

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
          <UsersTable users={userData} />
        </div>
        <div>
          <RecentApplications />
        </div>
      </main>
    </div>
  );
}
