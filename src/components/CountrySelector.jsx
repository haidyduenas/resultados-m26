const FLAGS = {
  CR: '🇨🇷',
  EC: '🇪🇨',
  GT: '🇬🇹',
  HN: '🇭🇳',
  NC: '🇳🇮',
  SV: '🇸🇻',
};

export default function CountrySelector({ countries, onSelect }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '64px 24px',
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
          marginBottom: 18,
        }}
      >
        SEO Wrapped · M25 → M26
      </div>

      <h1
        className="fade-in fade-in-d1"
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(40px, 5.5vw, 72px)',
          margin: '0 0 20px',
          letterSpacing: '-0.03em',
          lineHeight: 1,
          background:
            'linear-gradient(180deg, #00ff87 0%, #f4f4f5 80%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        Tu año en SEO
      </h1>

      <p
        className="fade-in fade-in-d2"
        style={{
          fontSize: 17,
          color: '#a1a1aa',
          maxWidth: 540,
          margin: '0 auto 48px',
          lineHeight: 1.5,
        }}
      >
        Elige un país para empezar el recorrido.
      </p>

      <div
        className="fade-in fade-in-d3"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 16,
          width: '100%',
          maxWidth: 920,
        }}
      >
        {countries.map((c) => (
          <CountryCard key={c.code} country={c} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}

function CountryCard({ country, onSelect }) {
  const previewColor = country.brands[0]?.color ?? '#22c55e';
  return (
    <button
      onClick={() => onSelect(country.code)}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 18,
        padding: '24px 22px',
        cursor: 'pointer',
        color: '#f4f4f5',
        textAlign: 'left',
        transition: 'transform 0.2s ease, background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
        e.currentTarget.style.borderColor = previewColor + '66';
        e.currentTarget.style.boxShadow = `0 12px 32px -16px ${previewColor}55`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ fontSize: 36, marginBottom: 10 }}>
        {FLAGS[country.code] ?? '🌎'}
      </div>
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 11,
          letterSpacing: '0.25em',
          color: '#a1a1aa',
          textTransform: 'uppercase',
        }}
      >
        {country.code}
      </div>
      <div style={{ fontSize: 22, fontWeight: 600, marginTop: 4 }}>
        {country.nombre}
      </div>
      <div
        style={{
          fontSize: 12,
          color: '#71717a',
          marginTop: 12,
          fontFamily: "'Space Mono', monospace",
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: previewColor,
            display: 'inline-block',
          }}
        />
        {country.brands.length} {country.brands.length === 1 ? 'marca' : 'marcas'}
      </div>
    </button>
  );
}
