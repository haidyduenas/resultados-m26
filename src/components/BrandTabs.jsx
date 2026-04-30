export default function BrandTabs({
  country,
  activeBrandKey,
  onChangeBrand,
  onChangeCountry,
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '20px 32px 0',
        flexShrink: 0,
        flexWrap: 'wrap',
      }}
    >
      <button
        onClick={onChangeCountry}
        aria-label="Cambiar país"
        style={{
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.15)',
          color: '#d4d4d8',
          padding: '7px 14px',
          borderRadius: 8,
          cursor: 'pointer',
          fontFamily: "'Space Mono', monospace",
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          transition: 'border-color 0.2s ease, color 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
          e.currentTarget.style.color = '#f4f4f5';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
          e.currentTarget.style.color = '#d4d4d8';
        }}
      >
        ← {country.nombre}
      </button>
      <div
        style={{
          width: 1,
          height: 22,
          background: 'rgba(255,255,255,0.12)',
        }}
      />
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {country.brands.map((b) => {
          const active = b.key === activeBrandKey;
          return (
            <button
              key={b.key}
              onClick={() => onChangeBrand(b.key)}
              style={{
                background: active ? b.colorDim : 'transparent',
                border: `1px solid ${active ? b.color : 'rgba(255,255,255,0.15)'}`,
                color: active ? b.color : '#d4d4d8',
                padding: '8px 18px',
                borderRadius: 999,
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.02em',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.borderColor = b.color + '88';
                  e.currentTarget.style.color = '#f4f4f5';
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.color = '#d4d4d8';
                }
              }}
            >
              {b.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
