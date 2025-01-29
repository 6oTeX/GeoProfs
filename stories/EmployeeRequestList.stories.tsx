import type { Meta, StoryObj } from "@storybook/react";
import EmployeeRequestList from "@/components/cards/EmployeeRequestList";

const meta: Meta<typeof EmployeeRequestList> = {
  component: EmployeeRequestList,
};

export default meta;
type Story = StoryObj<typeof EmployeeRequestList>;

export const Default: Story = {
  args: {},
};
