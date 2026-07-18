-- Seed data for local development / fresh projects.
-- Run automatically by `supabase db reset`.

insert into public.plan_limits (plan, max_resumes, max_ai_generations_per_month, custom_domain_allowed, premium_templates_allowed)
values
  ('free', 2, 5, false, false),
  ('pro', 50, 200, true, true)
on conflict (plan) do update set
  max_resumes = excluded.max_resumes,
  max_ai_generations_per_month = excluded.max_ai_generations_per_month,
  custom_domain_allowed = excluded.custom_domain_allowed,
  premium_templates_allowed = excluded.premium_templates_allowed;

insert into public.resume_templates (name, category, is_premium, config)
values
  ('Minimal', 'classic', false, '{"layout": "single-column"}'::jsonb),
  ('Modern', 'contemporary', false, '{"layout": "two-column"}'::jsonb),
  ('Executive', 'premium', true, '{"layout": "sidebar"}'::jsonb)
on conflict do nothing;
