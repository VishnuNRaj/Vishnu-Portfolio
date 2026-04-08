import Link from "next/link";

import { PaginationNav } from "@/components/portfolio";
import { Button, SectionHeading, SurfaceCard } from "@/components/ui";
import { parsePositiveInt } from "@/lib";
import { listEducation } from "@/lib/server";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function EducationPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parsePositiveInt(
    typeof params.page === "string" ? params.page : undefined,
    1,
  );
  const education = await listEducation(page, 5);

  return (
    <main className="mx-auto max-w-6xl space-y-10 px-6 py-16 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SectionHeading
          eyebrow="Education"
          title="Learning and training"
          description="Formal education and technical training pulled from the same content store."
        />
        <Link href="/">
          <Button variant="secondary">Back home</Button>
        </Link>
      </div>
      <div className="grid gap-6">
        {education.items.map((item) => (
          <SurfaceCard key={item.id} className="p-8">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold tracking-[-0.05em]">
                {item.course}
              </h2>
              <p className="text-sm uppercase tracking-[0.22em] text-muted">
                {item.collegeName} / {item.location}
              </p>
              <p className="text-base text-foreground/80">
                {item.from} - {item.to ?? "Present"} / {item.branch}
              </p>
            </div>
          </SurfaceCard>
        ))}
      </div>
      <PaginationNav
        page={education.page}
        totalPages={education.totalPages}
        buildHref={(nextPage) => `/education?page=${nextPage}`}
      />
    </main>
  );
}
