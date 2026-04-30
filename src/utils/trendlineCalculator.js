/**
 * Builds a smooth, deterministic curve between two endpoints (M25, M26)
 * for the sparklines. The seed keeps the curve stable across re-renders
 * for the same brand/metric combination.
 */

function hashSeed(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(a) {
  return function rng() {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const smoothstep = (t) => 0.5 - Math.cos(Math.PI * t) / 2;

export function buildTrendline({ start, end, points = 12, seed = 'x', noise = 0.18 }) {
  if (start === null || start === undefined || end === null || end === undefined) {
    return [];
  }
  const rng = mulberry32(hashSeed(String(seed)));
  const range =
    Math.abs(end - start) || Math.max(Math.abs(start), Math.abs(end), 1) * 0.08;
  const out = new Array(points);
  for (let i = 0; i < points; i++) {
    const t = i / (points - 1);
    const linear = start + (end - start) * smoothstep(t);
    const wobble = (rng() - 0.5) * range * noise;
    out[i] = linear + wobble;
  }
  out[0] = start;
  out[points - 1] = end;
  return out;
}
