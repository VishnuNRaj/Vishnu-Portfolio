import { z } from "zod";

import { EProjectType } from "@/lib/portfolio/types";

const trimmedString = z.string().trim();

export const experienceInputSchema = z.object({
  companyName: trimmedString.min(1),
  from: z.coerce.number().int(),
  to: z.coerce.number().int().nullable(),
  description: trimmedString.min(1),
  jobRole: trimmedString.min(1),
  location: trimmedString.min(1),
  stacks: z.array(trimmedString.min(1)).min(1),
});

export const projectInputSchema = z.object({
  companyId: trimmedString.min(1).nullable().optional(),
  projectName: trimmedString.min(1),
  projectType: z.nativeEnum(EProjectType),
  stacks: z.array(trimmedString.min(1)).min(1),
  description: trimmedString.min(1),
  isHighlighted: z.boolean(),
  impact: trimmedString.min(1),
  href: trimmedString.url().optional(),
});

export const educationInputSchema = z.object({
  collegeName: trimmedString.min(1),
  location: trimmedString.min(1),
  course: trimmedString.min(1),
  branch: trimmedString.min(1),
  from: z.coerce.number().int(),
  to: z.coerce.number().int().nullable(),
});

export const contactInputSchema = z.object({
  firstName: trimmedString.min(1),
  lastName: trimmedString.min(1),
  email: trimmedString.email(),
  phone: trimmedString.min(6),
  reason: trimmedString.min(3),
  website: trimmedString.max(0).optional(),
  formStartedAt: z.coerce.number().optional(),
});
