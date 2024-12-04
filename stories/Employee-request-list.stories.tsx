import type { Meta, StoryObj } from "@storybook/react";
import EmployeeRequestList from "@/components/cards/employee-request-list";

const meta: Meta<typeof EmployeeRequestList> = {
  component: EmployeeRequestList,
};

export default meta;
type Story = StoryObj<typeof EmployeeRequestList>;

export const Default: Story = {
  args: {},
};
