-- ResumeAI initial schema
-- Tables, RLS policies, and triggers for the full Phase 0-4 data model.
-- AI/Stripe features are not wired up yet (Phase 1), but the schema is
-- created up front so later phases only add application code.

-- ---------------------------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------------------------
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Helper: keep updated_at current on every row update
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- profiles: 1:1 with auth.users
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  avatar_url text,
  headline text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles are viewable by owner"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles are insertable by owner"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles are updatable by owner"
  on public.profiles for update
  using (auth.uid() = id);

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Auto-create a profile row whenever a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- plan_limits: static plan configuration (seeded, not user data)
-- ---------------------------------------------------------------------------
create table public.plan_limits (
  plan text primary key,
  max_resumes int not null,
  max_ai_generations_per_month int not null,
  custom_domain_allowed boolean not null default false,
  premium_templates_allowed boolean not null default false
);

alter table public.plan_limits enable row level security;

create policy "plan_limits are publicly readable"
  on public.plan_limits for select
  using (true);

-- Seed the minimum valid 'free' plan row so the subscriptions.plan FK
-- (default 'free') resolves on a fresh project.
-- NOTE: these limits are MVP defaults only — revisit before launch.
insert into public.plan_limits (
  plan, max_resumes, max_ai_generations_per_month,
  custom_domain_allowed, premium_templates_allowed
)
values ('free', 1, 3, false, false)
on conflict (plan) do nothing;

-- ---------------------------------------------------------------------------
-- subscriptions: Stripe billing state (1:1 with a user)
-- ---------------------------------------------------------------------------
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  plan text not null default 'free' references public.plan_limits (plan),
  status text not null default 'active',
  stripe_customer_id text,
  stripe_subscription_id text,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.subscriptions enable row level security;

create policy "subscriptions are viewable by owner"
  on public.subscriptions for select
  using (auth.uid() = user_id);

create trigger set_subscriptions_updated_at
  before update on public.subscriptions
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- resume_templates: shared template catalog (public read)
-- ---------------------------------------------------------------------------
create table public.resume_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  preview_image_url text,
  is_premium boolean not null default false,
  category text,
  config jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.resume_templates enable row level security;

create policy "resume_templates are publicly readable"
  on public.resume_templates for select
  using (true);

-- ---------------------------------------------------------------------------
-- resumes: logical resume "slot" owned by a user
-- ---------------------------------------------------------------------------
create table public.resumes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null default 'Untitled Resume',
  is_primary boolean not null default false,
  ats_score int,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.resumes enable row level security;

create policy "resumes are managed by owner"
  on public.resumes for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create trigger set_resumes_updated_at
  before update on public.resumes
  for each row execute function public.set_updated_at();

create index resumes_user_id_idx on public.resumes (user_id);

-- ---------------------------------------------------------------------------
-- resume_versions: immutable content snapshots for a resume
-- ---------------------------------------------------------------------------
create table public.resume_versions (
  id uuid primary key default gen_random_uuid(),
  resume_id uuid not null references public.resumes (id) on delete cascade,
  version_number int not null,
  content jsonb not null default '{}'::jsonb,
  source text not null default 'manual' check (source in ('manual', 'ai_generated', 'uploaded')),
  created_at timestamptz not null default now(),
  unique (resume_id, version_number)
);

alter table public.resume_versions enable row level security;

create policy "resume_versions are managed by resume owner"
  on public.resume_versions for all
  using (
    exists (
      select 1 from public.resumes
      where resumes.id = resume_versions.resume_id
        and resumes.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.resumes
      where resumes.id = resume_versions.resume_id
        and resumes.user_id = auth.uid()
    )
  );

create index resume_versions_resume_id_idx on public.resume_versions (resume_id, version_number);

