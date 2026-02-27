-- GoalDESK – Initiales Schema
-- Tabellen mit goaldesk_ Prefix (DESK-Suite Konvention)

create table goaldesk_goals (
  id            uuid        primary key default gen_random_uuid(),
  user_id       uuid        references auth.users not null,
  title         text        not null,
  description   text,
  metric_label  text        not null,
  target_value  numeric     not null,
  current_value numeric     default 0,
  chart_type    text        default 'bar',  -- bar | pie | donut | gauge | milestone | hero
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- Row Level Security aktivieren
alter table goaldesk_goals enable row level security;

-- Nutzer sieht und verwaltet nur seine eigenen Ziele
create policy "Nutzer sieht nur eigene Ziele"
  on goaldesk_goals
  for all
  using (auth.uid() = user_id);

-- Automatisches updated_at via Trigger
create or replace function goaldesk_set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger goaldesk_goals_updated_at
  before update on goaldesk_goals
  for each row
  execute procedure goaldesk_set_updated_at();
