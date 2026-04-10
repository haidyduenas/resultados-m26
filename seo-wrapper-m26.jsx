import { useState, useEffect, useRef } from "react";

const COUNTRY = "Costa Rica";
const BRAND = "Gollo";
const TEAM = "Team Gollo";
const YEAR = "M26";
const FLAG = "CR";

// Recognition config — set hasAward=false for generic encouraging message
const RECOGNITION = {
  hasAward: true,
  awardText: "Gollo es el país con mayor venta orgánica de toda la región en M26.",
  // Generic fallback when hasAward = false:
  genericText: "Cada keyword conquistada es un paso más. El equipo tiene todo para hacer de M27 el mejor año de SEO en la historia de {BRAND}.",
};

// ─── TOOLTIPS DICTIONARY ───
const TIPS = {
  impressions: "Cantidad de veces que una página de tu sitio apareció en los resultados de búsqueda de Google.",
  clicks: "Número de veces que un usuario hizo clic en tu resultado de búsqueda en Google.",
  ctr: "Click-Through Rate: porcentaje de impresiones que se convirtieron en clics. Fórmula: clics ÷ impresiones × 100.",
  organicRevenue: "Ingresos generados por usuarios que llegaron al sitio a través de búsqueda orgánica (no pagada) en Google.",
  convRate: "Porcentaje de visitas orgánicas que terminaron en una compra.",
  digitalShare: "Participación de la venta SEO dentro de la venta digital total (Paid + Orgánico).",
  totalShare: "Participación de la venta SEO dentro de la venta total del país (Paid + Orgánico + Venta Asistida).",
  assistedNote: "En M26 se separó la venta asistida del canal SEO. La venta asistida ahora se reporta por separado.",
  nonBrand: "Tráfico de usuarios que NO buscaron el nombre de tu marca. Indica conquista de mercado real.",
  brand: "Tráfico de usuarios que buscaron directamente el nombre de tu marca.",
  kwTop10: "Keywords que entraron a las primeras 10 posiciones de Google durante el periodo.",
  cwv: "Core Web Vitals: métricas de experiencia de usuario que Google usa como factor de ranking.",
  lcp: "Largest Contentful Paint: tiempo que tarda en cargar el elemento más grande visible. Ideal: ≤ 2.5s.",
  cls: "Cumulative Layout Shift: mide cuánto se mueve el contenido mientras carga. Ideal: ≤ 0.1.",
  inp: "Interaction to Next Paint: mide la respuesta a interacciones del usuario. Ideal: ≤ 200ms.",
  indexation: "Porcentaje de páginas de tu sitio que Google ha incluido en su índice de búsqueda.",
  weightedPos: "Posición promedio en Google ponderada por el volumen de búsqueda de cada keyword. Menor = mejor.",
  sov: "Share of Voice: porcentaje de la visibilidad orgánica total de tu vertical que pertenece a tu sitio.",
  position: "Posición promedio en la que aparece tu resultado en Google para esa keyword.",
  conversions: "Número de compras completadas atribuidas a ese producto vía tráfico orgánico.",
  heatmap: "Intensidad relativa de búsqueda por mes (0-100). Permite identificar estacionalidad.",
};

