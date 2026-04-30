import BarChart from '../charts/BarChart.jsx';
import { formatNumber, formatDecimal, isNil } from '../../utils/formatters.js';

export default function SlideTopKeywords({ country, brand }) {
  const raw = brand.data?.top_20_keywords_no_marca ?? [];
  const items = raw
    .slice(0, 20)
    .map((kw) => ({
      label: kw.keyword,
      value: kw.clics,
      posicion: kw.posicion_promedio,
    }));

  const half = Math.ceil(items.length / 2);
  const left = items.slice(0, half);
  const right = items.slice(half);

  const maxValue = Math.max(
    1,
    ...items.map((it) => (isNil(it.value) ? 0 : Number(it.value)))
  );

  const formatValue = (v, item) => {
    const pos = isNil(item?.posicion) ? '—' : `pos ${formatDecimal(item.posicion, 1)}`;
    return `${formatNumber(v)} · ${pos}`;
  };

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
        Capítulo 7 · Top Keywords No Marca
      </div>
      <h2 className="fade-in fade-in-d1" style={headlineStyle}>
        Las búsquedas que te trajeron gente nueva
      </h2>
      <p className="fade-in fade-in-d2" style={paragraphStyle}>
        Top {items.length} keywords sin marca por clics orgánicos durante M26.
      </p>

      {items.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="fade-in fade-in-d3" style={gridStyle}>
          <BarChart
            items={left}
            color={brand.color}
            colorDim={brand.colorDim}
            maxValue={maxValue}
            formatValue={formatValue}
            labelWidth={200}
            rowHeight={32}
          />
          {right.length > 0 && (
            <BarChart
              items={right}
              color={brand.color}
              colorDim={brand.colorDim}
              maxValue={maxValue}
              formatValue={formatValue}
              labelWidth={200}
              rowHeight={32}
            />
          )}
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
      Sin keywords disponibles
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
  fontSize: 'clamp(26px, 2.6vw, 36px)',
  margin: '0 0 12px',
  lineHeight: 1.15,
  letterSpacing: '-0.02em',
  color: '#f4f4f5',
};
const paragraphStyle = {
  fontSize: 15,
  color: '#a1a1aa',
  margin: '0 0 24px',
};
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: 32,
};
