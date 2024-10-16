import { TooltipProvider } from "@/components/ui/tooltip";
import { Decorator } from "@storybook/react";
export const TooltipDecorator: Decorator = (Story) => (
  <TooltipProvider>
    <div>
      <Story />
    </div>
  </TooltipProvider>
);
