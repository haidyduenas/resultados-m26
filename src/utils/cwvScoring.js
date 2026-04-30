const STATUS_COLORS = {
  good: '#22c55e',
  ni: '#f59e0b',
  poor: '#ef4444',
  unknown: '#71717a',
};

export const STATUS_LABEL = {
  good: 'Bueno',
  ni: 'Mejorable',
  poor: 'Pobre',
  unknown: 'Sin dato',
};

const parseUnit = (value, unitRegex) => {
  if (value === null || value === undefined) return null;
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  const trimmed = String(value).trim();
  if (!trimmed) return null;
  const match = trimmed.match(unitRegex);
  const raw = match ? match[1] : trimmed;
  const num = parseFloat(raw);
  return Number.isFinite(num) ? num : null;
};

const unknown = () => ({ status: 'unknown', color: STATUS_COLORS.unknown, value: null });

export function scoreLCP(value) {
  const v = parseUnit(value, /^([\d.]+)\s*s$/i);
  if (v === null) return unknown();
  if (v <= 2.5) return { status: 'good', color: STATUS_COLORS.good, value: v, unit: 's' };
  if (v <= 4.0) return { status: 'ni', color: STATUS_COLORS.ni, value: v, unit: 's' };
  return { status: 'poor', color: STATUS_COLORS.poor, value: v, unit: 's' };
}

export function scoreINP(value) {
  const v = parseUnit(value, /^([\d.]+)\s*ms$/i);
  if (v === null) return unknown();
  if (v <= 200) return { status: 'good', color: STATUS_COLORS.good, value: v, unit: 'ms' };
  if (v <= 500) return { status: 'ni', color: STATUS_COLORS.ni, value: v, unit: 'ms' };
  return { status: 'poor', color: STATUS_COLORS.poor, value: v, unit: 'ms' };
}

export function scoreCLS(value) {
  const v = parseUnit(value, /^([\d.]+)$/);
  if (v === null) return unknown();
  if (v <= 0.1) return { status: 'good', color: STATUS_COLORS.good, value: v, unit: '' };
  if (v <= 0.25) return { status: 'ni', color: STATUS_COLORS.ni, value: v, unit: '' };
  return { status: 'poor', color: STATUS_COLORS.poor, value: v, unit: '' };
}

export const CWV_THRESHOLDS = {
  LCP: { good: '≤2.5s', ni: '≤4s', poor: '>4s' },
  INP: { good: '≤200ms', ni: '≤500ms', poor: '>500ms' },
  CLS: { good: '≤0.1', ni: '≤0.25', poor: '>0.25' },
};
