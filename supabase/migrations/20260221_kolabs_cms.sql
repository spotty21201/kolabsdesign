-- Kolabs CMS schema (WordPress-style editing workflow)

create extension if not exists pgcrypto;

create table if not exists public.items (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('Tool', 'Case', 'Brief', 'Research')),
  title text not null,
  slug text not null unique,
  status text not null check (status in ('Experiment', 'Method', 'Proven')),
  one_liner text not null default '',
  hero_image text,
  tags text[] not null default '{}',
  cta_type text not null check (cta_type in ('Try', 'Read', 'Download', 'Request')),
  cta_url text not null default '#',
  featured boolean not null default false,
  published boolean not null default false,
  published_at timestamptz,
  proof_cue text,
  decision_md text not null default '',
  inputs_md text not null default '',
  output_md text not null default '',
  confidence_md text not null default '',
  impact_md text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index if not exists items_published_idx on public.items (published, published_at desc);
create index if not exists items_slug_idx on public.items (slug);
create index if not exists items_deleted_idx on public.items (deleted_at);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_items_updated_at on public.items;
create trigger set_items_updated_at
before update on public.items
for each row
execute procedure public.set_updated_at();

alter table public.items enable row level security;

drop policy if exists "Public can read published items" on public.items;
create policy "Public can read published items"
on public.items
for select
to anon, authenticated
using (
  deleted_at is null
  and published = true
  and (published_at is null or published_at <= now())
);

insert into storage.buckets (id, name, public)
values ('asset-images', 'asset-images', true)
on conflict (id) do nothing;

drop policy if exists "Public can read asset images" on storage.objects;
create policy "Public can read asset images"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'asset-images');

-- Service role bypasses RLS; writes are handled by server actions with SUPABASE_SERVICE_ROLE_KEY.
