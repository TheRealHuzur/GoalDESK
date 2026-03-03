import { PieChart as RechartsPie, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface PieChartProps {
  start: number;
  value: number;
  target: number;
  label: string;
  compact?: boolean;
}

const COLORS = ['#38BDF8', '#334155'];
const RADIAN = Math.PI / 180;

interface LabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  outerRadius: number;
  percent: number;
  index: number;
}

function ProgressLabel({ cx, cy, midAngle, outerRadius, percent, index }: LabelProps) {
  if (index !== 0) return null;
  if (percent < 0.03) return null;
  const radius = outerRadius + 16;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="#38BDF8" textAnchor="middle" dominantBaseline="central"
      fontSize={12} fontWeight="700" fontFamily="Inter, sans-serif">
      {`${Math.round(percent * 100)}%`}
    </text>
  );
}

export function PieChart({ start, value, target, label, compact = false }: PieChartProps) {
  const totalDiff = target - start;
  const currentDiff = value - start;
  const rawPct = totalDiff !== 0 ? (currentDiff / totalDiff) * 100 : 0;
  const pct = Math.min(Math.max(rawPct, 0), 100);

  // ── Compact: pure SVG pie — bypasses ResponsiveContainer sizing issues ────
  if (compact) {
    const r = 15;
    const size = 34;
    const cx = size / 2;
    const cy = size / 2;

    // Pie slice path: from top (−90°) clockwise by pct%
    const startAngle = -90;
    const endAngle = startAngle + (pct / 100) * 360;
    const sx = cx + r * Math.cos(startAngle * RADIAN);
    const sy = cy + r * Math.sin(startAngle * RADIAN);
    const ex = cx + r * Math.cos(endAngle * RADIAN);
    const ey = cy + r * Math.sin(endAngle * RADIAN);
    const largeArc = pct > 50 ? 1 : 0;

    const slicePath = pct >= 99.9
      ? `M ${cx} ${cy} m -${r} 0 a ${r} ${r} 0 1 1 ${r * 2} 0 a ${r} ${r} 0 1 1 -${r * 2} 0`
      : pct < 0.1
        ? ''
        : `M ${cx} ${cy} L ${sx.toFixed(2)} ${sy.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${ex.toFixed(2)} ${ey.toFixed(2)} Z`;

    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle cx={cx} cy={cy} r={r} fill="#334155" />
        {/* Progress slice */}
        {slicePath && <path d={slicePath} fill="#38BDF8" />}
      </svg>
    );
  }

  // ── Full size: Recharts ───────────────────────────────────────────────────
  const rest = 100 - pct;
  const data = [
    { name: label, value: pct },
    { name: 'Rest', value: rest },
  ];

  return (
    <div className="w-full flex flex-col items-center gap-1">
      <ResponsiveContainer width="100%" height={160}>
        <RechartsPie>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={56}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            strokeWidth={0}
            label={ProgressLabel}
            labelLine={false}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(v: number) => [`${v.toFixed(1)}%`]}
            contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 8 }}
            itemStyle={{ color: '#CBD5E1' }}
          />
        </RechartsPie>
      </ResponsiveContainer>
      <p className="text-sm text-slate-400">
        {value.toLocaleString()} / {target.toLocaleString()} {label}
      </p>
    </div>
  );
}
