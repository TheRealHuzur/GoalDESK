
interface BarChartProps {
  start: number;
  value: number;
  target: number;
  label: string;
  compact?: boolean;
}

export function BarChart({ start, value, target, label, compact = false }: BarChartProps) {
  const totalDiff = target - start;
  const currentDiff = value - start;
  const rawPct = totalDiff !== 0 ? (currentDiff / totalDiff) * 100 : 0;
  const pct = Math.min(Math.max(rawPct, 0), 100);
  const displayPct = Math.round(pct);

  return (
    <div className="flex flex-col gap-2 w-full">
      {!compact && (
        <div className="flex justify-between items-baseline text-sm">
          <span className="text-slate-400">{label}</span>
          <span className="text-sky-400 font-semibold">{displayPct}%</span>
        </div>
      )}
      <div className="relative h-3 bg-slate-700 rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-sky-500 to-sky-400 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      {!compact && (
        <div className="flex justify-between text-xs text-slate-500">
          <span>{value.toLocaleString()}</span>
          <span>{target.toLocaleString()} {label}</span>
        </div>
      )}
    </div>
  );
}
