export default function MetricCard({
  label,
  value,
  sub,
  accent,
  align = 'start',
  children,
  style,
}) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 16,
        padding: '22px 24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: align === 'center' ? 'center' : 'flex-start',
        textAlign: align === 'center' ? 'center' : 'left',
        gap: 12,
        minHeight: 140,
        ...style,
      }}
    >
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 11,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#a1a1aa',
        }}
      >
        {label}
      </div>
      {value !== undefined && value !== null && (
        <div
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            fontSize: 30,
            color: accent ?? '#f4f4f5',
            lineHeight: 1.05,
            wordBreak: 'break-word',
            letterSpacing: '-0.01em',
          }}
        >
          {value}
        </div>
      )}
      {sub && (
        <div style={{ fontSize: 13, color: '#a1a1aa', lineHeight: 1.4 }}>
          {sub}
        </div>
      )}
      {children}
    </div>
  );
}
