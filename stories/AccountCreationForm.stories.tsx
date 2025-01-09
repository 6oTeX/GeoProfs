import type { Meta, StoryObj } from "@storybook/react";
import AccountCreationForm from "../components/AccountCreationForm";

const meta: Meta<typeof AccountCreationForm> = {
  title: "Admin/AccountCreationForm",
  component: AccountCreationForm,
};

export default meta;

type Story = StoryObj<typeof AccountCreationForm>;

export const Default: Story = {
  args: {
    onCreateAccount: (data: any) => {
      console.log("Account created:", data);
    },
    roles: ["Beheerder", "Werknemer", "Manager"],
  },
};
