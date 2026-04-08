import Link from "next/link";

import { ScrollScene } from "@/components/motion";
import { EducationGrid, ExperienceTimeline } from "@/components/portfolio";
import { Button, SectionHeading, SurfaceCard } from "@/components/ui";
import {
  getPortfolioProfile,
  listEducation,
  listExperience,
} from "@/lib/server";

export default async function ExperiencePage() {
  const profile = await getPortfolioProfile();
  const experience = await listExperience(1, 20);
  const education = await listEducation(1, 6);

  return (
    <ScrollScene>
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 radial-wash" />
        <section className="mx-auto max-w-7xl space-y-10 px-6 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr] xl:items-end">
            <div className="space-y-6" data-reveal>
              <SectionHeading
                eyebrow="My Experience"
                title="My professional timeline."
                description="My work experience and education are organized into dedicated sections to highlight my engineering background."
              />
              <div className="flex flex-wrap gap-4">
                <Link href="/">
                  <Button variant="secondary">Back home</Button>
                </Link>
                <Link href="/projects">
                  <Button>View projects</Button>
                </Link>
              </div>
            </div>
            <SurfaceCard className="glass-panel p-7" data-scale-in>
              <div className="space-y-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent">
                  Experience overview
                </p>
                <div className="grid gap-4 sm:grid-cols-3">
                  {profile.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-3xl border border-line bg-background/20 p-4"
                    >
                      <p className="text-xs uppercase tracking-[0.24em] text-muted">
                        {metric.label}
                      </p>
                      <p className="mt-2 font-display text-lg font-extrabold tracking-[-0.04em]">
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </SurfaceCard>
          </div>

          <section className="space-y-8">
            <SectionHeading
              eyebrow="My Timeline"
              title="My company experience"
              description="A chronological timeline of my professional roles and technical contributions."
            />
            <ExperienceTimeline items={experience.items} />
          </section>

          <section className="space-y-8 pt-6">
            <SectionHeading
              eyebrow="My Education"
              title="My academic background"
              description="My formal academic training and structured coursework."
            />
            <EducationGrid items={education.items} />
          </section>
        </section>
      </main>
    </ScrollScene>
  );
}
