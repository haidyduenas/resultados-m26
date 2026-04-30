import { useEffect, useState } from 'react';
import { useHierarchicalData } from '../hooks/useHierarchicalData.js';
import CountrySelector from './CountrySelector.jsx';
import BrandTabs from './BrandTabs.jsx';
import SlideCarousel from './SlideCarousel.jsx';

export default function SeoWrapped() {
  const { countries } = useHierarchicalData();
  const [countryCode, setCountryCode] = useState(null);
  const [brandKey, setBrandKey] = useState(null);

  useEffect(() => {
    document.title = countryCode
      ? `SEO Wrapped · ${countryCode}${brandKey ? ' · ' + brandKey : ''}`
      : 'SEO Wrapped';
  }, [countryCode, brandKey]);

  if (!countryCode) {
    return (
      <CountrySelector
        countries={countries}
        onSelect={(code) => {
          const country = countries.find((c) => c.code === code);
          setCountryCode(code);
          setBrandKey(country?.brands[0]?.key ?? null);
        }}
      />
    );
  }

  const country = countries.find((c) => c.code === countryCode);
  if (!country) {
    setCountryCode(null);
    return null;
  }

  const brand =
    country.brands.find((b) => b.key === brandKey) ?? country.brands[0];

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 1280,
          margin: '0 auto',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
        }}
      >
        <BrandTabs
          country={country}
          activeBrandKey={brand?.key}
          onChangeBrand={setBrandKey}
          onChangeCountry={() => {
            setCountryCode(null);
            setBrandKey(null);
          }}
        />
        <SlideCarousel country={country} brand={brand} />
      </div>
    </div>
  );
}
