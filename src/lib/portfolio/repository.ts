import "server-only";

import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

import {
  embeddedEducation,
  embeddedExperience,
  embeddedProjects,
  portfolioProfile,
} from "@/lib/portfolio/content";
import { env } from "@/lib/env";
import {
  ensureMilvusCollections,
  listMilvusRecords,
  storeMilvusRecord,
} from "@/lib/milvus";
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
} from "@/lib/portfolio/types";

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
) {
  return sortByCreatedAtDesc(uniqueById([...storedItems, ...embeddedItems]));
}

function createAuthSignature(value: string) {
  return createHmac("sha256", env.ADMIN_ACCESS_SECRET).update(value).digest("base64url");
}

function createSignedAuthToken(payload: {
  id: string;
  email: string;
  createdAt: string;
  expiresAt: string;
}) {
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
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
    return JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as AuthKey;
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

export async function listExperience(page = 1, pageSize = 6) {
  const storedItems = await listMilvusRecords<Experience>("experience");
  return paginate(mergeStaticAndDynamic(embeddedExperience, storedItems), page, pageSize);
}

export async function listProjects(
  page = 1,
  pageSize = 8,
  options?: { highlightedOnly?: boolean },
) {
  const storedItems = await listMilvusRecords<Project>("projects");
  const mergedItems = mergeStaticAndDynamic(embeddedProjects, storedItems);
  const items = options?.highlightedOnly
    ? mergedItems.filter((project) => project.isHighlighted)
    : mergedItems;

  return paginate(items, page, pageSize);
}

export async function listEducation(page = 1, pageSize = 6) {
  const storedItems = await listMilvusRecords<Education>("education");
  return paginate(mergeStaticAndDynamic(embeddedEducation, storedItems), page, pageSize);
}

export async function listContacts(page = 1, pageSize = 10) {
  const contacts = await listMilvusRecords<Contact>("contacts");
  return paginate(sortByCreatedAtDesc(contacts), page, pageSize);
}

export async function listAuthKeys(page = 1, pageSize = 10) {
  const authKeys = await listMilvusRecords<AuthKey>("auth_keys");
  return paginate(sortByCreatedAtDesc(authKeys), page, pageSize);
}

export async function createExperience(
  input: CreateExperienceInput,
): Promise<Experience> {
  const entry: Experience = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...input,
  };

  await ensureMilvusCollections();
  await storeMilvusRecord("experience", entry.id, entry, {
    title: `${entry.jobRole} at ${entry.companyName}`,
    body: `${entry.description} ${entry.stacks.join(" ")}`,
    email: "",
  });

  return entry;
}

export async function createProject(input: CreateProjectInput): Promise<Project> {
  const entry: Project = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...input,
  };

  await ensureMilvusCollections();
  await storeMilvusRecord("projects", entry.id, entry, {
    title: entry.projectName,
    body: `${entry.description} ${entry.impact} ${entry.stacks.join(" ")}`,
    email: "",
  });

  return entry;
}

export async function createEducation(
  input: CreateEducationInput,
): Promise<Education> {
  const entry: Education = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...input,
  };

  await ensureMilvusCollections();
  await storeMilvusRecord("education", entry.id, entry, {
    title: `${entry.course} at ${entry.collegeName}`,
    body: `${entry.branch} ${entry.location}`,
    email: "",
  });

  return entry;
}

export async function createContact(input: CreateContactInput): Promise<Contact> {
  const entry: Contact = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...input,
  };

  await ensureMilvusCollections();
  await storeMilvusRecord("contacts", entry.id, entry, {
    title: `${entry.firstName} ${entry.lastName}`,
    body: `${entry.reason} ${entry.phone}`,
    email: entry.email,
  });

  return entry;
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
  const entry: AuthKey = {
    ...payload,
    authKey: createSignedAuthToken(payload),
  };

  await ensureMilvusCollections();
  await storeMilvusRecord("auth_keys", entry.id, entry, {
    title: email,
    body: `Admin access key for ${email}`,
    email,
    expiresAt: entry.expiresAt,
  });

  return entry;
}

export async function getValidAuthKey(authKey: string) {
  const match = parseSignedAuthToken(authKey);

  if (!match) {
    return null;
  }

  if (new Date(match.expiresAt).getTime() <= Date.now()) {
    return null;
  }

  return match;
}