-- ---------------------------------------------------------------------------
-- cover_letters
-- ---------------------------------------------------------------------------
create table public.cover_letters (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  resume_version_id uuid references public.resume_versions (id) on delete set null,
  job_title text,
  company_name text,
  job_description text,
  content text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.cover_letters enable row level security;

create policy "cover_letters are managed by owner"
  on public.cover_letters for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create trigger set_cover_letters_updated_at
  before update on public.cover_letters
  for each row execute function public.set_updated_at();

create index cover_letters_user_id_idx on public.cover_letters (user_id);

-- ---------------------------------------------------------------------------
-- portfolios
-- ---------------------------------------------------------------------------
create table public.portfolios (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  resume_version_id uuid references public.resume_versions (id) on delete set null,
  template_id uuid references public.resume_templates (id) on delete set null,
  slug text not null unique,
  custom_domain text unique,
  is_published boolean not null default false,
  theme jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.portfolios enable row level security;

create policy "portfolios are managed by owner"
  on public.portfolios for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "published portfolios are publicly readable"
  on public.portfolios for select
  using (is_published = true);

create trigger set_portfolios_updated_at
  before update on public.portfolios
  for each row execute function public.set_updated_at();

create index portfolios_user_id_idx on public.portfolios (user_id);

-- ---------------------------------------------------------------------------
-- Public read access for content rendered on a published portfolio
-- (portfolios must exist before this policy can reference it)
-- ---------------------------------------------------------------------------
create policy "resume_versions are publicly readable via published portfolio"
  on public.resume_versions for select
  using (
    exists (
      select 1 from public.portfolios
      where portfolios.resume_version_id = resume_versions.id
        and portfolios.is_published = true
    )
  );

-- public_portfolio_profiles: minimal, safe profile projection for rendering
-- published portfolios. profiles itself stays owner-only (no public policy
-- on public.profiles) — this view exposes only id/full_name/avatar_url/
-- headline, and only for users with at least one published portfolio.
create view public.public_portfolio_profiles
with (security_barrier = true) as
select
  profiles.id,
  profiles.full_name,
  profiles.avatar_url,
  profiles.headline
from public.profiles
where exists (
  select 1 from public.portfolios
  where portfolios.user_id = profiles.id
    and portfolios.is_published = true
);

revoke all on public.public_portfolio_profiles from public;
grant select on public.public_portfolio_profiles to anon, authenticated;

-- ---------------------------------------------------------------------------
-- uploaded_files: raw resume uploads pending parsing
-- ---------------------------------------------------------------------------
create table public.uploaded_files (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  storage_path text not null,
  file_type text not null check (file_type in ('pdf', 'docx')),
  parsed_status text not null default 'pending' check (parsed_status in ('pending', 'parsed', 'failed')),
  linked_resume_id uuid references public.resumes (id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.uploaded_files enable row level security;

create policy "uploaded_files are managed by owner"
  on public.uploaded_files for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index uploaded_files_user_id_idx on public.uploaded_files (user_id);

-- ---------------------------------------------------------------------------
-- ai_usage_logs: per-call usage/cost tracking for quota enforcement
-- ---------------------------------------------------------------------------
create table public.ai_usage_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  feature text not null check (feature in ('resume_generation', 'resume_improvement', 'cover_letter', 'ats_score')),
  tokens_used int not null default 0,
  cost_estimate numeric(10, 6) not null default 0,
  created_at timestamptz not null default now()
);

alter table public.ai_usage_logs enable row level security;

create policy "ai_usage_logs are viewable by owner"
  on public.ai_usage_logs for select
  using (auth.uid() = user_id);

create index ai_usage_logs_user_id_created_at_idx on public.ai_usage_logs (user_id, created_at);

-- ---------------------------------------------------------------------------
-- Storage buckets for resume uploads / avatars (private by default)
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('resume-uploads', 'resume-uploads', false)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

create policy "users manage their own resume uploads"
  on storage.objects for all
  using (bucket_id = 'resume-uploads' and auth.uid()::text = (storage.foldername(name))[1])
  with check (bucket_id = 'resume-uploads' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "avatars are publicly readable"
  on storage.objects for select
  using (bucket_id = 'avatars');

create policy "users manage their own avatar"
  on storage.objects for insert
  with check (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "users update their own avatar"
  on storage.objects for update
  using (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);
