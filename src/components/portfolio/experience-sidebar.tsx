import Link from "next/link";

import { Button, SurfaceCard } from "@/components/ui";
import type { Education, PortfolioProfile } from "@/lib/portfolio/types";

type ExperienceSidebarProps = {
  educationItems: Education[];
  skillGroups: PortfolioProfile["skillGroups"];
};

export function ExperienceSidebar({
  educationItems,
  skillGroups,
}: ExperienceSidebarProps) {
  return (
    <div className="space-y-6">
      <SurfaceCard className="glass-panel p-8" data-reveal>
        <div className="space-y-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent">
            Education
          </p>
          <div className="space-y-5">
            {educationItems.map((item) => (
              <div
                key={item.id}
                className="space-y-2 border-b border-line pb-5 last:border-b-0 last:pb-0"
              >
                <h3 className="font-display text-xl font-bold tracking-[-0.04em]">
                  {item.course}
                </h3>
                <p className="text-sm text-muted">{item.collegeName}</p>
                <p className="text-sm text-muted-strong">
                  {item.from} - {item.to ?? "Present"} / {item.branch}
                </p>
              </div>
            ))}
          </div>
          <Link href="/education" className="inline-flex">
            <Button variant="secondary">View all education</Button>
          </Link>
        </div>
      </SurfaceCard>

      <SurfaceCard className="glass-panel p-8" data-reveal>
        <div className="space-y-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent">
            Stack lanes
          </p>
          <div className="space-y-4">
            {skillGroups.map((group) => (
              <div key={group.title} className="space-y-2">
                <h3 className="font-display text-lg font-bold">{group.title}</h3>
                <p className="text-sm leading-7 text-muted">{group.items.join(" / ")}</p>
              </div>
            ))}
          </div>
        </div>
      </SurfaceCard>
    </div>
  );
}
