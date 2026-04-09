import * as LucideIcons from "lucide-react";
import Image from "next/image";
import { SurfaceCard } from "@/components/ui";
import type { Skill, SkillGroup } from "@/lib/portfolio/types";

type SkillGroupsGridProps = {
  groups: SkillGroup[];
  skills: Skill[];
};

export function SkillGroupsGrid({ groups, skills }: SkillGroupsGridProps) {
  // Add an "ungrouped" layer for skills that don't match any group
  const displayGroups = [...groups.map((group) => ({
    id: group.id,
    title: group.title,
    order: group.order,
  })), { id: "ungrouped", title: "Additional Technical Skills", order: 999 }]
  .sort((a, b) => a.order - b.order);

  return (
    <div className="grid gap-6 lg:grid-cols-2" data-stagger-group>
      {displayGroups.map((group) => {
        const groupSkills = skills.filter((s) => s.groupId === group.id);
        if (groupSkills.length === 0) return null;

        return (
          <SurfaceCard
            key={group.id}
            className="glass-panel p-8"
            data-scale-in
            data-stagger-item
          >
            <div className="space-y-5">
              <p className="font-display text-2xl font-extrabold tracking-[-0.04em]">
                {group.title}
              </p>
              <div className="flex flex-wrap gap-2">
                {groupSkills.map((skill) => {
                  const isUrl = skill.icon?.startsWith("http");
                  const Icon = !isUrl && skill.icon ? (LucideIcons as unknown as Record<string, React.ElementType>)[skill.icon] : null;
                  return (
                    <div
                      key={skill.id}
                      className="flex items-center gap-2 rounded-full border border-line-strong bg-background/20 px-3 py-1.5 text-sm text-muted-strong"
                    >
                      {isUrl ? (
                        <Image 
                          src={skill.icon!} 
                          alt={skill.name} 
                          width={16}
                          height={16}
                          className="size-4 object-contain" 
                        />
                      ) : (
                        Icon && <Icon className="size-4" />
                      )}
                      <span>{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </SurfaceCard>
        );
      })}
    </div>
  );
}
