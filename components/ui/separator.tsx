"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  label?: string;
}

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    {
      className,
      orientation = "horizontal",
      decorative = true,
      label,
      ...props
    },
    ref,
  ) => (
    <div
      className={cn(
        "relative flex items-center",
        orientation === "horizontal" ? "w-full flex-row" : "h-full flex-col",
      )}
    >
      {orientation === "horizontal" ? (
        <>
          <SeparatorPrimitive.Root
            ref={ref}
            decorative={decorative}
            orientation={orientation}
            className={cn("bg-border flex-grow h-[1px]", className)}
            {...props}
          />
          {label && (
            <span className="mx-4 text-sm text-muted-foreground whitespace-nowrap">
              {label}
            </span>
          )}
          <SeparatorPrimitive.Root
            ref={ref}
            decorative={decorative}
            orientation={orientation}
            className={cn("bg-border flex-grow h-[1px]", className)}
            {...props}
          />
        </>
      ) : (
        <>
          <SeparatorPrimitive.Root
            ref={ref}
            decorative={decorative}
            orientation={orientation}
            className={cn("bg-border w-[1px] flex-grow", className)}
            {...props}
          />
          {label && (
            <span className="mx-4 text-sm text-muted-foreground whitespace-nowrap">
              {label}
            </span>
          )}
          <SeparatorPrimitive.Root
            ref={ref}
            decorative={decorative}
            orientation={orientation}
            className={cn("bg-border w-[1px] flex-grow", className)}
            {...props}
          />
        </>
      )}
    </div>
  ),
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
