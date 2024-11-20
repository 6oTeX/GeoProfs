import type { Meta, StoryObj } from "@storybook/react";
import LeaveRequestForm from "@/components/forms/leave-request-form";

const meta: Meta<typeof LeaveRequestForm> = {
  component: LeaveRequestForm,
};

export default meta;
type Story = StoryObj<typeof LeaveRequestForm>;

export const Default: Story = {
  args: {},
};
