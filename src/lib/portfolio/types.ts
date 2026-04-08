export type YearValue = number;

export enum EProjectType {
  MY_WORKS = "my_works",
  FREELANCE = "freelance",
  COMPANY_PROJECTS = "company_projects",
}

export type Experience = {
  id: string;
  companyName: string;
  from: YearValue;
  to: YearValue | null;
  description: string;
  jobRole: string;
  createdAt: string;
  location: string;
  stacks: string[];
};

export type Project = {
  id: string;
  companyId?: string | null;
  projectName: string;
  projectType: EProjectType;
  stacks: string[];
  description: string;
  isHighlighted: boolean;
  createdAt: string;
  impact: string;
  href?: string;
};

export type Education = {
  id: string;
  collegeName: string;
  location: string;
  course: string;
  branch: string;
  from: YearValue;
  to: YearValue | null;
  createdAt: string;
};

export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  reason: string;
  createdAt: string;
};

export type AuthKey = {
  id: string;
  authKey: string;
  email: string;
  createdAt: string;
  expiresAt: string;
};

export type PortfolioProfile = {
  fullName: string;
  title: string;
  summary: string;
  objective: string;
  location: string;
  email: string;
  phone: string;
  githubUrl: string;
  linkedinUrl: string;
  availability: string;
  capabilities: Array<{
    title: string;
    description: string;
  }>;
  metrics: Array<{
    label: string;
    value: string;
  }>;
  skillGroups: Array<{
    title: string;
    items: string[];
  }>;
};

export type PaginationResult<T> = {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type CreateExperienceInput = Omit<Experience, "id" | "createdAt">;
export type CreateProjectInput = Omit<Project, "id" | "createdAt">;
export type CreateEducationInput = Omit<Education, "id" | "createdAt">;
export type CreateContactInput = Omit<Contact, "id" | "createdAt">;
