// components/Calendar.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import Calender from "../components/Calender";

const meta: Meta<typeof Calender> = {
  title: "Components/Calender",
  component: Calender,
};

export default meta;

type Story = StoryObj<typeof Calender>;

// Sample events data with names
const events = {
  "2024-12-03": {
    leaveNames: ["Alice", "Bob"],
    sickNames: ["Charlie"],
  },
  "2024-12-02": {
    leaveNames: ["David"],
    sickNames: ["Eve", "Frank"],
  },
  "2024-11-29": {
    leaveNames: ["David", "Eve", "Frank", "Alice", "Bob", "Charlie"],
    sickNames: ["Dave", "Jake"],
  },
};

// Dynamically calculate the counts
const processedEvents = Object.fromEntries(
  Object.entries(events).map(([date, { leaveNames, sickNames }]) => [
    date,
    {
      leave: leaveNames.length,
      sick: sickNames.length,
      leaveNames,
      sickNames,
    },
  ])
);

export const Default: Story = {
  args: {
    events: processedEvents,
  },
};
