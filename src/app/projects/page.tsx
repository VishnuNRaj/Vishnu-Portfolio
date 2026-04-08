import Link from "next/link";

import { PaginationNav } from "@/components/portfolio";
import { Button, SectionHeading, SurfaceCard } from "@/components/ui";
import { parsePositiveInt } from "@/lib";
import { listProjects } from "@/lib/server";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ProjectsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parsePositiveInt(
    typeof params.page === "string" ? params.page : undefined,
    1,
  );
  const projects = await listProjects(page, 6);

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-6 py-16 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SectionHeading
          eyebrow="Projects"
          title="Complete project archive"
          description="All project cards are served from the shared portfolio dataset and paginated through the route layer."
        />
        <Link href="/">
          <Button variant="secondary">Back home</Button>
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.items.map((project) => (
          <SurfaceCard key={project.id} className="flex h-full flex-col gap-5 p-8">
            <div className="space-y-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted">
                {project.projectType.replaceAll("_", " ")}
              </p>
              <h2 className="text-3xl font-semibold tracking-[-0.05em]">
                {project.projectName}
              </h2>
              <p className="text-base leading-8 text-muted">{project.description}</p>
            </div>
            <p className="text-sm leading-7 text-foreground/80">{project.impact}</p>
            <p className="text-sm text-muted">{project.stacks.join(" / ")}</p>
            {project.href ? (
              <Link href={project.href} className="text-sm font-medium text-accent">
                Open project link
              </Link>
            ) : null}
          </SurfaceCard>
        ))}
      </div>
      <PaginationNav
        page={projects.page}
        totalPages={projects.totalPages}
        buildHref={(nextPage) => `/projects?page=${nextPage}`}
      />
    </main>
  );
}
