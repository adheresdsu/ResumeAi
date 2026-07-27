-- Backfill public.profiles rows for auth.users that predate the
-- on_auth_user_created trigger (or were otherwise missed).
-- Idempotent: safe to run multiple times.

insert into public.profiles (id, full_name, avatar_url)
select
  auth.users.id,
  coalesce(
    auth.users.raw_user_meta_data ->> 'full_name',
    auth.users.raw_user_meta_data ->> 'name',
    ''
  ) as full_name,
  auth.users.raw_user_meta_data ->> 'avatar_url' as avatar_url
from auth.users
on conflict (id) do nothing;
