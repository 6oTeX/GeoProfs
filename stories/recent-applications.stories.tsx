import type { Meta, StoryObj } from "@storybook/react";
import RecentApplications, { Application } from "../components/recent-applications"
const meta: Meta<typeof RecentApplications> = {
    component: RecentApplications,
};
export default meta;

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
]



type Story = StoryObj<typeof RecentApplications>;

export const Default: Story = {
    args: applications
};
