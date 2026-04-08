import { SurfaceCard } from "@/components/ui";
import type { Education } from "@/lib/portfolio/types";

type EducationGridProps = {
  items: Education[];
};

export function EducationGrid({ items }: EducationGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" data-stagger-group>
      {items.map((item) => (
        <SurfaceCard
          key={item.id}
          className="glass-panel flex h-full p-8"
          data-stagger-item
          data-scale-in
        >
          <div className="flex flex-1 flex-col justify-between gap-6">
            <div className="space-y-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent">
                {item.from} - {item.to ?? "Present"}
              </p>
              <h3 className="font-display text-2xl font-extrabold tracking-[-0.05em]">
                {item.course}
              </h3>
              <p className="text-sm uppercase tracking-[0.22em] text-muted-strong">
                {item.branch}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-base text-muted">{item.collegeName}</p>
              <p className="text-sm text-muted">{item.location}</p>
            </div>
          </div>
        </SurfaceCard>
      ))}
    </div>
  );
}
