import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Badge, Button, SurfaceCard } from "@/components/ui";
import type { Experience } from "@/lib/portfolio/types";
import { cn } from "@/lib/utils";

type ExperienceTimelineProps = {
  items: Experience[];
  compact?: boolean;
  ctaHref?: string;
  ctaLabel?: string;
  className?: string;
};

export function ExperienceTimeline({
  items,
  compact = false,
  ctaHref,
  ctaLabel,
  className,
}: ExperienceTimelineProps) {
  return (
    <div className={cn("space-y-5", className)} data-stagger-group>
      {items.map((item) => (
        <SurfaceCard
          key={item.id}
          className="glass-panel group relative overflow-hidden p-7 sm:p-9"
          data-stagger-item
          data-scale-in
        >
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(163,166,255,0.7),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className={cn("grid gap-6", compact ? "lg:grid-cols-[160px_1fr]" : "lg:grid-cols-[180px_1fr]")}>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3">
                <span className="timeline-stripe block h-12 w-1 rounded-full" data-line-grow />
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent">
                    {item.from} - {item.to ?? "Present"}
                  </p>
                  <p className="mt-1 text-sm text-muted">{item.location}</p>
                </div>
              </div>
              {!compact ? <Badge>{item.companyName}</Badge> : null}
            </div>
            <div className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-extrabold tracking-[-0.05em] text-foreground sm:text-3xl">
                    {item.jobRole}
                  </h3>
                  <p className="text-sm uppercase tracking-[0.28em] text-muted-strong">
                    {item.companyName}
                  </p>
                </div>
                <ArrowUpRight className="size-5 text-accent opacity-70 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
              <p className="max-w-3xl text-base leading-8 text-muted">{item.description}</p>
            </div>
          </div>
        </SurfaceCard>
      ))}
      {ctaHref && ctaLabel ? (
        <Link href={ctaHref} className="inline-flex">
          <Button variant="secondary">{ctaLabel}</Button>
        </Link>
      ) : null}
    </div>
  );
}
