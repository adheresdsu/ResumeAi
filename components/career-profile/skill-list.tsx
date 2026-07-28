"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { SkillForm } from "@/components/career-profile/skill-form";
import { deleteSkillAction } from "@/lib/actions/career-profile";
import type { Database } from "@/database";

type ProfileSkillRow = Database["public"]["Tables"]["profile_skills"]["Row"];
type SkillRow = Pick<Database["public"]["Tables"]["skills"]["Row"], "id" | "name">;

export interface ProfileSkillWithSkill
  extends Pick<ProfileSkillRow, "id" | "verification_status"> {
  skills: SkillRow | null;
}

function DeleteButton({ id }: { id: string }) {
  return (
    <form action={deleteSkillAction}>
      <input type="hidden" name="id" value={id} />
      <Button
        type="submit"
        variant="ghost"
        size="icon-sm"
        aria-label="Remove skill"
        onClick={(event) => {
          if (!confirm("Remove this skill from your profile?")) {
            event.preventDefault();
          }
        }}
      >
        <Trash2 className="text-destructive size-3.5" />
      </Button>
    </form>
  );
}

function SkillBadge({ skill }: { skill: ProfileSkillWithSkill }) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <Card>
        <CardContent>
          <SkillForm
            skill={skill}
            onCancel={() => setIsEditing(false)}
            onSuccess={() => setIsEditing(false)}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Badge variant="secondary" className="flex items-center gap-1 py-1 pl-3 pr-1 text-sm">
      {skill.skills?.name ?? "Unknown skill"}
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label="Edit skill"
        onClick={() => setIsEditing(true)}
      >
        <Pencil className="size-3" />
      </Button>
      <DeleteButton id={skill.id} />
    </Badge>
  );
}

export function SkillList({ skills }: { skills: ProfileSkillWithSkill[] }) {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="grid gap-6">
      {isAdding ? (
        <Card>
          <CardHeader>
            <CardTitle>Add skill</CardTitle>
          </CardHeader>
          <CardContent>
            <SkillForm onCancel={() => setIsAdding(false)} onSuccess={() => setIsAdding(false)} />
          </CardContent>
        </Card>
      ) : (
        <Button type="button" className="w-fit" onClick={() => setIsAdding(true)}>
          <Plus className="size-4" />
          Add skill
        </Button>
      )}

      {skills.length === 0 ? (
        <EmptyState
          icon={<Plus />}
          title="No skills yet"
          description="Add the skills you want to highlight on your resumes."
        />
      ) : (
        <StaggerGroup className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <StaggerItem key={skill.id}>
              <SkillBadge skill={skill} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      )}
    </div>
  );
}
