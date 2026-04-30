import MetricHeroLayout from './MetricHeroLayout.jsx';

export default function SlideVisits({ country, brand }) {
  const data = brand.data?.visitas ?? {};
  return (
    <MetricHeroLayout
      country={country}
      brand={brand}
      seed="visitas"
      chapter="Capítulo 3 · Visitas"
      headline="Llegaron a tu sitio"
      unit="visitas"
      m25={data.M25 ?? null}
      m26={data.M26 ?? null}
      growth={data.growth_pct ?? null}
      m25Description="Sesiones orgánicas del período anterior."
    />
  );
}
