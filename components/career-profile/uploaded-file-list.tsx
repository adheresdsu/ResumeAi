"use client";

import { useState } from "react";
import { FileText, Plus, Trash2, Upload } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { UploadedFileForm } from "@/components/career-profile/uploaded-file-form";
import { deleteUploadedFileAction, extractUploadedFileAction } from "@/lib/actions/career-profile";
import { formatFileSize } from "@/lib/validations/uploaded-file";
import type { Database } from "@/database";

type UploadedFileRow = Database["public"]["Tables"]["uploaded_files"]["Row"];

const STATUS_VARIANT: Record<string, "default" | "secondary" | "destructive"> = {
  pending: "secondary",
  parsed: "default",
  failed: "destructive",
};

const EXTRACTED_TEXT_PREVIEW_LENGTH = 200;

function getExtractedTextPreview(text: string | null): string | null {
  if (!text) {
    return null;
  }
  return text.length > EXTRACTED_TEXT_PREVIEW_LENGTH
    ? `${text.slice(0, EXTRACTED_TEXT_PREVIEW_LENGTH)}…`
    : text;
}

function DeleteButton({ id }: { id: string }) {
  return (
    <form action={deleteUploadedFileAction}>
      <input type="hidden" name="id" value={id} />
      <Button
        type="submit"
        variant="ghost"
        size="icon-sm"
        aria-label="Delete file"
        onClick={(event) => {
          if (!confirm("Delete this file?")) {
            event.preventDefault();
          }
        }}
      >
        <Trash2 className="text-destructive size-3.5" />
      </Button>
    </form>
  );
}

function ExtractButton({ id, label }: { id: string; label: string }) {
  return (
    <form action={extractUploadedFileAction}>
      <input type="hidden" name="id" value={id} />
      <Button type="submit" variant="outline" size="sm">
        {label}
      </Button>
    </form>
  );
}

function UploadedFileRowItem({ file }: { file: UploadedFileRow }) {
  const uploadedAt = new Date(file.created_at).toLocaleDateString();
  const preview = getExtractedTextPreview(file.extracted_text);

  return (
    <div className="flex flex-col gap-2 rounded-md border px-3 py-2 text-sm">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <FileText className="text-muted-foreground size-4 shrink-0" />
          <div className="min-w-0">
            <p className="truncate font-medium">{file.file_name}</p>
            <p className="text-muted-foreground text-xs">
              {file.file_type.toUpperCase()} · {formatFileSize(file.file_size)} · {uploadedAt}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Badge variant={STATUS_VARIANT[file.parsed_status] ?? "secondary"}>
            {file.parsed_status}
          </Badge>
          {file.parsed_status === "pending" ? <ExtractButton id={file.id} label="Extract" /> : null}
          {file.parsed_status === "failed" ? <ExtractButton id={file.id} label="Retry" /> : null}
          <DeleteButton id={file.id} />
        </div>
      </div>
      {file.parsed_status === "failed" && file.extraction_error ? (
        <p className="text-destructive text-xs">{file.extraction_error}</p>
      ) : null}
      {preview ? (
        <p className="text-muted-foreground border-t pt-2 text-xs">{preview}</p>
      ) : null}
    </div>
  );
}

export function UploadedFileList({ files }: { files: UploadedFileRow[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const sortedFiles = [...files].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  return (
    <div className="grid gap-6">
      {isAdding ? (
        <Card>
          <CardHeader>
            <CardTitle>Upload file</CardTitle>
          </CardHeader>
          <CardContent>
            <UploadedFileForm />
          </CardContent>
        </Card>
      ) : (
        <Button type="button" className="w-fit" onClick={() => setIsAdding(true)}>
          <Plus className="size-4" />
          Upload file
        </Button>
      )}

      {sortedFiles.length === 0 ? (
        <EmptyState
          icon={<Upload />}
          title="No files yet"
          description="Upload a resume as a PDF, DOCX or TXT file."
        />
      ) : (
        <StaggerGroup className="grid gap-2">
          {sortedFiles.map((file) => (
            <StaggerItem key={file.id}>
              <UploadedFileRowItem file={file} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      )}
    </div>
  );
}
