import type { Meta, StoryObj } from "@storybook/react";
import { UsersTable, User } from "../components/UsersTable";

const meta: Meta<typeof UsersTable> = {
  title: "Admin/UsersTable",
  component: UsersTable,
};

export default meta;

type Story = StoryObj<typeof UsersTable>;

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

export const Default: Story = {
  args: {
    users: sampleUsers,
  },
};
