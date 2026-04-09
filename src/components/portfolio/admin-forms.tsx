"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Edit2, Plus, Trash2 } from "lucide-react";

import { Button, Sheet } from "@/components/ui";

import type {
  Project,
  Experience,
  Education,
  Skill,
  SkillGroup,
  CreateSkillInput,
  CreateExperienceInput,
  CreateEducationInput,
  CreateSkillGroupInput,
} from "@/lib/portfolio/types";
import { EProjectType } from "@/lib";
import {
  createProjectAction,
  updateProjectAction,
  createExperienceAction,
  updateExperienceAction,
  createEducationAction,
  updateEducationAction,
  createSkillAction,
  updateSkillAction,
  createSkillGroupAction,
  updateSkillGroupAction,
  uploadSkillIconAction,
} from "@/app/actions";

// Generic Form Container
function FormContainer({
  title,
  isOpen,
  onClose,
  onSubmit,
  isPending,
  children,
  error,
}: {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  isPending: boolean;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <Sheet isOpen={isOpen} onClose={onClose} title={title}>
      <form className="grid gap-4" action={(formData) => onSubmit(formData)}>
        {children}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Sheet>
  );
}

export function ProjectFormLauncher({
  initialData,
}: {
  initialData?: Project;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      try {
        const payload = Object.fromEntries(formData) as unknown as Project;
        payload.stacks = String(payload.stacks)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        payload.isHighlighted = [true, "true"].includes(payload.isHighlighted);
        payload.companyId = payload.companyId || null;
        payload.href = payload.href || undefined;

        if (initialData?.id) await updateProjectAction(initialData.id, payload);
        else await createProjectAction(payload);

        router.refresh();
        setIsOpen(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to save project.",
        );
      }
    });
  };

  return (
    <>
      {initialData ? (
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 hover:bg-line rounded-lg text-muted hover:text-foreground transition-colors"
        >
          <Edit2 className="size-4" />
        </button>
      ) : (
        <Button onClick={() => setIsOpen(true)}>
          <Plus className="size-4 mr-2" /> Add Project
        </Button>
      )}
      <FormContainer
        title={initialData ? "Edit Project" : "Add Project"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        isPending={isPending}
        error={error}
      >
        <input
          name="projectName"
          defaultValue={initialData?.projectName}
          required
          placeholder="Project Name"
          className="rounded-3xl border border-line bg-background px-4 py-3"
        />
        <select
          name="projectType"
          defaultValue={initialData?.projectType || EProjectType.MY_WORKS}
          className="rounded-3xl border border-line bg-background px-4 py-3"
        >
          <option value={EProjectType.MY_WORKS}>My Works</option>
          <option value={EProjectType.FREELANCE}>Freelance</option>
          <option value={EProjectType.COMPANY_PROJECTS}>
            Company Projects
          </option>
        </select>
        <input
          name="companyId"
          defaultValue={initialData?.companyId || ""}
          placeholder="Company ID (optional)"
          className="rounded-3xl border border-line bg-background px-4 py-3"
        />
        <select
          name="isHighlighted"
          defaultValue={initialData?.isHighlighted ? "true" : "false"}
          className="rounded-3xl border border-line bg-background px-4 py-3"
        >
          <option value="false">Standard</option>
          <option value="true">Highlighted</option>
        </select>
        <input
          name="stacks"
          defaultValue={initialData?.stacks?.join(", ")}
          required
          placeholder="Stacks (comma separated)"
          className="rounded-3xl border border-line bg-background px-4 py-3"
        />
        <input
          name="impact"
          defaultValue={initialData?.impact}
          required
          placeholder="Impact"
          className="rounded-3xl border border-line bg-background px-4 py-3"
        />
        <input
          name="href"
          defaultValue={initialData?.href || ""}
          placeholder="Project URL (optional)"
          className="rounded-3xl border border-line bg-background px-4 py-3"
        />
        <textarea
          name="description"
          defaultValue={initialData?.description}
          required
          rows={4}
          placeholder="Description"
          className="rounded-[28px] border border-line bg-background px-4 py-3"
        />
      </FormContainer>
    </>
  );
}

// ----------------------------------------------------------------------
// Experience Form
// ----------------------------------------------------------------------

