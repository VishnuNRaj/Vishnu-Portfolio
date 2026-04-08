import {
  ArrowRight,
  Cloud,
  Code2,
  Database,
  Mail,
  Send,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import { ScrollScene } from "@/components/motion";
import {
  ContactForm,
  EducationGrid,
  ExperienceTimeline,
  SiteHeader,
  SkillGroupsGrid,
} from "@/components/portfolio";
import {
  Badge,
  Button,
  IconLink,
  SectionHeading,
  SurfaceCard,
} from "@/components/ui";
import {
  getPortfolioProfile,
  listEducation,
  listExperience,
  listProjects,
} from "@/lib/server";

const capabilityIcons = [Code2, Database, Cloud];

const navItems = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export async function PortfolioPage() {
  const profile = await getPortfolioProfile();
  const highlightedProjects = await listProjects(1, 4, { highlightedOnly: true });
  const experience = await listExperience(1, 3);
  const education = await listEducation(1, 3);

  return (
    <ScrollScene>
      <div className="relative overflow-hidden bg-background text-foreground">
        <div className="pointer-events-none absolute inset-0 radial-wash" />
        <div
          className="pointer-events-none absolute left-[8%] top-24 h-32 w-32 rounded-full bg-accent/20 blur-3xl"
          data-float
        />
        <div
          className="pointer-events-none absolute right-[8%] top-[18rem] h-48 w-48 rounded-full bg-accent-secondary/18 blur-[110px]"
          data-float
        />
        <div
          className="pointer-events-none absolute bottom-[18%] left-[14%] h-28 w-28 rounded-full bg-accent-tertiary/12 blur-3xl"
          data-float
        />

        <SiteHeader
          brand={profile.fullName}
          navItems={navItems}
          ctaHref="#contact"
          ctaLabel="Start a project"
        />

        <main>
          <section className="relative isolate hero-grid overflow-hidden">
            <div className="mx-auto grid min-h-[92vh] max-w-7xl gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:py-24">
              <div className="space-y-8" data-parallax="-8" data-stagger-group>
                <Badge data-stagger-item>{profile.title}</Badge>
                <div className="space-y-6">
                  <p
                    className="max-w-2xl font-mono text-[11px] uppercase tracking-[0.35em] text-accent"
                    data-stagger-item
                  >
                    Realtime systems, scalable backend design, and frontend experiences
                    shaped to feel sharp in production.
                  </p>
                  <h1
                    className="max-w-5xl font-display text-[clamp(3.8rem,11vw,8.3rem)] leading-[0.88] font-extrabold tracking-[-0.08em]"
                    data-stagger-item
                  >
                    Building
                    <span className="text-gradient block">indigo-grade products</span>
                    for teams that need speed and structure.
                  </h1>
                  <p
                    className="max-w-2xl text-lg leading-8 text-muted sm:text-xl"
                    data-stagger-item
                  >
                    {profile.summary}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-4" data-stagger-item>
                  <Link href="/projects">
                    <Button size="lg">
                      Browse projects
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                  <Link href="#experience">
                    <Button variant="secondary" size="lg">
                      Explore experience
                    </Button>
                  </Link>
                </div>
                <div
                  className="grid gap-4 rounded-[2rem] border border-line-strong bg-card/70 p-5 sm:grid-cols-3"
                  data-stagger-item
                >
                  {profile.metrics.map((metric) => (
                    <div key={metric.label} className="space-y-1">
                      <p className="text-xs uppercase tracking-[0.24em] text-muted">
                        {metric.label}
                      </p>
                      <p className="text-lg font-semibold tracking-[-0.04em] text-foreground">
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 lg:pb-4">
                <SurfaceCard
                  className="glass-panel noise-overlay section-grid relative overflow-hidden p-8 sm:p-10"
                  data-scale-in
                  data-parallax="-12"
                >
                  <div
                    className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-accent/16 blur-3xl"
                    data-orbit
                  />
                  <div
                    className="absolute left-8 top-8 h-14 w-24 rounded-full bg-[linear-gradient(135deg,rgba(163,166,255,0.24),rgba(255,165,217,0.16))] blur-2xl"
                    data-shine
                  />
                  <div className="space-y-8">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent">
                          System profile
                        </p>
                        <p className="mt-2 text-sm text-muted">
                          Product engineering across backend, realtime, and delivery.
                        </p>
                      </div>
                      <span className="rounded-full bg-accent-soft px-3 py-1 font-mono text-[11px] text-accent">
                        {profile.availability}
                      </span>
                    </div>
                    <div className="hero-squares" aria-hidden="true">
                      {Array.from({ length: 18 }).map((_, index) => (
                        <span
                          key={index}
                          className="hero-square"
                          style={{
                            opacity: index % 5 === 0 ? 1 : 0.82,
                          }}
                        />
                      ))}
                    </div>
                    <div className="grid gap-5">
                      {profile.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="border-b border-line pb-5 last:border-b-0"
                        >
                          <p className="font-display text-3xl font-extrabold tracking-[-0.05em]">
                            {metric.value}
                          </p>
                          <p className="mt-1 text-sm text-muted">{metric.label}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <IconLink href={profile.githubUrl} label="GitHub" icon={Code2} />
                      <IconLink href={profile.linkedinUrl} label="LinkedIn" icon={Send} />
                      <IconLink href={`mailto:${profile.email}`} label="Email" icon={Mail} />
                    </div>
                  </div>
                </SurfaceCard>

                <SurfaceCard className="glass-panel aurora-border relative p-6 sm:p-7" data-reveal>
                  <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                      <Sparkles className="size-5" />
                    </div>
                    <div>
                      <p className="font-display text-xl font-extrabold tracking-[-0.04em]">
                        More visible motion
                      </p>
                      <p className="mt-2 text-sm leading-7 text-muted">
                        Scroll reveals are now stronger, the hero has hover-brightened
                        square cells, and the overall layout is split into cleaner sections.
                      </p>
                    </div>
                  </div>
                </SurfaceCard>
              </div>
            </div>
          </section>

          <section id="about" className="border-y border-line bg-card/35 py-20">
            <div className="mx-auto grid max-w-7xl gap-8 px-6 sm:px-8 md:grid-cols-[0.9fr_1.1fr]">
              <div data-reveal>
                <SectionHeading
                  eyebrow="About"
                  title="Production-minded engineering with visual clarity."
                  description={profile.objective}
                />
              </div>
              <div
                className="grid gap-6 text-base leading-8 text-muted sm:grid-cols-2"
                data-stagger-group
              >
                <p data-stagger-item>
                  Vishnu works across modern JavaScript ecosystems with a strong lean
                  toward Node.js backends, scalable APIs, and platform thinking that
                  keeps features maintainable after launch.
                </p>
                <p data-stagger-item>
                  The portfolio spans commerce, creator systems, consultation products,
                  encrypted communication, and realtime video experiences with a focus
                  on shipping quickly without losing system clarity.
                </p>
              </div>
            </div>
          </section>

          <section id="projects" className="py-24 sm:py-28">
            <div className="mx-auto max-w-7xl space-y-10 px-6 sm:px-8">
              <SectionHeading
                eyebrow="Highlighted Projects"
                title="Selected work across company builds, freelance systems, and original products."
                description="A tighter project rail with stronger motion and the new indigo surface system."
              />
              <div
                className="mask-fade flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
                data-project-rail
                data-parallax="-6"
              >
                {highlightedProjects.items.map((project) => (
                  <SurfaceCard
                    key={project.id}
                    className="glass-panel min-w-[88%] snap-center p-8 sm:min-w-[560px] sm:p-10"
                    data-project-card
                  >
                    <div className="flex h-full flex-col justify-between gap-10">
                      <div className="space-y-6">
                        <Badge>{project.stacks.join(" / ")}</Badge>
                        <div className="space-y-4">
                          <h3 className="font-display text-3xl font-extrabold tracking-[-0.05em] sm:text-4xl">
                            {project.projectName}
                          </h3>
                          <p className="max-w-xl text-base leading-8 text-muted sm:text-lg">
                            {project.description}
                          </p>
                        </div>
                      </div>
                      <div className="grid gap-6 border-t border-line pt-6 sm:grid-cols-[1fr_auto] sm:items-end">
                        <p className="text-sm leading-7 text-muted-strong">
                          {project.impact}
                        </p>
                        <Link
                          href={project.href ?? "/projects"}
                          className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-tertiary"
                        >
                          View project details
                          <ArrowRight className="size-4" />
                        </Link>
                      </div>
                    </div>
                  </SurfaceCard>
                ))}
              </div>
              <Link href="/projects" className="inline-flex">
                <Button variant="secondary">
                  View all projects
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
          </section>

          <section className="bg-card/35 py-24 sm:py-28">
            <div className="mx-auto max-w-7xl space-y-10 px-6 sm:px-8">
              <SectionHeading
                eyebrow="Capabilities"
                title="Frontend polish backed by strong backend judgment."
                description="The strongest work here comes from treating APIs, data models, delivery, and user experience as one system."
              />
              <div className="grid gap-6 md:grid-cols-3" data-stagger-group>
                {profile.capabilities.map((capability, index) => {
                  const Icon = capabilityIcons[index];

                  return (
                    <SurfaceCard
                      key={capability.title}
                      className="glass-panel p-8"
                      data-scale-in
                      data-stagger-item
                    >
                      <div className="space-y-5">
                        <div className="flex size-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                          <Icon className="size-5" />
                        </div>
                        <div className="space-y-3">
                          <h3 className="font-display text-2xl font-extrabold tracking-[-0.05em]">
                            {capability.title}
                          </h3>
                          <p className="text-base leading-8 text-muted">
                            {capability.description}
                          </p>
                        </div>
                      </div>
                    </SurfaceCard>
                  );
                })}
              </div>
            </div>
          </section>

          <section id="experience" className="py-24 sm:py-28">
            <div className="mx-auto max-w-7xl space-y-10 px-6 sm:px-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <SectionHeading
                  eyebrow="Experience"
                  title="A cleaner timeline that reads faster and feels more deliberate."
                  description="The experience cards are simplified, stack chips are removed, and the motion is easier to notice while scrolling."
                />
                <SurfaceCard className="glass-panel max-w-xl p-6" data-reveal>
                  <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent">
                    Scroll behavior
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    GSAP now drives stronger reveal, blur-to-sharp entry, stagger timing,
                    parallax drift, floating ambient lights, and timeline stripe growth.
                  </p>
                </SurfaceCard>
              </div>
              <ExperienceTimeline
                items={experience.items}
                compact
                ctaHref="/experience"
                ctaLabel="View full experience"
              />
            </div>
          </section>

          <section id="education" className="bg-card/35 py-24 sm:py-28">
            <div className="mx-auto max-w-7xl space-y-10 px-6 sm:px-8">
              <SectionHeading
                eyebrow="Education"
                title="Education is separated out so the layout stays balanced."
                description="This avoids the uneven column height that came from combining education and experience in one block."
              />
              <EducationGrid items={education.items} />
            </div>
          </section>

          <section id="skills" className="py-24 sm:py-28">
            <div className="mx-auto max-w-7xl space-y-10 px-6 sm:px-8">
              <SectionHeading
                eyebrow="Skills"
                title="Skill groups now live in their own section, updated from the resume."
                description="Grouped across core expertise, languages, frontend, backend, realtime systems, payments, infrastructure, and tooling."
              />
              <SkillGroupsGrid groups={profile.skillGroups} />
            </div>
          </section>

          <section id="contact" className="pb-24 sm:pb-28">
            <div className="mx-auto max-w-7xl space-y-8 px-6 sm:px-8">
              <SectionHeading
                eyebrow="Contact"
                title="Reach out for product work, freelance builds, or backend-heavy collaborations."
                description="The contact API stores submissions, sends an acknowledgement email when mail env vars are configured, and can issue a one-day admin key for the configured admin email."
              />
              <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                <SurfaceCard
                  className="glass-panel p-8 sm:p-10"
                  data-scale-in
                  data-parallax="-5"
                >
                  <div className="space-y-6">
                    <p className="font-display text-4xl leading-none font-extrabold tracking-[-0.06em] sm:text-5xl">
                      {profile.fullName}
                    </p>
                    <p className="text-lg leading-8 text-muted">{profile.location}</p>
                    <div className="space-y-3 text-base">
                      <Link
                        href={`mailto:${profile.email}`}
                        className="block text-accent hover:text-accent-tertiary"
                      >
                        {profile.email}
                      </Link>
                      <p>{profile.phone}</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <IconLink href={profile.githubUrl} label="GitHub" icon={Code2} />
                      <IconLink href={profile.linkedinUrl} label="LinkedIn" icon={Send} />
                    </div>
                  </div>
                </SurfaceCard>
                <ContactForm />
              </div>
            </div>
          </section>
        </main>
      </div>
    </ScrollScene>
  );
}
