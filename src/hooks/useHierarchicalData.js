import estructura from '../../datos/estructura.json';

// Brands without complete data — excluded from selector and from rendering.
const EXCLUDED_BRANDS = new Set(['HN/ATO', 'NC/ATO']);

/**
 * Reads the country -> brand -> metrics tree from the JSON source and
 * normalizes it into iterable arrays. The JSON itself is never mutated.
 * Excluded brands are filtered out so they never reach the UI.
 */
export function useHierarchicalData() {
  const countries = Object.entries(estructura)
    .map(([code, country]) => ({
      code,
      nombre: country?.nombre ?? code,
      brands: Object.entries(country?.marcas ?? {})
        .filter(([key]) => !EXCLUDED_BRANDS.has(`${code}/${key}`))
        .map(([key, brand]) => ({
          key,
          label: brand?.label ?? key,
          color: brand?.color ?? '#22c55e',
          colorDim: brand?.colorDim ?? 'rgba(34,197,94,0.15)',
          data: brand,
        })),
    }))
    .filter((c) => c.brands.length > 0);

  return { raw: estructura, countries };
}
