import { SurfaceCard } from "@/components/ui";
import type { PortfolioProfile } from "@/lib/portfolio/types";

type SkillGroupsGridProps = {
  groups: PortfolioProfile["skillGroups"];
};

export function SkillGroupsGrid({ groups }: SkillGroupsGridProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2" data-stagger-group>
      {groups.map((group) => (
        <SurfaceCard
          key={group.title}
          className="glass-panel p-8"
          data-scale-in
          data-stagger-item
        >
          <div className="space-y-4">
            <p className="font-display text-2xl font-extrabold tracking-[-0.04em]">
              {group.title}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-line-strong bg-background/20 px-3 py-1.5 text-sm text-muted-strong"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </SurfaceCard>
      ))}
    </div>
  );
}
