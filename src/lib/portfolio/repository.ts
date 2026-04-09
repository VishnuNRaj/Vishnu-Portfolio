import "server-only";

import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import {
  embeddedEducation,
  embeddedExperience,
  embeddedProjects,
  embeddedSkills,
  embeddedSkillGroups,
  portfolioProfile,
} from "@/lib/portfolio/content";
import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import type {
  AuthKey,
  Contact,
  CreateContactInput,
  CreateEducationInput,
  CreateExperienceInput,
  CreateProjectInput,
  Education,
  Experience,
  PaginationResult,
  PortfolioProfile,
  Project,
  Skill,
  SkillGroup,
  CreateSkillInput,
  CreateSkillGroupInput,
} from "@/lib/portfolio/types";

const isDatabaseConfigured = () => Boolean(env.DATABASE_URL);

function sortByCreatedAtDesc<T extends { createdAt: string }>(items: T[]) {
  return [...items].sort((left, right) =>
    right.createdAt.localeCompare(left.createdAt),
  );
}

function uniqueById<T extends { id: string }>(items: T[]) {
  return Array.from(new Map(items.map((item) => [item.id, item])).values());
}

function mergeStaticAndDynamic<T extends { id: string; createdAt: string }>(
  embeddedItems: T[],
  storedItems: T[],
): T[] {
  return sortByCreatedAtDesc(uniqueById([...embeddedItems, ...storedItems]));
}

function toRecord<T>(row: unknown): T {
  const record = { ...(row as Record<string, unknown>) };
  if (record.createdAt instanceof Date) {
    record.createdAt = record.createdAt.toISOString();
  }
  if (record.expiresAt instanceof Date) {
    record.expiresAt = record.expiresAt.toISOString();
  }
  if (record.from !== undefined) {
    record.from = Number(record.from);
  }
  if (record.to !== undefined && record.to !== null) {
    record.to = Number(record.to);
  }
  return record as T;
}

function createAuthSignature(value: string) {
  return createHmac("sha256", env.ADMIN_ACCESS_SECRET)
    .update(value)
    .digest("base64url");
}

function createSignedAuthToken(payload: {
  id: string;
  email: string;
  createdAt: string;
  expiresAt: string;
}) {
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
    "base64url",
  );
  const signature = createAuthSignature(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

function parseSignedAuthToken(token: string) {
  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = createAuthSignature(encodedPayload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expectedSignature);

  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return null;
  }

  try {
    return JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8"),
    ) as AuthKey;
  } catch {
    return null;
  }
}

export function paginate<T>(
  items: T[],
  page: number,
  pageSize: number,
): PaginationResult<T> {
  const safePageSize = Math.max(1, pageSize);
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * safePageSize;

  return {
    items: items.slice(start, start + safePageSize),
    page: safePage,
    pageSize: safePageSize,
    totalItems,
    totalPages,
  };
}

export async function getPortfolioProfile(): Promise<PortfolioProfile> {
  return portfolioProfile;
}

// ---------------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------------

export async function listExperience(page = 1, pageSize = 6): Promise<PaginationResult<Experience>> {
  if (!isDatabaseConfigured()) {
    return paginate(sortByCreatedAtDesc(embeddedExperience), page, pageSize);
  }
  const rows = await prisma.experience.findMany({
    orderBy: { createdAt: "desc" },
  });
  const storedItems = rows.map((r) => toRecord<Experience>(r));
  return paginate(
    mergeStaticAndDynamic(embeddedExperience, storedItems),
    page,
    pageSize,
  );
}

export async function createExperience(
  input: CreateExperienceInput,
): Promise<Experience> {
  const row = await prisma.experience.create({
    data: {
      companyName: input.companyName,
      from: input.from,
      to: input.to ?? null,
      description: input.description,
      jobRole: input.jobRole,
      location: input.location,
      stacks: input.stacks,
    },
  });
  return toRecord<Experience>(row);
}

export async function updateExperience(
  id: string,
  input: CreateExperienceInput,
): Promise<Experience> {
  const row = await prisma.experience.upsert({
    where: { id },
    create: {
      id,
      companyName: input.companyName,
      from: input.from,
      to: input.to ?? null,
      description: input.description,
      jobRole: input.jobRole,
      location: input.location,
      stacks: input.stacks,
    },
    update: {
      companyName: input.companyName,
      from: input.from,
      to: input.to ?? null,
      description: input.description,
      jobRole: input.jobRole,
      location: input.location,
      stacks: input.stacks,
    },
  });
  return toRecord<Experience>(row);
}

