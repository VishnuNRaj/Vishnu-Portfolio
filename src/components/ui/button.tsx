import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full border text-sm font-semibold whitespace-nowrap transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border-accent-strong bg-[linear-gradient(135deg,var(--accent-strong),var(--accent),var(--accent-tertiary))] px-5 py-3 text-[#070e1d] shadow-[0_18px_40px_rgba(131,135,255,0.28)] hover:-translate-y-0.5 hover:brightness-110",
        secondary:
          "border-line-strong bg-card/90 px-5 py-3 text-foreground hover:-translate-y-0.5 hover:border-accent/60 hover:bg-card-strong hover:text-accent",
        ghost:
          "border-transparent px-3 py-2 text-foreground hover:bg-accent-soft hover:text-accent",
      },
      size: {
        sm: "h-10",
        md: "h-12",
        lg: "h-14 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, variant, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ size, variant }), className)}
      {...props}
    />
  ),
);

Button.displayName = "Button";

export { Button, buttonVariants };
