import BarChart from '../charts/BarChart.jsx';
import { formatUSD } from '../../utils/formatters.js';

export default function SlideTopProducts({ country, brand }) {
  const raw = brand.data?.top_10_productos_revenue ?? [];
  const items = raw.slice(0, 10).map((p) => ({
    label: p.producto || '—',
    value: p.revenue,
  }));

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
        Capítulo 9 · Top Productos
      </div>
      <h2 className="fade-in fade-in-d1" style={headlineStyle}>
        Los productos estrella del año
      </h2>
      <p className="fade-in fade-in-d2" style={paragraphStyle}>
        Top {items.length} productos por revenue atribuido a SEO durante M26.
      </p>

      {items.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="fade-in fade-in-d3">
          <BarChart
            items={items}
            color={brand.color}
            colorDim={brand.colorDim}
            formatValue={(v) => formatUSD(v)}
            labelWidth={380}
            rowHeight={36}
          />
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div
      style={{
        marginTop: 24,
        padding: '40px',
        textAlign: 'center',
        color: '#71717a',
        fontFamily: "'Space Mono', monospace",
        fontSize: 13,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        border: '1px dashed rgba(255,255,255,0.12)',
        borderRadius: 16,
      }}
    >
      Sin productos disponibles
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
  margin: '0 0 12px',
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
  color: '#f4f4f5',
};
const paragraphStyle = {
  fontSize: 15,
  color: '#a1a1aa',
  margin: '0 0 24px',
};
