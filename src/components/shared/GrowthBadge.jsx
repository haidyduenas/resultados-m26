import { isNil, formatDecimal, NA } from '../../utils/formatters.js';

const SIZES = {
  sm: { padding: '4px 10px', fontSize: 12, gap: 5 },
  md: { padding: '7px 14px', fontSize: 14, gap: 6 },
  lg: { padding: '10px 20px', fontSize: 18, gap: 8 },
};

export default function GrowthBadge({ value, size = 'md', label }) {
  const dims = SIZES[size] ?? SIZES.md;

  if (isNil(value)) {
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: dims.gap,
          padding: dims.padding,
          fontSize: dims.fontSize,
          fontFamily: "'Space Mono', monospace",
          fontWeight: 700,
          background: 'rgba(255,255,255,0.06)',
          color: '#a1a1aa',
          borderRadius: 999,
          letterSpacing: '0.02em',
        }}
      >
        {NA}
        {label ? <span style={{ opacity: 0.7, fontWeight: 400 }}>{label}</span> : null}
      </span>
    );
  }

  const num = Number(value);
  const positive = num > 0;
  const negative = num < 0;
  const bg = positive
    ? 'rgba(34,197,94,0.16)'
    : negative
    ? 'rgba(239,68,68,0.18)'
    : 'rgba(161,161,170,0.16)';
  const fg = positive ? '#4ade80' : negative ? '#f87171' : '#a1a1aa';
  const arrow = positive ? '▲' : negative ? '▼' : '•';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: dims.gap,
        padding: dims.padding,
        fontSize: dims.fontSize,
        fontFamily: "'Space Mono', monospace",
        fontWeight: 700,
        background: bg,
        color: fg,
        borderRadius: 999,
        letterSpacing: '0.02em',
      }}
    >
      <span style={{ fontSize: '0.78em' }}>{arrow}</span>
      <span>{formatDecimal(Math.abs(num), 2)}%</span>
      {label ? (
        <span style={{ opacity: 0.7, fontWeight: 400, marginLeft: 4 }}>
          {label}
        </span>
      ) : null}
    </span>
  );
}
