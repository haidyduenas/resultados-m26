import MetricHeroLayout from './MetricHeroLayout.jsx';

export default function SlideClicks({ country, brand }) {
  const data = brand.data?.clics ?? {};
  return (
    <MetricHeroLayout
      country={country}
      brand={brand}
      seed="clics"
      chapter="Capítulo 2 · Clics"
      headline="Te eligieron"
      unit="clics"
      m25={data.M25 ?? null}
      m26={data.M26 ?? null}
      growth={data.growth_pct ?? null}
      m25Description="Clics orgánicos del período anterior."
    />
  );
}