export async function deleteExperience(id: string): Promise<{ enabled: boolean }> {
  await prisma.experience.deleteMany({ where: { id } });
  return { enabled: true };
}

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export async function listProjects(
  page = 1,
  pageSize = 8,
  options?: { highlightedOnly?: boolean },
): Promise<PaginationResult<Project>> {
  if (!isDatabaseConfigured()) {
    const items = options?.highlightedOnly
      ? embeddedProjects.filter((p) => p.isHighlighted)
      : embeddedProjects;
    return paginate(sortByCreatedAtDesc(items), page, pageSize);
  }
  const rows = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
  const storedItems = rows.map((r) => toRecord<Project>(r));
  const mergedItems = mergeStaticAndDynamic(embeddedProjects, storedItems);
  const items = options?.highlightedOnly
    ? mergedItems.filter((project) => project.isHighlighted)
    : mergedItems;
  return paginate(items, page, pageSize);
}

export async function createProject(
  input: CreateProjectInput,
): Promise<Project> {
  const row = await prisma.project.create({
    data: {
      companyId: input.companyId ?? null,
      projectName: input.projectName,
      projectType: input.projectType,
      stacks: input.stacks,
      description: input.description,
      isHighlighted: input.isHighlighted,
      impact: input.impact,
      href: input.href ?? null,
    },
  });
  return toRecord<Project>(row);
}

export async function updateProject(id: string, input: CreateProjectInput): Promise<Project> {
  const row = await prisma.project.upsert({
    where: { id },
    create: {
      id,
      companyId: input.companyId ?? null,
      projectName: input.projectName,
      projectType: input.projectType,
      stacks: input.stacks,
      description: input.description,
      isHighlighted: input.isHighlighted,
      impact: input.impact,
      href: input.href ?? null,
    },
    update: {
      companyId: input.companyId ?? null,
      projectName: input.projectName,
      projectType: input.projectType,
      stacks: input.stacks,
      description: input.description,
      isHighlighted: input.isHighlighted,
      impact: input.impact,
      href: input.href ?? null,
    },
  });
  return toRecord<Project>(row);
}

export async function deleteProject(id: string): Promise<{ enabled: boolean }> {
  await prisma.project.deleteMany({ where: { id } });
  return { enabled: true };
}

// ---------------------------------------------------------------------------
// Education
// ---------------------------------------------------------------------------

export async function listEducation(page = 1, pageSize = 6): Promise<PaginationResult<Education>> {
  if (!isDatabaseConfigured()) {
    return paginate(sortByCreatedAtDesc(embeddedEducation), page, pageSize);
  }
  const rows = await prisma.education.findMany({
    orderBy: { createdAt: "desc" },
  });
  const storedItems = rows.map((r) => toRecord<Education>(r));
  return paginate(
    mergeStaticAndDynamic(embeddedEducation, storedItems),
    page,
    pageSize,
  );
}

export async function createEducation(
  input: CreateEducationInput,
): Promise<Education> {
  const row = await prisma.education.create({
    data: {
      collegeName: input.collegeName,
      location: input.location,
      course: input.course,
      branch: input.branch,
      from: input.from,
      to: input.to ?? null,
    },
  });
  return toRecord<Education>(row);
}

export async function updateEducation(id: string, input: CreateEducationInput): Promise<Education> {
  const row = await prisma.education.upsert({
    where: { id },
    create: {
      id,
      collegeName: input.collegeName,
      location: input.location,
      course: input.course,
      branch: input.branch,
      from: input.from,
      to: input.to ?? null,
    },
    update: {
      collegeName: input.collegeName,
      location: input.location,
      course: input.course,
      branch: input.branch,
      from: input.from,
      to: input.to ?? null,
    },
  });
  return toRecord<Education>(row);
}

export async function deleteEducation(id: string): Promise<{ enabled: boolean }> {
  await prisma.education.deleteMany({ where: { id } });
  return { enabled: true };
}

// ---------------------------------------------------------------------------
// Contacts
// ---------------------------------------------------------------------------

export async function listContacts(page = 1, pageSize = 10): Promise<PaginationResult<Contact>> {
  if (!isDatabaseConfigured()) {
    return paginate([] as Contact[], page, pageSize);
  }
  const rows = await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
  });
  return paginate(
    rows.map((r) => toRecord<Contact>(r)),
    page,
    pageSize,
  );
}

export async function createContact(
  input: CreateContactInput,
): Promise<Contact> {
  const row = await prisma.contact.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone: input.phone,
      reason: input.reason,
    },
  });
  return toRecord<Contact>(row);
}

export async function deleteContact(id: string): Promise<{ enabled: boolean }> {
  await prisma.contact.deleteMany({ where: { id } });
  return { enabled: true };
}

