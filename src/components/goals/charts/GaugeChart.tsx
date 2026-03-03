
interface GaugeChartProps {
  value: number;
  target: number;
  label: string;
  compact?: boolean;
}

export function GaugeChart({ value, target, label, compact = false }: GaugeChartProps) {
  const pct = Math.min((value / target) * 100, 100);
  const displayPct = Math.round(pct);

  const cx = 100;
  const cy = 88;
  const r = 68;

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  // Angle mapping (SVG coords, y-axis points DOWN):
  //   180° → left  (cos=-1, sin=0  → screen-left)
  //   270° → top   (cos=0,  sin=-1 → screen-up, because sin(270°)=-1 and SVG y is inverted)
  //   360° → right (cos=1,  sin=0  → screen-right)
  //
  // Formula: pct 0% → 180°,  50% → 270°,  100% → 360°
  const pctToAngle = (p: number) => 180 + p * 1.8;

  // Track arc: full semicircle from LEFT to RIGHT going over the TOP.
  // Using sweep-flag=0 (counter-clockwise in SVG screen coords) curves the arc upward.
  const lx = cx - r; // left point x
  const rx = cx + r; // right point x
  const trackD = `M ${lx} ${cy} A ${r} ${r} 0 0 0 ${rx} ${cy}`;

  // Fill arc: from LEFT up to the angle corresponding to pct.
  // The angular span is always ≤ 180°, so large-arc-flag = 0.
  const fillAngle = pctToAngle(pct);
  const fex = +(cx + r * Math.cos(toRad(fillAngle))).toFixed(3);
  const fey = +(cy + r * Math.sin(toRad(fillAngle))).toFixed(3);
  const fillD = pct > 0.5
    ? `M ${lx} ${cy} A ${r} ${r} 0 0 0 ${fex} ${fey}`
    : '';

  // Needle: points from center toward the fill angle.
  const needleAngle = pctToAngle(pct);
  const needleLen = compact ? 40 : 54;
  const nx = +(cx + needleLen * Math.cos(toRad(needleAngle))).toFixed(3);
  const ny = +(cy + needleLen * Math.sin(toRad(needleAngle))).toFixed(3);

  // Tick marks at 0/25/50/75/100%
  const ticks = [0, 25, 50, 75, 100];

  // ViewBox: arc content from (cx-r, cy-r) to (cx+r, cy), plus padding and label space
  const vbX = cx - r - 14;
  const vbY = cy - r - 10;
  const vbW = (r + 14) * 2;
  const vbH = r + (compact ? 10 : 24);
  const svgWidth = compact ? 110 : 190;
  const svgHeight = Math.round(svgWidth * vbH / vbW);

  return (
    <div className="flex flex-col items-center gap-1 w-full">
      <svg
        viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
        width={svgWidth}
        height={svgHeight}
        className="overflow-visible"
      >
        {/* Background track */}
        <path
          d={trackD}
          fill="none"
          stroke="#334155"
          strokeWidth={compact ? 7 : 9}
          strokeLinecap="round"
        />

        {/* Colored fill */}
        {fillD && (
          <path
            d={fillD}
            fill="none"
            stroke="#38BDF8"
            strokeWidth={compact ? 7 : 9}
            strokeLinecap="round"
          />
        )}

        {/* Tick marks */}
        {ticks.map((tick) => {
          const ta = pctToAngle(tick);
          const x1 = +(cx + (r - 13) * Math.cos(toRad(ta))).toFixed(2);
          const y1 = +(cy + (r - 13) * Math.sin(toRad(ta))).toFixed(2);
          const x2 = +(cx + (r - 5) * Math.cos(toRad(ta))).toFixed(2);
          const y2 = +(cy + (r - 5) * Math.sin(toRad(ta))).toFixed(2);
          return (
            <line key={tick} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#475569" strokeWidth="2" />
          );
        })}

        {/* Needle */}
        <line
          x1={cx}
          y1={cy}
          x2={nx}
          y2={ny}
          stroke="#F1F5F9"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Center dot */}
        <circle cx={cx} cy={cy} r="5" fill="#38BDF8" />

        {/* Percentage label */}
        {!compact && (
          <text
            x={cx}
            y={cy + 20}
            textAnchor="middle"
            fill="#38BDF8"
            fontSize="13"
            fontWeight="700"
            fontFamily="Inter, sans-serif"
          >
            {displayPct}%
          </text>
        )}
      </svg>

      {!compact && (
        <p className="text-sm text-slate-400">
          {value.toLocaleString()} / {target.toLocaleString()} {label}
        </p>
      )}
    </div>
  );
}
