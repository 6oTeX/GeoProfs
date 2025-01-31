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
  "2025-01-02": [
    {
      team: "ICT",
      furloughNames: ["David"],
      sickNames: ["Eve", "Frank"],
    },
    {
      team: "Finance",
      furloughNames: ["Alice", "Jane"],
      sickNames: ["Bob"],
    },
  ],
  "2025-01-03": [
    {
      furloughNames: ["Alice", "Bob"],
      sickNames: ["Charlie"],
      team: "HRM",
    },
  ],
  "2025-01-05": [
    {
      furloughNames: ["David", "Eve", "Frank", "Alice", "Bob", "Charlie"],
      sickNames: ["Dave", "Jake"],
      team: "Finance",
    },
  ],
  "2025-01-07": [
    {
      furloughNames: ["David", "Eve"],
      sickNames: ["Dave", "Jake"],
      team: "Finance",
    },
  ],
  "2025-01-08": [
    {
      furloughNames: ["David", "Bob", "Charlie"],
      sickNames: ["Dave", "Jake"],
      team: "ICT",
    },
  ],
};

// Dynamically calculate the counts
const processedEvents = Object.fromEntries(
  Object.entries(events).map(([date, eventArray]) => [
    date,
    eventArray.map(({ furloughNames, sickNames, team }) => ({
      furlough: furloughNames.length,
      sick: sickNames.length,
      furloughNames,
      sickNames,
      team,
    })),
  ]),
);

export const Default: Story = {
  args: {
    events: processedEvents,
  },
};
