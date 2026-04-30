export const NA = '—';

export const isNil = (v) =>
  v === null ||
  v === undefined ||
  (typeof v === 'number' && Number.isNaN(v)) ||
  (typeof v === 'string' && v.trim() === '');

const INT_FMT = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const DEC2_FMT = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const compact = (abs) => {
  if (abs >= 1e6) return `${DEC2_FMT.format(abs / 1e6)}M`;
  if (abs >= 1e3) return `${DEC2_FMT.format(abs / 1e3)}K`;
  return INT_FMT.format(Math.round(abs));
};

/**
 * Unified number formatter for all views. Examples:
 *   formatNumber(106000000) -> "106.00M"
 *   formatNumber(1234567)   -> "1.23M"
 *   formatNumber(847400)    -> "847.40K"
 *   formatNumber(437)       -> "437"
 *   formatNumber(null)      -> "—"
 */
export function formatNumber(n) {
  if (isNil(n)) return NA;
  const num = Number(n);
  if (!Number.isFinite(num)) return NA;
  const sign = num < 0 ? '-' : '';
  return `${sign}${compact(Math.abs(num))}`;
}

/**
 * Currency variant of formatNumber. Examples:
 *   formatUSD(106000000) -> "$106.00M"
 *   formatUSD(847400)    -> "$847.40K"
 *   formatUSD(437)       -> "$437"
 *   formatUSD(null)      -> "—"
 */
export function formatUSD(n) {
  if (isNil(n)) return NA;
  const num = Number(n);
  if (!Number.isFinite(num)) return NA;
  const sign = num < 0 ? '-' : '';
  return `${sign}$${compact(Math.abs(num))}`;
}

/** Already-percentage values, 2-decimal fixed: 65.75 -> "65.75%". */
export function formatPct(value) {
  if (isNil(value)) return NA;
  const num = Number(value);
  if (!Number.isFinite(num)) return NA;
  return `${DEC2_FMT.format(num)}%`;
}

/** Signed growth percentage: 65.75 -> "+65.75%", -47.33 -> "-47.33%". */
export function formatGrowth(value) {
  if (isNil(value)) return NA;
  const num = Number(value);
  if (!Number.isFinite(num)) return NA;
  const sign = num > 0 ? '+' : '';
  return `${sign}${DEC2_FMT.format(num)}%`;
}

/** Plain decimal with `maxFractionDigits` decimals (en-US locale). */
export function formatDecimal(n, maxFractionDigits = 2) {
  if (isNil(n)) return NA;
  const num = Number(n);
  if (!Number.isFinite(num)) return NA;
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: maxFractionDigits,
  }).format(num);
}

export const fallback = (v, alt = NA) => (isNil(v) ? alt : v);
