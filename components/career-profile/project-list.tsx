"use client";

import { useActionState, useState } from "react";
import { AlertCircle, ArrowDown, ArrowUp, ExternalLink, Pencil, Plus, Trash2 } from "lucide-react";

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
import { ProjectForm } from "@/components/career-profile/project-form";
import {
  createProjectBulletAction,
  deleteProjectAction,
  deleteProjectBulletAction,
  moveProjectBulletAction,
  updateProjectBulletAction,
} from "@/lib/actions/career-profile";
import { initialCareerProfileActionState } from "@/lib/validations/career-profile";
import type { Database } from "@/database";

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
type ProjectBulletRow = Database["public"]["Tables"]["project_bullets"]["Row"];

export interface ProjectWithBullets extends ProjectRow {
  project_bullets: ProjectBulletRow[];
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
  projectId,
  bulletId,
  direction,
  disabled,
}: {
  projectId: string;
  bulletId: string;
  direction: "up" | "down";
  disabled: boolean;
}) {
  return (
    <form action={moveProjectBulletAction}>
      <input type="hidden" name="id" value={bulletId} />
      <input type="hidden" name="projectId" value={projectId} />
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
  projectId,
  index,
  count,
}: {
  bullet: ProjectBulletRow;
  projectId: string;
  index: number;
  count: number;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [state, formAction, pending] = useActionState(
    updateProjectBulletAction,
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
          projectId={projectId}
          bulletId={bullet.id}
          direction="up"
          disabled={index === 0}
        />
        <MoveBulletButton
          projectId={projectId}
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
          action={deleteProjectBulletAction}
          hiddenFields={{ id: bullet.id }}
          confirmMessage="Delete this bullet?"
          label="Delete bullet"
        />
      </div>
    </li>
  );
}

function AddBulletForm({ projectId }: { projectId: string }) {
  const [state, formAction, pending] = useActionState(
    createProjectBulletAction,
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
      <input type="hidden" name="projectId" value={projectId} />
      <div className="flex gap-2">
        <Input name="content" placeholder="Add a bullet point" required />
        <SubmitButton pending={pending}>
          <Plus className="size-4" />
        </SubmitButton>
      </div>
    </form>
  );
}

function ProjectCard({ project }: { project: ProjectWithBullets }) {
  const [isEditing, setIsEditing] = useState(false);
  const bullets = [...project.project_bullets].sort((a, b) => a.sort_order - b.sort_order);

  if (isEditing) {
    return (
      <Card>
        <CardContent>
          <ProjectForm
            project={project}
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
          <CardTitle>{project.name}</CardTitle>
          {project.url ? (
            <CardDescription>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground inline-flex items-center gap-1 underline underline-offset-2"
              >
                {project.url}
                <ExternalLink className="size-3" />
              </a>
            </CardDescription>
          ) : null}
          {project.start_date || project.end_date ? (
            <CardDescription>
              {formatDate(project.start_date)} — {formatDate(project.end_date)}
            </CardDescription>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Edit project"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="size-3.5" />
          </Button>
          <DeleteButton
            action={deleteProjectAction}
            hiddenFields={{ id: project.id }}
            confirmMessage="Delete this project and all its bullets?"
            label="Delete project"
          />
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        {project.description ? (
          <p className="text-muted-foreground text-sm">{project.description}</p>
        ) : null}
        <ul className="grid gap-2">
          {bullets.map((bullet, index) => (
            <BulletRow
              key={bullet.id}
              bullet={bullet}
              projectId={project.id}
              index={index}
              count={bullets.length}
            />
          ))}
        </ul>
        <AddBulletForm projectId={project.id} />
      </CardContent>
    </Card>
  );
}

export function ProjectList({ projects }: { projects: ProjectWithBullets[] }) {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="grid gap-6">
      {isAdding ? (
        <Card>
          <CardHeader>
            <CardTitle>Add project</CardTitle>
          </CardHeader>
          <CardContent>
            <ProjectForm onCancel={() => setIsAdding(false)} onSuccess={() => setIsAdding(false)} />
          </CardContent>
        </Card>
      ) : (
        <Button type="button" className="w-fit" onClick={() => setIsAdding(true)}>
          <Plus className="size-4" />
          Add project
        </Button>
      )}

      {projects.length === 0 ? (
        <EmptyState
          icon={<Plus />}
          title="No projects yet"
          description="Add your first project to start building your career profile."
        />
      ) : (
        <StaggerGroup className="grid gap-4">
          {projects.map((project) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      )}
    </div>
  );
}
