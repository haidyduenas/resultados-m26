import { useRef } from 'react';
import { useSlideState } from '../hooks/useSlideState.js';
import SlideIntro from './slides/SlideIntro.jsx';
import SlideImpressions from './slides/SlideImpressions.jsx';
import SlideClicks from './slides/SlideClicks.jsx';
import SlideVisits from './slides/SlideVisits.jsx';
import SlideRevenue from './slides/SlideRevenue.jsx';
import SlideTrafficBranded from './slides/SlideTrafficBranded.jsx';
import SlideTechHealth from './slides/SlideTechHealth.jsx';
import SlideTopKeywords from './slides/SlideTopKeywords.jsx';
import SlideTopCategories from './slides/SlideTopCategories.jsx';
import SlideTopProducts from './slides/SlideTopProducts.jsx';
import SlideSummary from './slides/SlideSummary.jsx';
import SlideStrategicMessage from './slides/SlideStrategicMessage.jsx';
import SlideRecognition from './slides/SlideRecognition.jsx';

const SLIDE_REGISTRY = [
  { id: 'intro', title: 'Intro', Component: SlideIntro },
  { id: 'impresiones', title: 'Impresiones', Component: SlideImpressions },
  { id: 'clics', title: 'Clics', Component: SlideClicks },
  { id: 'visitas', title: 'Visitas', Component: SlideVisits },
  { id: 'revenue', title: 'Revenue SEO', Component: SlideRevenue },
  { id: 'trafico', title: 'Tráfico No Marca', Component: SlideTrafficBranded },
  { id: 'salud', title: 'Salud Técnica', Component: SlideTechHealth },
  { id: 'keywords', title: 'Top Keywords', Component: SlideTopKeywords },
  { id: 'categorias', title: 'Top Categorías', Component: SlideTopCategories },
  { id: 'productos', title: 'Top Productos', Component: SlideTopProducts },
  { id: 'resumen', title: 'Resumen', Component: SlideSummary },
  { id: 'mensaje', title: 'Mensaje Estratégico', Component: SlideStrategicMessage },
  { id: 'reconocimiento', title: 'Reconocimiento', Component: SlideRecognition },
];

export default function SlideCarousel({ country, brand }) {
  const slides = SLIDE_REGISTRY;
  const { index, next, prev, goTo, total } = useSlideState(slides.length);
  const Active = slides[index].Component;

  const startX = useRef(null);
  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 60) {
      if (dx < 0) next();
      else prev();
    }
    startX.current = null;
  };

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{
        flex: 1,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
      }}
    >
      <ProgressTrack
        slides={slides}
        index={index}
        color={brand.color}
        onJump={goTo}
      />

      <div
        style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          minHeight: 0,
        }}
      >
        <div
          key={`${country.code}-${brand.key}-${slides[index].id}`}
          className="fade-in"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Active country={country} brand={brand} />
        </div>
      </div>

      <ArrowButton
        dir="prev"
        onClick={prev}
        disabled={index === 0}
        color={brand.color}
      />
      <ArrowButton
        dir="next"
        onClick={next}
        disabled={index === total - 1}
        color={brand.color}
      />
    </div>
  );
}

function ProgressTrack({ slides, index, color, onJump }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 6,
        padding: '14px 32px 0',
        flexShrink: 0,
      }}
    >
      {slides.map((s, i) => {
        const filled = i <= index;
        return (
          <button
            key={s.id}
            onClick={() => onJump(i)}
            aria-label={`Ir al slide ${i + 1}: ${s.title}`}
            title={s.title}
            style={{
              flex: 1,
              height: 3,
              padding: 0,
              background: 'rgba(255,255,255,0.12)',
              border: 'none',
              borderRadius: 2,
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <span
              style={{
                display: 'block',
                width: filled ? '100%' : '0%',
                height: '100%',
                background: color,
                transition: 'width 0.45s cubic-bezier(0.2, 0.7, 0.3, 1)',
              }}
            />
          </button>
        );
      })}
    </div>
  );
}

function ArrowButton({ dir, onClick, disabled, color }) {
  const isPrev = dir === 'prev';
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={isPrev ? 'Slide anterior' : 'Slide siguiente'}
      style={{
        position: 'absolute',
        [isPrev ? 'left' : 'right']: 18,
        top: '50%',
        transform: 'translateY(-50%)',
        width: 46,
        height: 46,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.12)',
        color: '#f4f4f5',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.25 : 1,
        fontSize: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5,
        transition: 'background 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = color + '22';
        e.currentTarget.style.borderColor = color;
        e.currentTarget.style.transform = `translateY(-50%) scale(1.05)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
        e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
      }}
    >
      {isPrev ? '←' : '→'}
    </button>
  );
}