export function ExperienceFormLauncher({
  initialData,
}: {
  initialData?: Experience;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      try {
        const payload = Object.fromEntries(formData) as {
          stacks: string | string[];
          from: string | number;
          to: string | number | null;
        };
        payload.stacks = String(payload.stacks)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        payload.from = Number(payload.from);
        payload.to = payload.to ? Number(payload.to) : null;

        if (initialData?.id)
          await updateExperienceAction(
            initialData.id,
            payload as CreateExperienceInput,
          );
        else await createExperienceAction(payload as CreateExperienceInput);

        router.refresh();
        setIsOpen(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to save experience.",
        );
      }
    });
  };

  return (
    <>
      {initialData ? (
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 hover:bg-line rounded-lg text-muted hover:text-foreground transition-colors"
        >
          <Edit2 className="size-4" />
        </button>
      ) : (
        <Button onClick={() => setIsOpen(true)}>
          <Plus className="size-4 mr-2" /> Add Experience
        </Button>
      )}
      <FormContainer
        title={initialData ? "Edit Experience" : "Add Experience"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        isPending={isPending}
        error={error}
      >
        <input
          name="companyName"
          defaultValue={initialData?.companyName}
          required
          placeholder="Company Name"
          className="rounded-3xl border border-line bg-background px-4 py-3"
        />
        <input
          name="jobRole"
          defaultValue={initialData?.jobRole}
          required
          placeholder="Job Role"
          className="rounded-3xl border border-line bg-background px-4 py-3"
        />
        <input
          name="location"
          defaultValue={initialData?.location}
          required
          placeholder="Location"
          className="rounded-3xl border border-line bg-background px-4 py-3"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            name="from"
            type="number"
            defaultValue={initialData?.from}
            required
            placeholder="From Year"
            className="rounded-3xl border border-line bg-background px-4 py-3"
          />
          <input
            name="to"
            type="number"
            defaultValue={initialData?.to || ""}
            placeholder="To Year (Leave empty if present)"
            className="rounded-3xl border border-line bg-background px-4 py-3"
          />
        </div>
        <input
          name="stacks"
          defaultValue={initialData?.stacks?.join(", ")}
          required
          placeholder="Stacks (comma separated)"
          className="rounded-3xl border border-line bg-background px-4 py-3"
        />
        <textarea
          name="description"
          defaultValue={initialData?.description}
          required
          rows={5}
          placeholder="Description"
          className="rounded-[28px] border border-line bg-background px-4 py-3"
        />
      </FormContainer>
    </>
  );
}

// ----------------------------------------------------------------------
// Education Form
// ----------------------------------------------------------------------

export function EducationFormLauncher({
  initialData,
}: {
  initialData?: Education;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      try {
        const payload = Object.fromEntries(formData) as {
          from: string | number;
          to: string | number | null;
        };
        payload.from = Number(payload.from);
        payload.to = payload.to ? Number(payload.to) : null;

        if (initialData?.id)
          await updateEducationAction(
            initialData.id,
            payload as CreateEducationInput,
          );
        else await createEducationAction(payload as CreateEducationInput);

        router.refresh();
        setIsOpen(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to save education.",
        );
      }
    });
  };

  return (
    <>
      {initialData ? (
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 hover:bg-line rounded-lg text-muted hover:text-foreground transition-colors"
        >
          <Edit2 className="size-4" />
        </button>
      ) : (
        <Button onClick={() => setIsOpen(true)}>
          <Plus className="size-4 mr-2" /> Add Education
        </Button>
      )}
      <FormContainer
        title={initialData ? "Edit Education" : "Add Education"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        isPending={isPending}
        error={error}
      >
        <input
          name="collegeName"
          defaultValue={initialData?.collegeName}
          required
          placeholder="College Name"
          className="rounded-3xl border border-line bg-background px-4 py-3"
        />
        <input
          name="location"
          defaultValue={initialData?.location}
          required
          placeholder="Location"
          className="rounded-3xl border border-line bg-background px-4 py-3"
        />
        <input
          name="course"
          defaultValue={initialData?.course}
          required
          placeholder="Course (e.g. BEng)"
          className="rounded-3xl border border-line bg-background px-4 py-3"
        />
        <input
          name="branch"
          defaultValue={initialData?.branch}
          required
          placeholder="Branch (e.g. Computer Science)"
          className="rounded-3xl border border-line bg-background px-4 py-3"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            name="from"
            type="number"
            defaultValue={initialData?.from}
            required
            placeholder="From Year"
            className="rounded-3xl border border-line bg-background px-4 py-3"
          />
          <input
            name="to"
            type="number"
            defaultValue={initialData?.to || ""}
            placeholder="To Year (optional)"
            className="rounded-3xl border border-line bg-background px-4 py-3"
          />
        </div>
      </FormContainer>
    </>
  );
}

