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
    werknemer: {
      firstName: "Alice",
      lastName: "Smith",
      email: "alice@example.com",
    },
    status: "Aanwezig",
    afdeling: {
      team: "ICT",
      role: "Manager",
    },
  },
  {
    id: "2",
    balance: 242,
    werknemer: {
      firstName: "Bob",
      lastName: "Johnson",
      email: "bob@example.com",
    },
    status: "Afwezig",
    afdeling: {
      team: "Financier",
      role: "Werknemer",
    },
  },
  {
    id: "3",
    balance: 500,
    werknemer: {
      firstName: "Charlie",
      lastName: "Brown",
      email: "charlie@example.com",
    },
    status: "Aanwezig",
    afdeling: {
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
