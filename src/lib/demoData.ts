import type { Goal } from '@/types/goal';

export const DEMO_GOALS: Goal[] = [
  {
    id: 'demo-1',
    user_id: 'demo',
    title: '1000 km laufen',
    description: 'Laufziel für dieses Jahr – jeden Tag ein bisschen mehr.',
    metric_label: 'km',
    start_value: 0,
    target_value: 1000,
    current_value: 420,
    chart_type: 'bar',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-2',
    user_id: 'demo',
    title: '50 Bücher lesen',
    description: 'Mindestens ein Buch pro Woche.',
    metric_label: 'Bücher',
    start_value: 0,
    target_value: 50,
    current_value: 18,
    chart_type: 'donut',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-3',
    user_id: 'demo',
    title: 'Notgroschen aufbauen',
    metric_label: '€',
    start_value: 0,
    target_value: 10000,
    current_value: 6750,
    chart_type: 'donut',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-4',
    user_id: 'demo',
    title: 'YouTube: 10.000 Abonnenten',
    description: 'Kanal-Wachstumsziel Q4.',
    metric_label: 'Abos',
    start_value: 0,
    target_value: 10000,
    current_value: 3200,
    chart_type: 'hero',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-5',
    user_id: 'demo',
    title: '100 Liegestütze am Stück',
    metric_label: 'Wdh.',
    start_value: 0,
    target_value: 100,
    current_value: 55,
    chart_type: 'milestone',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-6',
    user_id: 'demo',
    title: 'Projektbudget verbraucht',
    description: 'Marketing-Budget Q1.',
    metric_label: '€',
    start_value: 0,
    target_value: 5000,
    current_value: 1800,
    chart_type: 'pie',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const STORAGE_KEY = 'goaldesk_demo_goals';

export function loadDemoGoals(): Goal[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Goal[];
  } catch {
    // ignore
  }
  // First visit: seed with demo data
  saveDemoGoals(DEMO_GOALS);
  return DEMO_GOALS;
}

export function saveDemoGoals(goals: Goal[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
}
