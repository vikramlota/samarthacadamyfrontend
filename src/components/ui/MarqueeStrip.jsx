import React, { useRef } from 'react';
import { cn } from '../../lib/utils';

const VARIANTS = {
  red:    'bg-red-500 text-white',
  gray:   'bg-gray-100 text-gray-700',
  orange: 'bg-orange-500 text-white',
};

const DURATIONS = { slow: '60s', normal: '40s', fast: '20s' };

/**
 * MarqueeStrip — horizontally scrolling announcement strip.
 * Uses the --animate-marquee keyframes defined in App.css @theme.
 *
 * Props:
 *   items        — array of { text, href?, icon? }
 *   speed        — 'slow' | 'normal' | 'fast'
 *   pauseOnHover — pauses animation when hovered (default: true)
 *   variant      — 'red' | 'gray' | 'orange'
 */
const MarqueeStrip = ({
  items        = [],
  speed        = 'normal',
  pauseOnHover = true,
  variant      = 'red',
  className,
}) => {
  const trackRef = useRef(null);

  // Duplicate items so the loop appears seamless
  const doubled = [...items, ...items];

  const pause  = () => { if (pauseOnHover && trackRef.current) trackRef.current.style.animationPlayState = 'paused'; };
  const resume = () => { if (pauseOnHover && trackRef.current) trackRef.current.style.animationPlayState = 'running'; };

  return (
    <div
      className={cn('w-full overflow-hidden', VARIANTS[variant], className)}
      aria-label="Scrolling announcements"
      aria-live="off"
    >
      <div className="flex py-2.5">
        <div
          ref={trackRef}
          className="flex items-center gap-8 animate-marquee flex-shrink-0 whitespace-nowrap"
          style={{ animationDuration: DURATIONS[speed] }}
          onMouseEnter={pause}
          onMouseLeave={resume}
        >
          {doubled.map((item, i) => (
            <span key={i} className="flex items-center gap-3 flex-shrink-0">
              {item.icon && (
                <item.icon className="text-xs opacity-70 flex-shrink-0" aria-hidden="true" />
              )}
              {item.href ? (
                <a
                  href={item.href}
                  className="text-sm font-medium hover:underline underline-offset-2 transition-opacity hover:opacity-80"
                >
                  {item.text}
                </a>
              ) : (
                <span className="text-sm font-medium">{item.text}</span>
              )}
              <span className="opacity-25 text-xs select-none" aria-hidden="true">◆</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarqueeStrip;
