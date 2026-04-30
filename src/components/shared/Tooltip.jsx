import { useState } from 'react';

/**
 * Lightweight hover tooltip. Wrap a target element and pass content.
 * Pure CSS-in-JS, no portal — positioned absolutely over the trigger.
 */
export default function Tooltip({ content, children, placement = 'top' }) {
  const [open, setOpen] = useState(false);

  if (!content) return children;

  const positionStyle =
    placement === 'bottom'
      ? { top: 'calc(100% + 8px)', bottom: 'auto' }
      : { bottom: 'calc(100% + 8px)', top: 'auto' };

  return (
    <span
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      {open && (
        <span
          role="tooltip"
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            ...positionStyle,
            background: 'rgba(8,8,8,0.95)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: '#f4f4f5',
            padding: '8px 12px',
            borderRadius: 8,
            fontSize: 12,
            lineHeight: 1.4,
            whiteSpace: 'nowrap',
            zIndex: 50,
            pointerEvents: 'none',
            fontFamily: "'Space Mono', monospace",
            letterSpacing: '0.02em',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }}
        >
          {content}
        </span>
      )}
    </span>
  );
}
