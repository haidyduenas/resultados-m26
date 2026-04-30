import { isNil } from '../../utils/formatters.js';

/**
 * Horizontal bar chart. Each item: { label, value, sub? }.
 * Animates each bar's width from 0 to its share of the max value.
 */
export default function BarChart({
  items,
  color = '#22c55e',
  colorDim = 'rgba(34,197,94,0.15)',
  formatValue = (v) => String(v),
  maxValue,
  rowHeight = 36,
  labelWidth = 220,
}) {
  if (!items || !items.length) return null;
  const numericMax =
    maxValue ??
    Math.max(
      1,
      ...items.map((it) => (isNil(it.value) ? 0 : Number(it.value)))
    );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {items.map((it, i) => {
        const v = isNil(it.value) ? 0 : Number(it.value);
        const pct = Math.max(0, Math.min(1, v / numericMax));
        return (
          <div
            key={`${it.label}-${i}`}
            className="fade-in"
            style={{
              animationDelay: `${0.05 * i}s`,
              display: 'grid',
              gridTemplateColumns: `${labelWidth}px 1fr auto`,
              alignItems: 'center',
              gap: 14,
              minHeight: rowHeight,
            }}
          >
            <div
              style={{
                fontSize: 13,
                color: '#d4d4d8',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              title={it.label}
            >
              {it.label}
            </div>
            <div
              style={{
                position: 'relative',
                height: 12,
                background: colorDim,
                borderRadius: 999,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${pct * 100}%`,
                  height: '100%',
                  background: color,
                  borderRadius: 999,
                  transformOrigin: 'left center',
                  transform: 'scaleX(0)',
                  animation: `seoBarGrow 0.9s cubic-bezier(0.2, 0.7, 0.3, 1) ${0.1 + i * 0.05}s forwards`,
                }}
              />
            </div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 13,
                color: '#f4f4f5',
                textAlign: 'right',
                whiteSpace: 'nowrap',
              }}
            >
              {isNil(it.value) ? '—' : formatValue(v, it)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
