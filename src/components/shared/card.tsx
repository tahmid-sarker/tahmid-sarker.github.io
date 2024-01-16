import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const Card = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
      className
    )}
    {...props}
  />
);

const CardHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 [.border-b]:pb-6",
      className
    )}
    {...props}
  />
);

const CardTitle = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("leading-none font-semibold", className)} {...props} />
);

const CardContent = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("px-6", className)} {...props} />
);

export { Card, CardHeader, CardTitle, CardContent };
