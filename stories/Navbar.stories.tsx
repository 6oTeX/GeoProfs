import type { Meta, StoryObj } from "@storybook/react";

import Navbar from "@/components/Navbar";
import { TooltipDecorator } from "@/.storybook/decorators/TooltipDecorator.stories";

const meta: Meta<typeof Navbar> = {
  component: Navbar,
  decorators: [TooltipDecorator],
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {},
};
