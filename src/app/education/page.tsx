import Link from "next/link";
import { EducationInfiniteList } from "@/components/portfolio";
import { Button, SectionHeading } from "@/components/ui";
import { listEducation } from "@/lib/server";

export default async function EducationPage() {
  const education = await listEducation(1, 5);

  return (
    <main className="mx-auto max-w-6xl space-y-10 px-6 py-16 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SectionHeading
          eyebrow="My Education"
          title="My learning and training"
          description="My formal academic background and technical training."
        />
        <Link href="/">
          <Button variant="secondary">Back home</Button>
        </Link>
      </div>
      <EducationInfiniteList 
        initialItems={education.items}
        initialPage={education.page}
        totalPages={education.totalPages}
      />
    </main>
  );
}
