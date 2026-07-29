"use client";

import { useEffect, useState } from "react";
import { FileText, Plus, Trash2, Upload } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { UploadedFileForm } from "@/components/career-profile/uploaded-file-form";
import {
  deleteUploadedFileAction,
  extractUploadedFileAction,
  generateCareerProfileSuggestionsAction,
  getCareerProfileSuggestionSummariesAction,
  type CareerProfileSuggestionSummary,
} from "@/lib/actions/career-profile";
import { formatFileSize } from "@/lib/validations/uploaded-file";
import type { Database } from "@/database";

type UploadedFileRow = Database["public"]["Tables"]["uploaded_files"]["Row"];

const STATUS_VARIANT: Record<string, "default" | "secondary" | "destructive"> = {
  pending: "secondary",
  parsed: "default",
  failed: "destructive",
};

const SUGGESTION_STATUS_VARIANT: Record<string, "default" | "secondary" | "destructive"> = {
  pending: "secondary",
  completed: "default",
  failed: "destructive",
  accepted: "default",
  rejected: "secondary",
};

const SUGGESTION_STATUS_LABEL: Record<string, string> = {
  pending: "Generating…",
  completed: "Suggestions ready",
  failed: "Generation failed",
  accepted: "Suggestions accepted",
  rejected: "Suggestions rejected",
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

function GenerateSuggestionsButton({ id, label }: { id: string; label: string }) {
  return (
    <form action={generateCareerProfileSuggestionsAction}>
      <input type="hidden" name="uploadedFileId" value={id} />
      <Button type="submit" variant="outline" size="sm">
        {label}
      </Button>
    </form>
  );
}

function SuggestionCounts({ counts }: { counts: CareerProfileSuggestionSummary["counts"] }) {
  if (!counts) {
    return null;
  }

  const parts = [
    counts.workExperiences > 0 ? `${counts.workExperiences} work experience` : null,
    counts.education > 0 ? `${counts.education} education` : null,
    counts.skills > 0 ? `${counts.skills} skill` : null,
    counts.projects > 0 ? `${counts.projects} project` : null,
  ].filter((part): part is string => Boolean(part));

  if (parts.length === 0) {
    return <p className="text-muted-foreground text-xs">No facts were confidently extracted.</p>;
  }

  return <p className="text-muted-foreground text-xs">Suggested: {parts.join(" · ")}</p>;
}

function UploadedFileRowItem({
  file,
  summary,
}: {
  file: UploadedFileRow;
  summary: CareerProfileSuggestionSummary | undefined;
}) {
  const uploadedAt = new Date(file.created_at).toLocaleDateString();
  const preview = getExtractedTextPreview(file.extracted_text);
  const canGenerate = file.parsed_status === "parsed" && Boolean(file.extracted_text);
  const hasActiveSuggestions = summary?.status === "pending" || summary?.status === "completed";

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
          {canGenerate && !hasActiveSuggestions ? (
            <GenerateSuggestionsButton
              id={file.id}
              label={summary?.status === "failed" ? "Retry suggestions" : "Generate suggestions"}
            />
          ) : null}
          <DeleteButton id={file.id} />
        </div>
      </div>
      {file.parsed_status === "failed" && file.extraction_error ? (
        <p className="text-destructive text-xs">{file.extraction_error}</p>
      ) : null}
      {preview ? (
        <p className="text-muted-foreground border-t pt-2 text-xs">{preview}</p>
      ) : null}
      {summary ? (
        <div className="flex flex-col gap-1 border-t pt-2">
          <div className="flex items-center gap-2">
            <Badge variant={SUGGESTION_STATUS_VARIANT[summary.status] ?? "secondary"}>
              {SUGGESTION_STATUS_LABEL[summary.status] ?? summary.status}
            </Badge>
          </div>
          {summary.status === "completed" ? <SuggestionCounts counts={summary.counts} /> : null}
          {summary.status === "failed" && summary.errorMessage ? (
            <p className="text-destructive text-xs">{summary.errorMessage}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function UploadedFileList({ files }: { files: UploadedFileRow[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [suggestionSummaries, setSuggestionSummaries] = useState<
    Record<string, CareerProfileSuggestionSummary>
  >({});
  const sortedFiles = [...files].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  useEffect(() => {
    let isCancelled = false;
    const fileIds = files.map((file) => file.id);

    if (fileIds.length === 0) {
      setSuggestionSummaries({});
      return;
    }

    getCareerProfileSuggestionSummariesAction(fileIds).then((summaries) => {
      if (!isCancelled) {
        setSuggestionSummaries(summaries);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [files]);

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
              <UploadedFileRowItem file={file} summary={suggestionSummaries[file.id]} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      )}
    </div>
  );
}
