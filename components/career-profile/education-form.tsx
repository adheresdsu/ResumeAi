"use client";

import { useActionState, useEffect, useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/auth/submit-button";
import { createEducationAction, updateEducationAction } from "@/lib/actions/career-profile";
import { initialCareerProfileActionState } from "@/lib/validations/career-profile";
import type { Database } from "@/database";

type EducationRow = Database["public"]["Tables"]["education"]["Row"];

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

export function EducationForm({
  education,
  onCancel,
  onSuccess,
}: {
  education?: EducationRow | null;
  onCancel?: () => void;
  onSuccess?: () => void;
}) {
  const isEditing = Boolean(education);
  const action = isEditing ? updateEducationAction : createEducationAction;
  const [state, formAction, pending] = useActionState(action, initialCareerProfileActionState);
  const [isCurrent, setIsCurrent] = useState(education?.is_current ?? false);

  useEffect(() => {
    if (state.status === "success") {
      onSuccess?.();
    }
  }, [state, onSuccess]);

  return (
    <form action={formAction} className="grid gap-4">
      <FormAlert status={state.status} message={state.message} />
      {isEditing ? <input type="hidden" name="id" value={education!.id} /> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="institution">Institution</Label>
          <Input
            id="institution"
            name="institution"
            defaultValue={education?.institution ?? ""}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="degree">Degree</Label>
          <Input id="degree" name="degree" defaultValue={education?.degree ?? ""} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="fieldOfStudy">Field of study</Label>
          <Input
            id="fieldOfStudy"
            name="fieldOfStudy"
            defaultValue={education?.field_of_study ?? ""}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" defaultValue={education?.location ?? ""} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="startDate">Start date</Label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            defaultValue={education?.start_date ?? ""}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="endDate">End date</Label>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            defaultValue={education?.end_date ?? ""}
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
        I currently study here
      </Label>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          name="description"
          defaultValue={education?.description ?? ""}
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
          defaultValue={education?.display_order ?? 0}
        />
      </div>

      <div className="flex items-center gap-2">
        <SubmitButton pending={pending}>
          {isEditing ? "Save changes" : "Add education"}
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
