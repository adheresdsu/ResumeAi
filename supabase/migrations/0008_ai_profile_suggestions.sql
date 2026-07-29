-- AI extraction staging: holds unreviewed AI-suggested Career Profile data
-- extracted from an uploaded file. Nothing here is confirmed data — rows
-- are proposals only until a future accept flow copies reviewed fields
-- into work_experiences / education / skills / projects (and bullets).

create table public.ai_profile_suggestions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  uploaded_file_id uuid not null references public.uploaded_files (id) on delete cascade,
  status text not null default 'pending'
    check (status in ('pending', 'completed', 'failed', 'accepted', 'rejected')),
  model text not null,
  suggestions jsonb not null,
  error_message text,
  input_tokens integer,
  output_tokens integer,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

alter table public.ai_profile_suggestions enable row level security;

create policy "ai_profile_suggestions are managed by owner"
  on public.ai_profile_suggestions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Only one active (pending or completed) suggestion set per uploaded file
-- at a time, so re-running extraction doesn't accumulate duplicates.
create unique index ai_profile_suggestions_uploaded_file_active_idx
  on public.ai_profile_suggestions (uploaded_file_id)
  where status in ('pending', 'completed');

create index ai_profile_suggestions_user_id_idx on public.ai_profile_suggestions (user_id);
create index ai_profile_suggestions_uploaded_file_id_idx
  on public.ai_profile_suggestions (uploaded_file_id);
