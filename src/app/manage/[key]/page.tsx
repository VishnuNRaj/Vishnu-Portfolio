import Link from "next/link";
import { notFound } from "next/navigation";

import { AdminCreateForms, PaginationNav } from "@/components/portfolio";
import { Button, SectionHeading, SurfaceCard } from "@/components/ui";
import { parsePositiveInt } from "@/lib";
import {
  listAuthKeys,
  listContacts,
  listEducation,
  listExperience,
  listProjects,
  requireAuthKey,
} from "@/lib/server";

type PageProps = {
  params: Promise<{ key: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ManagePage({ params, searchParams }: PageProps) {
  const { key } = await params;
  const auth = await requireAuthKey(key);

  if (!auth) {
    notFound();
  }

  const resolvedSearchParams = await searchParams;
  const projectPage = parsePositiveInt(
    typeof resolvedSearchParams.projectPage === "string"
      ? resolvedSearchParams.projectPage
      : undefined,
    1,
  );
  const experiencePage = parsePositiveInt(
    typeof resolvedSearchParams.experiencePage === "string"
      ? resolvedSearchParams.experiencePage
      : undefined,
    1,
  );
  const educationPage = parsePositiveInt(
    typeof resolvedSearchParams.educationPage === "string"
      ? resolvedSearchParams.educationPage
      : undefined,
    1,
  );
  const contactPage = parsePositiveInt(
    typeof resolvedSearchParams.contactPage === "string"
      ? resolvedSearchParams.contactPage
      : undefined,
    1,
  );
  const authPage = parsePositiveInt(
    typeof resolvedSearchParams.authPage === "string"
      ? resolvedSearchParams.authPage
      : undefined,
    1,
  );

  const [projects, experience, education, contacts, authKeys] = await Promise.all([
    listProjects(projectPage, 4),
    listExperience(experiencePage, 4),
    listEducation(educationPage, 4),
    listContacts(contactPage, 5),
    listAuthKeys(authPage, 5),
  ]);

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-6 py-16 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SectionHeading
          eyebrow="Manage"
          title="Portfolio admin surface"
          description={`Signed in as ${auth.email}. This key stays valid until ${new Date(auth.expiresAt).toLocaleString()}.`}
        />
        <Link href="/">
          <Button variant="secondary">Back home</Button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="#add-experience">
          <Button>Add experience</Button>
        </Link>
        <Link href="#add-project">
          <Button>Add project</Button>
        </Link>
        <Link href="#add-education">
          <Button>Add education</Button>
        </Link>
      </div>

      <AdminCreateForms authKey={key} />

      <section className="grid gap-6 xl:grid-cols-2">
        <SurfaceCard className="p-8">
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold tracking-[-0.05em]">Projects</h2>
            {projects.items.map((project) => (
              <div key={project.id} className="border-b border-line pb-4 last:border-b-0">
                <p className="font-medium">{project.projectName}</p>
                <p className="text-sm text-muted">{project.projectType}</p>
              </div>
            ))}
            <PaginationNav
              page={projects.page}
              totalPages={projects.totalPages}
              buildHref={(page) => `/manage/${key}?projectPage=${page}&experiencePage=${experiencePage}&educationPage=${educationPage}&contactPage=${contactPage}&authPage=${authPage}`}
            />
          </div>
        </SurfaceCard>

        <SurfaceCard className="p-8">
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold tracking-[-0.05em]">Experience</h2>
            {experience.items.map((item) => (
              <div key={item.id} className="border-b border-line pb-4 last:border-b-0">
                <p className="font-medium">{item.jobRole}</p>
                <p className="text-sm text-muted">{item.companyName}</p>
              </div>
            ))}
            <PaginationNav
              page={experience.page}
              totalPages={experience.totalPages}
              buildHref={(page) => `/manage/${key}?projectPage=${projectPage}&experiencePage=${page}&educationPage=${educationPage}&contactPage=${contactPage}&authPage=${authPage}`}
            />
          </div>
        </SurfaceCard>

        <SurfaceCard className="p-8">
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold tracking-[-0.05em]">Education</h2>
            {education.items.map((item) => (
              <div key={item.id} className="border-b border-line pb-4 last:border-b-0">
                <p className="font-medium">{item.course}</p>
                <p className="text-sm text-muted">{item.collegeName}</p>
              </div>
            ))}
            <PaginationNav
              page={education.page}
              totalPages={education.totalPages}
              buildHref={(page) => `/manage/${key}?projectPage=${projectPage}&experiencePage=${experiencePage}&educationPage=${page}&contactPage=${contactPage}&authPage=${authPage}`}
            />
          </div>
        </SurfaceCard>

        <SurfaceCard className="p-8">
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold tracking-[-0.05em]">Contacts</h2>
            {contacts.items.map((item) => (
              <div key={item.id} className="border-b border-line pb-4 last:border-b-0">
                <p className="font-medium">
                  {item.firstName} {item.lastName}
                </p>
                <p className="text-sm text-muted">{item.email}</p>
              </div>
            ))}
            <PaginationNav
              page={contacts.page}
              totalPages={contacts.totalPages}
              buildHref={(page) => `/manage/${key}?projectPage=${projectPage}&experiencePage=${experiencePage}&educationPage=${educationPage}&contactPage=${page}&authPage=${authPage}`}
            />
          </div>
        </SurfaceCard>

        <SurfaceCard className="p-8 xl:col-span-2">
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold tracking-[-0.05em]">Auth keys</h2>
            {authKeys.items.map((item) => (
              <div key={item.id} className="grid gap-2 border-b border-line pb-4 last:border-b-0">
                <p className="font-medium">{item.email}</p>
                <p className="break-all text-sm text-muted">{item.authKey}</p>
                <p className="text-sm text-foreground/80">
                  Expires {new Date(item.expiresAt).toLocaleString()}
                </p>
              </div>
            ))}
            <PaginationNav
              page={authKeys.page}
              totalPages={authKeys.totalPages}
              buildHref={(page) => `/manage/${key}?projectPage=${projectPage}&experiencePage=${experiencePage}&educationPage=${educationPage}&contactPage=${contactPage}&authPage=${page}`}
            />
          </div>
        </SurfaceCard>
      </section>
    </main>
  );
}
