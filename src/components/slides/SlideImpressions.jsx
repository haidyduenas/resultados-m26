import MetricHeroLayout from './MetricHeroLayout.jsx';

export default function SlideImpressions({ country, brand }) {
  const data = brand.data?.impresiones ?? {};
  return (
    <MetricHeroLayout
      country={country}
      brand={brand}
      seed="impresiones"
      chapter="Capítulo 1 · Impresiones"
      headline="Apareciste en búsquedas"
      unit="veces"
      m25={data.M25 ?? null}
      m26={data.M26 ?? null}
      growth={data.growth_pct ?? null}
      m25Description="Impresiones del período anterior, contra las que comparamos M26."
    />
  );
}
