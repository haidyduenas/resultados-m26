import {
  scoreLCP,
  scoreINP,
  scoreCLS,
  STATUS_LABEL,
  CWV_THRESHOLDS,
} from '../../utils/cwvScoring.js';
import {
  formatNumber,
  formatPct,
  formatDecimal,
  isNil,
  NA,
} from '../../utils/formatters.js';

export default function SlideTechHealth({ country, brand }) {
  const salud = brand.data?.salud_tecnica ?? {};
  const cwv = salud.core_web_vitals ?? {};
  const idx = salud.indexacion ?? {};
  const posicion = salud.posicion_ponderada_M26 ?? null;

  const lcp = scoreLCP(cwv.LCP);
  const inp = scoreINP(cwv.INP);
  const cls = scoreCLS(cwv.CLS);

  const total = idx.total ?? null;
  const noIdx = idx.no_indexadas ?? null;
  const indexadas =
    !isNil(total) && !isNil(noIdx) ? Number(total) - Number(noIdx) : null;
  const ratio =
    !isNil(indexadas) && !isNil(total) && Number(total) > 0
      ? (Number(indexadas) / Number(total)) * 100
      : null;

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
        Capítulo 6 · Salud Técnica
      </div>

      <h2 className="fade-in fade-in-d1" style={headlineStyle}>
        Tu sitio bajo el microscopio
      </h2>

      <div className="fade-in fade-in-d2" style={subSectionLabelStyle}>
        Core Web Vitals · M26
      </div>

      <div className="fade-in fade-in-d2" style={cwvGridStyle}>
        <CWVCard
          code="LCP"
          name="Velocidad de carga"
          desc="tiempo en mostrar el contenido principal"
          raw={cwv.LCP}
          score={lcp}
          thresholds={CWV_THRESHOLDS.LCP}
        />
        <CWVCard
          code="INP"
          name="Tiempo de respuesta"
          desc="qué tan rápido reacciona la página al hacer clic"
          raw={cwv.INP}
          score={inp}
          thresholds={CWV_THRESHOLDS.INP}
        />
        <CWVCard
          code="CLS"
          name="Estabilidad visual"
          desc="qué tanto se mueven los elementos al cargar"
          raw={cwv.CLS}
          score={cls}
          thresholds={CWV_THRESHOLDS.CLS}
        />
      </div>

      <div
        className="fade-in fade-in-d4"
        style={{ ...subSectionLabelStyle, marginTop: 28 }}
      >
        Indexación y posicionamiento
      </div>

      <div className="fade-in fade-in-d4" style={bottomGridStyle}>
        <div style={cardStyle}>
          <div style={mutedLabelStyle}>Indexación</div>
          <div style={cardValueStyle}>
            {isNil(ratio) ? NA : formatPct(ratio)}
          </div>
          <div style={cardSubStyle}>
            {formatNumber(indexadas)} de {formatNumber(total)} URLs indexadas ·{' '}
            {formatNumber(noIdx)} no indexadas
          </div>
        </div>

        <div style={cardStyle}>
          <div style={mutedLabelStyle}>Posición ponderada · M26</div>
          <div style={{ ...cardValueStyle, color: brand.color }}>
            {isNil(posicion) ? NA : formatDecimal(posicion, 1)}
          </div>
          <div style={cardSubStyle}>
            Promedio de posiciones SERP ponderado por clics.
          </div>
        </div>
      </div>
    </div>
  );
}

function CWVCard({ code, name, desc, raw, score, thresholds }) {
  const isUnknown = score.status === 'unknown';
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${score.color}55`,
        borderRadius: 16,
        padding: '20px 22px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 10,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 15,
              fontWeight: 700,
              color: '#f4f4f5',
              letterSpacing: '-0.005em',
              lineHeight: 1.2,
            }}
          >
            {name}{' '}
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 11,
                color: '#a1a1aa',
                fontWeight: 400,
                letterSpacing: '0.05em',
              }}
            >
              ({code})
            </span>
          </div>
          <div
            style={{
              fontSize: 11,
              color: '#a1a1aa',
              marginTop: 4,
              lineHeight: 1.4,
            }}
          >
            {desc}
          </div>
        </div>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 10px',
            borderRadius: 999,
            background: score.color + '22',
            color: score.color,
            fontFamily: "'Space Mono', monospace",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.05em',
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 8 }}>●</span>
          {STATUS_LABEL[score.status]}
        </span>
      </div>

      <div
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 800,
          fontSize: 44,
          color: isUnknown ? '#71717a' : score.color,
          lineHeight: 1,
          letterSpacing: '-0.02em',
          marginTop: 6,
        }}
      >
        {isNil(raw) ? NA : raw}
      </div>

      <div
        style={{
          display: 'flex',
          gap: 12,
          fontFamily: "'Space Mono', monospace",
          fontSize: 11,
          color: '#a1a1aa',
          marginTop: 6,
        }}
      >
        <span>
          <span style={{ color: '#22c55e' }}>●</span> {thresholds.good}
        </span>
        <span>
          <span style={{ color: '#f59e0b' }}>●</span> {thresholds.ni}
        </span>
        <span>
          <span style={{ color: '#ef4444' }}>●</span> {thresholds.poor}
        </span>
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
const subSectionLabelStyle = {
  fontFamily: "'Space Mono', monospace",
  fontSize: 11,
  letterSpacing: '0.3em',
  textTransform: 'uppercase',
  color: '#a1a1aa',
  marginBottom: 12,
};
const cwvGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: 16,
};
const bottomGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: 16,
};
const cardStyle = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 16,
  padding: '20px 22px',
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
};
const mutedLabelStyle = {
  fontFamily: "'Space Mono', monospace",
  fontSize: 11,
  letterSpacing: '0.25em',
  textTransform: 'uppercase',
  color: '#a1a1aa',
};
const cardValueStyle = {
  fontFamily: "'Outfit', sans-serif",
  fontWeight: 800,
  fontSize: 40,
  color: '#f4f4f5',
  lineHeight: 1,
  letterSpacing: '-0.02em',
};
const cardSubStyle = {
  fontSize: 13,
  color: '#a1a1aa',
  lineHeight: 1.4,
};