const DATA = {
  impressions: { total: 32_480_000, growth: 28.6 },
  clicks: { total: 2_210_000, growth: 35.2 },
  visits: { total: 1_940_000, growth: 24.1 },
  sales: { total: 94_200, growth: -18.4 },
  ctr: 6.81,
  // Two participation types
  participation: {
    digital: { seo: 38.2, label: "Venta Digital" },
    total: { seo: 11.3, label: "Venta Total" },
  },
  revenue: { total: 4_850_000, currency: "USD", growth: -12.7 },
  conversionRate: { organic: 4.86, paidSearch: 3.41, direct: 5.10 },
  brandVsNonBrand: { brand: 28, nonBrand: 72 },
  indexation: { total: 35_600, indexed: 24_800 },
  coreWebVitals: { lcp: 2.4, cls: 0.12, inp: 185 },
  weightedPosition: { current: 9.1, previous: 12.6 },
  shareOfVoice: { competitors: [
    { name: "Gollo", sov: 15.2, own: true },
    { name: "Competidor A", sov: 24.8 },
    { name: "Competidor B", sov: 18.1 },
    { name: "Competidor C", sov: 10.5 },
    { name: "Otros", sov: 31.4 },
  ]},
  newKeywordsTop10: { count: 1_264, growth: 48.3 },
  topKeywords: [
    { keyword: "tienda de electrodomésticos", clicks: 62_400, position: 2.3 },
    { keyword: "refrigeradoras en oferta", clicks: 51_200, position: 1.9 },
    { keyword: "televisores smart tv", clicks: 45_800, position: 2.8 },
    { keyword: "lavadoras baratas", clicks: 38_600, position: 3.1 },
    { keyword: "cocinas de gas", clicks: 34_100, position: 1.6 },
    { keyword: "aires acondicionados", clicks: 30_800, position: 4.2 },
    { keyword: "celulares samsung", clicks: 28_400, position: 3.5 },
    { keyword: "microondas precio", clicks: 25_100, position: 2.1 },
    { keyword: "laptops baratas", clicks: 22_800, position: 5.1 },
    { keyword: "ofertas electrodomésticos", clicks: 20_600, position: 2.7 },
    { keyword: "licuadoras industriales", clicks: 18_200, position: 3.9 },
    { keyword: "hornos eléctricos", clicks: 16_800, position: 2.4 },
    { keyword: "tablets samsung", clicks: 15_100, position: 4.8 },
    { keyword: "secadoras de ropa", clicks: 13_600, position: 3.2 },
    { keyword: "parlantes bluetooth", clicks: 12_200, position: 5.6 },
  ],
  topCategories: [
    { name: "Línea Blanca", pct: 28.4 },
    { name: "Electrónica", pct: 22.1 },
    { name: "Tecnología", pct: 16.8 },
    { name: "Climatización", pct: 10.2 },
    { name: "Pequeños Electro", pct: 8.5 },
    { name: "Audio", pct: 5.1 },
    { name: "Cocina", pct: 3.8 },
    { name: "Hogar", pct: 2.6 },
    { name: "Gaming", pct: 1.5 },
    { name: "Accesorios", pct: 1.0 },
  ],
  topProducts: [
    { name: "Refrigeradora Samsung 14ft", conv: 3_120 },
    { name: "Smart TV LG 55\" 4K", conv: 2_840 },
    { name: "Lavadora Whirlpool 38lb", conv: 2_510 },
    { name: "Aire Acond. Carrier 12K BTU", conv: 2_180 },
    { name: "Cocina Mabe 6 quemadores", conv: 1_920 },
    { name: "Samsung Galaxy A15", conv: 1_680 },
    { name: "Laptop HP 15\" i5", conv: 1_440 },
    { name: "Microondas Panasonic 1.3ft", conv: 1_210 },
    { name: "Horno Eléctrico Oster 42L", conv: 980 },
    { name: "Parlante JBL Flip 6", conv: 860 },
  ],
  heatmapKeywords: [
    { keyword: "refrigeradoras en oferta", vals: [65,60,72,78,85,80,62,75,88,92,95,100] },
    { keyword: "televisores smart tv", vals: [70,68,62,58,55,52,48,65,72,80,90,98] },
    { keyword: "lavadoras baratas", vals: [55,58,65,70,75,68,60,72,80,85,78,62] },
    { keyword: "aires acondicionados", vals: [40,45,55,65,80,92,98,85,70,55,42,38] },
    { keyword: "celulares samsung", vals: [72,68,65,60,58,55,52,68,75,82,88,95] },
  ],
  monthly: [
    { m:"Jul", imp:2400, cli:155 },
    { m:"Ago", imp:2650, cli:172 },
    { m:"Sep", imp:2800, cli:188 },
    { m:"Oct", imp:3100, cli:210 },
    { m:"Nov", imp:3400, cli:238 },
    { m:"Dic", imp:3650, cli:252 },
    { m:"Ene", imp:2500, cli:168 },
    { m:"Feb", imp:2600, cli:175 },
    { m:"Mar", imp:2900, cli:195 },
    { m:"Abr", imp:3000, cli:205 },
    { m:"May", imp:3200, cli:218 },
    { m:"Jun", imp:2580, cli:174 },
  ],
};

const fmt = (n) => { if(n>=1e6) return (n/1e6).toFixed(1)+"M"; if(n>=1e3) return (n/1e3).toFixed(1)+"K"; return n.toLocaleString("en-US"); };
const fmtUSD = (n) => "$" + fmt(n) + " USD";
const MONTHS = ["Jul","Ago","Sep","Oct","Nov","Dic","Ene","Feb","Mar","Abr","May","Jun"];

/* ═══ TOOLTIP COMPONENT ═══ */
function Tip({ id, children }) {
  const [show, setShow] = useState(false);
  const text = TIPS[id];
  if (!text) return children;
  return (
    <span style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 3 }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}
      onClick={() => setShow(!show)}>
      {children}
      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 14, height: 14, borderRadius: 7, background: "rgba(255,255,255,0.1)", fontSize: 8, color: "rgba(255,255,255,0.5)", cursor: "help", flexShrink: 0, fontWeight: 700 }}>?</span>
      {show && (
        <span style={{ position: "absolute", bottom: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)", background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, padding: "8px 12px", fontSize: 10, color: "rgba(255,255,255,0.85)", width: 220, lineHeight: 1.5, zIndex: 100, textAlign: "left", boxShadow: "0 8px 24px rgba(0,0,0,0.5)", pointerEvents: "none" }}>
          {text}
          <span style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "6px solid #1a1a2e" }} />
        </span>
      )}
    </span>
  );
}

