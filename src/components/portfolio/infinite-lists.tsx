"use client";

import Link from "next/link";
import * as LucideIcons from "lucide-react";
import type {
  AuthKey,
  Contact,
  Education,
  Experience,
  Project,
  Skill,
  SkillGroup,
} from "@/lib/portfolio/types";
import {
  fetchAuthKeysAction,
  fetchContactsAction,
  fetchEducationAction,
  fetchExperienceAction,
  fetchProjectsAction,
  fetchSkillsAction,
  fetchSkillGroupsAction,
  deleteProjectAction,
  deleteExperienceAction,
  deleteEducationAction,
  deleteContactAction,
  deleteSkillAction,
  deleteSkillGroupAction,
} from "@/app/actions";
import { InfiniteScroll, SurfaceCard } from "@/components/ui";
import {
  ProjectFormLauncher,
  ExperienceFormLauncher,
  EducationFormLauncher,
  SkillFormLauncher,
  SkillGroupFormLauncher,
  DeleteButton,
} from "./admin-forms";
import Image from "next/image";

export function ProjectInfiniteList({
  initialItems,
  initialPage,
  totalPages,
  variant = "full",
  pageSize = 6,
  showAdminOptions,
}: {
  initialItems: Project[];
  initialPage: number;
  totalPages: number;
  variant?: "full" | "compact";
  pageSize?: number;
  showAdminOptions?: boolean;
}) {
  return (
    <InfiniteScroll
      initialItems={initialItems}
      initialPage={initialPage}
      totalPages={totalPages}
      action={(page) => fetchProjectsAction(page, pageSize)}
      listClassName={
        variant === "full" ? "grid gap-6 md:grid-cols-2" : "space-y-4"
      }
      renderItem={(project) =>
        variant === "full" ? (
          <SurfaceCard
            key={project.id}
            className="flex h-full flex-col gap-5 p-8"
          >
            <div className="space-y-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted">
                {project.projectType.replaceAll("_", " ")}
              </p>
              <h2 className="text-3xl font-semibold tracking-[-0.05em]">
                {project.projectName}
              </h2>
              <p className="text-base leading-8 text-muted">
                {project.description}
              </p>
            </div>
            <p className="text-sm leading-7 text-foreground/80">
              {project.impact}
            </p>
            <p className="text-sm text-muted">{project.stacks.join(" / ")}</p>
            {project.href ? (
              <Link
                href={project.href}
                className="text-sm font-medium text-accent"
              >
                Open project link
              </Link>
            ) : null}
          </SurfaceCard>
        ) : (
          <div
            key={project.id}
            className="border-b border-line pb-4 last:border-b-0 flex items-center justify-between group"
          >
            <div>
              <p className="font-medium">{project.projectName}</p>
              <p className="text-sm text-muted">{project.projectType}</p>
            </div>
            {showAdminOptions && (
              <div className="flex gap-2">
                <ProjectFormLauncher initialData={project} />
                <DeleteButton id={project.id} onDelete={deleteProjectAction} />
              </div>
            )}
          </div>
        )
      }
    />
  );
}

export function EducationInfiniteList({
  initialItems,
  initialPage,
  totalPages,
  variant = "full",
  pageSize = 6,
  showAdminOptions,
}: {
  initialItems: Education[];
  initialPage: number;
  totalPages: number;
  variant?: "full" | "compact";
  pageSize?: number;
  showAdminOptions?: boolean;
}) {
  return (
    <InfiniteScroll
      initialItems={initialItems}
      initialPage={initialPage}
      totalPages={totalPages}
      action={(page) => fetchEducationAction(page, pageSize)}
      listClassName={variant === "full" ? "grid gap-6" : "space-y-4"}
      renderItem={(item) =>
        variant === "full" ? (
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
        ) : (
          <div
            key={item.id}
            className="border-b border-line pb-4 last:border-b-0 flex items-center justify-between group"
          >
            <div>
              <p className="font-medium">{item.course}</p>
              <p className="text-sm text-muted">{item.collegeName}</p>
            </div>
            {showAdminOptions && (
              <div className="flex gap-2">
                <EducationFormLauncher initialData={item} />
                <DeleteButton id={item.id} onDelete={deleteEducationAction} />
              </div>
            )}
          </div>
        )
      }
    />
  );
}

export function ExperienceInfiniteList({
  initialItems,
  initialPage,
  totalPages,
  variant = "full",
  pageSize = 6,
  showAdminOptions,
}: {
  initialItems: Experience[];
  initialPage: number;
  totalPages: number;
  variant?: "full" | "compact";
  pageSize?: number;
  showAdminOptions?: boolean;
}) {
  return (
    <InfiniteScroll
      initialItems={initialItems}
      initialPage={initialPage}
      totalPages={totalPages}
      action={(page) => fetchExperienceAction(page, pageSize)}
      listClassName={variant === "full" ? "space-y-8" : "space-y-4"}
      renderItem={(item) =>
        variant === "full" ? (
          <div key={item.id} className="border-l-2 border-line pl-6">
            <div className="space-y-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted">
                {item.from} — {item.to || "Present"}
              </p>
              <h3 className="text-xl font-semibold">{item.jobRole}</h3>
              <p className="text-foreground/80">{item.companyName}</p>
              <p className="text-sm text-muted">{item.description}</p>
            </div>
          </div>
        ) : (
          <div
            key={item.id}
            className="border-b border-line pb-4 last:border-b-0 flex items-center justify-between group"
          >
            <div>
              <p className="font-medium">{item.jobRole}</p>
              <p className="text-sm text-muted">{item.companyName}</p>
            </div>
            {showAdminOptions && (
              <div className="flex gap-2">
                <ExperienceFormLauncher initialData={item} />
                <DeleteButton id={item.id} onDelete={deleteExperienceAction} />
              </div>
            )}
          </div>
        )
      }
    />
  );
}

