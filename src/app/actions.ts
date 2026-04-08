"use server";

import {
  listAuthKeys,
  listContacts,
  listEducation,
  listExperience,
  listProjects,
} from "@/lib/server";

export async function fetchProjectsAction(page: number, pageSize: number = 6, highlightedOnly?: boolean) {
  return listProjects(page, pageSize, { highlightedOnly });
}

export async function fetchEducationAction(page: number, pageSize: number = 6) {
  return listEducation(page, pageSize);
}

export async function fetchExperienceAction(page: number, pageSize: number = 6) {
  return listExperience(page, pageSize);
}

export async function fetchContactsAction(page: number, pageSize: number = 10) {
  return listContacts(page, pageSize);
}

export async function fetchAuthKeysAction(page: number, pageSize: number = 10) {
  return listAuthKeys(page, pageSize);
}
