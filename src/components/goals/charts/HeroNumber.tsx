import React from 'react';

interface HeroNumberProps {
  value: number;
  target: number;
  label: string;
  compact?: boolean;
}

export function HeroNumber({ value, target, label, compact = false }: HeroNumberProps) {
  const pct = Math.min((value / target) * 100, 100);
  const displayPct = Math.round(pct);

  const r = compact ? 18 : 52;
  const strokeW = compact ? 4 : 7;
  const size = compact ? 44 : 124;
  const circumference = 2 * Math.PI * r;
  const dash = (pct / 100) * circumference;
  const gap = circumference - dash;

  return (
    <div className={`flex ${compact ? 'items-center gap-3' : 'flex-col items-center gap-3'} w-full`}>
      {/* Ring with number centered inside */}
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#334155"
            strokeWidth={strokeW}
          />
          {/* Fill */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#38BDF8"
            strokeWidth={strokeW}
            strokeDasharray={`${dash} ${gap}`}
            strokeLinecap="round"
            className="transition-all duration-700"
          />
        </svg>

        {/* Centered content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={
              compact
                ? 'text-base font-bold text-sky-400 tabular-nums leading-none'
                : 'text-3xl font-bold text-sky-400 tabular-nums leading-none'
            }
          >
            {value.toLocaleString()}
          </span>
          {!compact && (
            <span className="text-xs text-slate-500 mt-1 text-center px-1 leading-tight">
              {label}
            </span>
          )}
        </div>
      </div>

      {/* Bottom info (non-compact) */}
      {!compact && (
        <p className="text-sm text-slate-500 text-center">
          Ziel: {target.toLocaleString()} {label} · {displayPct}% erreicht
        </p>
      )}

      {/* Inline info (compact) */}
      {compact && (
        <div className="flex flex-col">
          <span className="text-xs text-slate-400">{label}</span>
          <span className="text-xs text-slate-500">{displayPct}%</span>
        </div>
      )}
    </div>
  );
}
