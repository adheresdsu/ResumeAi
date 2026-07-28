-- Add location, description, current-status and manual ordering support to
-- education, needed by the Career Profile education editor.

alter table public.education
  add column location text,
  add column description text,
  add column is_current boolean not null default false,
  add column display_order integer not null default 0;

alter table public.education
  add constraint education_is_current_requires_no_end_date
    check (is_current = false or end_date is null);

create index education_user_id_display_order_idx
  on public.education (user_id, display_order);
