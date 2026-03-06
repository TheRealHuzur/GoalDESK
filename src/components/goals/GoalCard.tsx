import type { Goal } from '@/types/goal';
import { BarChart } from './charts/BarChart';
import { PieChart } from './charts/PieChart';
import { DonutChart } from './charts/DonutChart';
import { MilestoneBar } from './charts/MilestoneBar';
import { HeroNumber } from './charts/HeroNumber';

interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
}

function ChartRenderer({ goal }: { goal: Goal }) {
  const props = {
    start: goal.start_value ?? 0,
    value: goal.current_value,
    target: goal.target_value,
    label: goal.metric_label,
  };

  switch (goal.chart_type) {
    case 'bar': return <BarChart {...props} />;
    case 'pie': return <PieChart {...props} />;
    case 'donut': return <DonutChart {...props} />;
    case 'milestone': return <MilestoneBar {...props} />;
    case 'hero': return <HeroNumber {...props} />;
    default: return <BarChart {...props} />;
  }
}

export function GoalCard({ goal, onEdit }: GoalCardProps) {
  const startVal = goal.start_value ?? 0;
  const totalDiff = goal.target_value - startVal;
  const currentDiff = goal.current_value - startVal;
  let pct = 0;
  if (totalDiff !== 0) {
    pct = Math.min(Math.max(Math.round((currentDiff / totalDiff) * 100), 0), 100);
  }

  return (
    <article className="bg-desk-card border border-desk-border rounded-[14px] p-7 flex flex-col gap-4 transition-colors fadeUp">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-extrabold tracking-tight text-desk-text truncate" title={goal.title}>
            {goal.title}
          </h3>
          {goal.description && (
            <p className="text-sm text-desk-text-muted line-clamp-2 mt-0.5">{goal.description}</p>
          )}
        </div>
        <span className="shrink-0 text-xs font-semibold px-2 py-1 bg-desk-sky/10 text-desk-sky rounded-full">
          {pct}%
        </span>
      </div>

      {/* Chart */}
      <div className="h-[220px] flex items-center justify-center overflow-hidden">
        <ChartRenderer goal={goal} />
      </div>

      {/* Action */}
      <div className="flex justify-end">
        <button
          onClick={() => onEdit(goal)}
          title="Bearbeiten"
          className="text-desk-text-muted hover:text-desk-sky transition-colors px-2 py-1 rounded-lg hover:bg-desk-bg-3"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>edit_square</span>
        </button>
      </div>
    </article>
  );
}
