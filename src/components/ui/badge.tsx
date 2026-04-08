import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line-strong bg-accent-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-accent",
        className,
      )}
    >
      {children}
    </span>
  );
}
