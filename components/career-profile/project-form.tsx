"use client";

import { useActionState, useEffect } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/auth/submit-button";
import { createProjectAction, updateProjectAction } from "@/lib/actions/career-profile";
import { initialCareerProfileActionState } from "@/lib/validations/career-profile";
import type { Database } from "@/database";

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];

function FormAlert({
  status,
  message,
}: {
  status: "idle" | "error" | "success";
  message: string | null;
}) {
  if (status === "idle" || !message) return null;

  const isError = status === "error";

  return (
    <Alert variant={isError ? "destructive" : "default"}>
      {isError ? <AlertCircle className="size-4" /> : <CheckCircle2 className="size-4" />}
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}

export function ProjectForm({
  project,
  onCancel,
  onSuccess,
}: {
  project?: ProjectRow | null;
  onCancel?: () => void;
  onSuccess?: () => void;
}) {
  const isEditing = Boolean(project);
  const action = isEditing ? updateProjectAction : createProjectAction;
  const [state, formAction, pending] = useActionState(action, initialCareerProfileActionState);

  useEffect(() => {
    if (state.status === "success") {
      onSuccess?.();
    }
  }, [state, onSuccess]);

  return (
    <form action={formAction} className="grid gap-4">
      <FormAlert status={state.status} message={state.message} />
      {isEditing ? <input type="hidden" name="id" value={project!.id} /> : null}

      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" defaultValue={project?.name ?? ""} required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="url">URL</Label>
        <Input id="url" name="url" type="url" defaultValue={project?.url ?? ""} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="startDate">Start date</Label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            defaultValue={project?.start_date ?? ""}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="endDate">End date</Label>
          <Input id="endDate" name="endDate" type="date" defaultValue={project?.end_date ?? ""} />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          name="description"
          defaultValue={project?.description ?? ""}
          rows={3}
          className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 w-full min-w-0 resize-y rounded-lg border bg-transparent px-2.5 py-1.5 text-base outline-none transition-colors focus-visible:ring-3 md:text-sm"
        />
      </div>

      <div className="flex items-center gap-2">
        <SubmitButton pending={pending}>{isEditing ? "Save changes" : "Add project"}</SubmitButton>
        {onCancel ? (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
      </div>
    </form>
  );
}
