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
    value: goal.current_value,
    target: goal.target_value,
    label: goal.metric_label,
  };

  switch (goal.chart_type) {
    case 'bar':       return <BarChart {...props} />;
    case 'pie':       return <PieChart {...props} />;
    case 'donut':     return <DonutChart {...props} />;
    case 'milestone': return <MilestoneBar {...props} />;
    case 'hero':      return <HeroNumber {...props} />;
    default:          return <BarChart {...props} />;
  }
}

export function GoalCard({ goal, onEdit }: GoalCardProps) {
  const pct = Math.min(Math.round((goal.current_value / goal.target_value) * 100), 100);

  return (
    <article className="bg-slate-800 border border-slate-700 rounded-2xl p-5 flex flex-col gap-4 hover:border-slate-600 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-100 truncate" title={goal.title}>
            {goal.title}
          </h3>
          {goal.description && (
            <p className="text-sm text-slate-500 line-clamp-2 mt-0.5">{goal.description}</p>
          )}
        </div>
        <span className="shrink-0 text-xs font-semibold px-2 py-1 bg-sky-400/10 text-sky-400 rounded-full">
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
          className="text-slate-500 hover:text-sky-400 transition-colors px-2 py-1 rounded-lg hover:bg-slate-700"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>edit_square</span>
        </button>
      </div>
    </article>
  );
}
