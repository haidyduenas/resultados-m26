import { isNil, NA } from '../../utils/formatters.js';

export default function SlideStrategicMessage({ country, brand }) {
  const text = brand.data?.suggestion;
  const hasContent = !isNil(text);

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
        Capítulo 11 · Mensaje Estratégico
      </div>

      <h2 className="fade-in fade-in-d1" style={headlineStyle}>
        Tu próximo paso
      </h2>

      <div
        className="fade-in fade-in-d2"
        style={{
          position: 'relative',
          background: brand.colorDim,
          border: `1px solid ${brand.color}33`,
          borderRadius: 20,
          padding: '36px 40px 36px 56px',
          maxWidth: 920,
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 12,
            left: 18,
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: 88,
            lineHeight: 0.7,
            color: brand.color,
            opacity: 0.45,
          }}
        >
          “
        </span>

        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 500,
            fontSize: 'clamp(20px, 2.2vw, 28px)',
            lineHeight: 1.45,
            color: '#f4f4f5',
            margin: 0,
            letterSpacing: '-0.005em',
          }}
        >
          {hasContent ? text : NA}
        </p>
      </div>

      <div
        className="fade-in fade-in-d3"
        style={{
          marginTop: 24,
          fontFamily: "'Space Mono', monospace",
          fontSize: 11,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#a1a1aa',
        }}
      >
        Recomendación generada para {brand.label} · {country.nombre}
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
const headlineStyle = {
  fontFamily: "'Outfit', sans-serif",
  fontWeight: 700,
  fontSize: 'clamp(28px, 3vw, 40px)',
  margin: '0 0 28px',
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
  color: '#f4f4f5',
};
