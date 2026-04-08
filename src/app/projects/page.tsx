import Link from "next/link";
import { ProjectInfiniteList } from "@/components/portfolio";
import { Button, SectionHeading, SurfaceCard } from "@/components/ui";
import { listProjects } from "@/lib/server";

export default async function ProjectsPage() {
  const projects = await listProjects(1, 6);

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-6 py-16 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SectionHeading
          eyebrow="My Projects"
          title="My complete project archive"
          description="A comprehensive view of all my works, freelance apps, and original projects."
        />
        <Link href="/">
          <Button variant="secondary">Back home</Button>
        </Link>
      </div>
      <ProjectInfiniteList 
        initialItems={projects.items}
        initialPage={projects.page}
        totalPages={projects.totalPages}
      />
    </main>
  );
}
