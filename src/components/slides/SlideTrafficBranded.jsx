import AnimatedNumber from '../shared/AnimatedNumber.jsx';
import { formatPct, isNil } from '../../utils/formatters.js';

export default function SlideTrafficBranded({ country, brand }) {
  const trafico = brand.data?.trafico ?? {};
  const noMarca = trafico.no_marca_pct ?? null;
  const marca = trafico.marca_pct ?? null;

  const noMarcaWidth = isNil(noMarca) ? 0 : Math.max(0, Math.min(100, Number(noMarca)));

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
        Capítulo 5 · Tráfico No Marca
      </div>

      <h2 className="fade-in fade-in-d1" style={headlineStyle}>
        De cada 100 visitas orgánicas
      </h2>

      <div className="fade-in fade-in-d2" style={heroRowStyle}>
        <div style={{ ...heroNumberStyle, color: brand.color }}>
          <AnimatedNumber
            value={noMarca}
            format={(v) => formatPct(v)}
            duration={1800}
          />
        </div>
        <span style={subtitleStyle}>llegaron por keywords genéricas</span>
      </div>

      <p className="fade-in fade-in-d3" style={paragraphStyle}>
        Conquistaste{' '}
        <span style={{ color: brand.color, fontWeight: 700 }}>
          {formatPct(noMarca)}
        </span>{' '}
        del tráfico con búsquedas que no incluyen tu marca. El restante{' '}
        <span style={{ color: '#f4f4f5', fontWeight: 700 }}>{formatPct(marca)}</span>{' '}
        ya te buscaba por nombre.
      </p>

      <div className="fade-in fade-in-d4" style={{ marginTop: 8 }}>
        <div
          style={{
            display: 'flex',
            height: 56,
            borderRadius: 12,
            overflow: 'hidden',
            background: 'rgba(255,255,255,0.06)',
            transformOrigin: 'left center',
            transform: 'scaleX(0)',
            animation: 'seoBarGrow 1.1s cubic-bezier(0.2, 0.7, 0.3, 1) 0.4s forwards',
          }}
        >
          <div
            style={{
              width: `${noMarcaWidth}%`,
              background: brand.color,
              transition: 'width 0.4s ease',
            }}
            aria-label="Tráfico no marca"
          />
          <div
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.18)',
            }}
            aria-label="Tráfico marca"
          />
        </div>

        <div style={legendStyle}>
          <LegendItem
            color={brand.color}
            label="No marca"
            value={formatPct(noMarca)}
          />
          <LegendItem
            color="rgba(255,255,255,0.45)"
            label="Marca"
            value={formatPct(marca)}
          />
        </div>
      </div>
    </div>
  );
}

function LegendItem({ color, label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: color,
          display: 'inline-block',
        }}
      />
      <span style={{ color: '#d4d4d8', fontSize: 14 }}>{label}</span>
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 14,
          color: '#f4f4f5',
          fontWeight: 700,
        }}
      >
        {value}
      </span>
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
const subtitleStyle = {
  fontSize: 17,
  color: '#d4d4d8',
  fontWeight: 500,
};
const paragraphStyle = {
  fontSize: 17,
  color: '#d4d4d8',
  maxWidth: 760,
  lineHeight: 1.5,
  margin: '0 0 36px',
};
const legendStyle = {
  display: 'flex',
  gap: 28,
  marginTop: 18,
  flexWrap: 'wrap',
};
