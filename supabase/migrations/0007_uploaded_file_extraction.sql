-- Add deterministic server-side text extraction fields to uploaded_files.

alter table public.uploaded_files
  add column extracted_text text,
  add column extraction_error text,
  add column extracted_at timestamptz;
