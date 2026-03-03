-- Füge die Spalte 'start_value' hinzu, um abnehmende Ziele (wie Gewichtsabnahme) zu unterstützen.
-- Der Standardwert bleibt 0, damit bestehende Ziele weiterhin wie gewohnt funktionieren.

alter table public.goaldesk_goals
add column start_value numeric not null default 0;
