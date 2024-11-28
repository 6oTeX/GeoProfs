// components/Calendar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Calendar from '../components/Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
};

export default meta;

type Story = StoryObj<typeof Calendar>;

// Sample events data with names
const events = {
  '2024-11-26': {
    verlofNames: ['Alice', 'Bob'],
    ziekNames: ['Charlie'],
  },
  '2024-11-27': {
    verlofNames: ['David'],
    ziekNames: ['Eve', 'Frank'],
  },
  '2024-11-29': {
    verlofNames: ['David', 'Eve', 'Frank', 'Alice', 'Bob', 'Charlie'],
    ziekNames: ['Dave', 'Jake'],
  },
};

// Dynamically calculate the counts
const processedEvents = Object.fromEntries(
  Object.entries(events).map(([date, { verlofNames, ziekNames }]) => [
    date,
    {
      verlof: verlofNames.length,
      ziek: ziekNames.length,
      verlofNames,
      ziekNames,
    },
  ])
);

export const Default: Story = {
  args: {
    events: processedEvents,
  },
};
