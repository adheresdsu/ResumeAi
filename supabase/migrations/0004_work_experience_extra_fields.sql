-- Add description and manual ordering support to work_experiences,
-- needed by the Career Profile work experience editor.

alter table public.work_experiences
  add column description text,
  add column display_order int not null default 0;

create index work_experiences_user_id_display_order_idx
  on public.work_experiences (user_id, display_order);
