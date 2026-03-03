import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface DonutChartProps {
  value: number;
  target: number;
  label: string;
  compact?: boolean;
}

const COLORS = ['#38BDF8', '#334155'];

export function DonutChart({ value, target, label, compact = false }: DonutChartProps) {
  const pct = Math.min((value / target) * 100, 100);
  const rest = 100 - pct;
  const displayPct = Math.round(pct);

  // ── Compact: pure SVG — bypasses Recharts/ResponsiveContainer sizing issues ──
  if (compact) {
    const r = 14;
    const size = 36;
    const strokeW = 4;
    const circumference = 2 * Math.PI * r;
    const dash = (pct / 100) * circumference;
    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#334155" strokeWidth={strokeW} />
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none" stroke="#38BDF8" strokeWidth={strokeW}
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-xs font-bold text-sky-400" style={{ fontSize: 9 }}>{displayPct}%</span>
        </div>
      </div>
    );
  }

  // ── Full size: Recharts ────────────────────────────────────────────────────
  const data = [
    { name: label, value: pct },
    { name: 'Rest', value: rest },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative" style={{ height: 180 }}>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={70}
              innerRadius={50}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              strokeWidth={0}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-xl font-bold text-sky-400">{displayPct}%</span>
        </div>
      </div>
      <p className="text-sm text-slate-400 mt-1">
        {value.toLocaleString()} / {target.toLocaleString()} {label}
      </p>
    </div>
  );
}
