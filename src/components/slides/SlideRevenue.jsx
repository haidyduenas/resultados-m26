import AnimatedNumber from '../shared/AnimatedNumber.jsx';
import GrowthBadge from '../shared/GrowthBadge.jsx';
import MetricCard from '../MetricCard.jsx';
import {
  formatNumber,
  formatUSD,
  formatPct,
  isNil,
} from '../../utils/formatters.js';

export default function SlideRevenue({ country, brand }) {
  const venta = brand.data?.venta_seo ?? {};
  const m25 = venta.M25 ?? {};
  const m26 = venta.M26 ?? {};
  const growth = venta.growth_pct ?? null;

  const subMetrics = [
    {
      label: 'Órdenes',
      value: formatNumber(m26.ordenes),
      sub: `M25: ${formatNumber(m25.ordenes)}`,
    },
    {
      label: 'Ticket promedio',
      value: formatUSD(m26.ticket_promedio),
      sub: `M25: ${formatUSD(m25.ticket_promedio)}`,
    },
    {
      label: 'Conversión',
      value: formatPct(m26.conversion_pct),
      sub: `M25: ${formatPct(m25.conversion_pct)}`,
    },
    {
      label: 'Add to Cart',
      value: formatPct(m26.add_to_cart_pct),
      sub: `M25: ${formatPct(m25.add_to_cart_pct)}`,
    },
  ];

  const showAssistedSalesNotice = country.code !== 'EC';

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '32px clamp(40px, 4vw, 64px)',
        width: '100%',
      }}
    >
      <div className="fade-in" style={chapterStyle}>
        Capítulo 4 · Revenue SEO
      </div>

      {showAssistedSalesNotice && (
        <div className="fade-in" style={assistedNoticeStyle}>
          <span aria-hidden="true">⚠</span>
          M26: venta asistida excluida del canal SEO
        </div>
      )}

      <h2 className="fade-in fade-in-d1" style={headlineStyle}>
        Generaste en ventas atribuidas a SEO
      </h2>

      <div className="fade-in fade-in-d2" style={heroRowStyle}>
        <div style={{ ...heroNumberStyle, color: brand.color }}>
          <AnimatedNumber
            value={m26.revenue_seo ?? null}
            format={formatUSD}
            duration={1800}
          />
        </div>
        <GrowthBadge value={growth} size="lg" label="vs M25" />
      </div>

      <p className="fade-in fade-in-d3" style={paragraphStyle}>
        durante <strong style={{ color: '#f4f4f5' }}>M26</strong>. Antes:{' '}
        <span style={{ color: '#f4f4f5' }}>{formatUSD(m25.revenue_seo)}</span>.
      </p>

      <div className="fade-in fade-in-d4" style={gridStyle}>
        {subMetrics.map((sm) => (
          <MetricCard
            key={sm.label}
            label={sm.label}
            value={sm.value}
            sub={sm.sub}
            accent="#f4f4f5"
          />
        ))}
      </div>

      <div className="fade-in fade-in-d5" style={shareRowStyle}>
        <ShareLine
          label="Participación en revenue digital"
          value={m26.participacion_digital_pct}
          color={brand.color}
          colorDim={brand.colorDim}
        />
        <ShareLine
          label="Participación en revenue total e-commerce"
          value={m26.participacion_total_pct}
          color={brand.color}
          colorDim={brand.colorDim}
        />
      </div>
    </div>
  );
}

function ShareLine({ label, value, color, colorDim }) {
  const pct = isNil(value) ? 0 : Math.max(0, Math.min(100, Number(value)));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: 12,
        }}
      >
        <span
          style={{
            fontSize: 13,
            color: '#d4d4d8',
            letterSpacing: '0.02em',
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 14,
            color: '#f4f4f5',
            fontWeight: 700,
          }}
        >
          {formatPct(value)}
        </span>
      </div>
      <div
        style={{
          height: 8,
          background: colorDim,
          borderRadius: 999,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: color,
            borderRadius: 999,
            transformOrigin: 'left center',
            transform: 'scaleX(0)',
            animation: 'seoBarGrow 1s cubic-bezier(0.2, 0.7, 0.3, 1) 0.6s forwards',
          }}
        />
      </div>
    </div>
  );
}

const chapterStyle = {
  fontFamily: "'Space Mono', monospace",
  fontSize: 12,
  letterSpacing: '0.3em',
  textTransform: 'uppercase',
  color: '#a1a1aa',
  marginBottom: 12,
};
const assistedNoticeStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '7px 14px',
  background: 'rgba(245,158,11,0.12)',
  border: '1px solid rgba(245,158,11,0.4)',
  borderRadius: 999,
  color: '#fbbf24',
  fontFamily: "'Space Mono', monospace",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.05em',
  marginBottom: 14,
  alignSelf: 'flex-start',
};
const headlineStyle = {
  fontFamily: "'Outfit', sans-serif",
  fontWeight: 700,
  fontSize: 'clamp(26px, 2.6vw, 36px)',
  margin: '0 0 20px',
  lineHeight: 1.15,
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
  margin: '0 0 28px',
};
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  gap: 14,
  marginBottom: 24,
};
const shareRowStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: 24,
};
