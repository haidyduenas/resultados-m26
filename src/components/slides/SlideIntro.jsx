const FLAGS = {
  CR: '🇨🇷',
  EC: '🇪🇨',
  GT: '🇬🇹',
  HN: '🇭🇳',
  NC: '🇳🇮',
  SV: '🇸🇻',
};

export default function SlideIntro({ country, brand }) {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 32px',
        textAlign: 'center',
      }}
    >
      <div
        className="fade-in"
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 12,
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: '#a1a1aa',
          marginBottom: 22,
        }}
      >
        SEO Wrapped · M25 → M26
      </div>

      <div
        className="fade-in fade-in-d1"
        style={{ fontSize: 64, marginBottom: 8 }}
        aria-hidden="true"
      >
        {FLAGS[country.code] ?? '🌎'}
      </div>

      <div
        className="fade-in fade-in-d1"
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 12,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#a1a1aa',
          marginBottom: 12,
        }}
      >
        {country.code} · {country.nombre}
      </div>

      <h1
        className="fade-in fade-in-d2"
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(56px, 7vw, 104px)',
          lineHeight: 0.95,
          margin: '0 0 24px',
          background: `linear-gradient(180deg, ${brand.color} 0%, #f4f4f5 88%)`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          letterSpacing: '-0.035em',
        }}
      >
        {brand.label}
      </h1>

      <p
        className="fade-in fade-in-d3"
        style={{
          fontSize: 18,
          color: '#d4d4d8',
          maxWidth: 560,
          lineHeight: 1.5,
          margin: '0 0 40px',
        }}
      >
        Un viaje por tu desempeño orgánico del último año.
      </p>

      <div
        className="fade-in fade-in-d4"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          color: brand.color,
          fontFamily: "'Space Mono', monospace",
          fontSize: 12,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}
      >
        Pulsa
        <span
          style={{
            padding: '6px 12px',
            border: `1px solid ${brand.color}`,
            borderRadius: 8,
            background: brand.colorDim,
            fontSize: 14,
          }}
        >
          →
        </span>
        para empezar
      </div>
    </div>
  );
}