// ---------------------------------------------------------------------------
// Auth Keys
// ---------------------------------------------------------------------------

export async function listAuthKeys(page = 1, pageSize = 10): Promise<PaginationResult<AuthKey>> {
  if (!isDatabaseConfigured()) {
    return paginate([] as AuthKey[], page, pageSize);
  }
  const rows = await prisma.authKey.findMany({
    orderBy: { createdAt: "desc" },
  });
  return paginate(
    rows.map((r) => toRecord<AuthKey>(r)),
    page,
    pageSize,
  );
}

export async function createAuthKey(email: string): Promise<AuthKey> {
  const createdAt = new Date();
  const expiresAt = new Date(createdAt.getTime() + 24 * 60 * 60 * 1000);
  const payload = {
    id: randomUUID(),
    email,
    createdAt: createdAt.toISOString(),
    expiresAt: expiresAt.toISOString(),
  };
  const authKeyToken = createSignedAuthToken(payload);

  const row = await prisma.authKey.create({
    data: {
      id: payload.id,
      authKey: authKeyToken,
      email,
      createdAt,
      expiresAt,
    },
  });

  return toRecord<AuthKey>(row);
}

export async function getValidAuthKey(authKey: string): Promise<AuthKey | null> {
  const match = parseSignedAuthToken(authKey);

  if (!match || new Date(match.expiresAt).getTime() <= Date.now()) {
    return null;
  }
  return match;
}

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------

export async function listSkills(page = 1, pageSize = 100): Promise<PaginationResult<Skill>> {
  if (!isDatabaseConfigured()) {
    return paginate(sortByCreatedAtDesc(embeddedSkills), page, pageSize);
  }
  const rows = await prisma.skill.findMany({
    orderBy: { createdAt: "desc" },
  });
  const storedItems = rows.map((r) => toRecord<Skill>(r));
  return paginate(
    mergeStaticAndDynamic(embeddedSkills, storedItems),
    page,
    pageSize,
  );
}

export async function createSkill(input: CreateSkillInput): Promise<Skill> {
  const row = await prisma.skill.create({
    data: {
      name: input.name,
      groupId: input.groupId,
      icon: input.icon ?? null,
      isHighlighted: input.isHighlighted,
    },
  });
  return toRecord<Skill>(row);
}

export async function updateSkill(id: string, input: CreateSkillInput): Promise<Skill> {
  const row = await prisma.skill.upsert({
    where: { id },
    create: {
      id,
      name: input.name,
      groupId: input.groupId,
      icon: input.icon ?? null,
      isHighlighted: input.isHighlighted,
    },
    update: {
      name: input.name,
      groupId: input.groupId,
      icon: input.icon ?? null,
      isHighlighted: input.isHighlighted,
    },
  });
  return toRecord<Skill>(row);
}

export async function deleteSkill(id: string): Promise<{ enabled: boolean }> {
  await prisma.skill.deleteMany({ where: { id } });
  return { enabled: true };
}

// ---------------------------------------------------------------------------
// Skill Groups
// ---------------------------------------------------------------------------

export async function listSkillGroups(page = 1, pageSize = 100): Promise<PaginationResult<SkillGroup>> {
  if (!isDatabaseConfigured()) {
    return paginate(
      [...embeddedSkillGroups].sort((a, b) => a.order - b.order),
      page,
      pageSize,
    );
  }
  const rows = await prisma.skillGroup.findMany({
    orderBy: { order: "asc" },
  });
  const storedItems = rows.map((r) => toRecord<SkillGroup>(r));
  const mergedItems = mergeStaticAndDynamic(
    embeddedSkillGroups,
    storedItems,
  ).sort((a, b) => a.order - b.order);
  return paginate(mergedItems, page, pageSize);
}

export async function createSkillGroup(input: CreateSkillGroupInput): Promise<SkillGroup> {
  const row = await prisma.skillGroup.create({
    data: {
      title: input.title,
      order: input.order,
    },
  });
  return toRecord<SkillGroup>(row);
}

export async function updateSkillGroup(
  id: string,
  input: CreateSkillGroupInput,
): Promise<SkillGroup> {
  const row = await prisma.skillGroup.upsert({
    where: { id },
    create: {
      id,
      title: input.title,
      order: input.order,
    },
    update: {
      title: input.title,
      order: input.order,
    },
  });
  return toRecord<SkillGroup>(row);
}

export async function deleteSkillGroup(id: string): Promise<{ enabled: boolean }> {
  await prisma.skillGroup.deleteMany({ where: { id } });
  return { enabled: true };
}
