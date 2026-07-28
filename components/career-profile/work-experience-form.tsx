"use client";

import { useActionState, useEffect, useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/auth/submit-button";
import {
  createWorkExperienceAction,
  updateWorkExperienceAction,
} from "@/lib/actions/career-profile";
import { initialCareerProfileActionState } from "@/lib/validations/career-profile";
import type { Database } from "@/database";

type WorkExperienceRow = Database["public"]["Tables"]["work_experiences"]["Row"];

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

export function WorkExperienceForm({
  workExperience,
  onCancel,
  onSuccess,
}: {
  workExperience?: WorkExperienceRow | null;
  onCancel?: () => void;
  onSuccess?: () => void;
}) {
  const isEditing = Boolean(workExperience);
  const action = isEditing ? updateWorkExperienceAction : createWorkExperienceAction;
  const [state, formAction, pending] = useActionState(action, initialCareerProfileActionState);
  const [isCurrent, setIsCurrent] = useState(workExperience?.is_current ?? false);

  useEffect(() => {
    if (state.status === "success") {
      onSuccess?.();
    }
  }, [state, onSuccess]);

  return (
    <form action={formAction} className="grid gap-4">
      <FormAlert status={state.status} message={state.message} />
      {isEditing ? <input type="hidden" name="id" value={workExperience!.id} /> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            name="company"
            defaultValue={workExperience?.company ?? ""}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" defaultValue={workExperience?.title ?? ""} required />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="location">Location</Label>
        <Input id="location" name="location" defaultValue={workExperience?.location ?? ""} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="startDate">Start date</Label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            defaultValue={workExperience?.start_date ?? ""}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="endDate">End date</Label>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            defaultValue={workExperience?.end_date ?? ""}
            disabled={isCurrent}
          />
        </div>
      </div>

      <Label className="flex items-center gap-2 text-sm font-normal">
        <input
          type="checkbox"
          name="isCurrent"
          checked={isCurrent}
          onChange={(event) => setIsCurrent(event.target.checked)}
          className="size-4 rounded border-input"
        />
        I currently work here
      </Label>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          name="description"
          defaultValue={workExperience?.description ?? ""}
          rows={3}
          className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 w-full min-w-0 resize-y rounded-lg border bg-transparent px-2.5 py-1.5 text-base outline-none transition-colors focus-visible:ring-3 md:text-sm"
        />
      </div>

      <div className="grid gap-2 sm:max-w-40">
        <Label htmlFor="displayOrder">Display order</Label>
        <Input
          id="displayOrder"
          name="displayOrder"
          type="number"
          min={0}
          defaultValue={workExperience?.display_order ?? 0}
        />
      </div>

      <div className="flex items-center gap-2">
        <SubmitButton pending={pending}>
          {isEditing ? "Save changes" : "Add work experience"}
        </SubmitButton>
        {onCancel ? (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
      </div>
    </form>
  );
}
