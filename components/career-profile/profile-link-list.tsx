"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, ExternalLink, Pencil, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { ProfileLinkForm } from "@/components/career-profile/profile-link-form";
import { deleteProfileLinkAction, moveProfileLinkAction } from "@/lib/actions/career-profile";
import type { Database } from "@/database";

type ProfileLinkRow = Database["public"]["Tables"]["profile_links"]["Row"];

function DeleteButton({ id }: { id: string }) {
  return (
    <form action={deleteProfileLinkAction}>
      <input type="hidden" name="id" value={id} />
      <Button
        type="submit"
        variant="ghost"
        size="icon-sm"
        aria-label="Delete link"
        onClick={(event) => {
          if (!confirm("Delete this link?")) {
            event.preventDefault();
          }
        }}
      >
        <Trash2 className="text-destructive size-3.5" />
      </Button>
    </form>
  );
}

function MoveLinkButton({
  linkId,
  direction,
  disabled,
}: {
  linkId: string;
  direction: "up" | "down";
  disabled: boolean;
}) {
  return (
    <form action={moveProfileLinkAction}>
      <input type="hidden" name="id" value={linkId} />
      <input type="hidden" name="direction" value={direction} />
      <Button
        type="submit"
        variant="ghost"
        size="icon-sm"
        disabled={disabled}
        aria-label={direction === "up" ? "Move link up" : "Move link down"}
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

function ProfileLinkRowItem({
  link,
  index,
  count,
}: {
  link: ProfileLinkRow;
  index: number;
  count: number;
}) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <Card>
        <CardContent>
          <ProfileLinkForm
            link={link}
            onCancel={() => setIsEditing(false)}
            onSuccess={() => setIsEditing(false)}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm">
      <div className="min-w-0 flex-1">
        <p className="font-medium">{link.label}</p>
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 truncate underline underline-offset-2"
        >
          <span className="truncate">{link.url}</span>
          <ExternalLink className="size-3 shrink-0" />
        </a>
      </div>
      <div className="flex shrink-0 items-center gap-0.5">
        <MoveLinkButton linkId={link.id} direction="up" disabled={index === 0} />
        <MoveLinkButton linkId={link.id} direction="down" disabled={index === count - 1} />
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Edit link"
          onClick={() => setIsEditing(true)}
        >
          <Pencil className="size-3.5" />
        </Button>
        <DeleteButton id={link.id} />
      </div>
    </div>
  );
}

export function ProfileLinkList({ links }: { links: ProfileLinkRow[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const sortedLinks = [...links].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className="grid gap-6">
      {isAdding ? (
        <Card>
          <CardHeader>
            <CardTitle>Add link</CardTitle>
          </CardHeader>
          <CardContent>
            <ProfileLinkForm onCancel={() => setIsAdding(false)} onSuccess={() => setIsAdding(false)} />
          </CardContent>
        </Card>
      ) : (
        <Button type="button" className="w-fit" onClick={() => setIsAdding(true)}>
          <Plus className="size-4" />
          Add link
        </Button>
      )}

      {sortedLinks.length === 0 ? (
        <EmptyState
          icon={<Plus />}
          title="No links yet"
          description="Add links like your portfolio, GitHub, or LinkedIn."
        />
      ) : (
        <StaggerGroup className="grid gap-2">
          {sortedLinks.map((link, index) => (
            <StaggerItem key={link.id}>
              <ProfileLinkRowItem link={link} index={index} count={sortedLinks.length} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      )}
    </div>
  );
}
