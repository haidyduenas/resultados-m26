const MONTHS_ES = [
  'ene', 'feb', 'mar', 'abr', 'may', 'jun',
  'jul', 'ago', 'sep', 'oct', 'nov', 'dic',
];

/**
 * Generates `points` month labels ending at `endYear`/`endMonthIdx`.
 * Defaults assume the M26 window closes at March of year '26 — adjust
 * if the period anchor changes.
 */
export function buildMonthlyLabels({ endYear = 26, endMonthIdx = 2, points = 12 } = {}) {
  const labels = [];
  for (let i = points - 1; i >= 0; i--) {
    let m = endMonthIdx - i;
    let yOffset = 0;
    while (m < 0) {
      m += 12;
      yOffset -= 1;
    }
    const yy = endYear + yOffset;
    labels.push(`${MONTHS_ES[m]} ${String(yy).padStart(2, '0')}`);
  }
  return labels;
}

export const MONTH_LABELS_ES = MONTHS_ES;
