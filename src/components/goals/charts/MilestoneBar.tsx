import React from 'react';

interface MilestoneBarProps {
  value: number;
  target: number;
  label: string;
  compact?: boolean;
}

const MILESTONES = [25, 50, 75, 100];

export function MilestoneBar({ value, target, label, compact = false }: MilestoneBarProps) {
  const pct = Math.min((value / target) * 100, 100);
  const displayPct = Math.round(pct);

  return (
    <div className="flex flex-col gap-3 w-full">
      {!compact && (
        <div className="flex justify-between items-baseline text-sm">
          <span className="text-slate-400">{label}</span>
          <span className="text-sky-400 font-semibold">{displayPct}%</span>
        </div>
      )}

      {/* Bar with milestones */}
      <div className="relative">
        {/* Track */}
        <div className="relative h-4 bg-slate-700 rounded-full overflow-visible">
          {/* Fill */}
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-sky-600 to-sky-400 rounded-full transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
          {/* Milestone markers */}
          {MILESTONES.map((m) => (
            <div
              key={m}
              className="absolute top-0 bottom-0 w-0.5 bg-slate-900"
              style={{ left: `${m}%`, transform: 'translateX(-50%)' }}
            />
          ))}
        </div>

        {/* Milestone labels */}
        {!compact && (
          <div className="relative mt-2">
            {MILESTONES.map((m) => {
              const reached = pct >= m;
              return (
                <div
                  key={m}
                  className="absolute flex flex-col items-center"
                  style={{ left: `${m}%`, transform: 'translateX(-50%)' }}
                >
                  <div
                    className={`w-2 h-2 rounded-full border-2 ${
                      reached
                        ? 'bg-sky-400 border-sky-400'
                        : 'bg-slate-800 border-slate-600'
                    }`}
                  />
                  <span className={`text-xs mt-0.5 ${reached ? 'text-sky-400' : 'text-slate-600'}`}>
                    {m}%
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {!compact && (
        <p className="text-xs text-slate-500 mt-4">
          {value.toLocaleString()} / {target.toLocaleString()} {label}
        </p>
      )}
    </div>
  );
}
