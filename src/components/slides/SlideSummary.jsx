import GrowthBadge from '../shared/GrowthBadge.jsx';
import {
  formatNumber,
  formatUSD,
  formatPct,
  formatDecimal,
  isNil,
  NA,
} from '../../utils/formatters.js';

export default function SlideSummary({ country, brand }) {
  const data = brand.data ?? {};
  const impr = data.impresiones ?? {};
  const clics = data.clics ?? {};
  const visitas = data.visitas ?? {};
  const venta25 = data.venta_seo?.M25 ?? {};
  const venta26 = data.venta_seo?.M26 ?? {};
  const ventaGrowth = data.venta_seo?.growth_pct ?? null;
  const trafico = data.trafico ?? {};
  const salud = data.salud_tecnica ?? {};
  const idx = salud.indexacion ?? {};

  const indexedRatio =
    !isNil(idx.total) && !isNil(idx.no_indexadas) && Number(idx.total) > 0
      ? ((Number(idx.total) - Number(idx.no_indexadas)) / Number(idx.total)) * 100
      : null;

  const cards = [
    {
      label: 'Impresiones · M26',
      value: formatNumber(impr.M26),
      growth: impr.growth_pct,
      tone: brand.color,
    },
    {
      label: 'Clics · M26',
      value: formatNumber(clics.M26),
      growth: clics.growth_pct,
      tone: brand.color,
    },
    {
      label: 'Visitas · M26',
      value: formatNumber(visitas.M26),
      growth: visitas.growth_pct,
      tone: brand.color,
    },
    {
      label: 'Revenue SEO · M26',
      value: formatUSD(venta26.revenue_seo),
      growth: ventaGrowth,
      tone: brand.color,
    },
    {
      label: 'Tráfico no marca',
      value: formatPct(trafico.no_marca_pct),
      sub: `Marca: ${formatPct(trafico.marca_pct)}`,
      tone: '#f4f4f5',
    },
    {
      label: 'Posición ponderada',
      value: isNil(salud.posicion_ponderada_M26)
        ? NA
        : `#${formatDecimal(salud.posicion_ponderada_M26, 1)}`,
      sub: `Indexación: ${
        isNil(indexedRatio) ? NA : formatPct(indexedRatio)
      }`,
      tone: '#f4f4f5',
    },
  ];

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
        Capítulo 10 · Resumen
      </div>
      <h2 className="fade-in fade-in-d1" style={headlineStyle}>
        Tu año en seis cifras
      </h2>

      <div className="fade-in fade-in-d2" style={gridStyle}>
        {cards.map((c, i) => (
          <SummaryCard key={c.label} card={c} index={i} />
        ))}
      </div>
    </div>
  );
}

function SummaryCard({ card, index }) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 16,
        padding: '22px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        animationDelay: `${0.05 * index}s`,
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
        {card.label}
      </div>
      <div
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 800,
          fontSize: 32,
          color: card.tone,
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
        }}
      >
        {card.value}
      </div>
      {card.growth !== undefined ? (
        <GrowthBadge value={card.growth} size="sm" label="vs M25" />
      ) : (
        card.sub && (
          <div style={{ fontSize: 13, color: '#a1a1aa', lineHeight: 1.4 }}>
            {card.sub}
          </div>
        )
      )}
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
const headlineStyle = {
  fontFamily: "'Outfit', sans-serif",
  fontWeight: 700,
  fontSize: 'clamp(28px, 3vw, 40px)',
  margin: '0 0 28px',
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
  color: '#f4f4f5',
};
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: 16,
};
