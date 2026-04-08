import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-4",
        align === "center" && "mx-auto max-w-3xl text-center",
        className,
      )}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent">
        {eyebrow}
      </p>
      <div className="space-y-3">
        <h2 className="max-w-4xl font-display text-4xl leading-none font-extrabold tracking-[-0.06em] text-foreground sm:text-5xl md:text-6xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-base leading-7 text-muted sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
