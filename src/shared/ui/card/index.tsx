import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/shared/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-card text-card-foreground shadow-sm p-3",
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export { Card };
