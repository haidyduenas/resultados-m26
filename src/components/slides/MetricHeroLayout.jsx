import AnimatedNumber from '../shared/AnimatedNumber.jsx';
import GrowthBadge from '../shared/GrowthBadge.jsx';
import Sparkline from '../charts/Sparkline.jsx';
import MetricCard from '../MetricCard.jsx';
import { buildTrendline } from '../../utils/trendlineCalculator.js';
import { buildMonthlyLabels } from '../../utils/monthlySeriesBuilder.js';
import { formatNumber, isNil, NA } from '../../utils/formatters.js';

/**
 * Shared layout for single-metric slides (Impresiones, Clics, Visitas).
 * Renders chapter label, headline, hero number with growth badge, narrative
 * sentence, sparkline trend card, and an M25 reference card.
 */
export default function MetricHeroLayout({
  chapter,
  headline,
  m25,
  m26,
  growth,
  unit = '',
  brand,
  country,
  seed,
  format = formatNumber,
  m25Description,
}) {
  const series = buildTrendline({
    start: m25,
    end: m26,
    points: 12,
    seed: `${country.code}-${brand.key}-${seed}`,
  });
  const labels = buildMonthlyLabels();

  const delta = !isNil(m25) && !isNil(m26) ? Number(m26) - Number(m25) : null;
  const deltaSentence = isNil(delta)
    ? NA
    : delta >= 0
    ? `${format(delta)} más`
    : `${format(Math.abs(delta))} menos`;

  return (
    <div style={slideStyle}>
      <div className="fade-in" style={chapterStyle}>
        {chapter}
      </div>

      <h2 className="fade-in fade-in-d1" style={headlineStyle}>
        {headline}
      </h2>

      <div className="fade-in fade-in-d2" style={heroRowStyle}>
        <div style={{ ...heroNumberStyle, color: brand.color }}>
          <AnimatedNumber value={m26} format={format} duration={1800} />
        </div>
        <GrowthBadge value={growth} size="lg" label="vs M25" />
      </div>

      <p className="fade-in fade-in-d3" style={paragraphStyle}>
        {unit ? `${unit} ` : ''}durante{' '}
        <strong style={{ color: '#f4f4f5' }}>M26</strong> —{' '}
        <span style={{ color: brand.color }}>{deltaSentence}</span> que M25.
      </p>

      <div className="fade-in fade-in-d4" style={gridStyle}>
        <div
          style={{
            background: brand.colorDim,
            border: `1px solid ${brand.color}33`,
            borderRadius: 16,
            padding: '20px 22px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            minHeight: 200,
          }}
        >
          <div style={trendHeaderStyle}>
            <div style={mutedLabelStyle}>
              Tendencia · {labels[0]} → {labels[labels.length - 1]}
            </div>
            <div style={endpointsStyle}>
              {format(m25)} → {format(m26)}
            </div>
          </div>
          <div style={{ flex: 1, minHeight: 140 }}>
            <Sparkline values={series} color={brand.color} height={140} />
          </div>
        </div>

        <MetricCard
          label="M25 · referencia"
          value={format(m25)}
          accent="#f4f4f5"
          sub={
            isNil(m25)
              ? 'Sin dato disponible para el período anterior.'
              : m25Description ??
                'Valor del período anterior, contra el que comparamos M26.'
          }
        />
      </div>
    </div>
  );
}

const slideStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '32px clamp(40px, 4vw, 64px)',
  width: '100%',
};
const chapterStyle = {
  fontFamily: "'Space Mono', monospace",
  fontSize: 12,
  letterSpacing: '0.3em',
  textTransform: 'uppercase',
  color: '#a1a1aa',
  marginBottom: 12,
};
const headlineStyle = {
  fontFamily: "'Outfit', sans-serif",
  fontWeight: 700,
  fontSize: 'clamp(28px, 3vw, 40px)',
  margin: '0 0 24px',
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
  color: '#f4f4f5',
};
const heroRowStyle = {
  display: 'flex',
  alignItems: 'baseline',
  gap: 20,
  flexWrap: 'wrap',
  marginBottom: 12,
};
const heroNumberStyle = {
  fontFamily: "'Outfit', sans-serif",
  fontWeight: 800,
  fontSize: 'clamp(56px, 6.4vw, 88px)',
  lineHeight: 1,
  letterSpacing: '-0.035em',
};
const paragraphStyle = {
  fontSize: 17,
  color: '#d4d4d8',
  maxWidth: 720,
  lineHeight: 1.5,
  margin: '0 0 32px',
};
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.7fr) minmax(0, 1fr)',
  gap: 20,
  alignItems: 'stretch',
};
const trendHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 12,
  flexWrap: 'wrap',
};
const mutedLabelStyle = {
  fontFamily: "'Space Mono', monospace",
  fontSize: 11,
  letterSpacing: '0.25em',
  textTransform: 'uppercase',
  color: '#a1a1aa',
};
const endpointsStyle = {
  fontFamily: "'Space Mono', monospace",
  fontSize: 12,
  color: '#d4d4d8',
};
