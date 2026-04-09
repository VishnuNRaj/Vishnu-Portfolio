"use server";

import { revalidatePath } from "next/cache";
import {
  listAuthKeys,
  listContacts,
  listEducation,
  listExperience,
  listProjects,
  listSkills,
  listSkillGroups,
  createProject,
  createExperience,
  createEducation,
  createSkill,
  createSkillGroup,
  updateProject,
  updateExperience,
  updateEducation,
  updateSkill,
  updateSkillGroup,
  deleteProject,
  deleteExperience,
  deleteEducation,
  deleteContact,
  deleteSkill,
  deleteSkillGroup,
} from "@/lib/server";
import { 
  type CreateProjectInput, 
  type CreateExperienceInput, 
  type CreateEducationInput, 
  type CreateSkillInput, 
  type CreateSkillGroupInput
} from "@/lib/portfolio/types";
import { uploadImage } from "@/lib/cloudinary";

export async function fetchProjectsAction(page: number, pageSize: number = 6, highlightedOnly?: boolean) {
  return await listProjects(page, pageSize, { highlightedOnly });
}

export async function fetchEducationAction(page: number, pageSize: number = 6) {
  return await listEducation(page, pageSize);
}

export async function fetchExperienceAction(page: number, pageSize: number = 6) {
  return await listExperience(page, pageSize);
}

export async function fetchContactsAction(page: number, pageSize: number = 10) {
  return await listContacts(page, pageSize);
}

export async function fetchAuthKeysAction(page: number, pageSize: number = 10) {
  return await listAuthKeys(page, pageSize);
}

export async function fetchSkillsAction(page: number, pageSize: number = 100) {
  return await listSkills(page, pageSize);
}

export async function fetchSkillGroupsAction(page: number, pageSize: number = 100) {
  return await listSkillGroups(page, pageSize);
}

// ----------------------------------------------------------------------
// Edit & Delete Actions
// ----------------------------------------------------------------------

export async function createProjectAction(input: CreateProjectInput) {
  const result = await createProject(input);
  revalidatePath("/", "layout");
  return result;
}

export async function updateProjectAction(id: string, input: CreateProjectInput) {
  const result = await updateProject(id, input);
  revalidatePath("/", "layout");
  return result;
}

export async function deleteProjectAction(id: string) {
  const result = await deleteProject(id);
  revalidatePath("/", "layout");
  return result;
}

export async function createExperienceAction(input: CreateExperienceInput) {
  const result = await createExperience(input);
  revalidatePath("/", "layout");
  return result;
}

export async function updateExperienceAction(id: string, input: CreateExperienceInput) {
  const result = await updateExperience(id, input);
  revalidatePath("/", "layout");
  return result;
}

export async function deleteExperienceAction(id: string) {
  const result = await deleteExperience(id);
  revalidatePath("/", "layout");
  return result;
}

export async function createEducationAction(input: CreateEducationInput) {
  const result = await createEducation(input);
  revalidatePath("/", "layout");
  return result;
}

export async function updateEducationAction(id: string, input: CreateEducationInput) {
  const result = await updateEducation(id, input);
  revalidatePath("/", "layout");
  return result;
}

export async function deleteEducationAction(id: string) {
  const result = await deleteEducation(id);
  revalidatePath("/", "layout");
  return result;
}

export async function createSkillAction(input: CreateSkillInput) {
  const result = await createSkill(input);
  revalidatePath("/", "layout");
  return result;
}

export async function updateSkillAction(id: string, input: CreateSkillInput) {
  const result = await updateSkill(id, input);
  revalidatePath("/", "layout");
  return result;
}

export async function deleteSkillAction(id: string) {
  const result = await deleteSkill(id);
  revalidatePath("/", "layout");
  return result;
}

export async function createSkillGroupAction(input: CreateSkillGroupInput) {
  const result = await createSkillGroup(input);
  revalidatePath("/", "layout");
  return result;
}

export async function updateSkillGroupAction(id: string, input: CreateSkillGroupInput) {
  const result = await updateSkillGroup(id, input);
  revalidatePath("/", "layout");
  return result;
}

export async function deleteSkillGroupAction(id: string) {
  const result = await deleteSkillGroup(id);
  revalidatePath("/", "layout");
  return result;
}

export async function deleteContactAction(id: string) {
  const result = await deleteContact(id);
  revalidatePath("/", "layout");
  return result;
}

export async function uploadSkillIconAction(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file || file.size === 0) {
    return null;
  }
  return uploadImage(file);
}

