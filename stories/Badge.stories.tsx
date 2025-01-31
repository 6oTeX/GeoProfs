import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@/components/ui/badge";

const meta: Meta<typeof Badge> = {
  component: Badge,
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Default Badge",
    variant: "default",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Badge",
    variant: "secondary",
  },
};

export const Destructive: Story = {
  args: {
    children: "Destructive Badge",
    variant: "destructive",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline Badge",
    variant: "outline",
  },
};