export function ContactInfiniteList({
  initialItems,
  initialPage,
  totalPages,
  pageSize = 10,
  showAdminOptions,
}: {
  initialItems: Contact[];
  initialPage: number;
  totalPages: number;
  pageSize?: number;
  showAdminOptions?: boolean;
}) {
  return (
    <InfiniteScroll
      initialItems={initialItems}
      initialPage={initialPage}
      totalPages={totalPages}
      action={(page) => fetchContactsAction(page, pageSize)}
      listClassName="space-y-5"
      renderItem={(item: Contact) => (
        <div
          key={item.id}
          className="border-b border-line pb-4 last:border-b-0 flex items-center justify-between group"
        >
          <div>
            <p className="font-medium">
              {item.firstName} {item.lastName}
            </p>
            <p className="text-sm text-muted">{item.email}</p>
          </div>
          {showAdminOptions && (
            <DeleteButton id={item.id} onDelete={deleteContactAction} />
          )}
        </div>
      )}
    />
  );
}

export function AuthKeyInfiniteList({
  initialItems,
  initialPage,
  totalPages,
  pageSize = 10,
}: {
  initialItems: AuthKey[];
  initialPage: number;
  totalPages: number;
  pageSize?: number;
}) {
  return (
    <InfiniteScroll
      initialItems={initialItems}
      initialPage={initialPage}
      totalPages={totalPages}
      action={(page) => fetchAuthKeysAction(page, pageSize)}
      listClassName="space-y-5"
      renderItem={(item: AuthKey) => (
        <div
          key={item.id}
          className="grid border-b border-line pb-4 last:border-b-0"
        >
          <p className="font-medium">{item.email}</p>
          <p className="break-all text-sm text-muted">{item.authKey}</p>
          <p className="text-sm text-foreground/80 mt-2">
            Expires {new Date(item.expiresAt).toLocaleString()}
          </p>
        </div>
      )}
    />
  );
}

export function SkillInfiniteList({
  initialItems,
  initialPage,
  totalPages,
  pageSize = 10,
  showAdminOptions,
  skillGroups = [],
}: {
  initialItems: Skill[];
  initialPage: number;
  totalPages: number;
  pageSize?: number;
  showAdminOptions?: boolean;
  skillGroups?: SkillGroup[];
}) {
  return (
    <InfiniteScroll
      initialItems={initialItems}
      initialPage={initialPage}
      totalPages={totalPages}
      action={(page) => fetchSkillsAction(page, pageSize)}
      listClassName="space-y-4"
      renderItem={(item: Skill) => {
        const isUrl = item.icon?.startsWith("http");
        const Icon =
          !isUrl && item.icon ? (LucideIcons as unknown as Record<string, React.ElementType>)[item.icon] : null;

        return (
          <div
            key={item.id}
            className="border-b border-line pb-4 last:border-b-0 flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="flex size-10 items-center justify-center rounded-xl border border-line bg-background/50">
                {isUrl ? (
                  <Image
                    src={item.icon!}
                    alt={item.name}
                    width={24}
                    height={24}
                    className="size-6 object-contain"
                  />
                ) : Icon ? (
                  <Icon className="size-6 text-muted-strong" />
                ) : (
                  <LucideIcons.Box className="size-6 text-muted" />
                )}
              </div>
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted">
                  Group: {item.groupId}{" "}
                  {item.isHighlighted ? "• Highlighted" : ""}
                </p>
              </div>
            </div>
            {showAdminOptions && (
              <div className="flex gap-2">
                <SkillFormLauncher
                  initialData={item}
                  skillGroups={skillGroups}
                />
                <DeleteButton id={item.id} onDelete={deleteSkillAction} />
              </div>
            )}
          </div>
        );
      }}
    />
  );
}

export function SkillGroupInfiniteList({
  initialItems,
  initialPage,
  totalPages,
  pageSize = 10,
  showAdminOptions,
}: {
  initialItems: SkillGroup[];
  initialPage: number;
  totalPages: number;
  pageSize?: number;
  showAdminOptions?: boolean;
}) {
  return (
    <InfiniteScroll
      initialItems={initialItems}
      initialPage={initialPage}
      totalPages={totalPages}
      action={(page) => fetchSkillGroupsAction(page, pageSize)}
      listClassName="space-y-4"
      renderItem={(item: SkillGroup) => (
        <div
          key={item.id}
          className="border-b border-line pb-4 last:border-b-0 flex items-center justify-between group"
        >
          <div>
            <p className="font-medium">{item.title}</p>
            <p className="text-sm text-muted">Order: {item.order}</p>
          </div>
          {showAdminOptions && (
            <div className="flex gap-2">
              <SkillGroupFormLauncher initialData={item} />
              <DeleteButton id={item.id} onDelete={deleteSkillGroupAction} />
            </div>
          )}
        </div>
      )}
    />
  );
}
