-- Add file metadata columns to uploaded_files and allow txt uploads,
-- needed by the Career Profile file upload/list/delete UI.

alter table public.uploaded_files
  add column file_name text not null default '',
  add column file_size bigint not null default 0,
  add column mime_type text;

alter table public.uploaded_files
  drop constraint uploaded_files_file_type_check;

alter table public.uploaded_files
  add constraint uploaded_files_file_type_check
    check (file_type in ('pdf', 'docx', 'txt'));

alter table public.uploaded_files
  add constraint uploaded_files_file_size_check
    check (file_size >= 0 and file_size <= 10485760);
