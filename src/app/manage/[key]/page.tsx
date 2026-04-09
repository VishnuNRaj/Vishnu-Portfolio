import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ProjectInfiniteList,
  ExperienceInfiniteList,
  EducationInfiniteList,
  ContactInfiniteList,
  AuthKeyInfiniteList,
  SkillInfiniteList,
  SkillGroupInfiniteList,
  ProjectFormLauncher,
  ExperienceFormLauncher,
  EducationFormLauncher,
  SkillFormLauncher,
  SkillGroupFormLauncher,
} from "@/components/portfolio";
import { Button, SectionHeading, SurfaceCard } from "@/components/ui";
import { parsePositiveInt } from "@/lib";
import {
  listAuthKeys,
  listContacts,
  listEducation,
  listExperience,
  listProjects,
  listSkills,
  listSkillGroups,
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

  const skillPage = parsePositiveInt(
    typeof resolvedSearchParams.skillPage === "string"
      ? resolvedSearchParams.skillPage
      : undefined,
    1,
  );
  const skillGroupPage = parsePositiveInt(
    typeof resolvedSearchParams.skillGroupPage === "string"
      ? resolvedSearchParams.skillGroupPage
      : undefined,
    1,
  );

  const [
    projects,
    experience,
    education,
    contacts,
    authKeys,
    skills,
    skillGroups,
  ] = await Promise.all([
    listProjects(projectPage, 4),
    listExperience(experiencePage, 4),
    listEducation(educationPage, 4),
    listContacts(contactPage, 5),
    listAuthKeys(authPage, 5),
    listSkills(skillPage, 5),
    listSkillGroups(skillGroupPage, 5),
  ]);

  return (
    <main className="mx-auto max-w-7xl overflow-x-hidden space-y-10 px-6 py-16 sm:px-8">
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
        <ExperienceFormLauncher />
        <ProjectFormLauncher />
        <EducationFormLauncher />
        <SkillGroupFormLauncher />
        <SkillFormLauncher skillGroups={skillGroups.items} />
      </div>

      <section className="grid gap-6 xl:grid-cols-2">
        <SurfaceCard className="p-8">
          <div className="space-y-5 max-h-[400px] overflow-y-auto">
            <h2 className="text-2xl font-semibold tracking-[-0.05em]">
              Projects
            </h2>
            <ProjectInfiniteList
              initialItems={projects.items}
              initialPage={projects.page}
              totalPages={projects.totalPages}
              variant="compact"
              pageSize={4}
              showAdminOptions={true}
            />
          </div>
        </SurfaceCard>

        <SurfaceCard className="p-8">
          <div className="space-y-5 max-h-[400px] overflow-y-auto">
            <h2 className="text-2xl font-semibold tracking-[-0.05em]">
              Experience
            </h2>
            <ExperienceInfiniteList
              initialItems={experience.items}
              initialPage={experience.page}
              totalPages={experience.totalPages}
              variant="compact"
              pageSize={4}
              showAdminOptions={true}
            />
          </div>
        </SurfaceCard>

        <SurfaceCard className="p-8">
          <div className="space-y-5 max-h-[400px] overflow-y-auto">
            <h2 className="text-2xl font-semibold tracking-[-0.05em]">
              Education
            </h2>
            <EducationInfiniteList
              initialItems={education.items}
              initialPage={education.page}
              totalPages={education.totalPages}
              variant="compact"
              pageSize={4}
              showAdminOptions={true}
            />
          </div>
        </SurfaceCard>

        <SurfaceCard className="p-8">
          <div className="space-y-5 max-h-[400px] overflow-y-auto">
            <h2 className="text-2xl font-semibold tracking-[-0.05em]">
              Skills
            </h2>
            <SkillInfiniteList
              initialItems={skills.items}
              initialPage={skills.page}
              totalPages={skills.totalPages}
              pageSize={5}
              showAdminOptions={true}
              skillGroups={skillGroups.items}
            />
          </div>
        </SurfaceCard>

        <SurfaceCard className="p-8">
          <div className="space-y-5 max-h-[400px] overflow-y-auto">
            <h2 className="text-2xl font-semibold tracking-[-0.05em]">
              Skill Groups
            </h2>
            <SkillGroupInfiniteList
              initialItems={skillGroups.items}
              initialPage={skillGroups.page}
              totalPages={skillGroups.totalPages}
              pageSize={5}
              showAdminOptions={true}
            />
          </div>
        </SurfaceCard>

        <SurfaceCard className="p-8">
          <div className="space-y-5 max-h-[400px] overflow-y-auto">
            <h2 className="text-2xl font-semibold tracking-[-0.05em]">
              Contacts
            </h2>
            <ContactInfiniteList
              initialItems={contacts.items}
              initialPage={contacts.page}
              totalPages={contacts.totalPages}
              pageSize={5}
              showAdminOptions={true}
            />
          </div>
        </SurfaceCard>

        <SurfaceCard className="p-8 xl:col-span-2">
          <div className="space-y-5 max-h-[400px] overflow-y-auto">
            <h2 className="text-2xl font-semibold tracking-[-0.05em]">
              Auth keys
            </h2>
            <AuthKeyInfiniteList
              initialItems={authKeys.items}
              initialPage={authKeys.page}
              totalPages={authKeys.totalPages}
              pageSize={5}
            />
          </div>
        </SurfaceCard>
      </section>
    </main>
  );
}
