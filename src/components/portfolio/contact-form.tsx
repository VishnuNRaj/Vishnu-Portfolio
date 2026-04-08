"use client";

import { useState, useTransition } from "react";

import { Button, SurfaceCard } from "@/components/ui";

type ContactFormState = {
  message: string;
  variant: "idle" | "success" | "error";
};

const initialState: ContactFormState = {
  message: "",
  variant: "idle",
};

export function ContactForm() {
  const [state, setState] = useState<ContactFormState>(initialState);
  const [isPending, startTransition] = useTransition();
  const [startedAt] = useState(() => Date.now());

  return (
    <SurfaceCard className="p-6 sm:p-8">
      <form
        className="grid gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const payload = {
            firstName: String(formData.get("firstName") ?? ""),
            lastName: String(formData.get("lastName") ?? ""),
            email: String(formData.get("email") ?? ""),
            phone: String(formData.get("phone") ?? ""),
            reason: String(formData.get("reason") ?? ""),
            website: String(formData.get("website") ?? ""),
            formStartedAt: startedAt,
          };

          startTransition(async () => {
            try {
              const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
              });

              const result = (await response.json()) as { message?: string };

              if (!response.ok) {
                throw new Error(result.message || "Unable to send the message right now.");
              }

              setState({
                message: result.message || "Message received. Vishnu will connect soon.",
                variant: "success",
              });
              event.currentTarget.reset();
            } catch (error) {
              setState({
                message:
                  error instanceof Error ? error.message : "Something went wrong.",
                variant: "error",
              });
            }
          });
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            tabIndex={-1}
            autoComplete="off"
            name="website"
            className="hidden"
            aria-hidden="true"
          />
          <input
            required
            name="firstName"
            placeholder="First name"
            className="rounded-3xl border border-line bg-background px-4 py-3 outline-none ring-0 placeholder:text-muted"
          />
          <input
            required
            name="lastName"
            placeholder="Last name"
            className="rounded-3xl border border-line bg-background px-4 py-3 outline-none ring-0 placeholder:text-muted"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            className="rounded-3xl border border-line bg-background px-4 py-3 outline-none ring-0 placeholder:text-muted"
          />
          <input
            required
            name="phone"
            placeholder="Phone"
            className="rounded-3xl border border-line bg-background px-4 py-3 outline-none ring-0 placeholder:text-muted"
          />
        </div>
        <textarea
          required
          name="reason"
          rows={5}
          placeholder="What are you building?"
          className="rounded-[28px] border border-line bg-background px-4 py-3 outline-none ring-0 placeholder:text-muted"
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p
            className={
              state.variant === "error" ? "text-sm text-red-600" : "text-sm text-muted"
            }
          >
            {state.message || "Responses typically focus on product work and backend-heavy builds."}
          </p>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Sending..." : "Send message"}
          </Button>
        </div>
      </form>
    </SurfaceCard>
  );
}
