// components/Calendar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Calendar from '../components/Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
};

export default meta;

type Story = StoryObj<typeof Calendar>;


// Sample events data
const events = {
  '2024-11-09': { verlof: 1, ziek: 0 },
  '2024-11-26': { verlof: 0, ziek: 5 },
  '2024-11-27': { verlof: 2, ziek: 1 },
  '2024-11-28': { verlof: 5, ziek: 1 },
  '2024-11-29': { verlof: 2, ziek: 5 },


  // Add more dates as needed
};

export const Default: Story = {
  args: {
    events,
  },
};
