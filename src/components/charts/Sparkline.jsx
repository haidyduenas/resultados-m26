import { useId } from 'react';

/**
 * SVG sparkline with gradient area fill, smooth cubic curve, and an
 * animated stroke draw-in. Pure SVG, no external deps.
 */
export default function Sparkline({
  values,
  color = '#22c55e',
  width = 480,
  height = 120,
  strokeWidth = 2.5,
  showEndDot = true,
  animate = true,
}) {
  const gid = useId().replace(/:/g, '');
  if (!values || values.length < 2) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#71717a',
          fontFamily: "'Space Mono', monospace",
          fontSize: 12,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}
      >
        sin datos suficientes
      </div>
    );
  }

  const pad = strokeWidth + 4;
  const innerW = width - pad * 2;
  const innerH = height - pad * 2;

  const dataMin = Math.min(...values);
  const dataMax = Math.max(...values);
  const dataRange =
    dataMax - dataMin || Math.max(Math.abs(dataMax), 1) * 0.1;
  // Add 40% padding above and below so the line occupies the central ~55%
  // of the SVG height — softens the visual drama of small variations.
  const yPad = dataRange * 0.4;
  const yMin = dataMin - yPad;
  const yMax = dataMax + yPad;
  const yRange = yMax - yMin;
  const stepX = innerW / (values.length - 1);

  const points = values.map((v, i) => {
    const x = pad + i * stepX;
    const y = pad + (1 - (v - yMin) / yRange) * innerH;
    return [x, y];
  });

  let path = `M ${points[0][0].toFixed(2)} ${points[0][1].toFixed(2)}`;
  for (let i = 1; i < points.length; i++) {
    const [x1, y1] = points[i - 1];
    const [x2, y2] = points[i];
    const cx = (x1 + x2) / 2;
    path += ` C ${cx.toFixed(2)} ${y1.toFixed(2)}, ${cx.toFixed(2)} ${y2.toFixed(2)}, ${x2.toFixed(2)} ${y2.toFixed(2)}`;
  }
  const areaPath = `${path} L ${points[points.length - 1][0].toFixed(2)} ${height} L ${points[0][0].toFixed(2)} ${height} Z`;

  const lastX = points[points.length - 1][0];
  const lastY = points[points.length - 1][1];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      width="100%"
      height="100%"
      style={{ display: 'block', overflow: 'visible' }}
    >
      <defs>
        <linearGradient id={`spark-fill-${gid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.32" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      <path d={areaPath} fill={`url(#spark-fill-${gid})`} />

      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="1"
        style={
          animate
            ? {
                strokeDasharray: 1,
                strokeDashoffset: 1,
                animation:
                  'seoSparkDraw 1.6s cubic-bezier(0.2, 0.7, 0.3, 1) 0.25s forwards',
              }
            : undefined
        }
      />

      {showEndDot && (
        <g
          className="fade-in fade-in-d4"
          style={{ transformOrigin: `${lastX}px ${lastY}px` }}
        >
          <circle cx={lastX} cy={lastY} r={6} fill={color} fillOpacity="0.25" />
          <circle cx={lastX} cy={lastY} r={3} fill={color} />
        </g>
      )}
    </svg>
  );
}
