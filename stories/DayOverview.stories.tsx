
import { Meta, StoryObj } from '@storybook/react';
import DayOverview from '../components/DayOverview';

export default {
  title: 'Components/DayOverview',
  component: DayOverview,
  argTypes: {
    onClose: { action: 'onClose' },
  },
} as Meta<typeof DayOverview>;

type Story = StoryObj<typeof DayOverview>;

export const Default: Story = {
  args: {
    date: new Date(),
    verlofNames: ['Alice', 'Bob'],
    ziekNames: ['Charlie'],
  },
};
