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
    furloughNames: ["Alice", "Bob"],
    sickNames: ["Charlie"],
  },
  "2024-12-02": {
    furloughNames: ["David"],
    sickNames: ["Eve", "Frank"],
  },
  "2024-11-29": {
    furloughNames: ["David", "Eve", "Frank", "Alice", "Bob", "Charlie"],
    sickNames: ["Dave", "Jake"],
  },
};

// Dynamically calculate the counts
const processedEvents = Object.fromEntries(
  Object.entries(events).map(([date, { furloughNames, sickNames }]) => [
    date,
    {
      furlough: furloughNames.length,
      sick: sickNames.length,
      furloughNames,
      sickNames,
    },
  ])
);

export const Default: Story = {
  args: {
    events: processedEvents,
  },
};
