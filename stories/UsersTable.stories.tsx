import type { Meta, StoryObj } from '@storybook/react';
import { UsersTable } from '../components/UsersTable';

const meta: Meta<typeof UsersTable> = {
  title: 'Admin/UsersTable',
  component: UsersTable,
};

export default meta;

type Story = StoryObj<typeof UsersTable>;

export const Default: Story = {
  args: {
    users: [
      {
        id: '1',
        firstName: 'Alice',
        lastName: 'Smith',
        age: 30,
        email: 'alice@example.com',
        password: '********',
        role: 'admin',
        joinDate: '2022-01-15',
        sickCount: 2,
        verlofRequestsCount: 5,
      },
      {
        id: '2',
        firstName: 'Bob',
        lastName: 'Johnson',
        age: 25,
        email: 'bob@example.com',
        password: '********',
        role: 'user',
        joinDate: '2023-03-10',
        sickCount: 1,
        verlofRequestsCount: 3,
      }
    ]
  },
};
