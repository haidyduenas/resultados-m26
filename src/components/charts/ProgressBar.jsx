import { isNil } from '../../utils/formatters.js';

/**
 * Single-value progress bar. `value` and `max` give the fill ratio;
 * children render an optional caption row below.
 */
export default function ProgressBar({
  value,
  max = 100,
  color = '#22c55e',
  colorDim = 'rgba(34,197,94,0.15)',
  height = 10,
  delay = 0.1,
  ariaLabel,
}) {
  if (isNil(value)) {
    return (
      <div
        style={{
          height,
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 999,
        }}
        aria-label={ariaLabel}
      />
    );
  }
  const pct = Math.max(0, Math.min(1, Number(value) / Number(max || 1)));
  return (
    <div
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuenow={Number(value)}
      aria-valuemin={0}
      aria-valuemax={Number(max)}
      style={{
        height,
        background: colorDim,
        borderRadius: 999,
        overflow: 'hidden',
        position: 'relative',
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
          animation: `seoBarGrow 0.9s cubic-bezier(0.2, 0.7, 0.3, 1) ${delay}s forwards`,
        }}
      />
    </div>
  );
}
