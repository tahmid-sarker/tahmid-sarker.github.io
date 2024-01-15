import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

interface BadgeVariantsOptions {
  variant?: BadgeVariant;
  className?: string;
}

const badgeVariants = ({
  variant = "default",
  className,
}: BadgeVariantsOptions = {}): string => {
  const variants: Record<BadgeVariant, string> = {
    default:
      "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
    secondary:
      "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
    destructive:
      "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
    outline:
      "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
  };

  return cn(
    "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-[color,box-shadow] overflow-hidden",
    variants[variant],
    className
  );
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children?: ReactNode;
}

const Badge = ({ className, variant, children, ...props }: BadgeProps) => (
  <span className={cn(badgeVariants({ variant }), className)} {...props}>
    {children}
  </span>
);

export { Badge };
