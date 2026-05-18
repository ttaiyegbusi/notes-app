-- Notes App — Supabase schema
-- Paste this into Supabase SQL Editor and run, after creating your project.

-- =====================================================
-- TABLES
-- =====================================================

create table if not exists public.todos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  completed boolean not null default false,
  position int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  event_date date not null,
  start_time time not null,
  end_time time not null,
  highlighted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  note_date date not null,
  content text not null default '',
  updated_at timestamptz not null default now(),
  unique (user_id, note_date)
);

-- =====================================================
-- INDEXES
-- =====================================================

create index if not exists idx_todos_user on public.todos (user_id, created_at desc);
create index if not exists idx_events_user_date on public.events (user_id, event_date);
create index if not exists idx_notes_user_date on public.notes (user_id, note_date);

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================

alter table public.todos enable row level security;
alter table public.events enable row level security;
alter table public.notes enable row level security;

-- Todos: users can only see and modify their own
create policy "Users read own todos" on public.todos
  for select using (auth.uid() = user_id);
create policy "Users insert own todos" on public.todos
  for insert with check (auth.uid() = user_id);
create policy "Users update own todos" on public.todos
  for update using (auth.uid() = user_id);
create policy "Users delete own todos" on public.todos
  for delete using (auth.uid() = user_id);

-- Events: same pattern
create policy "Users read own events" on public.events
  for select using (auth.uid() = user_id);
create policy "Users insert own events" on public.events
  for insert with check (auth.uid() = user_id);
create policy "Users update own events" on public.events
  for update using (auth.uid() = user_id);
create policy "Users delete own events" on public.events
  for delete using (auth.uid() = user_id);

-- Notes: same pattern
create policy "Users read own notes" on public.notes
  for select using (auth.uid() = user_id);
create policy "Users insert own notes" on public.notes
  for insert with check (auth.uid() = user_id);
create policy "Users update own notes" on public.notes
  for update using (auth.uid() = user_id);
create policy "Users delete own notes" on public.notes
  for delete using (auth.uid() = user_id);

-- =====================================================
-- UPDATED_AT TRIGGER
-- =====================================================

create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_todos_updated_at on public.todos;
create trigger set_todos_updated_at before update on public.todos
  for each row execute function public.handle_updated_at();

drop trigger if exists set_events_updated_at on public.events;
create trigger set_events_updated_at before update on public.events
  for each row execute function public.handle_updated_at();

drop trigger if exists set_notes_updated_at on public.notes;
create trigger set_notes_updated_at before update on public.notes
  for each row execute function public.handle_updated_at();
