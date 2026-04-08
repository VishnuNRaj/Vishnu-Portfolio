"use client";

import { useState, useTransition } from "react";

import { Button, SurfaceCard } from "@/components/ui";
import { EProjectType } from "@/lib";

type AdminCreateFormsProps = {
  authKey: string;
};

export function AdminCreateForms({ authKey }: AdminCreateFormsProps) {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  async function submitForm(form: HTMLFormElement, endpoint: string) {
    const formData = new FormData(form);
    const stacks = String(formData.get("stacks") ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const payload = Object.fromEntries(formData.entries());
    const body = {
      ...payload,
      companyId: payload.companyId ? String(payload.companyId) : null,
      from: Number(payload.from),
      to: payload.to ? Number(payload.to) : null,
      isHighlighted: payload.isHighlighted === "true",
      stacks,
    };

    const response = await fetch(`${endpoint}?key=${authKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Unable to save this record.");
    }

    form.reset();
    window.location.reload();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <SurfaceCard className="p-6" id="add-experience">
        <form
          className="grid gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            startTransition(async () => {
              try {
                await submitForm(event.currentTarget, "/api/experience");
              } catch (error) {
                setMessage(error instanceof Error ? error.message : "Save failed.");
              }
            });
          }}
        >
          <h3 className="text-xl font-semibold tracking-[-0.04em]">Add experience</h3>
          <input required name="companyName" placeholder="Company" className="rounded-3xl border border-line bg-background px-4 py-3" />
          <input required name="jobRole" placeholder="Role" className="rounded-3xl border border-line bg-background px-4 py-3" />
          <input required name="location" placeholder="Location" className="rounded-3xl border border-line bg-background px-4 py-3" />
          <div className="grid grid-cols-2 gap-3">
            <input required name="from" type="number" placeholder="From" className="rounded-3xl border border-line bg-background px-4 py-3" />
            <input name="to" type="number" placeholder="To" className="rounded-3xl border border-line bg-background px-4 py-3" />
          </div>
          <input required name="stacks" placeholder="Stacks, comma separated" className="rounded-3xl border border-line bg-background px-4 py-3" />
          <textarea required name="description" rows={5} placeholder="Description" className="rounded-[28px] border border-line bg-background px-4 py-3" />
          <Button type="submit" disabled={isPending}>Save experience</Button>
        </form>
      </SurfaceCard>

      <SurfaceCard className="p-6" id="add-project">
        <form
          className="grid gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            startTransition(async () => {
              try {
                await submitForm(event.currentTarget, "/api/projects");
              } catch (error) {
                setMessage(error instanceof Error ? error.message : "Save failed.");
              }
            });
          }}
        >
          <h3 className="text-xl font-semibold tracking-[-0.04em]">Add project</h3>
          <input name="companyId" placeholder="Company id (optional)" className="rounded-3xl border border-line bg-background px-4 py-3" />
          <input required name="projectName" placeholder="Project name" className="rounded-3xl border border-line bg-background px-4 py-3" />
          <select name="projectType" className="rounded-3xl border border-line bg-background px-4 py-3">
            <option value={EProjectType.MY_WORKS}>My works</option>
            <option value={EProjectType.FREELANCE}>Freelance</option>
            <option value={EProjectType.COMPANY_PROJECTS}>Company projects</option>
          </select>
          <select name="isHighlighted" className="rounded-3xl border border-line bg-background px-4 py-3">
            <option value="false">Standard</option>
            <option value="true">Highlighted</option>
          </select>
          <input required name="stacks" placeholder="Stacks, comma separated" className="rounded-3xl border border-line bg-background px-4 py-3" />
          <input required name="impact" placeholder="Impact" className="rounded-3xl border border-line bg-background px-4 py-3" />
          <input name="href" placeholder="Project URL (optional)" className="rounded-3xl border border-line bg-background px-4 py-3" />
          <textarea required name="description" rows={4} placeholder="Description" className="rounded-[28px] border border-line bg-background px-4 py-3" />
          <Button type="submit" disabled={isPending}>Save project</Button>
        </form>
      </SurfaceCard>

      <SurfaceCard className="p-6" id="add-education">
        <form
          className="grid gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            startTransition(async () => {
              try {
                await submitForm(event.currentTarget, "/api/education");
              } catch (error) {
                setMessage(error instanceof Error ? error.message : "Save failed.");
              }
            });
          }}
        >
          <h3 className="text-xl font-semibold tracking-[-0.04em]">Add education</h3>
          <input required name="collegeName" placeholder="College" className="rounded-3xl border border-line bg-background px-4 py-3" />
          <input required name="location" placeholder="Location" className="rounded-3xl border border-line bg-background px-4 py-3" />
          <input required name="course" placeholder="Course" className="rounded-3xl border border-line bg-background px-4 py-3" />
          <input required name="branch" placeholder="Branch" className="rounded-3xl border border-line bg-background px-4 py-3" />
          <div className="grid grid-cols-2 gap-3">
            <input required name="from" type="number" placeholder="From" className="rounded-3xl border border-line bg-background px-4 py-3" />
            <input name="to" type="number" placeholder="To" className="rounded-3xl border border-line bg-background px-4 py-3" />
          </div>
          <Button type="submit" disabled={isPending}>Save education</Button>
        </form>
      </SurfaceCard>

      <p className="text-sm text-muted lg:col-span-3">
        {message || "Admin additions use the same clean route handlers as the public API."}
      </p>
    </div>
  );
}
