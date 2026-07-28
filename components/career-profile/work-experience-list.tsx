"use client";

import { useActionState, useState } from "react";
import { AlertCircle, ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Input } from "@/components/ui/input";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { SubmitButton } from "@/components/auth/submit-button";
import { WorkExperienceForm } from "@/components/career-profile/work-experience-form";
import {
  createWorkExperienceBulletAction,
  deleteWorkExperienceAction,
  deleteWorkExperienceBulletAction,
  moveWorkExperienceBulletAction,
  updateWorkExperienceBulletAction,
} from "@/lib/actions/career-profile";
import { initialCareerProfileActionState } from "@/lib/validations/career-profile";
import type { Database } from "@/database";

type WorkExperienceRow = Database["public"]["Tables"]["work_experiences"]["Row"];
type WorkExperienceBulletRow = Database["public"]["Tables"]["work_experience_bullets"]["Row"];

export interface WorkExperienceWithBullets extends WorkExperienceRow {
  work_experience_bullets: WorkExperienceBulletRow[];
}

function formatDate(value: string | null): string {
  if (!value) return "Present";
  const date = new Date(`${value}T00:00:00`);
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short" });
}

function DeleteButton({
  action,
  hiddenFields,
  confirmMessage,
  label,
}: {
  action: (formData: FormData) => Promise<void>;
  hiddenFields: Record<string, string>;
  confirmMessage: string;
  label: string;
}) {
  return (
    <form action={action}>
      {Object.entries(hiddenFields).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      <Button
        type="submit"
        variant="ghost"
        size="icon-sm"
        aria-label={label}
        onClick={(event) => {
          if (!confirm(confirmMessage)) {
            event.preventDefault();
          }
        }}
      >
        <Trash2 className="text-destructive size-3.5" />
      </Button>
    </form>
  );
}

function MoveBulletButton({
  workExperienceId,
  bulletId,
  direction,
  disabled,
}: {
  workExperienceId: string;
  bulletId: string;
  direction: "up" | "down";
  disabled: boolean;
}) {
  return (
    <form action={moveWorkExperienceBulletAction}>
      <input type="hidden" name="id" value={bulletId} />
      <input type="hidden" name="workExperienceId" value={workExperienceId} />
      <input type="hidden" name="direction" value={direction} />
      <Button
        type="submit"
        variant="ghost"
        size="icon-sm"
        disabled={disabled}
        aria-label={direction === "up" ? "Move bullet up" : "Move bullet down"}
      >
        {direction === "up" ? (
          <ArrowUp className="size-3.5" />
        ) : (
          <ArrowDown className="size-3.5" />
        )}
      </Button>
    </form>
  );
}

function BulletRow({
  bullet,
  workExperienceId,
  index,
  count,
}: {
  bullet: WorkExperienceBulletRow;
  workExperienceId: string;
  index: number;
  count: number;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [state, formAction, pending] = useActionState(
    updateWorkExperienceBulletAction,
    initialCareerProfileActionState,
  );

  if (isEditing) {
    return (
      <form
        action={formAction}
        className="grid gap-2"
        ref={(form) => {
          if (form && state.status === "success") {
            setIsEditing(false);
          }
        }}
      >
        {state.status === "error" && state.message ? (
          <Alert variant="destructive">
            <AlertCircle className="size-4" />
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        ) : null}
        <input type="hidden" name="id" value={bullet.id} />
        <Input name="content" defaultValue={bullet.content} required />
        <div className="flex gap-2">
          <SubmitButton pending={pending}>Save</SubmitButton>
          <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </div>
      </form>
    );
  }

  return (
    <li className="flex items-start justify-between gap-2 text-sm">
      <span className="flex-1">{bullet.content}</span>
      <div className="flex shrink-0 items-center gap-0.5">
        <MoveBulletButton
          workExperienceId={workExperienceId}
          bulletId={bullet.id}
          direction="up"
          disabled={index === 0}
        />
        <MoveBulletButton
          workExperienceId={workExperienceId}
          bulletId={bullet.id}
          direction="down"
          disabled={index === count - 1}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Edit bullet"
          onClick={() => setIsEditing(true)}
        >
          <Pencil className="size-3.5" />
        </Button>
        <DeleteButton
          action={deleteWorkExperienceBulletAction}
          hiddenFields={{ id: bullet.id }}
          confirmMessage="Delete this bullet?"
          label="Delete bullet"
        />
      </div>
    </li>
  );
}

function AddBulletForm({ workExperienceId }: { workExperienceId: string }) {
  const [state, formAction, pending] = useActionState(
    createWorkExperienceBulletAction,
    initialCareerProfileActionState,
  );

  return (
    <form action={formAction} className="grid gap-2">
      {state.status === "error" && state.message ? (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      ) : null}
      <input type="hidden" name="workExperienceId" value={workExperienceId} />
      <div className="flex gap-2">
        <Input name="content" placeholder="Add a bullet point" required />
        <SubmitButton pending={pending}>
          <Plus className="size-4" />
        </SubmitButton>
      </div>
    </form>
  );
}

function WorkExperienceCard({ workExperience }: { workExperience: WorkExperienceWithBullets }) {
  const [isEditing, setIsEditing] = useState(false);
  const bullets = [...workExperience.work_experience_bullets].sort(
    (a, b) => a.sort_order - b.sort_order,
  );

  if (isEditing) {
    return (
      <Card>
        <CardContent>
          <WorkExperienceForm
            workExperience={workExperience}
            onCancel={() => setIsEditing(false)}
            onSuccess={() => setIsEditing(false)}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle>{workExperience.title}</CardTitle>
          <CardDescription>
            {workExperience.company}
            {workExperience.location ? ` · ${workExperience.location}` : ""}
          </CardDescription>
          <CardDescription>
            {formatDate(workExperience.start_date)} —{" "}
            {workExperience.is_current ? "Present" : formatDate(workExperience.end_date)}
          </CardDescription>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Edit work experience"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="size-3.5" />
          </Button>
          <DeleteButton
            action={deleteWorkExperienceAction}
            hiddenFields={{ id: workExperience.id }}
            confirmMessage="Delete this work experience and all its bullets?"
            label="Delete work experience"
          />
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        {workExperience.description ? (
          <p className="text-muted-foreground text-sm">{workExperience.description}</p>
        ) : null}
        <ul className="grid gap-2">
          {bullets.map((bullet, index) => (
            <BulletRow
              key={bullet.id}
              bullet={bullet}
              workExperienceId={workExperience.id}
              index={index}
              count={bullets.length}
            />
          ))}
        </ul>
        <AddBulletForm workExperienceId={workExperience.id} />
      </CardContent>
    </Card>
  );
}

export function WorkExperienceList({
  workExperiences,
}: {
  workExperiences: WorkExperienceWithBullets[];
}) {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="grid gap-6">
      {isAdding ? (
        <Card>
          <CardHeader>
            <CardTitle>Add work experience</CardTitle>
          </CardHeader>
          <CardContent>
            <WorkExperienceForm
              onCancel={() => setIsAdding(false)}
              onSuccess={() => setIsAdding(false)}
            />
          </CardContent>
        </Card>
      ) : (
        <Button type="button" className="w-fit" onClick={() => setIsAdding(true)}>
          <Plus className="size-4" />
          Add work experience
        </Button>
      )}

      {workExperiences.length === 0 ? (
        <EmptyState
          icon={<Plus />}
          title="No work experience yet"
          description="Add your first role to start building your career profile."
        />
      ) : (
        <StaggerGroup className="grid gap-4">
          {workExperiences.map((workExperience) => (
            <StaggerItem key={workExperience.id}>
              <WorkExperienceCard workExperience={workExperience} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      )}
    </div>
  );
}