/* ═══ ANIMATED NUMBER ═══ */
function AN({ value, duration = 1600 }) {
  const [d, setD] = useState(0);
  const r = useRef();
  useEffect(() => {
    let s = null;
    const step = (t) => { if (!s) s = t; const p = Math.min((t - s) / duration, 1); setD((1 - Math.pow(1 - p, 3)) * value); if (p < 1) r.current = requestAnimationFrame(step); };
    r.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(r.current);
  }, [value, duration]);
  return <span>{value >= 1000 ? fmt(Math.round(d)) : d.toFixed(1)}</span>;
}

function hc(v) { return v >= 90 ? "#00ff87" : v >= 75 ? "#1db954" : v >= 60 ? "#1a8f42" : v >= 45 ? "#166b34" : v >= 30 ? "#124a26" : "#0e2f1a"; }

const TOTAL = 13;

export default function App() {
  const [s, setS] = useState(0);
  const [k, setK] = useState(0);
  const go = (i) => { setS(i); setK(x => x + 1); };
  const next = () => s < TOTAL - 1 && go(s + 1);
  const prev = () => s > 0 && go(s - 1);

  useEffect(() => {
    const h = (e) => { if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); next(); } if (e.key === "ArrowLeft") prev(); };
    window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
  });

  const tr = useRef(null);

  const slides = [
    <Intro />, <SImp k={k} />, <SCli k={k} />, <SRev k={k} />, <SBrand k={k} />,
    <STech k={k} />, <SSov k={k} />, <SKw k={k} />, <SCat k={k} />, <SProd k={k} />,
    <SHeat k={k} />, <SFinal k={k} />, <SRecog k={k} />,
  ];

  return (
    <div style={R.root}
      onTouchStart={e => { tr.current = e.touches[0].clientX }}
      onTouchEnd={e => { if (tr.current === null) return; const d = tr.current - e.changedTouches[0].clientX; if (Math.abs(d) > 50) d > 0 ? next() : prev(); tr.current = null; }}>
      <style>{CSS}</style>
      <div style={R.prog}>
        {Array.from({ length: TOTAL }).map((_, i) => (
          <div key={i} onClick={() => go(i)} style={{ height: 3, borderRadius: 3, transition: "all .4s", cursor: "pointer", background: i <= s ? "#00ff87" : "rgba(255,255,255,0.1)", flex: i === s ? 2.5 : 1 }} />
        ))}
      </div>
      <div style={R.wrap} key={k}>{slides[s]}</div>
      <div style={R.nav}>
        <button style={{ ...R.btn, opacity: s === 0 ? .3 : 1 }} onClick={prev} disabled={s === 0}>‹ Anterior</button>
        <span style={R.cnt}>{s + 1}/{TOTAL}</span>
        <button style={{ ...R.btn, opacity: s === TOTAL - 1 ? .3 : 1 }} onClick={next} disabled={s === TOTAL - 1}>Siguiente ›</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   SLIDES
   ═══════════════════════════════════ */

/* 0 — INTRO + GREETING */
function Intro() {
  return (
    <div style={L.c}>
      <div style={{ fontSize: 48 }}>{FLAG}</div>
      <p style={{ fontSize: 18, fontWeight: 300, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>¡Hola {TEAM}! 👋</p>
      <p style={L.sub}>Tu resumen SEO del año</p>
      <h1 style={L.hero}>{BRAND}</h1>
      <h2 style={{ fontSize: 32, fontWeight: 900, lineHeight: 1, background: "linear-gradient(135deg,#00ff87,#1db954)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>SEO Wrapped</h2>
      <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 24, fontWeight: 700, color: "#00ff87", opacity: .8 }}>{YEAR}</p>
      <p style={{ fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,0.45)" }}>{COUNTRY}</p>
      <div style={{ marginTop: 18, fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
        <span className="pa">→</span> Desliza para comenzar
      </div>
    </div>
  );
}

/* 1 — IMPRESSIONS */
function SImp({ k }) {
  return (
    <div style={L.c} key={k}>
      <Tip id="impressions"><p style={L.lb}>Impresiones</p></Tip>
      <h2 style={L.mega}><AN value={DATA.impressions.total} /></h2>
      <p style={L.lbig}>apariciones en Google</p>
      <Bdg v={DATA.impressions.growth} />
      <Spark data={DATA.monthly} dk="imp" c="#00ff87" />
    </div>
  );
}

/* 2 — CLICKS + CTR */
function SCli({ k }) {
  return (
    <div style={L.c} key={k}>
      <Tip id="clicks"><p style={L.lb}>Clics orgánicos</p></Tip>
      <h2 style={L.mega}><AN value={DATA.clicks.total} /></h2>
      <p style={L.lbig}>clics desde Google</p>
      <Bdg v={DATA.clicks.growth} />
      <div style={{ display: "flex", gap: 10, alignItems: "center", background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "7px 16px" }}>
        <Tip id="ctr"><span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>CTR promedio</span></Tip>
        <span style={{ fontSize: 20, fontWeight: 800, fontFamily: "'Space Mono',monospace" }}>{DATA.ctr}%</span>
      </div>
      <Spark data={DATA.monthly} dk="cli" c="#1db954" />
    </div>
  );
}

/* 3 — REVENUE + PARTICIPATION + SALES */
function SRev({ k }) {
  const down = DATA.revenue.growth < 0;
  const dp = DATA.participation.digital;
  const tp = DATA.participation.total;
  return (
    <div style={L.c} key={k}>
      <Tip id="organicRevenue"><p style={L.lb}>Ingresos orgánicos</p></Tip>
      <h2 style={{ ...L.mega, fontSize: 40 }}>{fmtUSD(DATA.revenue.total)}</h2>
      <div style={{ background: down ? "rgba(255,85,85,0.1)" : "rgba(0,255,135,0.1)", border: `1px solid ${down ? "rgba(255,85,85,0.25)" : "rgba(0,255,135,0.2)"}`, borderRadius: 14, padding: "4px 12px", fontSize: 11, fontWeight: 600, color: down ? "#ff5555" : "#00ff87" }}>
        {down ? "↓" : "↑"} {Math.abs(DATA.revenue.growth)}% vs M25
      </div>
      {/* Assisted sale context */}
      <Tip id="assistedNote">
        <div style={{ background: "rgba(255,200,50,0.06)", border: "1px solid rgba(255,200,50,0.12)", borderRadius: 8, padding: "8px 12px", maxWidth: 370 }}>
          <p style={{ fontSize: 10, color: "rgba(255,200,50,0.85)", lineHeight: 1.4, textAlign: "left" }}>
            ⚠️ En M26 se separó la venta asistida del canal SEO. Las cifras reflejan venta orgánica pura.
          </p>
        </div>
      </Tip>
      {/* Stats row */}
      <div style={{ display: "flex", gap: 6, width: "100%", marginTop: 2 }}>
        <StCard v={fmt(DATA.sales.total)} l="Ventas" sub={`${DATA.sales.growth}%`} down />
        <Tip id="convRate"><StCard v={DATA.conversionRate.organic + "%"} l="Conv. orgánica" /></Tip>
      </div>
      {/* Two participation types */}
      <div style={{ display: "flex", gap: 6, width: "100%" }}>
        <Tip id="digitalShare">
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "8px 14px", flex: 1, textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Space Mono',monospace", color: "#00ff87" }}>{dp.seo}%</div>
            <div style={{ fontSize: 8, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: 1 }}>Part. {dp.label}</div>
            <div style={{ fontSize: 7, color: "rgba(255,255,255,0.25)", marginTop: 2 }}>Paid + Orgánico</div>
          </div>
        </Tip>
        <Tip id="totalShare">
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "8px 14px", flex: 1, textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Space Mono',monospace", color: "#1db954" }}>{tp.seo}%</div>
            <div style={{ fontSize: 8, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: 1 }}>Part. {tp.label}</div>
            <div style={{ fontSize: 7, color: "rgba(255,255,255,0.25)", marginTop: 2 }}>Paid + Org + Asistida</div>
          </div>
        </Tip>
      </div>
      {/* Channel conversion */}
      <div style={{ width: "100%", maxWidth: 350, background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "8px 12px" }}>
        <p style={{ fontSize: 8, color: "rgba(255,255,255,0.25)", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>Conversión por canal</p>
        {[{ l: "SEO", v: DATA.conversionRate.organic, best: true }, { l: "Directo", v: DATA.conversionRate.direct }, { l: "Paid", v: DATA.conversionRate.paidSearch }].map((c, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
            <span style={{ fontSize: 9, color: c.best ? "#00ff87" : "rgba(255,255,255,0.35)", width: 42, textAlign: "right" }}>{c.l}</span>
            <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(c.v / 7) * 100}%`, background: c.best ? "linear-gradient(90deg,#1db954,#00ff87)" : "rgba(255,255,255,0.1)", borderRadius: 2 }} />
            </div>
            <span style={{ fontSize: 10, fontFamily: "'Space Mono',monospace", color: c.best ? "#00ff87" : "rgba(255,255,255,0.4)", width: 34 }}>{c.v}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StCard({ v, l, sub, down }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "8px 12px", flex: 1, display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
      <span style={{ fontSize: 18, fontWeight: 800, fontFamily: "'Space Mono',monospace", color: down ? "#ff5555" : "#00ff87" }}>{v}</span>
      <span style={{ fontSize: 8, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: 1 }}>{l}</span>
      {sub && <span style={{ fontSize: 9, color: down ? "#ff5555" : "#00ff87" }}>{sub}</span>}
    </div>
  );
}

/* 4 — BRAND VS NON-BRAND */
function SBrand({ k }) {
  const nb = DATA.brandVsNonBrand.nonBrand, b = DATA.brandVsNonBrand.brand;
  return (
    <div style={L.c} key={k}>
      <Tip id="nonBrand"><p style={L.lb}>Tráfico No Marca</p></Tip>
      <h2 style={{ ...L.mega, fontSize: 64 }}>{nb}%</h2>
      <p style={L.lbig}>es búsqueda NO marca</p>
      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", maxWidth: 320, lineHeight: 1.5 }}>
        {nb}% de los clics vienen de personas que NO buscaron "{BRAND}" — conquista real de mercado.
      </p>
      <div style={{ width: "100%", maxWidth: 320, marginTop: 10 }}>
        <div style={{ display: "flex", borderRadius: 10, overflow: "hidden", height: 26 }}>
          <div style={{ width: `${nb}%`, background: "linear-gradient(90deg,#1db954,#00ff87)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Tip id="nonBrand"><span style={{ fontSize: 9, fontWeight: 700, color: "#0a0a0a" }}>No Marca {nb}%</span></Tip>
          </div>
          <div style={{ width: `${b}%`, background: "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Tip id="brand"><span style={{ fontSize: 8, fontWeight: 600, color: "rgba(255,255,255,0.4)" }}>Marca {b}%</span></Tip>
          </div>
        </div>
      </div>
      <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "10px 22px", marginTop: 10, textAlign: "center" }}>
        <Tip id="kwTop10">
          <span style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Space Mono',monospace", color: "#00ff87" }}>{fmt(DATA.newKeywordsTop10.count)}</span>
        </Tip>
        <div style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 1, marginTop: 2 }}>Nuevas keywords en Top 10</div>
        <Bdg v={DATA.newKeywordsTop10.growth} small />
      </div>
    </div>
  );
}

/* 5 — TECH HEALTH */
function STech({ k }) {
  const idx = DATA.indexation, cwv = DATA.coreWebVitals, wp = DATA.weightedPosition;
  return (
    <div style={L.c} key={k}>
      <Tip id="cwv"><p style={L.lb}>Salud técnica</p></Tip>
      <h2 style={L.sec}>Core Web Vitals</h2>
      <div style={{ display: "flex", gap: 6, width: "100%" }}>
        <CWVC l="LCP" v={`${cwv.lcp}s`} ok={cwv.lcp <= 2.5} tid="lcp" />
        <CWVC l="CLS" v={`${cwv.cls}`} ok={cwv.cls <= 0.1} tid="cls" />
        <CWVC l="INP" v={`${cwv.inp}ms`} ok={cwv.inp <= 200} tid="inp" />
      </div>
      <div style={{ width: "100%", marginTop: 6 }}>
        <Tip id="indexation"><p style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>Indexación</p></Tip>
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: "7px 12px", flex: 1, textAlign: "center" }}>
            <div style={{ fontSize: 17, fontWeight: 800, fontFamily: "'Space Mono',monospace", color: "rgba(255,255,255,0.65)" }}>{fmt(idx.total)}</div>
            <div style={{ fontSize: 7, color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>Total</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: "7px 12px", flex: 1, textAlign: "center" }}>
            <div style={{ fontSize: 17, fontWeight: 800, fontFamily: "'Space Mono',monospace", color: "#00ff87" }}>{fmt(idx.indexed)}</div>
            <div style={{ fontSize: 7, color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>Indexadas</div>
          </div>
        </div>
        <div style={{ height: 5, background: "rgba(255,255,255,0.05)", borderRadius: 3, marginTop: 5, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${(idx.indexed / idx.total) * 100}%`, background: "linear-gradient(90deg,#1db954,#00ff87)", borderRadius: 3 }} />
        </div>
        <p style={{ fontSize: 8, color: "rgba(255,255,255,0.25)", marginTop: 2, textAlign: "right" }}>{((idx.indexed / idx.total) * 100).toFixed(1)}% indexado</p>
      </div>
      <Tip id="weightedPos">
        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "8px 20px", marginTop: 4, textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, justifyContent: "center" }}>
            <span style={{ fontSize: 26, fontWeight: 800, fontFamily: "'Space Mono',monospace", color: "#00ff87" }}>{wp.current}</span>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>← {wp.previous}</span>
          </div>
          <span style={{ fontSize: 7, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 1 }}>Posición ponderada</span>
        </div>
      </Tip>
    </div>
  );
}

function CWVC({ l, v, ok, tid }) {
  return (
    <Tip id={tid}>
      <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: "7px 8px", flex: 1, display: "flex", flexDirection: "column", gap: 2, alignItems: "center", borderLeft: `3px solid ${ok ? "#00ff87" : "#ff5555"}` }}>
        <span style={{ fontSize: 7, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 1 }}>{l}</span>
        <span style={{ fontSize: 15, fontWeight: 800, fontFamily: "'Space Mono',monospace", color: ok ? "#00ff87" : "#ff5555" }}>{v}</span>
        <span style={{ fontSize: 7, color: ok ? "#00ff87" : "#ff5555" }}>{ok ? "✓ Bueno" : "✗ Mejorar"}</span>
      </div>
    </Tip>
  );
}

/* 6 — SHARE OF VOICE */
function SSov({ k }) {
  const all = DATA.shareOfVoice.competitors;
  const mx = Math.max(...all.map(a => a.sov));
  return (
    <div style={L.c} key={k}>
      <Tip id="sov"><p style={L.lb}>Share of Voice Orgánico</p></Tip>
      <h2 style={L.sec}>¿Quién domina la vertical?</h2>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 7, marginTop: 6 }}>
        {all.map((c, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }} className="fi">
            <span style={{ fontSize: 10, color: c.own ? "#00ff87" : "rgba(255,255,255,0.4)", width: 85, textAlign: "right", fontWeight: c.own ? 700 : 400 }}>{c.name}</span>
            <div style={{ flex: 1, height: 20, background: "rgba(255,255,255,0.04)", borderRadius: 5, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(c.sov / mx) * 100}%`, background: c.own ? "linear-gradient(90deg,#1db954,#00ff87)" : "rgba(255,255,255,0.08)", borderRadius: 5, display: "flex", alignItems: "center", paddingLeft: 7 }}>
                <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "'Space Mono',monospace", color: c.own ? "#0a0a0a" : "rgba(255,255,255,0.45)" }}>{c.sov}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 7 — TOP 15 KEYWORDS */
function SKw({ k }) {
  const mx = DATA.topKeywords[0].clicks;
  const col1 = DATA.topKeywords.slice(0, 8);
  const col2 = DATA.topKeywords.slice(8);
  return (
    <div style={{ ...L.c, maxWidth: 600 }} key={k}>
      <p style={L.lb}>Keywords más fuertes</p>
      <h2 style={L.sec}>Top 15 Keywords</h2>
      <div style={{ display: "flex", gap: 6, width: "100%" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
          {col1.map((kw, i) => <KWR key={i} kw={kw} i={i} mx={mx} />)}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
          {col2.map((kw, i) => <KWR key={i + 8} kw={kw} i={i + 8} mx={mx} />)}
        </div>
      </div>
    </div>
  );
}

function KWR({ kw, i, mx }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,0.03)", borderRadius: 6, padding: "5px 7px" }} className="fi">
      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, fontWeight: 700, color: "#00ff87", minWidth: 22, textAlign: "center" }}>#{i + 1}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 9, fontWeight: 600, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{kw.keyword}</div>
        <div style={{ display: "flex", gap: 6, fontSize: 7, color: "rgba(255,255,255,0.3)", marginTop: 1 }}>
          <span>{fmt(kw.clicks)} clics</span>
          <Tip id="position"><span style={{ color: "#1db954" }}>Pos. {kw.position}</span></Tip>
        </div>
      </div>
      <div style={{ width: 36, height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden", flexShrink: 0 }}>
        <div style={{ height: "100%", width: `${(kw.clicks / mx) * 100}%`, background: "linear-gradient(90deg,#1db954,#00ff87)", borderRadius: 2 }} />
      </div>
    </div>
  );
}

/* 8 — TOP 10 CATEGORIES (separate) */
function SCat({ k }) {
  const mx = DATA.topCategories[0].pct;
  return (
    <div style={L.c} key={k}>
      <p style={L.lb}>Las categorías que más brillaron</p>
      <h2 style={L.sec}>Top 10 Categorías</h2>
      <div style={{ width: "100%", display: "flex", gap: 6 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          {DATA.topCategories.slice(0, 5).map((cat, i) => <CatRow key={i} cat={cat} i={i} mx={mx} />)}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          {DATA.topCategories.slice(5).map((cat, i) => <CatRow key={i + 5} cat={cat} i={i + 5} mx={mx} />)}
        </div>
      </div>
    </div>
  );
}

function CatRow({ cat, i, mx }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 7, padding: "7px 10px" }} className="fi">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#fff" }}><span style={{ color: "#00ff87", fontFamily: "'Space Mono',monospace", fontSize: 9, marginRight: 4 }}>#{i + 1}</span>{cat.name}</span>
        <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "'Space Mono',monospace", color: "#00ff87" }}>{cat.pct}%</span>
      </div>
      <div style={{ height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${(cat.pct / mx) * 100}%`, background: "linear-gradient(90deg,#1db954,#00ff87)", borderRadius: 2 }} />
      </div>
    </div>
  );
}

/* 9 — TOP 10 PRODUCTS (separate) */
function SProd({ k }) {
  const mx = DATA.topProducts[0].conv;
  return (
    <div style={L.c} key={k}>
      <p style={L.lb}>Los productos estrella del SEO</p>
      <h2 style={L.sec}>Top 10 Productos</h2>
      <div style={{ width: "100%", display: "flex", gap: 6 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          {DATA.topProducts.slice(0, 5).map((p, i) => <ProdRow key={i} p={p} i={i} mx={mx} />)}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          {DATA.topProducts.slice(5).map((p, i) => <ProdRow key={i + 5} p={p} i={i + 5} mx={mx} />)}
        </div>
      </div>
    </div>
  );
}

function ProdRow({ p, i, mx }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 7, padding: "7px 10px" }} className="fi">
      <div style={{ fontSize: 10, fontWeight: 600, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: 3 }}>
        <span style={{ color: "#00ff87", fontFamily: "'Space Mono',monospace", fontSize: 9, marginRight: 4 }}>#{i + 1}</span>{p.name}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${(p.conv / mx) * 100}%`, background: "linear-gradient(90deg,#1db954,#00ff87)", borderRadius: 2 }} />
        </div>
        <Tip id="conversions"><span style={{ fontSize: 9, fontFamily: "'Space Mono',monospace", color: "rgba(255,255,255,0.45)", flexShrink: 0 }}>{fmt(p.conv)}</span></Tip>
      </div>
    </div>
  );
}

/* 10 — HEATMAP */
function SHeat({ k }) {
  return (
    <div style={{ ...L.c, maxWidth: 560 }} key={k}>
      <Tip id="heatmap"><p style={L.lb}>Mapa de Calor</p></Tip>
      <h2 style={L.sec}>Estacionalidad de búsqueda</h2>
      <div style={{ width: "100%", overflowX: "auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "115px repeat(12,1fr)", gap: 2, minWidth: 440 }}>
          <div />
          {MONTHS.map(m => <div key={m} style={{ fontSize: 7, fontFamily: "'Space Mono',monospace", color: "rgba(255,255,255,0.3)", textAlign: "center" }}>{m}</div>)}
          {DATA.heatmapKeywords.map((row, ri) => (
            <>
              <div key={`l${ri}`} style={{ fontSize: 8, color: "rgba(255,255,255,0.45)", display: "flex", alignItems: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.keyword}</div>
              {row.vals.map((v, ci) => (
                <div key={`${ri}-${ci}`} className="hc" style={{ background: hc(v), borderRadius: 3, aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", animationDelay: `${(ri * 12 + ci) * .02}s`, minHeight: 20 }}
                  title={`${row.keyword} — ${MONTHS[ci]}: ${v}`}>
                  <span style={{ fontSize: 7, fontFamily: "'Space Mono',monospace", color: "rgba(255,255,255,0.6)", fontWeight: 700 }}>{v}</span>
                </div>
              ))}
            </>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 3, marginTop: 6 }}>
          <span style={{ fontSize: 7, color: "rgba(255,255,255,0.2)" }}>Baja</span>
          {[10, 30, 45, 60, 75, 90].map(v => <div key={v} style={{ width: 12, height: 6, borderRadius: 2, background: hc(v) }} />)}
          <span style={{ fontSize: 7, color: "rgba(255,255,255,0.2)" }}>Alta</span>
        </div>
      </div>
    </div>
  );
}

/* 11 — FINAL SUMMARY */
function SFinal({ k }) {
  const stats = [
    { v: fmt(DATA.impressions.total), l: "Impresiones" },
    { v: fmt(DATA.clicks.total), l: "Clics" },
    { v: fmtUSD(DATA.revenue.total), l: "Revenue" },
    { v: DATA.conversionRate.organic + "%", l: "Conversión" },
    { v: DATA.participation.digital.seo + "%", l: "Part. Digital" },
    { v: fmt(DATA.newKeywordsTop10.count), l: "Nuevas KWs Top 10" },
  ];
  return (
    <div style={L.c} key={k}>
      <div style={{ fontSize: 44 }}>📊</div>
      <h2 style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.3, maxWidth: 360, background: "linear-gradient(135deg,#00ff87,#1db954)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textAlign: "center" }}>
        {BRAND} {COUNTRY} — {YEAR}
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginTop: 8, width: "100%" }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "8px 6px", display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 800, fontFamily: "'Space Mono',monospace", color: "#00ff87" }}>{s.v}</span>
            <span style={{ fontSize: 7, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: 1, textAlign: "center" }}>{s.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 12 — RECOGNITION */
function SRecog({ k }) {
  const rec = RECOGNITION;
  const hasAward = rec.hasAward;
  return (
    <div style={L.c} key={k}>
      <div style={{ fontSize: 52 }}>{hasAward ? "🏆" : "🚀"}</div>
      {hasAward ? (
        <>
          <p style={{ fontSize: 11, color: "rgba(255,200,50,0.7)", textTransform: "uppercase", letterSpacing: 3, fontWeight: 600 }}>Reconocimiento</p>
          <h2 style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.4, maxWidth: 380, textAlign: "center", background: "linear-gradient(135deg,#ffd700,#ffaa00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {rec.awardText}
          </h2>
          <div style={{ width: 60, height: 2, background: "linear-gradient(90deg,transparent,#ffd700,transparent)", marginTop: 8 }} />
        </>
      ) : (
        <>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 3, fontWeight: 600 }}>Mirando al futuro</p>
          <h2 style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.5, maxWidth: 360, textAlign: "center", color: "rgba(255,255,255,0.75)" }}>
            {rec.genericText.replace("{BRAND}", BRAND)}
          </h2>
        </>
      )}
      <p style={{ marginTop: 16, fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>¡Gracias {TEAM}! 💪</p>
      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>Preparados para M27</p>
    </div>
  );
}

/* ═══ SHARED ═══ */
function Bdg({ v, small }) {
  return (
    <div style={{ background: "rgba(0,255,135,0.1)", border: "1px solid rgba(0,255,135,0.2)", borderRadius: 14, padding: small ? "2px 8px" : "4px 12px", fontSize: small ? 9 : 11, fontWeight: 600, color: "#00ff87", marginTop: small ? 3 : 0 }}>
      ↑ {v}% vs M25
    </div>
  );
}

function Spark({ data, dk, c }) {
  const vals = data.map(d => d[dk]);
  const max = Math.max(...vals), min = Math.min(...vals), range = max - min || 1;
  const w = 230, h = 48;
  const pts = vals.map((v, i) => `${(i / (vals.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: 230, height: 48, marginTop: 4 }}>
      <defs><linearGradient id={`g-${dk}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={c} stopOpacity=".25" /><stop offset="100%" stopColor={c} stopOpacity="0" /></linearGradient></defs>
      <polygon points={`0,${h} ${pts} ${w},${h}`} fill={`url(#g-${dk})`} />
      <polyline points={pts} fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sd" />
    </svg>
  );
}

/* ═══ CSS ═══ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800;900&family=Space+Mono:wght@400;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
.fi{opacity:0;transform:translateY(10px);animation:fi .4s ease forwards}
@keyframes fi{to{opacity:1;transform:translateY(0)}}
.hc{opacity:0;transform:scale(.7);animation:hp .25s ease forwards}
@keyframes hp{to{opacity:1;transform:scale(1)}}
.sd{stroke-dasharray:500;stroke-dashoffset:500;animation:dl 1.3s ease forwards .3s}
@keyframes dl{to{stroke-dashoffset:0}}
.pa{display:inline-block;animation:pa 1.5s ease infinite}
@keyframes pa{0%,100%{opacity:1;transform:translateX(0)}50%{opacity:.4;transform:translateX(6px)}}
`;

const R = {
  root: { fontFamily: "'Outfit',sans-serif", background: "linear-gradient(160deg,#0a0a0a 0%,#0d1f12 40%,#0a0a0a 100%)", height: "100vh", color: "#fff", display: "flex", flexDirection: "column", overflow: "hidden", userSelect: "none" },
  prog: { display: "flex", gap: 3, padding: "12px 14px 0", flexShrink: 0 },
  wrap: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 16px 4px", overflow: "hidden" },
  nav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 14px 14px", flexShrink: 0 },
  btn: { background: "none", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontFamily: "'Outfit',sans-serif", fontSize: 11, padding: "5px 12px", borderRadius: 18, cursor: "pointer" },
  cnt: { fontSize: 9, color: "rgba(255,255,255,0.25)", fontFamily: "'Space Mono',monospace" },
};

const L = {
  c: { display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 5, width: "100%", maxWidth: 460, animation: "fi .5s ease" },
  sub: { fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: 4, textTransform: "uppercase", fontWeight: 300 },
  hero: { fontSize: 44, fontWeight: 900, lineHeight: 1, color: "#fff", letterSpacing: -1 },
  lb: { fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 2, textTransform: "uppercase", fontWeight: 300 },
  mega: { fontSize: 48, fontWeight: 900, color: "#00ff87", fontFamily: "'Space Mono',monospace", lineHeight: 1, margin: "2px 0" },
  lbig: { fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.75)" },
  sec: { fontSize: 17, fontWeight: 800, color: "#fff" },
};
