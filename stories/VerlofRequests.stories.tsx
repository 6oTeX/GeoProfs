import type { Meta, StoryObj } from "@storybook/react";
import VerlofRequests from "../components/VerlofRequests";

const meta: Meta<typeof VerlofRequests> = {
  title: "Admin/VerlofRequests",
  component: VerlofRequests,
};

export default meta;

type Story = StoryObj<typeof VerlofRequests>;

export const Default: Story = {
  args: {
    groups: ["ICT", "Financier", "HRM"],
    requests: [
      {
        id: "r1",
        userName: "Alice Smith",
        startDate: "2023-08-01",
        endDate: "2023-08-05",
        reason: "Vakantie",
        status: "Goedgekeurd",
      },
      {
        id: "r2",
        userName: "Bob Johnson",
        startDate: "2023-09-10",
        endDate: "2023-09-12",
        reason: "Persoonlijk",
        status: "In behandeling",
      },
    ],
  },
};
