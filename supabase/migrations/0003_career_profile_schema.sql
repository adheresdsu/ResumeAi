-- Career Profile schema: structured, provenance-tracked source of truth
-- for work experience, education, skills, and projects. Feeds resume
-- generation but is independent of any single resume_version.

-- ---------------------------------------------------------------------------
-- career_evidence_sources: where a piece of profile data came from
-- ---------------------------------------------------------------------------
create table public.career_evidence_sources (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  uploaded_file_id uuid references public.uploaded_files (id) on delete set null,
  source_type text not null check (source_type in ('manual', 'upload', 'ai_extracted', 'imported')),
  label text,
  created_at timestamptz not null default now()
);

alter table public.career_evidence_sources enable row level security;

create policy "career_evidence_sources are managed by owner"
  on public.career_evidence_sources for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index career_evidence_sources_user_id_idx on public.career_evidence_sources (user_id);
create index career_evidence_sources_uploaded_file_id_idx on public.career_evidence_sources (uploaded_file_id);

-- ---------------------------------------------------------------------------
-- skills: user-owned skill catalog
-- ---------------------------------------------------------------------------
create table public.skills (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  normalized_name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, normalized_name),
  unique (id, user_id)
);

alter table public.skills enable row level security;

create policy "skills are managed by owner"
  on public.skills for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create trigger set_skills_updated_at
  before update on public.skills
  for each row execute function public.set_updated_at();

create index skills_user_id_idx on public.skills (user_id);
create index skills_normalized_name_idx on public.skills (user_id, normalized_name);

-- ---------------------------------------------------------------------------
-- work_experiences
-- ---------------------------------------------------------------------------
create table public.work_experiences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  company text not null,
  title text not null,
  location text,
  start_date date not null,
  end_date date,
  is_current boolean not null default false,
  evidence_source_id uuid references public.career_evidence_sources (id) on delete set null,
  verification_status text not null default 'unverified'
    check (verification_status in ('unverified', 'user_confirmed', 'user_edited')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_date is null or end_date >= start_date)
);

alter table public.work_experiences enable row level security;

create policy "work_experiences are managed by owner"
  on public.work_experiences for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create trigger set_work_experiences_updated_at
  before update on public.work_experiences
  for each row execute function public.set_updated_at();

create index work_experiences_user_id_idx on public.work_experiences (user_id);
create index work_experiences_evidence_source_id_idx on public.work_experiences (evidence_source_id);

-- ---------------------------------------------------------------------------
-- work_experience_bullets: owned through parent work_experience
-- ---------------------------------------------------------------------------
create table public.work_experience_bullets (
  id uuid primary key default gen_random_uuid(),
  work_experience_id uuid not null references public.work_experiences (id) on delete cascade,
  content text not null,
  sort_order int not null default 0,
  evidence_source_id uuid references public.career_evidence_sources (id) on delete set null,
  verification_status text not null default 'unverified'
    check (verification_status in ('unverified', 'user_confirmed', 'user_edited')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.work_experience_bullets enable row level security;

create policy "work_experience_bullets are managed via parent owner"
  on public.work_experience_bullets for all
  using (
    exists (
      select 1 from public.work_experiences
      where work_experiences.id = work_experience_bullets.work_experience_id
        and work_experiences.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.work_experiences
      where work_experiences.id = work_experience_bullets.work_experience_id
        and work_experiences.user_id = auth.uid()
    )
  );

create trigger set_work_experience_bullets_updated_at
  before update on public.work_experience_bullets
  for each row execute function public.set_updated_at();

create index work_experience_bullets_work_experience_id_idx
  on public.work_experience_bullets (work_experience_id, sort_order);
create index work_experience_bullets_evidence_source_id_idx
  on public.work_experience_bullets (evidence_source_id);

-- ---------------------------------------------------------------------------
-- education
-- ---------------------------------------------------------------------------
create table public.education (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  institution text not null,
  degree text,
  field_of_study text,
  start_date date,
  end_date date,
  evidence_source_id uuid references public.career_evidence_sources (id) on delete set null,
  verification_status text not null default 'unverified'
    check (verification_status in ('unverified', 'user_confirmed', 'user_edited')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_date is null or start_date is null or end_date >= start_date)
);

alter table public.education enable row level security;

create policy "education is managed by owner"
  on public.education for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create trigger set_education_updated_at
  before update on public.education
  for each row execute function public.set_updated_at();

create index education_user_id_idx on public.education (user_id);
create index education_evidence_source_id_idx on public.education (evidence_source_id);

-- ---------------------------------------------------------------------------
-- profile_skills: join table linking a user to their own skills
-- ---------------------------------------------------------------------------
create table public.profile_skills (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  skill_id uuid not null,
  evidence_source_id uuid references public.career_evidence_sources (id) on delete set null,
  verification_status text not null default 'unverified'
    check (verification_status in ('unverified', 'user_confirmed', 'user_edited')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, skill_id),
  foreign key (skill_id, user_id) references public.skills (id, user_id) on delete cascade
);

alter table public.profile_skills enable row level security;

create policy "profile_skills are managed by owner"
  on public.profile_skills for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create trigger set_profile_skills_updated_at
  before update on public.profile_skills
  for each row execute function public.set_updated_at();

create index profile_skills_user_id_idx on public.profile_skills (user_id);
create index profile_skills_skill_id_idx on public.profile_skills (skill_id);
create index profile_skills_evidence_source_id_idx on public.profile_skills (evidence_source_id);

-- ---------------------------------------------------------------------------
-- projects
-- ---------------------------------------------------------------------------
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  description text,
  url text,
  start_date date,
  end_date date,
  evidence_source_id uuid references public.career_evidence_sources (id) on delete set null,
  verification_status text not null default 'unverified'
    check (verification_status in ('unverified', 'user_confirmed', 'user_edited')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_date is null or start_date is null or end_date >= start_date)
);

alter table public.projects enable row level security;

create policy "projects are managed by owner"
  on public.projects for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create trigger set_projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

create index projects_user_id_idx on public.projects (user_id);
create index projects_evidence_source_id_idx on public.projects (evidence_source_id);

-- ---------------------------------------------------------------------------
-- project_bullets: owned through parent project
-- ---------------------------------------------------------------------------
create table public.project_bullets (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  content text not null,
  sort_order int not null default 0,
  evidence_source_id uuid references public.career_evidence_sources (id) on delete set null,
  verification_status text not null default 'unverified'
    check (verification_status in ('unverified', 'user_confirmed', 'user_edited')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.project_bullets enable row level security;

create policy "project_bullets are managed via parent owner"
  on public.project_bullets for all
  using (
    exists (
      select 1 from public.projects
      where projects.id = project_bullets.project_id
        and projects.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.projects
      where projects.id = project_bullets.project_id
        and projects.user_id = auth.uid()
    )
  );

create trigger set_project_bullets_updated_at
  before update on public.project_bullets
  for each row execute function public.set_updated_at();

create index project_bullets_project_id_idx on public.project_bullets (project_id, sort_order);
create index project_bullets_evidence_source_id_idx on public.project_bullets (evidence_source_id);

-- ---------------------------------------------------------------------------
-- profile_links: simple flat link list (portfolio, GitHub, LinkedIn, etc.)
-- ---------------------------------------------------------------------------
create table public.profile_links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  label text not null,
  url text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profile_links enable row level security;

create policy "profile_links are managed by owner"
  on public.profile_links for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create trigger set_profile_links_updated_at
  before update on public.profile_links
  for each row execute function public.set_updated_at();

create index profile_links_user_id_idx on public.profile_links (user_id, sort_order);
