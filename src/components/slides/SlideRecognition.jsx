import { isNil, NA } from '../../utils/formatters.js';

export default function SlideRecognition({ country, brand }) {
  const recognition = brand.data?.recognition ?? null;
  const award = recognition?.award === true;
  const text = award ? recognition?.award_text : recognition?.generic_text;
  const hasContent = !isNil(text);

  const icon = hasContent ? (award ? '🏆' : '🚀') : '✨';

  const textStyle = {
    fontFamily: "'Outfit', sans-serif",
    fontWeight: 600,
    fontSize: 'clamp(20px, 2.4vw, 30px)',
    lineHeight: 1.4,
    margin: 0,
    letterSpacing: '-0.01em',
    ...(hasContent && award
      ? {
          background: `linear-gradient(135deg, #fbbf24 0%, ${brand.color} 50%, #f4f4f5 100%)`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }
      : {
          color: hasContent ? '#f4f4f5' : '#a1a1aa',
        }),
  };

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px clamp(40px, 4vw, 64px)',
        width: '100%',
        textAlign: 'center',
      }}
    >
      <div className="fade-in" style={chapterStyle}>
        Capítulo 12 · Reconocimiento
      </div>

      <h2 className="fade-in fade-in-d1" style={headlineStyle}>
        {award ? 'Lo que celebramos este año' : 'Nuestro próximo capítulo'}
      </h2>

      <div
        className="fade-in fade-in-d2"
        style={{
          maxWidth: 760,
          padding: '44px 40px',
          borderRadius: 24,
          border: `1px solid ${award ? '#fbbf24aa' : brand.color + '55'}`,
          background: award
            ? `radial-gradient(circle at 50% 0%, rgba(251,191,36,0.18) 0%, transparent 75%), ${brand.colorDim}`
            : `radial-gradient(circle at 50% 0%, ${brand.colorDim} 0%, transparent 80%)`,
          boxShadow: award
            ? '0 20px 60px -30px rgba(251,191,36,0.45)'
            : 'none',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            fontSize: 56,
            marginBottom: 22,
            lineHeight: 1,
          }}
        >
          {icon}
        </div>
        <p style={textStyle}>
          {hasContent
            ? text
            : `${NA} — sin reconocimiento registrado para esta marca todavía.`}
        </p>
      </div>

      <div
        className="fade-in fade-in-d3"
        style={{
          marginTop: 28,
          fontFamily: "'Space Mono', monospace",
          fontSize: 11,
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: '#a1a1aa',
        }}
      >
        SEO Wrapped · {brand.label} · M25 → M26 · Fin
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
