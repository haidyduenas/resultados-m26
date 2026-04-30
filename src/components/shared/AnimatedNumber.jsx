import { useAnimatedValue } from '../../hooks/useAnimatedValue.js';
import { isNil, formatNumber, NA } from '../../utils/formatters.js';

export default function AnimatedNumber({
  value,
  format,
  duration = 1400,
  style,
  fallback = NA,
}) {
  const isMissing = isNil(value);
  const animated = useAnimatedValue(isMissing ? 0 : Number(value), duration);
  if (isMissing) {
    return <span style={style}>{fallback}</span>;
  }
  const formatter = format ?? formatNumber;
  return <span style={style}>{formatter(animated)}</span>;
}