export function SkillFormLauncher({
  initialData,
  skillGroups = [],
}: {
  initialData?: Skill;
  skillGroups?: SkillGroup[];
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      try {
        const file = formData.get("iconFile") as File;
        let iconUrl = initialData?.icon;

        if (file && file.size > 0) {
          const uploadData = new FormData();
          uploadData.append("file", file);
          const uploadedUrl = await uploadSkillIconAction(uploadData);
          if (uploadedUrl) iconUrl = uploadedUrl;
        } else {
          const manualIcon = formData.get("icon") as string;
          if (manualIcon) iconUrl = manualIcon;
        }

        const payload = Object.fromEntries(formData) as {
          isHighlighted: string | boolean;
          icon?: string;
          iconFile?: File;
        };
        payload.isHighlighted = payload.isHighlighted === "true";
        payload.icon = iconUrl;
        delete payload.iconFile;

        if (initialData?.id)
          await updateSkillAction(initialData.id, payload as CreateSkillInput);
        else await createSkillAction(payload as CreateSkillInput);

        router.refresh();
        setIsOpen(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to save skill.");
      }
    });
  };

  return (
    <>
      {initialData ? (
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 hover:bg-line rounded-lg text-muted hover:text-foreground transition-colors"
        >
          <Edit2 className="size-4" />
        </button>
      ) : (
        <Button onClick={() => setIsOpen(true)}>
          <Plus className="size-4 mr-2" /> Add Skill
        </Button>
      )}
      <FormContainer
        title={initialData ? "Edit Skill" : "Add Skill"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        isPending={isPending}
        error={error}
      >
        <input
          name="name"
          defaultValue={initialData?.name}
          required
          placeholder="Skill Name"
          className="rounded-3xl border border-line bg-background px-4 py-3"
        />

        <select
          name="groupId"
          defaultValue={initialData?.groupId || ""}
          required
          className="rounded-3xl border border-line bg-background px-4 py-3"
        >
          <option value="" disabled>
            Select Skill Group
          </option>
          {skillGroups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.title}
            </option>
          ))}
          <option value="ungrouped">Ungrouped / Generic</option>
        </select>

        <select
          name="isHighlighted"
          defaultValue={initialData?.isHighlighted ? "true" : "false"}
          className="rounded-3xl border border-line bg-background px-4 py-3"
        >
          <option value="false">Standard (My Skills Section)</option>
          <option value="true">Highlighted (Hero Card)</option>
        </select>

        <div className="space-y-2">
          <p className="text-xs text-muted px-4">Upload Skill Icon (Premium)</p>
          <input
            name="iconFile"
            type="file"
            accept="image/*"
            className="w-full text-sm text-muted rounded-3xl border border-line bg-background px-4 py-3 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-accent/10 file:text-accent hover:file:bg-accent/20"
          />
        </div>

        <div className="space-y-2">
          <p className="text-xs text-muted px-4">OR Enter Lucide Icon Name</p>
          <input
            name="icon"
            defaultValue={initialData?.icon || ""}
            placeholder="e.g. Box, Code, Database"
            className="rounded-3xl border border-line bg-background px-4 py-3"
          />
        </div>
      </FormContainer>
    </>
  );
}

export function SkillGroupFormLauncher({
  initialData,
}: {
  initialData?: SkillGroup;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      try {
        const payload = Object.fromEntries(formData) as {
          order: string | number;
        };
        payload.order = Number(payload.order);

        if (initialData?.id)
          await updateSkillGroupAction(
            initialData.id,
            payload as CreateSkillGroupInput,
          );
        else await createSkillGroupAction(payload as CreateSkillGroupInput);

        router.refresh();
        setIsOpen(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to save skill group.",
        );
      }
    });
  };

  return (
    <>
      {initialData ? (
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 hover:bg-line rounded-lg text-muted hover:text-foreground transition-colors"
        >
          <Edit2 className="size-4" />
        </button>
      ) : (
        <Button onClick={() => setIsOpen(true)}>
          <Plus className="size-4 mr-2" /> Add Skill Group
        </Button>
      )}
      <FormContainer
        title={initialData ? "Edit Skill Group" : "Add Skill Group"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        isPending={isPending}
        error={error}
      >
        <input
          name="title"
          defaultValue={initialData?.title}
          required
          placeholder="Group Title (e.g. Frontend)"
          className="rounded-3xl border border-line bg-background px-4 py-3"
        />
        <input
          name="order"
          type="number"
          defaultValue={initialData?.order || "0"}
          required
          placeholder="Display Order (lowest first)"
          className="rounded-3xl border border-line bg-background px-4 py-3"
        />
      </FormContainer>
    </>
  );
}

// ----------------------------------------------------------------------
// Delete Button Component
// ----------------------------------------------------------------------

export function DeleteButton({
  id,
  onDelete,
}: {
  id: string;
  onDelete: (id: string) => Promise<unknown>;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (
          confirm(
            "Are you sure you want to delete this record? This cannot be undone.",
          )
        ) {
          startTransition(async () => {
            await onDelete(id);
            router.refresh();
          });
        }
      }}
      disabled={isPending}
      className={`p-2 hover:bg-red-500/10 rounded-lg text-muted hover:text-red-500 transition-colors ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <Trash2 className="size-4" />
    </button>
  );
}
