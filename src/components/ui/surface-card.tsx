import { cn } from "@/lib/utils";

type SurfaceCardProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export function SurfaceCard({ children, className, ...props }: SurfaceCardProps) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-[2rem] border border-line-strong bg-card/90 shadow-[0_24px_90px_rgba(2,6,23,0.35)] backdrop-blur-md",
        className,
      )}
    >
      {children}
    </div>
  );
}
