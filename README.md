# GoalDESK

Teil der **DESK-Suite** – persönliche Ziel-Visualisierung mit 5 Chart-Typen.

🌐 **Live-Version:** [goaldesk.wissen-und-werkzeug.de](https://goaldesk.wissen-und-werkzeug.de)

## Setup

### 1. Abhängigkeiten installieren

```bash
npm install
```

### 2. Umgebungsvariablen

```bash
cp .env.example .env
```

Trage deine Supabase-Credentials ein:

```
VITE_SUPABASE_URL=https://dein-projekt.supabase.co
VITE_SUPABASE_ANON_KEY=dein-anon-key
```

### 3. Datenbank migrieren

Im Supabase Dashboard unter **SQL Editor** den Inhalt von `supabase/migrations/001_init.sql` ausführen.

Oder via Supabase CLI:

```bash
supabase db push
```

### 4. Entwicklungsserver starten

```bash
npm run dev
```

## Projektstruktur

```
src/
├── components/
│   ├── goals/
│   │   ├── GoalCard.tsx        # Ziel-Karte mit Chart-Renderer
│   │   ├── GoalEditor.tsx      # Modal für Erstellen/Bearbeiten
│   │   └── charts/
│   │       ├── BarChart.tsx    # Horizontaler Fortschrittsbalken
│   │       ├── PieChart.tsx    # Tortendiagramm
│   │       ├── DonutChart.tsx  # Ringdiagramm mit Prozentzahl
│   │       ├── MilestoneBar.tsx # Balken mit 25/50/75/100%-Markierungen
│   │       └── HeroNumber.tsx  # Große Zahl mit Mini-Ring
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Layout.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       └── Modal.tsx
├── hooks/
│   └── useGoals.ts             # Supabase CRUD – einzige Datenschicht
├── lib/
│   └── supabase.ts
├── pages/
│   ├── Auth.tsx                # Login + Registrierung
│   └── Dashboard.tsx           # Ziel-Grid
├── store/
│   └── goalsStore.ts           # Zustand Store
└── types/
    └── goal.ts
```

## Tech-Stack

| Technologie | Version | Zweck |
|---|---|---|
| React | 18 | UI |
| Vite | 5 | Build-Tool |
| TypeScript | 5 | Typsicherheit |
| Tailwind CSS | 3 | Styling |
| Recharts | 2 | Chart-Bibliothek |
| Supabase | 2 | Auth + Datenbank |
| React Router | 6 | Navigation |
| Zustand | 4 | State Management |

## Design-System

- **Schrift:** Inter
- **Primärfarbe (DESK-Blau):** `#38BDF8` (Tailwind `sky-400`)
- **Hintergrund:** `#0F172A` (`slate-950`)
- **Cards:** `#1E293B` (`slate-800`)
- **Borders:** `#334155` (`slate-700`)
- **Branding:** Präfix weiß, `DESK` in DESK-Blau – z.B. **Goal**`DESK`

## Chart-Typen

| Typ | Beschreibung |
|---|---|
| `bar` | Horizontaler Fortschrittsbalken mit Gradient |
| `pie` | Klassisches Tortendiagramm (Ist vs. Rest) |
| `donut` | Ringdiagramm mit Prozentzahl in der Mitte |
| `milestone` | Balken mit Meilenstein-Markierungen bei 25/50/75/100% |
| `hero` | Große Zahl mit Label und Mini-Fortschrittsring |

## Supabase Tabelle

`goaldesk_goals` – RLS aktiviert, jeder Nutzer sieht nur seine eigenen Ziele.
