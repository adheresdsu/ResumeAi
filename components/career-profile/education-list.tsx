"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { EducationForm } from "@/components/career-profile/education-form";
import { deleteEducationAction } from "@/lib/actions/career-profile";
import type { Database } from "@/database";

type EducationRow = Database["public"]["Tables"]["education"]["Row"];

function formatDate(value: string | null): string {
  if (!value) return "Present";
  const date = new Date(`${value}T00:00:00`);
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short" });
}

function DeleteButton({ id }: { id: string }) {
  return (
    <form action={deleteEducationAction}>
      <input type="hidden" name="id" value={id} />
      <Button
        type="submit"
        variant="ghost"
        size="icon-sm"
        aria-label="Delete education"
        onClick={(event) => {
          if (!confirm("Delete this education entry?")) {
            event.preventDefault();
          }
        }}
      >
        <Trash2 className="text-destructive size-3.5" />
      </Button>
    </form>
  );
}

function EducationCard({ education }: { education: EducationRow }) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <Card>
        <CardContent>
          <EducationForm
            education={education}
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
          <CardTitle>{education.institution}</CardTitle>
          <CardDescription>
            {[education.degree, education.field_of_study].filter(Boolean).join(", ")}
            {education.location ? ` · ${education.location}` : ""}
          </CardDescription>
          <CardDescription>
            {formatDate(education.start_date)} —{" "}
            {education.is_current ? "Present" : formatDate(education.end_date)}
          </CardDescription>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Edit education"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="size-3.5" />
          </Button>
          <DeleteButton id={education.id} />
        </div>
      </CardHeader>
      {education.description ? (
        <CardContent>
          <p className="text-muted-foreground text-sm">{education.description}</p>
        </CardContent>
      ) : null}
    </Card>
  );
}

export function EducationList({ education }: { education: EducationRow[] }) {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="grid gap-6">
      {isAdding ? (
        <Card>
          <CardHeader>
            <CardTitle>Add education</CardTitle>
          </CardHeader>
          <CardContent>
            <EducationForm onCancel={() => setIsAdding(false)} onSuccess={() => setIsAdding(false)} />
          </CardContent>
        </Card>
      ) : (
        <Button type="button" className="w-fit" onClick={() => setIsAdding(true)}>
          <Plus className="size-4" />
          Add education
        </Button>
      )}

      {education.length === 0 ? (
        <EmptyState
          icon={<Plus />}
          title="No education yet"
          description="Add your first degree or program to start building your career profile."
        />
      ) : (
        <StaggerGroup className="grid gap-4">
          {education.map((entry) => (
            <StaggerItem key={entry.id}>
              <EducationCard education={entry} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      )}
    </div>
  );
}
