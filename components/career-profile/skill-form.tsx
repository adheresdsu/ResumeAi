"use client";

import { useActionState, useEffect } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/auth/submit-button";
import { createSkillAction, updateSkillAction } from "@/lib/actions/career-profile";
import { initialCareerProfileActionState } from "@/lib/validations/career-profile";
import type { ProfileSkillWithSkill } from "@/components/career-profile/skill-list";

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

export function SkillForm({
  skill,
  onCancel,
  onSuccess,
}: {
  skill?: ProfileSkillWithSkill | null;
  onCancel?: () => void;
  onSuccess?: () => void;
}) {
  const isEditing = Boolean(skill);
  const action = isEditing ? updateSkillAction : createSkillAction;
  const [state, formAction, pending] = useActionState(action, initialCareerProfileActionState);

  useEffect(() => {
    if (state.status === "success") {
      onSuccess?.();
    }
  }, [state, onSuccess]);

  return (
    <form action={formAction} className="grid gap-4">
      <FormAlert status={state.status} message={state.message} />
      {isEditing ? <input type="hidden" name="id" value={skill!.id} /> : null}

      <div className="grid gap-2">
        <Label htmlFor="name">Skill name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={skill?.skills?.name ?? ""}
          maxLength={100}
          required
        />
      </div>

      <div className="flex items-center gap-2">
        <SubmitButton pending={pending}>{isEditing ? "Save changes" : "Add skill"}</SubmitButton>
        {onCancel ? (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
      </div>
    </form>
  );
}
